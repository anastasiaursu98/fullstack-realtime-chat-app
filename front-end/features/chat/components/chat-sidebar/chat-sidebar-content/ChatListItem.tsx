"use client";

import { AvatarImage } from "@/components/shared/AvatarImage";
import { cn } from "@/lib/utils";
import { ChatListItemProps } from "../../../types";

export const ChatListItem = ({
    chat,
    isActive = false,
    onClick,
}: ChatListItemProps) => {
    const handleClick = () => onClick?.(chat.id);

    return (
        <div
            className={cn(
                "flex items-center gap-3 py-2 cursor-pointer transition-colors min-h-[72px]",
                isActive ? "bg-blue-50" : "hover:bg-gray-50"
            )}
            onClick={handleClick}
        >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
                <AvatarImage
                    src={chat.avatar || ""}
                    alt={chat.name}
                    size={56}
                    showAvatarImageButton={false}
                />
                {chat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                )}
            </div>

            {/* Chat info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <span className={cn("truncate", chat.isUnread && "font-semibold")}>
                        {chat.name}
                    </span>

                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <p className={cn(
                        "text-xs truncate text-gray-500",
                        chat.isUnread && "font-medium text-gray-900"
                    )}>
                        {chat.lastMessage}
                    </p>

                    {chat.unreadCount && chat.unreadCount > 0 && (
                        <span className="flex-shrink-0 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                            {chat.unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
