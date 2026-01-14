import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface FormActionsProps {
  disabled: boolean;
}
export const FormActions = ({ disabled }: FormActionsProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Checkbox id="remember-me" disabled={disabled} />
        <span className="text-sm font-normal text-gray-500">Remember me</span>
      </div>
      <Link
        className={`text-sm font-normal text-purple-600 hover:text-purple-700 ${disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
        href="/forgot-password"
      >
        Forgot password?
      </Link>
    </div>
  );
};
