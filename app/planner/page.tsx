"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Clock, CheckCircle2, Plus, Calendar, Flame, AlertCircle } from "lucide-react";
import { MOCK_STUDY_PLAN, MOCK_UPCOMING_EVENTS } from "@/lib/mock-data";

export default function PlannerPage() {
  const [planDays, setPlanDays] = React.useState(MOCK_STUDY_PLAN);

  const toggleTask = (dayIndex: number, taskId: string) => {
    setPlanDays((prev) =>
      prev.map((day, dIdx) => {
        if (dIdx !== dayIndex) return day;
        return {
          ...day,
          tasks: day.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      })
    );
  };

  const totalTasks = planDays.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedTasks = planDays.reduce(
    (acc, d) => acc + d.tasks.filter((t) => t.completed).length,
    0
  );
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Smart Study Planner
              </h2>
              <Badge variant="warning" size="sm">
                Step 9 Engine Preview
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Turn your priority subjects and upcoming exams into a realistic daily revision schedule.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Calendar className="h-3.5 w-3.5" /> This Week
            </Button>
            <Button size="sm" className="gap-1.5 text-xs">
              <Plus className="h-3.5 w-3.5" /> Add Study Block
            </Button>
          </div>
        </div>

        {/* Progress & Focus Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-white dark:bg-slate-900 sm:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Weekly Goal Progress
                </span>
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {completedTasks} of {totalTasks} blocks completed ({completionPercentage.toFixed(0)}%)
              </span>
            </div>
            <Progress value={completionPercentage} variant="default" size="md" />
          </Card>

          <Card className="p-4 bg-blue-50/50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-blue-900 dark:text-blue-200 font-semibold">
                  Today&apos;s Revision Target
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  3.5 Hours • 3 Sessions
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Daily Schedule Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {planDays.map((day, dIdx) => (
            <Card
              key={day.day}
              className={`flex flex-col ${
                day.isToday
                  ? "border-blue-400 ring-1 ring-blue-400 bg-white dark:bg-slate-900 shadow-sm"
                  : "bg-white dark:bg-slate-900"
              }`}
            >
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{day.day}</CardTitle>
                    {day.isToday && (
                      <Badge variant="default" size="sm">
                        Today
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {day.totalHours} hrs planned
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3 flex-1">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(dIdx, task.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer select-none ${
                      task.completed
                        ? "bg-emerald-50/40 border-emerald-200 text-slate-400 dark:bg-emerald-950/10 dark:border-emerald-900"
                        : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/60 dark:bg-slate-800/40 dark:border-slate-700/80"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                          task.completed
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-slate-400 bg-white dark:bg-slate-800"
                        }`}
                      >
                        {task.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`text-xs font-bold ${
                              task.completed
                                ? "line-through text-slate-400"
                                : "text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            {task.subject}
                          </span>
                          <Badge
                            variant={
                              task.priority === "High"
                                ? "destructive"
                                : task.priority === "Medium"
                                ? "warning"
                                : "secondary"
                            }
                            size="sm"
                          >
                            {task.durationMinutes}m
                          </Badge>
                        </div>
                        <p
                          className={`mt-1 text-xs leading-snug ${
                            task.completed
                              ? "line-through text-slate-400"
                              : "text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {task.title}
                        </p>
                        {task.timeSlot && (
                          <span className="mt-1.5 inline-block text-[10px] font-mono text-slate-400">
                            🕒 {task.timeSlot}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
