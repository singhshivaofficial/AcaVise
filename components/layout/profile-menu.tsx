"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, Target, GraduationCap } from "lucide-react";
import { useAcademicPreferences } from "@/lib/academic-context";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const router = useRouter();
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { currentSemester, profile, targetCgpa } = useAcademicPreferences();

  // Click outside to close
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    onClose();
    if (typeof window !== "undefined") {
      localStorage.removeItem("acavise_mock_user");
    }
    router.push("/login");
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-12 z-50 w-64 rounded-2xl bg-white shadow-2xl border border-slate-200 dark:border-neutral-800 dark:bg-neutral-900 overflow-hidden animate-in zoom-in-95 duration-150"
    >
      {/* User Header */}
      <div className="p-4 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-800/40">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-xs dark:bg-neutral-100 dark:text-neutral-900">
            AR
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-neutral-100 truncate">
              {profile.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-neutral-400 truncate">
              {profile.email}
            </p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-neutral-300 font-medium">
          <GraduationCap className="h-3.5 w-3.5 text-slate-500 dark:text-neutral-400" />
          <span>Semester {currentSemester} • CSE Department</span>
        </div>
      </div>

      {/* Menu Actions */}
      <div className="p-2 space-y-1 text-sm">
        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
        >
          <User className="h-4 w-4 text-slate-400" />
          <span>Student Profile</span>
        </Link>

        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
        >
          <Settings className="h-4 w-4 text-slate-400" />
          <span>Grading & Preferences</span>
        </Link>

        <Link
          href="/targets"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
        >
          <Target className="h-4 w-4 text-slate-400" />
          <span>Target CGPA ({targetCgpa.toFixed(2)})</span>
        </Link>

        <div className="pt-1 my-1 border-t border-slate-100 dark:border-neutral-800" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left font-medium cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Log Out (Prototype)</span>
        </button>
      </div>
    </div>
  );
}
