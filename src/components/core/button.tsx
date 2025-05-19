import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const sizeClasses = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-md",
  lg: "px-5 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  size = "md",
  loading = false,
  startIcon,
  endIcon,
  onClick,
  className = "",
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `flex items-center justify-center rounded-md border border-indigo-600 bg-indigo-600 text-center align-middle text-base font-semibold tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700`,
        sizeClasses[size],
        className,
      )}
      disabled={loading}
    >
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {startIcon && <span className="mr-2">{startIcon}</span>}
          {children}
          {endIcon && <span className="ml-2">{endIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
