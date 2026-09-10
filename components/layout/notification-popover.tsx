"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Check, CheckCheck, Trash2, Calendar, Target, AlertTriangle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "exam" | "priority" | "target" | "info";
  href: string;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_1",
    title: "Analysis of Algorithms Midterm Tomorrow",
    message: "Midterm Assessment 2 is scheduled for tomorrow at 10:00 AM. Dynamic Programming questions carry 40% weight.",
    time: "2 hours ago",
    read: false,
    type: "exam",
    href: "/planner",
  },
  {
    id: "notif_2",
    title: "Study Priority Matrix Updated",
    message: "CS504 (Discrete Structures) dropped to 61% and was elevated to #2 Focus Priority.",
    time: "5 hours ago",
    read: false,
    type: "priority",
    href: "/priority",
  },
  {
    id: "notif_3",
    title: "Target CGPA Feasibility Reminder",
    message: "Hitting your 8.80 Target requires an SGPA of >= 9.25 in Semester 5 (minimum 3 'O' grades).",
    time: "1 day ago",
    read: false,
    type: "target",
    href: "/targets",
  },
];

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPopover({ isOpen, onClose }: NotificationPopoverProps) {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("acavise_notifications");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_NOTIFICATIONS;
        }
      }
    }
    return DEFAULT_NOTIFICATIONS;
  });

  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("acavise_notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  // Click outside to close
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
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

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 overflow-hidden animate-in zoom-in-95 duration-150"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <Badge variant="destructive" size="sm">
              {unreadCount} new
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[11px] font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="h-3 w-3" /> Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Notification Items */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
        {notifications.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-400 space-y-1">
            <Bell className="h-6 w-6 mx-auto text-slate-300 dark:text-slate-600" />
            <p>No notifications right now.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <Link
              key={n.id}
              href={n.href}
              onClick={() => {
                markAsRead(n.id);
                onClose();
              }}
              className={`block p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${
                !n.read
                  ? "bg-blue-50/40 dark:bg-blue-950/20"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    n.type === "exam"
                      ? "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                      : n.type === "priority"
                      ? "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                  }`}
                >
                  {n.type === "exam" ? (
                    <Calendar className="h-3.5 w-3.5" />
                  ) : n.type === "priority" ? (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  ) : (
                    <Target className="h-3.5 w-3.5" />
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <h4
                      className={`text-xs font-semibold truncate ${
                        !n.read
                          ? "text-slate-900 dark:text-slate-100"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {n.message}
                  </p>
                  <span className="text-[10px] text-slate-400 block pt-0.5 font-medium">
                    {n.time}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={clearAll}
            className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="h-3 w-3" /> Clear history
          </button>
          <Link
            href="/dashboard"
            onClick={onClose}
            className="text-[11px] font-semibold text-blue-600 hover:underline"
          >
            View Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
