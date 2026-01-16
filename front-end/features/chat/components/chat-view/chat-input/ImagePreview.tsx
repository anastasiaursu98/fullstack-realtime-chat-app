"use client"

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
    file: string | null;
    onRemove: () => void;
}

export const ImagePreview = ({ file, onRemove }: ImagePreviewProps) => {
    return (
        <div className="relative h-16 w-16 bg-gray-100 rounded-md">
            <Image
                src={file || ""}
                alt="Preview"
                width={64}
                height={64}
                className="rounded-lg object-cover w-full h-full"
            />
            <Button
                variant="ghost"
                size="icon"
                className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-black/70 cursor-pointer hover:bg-black/90"
                onClick={onRemove}
            >
                <X className="h-4 w-4 text-white" />
            </Button>
        </div>
    )
}