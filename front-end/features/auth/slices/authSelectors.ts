import { AuthStatus } from "../types/auth.types";
import { AuthState } from "./authSlice";

// Global
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.status;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.status === AuthStatus.LOADING;

// Login
export const selectLoginError = (state: { auth: AuthState }) => state.auth.loginError;
export const selectIsLoginLoading = (state: { auth: AuthState }) => state.auth.loginStatus === AuthStatus.LOADING;

// SignUp
export const selectSignUpError = (state: { auth: AuthState }) => state.auth.signUpError;
export const selectIsSignUpLoading = (state: { auth: AuthState }) => state.auth.signUpStatus === AuthStatus.LOADING;
