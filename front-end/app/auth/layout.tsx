import AuthLayout from "@/features/auth/layouts/AuthLayout";

export default function AuthLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthLayout>{children}</AuthLayout>;
}
