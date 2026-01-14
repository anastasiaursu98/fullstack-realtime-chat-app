import Link from "next/link";

interface AuthFooterProps {
  text: string;
  link: string;
  linkText: string;
}

export const AuthFooter = ({ text, link, linkText }: AuthFooterProps) => {
  return (
    <div className="text-center">
      <p className="text-sm font-normal text-gray-500">
        {text}{" "}
        <Link className="text-purple-600 hover:text-purple-700" href={link}>
          {linkText}
        </Link>
      </p>
    </div>
  );
};
