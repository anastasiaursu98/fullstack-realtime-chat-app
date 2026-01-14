"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signUp } from "../slices/authThunks";
import { selectIsSignUpLoading, selectSignUpError } from "../slices/authSelectors";
import { ROUTES } from "@/constants/routes";

import type { SignUpData } from "../types/auth.types";

export const useSignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const isLoading = useSelector((state: RootState) => selectIsSignUpLoading(state));
  const signUpError = useSelector((state: RootState) => selectSignUpError(state));

  const displayError = signUpError?.includes("Unauthorized") ? null : signUpError;

  const submit = async (data: SignUpData) => {
    const result = await dispatch(signUp(data));

    if (signUp.fulfilled.match(result)) {
      router.push(ROUTES.LOGIN);
    }

  };

  return { submit, isLoading, error: displayError };
};
