"use client";

import { UserAvatar } from "@/components/shared/UserAvatar";
import { cn } from "@/lib/utils";
import { User } from "@/features/auth/types/auth.types";
import { useParams, useRouter } from "next/navigation";

export interface ChatListItemProps {
    user: User;
    online?: boolean;
}

export const ChatListItem = ({
    user,
    online,
}: ChatListItemProps) => {
    const router = useRouter();
    const { id: chatId } = useParams<{ id: string }>();
    const isActive = chatId === user._id;

    const handleChatClick = (chatId: string) => {
        router.push(`/chat/${chatId}`);
    };

    const time = user.lastMessage?.createdAt
        ? new Date(user.lastMessage.createdAt).toLocaleTimeString("ro-RO", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : "";
    return (
        <div
            className={cn(
                "flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors min-h-[72px]",
                isActive ? "bg-gray-100" : "hover:bg-gray-100"
            )}
            onClick={() => handleChatClick(user._id)}
        >
            {/* Avatar */}
            <UserAvatar
                src={user.profilePic || ""}
                alt={user.fullName}
                size={56}
                isOnline={online}
            />

            {/* Chat info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <span className={cn("truncate font-semibold")}>
                        {user.fullName}
                    </span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <span className="text-xs text-gray-500">{user.lastMessage?.text?.substring(0, 15)}</span>
                    <span className="text-xs text-gray-500">{time}</span>
                </div>
            </div>
            {user && user.unreadMessagesCount > 0 && (
                <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    <span className="text-sm">{user.unreadMessagesCount}</span>
                </div>
            )}
        </div>
    );
};
