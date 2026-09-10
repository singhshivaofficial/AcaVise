"use client";

import * as React from "react";
import { UserProfile, AcademicMetric, Subject, StudyPriorityItem, UpcomingEvent } from "@/types";
import {
  MOCK_USER,
  SEMESTER_METRICS,
  SEMESTER_SUBJECTS_DEFAULT,
  SEMESTER_PRIORITIES_DEFAULT,
  SEMESTER_EVENTS_DEFAULT,
} from "./mock-data";

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

  // Initialize from localStorage safely on client mount
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
  }, []);

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

  // Derived semester metrics & data
  const metrics = SEMESTER_METRICS[currentSemester] || SEMESTER_METRICS["5"];
  const subjects = SEMESTER_SUBJECTS_DEFAULT[currentSemester] || SEMESTER_SUBJECTS_DEFAULT["5"];
  const priorities = SEMESTER_PRIORITIES_DEFAULT[currentSemester] || SEMESTER_PRIORITIES_DEFAULT["5"];
  const upcomingEvents = SEMESTER_EVENTS_DEFAULT[currentSemester] || SEMESTER_EVENTS_DEFAULT["5"];

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
