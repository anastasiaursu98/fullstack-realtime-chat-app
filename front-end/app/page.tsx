import { ChatView } from "@/features/chat/components/chat-view/ChatView";
import { ChatLayout } from "@/features/chat/layouts/ChatLayout";

export default function Home() {
  return (
    <ChatLayout>
      <ChatView />
    </ChatLayout>
  );
}
