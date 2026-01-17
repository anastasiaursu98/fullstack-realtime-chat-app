import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";


import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = new mongoose.Types.ObjectId(req.user.id);

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: loggedInUserId }
                }
            },

            {
                $lookup: {
                    from: "messages",
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        {
                                            $and: [
                                                { $eq: ["$senderId", loggedInUserId] },
                                                { $eq: ["$receiverId", "$$userId"] }
                                            ]
                                        },
                                        {
                                            $and: [
                                                { $eq: ["$senderId", "$$userId"] },
                                                { $eq: ["$receiverId", loggedInUserId] }
                                            ]
                                        }
                                    ]
                                }
                            }
                        },
                        { $sort: { createdAt: -1 } },
                        { $limit: 1 }
                    ],
                    as: "lastMessage"
                }
            },

            {
                $lookup: {
                    from: "messages",
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$senderId", "$$userId"] },
                                        { $eq: ["$receiverId", loggedInUserId] },
                                        { $eq: ["$isRead", false] }
                                    ]
                                }
                            }
                        },
                        { $count: "count" }
                    ],
                    as: "unreadMessagesCount"
                }
            },

            {
                $addFields: {
                    lastMessage: { $arrayElemAt: ["$lastMessage", 0] },
                    unreadMessagesCount: { $ifNull: [{ $arrayElemAt: ["$unreadMessagesCount.count", 0] }, 0] }
                }
            },

            {
                $sort: {
                    "lastMessage.createdAt": -1
                }
            },

            {
                $project: {
                    password: 0
                }
            }
        ]);

        res.status(200).json(users);

    } catch (error) {
        console.log("Error in getSidebarUsers:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {

        const { id: userToChatId } = req.params; // user id to chat with
        const myId = req.user.id; // current auth user id

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })

        res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error fetching messages", error);
        res.status(500).json({ message: error.message });
    }
};


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getChatUser = async (req, res) => {
    try {
        const { id: chatUserId } = req.params;

        const user = await User.findById(chatUserId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getChatUser controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const markMessagesAsRead = async (req, res) => {
    try {
        const { chatUserId } = req.params; // userul cu care avem conversația
        const myId = req.user.id;

        //mark all messages from chatUserId as read
        const result = await Message.updateMany(
            { senderId: chatUserId, receiverId: myId, isRead: false },
            { $set: { isRead: true } }
        );

        // Notify the sender that the messages have been read
        const senderSocketId = getReceiverSocketId(chatUserId);
        if (senderSocketId) {
            io.to(senderSocketId).emit("messagesRead", {
                readerId: myId,                 // the id of the user who read the messages
                count: result.modifiedCount,    // the number of messages that were read
            });
        }

        res.status(200).json({
            message: "Messages marked as read",
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        console.log("Error marking messages as read:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};