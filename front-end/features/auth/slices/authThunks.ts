import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuthApi, loginApi, logoutApi, signUpApi, updateProfilePicApi } from "../services/authApi";
import { LoginData, SignUpData } from "../types/auth.types";

export enum AuthActions {
    AUTH_SIGNUP = "auth/signup",
    AUTH_LOGIN = "auth/login",
    AUTH_CHECK = "auth/check",
    AUTH_LOGOUT = "auth/logout",
    AUTH_UPDATE_PROFILE_PIC = "auth/update-profile-pic"
}

export const signUp = createAsyncThunk(
    AuthActions.AUTH_SIGNUP,
    async (payload: SignUpData, { rejectWithValue }) => {
        try {
            return await signUpApi(payload)
        } catch (err: any) {
            const message = err.response?.data?.message || "Sign up failed";
            return rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    AuthActions.AUTH_LOGIN,
    async (payload: LoginData, { rejectWithValue }) => {
        try {
            return await loginApi(payload);
        } catch (err: any) {
            const message = err.response?.data?.message || "Login failed";
            return rejectWithValue(message);
        }
    }
)

export const checkAuth = createAsyncThunk(
    AuthActions.AUTH_CHECK,
    async (_, { rejectWithValue }) => {
        try {
            return await checkAuthApi()
        } catch (err: any) {
            const message = err.response?.data?.message || "Check auth failed";
            return rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk(
    AuthActions.AUTH_LOGOUT,
    async (_, { rejectWithValue }) => {
        try {
            return await logoutApi()
        } catch (err: any) {
            const message = err.response?.data?.message || "Logout failed";
            return rejectWithValue(message)
        }
    }
)

export const updateProfilePic = createAsyncThunk(
    AuthActions.AUTH_UPDATE_PROFILE_PIC,
    async (payload: string, { rejectWithValue }) => {
        try {
            return await updateProfilePicApi(payload)
        } catch (err: any) {
            const message = err.response?.data?.message || "Update profile pic failed";
            return rejectWithValue(message)
        }
    }
)
