import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target, Zap, AlertTriangle, CheckCircle2, TrendingDown, BookOpen, Clock } from "lucide-react";
import { MOCK_PRIORITY_ITEMS, MOCK_SUBJECTS } from "@/lib/mock-data";

export default function PriorityPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Study Priority Intelligence
              </h2>
              <Badge variant="warning" size="sm">
                Step 8 Algorithm Preview
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Algorithmic prioritization ranking subjects based on credit weights, target grade deficit, and exam imminence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="text-xs">
              Filter by Semester
            </Button>
            <Button size="sm" className="text-xs">
              Export Revision Matrix
            </Button>
          </div>
        </div>

        {/* Priority Matrix Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-rose-50/50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="text-xs text-rose-800 dark:text-rose-300 font-semibold uppercase tracking-wider">
                  Critical / High Urgency
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  CS501 (Algorithms), CS504 (Discrete)
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold uppercase tracking-wider">
                  Moderate Priority
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  CS502 (Computer Org)
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold uppercase tracking-wider">
                  Stable Standing
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  CS503 (DBMS), CS505 (OS Lab)
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Ranked List */}
        <div className="space-y-4">
          {MOCK_PRIORITY_ITEMS.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden transition-all ${
                item.rank === 1
                  ? "border-l-4 border-l-rose-600 border-slate-200"
                  : item.rank === 2
                  ? "border-l-4 border-l-amber-500 border-slate-200"
                  : "border-l-4 border-l-blue-500 border-slate-200"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-extrabold text-sm dark:bg-slate-100 dark:text-slate-900">
                      #{item.rank}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {item.subjectName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                          {item.subjectCode}
                        </span>
                        <span>•</span>
                        <span>{item.creditWeight} Credits</span>
                        <span>•</span>
                        <span>Impact: {item.impactFactor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-medium">Priority Score</p>
                      <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                        {item.priorityScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                      </p>
                    </div>
                    <Badge variant={item.urgency === "High" ? "destructive" : "warning"} size="md">
                      {item.urgency} Urgency
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Problem / Reason */}
                  <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-1">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                      Algorithmic Diagnosis:
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.reason}
                    </p>
                  </div>

                  {/* Recommendation Action */}
                  <div className="p-3.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 space-y-1">
                    <p className="text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-blue-600" />
                      Recommended Study Action:
                    </p>
                    <p className="text-xs text-blue-950 dark:text-blue-200 leading-relaxed">
                      {item.recommendedAction}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
