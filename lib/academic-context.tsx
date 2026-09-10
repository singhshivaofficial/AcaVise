"use client";

import * as React from "react";
import { UserProfile, AcademicMetric, Subject, StudyPriorityItem, UpcomingEvent } from "@/types";
import {
  MOCK_USER,
  SEMESTER_METRICS,
  SEMESTER_SUBJECTS_DEFAULT,
  SEMESTER_PRIORITIES_DEFAULT,
  SEMESTER_EVENTS_DEFAULT,
  getSemesterMetric,
  getSemesterSubjects,
  getSemesterPriorities,
  getSemesterEvents,
} from "./mock-data";

import { createClient } from "./supabase/client";

export interface AcademicSettingsState {
  profile: UserProfile;
  academicRules: {
    gradingScale: string;
    attendanceThreshold: string;
    totalCredits: string;
    weightRatio: string;
  };
  theme: "light" | "dark" | "system";
  notifications: {
    examCountdown: boolean;
    attendanceWarning: boolean;
    weeklyDigest: boolean;
  };
}

interface AcademicContextType {
  currentSemester: string;
  setCurrentSemester: (semester: string) => void;
  profile: UserProfile;
  targetCgpa: number;
  setTargetCgpa: (val: number) => void;
  settings: AcademicSettingsState;
  updateSettings: (newSettings: Partial<AcademicSettingsState> | { profile?: Partial<UserProfile> }) => void;
  isHydrated: boolean;
  // Current semester derived data
  metrics: AcademicMetric;
  subjects: Subject[];
  priorities: StudyPriorityItem[];
  upcomingEvents: UpcomingEvent[];
}

const DEFAULT_SETTINGS: AcademicSettingsState = {
  profile: MOCK_USER,
  academicRules: {
    gradingScale: "10",
    attendanceThreshold: "75",
    totalCredits: "120",
    weightRatio: "50-50",
  },
  theme: "light",
  notifications: {
    examCountdown: true,
    attendanceWarning: true,
    weeklyDigest: false,
  },
};

const AcademicContext = React.createContext<AcademicContextType | undefined>(undefined);

export function AcademicProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState<AcademicSettingsState>(DEFAULT_SETTINGS);
  const [currentSemester, setCurrentSemesterState] = React.useState<string>("5");
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Initialize from localStorage and sync with Supabase Auth
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("acavise_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) {
          setSettings((prev) => ({
            ...prev,
            ...parsed,
            profile: { ...prev.profile, ...parsed.profile },
          }));
          if (parsed.profile.semester) {
            setCurrentSemesterState(String(parsed.profile.semester));
          }
        }
      }
    } catch {
      // ignore
    } finally {
      setIsHydrated(true);
    }

    const supabase = createClient();

    // Fetch authenticated user profile details from Supabase Auth
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const meta = user.user_metadata || {};
        const fullName = meta.full_name || meta.name || user.email?.split("@")[0] || "Student";
        const userBranch = meta.branch || "Engineering";
        const userSemester = meta.semester ? String(meta.semester) : undefined;
        const userTargetCgpa = meta.target_cgpa ? parseFloat(meta.target_cgpa) : undefined;

        setSettings((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            name: fullName,
            email: user.email || prev.profile.email,
            branch: userBranch,
            semester: userSemester ? parseInt(userSemester, 10) : prev.profile.semester,
            targetCgpa: userTargetCgpa || prev.profile.targetCgpa,
          },
        }));
        if (userSemester) {
          setCurrentSemesterState(userSemester);
        }
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata || {};
        const fullName = meta.full_name || meta.name || session.user.email?.split("@")[0] || "Student";
        const userBranch = meta.branch || "Engineering";
        const userSemester = meta.semester ? String(meta.semester) : undefined;
        const userTargetCgpa = meta.target_cgpa ? parseFloat(meta.target_cgpa) : undefined;

        setSettings((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            name: fullName,
            email: session.user.email || prev.profile.email,
            branch: userBranch,
            semester: userSemester ? parseInt(userSemester, 10) : prev.profile.semester,
            targetCgpa: userTargetCgpa || prev.profile.targetCgpa,
          },
        }));
        if (userSemester) {
          setCurrentSemesterState(userSemester);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sync theme class to document.documentElement
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const applyTheme = (t: "light" | "dark" | "system") => {
      if (t === "dark") {
        root.classList.add("dark");
      } else if (t === "light") {
        root.classList.remove("dark");
      } else {
        const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isSystemDark) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };
    applyTheme(settings.theme);

    if (settings.theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        if (e.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, [settings.theme]);

  const setCurrentSemester = React.useCallback((sem: string) => {
    setCurrentSemesterState(sem);
    setSettings((prev) => {
      const updated: AcademicSettingsState = {
        ...prev,
        profile: {
          ...prev.profile,
          semester: parseInt(sem, 10) || 5,
        },
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("acavise_settings", JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const setTargetCgpa = React.useCallback((target: number) => {
    setSettings((prev) => {
      const updated: AcademicSettingsState = {
        ...prev,
        profile: {
          ...prev.profile,
          targetCgpa: target,
        },
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("acavise_settings", JSON.stringify(updated));
        localStorage.setItem("acavise_target_cgpa", String(target));
      }
      return updated;
    });
  }, []);

  const updateSettings = React.useCallback(
    (newSettings: Partial<AcademicSettingsState> | { profile?: Partial<UserProfile> }) => {
      setSettings((prev) => {
        const updated: AcademicSettingsState = {
          ...prev,
          ...newSettings,
          profile: {
            ...prev.profile,
            ...(newSettings.profile || {}),
          },
        };

        if (newSettings.profile?.semester) {
          setCurrentSemesterState(String(newSettings.profile.semester));
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("acavise_settings", JSON.stringify(updated));
          if (updated.profile.targetCgpa) {
            localStorage.setItem("acavise_target_cgpa", String(updated.profile.targetCgpa));
          }
        }

        return updated;
      });
    },
    []
  );

  // Derived semester metrics & data for active current semester
  const metrics =
    getSemesterMetric(currentSemester, currentSemester) ||
    SEMESTER_METRICS[currentSemester] ||
    SEMESTER_METRICS["1"];
  const subjects = getSemesterSubjects(currentSemester, currentSemester) || [];
  const priorities = getSemesterPriorities(currentSemester, currentSemester) || [];
  const upcomingEvents = getSemesterEvents(currentSemester, currentSemester) || [];

  return (
    <AcademicContext.Provider
      value={{
        currentSemester,
        setCurrentSemester,
        profile: settings.profile,
        targetCgpa: settings.profile.targetCgpa,
        setTargetCgpa,
        settings,
        updateSettings,
        isHydrated,
        metrics,
        subjects,
        priorities,
        upcomingEvents,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademicPreferences() {
  const context = React.useContext(AcademicContext);
  if (!context) {
    throw new Error("useAcademicPreferences must be used within an AcademicProvider");
  }
  return context;
}
