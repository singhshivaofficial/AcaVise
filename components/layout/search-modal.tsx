"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  GraduationCap,
  Calculator,
  Target,
  CalendarDays,
  BotMessageSquare,
  Settings,
  ArrowRight,
  X,
  Sparkles,
} from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: "Navigation" | "Tools & Features" | "Quick Queries";
  description: string;
  href: string;
  icon: React.ElementType;
  keywords: string[];
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    id: "nav-dashboard",
    title: "Academic Dashboard",
    category: "Navigation",
    description: "Overview of your CGPA, SGPA, attendance and top priorities",
    href: "/dashboard",
    icon: LayoutDashboard,
    keywords: ["home", "dashboard", "overview", "cgpa", "sgpa", "grades", "stats"],
  },
  {
    id: "nav-academics",
    title: "Academics & Courses",
    category: "Navigation",
    description: "Manage semester courses, internal assessments, and faculty",
    href: "/academics",
    icon: GraduationCap,
    keywords: ["academics", "courses", "subjects", "semesters", "marks", "faculty", "internals", "attendance"],
  },
  {
    id: "nav-targets",
    title: "Target Marks Calculator",
    category: "Tools & Features",
    description: "Simulate required marks and SGPA to hit your target CGPA",
    href: "/targets",
    icon: Calculator,
    keywords: ["target", "calculator", "goal", "reverse", "required marks", "cgpa target", "simulation", "estimate"],
  },
  {
    id: "nav-priority",
    title: "Study Priority Intelligence",
    category: "Tools & Features",
    description: "Algorithmic ranking of which courses need attention first",
    href: "/priority",
    icon: Target,
    keywords: ["priority", "focus", "urgent", "matrix", "risk", "weak subjects", "algorithm"],
  },
  {
    id: "nav-planner",
    title: "Smart Study Planner",
    category: "Tools & Features",
    description: "Daily and weekly study schedule synced with exam dates",
    href: "/planner",
    icon: CalendarDays,
    keywords: ["planner", "schedule", "timetable", "tasks", "routine", "calendar", "study blocks"],
  },
  {
    id: "nav-ai",
    title: "AI Academic Assistant",
    category: "Tools & Features",
    description: "Contextual advice and exam strategies based on your data",
    href: "/ai-assistant",
    icon: BotMessageSquare,
    keywords: ["ai", "assistant", "chat", "copilot", "ask", "guidance", "help", "strategy", "questions"],
  },
  {
    id: "nav-settings",
    title: "Settings & Preferences",
    category: "Navigation",
    description: "Academic profile, grading scale rules, theme, and alerts",
    href: "/settings",
    icon: Settings,
    keywords: ["settings", "profile", "grading", "scale", "attendance threshold", "theme", "dark mode", "preferences"],
  },
  {
    id: "query-algo-target",
    title: "How to score A+ in Algorithms?",
    category: "Quick Queries",
    description: "Ask AI Assistant about target marks in CS501",
    href: "/ai-assistant?q=What+do+I+need+to+score+an+A%2B+in+Algorithms%3F",
    icon: Sparkles,
    keywords: ["algorithms", "a+", "score", "cs501", "ask ai", "marks needed"],
  },
  {
    id: "query-today-study",
    title: "What should I study today?",
    category: "Quick Queries",
    description: "Ask AI Assistant for today's recommended study plan",
    href: "/ai-assistant?q=What+should+I+study+today%3F",
    icon: Sparkles,
    keywords: ["study today", "daily plan", "tonight", "ask ai", "priority"],
  },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Filter items based on query
  const filtered = React.useMemo(() => {
    if (!query.trim()) return SEARCH_ITEMS;
    const lower = query.toLowerCase().trim();
    return SEARCH_ITEMS.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(lower);
      const matchDesc = item.description.toLowerCase().includes(lower);
      const matchCategory = item.category.toLowerCase().includes(lower);
      const matchKeyword = item.keywords.some((k) => k.toLowerCase().includes(lower));
      return matchTitle || matchDesc || matchCategory || matchKeyword;
    });
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  const handleSelect = (item: SearchItem) => {
    router.push(item.href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 overflow-y-auto"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 dark:border-neutral-800 dark:bg-neutral-900 z-10 overflow-hidden animate-in zoom-in-95">
        {/* Search Header Input */}
        <div className="flex items-center px-4 border-b border-slate-200/80 dark:border-neutral-800">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, features, or ask a question..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full h-14 px-3 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-neutral-100"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 rounded-md"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No results found for &quot;{query}&quot;. Try searching for <em>dashboard</em>, <em>target</em>, <em>planner</em>, or <em>AI</em>.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-slate-100 text-slate-900 dark:bg-neutral-800 dark:text-neutral-100"
                      : "hover:bg-slate-50 text-slate-700 dark:hover:bg-neutral-800/60 dark:text-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-slate-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                          : "bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-400"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate">{item.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 dark:bg-neutral-800 dark:text-neutral-400 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 truncate">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isSelected ? "text-slate-900 dark:text-neutral-100 translate-x-0.5" : "text-slate-300 dark:text-neutral-600"
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-neutral-800/60 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 font-mono">↑↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 font-mono">Enter</kbd> to select
            </span>
          </div>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 font-mono">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
