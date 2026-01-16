"use client";

import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./chat-input/ChatInput";
import { useChatRoom } from "../../hooks/useChatRoom";
import { ChatStatus } from "../../types/chat";
import { ChatViewSkeleton } from "./ChatViewSkeleton";
import { NoChatMessages } from "@/components/shared/NoChatMessages";

export const ChatView = () => {
    const { messages, isLoadingMessages, chatId } = useChatRoom();

    const isLoading = isLoadingMessages === ChatStatus.LOADING;

    return (
        <div className="flex h-full flex-col relative">
            {isLoading ? <ChatViewSkeleton /> :
                <><div className="flex-1 overflow-y-auto">
                    <div className={`p-4 mx-auto w-full pb-20 ${messages?.length === 0 ? "h-full" : ""} lg:max-w-7xl`}>
                        {messages?.length === 0 ?
                            <div className="h-full flex items-center justify-center">
                                <NoChatMessages title="Start a conversation" description="Write a message below to begin chatting." />
                            </div>
                            : <ChatMessages messages={messages} isLoading={isLoading} />
                        }
                    </div>
                </div>
                    <div className="flex-none">
                        <div className="p-4 mx-auto w-full lg:max-w-7xl">
                            <ChatInput chatId={chatId} />
                        </div>
                    </div>
                </>}
        </div>
    );
};
