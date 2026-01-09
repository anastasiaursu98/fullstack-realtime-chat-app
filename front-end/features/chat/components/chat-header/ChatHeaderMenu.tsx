"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon, MoreVertical, UserIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export const ChatHeaderMenu = () => {
    const { handleLogout } = useLogout();
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(ROUTES.PROFILE)}>
                    <UserIcon className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                    onClick={handleLogout}
                >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
