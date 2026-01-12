"use client";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authThunks";
import { ROUTES } from "@/constants/routes";

export const useLogout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleLogout = async () => {
        await dispatch(logout());
        router.push(ROUTES.LOGIN);
    };

    return { handleLogout };
};
