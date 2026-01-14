"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatHeader } from "../../features/chat/components/chat-header/ChatHeader";
import { ChatSidebar } from "../../features/chat/components/chat-sidebar/ChatSidebar";

export function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <ChatSidebar />
            <SidebarInset>
                <ChatHeader />
                <main className="flex-1 flex flex-col overflow-y-auto py-8 px-2 md:px-4 lg:px-12">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
