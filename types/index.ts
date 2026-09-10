export interface UserProfile {
  id: string;
  name: string;
  email: string;
  university: string;
  branch: string;
  semester: number;
  avatarUrl?: string;
  targetCgpa: number;
}

export interface AcademicMetric {
  cgpa: number;
  targetCgpa: number;
  currentSgpa: number;
  attendancePercentage: number;
  totalCredits: number;
  completedCredits: number;
  activeBacklogs: number;
}

export interface SubjectAssessment {
  id: string;
  title: string;
  type: "internal" | "assignment" | "midterm" | "endterm" | "lab";
  maxMarks: number;
  obtainedMarks?: number;
  weightagePercentage: number;
  date?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  faculty: string;
  currentScore: number;
  targetGrade: string;
  attendance: number;
  trend: "up" | "down" | "stable";
  trendValue: string;
  status: "Good Standing" | "Needs Attention" | "Critical Focus" | "Pre-registered";
  assessments: SubjectAssessment[];
}

export interface StudyPriorityItem {
  id: string;
  rank: number;
  subjectCode: string;
  subjectName: string;
  priorityScore: number; // 1 to 100
  urgency: "High" | "Medium" | "Low";
  impactFactor: string;
  reason: string;
  recommendedAction: string;
  creditWeight: number;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  subject: string;
  date: string;
  daysLeft: number;
  type: "Exam" | "Assignment" | "Lab Evaluation" | "Quiz";
  priority: "High" | "Medium" | "Low";
}

export interface StudyPlanDay {
  day: string;
  date: string;
  isToday: boolean;
  totalHours: number;
  tasks: StudyPlanTask[];
}

export interface StudyPlanTask {
  id: string;
  subject: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  timeSlot?: string;
}

export interface AiChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface TargetCalculationPreview {
  targetCgpa: number;
  currentCgpa: number;
  targetSgpa: number;
  requiredSemesterScore: number;
  feasibility: "Highly Achievable" | "Challenging" | "Requires Perfection";
  formulaExplanation: string;
}
