import type { SignUpData, LoginData, User } from "../types/auth.types";
import { api } from "@/config/axios";


export const checkAuthApi = async () => {
    const res = await api.get("/auth/check");
    return res.data as User;
}

export const signUpApi = async (data: SignUpData) => {
    const res = await api.post("/auth/signup", data);
    return res.data;
};

export const loginApi = async (data: LoginData) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};