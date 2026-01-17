"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { ChatSidebarHeader } from "./ChatSidebarHeader";
import { ChatSidebarContent } from "./ChatSidebarContent";
import { useSocket } from "../../providers/SocketProvider";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store";
import { updateUserWithNewMessage } from "../../slices/chatSlice";
import { Message } from "../../types/chat";
import { useParams } from "next/navigation";

export const ChatSidebar = () => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const params = useParams(); // Get current chat ID if open

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: Message) => {
      // If we are currently chatting with this user, don't increment unread count
      // otherwise increment
      const isCurrentChat = params?.id === message.senderId;

      dispatch(updateUserWithNewMessage({
        message,
        shouldIncrement: !isCurrentChat
      }));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch, params?.id]);

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
