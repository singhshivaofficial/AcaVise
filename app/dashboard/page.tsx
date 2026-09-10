import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { StatGrid } from "@/components/dashboard/stat-grid";
import { SubjectPerformanceList } from "@/components/dashboard/subject-performance-list";
import { PriorityFocusList } from "@/components/dashboard/priority-focus-list";
import { UpcomingTimeline } from "@/components/dashboard/upcoming-timeline";
import { AskAcaViseCard } from "@/components/dashboard/ask-acavise-card";
import {
  MOCK_USER,
  MOCK_METRICS,
  MOCK_SUBJECTS,
  MOCK_PRIORITY_ITEMS,
  MOCK_UPCOMING_EVENTS,
} from "@/lib/mock-data";
import { Info } from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Top Notification Banner for Mock Data clarity */}
        <div className="flex items-center gap-2.5 rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-2.5 text-xs text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200">
          <Info className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>
            <strong>UI Architecture Preview:</strong> Displaying simulated local mock data for{" "}
            <strong>{MOCK_USER.name}</strong> (Semester {MOCK_USER.semester}, {MOCK_USER.branch}). Database integration will connect in Step 3.
          </span>
        </div>

        {/* Greeting Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              Good evening 👋
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Here&apos;s your academic overview and study priority analysis for Semester 5.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white dark:bg-slate-900 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span>Target CGPA:</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{MOCK_USER.targetCgpa.toFixed(2)}</span>
          </div>
        </div>

        {/* 1. Academic Metrics Stat Grid */}
        <StatGrid metrics={MOCK_METRICS} nextEvent={MOCK_UPCOMING_EVENTS[0]} />

        {/* 2. Main 2-Column Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Subject Performance & AI Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <SubjectPerformanceList subjects={MOCK_SUBJECTS} />
            <AskAcaViseCard />
          </div>

          {/* Right Column: Study Priority Engine & Upcoming Events (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <PriorityFocusList priorities={MOCK_PRIORITY_ITEMS} />
            <UpcomingTimeline events={MOCK_UPCOMING_EVENTS} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
