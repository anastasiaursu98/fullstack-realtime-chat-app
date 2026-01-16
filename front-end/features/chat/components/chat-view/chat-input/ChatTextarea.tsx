"use client";

import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatTextareaProps {
    value: string;
    imagePreview: string | null;
    onChange: (value: string) => void;
    handleSubmit: () => void;
    placeholder?: string;
}

export const ChatTextarea = ({
    value,
    imagePreview,
    onChange,
    handleSubmit,
    placeholder,
}: ChatTextareaProps) => {
    return (
        <div className="relative flex-1">
            <Textarea
                value={value}
                placeholder={placeholder}
                rows={1}
                className="min-h-[48px] resize-none rounded-3xl bg-gray-50 pl-12 pr-12 py-3"
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                    }
                }}
                onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
                }}
            />

            {(value.trim() || imagePreview) && (
                <Button
                    onClick={handleSubmit}
                    type="submit"
                    size="icon"
                    className="cursor-pointer absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
                >
                    <SendHorizontal className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
};
