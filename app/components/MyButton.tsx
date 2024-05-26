import type { ButtonHTMLAttributes } from "react";

type Props = {
  textValue: string;
  type?: "submit" | "button";
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function MyButton({
  textValue,
  type,
  className,
  isLoading,
  loadingText,
  ...props
}: Props) {
  return (
    <button
      className={`bg-indigo-500 text-white p-5 px-20 font-medium rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${className} `}
      type={type ? type : "button"}
      {...props}
    >
      {isLoading ? (loadingText ? loadingText : "Loading...") : textValue}
    </button>
  );
}
