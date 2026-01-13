"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ChatMessages } from "./chat-messages/ChatMessages";
import { ChatInput } from "./ChatInput";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getChatMessages, sendMessage } from "../../slices/chatThunks";

export const ChatView = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector((state) => state.chat.messages);

    const pathname = usePathname();
    const chatId = pathname.split("/").pop();

    useEffect(() => {
        if (chatId) {
            dispatch(getChatMessages(chatId));
        }
    }, [dispatch, chatId]);

    const handleSendMessage = useCallback(
        (message: string) => {
            if (!chatId) return;
            dispatch(sendMessage({ text: message, chatId }));
        },
        [dispatch, chatId]
    );

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto p-4">
                <ChatMessages messages={messages} chatId={chatId} />
            </div>
            <ChatInput onSubmit={handleSendMessage} />
        </div>
    );
};
