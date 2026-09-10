"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell, Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  onMenuClick: () => void;
}

const ROUTE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Academic Dashboard", subtitle: "Overview of your current academic standing and priority items." },
  "/academics": { title: "Academics & Semesters", subtitle: "Manage enrolled subjects, marks distribution, and attendance." },
  "/targets": { title: "Target Marks & CGPA", subtitle: "Calculate requirements to hit your desired academic targets." },
  "/priority": { title: "Study Priority Intelligence", subtitle: "Algorithmic analysis of which subjects require your attention first." },
  "/planner": { title: "Smart Study Planner", subtitle: "Dynamic timeline and task schedule tailored to upcoming exams." },
  "/ai-assistant": { title: "AI Academic Assistant", subtitle: "Interactive academic counseling and contextual exam strategies." },
  "/settings": { title: "Settings & Preferences", subtitle: "Manage your academic profile, grading schemes, and alerts." },
};

export function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const routeInfo = ROUTE_TITLES[pathname] || { title: "AcaVise", subtitle: "Academic Intelligence" };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/95">
      {/* Left: Mobile trigger & Titles */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          type="button"
          aria-label="Open mobile navigation"
          className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {routeInfo.title}
            </h1>
            <Badge variant="secondary" size="sm" className="hidden sm:inline-flex">
              Sem 5
            </Badge>
          </div>
          <p className="hidden md:block text-xs text-slate-500 dark:text-slate-400">
            {routeInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Notification, Search & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search quick button */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
          <Search className="h-3.5 w-3.5" />
          <span>Quick search... (Press ⌘K)</span>
        </div>

        {/* AI Quick Prompt */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-medium dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900">
          <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>AI Ready</span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="View notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* User avatar button */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="h-8 w-8 rounded-full bg-slate-900 text-white font-semibold flex items-center justify-center text-xs dark:bg-blue-600">
            AR
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Alex Rivera</span>
            <span className="text-[10px] text-slate-400">NIT • CSE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
