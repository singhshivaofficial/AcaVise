import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, TrendingDown, TrendingUp, Minus, BookOpen, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white flex items-center gap-1"
        >
          Manage <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        {subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-neutral-800 dark:text-neutral-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-neutral-100">
                No enrolled subjects yet
              </h4>
              <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm">
                Your academic workspace is ready. Add your subjects to start tracking internal marks, target grades, and attendance.
              </p>
            </div>
            <Link href="/academics">
              <Button size="sm" className="mt-2 gap-1.5">
                <Plus className="h-4 w-4" /> Add Subjects
              </Button>
            </Link>
          </div>
        ) : (
          subjects.map((subject) => {
            const progressVariant =
              subject.currentScore >= 75
                ? "success"
                : subject.currentScore >= 65
                ? "warning"
                : "danger";

            return (
              <div
                key={subject.id}
                className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors dark:border-neutral-800/80 dark:bg-neutral-800/30 dark:hover:bg-neutral-800/60"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 dark:text-neutral-400 font-mono">
                        {subject.code}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-neutral-100 truncate">
                        {subject.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                      {subject.faculty ? `${subject.faculty} - ` : ""}{subject.credits} Credits
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
                    <span className="text-xs font-bold text-slate-800 dark:text-neutral-200">
                      {subject.currentScore}%
                    </span>
                  </div>
                </div>

                {/* Progress & Trend */}
                <div className="space-y-1.5">
                  <Progress value={subject.currentScore} variant={progressVariant} size="sm" />
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
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
                        <span className="text-slate-500 dark:text-neutral-400 flex items-center gap-0.5">
                          <Minus className="h-3 w-3" /> Stable
                        </span>
                      )}
                    </span>
                    <span>Target: Grade {subject.targetGrade}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
