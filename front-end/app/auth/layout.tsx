import AuthLayout from "@/layouts/auth/AuthLayout";

export default function AuthLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthLayout>{children}</AuthLayout>;
}
