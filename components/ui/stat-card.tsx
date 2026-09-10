import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "success" | "warning" | "destructive";
  };
  icon?: React.ReactNode;
  trend?: {
    value: string;
    positive?: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  badge,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden hover:border-slate-300 dark:hover:border-neutral-700 transition-colors", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-neutral-100">
                {value}
              </span>
              {trend && (
                <span
                  className={cn(
                    "text-xs font-semibold flex items-center",
                    trend.positive !== false ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  )}
                >
                  {trend.positive !== false ? "↑" : "↓"} {trend.value}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-neutral-400 pt-0.5">{subtitle}</p>
            )}
          </div>
          {icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300 border border-slate-200/60 dark:border-neutral-700">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
