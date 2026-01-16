"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatHeader } from "@/features/chat/components/ChatHeader";
import { ChatSidebar } from "@/features/chat/components/chat-sidebar/ChatSidebar";

export function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <ChatSidebar />
            <SidebarInset className="h-screen overflow-hidden flex flex-col">
                <ChatHeader />
                <main className="flex-1 flex flex-col overflow-hidden py-8">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
