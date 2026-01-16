"use client";

import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
    onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload = ({ onSelect }: ImageUploadProps) => {
    return (
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
            <Label
                htmlFor="image-upload"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-500 hover:text-gray-700"
            >
                <ImageIcon className="h-5 w-5" />
            </Label>
            <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onSelect}
            />
        </div>
    );
};
