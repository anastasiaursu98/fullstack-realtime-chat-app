"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LockIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { AuthCard } from "../commun/AuthCard";
import { InputField } from "../commun/InputField";
import { DividerWithText } from "./DividerWithText";
import { FormActions } from "./FormActions";

import { ROUTES } from "@/constants/routes";
import * as z from "zod";
import { AuthFooter } from "../commun/AuthFooter";
import { useLogin } from "../../hooks/useLogin";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")

  ,
  remember_me: z.boolean().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { submit, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = useCallback((data: LoginSchema) => {
    submit(data);
  }, [submit]);
  return (
    <AuthCard title="Sign In" error={error || ''}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <InputField
          disabled={isLoading}
          id="email"
          label="Email or Username"
          type="email"
          placeholder="Enter your email or username"
          icon={<UserIcon className="w-4 h-4 text-gray-400" />}
          {...register("email")}
          error={errors.email?.message}
        />
        <InputField
          disabled={isLoading}
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<LockIcon className="w-4 h-4 text-gray-400" />}
          password={true}
          {...register("password")}
          error={errors.password?.message}
        />
        <FormActions disabled={isLoading} />
        <Button
          disabled={isLoading}
          type="submit"
          variant="destructive"
          size="lg"
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
        <DividerWithText />

        <AuthFooter
          text="Don't have an account?"
          link={ROUTES.SIGNUP}
          linkText="Sign up"
        />
      </form>
    </AuthCard>
  );
};
