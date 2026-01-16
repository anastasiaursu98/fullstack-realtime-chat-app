import { MessageSquare } from "lucide-react";

interface NoChatMessagesProps {
    title?: string;
    description?: string;
}

export const NoChatMessages = ({
    title = "No messages yet",
    description = "Start a conversation!"
}: NoChatMessagesProps) => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center h-full">
            <div className="max-w-md text-center space-y-6">
                {/* Icon Display */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-400 flex items-center
             justify-center animate-bounce"
                        >
                            <MessageSquare className="w-8 h-8 text-white " />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
                <p className="text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
};