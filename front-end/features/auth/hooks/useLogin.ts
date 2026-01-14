"use client";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../slices/authThunks";
import { selectIsLoginLoading, selectLoginError } from "../slices/authSelectors";
import { ROUTES } from "@/constants/routes";
import { LoginSchema } from "../components/login/LoginForm";


export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Use detailed selectors for login specific state
  const isLoading = useSelector((state: RootState) => selectIsLoginLoading(state));
  const loginError = useSelector((state: RootState) => selectLoginError(state));

  // Filter out "Unauthorized" errors from checkAuth - only show login specific errors
  const displayError = loginError?.includes("Unauthorized") ? null : loginError;

  const submit = async (data: LoginSchema) => {
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {
      router.push(ROUTES.HOME_PAGE);
    }
  };

  return { submit, isLoading, error: displayError };
};
