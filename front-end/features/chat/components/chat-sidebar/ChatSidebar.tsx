"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { ChatSidebarHeader } from "./ChatSidebarHeader";
import { ChatSidebarContent } from "./ChatSidebarContent";

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
        <ChatSidebarContent />
      </SidebarContent>

    </Sidebar>
  );
};
