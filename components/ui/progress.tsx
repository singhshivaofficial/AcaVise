import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "danger";
  showLabel?: boolean;
}

export function Progress({
  className,
  value = 0,
  max = 100,
  size = "md",
  variant = "default",
  showLabel = false,
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const variantBarClasses = {
    default: "bg-blue-600 dark:bg-blue-500",
    success: "bg-emerald-500 dark:bg-emerald-400",
    warning: "bg-amber-500 dark:bg-amber-400",
    danger: "bg-rose-500 dark:bg-rose-400",
  };

  return (
    <div className="w-full space-y-1">
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          "w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", variantBarClasses[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          <span>{percentage.toFixed(0)}%</span>
          <span>{max}%</span>
        </div>
      )}
    </div>
  );
}
