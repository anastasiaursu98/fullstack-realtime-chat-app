import { Skeleton } from "@/components/ui/skeleton";

export const ChatListSkeleton = () => {
    return (
        <div className="flex flex-col space-y-4">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4 px-4 py-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-2 w-[100px]" />
                    </div>
                </div>
            ))}
        </div>
    );
};