import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Subject } from "@/types";

interface SubjectPerformanceListProps {
  subjects: Subject[];
}

export function SubjectPerformanceList({ subjects }: SubjectPerformanceListProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Subject Performance</CardTitle>
          <CardDescription>Continuous assessment progress across enrolled courses</CardDescription>
        </div>
        <Link
          href="/academics"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
        >
          Details <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        {subjects.map((subject) => {
          const progressVariant =
            subject.currentScore >= 75
              ? "success"
              : subject.currentScore >= 65
              ? "warning"
              : "danger";

          return (
            <div
              key={subject.id}
              className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors dark:border-slate-800/80 dark:bg-slate-800/30 dark:hover:bg-slate-800/60"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                      {subject.code}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {subject.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {subject.faculty} • {subject.credits} Credits
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Badge
                    variant={
                      subject.status === "Good Standing"
                        ? "success"
                        : subject.status === "Needs Attention"
                        ? "warning"
                        : "destructive"
                    }
                    size="sm"
                  >
                    {subject.status}
                  </Badge>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {subject.currentScore}%
                  </span>
                </div>
              </div>

              {/* Progress & Trend */}
              <div className="space-y-1.5">
                <Progress value={subject.currentScore} variant={progressVariant} size="sm" />
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    {subject.trend === "up" && (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                        <TrendingUp className="h-3 w-3" /> {subject.trendValue}
                      </span>
                    )}
                    {subject.trend === "down" && (
                      <span className="text-rose-600 dark:text-rose-400 flex items-center gap-0.5">
                        <TrendingDown className="h-3 w-3" /> {subject.trendValue}
                      </span>
                    )}
                    {subject.trend === "stable" && (
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-0.5">
                        <Minus className="h-3 w-3" /> Stable
                      </span>
                    )}
                  </span>
                  <span>Target: Grade {subject.targetGrade}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
