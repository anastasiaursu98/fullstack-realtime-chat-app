import { ChatLayout } from "@/features/chat/layouts/ChatLayout";
import { NoChatMessages } from "@/components/shared/NoChatMessages";

export default function Home() {
  return (
    <ChatLayout>
      <NoChatMessages
        title="Welcome to QuickTalk!"
        description="Select a conversation from the sidebar to start chatting"
      />
    </ChatLayout>
  );
}
