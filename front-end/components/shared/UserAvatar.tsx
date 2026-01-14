import { AvatarImage } from "@/components/shared/AvatarImage";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
    src?: string;
    alt: string;
    size?: number;
    isOnline?: boolean;
    className?: string; // For the container
}

export const UserAvatar = ({
    src,
    alt,
    size = 40,
    isOnline = false,
    className,
}: UserAvatarProps) => {
    return (
        <div className={cn("relative flex-shrink-0", className)}>
            <AvatarImage
                src={src || ""}
                alt={alt}
                size={size}
                showAvatarImageButton={false}
            />

            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 flex h-4 w-4 translate-x-[10%] translate-y-[10%]">
                <span
                    className={cn(
                        "absolute inline-flex h-full w-full rounded-full opacity-75",
                        isOnline ? "bg-green-500 animate-ping" : "bg-gray-400 hidden"
                    )}
                ></span>
                <span
                    className={cn(
                        "relative inline-flex h-full w-full rounded-full border-2 border-white",
                        isOnline ? "bg-green-500" : "bg-gray-400"
                    )}
                ></span>
            </span>
        </div>
    );
};
