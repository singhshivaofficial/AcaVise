import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "default", size = "md", children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700",
    secondary: "bg-slate-50 text-slate-600 border-slate-200 dark:bg-neutral-900 dark:text-neutral-400 dark:border-neutral-800",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900",
    warning: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900",
    destructive: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900",
    outline: "bg-transparent text-slate-700 border-slate-200 dark:text-neutral-300 dark:border-neutral-700",
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
