import { createSlice } from "@reduxjs/toolkit";
import { getChatUsers } from "./chatThunks";
import { User } from "@/features/auth/types/auth.types";
import { ChatStatus } from "../types/chat";
import { Message } from "../types/chat";
import { getChatMessages } from "./chatThunks";
import { sendMessage } from "./chatThunks";

export interface ChatState {
    // users
    users: User[];
    isLoadingUsers: ChatStatus;
    errorUsers: string | null;

    // messages
    messages: Array<Message>;
    isLoadingMessages: ChatStatus;
    errorMessages: string | null;
}

const initialState: ChatState = {
    users: [],
    isLoadingUsers: ChatStatus.IDLE,
    errorUsers: null,
    messages: [],
    isLoadingMessages: ChatStatus.IDLE,
    errorMessages: null,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // users
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
                state.errorUsers = action.error.message as string;
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
                state.errorMessages = action.error.message as string;
            })
            //send message
            .addCase(sendMessage.pending, (state) => {
                // state.isLoadingMessages = ChatStatus.LOADING;
                state.errorMessages = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                // state.isLoadingMessages = ChatStatus.SUCCEEDED;
                state.messages.push(action.payload);
            })
            .addCase(sendMessage.rejected, (state, action) => {
                //state.isLoadingMessages = ChatStatus.FAILED;
                state.errorMessages = action.error.message as string;
            })

    }
})

export default chatSlice.reducer
