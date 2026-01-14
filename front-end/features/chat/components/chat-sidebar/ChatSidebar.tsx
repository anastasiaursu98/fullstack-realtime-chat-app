"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { ChatSidebarHeader } from "./ChatSidebarHeader";
import { ChatSidebarContents } from "./chat-sidebar-content/ChatSidebarContents";

export const ChatSidebar = () => {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
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
