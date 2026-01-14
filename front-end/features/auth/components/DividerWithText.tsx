import { FC } from "react";

interface DividerWithTextProps {
  text?: string;
}

export const DividerWithText: FC<DividerWithTextProps> = ({ text = "OR" }) => {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-sm font-semibold text-gray-500">{text}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
};
