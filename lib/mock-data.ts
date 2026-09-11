import {
  UserProfile,
  AcademicMetric,
  Subject,
  StudyPriorityItem,
  UpcomingEvent,
  StudyPlanDay,
  AiChatMessage,
  TargetCalculationPreview,
} from "@/types";

export const EMPTY_USER: UserProfile = {
  id: "unauthenticated",
  name: "Student",
  email: "",
  university: "University",
  branch: "Engineering",
  semester: 1,
  targetCgpa: 9.0,
};

export const MOCK_USER: UserProfile = EMPTY_USER;

export const SEMESTER_METRICS: Record<string, AcademicMetric> = {};

export const MOCK_METRICS: AcademicMetric = {
  cgpa: 0,
  targetCgpa: 9.0,
  currentSgpa: 0,
  attendancePercentage: 0,
  totalCredits: 120,
  completedCredits: 0,
  activeBacklogs: 0,
};

export const SEMESTER_SUBJECTS_DEFAULT: Record<string, Subject[]> = {
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [],
  "7": [],
  "8": [],
};

export const MOCK_SUBJECTS: Subject[] = [];

export function getSemesterSubjects(
  viewedSemester: string | number,
  _currentSemester: string | number,
  customStore?: Record<string, Subject[]>
): Subject[] {
  if (customStore && customStore[String(viewedSemester)]) {
    return customStore[String(viewedSemester)];
  }
  return [];
}

export function getSemesterMetric(
  _viewedSemester: string | number,
  _currentSemester: string | number
): AcademicMetric | null {
  return null;
}

export function getSemesterPriorities(
  _viewedSemester: string | number,
  _currentSemester: string | number
): StudyPriorityItem[] {
  return [];
}

export function getSemesterEvents(
  _viewedSemester: string | number,
  _currentSemester: string | number
): UpcomingEvent[] {
  return [];
}

export const SEMESTER_PRIORITIES_DEFAULT: Record<string, StudyPriorityItem[]> = {
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [],
  "7": [],
  "8": [],
};

export const MOCK_PRIORITY_ITEMS: StudyPriorityItem[] = [];

export const SEMESTER_EVENTS_DEFAULT: Record<string, UpcomingEvent[]> = {
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [],
  "7": [],
  "8": [],
};

export const MOCK_UPCOMING_EVENTS: UpcomingEvent[] = [];

export const MOCK_STUDY_PLAN: StudyPlanDay[] = [
  { day: "Monday", date: "Mon", isToday: true, totalHours: 0, tasks: [] },
  { day: "Tuesday", date: "Tue", isToday: false, totalHours: 0, tasks: [] },
  { day: "Wednesday", date: "Wed", isToday: false, totalHours: 0, tasks: [] },
  { day: "Thursday", date: "Thu", isToday: false, totalHours: 0, tasks: [] },
  { day: "Friday", date: "Fri", isToday: false, totalHours: 0, tasks: [] },
  { day: "Saturday", date: "Sat", isToday: false, totalHours: 0, tasks: [] },
  { day: "Sunday", date: "Sun", isToday: false, totalHours: 0, tasks: [] },
];

export const MOCK_AI_CONVERSATION: AiChatMessage[] = [];

export const MOCK_TARGET_PREVIEW: TargetCalculationPreview = {
  targetCgpa: 9.0,
  currentCgpa: 0,
  targetSgpa: 9.0,
  requiredSemesterScore: 80,
  feasibility: "Highly Achievable",
  formulaExplanation:
    "Record your semester course grades to calculate the exact required SGPA across remaining terms.",
};
