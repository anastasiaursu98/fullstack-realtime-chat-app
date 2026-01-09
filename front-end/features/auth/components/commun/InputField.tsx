"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { JSX, useState } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon?: JSX.Element;
  password?: boolean;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputField = ({
  id,
  label,
  type,
  placeholder,
  icon,
  password,
  error,
  onChange,
  className,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="space-y-2">
      <div className="grid gap-2">
        <Label className="text-sm font-medium text-gray-600" htmlFor={id}>
          {label}
        </Label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}
          <Input
            id={id}
            type={password ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            className={`${icon ? "pl-10" : ""} ${password ? "pr-10" : ""} ${className || ""
              }`}
            {...props}
            aria-invalid={error ? "true" : "false"}
            onChange={onChange}
          />

          {password && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className="w-4 h-4 text-gray-500" />
              ) : (
                <EyeOffIcon className="w-4 h-4 text-gray-500" />
              )}
            </Button>
          )}
        </div>
      </div>
      {error && (
        <p className="text-sm font-normal text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
};
