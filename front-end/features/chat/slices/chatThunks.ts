import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/config/axios";
import { SendMessagePayload } from "../types/chat";

export enum ChatActions {
    GET_CHAT_USERS = "chat/getChatUsers",
    GET_CHAT_MESSAGES = "chat/getChatMessages",
    SEND_MESSAGE = "chat/sendMessage",
}

export const getChatUsers = createAsyncThunk(ChatActions.GET_CHAT_USERS, async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/messages/users");
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const getChatMessages = createAsyncThunk(ChatActions.GET_CHAT_MESSAGES, async (id: string, { rejectWithValue }) => {
    try {
        const response = await api.get(`/messages/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const sendMessage = createAsyncThunk(ChatActions.SEND_MESSAGE, async ({ text, chatId, image }: SendMessagePayload, { rejectWithValue }) => {
    try {
        const response = await api.post(`/messages/send/${chatId}`, { text, image })
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})