import { Message } from "../../../types/chat";
import { MessageBubble } from "./MessageBubble";
import { NoChatMessages } from "../../../../../components/shared/NoChatMessages";
import { useAppSelector } from "@/lib/store";

export interface ChatMessagesProps {
    messages: Message[];
    isLoading?: boolean;
}

export const ChatMessages = ({
    messages,
    isLoading = false,
}: ChatMessagesProps) => {
    const user = useAppSelector((state) => state.auth.user);

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
                <MessageBubble
                    key={index}
                    message={msg}
                    showTimestamp
                    isMine={msg.senderId === user?._id}
                />
            ))}
        </div>
    );
};
