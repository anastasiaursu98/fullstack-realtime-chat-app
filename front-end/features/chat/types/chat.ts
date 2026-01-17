export interface Message {
    _id?: string;
    senderId: string;
    receiverId: string;
    text: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
    isRead: boolean;
}

export enum ChatStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed'
}

export type SendMessagePayload = {
    text: string;
    chatId: string;
    image?: string | null;
}