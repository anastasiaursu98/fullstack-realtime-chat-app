"use client";

import { useCallback, useState } from "react";
import { ChatTextarea } from "./ChatTextarea";
import { ImageUpload } from "./ImageUpload";
import { ImagePreview } from "./ImagePreview";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/store";
import { sendMessage } from "../../../slices/chatThunks";
import { useParams } from "next/navigation";

interface ChatInputProps {
    chatId: string;
    placeholder?: string;
}

export const ChatInput = ({
    chatId,
    placeholder = "Type a message...",
}: ChatInputProps) => {
    const [message, setMessage] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    const dispatch = useAppDispatch();

    const handleSubmit = useCallback(() => {
        if (!chatId) return;

        const trimmed = message.trim();

        if (!trimmed && !imagePreview) return;

        dispatch(
            sendMessage({
                text: trimmed,
                chatId,
                image: imagePreview,
            })
        );

        setMessage("");
        setImagePreview(null);
    }, [message, imagePreview, dispatch, chatId]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file?.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64Image = reader.result;
            if (typeof base64Image === "string") {
                setImagePreview(base64Image);
            }

        };
    };

    const handleImageRemove = () => {
        setImagePreview(null);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <div className="flex flex-col gap-2">
                {imagePreview && <ImagePreview
                    file={imagePreview ? imagePreview : null}
                    onRemove={handleImageRemove}
                />}

                <div className="relative flex items-center">
                    <ChatTextarea
                        value={message}
                        imagePreview={imagePreview}
                        onChange={setMessage}
                        handleSubmit={handleSubmit}
                        placeholder={placeholder}
                    />

                    <ImageUpload onSelect={handleImageUpload} />
                </div>
            </div>
        </form >
    );
};
