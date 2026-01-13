import { ChatState } from "./chatSlice";

export const selectChatUsers = (state: ChatState) => state.users;
export const selectChatLoading = (state: ChatState) => state.isLoadingUsers;
export const selectChatError = (state: ChatState) => state.errorUsers;