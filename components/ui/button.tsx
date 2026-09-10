import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "subtle";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm focus-visible:ring-blue-500 shadow-blue-500/10",
      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 focus-visible:ring-slate-400",
      outline:
        "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-800 active:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 focus-visible:ring-slate-400",
      ghost:
        "bg-transparent hover:bg-slate-100 text-slate-700 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 focus-visible:ring-slate-400",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm focus-visible:ring-rose-500 shadow-rose-500/10",
      subtle:
        "bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/60 focus-visible:ring-blue-400",
    };

    const sizeStyles = {
      sm: "text-xs px-2.5 py-1.5 gap-1.5 h-8",
      md: "text-sm px-4 py-2 gap-2 h-10",
      lg: "text-base px-5 py-2.5 gap-2.5 h-12",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
