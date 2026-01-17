"use client";

import { AvatarImageProfile } from "./AvatarImageProfile";
import { UserInfo } from "./UserInfo";
import { AccountInformation } from "./AccountInformation";

export const Profile = () => {

    return (
        <div className="h-screen overflow-y-auto pt-10">
            <div className="max-w-2xl mx-auto p-8 rounded-xl bg-white shadow-sm border border-gray-100 space-y-10">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile Settings</h1>
                    <p className="text-muted-foreground text-sm">
                        Manage your personal information and account preferences
                    </p>
                </div>
                {/* avatar upload section */}
                <AvatarImageProfile />

                {/* user info section */}
                <UserInfo />

                {/* account information section */}
                <AccountInformation />
            </div>
        </div>
    );
};