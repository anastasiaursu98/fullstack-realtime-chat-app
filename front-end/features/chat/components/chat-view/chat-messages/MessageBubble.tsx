import { cn } from "@/lib/utils";
import { Message } from "../../../types/chat";

interface MessageBubbleProps {
    message: Message;
    isMine: boolean;
    showTimestamp?: boolean;
}

export const MessageBubble = ({
    message,
    isMine,
    showTimestamp = false,
}: MessageBubbleProps) => {
    const time = new Date(message.createdAt).toLocaleTimeString("ro-RO", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className={cn("flex flex-col", isMine ? "items-end" : "items-start")}>
            <div
                className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2 text-sm",
                    "break-words whitespace-pre-wrap",
                    isMine
                        ? "bg-gradient-to-r from-purple-700 to-pink-600 text-white"
                        : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900"
                )}
            >
                {message.text}
            </div>

            {showTimestamp && (
                <span className="mt-1 px-2 text-xs text-gray-500">
                    {time}
                </span>
            )}
        </div>
    );
};
