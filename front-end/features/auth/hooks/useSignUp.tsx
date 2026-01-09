"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signUp } from "../slices/authSlice";
import { ROUTES } from "@/constants/routes";
import { AuthStatus } from "../types/auth.types";
import type { SignUpData } from "../types/auth.types";

export const useSignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { status, error } = useSelector((state: RootState) => state.auth);
  const isLoading = status === AuthStatus.LOADING;

  const displayError = error?.includes("Unauthorized") ? null : error;

  const submit = async (data: SignUpData) => {
    const result = await dispatch(signUp(data));

    if (signUp.fulfilled.match(result)) {
      // Redirect to home page since user is now authenticated
      router.push(ROUTES.HOME_PAGE);
    }
  };

  return { submit, isLoading, error: displayError };
};
