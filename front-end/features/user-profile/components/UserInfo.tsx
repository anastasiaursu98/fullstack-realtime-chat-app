import React, { memo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export const UserInfo = memo(() => {
    const fullName = useSelector(
        (state: RootState) => state.auth.user?.fullName
    );

    const email = useSelector(
        (state: RootState) => state.auth.user?.email
    );

    const form = useForm({
        defaultValues: {
            fullName: "",
            email: "",
        },
    });

    useEffect(() => {
        form.reset({
            fullName: fullName || "",
            email: email || "",
        });
    }, [fullName, email, form]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    Personal Details
                </h2>
                <p className="text-sm text-muted-foreground">
                    View your personal information.
                </p>
            </div>

            <Form {...form}>
                <form className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <Label className="text-sm font-medium text-gray-700">
                                        Full Name
                                    </Label>
                                    <Input
                                        readOnly
                                        className="h-11 bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200"
                                        {...field}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <Label className="text-sm font-medium text-gray-700">
                                        Email Address
                                    </Label>
                                    <Input
                                        readOnly
                                        className="h-11 bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200"
                                        {...field}
                                    />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
});
