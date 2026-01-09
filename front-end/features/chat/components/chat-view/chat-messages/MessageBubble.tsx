import { cn } from "@/lib/utils";
import { MessageBubbleProps } from "../../../types";

export const MessageBubble = ({
    message,
    showTimestamp = false
}: MessageBubbleProps) => {
    return (
        <div className={cn("flex flex-col", message.isMine ? "items-end" : "items-start")}>
            <div
                className={cn(
                    "inline-block w-fit max-w-[70%]",
                    "rounded-2xl px-4 py-2 text-sm",
                    "break-words whitespace-pre-wrap",
                    message.isMine
                        ? "bg-gradient-to-r from-purple-700 to-pink-600 text-white"
                        : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900"
                )}
            >
                {message.text}
            </div>
            {showTimestamp && (
                <span className="text-xs text-gray-500 mt-1 px-2">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </span>
            )}
        </div>
    );
};
