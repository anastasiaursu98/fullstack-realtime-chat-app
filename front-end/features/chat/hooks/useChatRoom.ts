import { useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useSocket } from "@/features/chat/providers/SocketProvider";
import { getChatMessages, sendMessage } from "../slices/chatThunks";
import { addMessage } from "../slices/chatSlice";
import { Message } from "../types/chat";
/**
 * Custom hook for managing chat room functionality
 * Handles real-time message updates via Socket.IO and message sending
 * 
 * @returns {Object} Chat room utilities
 * @returns {Message[]} messages - Array of chat messages
 * @returns {Function} sendMessage - Function to send a new message
 */

export const useChatRoom = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector((state) => state.chat.messages);
    const isLoadingMessages = useAppSelector((state) => state.chat.isLoadingMessages);
    const { socket } = useSocket();
    const { id: chatId } = useParams<{ id: string }>();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message: Message) => {

            if (message.senderId === chatId) {
                dispatch(addMessage(message));
            }
            const audio = new Audio("/sounds/notification.mp3");
            audio.play()
                .then(() => console.log("Audio played successfully"))
                .catch(e => console.error("Audio play failed:", e));
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, dispatch, chatId]);


    useEffect(() => {
        if (!chatId) return;
        dispatch(getChatMessages(chatId));
    }, [dispatch, chatId]);


    return {
        messages,
        chatId,
        isLoadingMessages
    };
};
