import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, AuthStatus } from '../types/auth.types'
import { signUp, login, checkAuth, logout, updateProfilePic } from './authThunks'

export interface AuthState {
    user: User | null;
    status: AuthStatus; // Global status (IDLE, LOADING, AUTHENTICATED, UNAUTHENTICATED)    

    // Login
    loginStatus: AuthStatus;
    loginError: string | null;

    // SignUp
    signUpStatus: AuthStatus;
    signUpError: string | null;

    // Check Auth
    checkAuthStatus: AuthStatus;
    checkAuthError: string | null;

    // Logout
    logoutStatus: AuthStatus;
    logoutError: string | null;

    // Update Profile Pic
    updateProfilePicStatus: AuthStatus;
    updateProfilePicError: string | null;

    onlineUsers: string[] | null; // Array of user IDs
}

const initialState: AuthState = {
    user: null,
    status: AuthStatus.IDLE,

    loginStatus: AuthStatus.IDLE,
    loginError: null,

    signUpStatus: AuthStatus.IDLE,
    signUpError: null,

    checkAuthStatus: AuthStatus.IDLE,
    checkAuthError: null,

    logoutStatus: AuthStatus.IDLE,
    logoutError: null,

    updateProfilePicStatus: AuthStatus.IDLE,
    updateProfilePicError: null,

    onlineUsers: []
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthStatus: (state) => {
            state.signUpStatus = AuthStatus.IDLE;
            state.signUpError = null;
            state.loginStatus = AuthStatus.IDLE;
            state.loginError = null;
            state.updateProfilePicStatus = AuthStatus.IDLE;
            state.updateProfilePicError = null;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        }
    },
    extraReducers(builder) {
        // CheckAuth
        builder
            .addCase(checkAuth.pending, (state) => {
                state.checkAuthStatus = AuthStatus.LOADING;
                state.status = AuthStatus.LOADING;
                state.checkAuthError = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.checkAuthStatus = AuthStatus.SUCCEEDED;
                state.user = action.payload;
                state.status = AuthStatus.AUTHENTICATED;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.checkAuthStatus = AuthStatus.FAILED;
                state.checkAuthError = action.payload as string;
                state.status = AuthStatus.UNAUTHENTICATED;
                state.user = null;
            })

        // SignUp
        builder
            .addCase(signUp.pending, (state) => {
                state.signUpStatus = AuthStatus.LOADING;
                state.signUpError = null;
            })
            .addCase(signUp.fulfilled, (state) => {
                state.signUpStatus = AuthStatus.SUCCEEDED;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.signUpStatus = AuthStatus.FAILED;
                state.signUpError = action.payload as string;
            })

        // Login
        builder
            .addCase(login.pending, (state) => {
                state.loginStatus = AuthStatus.LOADING;
                state.loginError = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.loginStatus = AuthStatus.SUCCEEDED;
                state.user = action.payload;
                state.status = AuthStatus.AUTHENTICATED;
            })
            .addCase(login.rejected, (state, action) => {
                state.loginStatus = AuthStatus.FAILED;
                state.loginError = action.payload as string;
            })

        // Logout
        builder
            .addCase(logout.pending, (state) => {
                state.logoutStatus = AuthStatus.LOADING;
                state.logoutError = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.logoutStatus = AuthStatus.SUCCEEDED;
                state.user = null;
                state.status = AuthStatus.UNAUTHENTICATED;
                // Reset other sensitive states
                state.loginStatus = AuthStatus.IDLE;
                state.loginError = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.logoutStatus = AuthStatus.FAILED;
                state.logoutError = action.payload as string;
                state.user = null;
                state.status = AuthStatus.UNAUTHENTICATED;
            })

        // UpdateProfilePic
        builder
            .addCase(updateProfilePic.pending, (state) => {
                state.updateProfilePicStatus = AuthStatus.LOADING;
                state.updateProfilePicError = null;
            })
            .addCase(updateProfilePic.fulfilled, (state, action) => {
                state.updateProfilePicStatus = AuthStatus.SUCCEEDED;
                if (state.user) {
                    // Update the specific field
                    state.user.profilePic = action.payload.profilePic;
                }
            })
            .addCase(updateProfilePic.rejected, (state, action) => {
                state.updateProfilePicStatus = AuthStatus.FAILED;
                state.updateProfilePicError = action.payload as string;
            })
    }
})

export const { resetAuthStatus, setOnlineUsers } = authSlice.actions;
export default authSlice.reducer
