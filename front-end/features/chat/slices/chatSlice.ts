import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/features/auth/types/auth.types";
import { ChatStatus } from "../types/chat";
import { Message } from "../types/chat";
import { getChatMessages, getChatUser, getChatUsers, markMessagesAsRead, sendMessage } from "./chatThunks";


export interface ChatState {
    // users
    users: User[];
    isLoadingUsers: ChatStatus;
    errorUsers: string | null;

    // messages
    messages: Array<Message>;
    isLoadingMessages: ChatStatus;
    errorMessages: string | null;
    isSendingMessage: boolean;

    // chat user
    chatUser: User | null;
    isLoadingChatUser: ChatStatus;
    errorChatUser: string | null;
}

const initialState: ChatState = {
    users: [],
    isLoadingUsers: ChatStatus.IDLE,
    errorUsers: null,
    messages: [],
    isLoadingMessages: ChatStatus.IDLE,
    errorMessages: null,
    isSendingMessage: false,
    chatUser: null,
    isLoadingChatUser: ChatStatus.IDLE,
    errorChatUser: null,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            //get users
            .addCase(getChatUsers.pending, (state) => {
                state.isLoadingUsers = ChatStatus.LOADING;
                state.errorUsers = null;
            })
            .addCase(getChatUsers.fulfilled, (state, action) => {
                state.isLoadingUsers = ChatStatus.SUCCEEDED;
                state.users = action.payload;
            })
            .addCase(getChatUsers.rejected, (state, action) => {
                state.isLoadingUsers = ChatStatus.FAILED;
                state.errorUsers = action.payload as string;
            })
            //get messages
            .addCase(getChatMessages.pending, (state) => {
                state.isLoadingMessages = ChatStatus.LOADING;
                state.errorMessages = null;
            })
            .addCase(getChatMessages.fulfilled, (state, action) => {
                state.isLoadingMessages = ChatStatus.SUCCEEDED;
                state.messages = action.payload;
            })
            .addCase(getChatMessages.rejected, (state, action) => {
                state.isLoadingMessages = ChatStatus.FAILED;
                state.errorMessages = action.payload as string;
            })
            //send message
            .addCase(sendMessage.pending, (state) => {
                state.isSendingMessage = true;
                state.errorMessages = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isSendingMessage = false;
                state.messages.push(action.payload);
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isSendingMessage = false;
                state.errorMessages = action.payload as string;
            })
            //chat user
            .addCase(getChatUser.pending, (state) => {
                state.isLoadingChatUser = ChatStatus.LOADING;
                state.errorChatUser = null;
            })
            .addCase(getChatUser.fulfilled, (state, action) => {
                state.chatUser = action.payload;
                state.isLoadingChatUser = ChatStatus.SUCCEEDED;
            })
            .addCase(getChatUser.rejected, (state, action) => {
                state.isLoadingChatUser = ChatStatus.FAILED;
                state.errorChatUser = action.payload as string;
            })
            //mark messages as read
            .addCase(markMessagesAsRead.pending, (state) => {
                state.isLoadingMessages = ChatStatus.LOADING;
                state.errorMessages = null;
            })
            .addCase(markMessagesAsRead.fulfilled, (state, action) => {
                const readerId = action.payload.readerId;

                //mark messages as read
                state.messages = state.messages.map((msg) =>
                    msg.senderId === readerId && !msg.isRead
                        ? { ...msg, isRead: true }
                        : msg
                )
                state.isLoadingMessages = ChatStatus.SUCCEEDED;
            })
            .addCase(markMessagesAsRead.rejected, (state, action) => {
                state.isLoadingMessages = ChatStatus.FAILED;
                state.errorMessages = action.payload as string;
            })

    }
})

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer
