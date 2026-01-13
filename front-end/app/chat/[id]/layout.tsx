import { ChatLayout } from "@/features/chat/layouts/ChatLayout";

export default function ChatLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ChatLayout>{children}</ChatLayout>;
}
