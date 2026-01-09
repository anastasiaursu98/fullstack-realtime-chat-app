"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { ChatSidebarHeader } from "./ChatSidebarHeader";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChatSidebarContents } from "./chat-sidebar-content/ChatSidebarContents";

export const ChatSidebar = () => {
  const { open } = useSidebar();
  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className={cn("bg-white py-2", open ? "px-4" : "px-0")}
    >
      <SidebarHeader>
        <ChatSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <ChatSidebarContents />
      </SidebarContent>

    </Sidebar>
  );
};
