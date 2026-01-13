import { useSelector } from "react-redux";
import { memo, useMemo } from "react";
import { selectAuthUser } from "@/features/auth/slices/authSelectors";

export const AccountInformation = memo(() => {
    const user = useSelector(selectAuthUser);

    const createdAt = user?.createdAt;

    const joinedDate = useMemo(() => {
        return createdAt
            ? new Date(createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
            })
            : "N/A";
    }, [createdAt]);

    return (
        <div className="space-y-6 pt-6 border-t border-gray-100">
            <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    Account Information
                </h2>
                <p className="text-sm text-muted-foreground">
                    Details about your account status.
                </p>
            </div>

            <dl className="grid gap-6 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <dt className="text-sm font-medium text-muted-foreground mb-1">
                        Member Since
                    </dt>
                    <dd className="text-base font-semibold text-gray-900">
                        {joinedDate}
                    </dd>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <dt className="text-sm font-medium text-muted-foreground mb-1">
                        Account Status
                    </dt>
                    <dd className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                            Active
                        </span>
                    </dd>
                </div>
            </dl>
        </div>
    );
});
