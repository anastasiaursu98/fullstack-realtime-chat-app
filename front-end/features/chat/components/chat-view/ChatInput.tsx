"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
    onSubmit: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

export const ChatInput = ({
    onSubmit,
    disabled = false,
    placeholder = "Type a message..."
}: ChatInputProps) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = message.trim();
        if (!trimmed || disabled) return;

        onSubmit(trimmed);
        setMessage("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex items-end gap-2">
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    rows={1}
                    onInput={(e) => {
                        const el = e.currentTarget;
                        el.style.height = "auto";
                        el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
                    }}
                />
                <Button type="submit" disabled={!message.trim() || disabled}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};
