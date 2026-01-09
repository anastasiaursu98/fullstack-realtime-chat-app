"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
    onSendMessage?: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export const ChatInput = ({
    onSendMessage,
    placeholder = "Type a message...",
    disabled = false
}: ChatInputProps) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage?.(message.trim());
            setMessage("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-end gap-2">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={1}
                    className={cn(
                        "flex-1 resize-none rounded-lg border border-gray-300 px-4 py-2",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                        "disabled:bg-gray-100 disabled:cursor-not-allowed",
                        "max-h-32 min-h-[40px]"
                    )}
                    style={{
                        height: "auto",
                        minHeight: "40px",
                    }}
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                    }}
                />
                <Button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    className="h-10 px-4"
                >
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </form>
    );
};