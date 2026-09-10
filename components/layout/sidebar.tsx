"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Calculator,
  Target,
  CalendarDays,
  BotMessageSquare,
  Settings,
  Sparkles,
  ChevronRight,
  BookOpenCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAcademicPreferences } from "@/lib/academic-context";

export const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Academics",
    href: "/academics",
    icon: GraduationCap,
    badge: null,
  },
  {
    name: "Target Calculator",
    href: "/targets",
    icon: Calculator,
    badge: null,
  },
  {
    name: "Study Priority",
    href: "/priority",
    icon: Target,
    badge: "3 urgent",
  },
  {
    name: "Study Planner",
    href: "/planner",
    icon: CalendarDays,
    badge: null,
  },
  {
    name: "AI Assistant",
    href: "/ai-assistant",
    icon: BotMessageSquare,
    badge: "Beta",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    badge: null,
  },
];

interface SidebarProps {
  className?: string;
  onItemClick?: () => void;
}

export function Sidebar({ className, onItemClick }: SidebarProps) {
  const pathname = usePathname();
  const { currentSemester, profile, targetCgpa, metrics } = useAcademicPreferences();

  const percentage = Math.min(100, Math.max(0, (metrics.cgpa / targetCgpa) * 100));

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 select-none",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center px-6 border-b border-slate-100 dark:border-slate-800/80">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
          onClick={onItemClick}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-xs">
            <BookOpenCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
              AcaVise
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">
              ACADEMIC INTELLIGENCE
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2">
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
            Main Menu
          </p>
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold dark:bg-blue-950/40 dark:text-blue-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                  )}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                    item.badge === "Beta"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Target Preview Box */}
      <div className="p-3 m-3 rounded-xl bg-slate-50 border border-slate-200/70 dark:bg-slate-800/50 dark:border-slate-700/60">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Target Progress</span>
          </div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
            {metrics.cgpa.toFixed(2)} / {targetCgpa.toFixed(2)}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${percentage}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Semester {currentSemester} • CSE</span>
          <Link href="/targets" className="text-blue-600 hover:underline flex items-center">
            View <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Mock User Footer */}
      <div className="border-t border-slate-100 dark:border-slate-800 p-3">
        <Link
          href="/settings"
          onClick={onItemClick}
          className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Open Settings & Profile"
        >
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center text-xs">
            AR
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
              {profile.name}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              Sem {currentSemester} • {profile.email}
            </span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
