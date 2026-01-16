import { Skeleton } from "@/components/ui/skeleton";

export const ChatViewSkeleton = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div className="flex items-center flex-col space-y-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-4 w-[300px]" />
                <Skeleton className="h-3 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
};