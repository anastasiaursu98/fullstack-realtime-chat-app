export interface User {
    id: string;
    name: string;
    avatar?: string;
    email?: string;
}

export interface Message {
    id: string;
    text: string;
    senderId: string;
    receiverId?: string;
    isMine: boolean;
    createdAt: string;
    status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
    attachments?: Attachment[];
}

export interface Attachment {
    id: string;
    type: 'image' | 'video' | 'file';
    url: string;
    name: string;
    size?: number;
}

export interface Chat {
    id: string;
    name: string;
    avatar?: string;
    lastMessage: string;
    timestamp: string;
    isOnline?: boolean;
    isUnread?: boolean;
    isMuted?: boolean;
    hasStory?: boolean;
    unreadCount?: number;
}

export interface ChatMessagesProps {
    messages: Message[];
    isLoading?: boolean;
    onLoadMore?: () => void;
}

export interface MessageBubbleProps {
    message: Message;
    showAvatar?: boolean;
    showTimestamp?: boolean;
}

export interface ChatListItemProps {
    chat: Chat;
    isActive?: boolean;
    onClick?: (chatId: string) => void;
}
