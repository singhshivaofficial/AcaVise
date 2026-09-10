import * as React from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, CheckCircle, ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StudyPriorityItem } from "@/types";

interface PriorityFocusListProps {
  priorities: StudyPriorityItem[];
}

export function PriorityFocusList({ priorities }: PriorityFocusListProps) {
  return (
    <Card className="h-full flex flex-col border-amber-200/60 bg-gradient-to-b from-amber-50/20 via-white to-white dark:border-amber-900/40 dark:from-amber-950/10 dark:via-slate-900 dark:to-slate-900">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle>Your Focus (Study Priority Intelligence)</CardTitle>
            <Badge variant="warning" size="sm">
              Algorithmic Ranking
            </Badge>
          </div>
          <CardDescription>
            Weighted priority based on credit hours, target grade risk, and upcoming assessments
          </CardDescription>
        </div>
        <Link
          href="/priority"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
        >
          Priority Matrix <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="space-y-3.5 flex-1">
        {priorities.map((item) => {
          const isRank1 = item.rank === 1;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                isRank1
                  ? "border-rose-200 bg-rose-50/40 dark:border-rose-900/50 dark:bg-rose-950/20"
                  : "border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      isRank1
                        ? "bg-rose-600 text-white"
                        : "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    #{item.rank}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.subjectName}
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {item.subjectCode} • {item.impactFactor}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Badge variant={item.urgency === "High" ? "destructive" : "warning"} size="sm">
                    Priority Score: {item.priorityScore}
                  </Badge>
                </div>
              </div>

              {/* Reason */}
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                <p className="font-medium flex items-start gap-1.5 text-slate-700 dark:text-slate-200">
                  <ShieldAlert className="h-3.5 w-3.5 text-rose-500 mt-0.5 shrink-0" />
                  <span>{item.reason}</span>
                </p>
                <p className="mt-1.5 text-slate-500 dark:text-slate-400 pl-5 text-[11px]">
                  💡 <strong>Action:</strong> {item.recommendedAction}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
