import { MessageBubble } from "./MessageBubble";
import { ChatMessagesProps } from "../../../types";

export const ChatMessages = ({
    messages,
    isLoading = false,
    onLoadMore
}: ChatMessagesProps) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading messages...</p>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p className="text-lg font-medium">No messages yet</p>
                <p className="text-sm mt-1">Start a conversation!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} showTimestamp />
            ))}
        </div>
    );
};
