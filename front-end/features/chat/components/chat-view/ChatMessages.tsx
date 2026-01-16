import { Message } from "../../types/chat";
import { MessageBubble } from "./MessageBubble";
import { NoChatMessages } from "@/components/shared/NoChatMessages";
import { useAppSelector } from "@/lib/store";

export interface ChatMessagesProps {
    messages: Message[];
    isLoading: boolean;
}

export const ChatMessages = ({
    messages,
    isLoading,
}: ChatMessagesProps) => {
    const user = useAppSelector((state) => state.auth.user);

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
