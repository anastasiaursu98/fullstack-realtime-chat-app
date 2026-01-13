"use client";
import { useEffect } from "react";
import { ChatListItem } from "./ChatListItem";
import { ChatSearchBar } from "./ChatSearchBar";
import { useAppSelector } from "@/lib/store";
import { useAppDispatch } from "@/lib/store";
import { getChatUsers } from "../../../slices/chatThunks";
import { useRouter } from "next/navigation";

export const ChatSidebarContents = () => {

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.chat.users);
  const router = useRouter();
  useEffect(() => {
    dispatch(getChatUsers());
  }, [dispatch]);

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <ChatSearchBar />

      {/* Messages / Requests Tabs */}
      <div className="flex border-b border-gray-200">
        <div className="flex-1 py-3">
          <p className="text-base font-semibold">Messages</p>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto pt-4">
        {users?.map((user, index) => (
          <ChatListItem
            key={index}
            user={user}
            onClick={handleChatClick}
          />
        ))}
      </div>
    </div>
  );
};
