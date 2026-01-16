"use client";
import { useEffect } from "react";
import { ChatListItem } from "./ChatListItem";
import { ChatSearchBar } from "./ChatSearchBar";
import { useAppSelector } from "@/lib/store";
import { useAppDispatch } from "@/lib/store";
import { getChatUsers } from "../../slices/chatThunks";
import { ChatListSkeleton } from "./ChatListSkeleton";
import { ChatStatus } from "../../types/chat";

export const ChatSidebarContent = () => {

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.chat.users);

  const onlineUsers = useAppSelector((state) => state.auth.onlineUsers);
  const isLoadingUsers = useAppSelector((state) => state.chat.isLoadingUsers);

  useEffect(() => {
    dispatch(getChatUsers());
  }, [dispatch]);


  return (
    <div className="flex flex-col h-full">
      {isLoadingUsers === ChatStatus.LOADING ? <ChatListSkeleton /> :
        <> <ChatSearchBar />

          {/* Messages / Requests Tabs */}
          <div className="flex border-b border-gray-200 px-4">
            <div className="flex-1 py-3">
              <p className="text-base font-semibold">Messages</p>
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto pt-4">
            {users?.map((user) => (
              <ChatListItem
                key={user._id}
                user={user}
                online={onlineUsers?.includes(user._id)}
              />
            ))}
          </div>
        </>
      }
    </div>
  );
};
