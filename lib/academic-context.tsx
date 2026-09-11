"use client";

import * as React from "react";
import { UserProfile, AcademicMetric, Subject, StudyPriorityItem, UpcomingEvent } from "@/types";
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
  isAuthenticated: boolean;
  userId: string | null;
  // Dynamic user data
  metrics: AcademicMetric;
  subjects: Subject[];
  priorities: StudyPriorityItem[];
  upcomingEvents: UpcomingEvent[];
  // Subjects management
  userSubjects: Record<string, Subject[]>;
  addSubject: (semester: string, subjectData: Omit<Subject, "id">) => void;
  deleteSubject: (semester: string, subjectId: string) => void;
  updateSubject: (semester: string, subject: Subject) => void;
  getSemesterSubjectsList: (semester: string) => Subject[];
}

const DEFAULT_SETTINGS: AcademicSettingsState = {
  profile: {
    id: "unauthenticated",
    name: "Student",
    email: "",
    university: "University",
    branch: "Engineering",
    semester: 1,
    targetCgpa: 9.0,
  },
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
  const [currentSemester, setCurrentSemesterState] = React.useState<string>("1");
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userId, setUserId] = React.useState<string | null>(null);

  // User-scoped subjects dictionary: { [semesterNumber]: Subject[] }
  const [userSubjects, setUserSubjects] = React.useState<Record<string, Subject[]>>({});

  // Sync Supabase Auth and User Identity
  React.useEffect(() => {
    const supabase = createClient();

    const handleUserSync = (user: any) => {
      if (user) {
        setIsAuthenticated(true);
        setUserId(user.id);
        const meta = user.user_metadata || {};
        const fullName = meta.full_name || meta.name || user.email?.split("@")[0] || "Student";
        const userBranch = meta.branch || "Engineering";
        const userSemester = meta.semester ? String(meta.semester) : "1";
        const userTargetCgpa = meta.target_cgpa ? parseFloat(meta.target_cgpa) : 9.0;

        setSettings((prev) => ({
          ...prev,
          profile: {
            id: user.id,
            name: fullName,
            email: user.email || "",
            university: meta.university || "University",
            branch: userBranch,
            semester: parseInt(userSemester, 10) || 1,
            targetCgpa: userTargetCgpa,
          },
        }));
        setCurrentSemesterState(userSemester);

        // Load user-scoped subjects
        try {
          const storedSubjects = localStorage.getItem(`acavise_user_subjects_${user.id}`);
          if (storedSubjects) {
            setUserSubjects(JSON.parse(storedSubjects));
          } else {
            // New user starts completely empty
            setUserSubjects({});
          }
        } catch {
          setUserSubjects({});
        }
      } else {
        setIsAuthenticated(false);
        setUserId(null);
        setUserSubjects({});
      }
    };

    supabase.auth.getUser().then(({ data: { user } }) => {
      handleUserSync(user);
      setIsHydrated(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleUserSync(session?.user ?? null);
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

  // Persist user subjects when modified
  const saveUserSubjects = React.useCallback(
    (newSubjects: Record<string, Subject[]>) => {
      setUserSubjects(newSubjects);
      if (userId && typeof window !== "undefined") {
        localStorage.setItem(`acavise_user_subjects_${userId}`, JSON.stringify(newSubjects));
      }
    },
    [userId]
  );

  const addSubject = React.useCallback(
    (semester: string, subjectData: Omit<Subject, "id">) => {
      const newSubject: Subject = {
        ...subjectData,
        id: `subj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      };

      saveUserSubjects({
        ...userSubjects,
        [semester]: [...(userSubjects[semester] || []), newSubject],
      });
    },
    [userSubjects, saveUserSubjects]
  );

  const deleteSubject = React.useCallback(
    (semester: string, subjectId: string) => {
      const updatedList = (userSubjects[semester] || []).filter((s) => s.id !== subjectId);
      saveUserSubjects({
        ...userSubjects,
        [semester]: updatedList,
      });
    },
    [userSubjects, saveUserSubjects]
  );

  const updateSubject = React.useCallback(
    (semester: string, updated: Subject) => {
      const updatedList = (userSubjects[semester] || []).map((s) => (s.id === updated.id ? updated : s));
      saveUserSubjects({
        ...userSubjects,
        [semester]: updatedList,
      });
    },
    [userSubjects, saveUserSubjects]
  );

  const getSemesterSubjectsList = React.useCallback(
    (semester: string): Subject[] => {
      return userSubjects[semester] || [];
    },
    [userSubjects]
  );

  const setCurrentSemester = React.useCallback((sem: string) => {
    setCurrentSemesterState(sem);
    setSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        semester: parseInt(sem, 10) || 1,
      },
    }));
  }, []);

  const setTargetCgpa = React.useCallback((target: number) => {
    setSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        targetCgpa: target,
      },
    }));
  }, []);

  const updateSettings = React.useCallback(
    (newSettings: Partial<AcademicSettingsState> | { profile?: Partial<UserProfile> }) => {
      setSettings((prev) => ({
        ...prev,
        ...newSettings,
        profile: {
          ...prev.profile,
          ...(newSettings.profile || {}),
        },
      }));

      if (newSettings.profile?.semester) {
        setCurrentSemesterState(String(newSettings.profile.semester));
      }
    },
    []
  );

  // Active current semester subjects
  const currentSubjects = userSubjects[currentSemester] || [];

  // Calculate real metrics from user subjects
  const metrics: AcademicMetric = React.useMemo(() => {
    if (currentSubjects.length === 0) {
      return {
        cgpa: 0,
        targetCgpa: settings.profile.targetCgpa,
        currentSgpa: 0,
        attendancePercentage: 0,
        totalCredits: 120,
        completedCredits: 0,
        activeBacklogs: 0,
      };
    }

    let totalCredits = 0;
    let totalScoreWeighted = 0;
    let totalAttendanceWeighted = 0;

    currentSubjects.forEach((sub) => {
      const cred = sub.credits || 3;
      totalCredits += cred;
      totalScoreWeighted += (sub.currentScore || 0) * cred;
      totalAttendanceWeighted += (sub.attendance || 0) * cred;
    });

    const avgScore = totalCredits > 0 ? totalScoreWeighted / totalCredits : 0;
    const avgAttendance = totalCredits > 0 ? totalAttendanceWeighted / totalCredits : 0;
    const approxSgpa = Math.min(10.0, +(avgScore / 10).toFixed(2));

    return {
      cgpa: approxSgpa,
      targetCgpa: settings.profile.targetCgpa,
      currentSgpa: approxSgpa,
      attendancePercentage: Math.round(avgAttendance),
      totalCredits: 120,
      completedCredits: totalCredits,
      activeBacklogs: currentSubjects.filter((s) => s.status === "Critical Focus").length,
    };
  }, [currentSubjects, settings.profile.targetCgpa]);

  // Dynamic priorities generated only from actual subjects
  const priorities: StudyPriorityItem[] = React.useMemo(() => {
    if (currentSubjects.length === 0) return [];

    return currentSubjects
      .map((sub, index) => {
        const score = sub.currentScore || 0;
        const urgency: "High" | "Medium" | "Low" =
          score < 65 ? "High" : score < 80 ? "Medium" : "Low";
        const priorityScore = Math.max(10, 100 - score);

        return {
          id: `pri_${sub.id}`,
          rank: index + 1,
          subjectName: sub.name,
          subjectCode: sub.code,
          priorityScore,
          urgency,
          creditWeight: sub.credits,
          impactFactor: `${sub.credits} Credits - Weight ${sub.credits * 15}%`,
          reason:
            score < 65
              ? `Internal score (${score}%) is below safe threshold for target grade ${sub.targetGrade}.`
              : `Current progress is at ${score}%. Continue active practice.`,
          recommendedAction:
            score < 65
              ? "Dedicate 2 focused 45-min review sessions to improve internal assessments."
              : "Review key conceptual assignments before the upcoming test.",
        };
      })
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .map((item, idx) => ({ ...item, rank: idx + 1 }));
  }, [currentSubjects]);

  // Dynamic upcoming events from real assessments
  const upcomingEvents: UpcomingEvent[] = React.useMemo(() => {
    const events: UpcomingEvent[] = [];
    currentSubjects.forEach((sub) => {
      if (sub.assessments && sub.assessments.length > 0) {
        sub.assessments.forEach((ass) => {
          events.push({
            id: ass.id,
            title: ass.title,
            subject: sub.name,
            date: ass.date || "Upcoming",
            daysLeft: 5,
            type: ass.type === "midterm" || ass.type === "endterm" ? "Exam" : ass.type === "assignment" ? "Assignment" : "Quiz",
            priority: "Medium",
          });
        });
      }
    });
    return events;
  }, [currentSubjects]);

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
        isAuthenticated,
        userId,
        metrics,
        subjects: currentSubjects,
        priorities,
        upcomingEvents,
        userSubjects,
        addSubject,
        deleteSubject,
        updateSubject,
        getSemesterSubjectsList,
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
