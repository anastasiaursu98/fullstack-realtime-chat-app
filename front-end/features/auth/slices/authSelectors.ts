import { AuthStatus } from "../types/auth.types";
import { AuthState } from "./authSlice";

// Global
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.status;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.status === AuthStatus.AUTHENTICATED;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.status === AuthStatus.LOADING;

// Login
export const selectLoginStatus = (state: { auth: AuthState }) => state.auth.loginStatus;
export const selectLoginError = (state: { auth: AuthState }) => state.auth.loginError;
export const selectIsLoginLoading = (state: { auth: AuthState }) => state.auth.loginStatus === AuthStatus.LOADING;

// SignUp
export const selectSignUpStatus = (state: { auth: AuthState }) => state.auth.signUpStatus;
export const selectSignUpError = (state: { auth: AuthState }) => state.auth.signUpError;
export const selectIsSignUpLoading = (state: { auth: AuthState }) => state.auth.signUpStatus === AuthStatus.LOADING;

// CheckAuth
export const selectCheckAuthStatus = (state: { auth: AuthState }) => state.auth.checkAuthStatus;
export const selectCheckAuthError = (state: { auth: AuthState }) => state.auth.checkAuthError;

// Logout
export const selectLogoutStatus = (state: { auth: AuthState }) => state.auth.logoutStatus;
export const selectLogoutError = (state: { auth: AuthState }) => state.auth.logoutError;

// UpdateProfilePic
export const selectUpdateProfilePicStatus = (state: { auth: AuthState }) => state.auth.updateProfilePicStatus;
export const selectUpdateProfilePicError = (state: { auth: AuthState }) => state.auth.updateProfilePicError;
export const selectIsUpdateProfilePicLoading = (state: { auth: AuthState }) => state.auth.updateProfilePicStatus === AuthStatus.LOADING;
