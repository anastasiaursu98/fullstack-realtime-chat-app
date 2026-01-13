"use client";

import { ChatHeaderMenu } from "./ChatHeaderMenu";
import { AvatarImage } from "@/components/shared/AvatarImage";
import { useAppSelector } from "@/lib/store";
import { selectAuthUser, selectAuthStatus } from "@/features/auth/slices/authSelectors";
import { AuthStatus } from "@/features/auth/types/auth.types";

export const ChatHeader = () => {
    const user = useAppSelector(selectAuthUser);
    const status = useAppSelector(selectAuthStatus);

    const profilePicture = user?.profilePic ?? "";
    const fullName = user?.fullName ?? "";
    const isLoading = status === AuthStatus.LOADING;

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 ml-6">
                    {!isLoading && profilePicture && fullName && (
                        <>
                            <AvatarImage src={profilePicture} size={40} />
                            <div>
                                <p className="text-sm font-medium">{fullName}</p>
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
