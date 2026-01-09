"use client";
import { Profile } from "@/features/user-profile/components/Profile";
import { ChatLayout } from "@/features/chat/layouts/ChatLayout";


export default function ProfilePage() {
    return (
        <ChatLayout>
            <Profile />
        </ChatLayout>
    );
};