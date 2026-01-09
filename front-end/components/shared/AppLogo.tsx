"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface AppLogoProps {
  /**
   * Size variant of the logo
   * - "sm": Small size (text-3xl) - for sidebar
   * - "md": Medium size (text-4xl) - default
   * - "lg": Large responsive size (text-4xl sm:text-5xl md:text-6xl) - for auth pages
   */
  size?: "sm" | "md" | "lg";
  /**
   * Optional click handler. If provided, the logo will be clickable
   */
  onClick?: () => void;
  /**
   * Additional className to apply to the logo
   */
  className?: string;
  /**
   * Whether the logo should be clickable and navigate to home page
   * @default false
   */
  clickable?: boolean;
}

export const AppLogo = ({
  size = "md",
  onClick,
  className,
  clickable = false,
}: AppLogoProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (clickable) {
      router.push("/");
    }
  };

  const isClickable = onClick || clickable;

  const sizeClasses = {
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-4xl sm:text-5xl md:text-6xl",
  };

  return (
    <h1
      className={cn(
        "font-bold font-kaushan-script",
        sizeClasses[size],
        isClickable && "cursor-pointer",
        className
      )}
    >
      <span
        onClick={isClickable ? handleClick : undefined}
        className={cn(
          "bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent",
          size === "sm" && "px-2 transition-opacity duration-200",
          size === "lg" && "inline-block py-3 px-1",
          size === "md" && "px-2"
        )}
      >
        StoryLine
      </span>
    </h1>
  );
};
