
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { AppLogo } from "@/components/shared/AppLogo";

export const ChatSidebarHeader = () => {
  const router = useRouter();
  const { open, openMobile, isMobile } = useSidebar();
  const handleGoHome = () => router.push("/");

  const shouldShowContent = isMobile ? openMobile : open;

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="h-14 flex items-center">
        {shouldShowContent ? (
          <AppLogo size="sm" onClick={handleGoHome} />
        ) : null}
      </div>

    </div>
  );
};
