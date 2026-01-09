"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { AvatarImage } from "@/components/shared/AvatarImage";

export const ChatHeader = () => {
  const { handleLogout } = useLogout();
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ml-6">
          <AvatarImage src={""} size={40} />
          <div>
            <p className="text-sm font-medium">John Doe</p>
          </div>
        </div>
        <div className="flex items-center justify-end px-6 py-4">
          <Button
            variant="ghost"
            size="default"
            className="cursor-pointer"
            onClick={handleLogout}
          >
            <span className="flex items-center justify-center gap-2 text-gray-600">
              <LogOutIcon className="w-4 h-4" /> Logout
            </span>
          </Button>
        </div>
      </div>
    </header >
  );
};
