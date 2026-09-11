import * as React from "react";
import Link from "next/link";
import { CalendarClock, FileText, FlaskConical, HelpCircle, ArrowUpRight, CalendarDays } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UpcomingEvent } from "@/types";

interface UpcomingTimelineProps {
  events: UpcomingEvent[];
}

export function UpcomingTimeline({ events }: UpcomingTimelineProps) {
  const getEventIcon = (type: UpcomingEvent["type"]) => {
    switch (type) {
      case "Exam":
        return <CalendarClock className="h-4 w-4 text-rose-600 dark:text-rose-400" />;
      case "Assignment":
        return <FileText className="h-4 w-4 text-slate-700 dark:text-neutral-300" />;
      case "Lab Evaluation":
        return <FlaskConical className="h-4 w-4 text-slate-700 dark:text-neutral-300" />;
      case "Quiz":
        return <HelpCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <CalendarClock className="h-4 w-4 text-slate-700 dark:text-neutral-300" />;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Upcoming Deadlines & Exams</CardTitle>
          <CardDescription>Chronological timeline of tests, submissions, and vivas</CardDescription>
        </div>
        <Link
          href="/planner"
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white flex items-center gap-1"
        >
          Planner <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-neutral-800 dark:text-neutral-400">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-neutral-100">
                No upcoming exams or deadlines
              </h4>
              <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-xs">
                No tests or deadlines scheduled yet. Schedule your upcoming assessment dates in your study planner.
              </p>
            </div>
          </div>
        ) : (
          events.map((event) => {
            const isUrgent = event.daysLeft <= 2;

            return (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-50 dark:border-neutral-800/80 dark:bg-neutral-800/40 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 shrink-0">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-neutral-100 truncate">
                      {event.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 truncate">
                      {event.subject}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge variant={isUrgent ? "destructive" : "secondary"} size="sm">
                    {event.date}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {event.type}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
