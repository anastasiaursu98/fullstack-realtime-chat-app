import { useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useSocket } from "@/features/chat/providers/SocketProvider";
import { getChatMessages, markMessagesAsRead } from "../slices/chatThunks";
import { addMessage, setMessagesAsRead } from "../slices/chatSlice";
import { Message } from "../types/chat";

export const useChatRoom = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector((state) => state.chat.messages);
    const isLoadingMessages = useAppSelector((state) => state.chat.isLoadingMessages);
    const { socket } = useSocket();
    const { id: chatId } = useParams<{ id: string }>();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message: Message) => {
            // Check if loop is active chat
            const isCurrentChat = message.senderId === chatId;

            if (isCurrentChat) {
                dispatch(addMessage(message));
                // Mark as read immediately on backend if we are in the chat
                dispatch(markMessagesAsRead(chatId));
            }

            const audio = new Audio("/sounds/notification.mp3");
            audio.play()
                .then(() => console.log("Audio played successfully"))
                .catch(e => console.error("Audio play failed:", e));
        };

        const handleMarkMessagesAsRead = ({ readerId }: { readerId: string }) => {
            if (readerId === chatId) {
                dispatch(setMessagesAsRead({ readerId }));
            }
        }

        socket.on("messagesRead", handleMarkMessagesAsRead);
        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("messagesRead", handleMarkMessagesAsRead);
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, dispatch, chatId]);


    useEffect(() => {
        if (!chatId) return;
        dispatch(markMessagesAsRead(chatId));
        dispatch(getChatMessages(chatId));
    }, [dispatch, chatId]);


    return {
        messages,
        chatId,
        isLoadingMessages
    };
};
