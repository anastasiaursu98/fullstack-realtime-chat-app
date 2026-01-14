"use client";

import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useChatRoom } from "../../hooks/useChatRoom";

export const ChatView = () => {
    const { messages, sendMessage } = useChatRoom();

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto p-4">
                <ChatMessages messages={messages} />
            </div>
            <ChatInput onSubmit={sendMessage} />
        </div>
    );
};
