"use client";
import { ChatListItem } from "./ChatListItem";
import { ChatSearchBar } from "./ChatSearchBar";
import { Chat } from "../../../types";

export const ChatSidebarContents = () => {
  // Mock chat data - replace with real data later
  const CHATS: Chat[] = [
    {
      id: "1",
      name: "Echipa Racheta",
      lastMessage: "Vasile sent an attachment",
      timestamp: "38m",
      avatar: '',
      isUnread: true,
      isMuted: true,
      hasStory: false,
      unreadCount: 2,
    },
    {
      id: "2",
      name: "Daniela Burduniuc",
      lastMessage: "Dar fara sa probez, greu",
      timestamp: "5h",
      avatar: '',
      isOnline: true,
      hasStory: false,
    },
    {
      id: "3",
      name: "Ami",
      lastMessage: "Active 2h ago",
      timestamp: "2h",
      avatar: '',
      hasStory: false,
    },
  ];

  const handleChatClick = (chatId: string) => {
    console.log('Chat clicked:', chatId);
    // TODO: Implement chat selection logic
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
      <div className="flex-1 overflow-y-auto">
        {CHATS.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            onClick={handleChatClick}
          />
        ))}
      </div>
    </div>
  );
};
