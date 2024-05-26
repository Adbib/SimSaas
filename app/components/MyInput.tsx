import React from "react";

type Props = {
  [x: string]: React.AllHTMLAttributes<HTMLInputElement> | undefined;
} & { icon?: React.ReactElement; className?: string };

export default function Input({ icon, className, ...props }: Props) {
  return (
    <>
      {icon
        ? React.cloneElement(icon, {
            className:
              "w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto",
          })
        : null}

      <input
        {...props}
        className={`w-full pl-12  py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${icon ? "pr-3" : null} ${className} `}
      />
    </>
  );
}
