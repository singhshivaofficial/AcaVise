"use client";

import * as React from "react";
import { X, BookOpenCheck } from "lucide-react";
import { Sidebar } from "./sidebar";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white shadow-2xl dark:bg-slate-900 z-10 animate-in slide-in-from-left duration-200">
        <div className="absolute right-3 top-3.5 z-20">
          <button
            onClick={onClose}
            type="button"
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Sidebar className="w-full border-r-0" onItemClick={onClose} />
      </div>
    </div>
  );
}
