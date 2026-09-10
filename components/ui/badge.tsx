import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "default", size = "md", children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900",
    secondary: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    success: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900",
    warning: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900",
    destructive: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900",
    outline: "bg-transparent text-slate-700 border-slate-300 dark:text-slate-300 dark:border-slate-700",
  };

  const sizeStyles = {
    sm: "text-[10px] font-medium px-2 py-0.5 rounded-md",
    md: "text-xs font-medium px-2.5 py-1 rounded-md",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 border font-medium transition-colors select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
