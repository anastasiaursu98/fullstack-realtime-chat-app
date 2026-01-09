"use client";

import { ChatMessages } from "./chat-messages/ChatMessages";
import { ChatInput } from "./ChatInput";
import { Message } from "../../types";

export const ChatView = () => {
    // Mock messages for demonstration
    const mockMessages: Message[] = [
        {
            id: "1",
            text: "Hello! How are you?",
            senderId: "1",
            isMine: true,
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            status: "sent",
        },
        {
            id: "2",
            text: "Hi! I'm doing great, thanks for asking!",
            senderId: "2",
            isMine: false,
            createdAt: new Date(Date.now() - 3000000).toISOString(),
            status: "sent",
        },
        {
            id: "3",
            text: "That's wonderful to hear! What have you been up to?",
            senderId: "1",
            isMine: true,
            createdAt: new Date(Date.now() - 1800000).toISOString(),
            status: "sent",
        },
    ];

    const handleSendMessage = (message: string) => {
        console.log('Sending message:', message);
        // TODO: Implement actual message sending logic
    };

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto p-4">
                <ChatMessages messages={mockMessages} />
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};
