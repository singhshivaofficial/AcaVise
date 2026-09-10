"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, Sparkles, GraduationCap } from "lucide-react";
import { MOCK_USER } from "@/lib/mock-data";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const router = useRouter();
  const menuRef = React.useRef<HTMLDivElement>(null);

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
      className="absolute right-0 top-12 z-50 w-64 rounded-2xl bg-white shadow-2xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 overflow-hidden animate-in zoom-in-95 duration-150"
    >
      {/* User Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
            AR
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
              {MOCK_USER.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {MOCK_USER.email}
            </p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
          <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
          <span>Semester 5 • CSE Department</span>
        </div>
      </div>

      {/* Menu Actions */}
      <div className="p-2 space-y-1 text-sm">
        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
        >
          <User className="h-4 w-4 text-slate-400" />
          <span>Student Profile</span>
        </Link>

        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
        >
          <Settings className="h-4 w-4 text-slate-400" />
          <span>Grading & Preferences</span>
        </Link>

        <Link
          href="/targets"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
        >
          <Sparkles className="h-4 w-4 text-blue-500" />
          <span>Target CGPA (8.80)</span>
        </Link>

        <div className="pt-1 my-1 border-t border-slate-100 dark:border-slate-800" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left font-medium"
        >
          <LogOut className="h-4 w-4" />
          <span>Log Out (Prototype)</span>
        </button>
      </div>
    </div>
  );
}
