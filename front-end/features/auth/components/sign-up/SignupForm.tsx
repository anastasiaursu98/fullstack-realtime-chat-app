"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, Loader2, MailIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

import { AuthCard } from "../commun/AuthCard";
import { AuthFooter } from "../commun/AuthFooter";
import { InputField } from "../commun/InputField";
import { useSignUp } from "../../hooks/useSignUp";

const registerSchema = z
  .object({
    fullName: z.string().nonempty("Full name is required").min(1),
    email: z
      .string()
      .trim()
      .nonempty("Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Password must contain at least one number"
      ),
    password_confirmation: z
      .string()
      .nonempty("Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

export type SignupSchema = z.infer<typeof registerSchema>;

export const SignupForm = () => {

  const { submit, isLoading, error } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = (data: SignupSchema) => {
    submit(data);
  };
  return (
    <AuthCard title="Create an account" error={error || ""}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <InputField
          icon={<UserIcon className="w-4 h-4 text-gray-400" />}
          id="fullName"
          label="Full Name"
          disabled={isLoading}
          type="text"
          placeholder="Enter your full name"
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <InputField
          icon={<MailIcon className="w-4 h-4 text-gray-400" />}
          id="email"
          label="Email"
          disabled={isLoading}
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputField
          icon={<LockIcon className="w-4 h-4 text-gray-400" />}
          id="password"
          label="Password"
          disabled={isLoading}
          type="password"
          placeholder="Enter your password"
          password={true}
          {...register("password")}
          error={errors.password?.message}
        />
        <InputField
          icon={<LockIcon className="w-4 h-4 text-gray-400" />}
          id="password_confirmation"
          label="Password Confirmation"
          disabled={isLoading}
          type="password"
          placeholder="Enter your password confirmation"
          password={true}
          {...register("password_confirmation")}
          error={errors.password_confirmation?.message}
        />
        <Button
          disabled={isLoading}
          type="submit"
          variant="destructive"
          size="lg"
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
        <AuthFooter
          text="Already have an account?"
          link={ROUTES.LOGIN}
          linkText="Sign in"
        />
      </form>
    </AuthCard>
  );
};
