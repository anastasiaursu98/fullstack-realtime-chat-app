"use client"
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";

export const Chat = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    console.log(user);
    return (
        <div>
            <h1>Chat</h1>
            {user && <p>{user.fullName}</p>}
        </div>
    )
}