"use client";

import { AppLogo } from "./AppLogo";

export const RouteLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative flex items-center justify-center">
          <AppLogo size="lg" className="animate-pulse" />
        </div>
      </div>
    </div>
  );
};
