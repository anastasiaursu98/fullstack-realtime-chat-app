import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const ChatSearchBar = () => {
    return (
        <div className="px-4 py-2">
            <div className="relative group">
                <Search
                    className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 z-10",
                        "h-4 w-4 text-gray-400",
                        "pointer-events-none"
                    )}
                />

                <Input
                    type="text"
                    placeholder="Search conversations"
                    className={cn(
                        "h-9 w-full rounded-xl",
                        "pl-10 pr-3 text-sm",
                        "bg-gray-100/80 backdrop-blur",
                        "border border-transparent",
                        "placeholder:text-gray-400",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2 focus-visible:ring-gray-300",
                        "transition-all"
                    )}
                />
            </div>
        </div>
    );
};
