import { ChatLayout } from "@/layouts/chat/ChatLayout";

export default function ChatLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ChatLayout>{children}</ChatLayout>;
}
