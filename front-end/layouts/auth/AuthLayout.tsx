import * as React from "react";
import { AppLogo } from "@/components/shared/AppLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-r from-purple-200 to-white w-full min-h-screen flex flex-col items-center py-8 px-4 sm:px-0">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center text-center overflow-visible">
        <div className="overflow-visible">
          <AppLogo size="lg" className="overflow-visible" />
        </div>
        <p className="text-sm sm:text-base md:text-lg font-normal text-gray-500  mt-4">
          Connect with your friends and the world around you
        </p>
      </div>

      {/* Children content */}
      <div className="flex flex-col items-center justify-center w-full mt-8 sm:mt-10">
        {children}
      </div>
    </div>
  );
}
