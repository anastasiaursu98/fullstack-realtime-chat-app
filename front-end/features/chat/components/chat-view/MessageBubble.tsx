import { cn } from "@/lib/utils";
import { Message } from "../../types/chat";
import Image from "next/image";
import { CheckCheck } from "lucide-react";

interface MessageBubbleProps {
    message: Message;
    isMine: boolean;
    showTimestamp?: boolean;
}

export const MessageImage = ({ image }: { image: string }) => {
    return (
        <Image
            src={image}
            alt="Preview"
            width={156}
            height={156}
            className="rounded-lg object-cover w-full h-full"
        />
    );
};

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
                        : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900",
                    message.image && "p-0"
                )}
            >
                {message.text && message.text}
                {message.image && <MessageImage image={message.image} />}

            </div>

            {showTimestamp && (
                <div className="flex items-end gap-2">
                    <span className="mt-1 text-xs text-gray-500">
                        {time}
                    </span>
                    {isMine && <CheckCheck className="h-4 w-4 text-gray-500" />}
                </div>
            )}
        </div>
    );
};
