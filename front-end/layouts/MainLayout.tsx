"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <div className={cn("flex min-h-screen", !isAuthPage && "bg-gray-50")}>
      {children}
    </div>
  );
}
