"use client";

import { ChatHeaderMenu } from "./ChatHeaderMenu";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { getChatUser } from "@/features/chat/slices/chatThunks";
import { ROUTES } from "@/constants/routes";

export const ChatHeader = () => {
    const { id: userId } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const chatUser = useAppSelector((state) => state.chat.chatUser);
    const onlineUsers = useAppSelector((state) => state.auth.onlineUsers);
    const online = onlineUsers?.includes(chatUser?._id || "");

    const isProfilePage = usePathname() === ROUTES.PROFILE;

    useEffect(() => {
        if (userId) {
            dispatch(getChatUser(userId));
        }
    }, [dispatch, userId]);

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 ml-6">
                    {!isProfilePage && chatUser && (
                        <>

                            <div className="relative flex-shrink-0">
                                <UserAvatar
                                    src={chatUser.profilePic || ""}
                                    alt={chatUser.fullName}
                                    size={40}
                                    isOnline={online}
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium">{chatUser.fullName}</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex items-center justify-end px-6 py-4">
                    <ChatHeaderMenu />
                </div>
            </div>
        </header>
    );
};
