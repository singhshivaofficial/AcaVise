"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { StatGrid } from "@/components/dashboard/stat-grid";
import { SubjectPerformanceList } from "@/components/dashboard/subject-performance-list";
import { PriorityFocusList } from "@/components/dashboard/priority-focus-list";
import { UpcomingTimeline } from "@/components/dashboard/upcoming-timeline";
import { AskAcaViseCard } from "@/components/dashboard/ask-acavise-card";
import { useAcademicPreferences } from "@/lib/academic-context";
import { Info } from "lucide-react";

export default function DashboardPage() {
  const { currentSemester, profile, metrics, subjects, priorities, upcomingEvents, targetCgpa } =
    useAcademicPreferences();

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Top Notification Banner for Mock Data clarity */}
        <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-xs text-slate-700 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-300">
          <Info className="h-4 w-4 shrink-0 text-slate-600 dark:text-neutral-400" />
          <span>
            <strong>UI Architecture Preview:</strong> Displaying synchronized prototype context for{" "}
            <strong>{profile.name}</strong> (Semester {currentSemester}, {profile.branch}).
          </span>
        </div>

        {/* Greeting Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              Good evening, {profile.name.split(" ")[0]} 👋
            </h2>
            <p className="text-sm text-slate-500 dark:text-neutral-400">
              Here&apos;s your academic overview and study priority analysis for Semester {currentSemester}.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white dark:bg-neutral-900 dark:text-neutral-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 shadow-2xs">
            <span>Target CGPA:</span>
            <span className="text-slate-900 dark:text-neutral-100 font-bold">{targetCgpa.toFixed(2)}</span>
          </div>
        </div>

        {/* 1. Academic Metrics Stat Grid */}
        <StatGrid metrics={metrics} nextEvent={upcomingEvents[0]} currentSemester={currentSemester} />

        {/* 2. Main 2-Column Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Subject Performance & AI Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <SubjectPerformanceList subjects={subjects} />
            <AskAcaViseCard />
          </div>

          {/* Right Column: Study Priority Engine & Upcoming Events (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <PriorityFocusList priorities={priorities} />
            <UpcomingTimeline events={upcomingEvents} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

