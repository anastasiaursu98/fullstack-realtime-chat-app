import Image from "next/image";

interface AvatarImageProps {
  src?: string;
  size?: number;
  hasStory?: boolean;
  alt?: string;
  className?: string;
  showAvatarImageButton?: boolean;
}

export const AvatarImage = ({
  src,
  size = 60,
  hasStory = false,
  alt = "avatar",
  className = "",
  showAvatarImageButton = true,
}: AvatarImageProps) => {
  const ring = hasStory
    ? "p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
    : "p-[2px] bg-gray-300";

  return (
    <div className="relative">
      <div
        className={`rounded-full ${ring} ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="bg-white rounded-full w-full h-full p-[2px]">
          <Image
            src={src || "/fallback-avatar.png"}
            alt={alt}
            width={size}
            height={size}
            className="rounded-full object-cover w-full h-full"
          />
        </div>

      </div>
    </div>
  );
};
