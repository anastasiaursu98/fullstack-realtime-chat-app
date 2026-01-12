
import { AvatarImage } from "@/components/shared/AvatarImage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";;
import { updateProfilePic } from "@/features/auth/slices/authThunks";
import { useAppDispatch } from "@/lib/store";
import { toast } from "sonner";
import { AuthStatus } from "@/features/auth/types/auth.types";

export const AvatarImageProfile = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const dispatch = useAppDispatch()
    const isLoading = useSelector((state: RootState) => state.auth.updateProfilePicStatus === AuthStatus.LOADING);
    const profilePic = useSelector(
        (state: RootState) => state.auth.user?.profilePic
    )

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            if (typeof base64Image === "string") {
                setSelectedImage(base64Image);
                try {
                    await dispatch(updateProfilePic(base64Image)).unwrap();
                    toast.success("Profile picture updated successfully");
                } catch (error: any) {
                    const errorMessage = error?.message || (typeof error === "string" ? error : "Failed to update profile picture");
                    toast.error(errorMessage);
                    setSelectedImage(null);
                }
            }
        };
    };


    return (
        <div className="flex flex-col items-center gap-6">
            <div className="group relative">
                <div className="rounded-full border-4 border-gray-100 p-1 transition-colors group-hover:border-gray-200">
                    <AvatarImage src={selectedImage || profilePic} size={150} />
                </div>
                <Label
                    htmlFor="avatar-upload"
                    className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-400 text-white shadow-lg transition-all hover:bg-gray-700 hover:scale-110 active:scale-95 border-2 border-white"
                >
                    <Camera className="h-4 w-4" />
                </Label>
                <Input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>
            <div className="text-center">
                <h3 className="text-sm font-medium text-gray-900">Profile Photo</h3>
                <p className="text-xs text-muted-foreground mt-1">{isLoading ? "Uploading..." : "Click the camera icon to upload"}</p>
            </div>
        </div>
    );
};