"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/lib/store"; import { setOnlineUsers } from "@/features/auth/slices/authSlice";
;

type SocketContextValue = {
    socket: Socket | null;
};
const SocketContext = createContext<SocketContextValue>({
    socket: null,
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const dispatch = useAppDispatch()
    const user = useAppSelector((state: any) => state.auth.user);

    useEffect(() => {
        if (user) {
            // Connect to the backend
            const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
                query: {
                    userId: user._id,
                },
            });
            setSocket(socketInstance);
            // Listen for online users
            socketInstance.on("getOnlineUsers", (users) => {
                dispatch(setOnlineUsers(users))
            });
            return () => {
                socketInstance.close();
                setSocket(null);
            };
        } else {

            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
