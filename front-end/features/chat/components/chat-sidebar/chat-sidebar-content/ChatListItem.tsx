"use client";

import { AvatarImage } from "@/components/shared/AvatarImage";
import { cn } from "@/lib/utils";
import { User } from "@/features/auth/types/auth.types";
import { useRouter } from "next/navigation";

export interface ChatListItemProps {
    user: User;
    isActive?: boolean;
    online?: boolean;
}

export const ChatListItem = ({
    user,
    isActive = false,
    online,
}: ChatListItemProps) => {

    const router = useRouter();

    const handleChatClick = (chatId: string) => {
        router.push(`/chat/${chatId}`);
    };

    return (
        <div
            className={cn(
                "flex items-center gap-3 py-2 cursor-pointer transition-colors min-h-[72px]",
                isActive ? "bg-blue-50" : "hover:bg-gray-50"
            )}
            onClick={() => handleChatClick(user._id)}
        >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
                <AvatarImage
                    src={user.profilePic || ""}
                    alt={user.fullName}
                    size={56}
                    showAvatarImageButton={false}
                />

                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 flex h-4 w-4">
                    <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75", `${online ? "bg-green-500  animate-ping" : "bg-gray-400"}`)}></span>
                    <span className={cn("relative inline-flex h-4 w-4 rounded-full border-2 border-white", `${online ? "bg-green-500" : "bg-gray-400"}`)}></span>
                </span>
            </div>

            {/* Chat info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <span className={cn("truncate font-semibold")}>
                        {user.fullName}
                    </span>

                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        {/* <span className="text-xs text-gray-500">{user.lastMessage}</span> */}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    {/* <p className={cn(
                        "text-xs truncate text-gray-500",
                        chat.isUnread && "font-medium text-gray-900"
                    )}>
                        {chat.lastMessage}
                    </p>

                    {chat.unreadCount && chat.unreadCount > 0 && (
                        <span className="flex-shrink-0 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                            {chat.unreadCount}
                        </span>
                    )} */}
                </div>
            </div>
        </div>
    );
};
