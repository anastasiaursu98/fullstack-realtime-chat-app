import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useSocket } from "@/provider/SocketProvider";
import { getChatMessages, sendMessage } from "../slices/chatThunks";
import { addMessage } from "../slices/chatSlice";

export const useChatRoom = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector((state) => state.chat.messages);
    const { socket } = useSocket();


    const pathname = usePathname();
    const chatId = pathname.split("/")[2]


    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message: any) => {
            if (message.chatId === chatId) {
                dispatch(addMessage(message));
            }
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


    const handleSendMessage = useCallback(
        (message: string) => {
            if (!chatId) return;
            dispatch(sendMessage({ text: message, chatId }));
        },
        [dispatch, chatId]
    );

    return {
        messages,
        sendMessage: handleSendMessage
    };
};
