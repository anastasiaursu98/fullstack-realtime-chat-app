"use client";
"use client";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { ROUTES } from "@/constants/routes";
import { AuthStatus } from "../types/auth.types";
import { LoginSchema } from "../components/login/LoginForm";


export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { status, error } = useSelector((state: RootState) => state.auth);
  const isLoading = status === AuthStatus.LOADING;

  // Filter out "Unauthorized" errors from checkAuth - only show login specific errors
  const displayError = error?.includes("Unauthorized") ? null : error;

  const submit = async (data: LoginSchema) => {
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {
      router.push(ROUTES.HOME_PAGE);
    }
  };

  return { submit, isLoading, error: displayError };
};
