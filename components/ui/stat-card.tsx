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
    <Card className={cn("overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
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
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">{subtitle}</p>
            )}
          </div>
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400 border border-blue-100/50 dark:border-slate-700">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
