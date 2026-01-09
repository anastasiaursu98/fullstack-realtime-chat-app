import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signUpApi, loginApi, checkAuthApi } from '../services/authApi'
import { SignUpData, LoginData, User, AuthStatus } from '../types/auth.types'


enum AuthActions {
    AUTH_SIGNUP = "auth/signup",
    AUTH_LOGIN = "auth/login",
    AUTH_CHECK = "auth/check",
}

export interface AuthState {
    user: null | User
    status: AuthStatus
    error: string | null
}
const initialState: AuthState = {
    user: null,
    status: AuthStatus.IDLE,
    error: null,
}

export const signUp = createAsyncThunk(AuthActions.AUTH_SIGNUP, async (payload: SignUpData, { rejectWithValue }) => {
    try {
        return await signUpApi(payload)
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message)
    }
})

export const login = createAsyncThunk(AuthActions.AUTH_LOGIN, async (payload: LoginData, { rejectWithValue }) => {
    try {
        return await loginApi(payload);
    } catch (err: any) {

        const message = err.response?.data?.message || "Login failed";
        return rejectWithValue(message);
    }
})

export const checkAuth = createAsyncThunk(AuthActions.AUTH_CHECK, async (_, { rejectWithValue }) => {
    try {
        return await checkAuthApi()
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message)
    }
})
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        //CheckAuth
        builder
            .addCase(checkAuth.pending, (state) => {
                state.status = AuthStatus.LOADING
                state.error = null
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = AuthStatus.AUTHENTICATED
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = AuthStatus.UNAUTHENTICATED
                state.error = action.payload as string
            })
        //SignUp
        builder
            .addCase(signUp.pending, (state, action) => {
                state.status = AuthStatus.LOADING;
                state.error = null
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = AuthStatus.AUTHENTICATED;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = AuthStatus.UNAUTHENTICATED
                state.error = action.payload as string
            })
            //Login
            .addCase(login.pending, (state) => {
                state.status = AuthStatus.LOADING
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = AuthStatus.AUTHENTICATED
            })
            .addCase(login.rejected, (state, action) => {
                state.status = AuthStatus.UNAUTHENTICATED
                state.error = action.payload as string
            })
    }
})


export default authSlice.reducer
