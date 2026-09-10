"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Bell, Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SearchModal } from "./search-modal";
import { NotificationPopover } from "./notification-popover";
import { ProfileMenu } from "./profile-menu";
import { useAcademicPreferences } from "@/lib/academic-context";
import { getInitials } from "@/lib/utils";

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
  const router = useRouter();
  const routeInfo = ROUTE_TITLES[pathname] || { title: "AcaVise", subtitle: "Academic Intelligence" };
  const { currentSemester, profile } = useAcademicPreferences();

  const [searchOpen, setSearchOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  // Global Ctrl+K / Cmd+K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-xs dark:border-neutral-800 dark:bg-neutral-900/95">
        {/* Left: Mobile trigger & Titles */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            type="button"
            aria-label="Open mobile navigation"
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-neutral-100">
                {routeInfo.title}
              </h1>
              <Link href="/academics">
                <Badge variant="secondary" size="sm" className="hidden sm:inline-flex hover:bg-slate-200 cursor-pointer">
                  Sem {currentSemester} Active
                </Badge>
              </Link>
            </div>
            <p className="hidden md:block text-xs text-slate-500 dark:text-neutral-400">
              {routeInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick Search, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search trigger button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Quick Search"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-xs text-slate-600 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden lg:inline">Quick search...</span>
            <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-[10px] font-mono text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen((prev) => !prev);
                setProfileOpen(false);
              }}
              aria-label="View notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-600 ring-2 ring-white dark:ring-neutral-900" />
            </button>

            <NotificationPopover
              isOpen={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
            />
          </div>

          {/* User Profile Trigger */}
          <div className="relative border-l border-slate-200 dark:border-neutral-800 pl-2">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setNotificationsOpen(false);
              }}
              aria-label="User profile menu"
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shadow-xs dark:bg-neutral-100 dark:text-neutral-900">
                {getInitials(profile.name)}
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-900 dark:text-neutral-100">
                  {profile.name}
                </span>
                <span className="text-[10px] text-slate-400">Sem {currentSemester} • {profile.branch || "Engineering"}</span>
              </div>
            </button>

            <ProfileMenu
              isOpen={profileOpen}
              onClose={() => setProfileOpen(false)}
            />
          </div>
        </div>
      </header>

      {/* Global Quick Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
