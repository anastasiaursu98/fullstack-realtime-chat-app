import { Message } from "../../../types/chat";
import { MessageBubble } from "./MessageBubble";
import { NoChatMessages } from "./NoChatMessages";

export interface ChatMessagesProps {
    messages: Message[];
    isLoading?: boolean;
    chatId?: string;
}

export const ChatMessages = ({
    messages,
    isLoading = false,
    chatId,
}: ChatMessagesProps) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading messages...</p>
            </div>
        );
    }

    if (messages?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <NoChatMessages />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {messages?.map((msg, index) => (
                <MessageBubble key={index} message={msg} showTimestamp isMine={msg.senderId === chatId} />
            ))}
        </div>
    );
};
