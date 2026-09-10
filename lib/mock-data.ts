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

export const MOCK_USER: UserProfile = {
  id: "usr_mock_001",
  name: "Alex Rivera",
  email: "alex.rivera@eng.univ.edu",
  university: "National Institute of Technology",
  branch: "Computer Science & Engineering",
  semester: 5,
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  targetCgpa: 8.8,
};

// -------------------------------------------------------------
// Per-Semester Metrics
// -------------------------------------------------------------
export const SEMESTER_METRICS: Record<string, AcademicMetric> = {
  "1": {
    cgpa: 8.10,
    targetCgpa: 8.8,
    currentSgpa: 8.10,
    attendancePercentage: 92.0,
    totalCredits: 120,
    completedCredits: 22,
    activeBacklogs: 0,
  },
  "2": {
    cgpa: 8.18,
    targetCgpa: 8.8,
    currentSgpa: 8.25,
    attendancePercentage: 89.5,
    totalCredits: 120,
    completedCredits: 46,
    activeBacklogs: 0,
  },
  "3": {
    cgpa: 8.25,
    targetCgpa: 8.8,
    currentSgpa: 8.40,
    attendancePercentage: 91.0,
    totalCredits: 120,
    completedCredits: 71,
    activeBacklogs: 0,
  },
  "4": {
    cgpa: 8.25,
    targetCgpa: 8.8,
    currentSgpa: 8.24,
    attendancePercentage: 85.0,
    totalCredits: 120,
    completedCredits: 96,
    activeBacklogs: 0,
  },
  "5": {
    cgpa: 8.34,
    targetCgpa: 8.8,
    currentSgpa: 8.52,
    attendancePercentage: 86.5,
    totalCredits: 120,
    completedCredits: 96,
    activeBacklogs: 0,
  },
  "6": {
    cgpa: 8.45,
    targetCgpa: 8.8,
    currentSgpa: 8.70,
    attendancePercentage: 90.0,
    totalCredits: 120,
    completedCredits: 100,
    activeBacklogs: 0,
  },
  "7": {
    cgpa: 8.55,
    targetCgpa: 8.8,
    currentSgpa: 8.90,
    attendancePercentage: 92.5,
    totalCredits: 120,
    completedCredits: 110,
    activeBacklogs: 0,
  },
  "8": {
    cgpa: 8.65,
    targetCgpa: 8.8,
    currentSgpa: 9.10,
    attendancePercentage: 95.0,
    totalCredits: 120,
    completedCredits: 120,
    activeBacklogs: 0,
  },
};

export const MOCK_METRICS: AcademicMetric = SEMESTER_METRICS["5"];

// -------------------------------------------------------------
// Per-Semester Subjects
// -------------------------------------------------------------
export const SEMESTER_SUBJECTS_DEFAULT: Record<string, Subject[]> = {
  "1": [
    {
      id: "sub_101",
      code: "MA101",
      name: "Engineering Mathematics I",
      credits: 4,
      faculty: "Prof. R. Sen",
      currentScore: 82,
      targetGrade: "A+",
      attendance: 92.0,
      trend: "up",
      trendValue: "+4% vs test 1",
      status: "Good Standing",
      assessments: [
        { id: "a101_1", title: "Internal Assessment 1", type: "internal", maxMarks: 20, obtainedMarks: 17, weightagePercentage: 20 },
        { id: "a101_2", title: "Midterm Exam", type: "midterm", maxMarks: 50, obtainedMarks: 41, weightagePercentage: 30 },
        { id: "a101_3", title: "End Semester Exam", type: "endterm", maxMarks: 100, obtainedMarks: 82, weightagePercentage: 50 },
      ],
    },
    {
      id: "sub_102",
      code: "PH101",
      name: "Engineering Physics",
      credits: 4,
      faculty: "Dr. M. Roy",
      currentScore: 78,
      targetGrade: "A",
      attendance: 88.0,
      trend: "stable",
      trendValue: "0% deviation",
      status: "Good Standing",
      assessments: [
        { id: "a102_1", title: "Quiz 1", type: "internal", maxMarks: 20, obtainedMarks: 15, weightagePercentage: 20 },
        { id: "a102_2", title: "Midterm Exam", type: "midterm", maxMarks: 50, obtainedMarks: 39, weightagePercentage: 30 },
        { id: "a102_3", title: "End Semester Exam", type: "endterm", maxMarks: 100, obtainedMarks: 78, weightagePercentage: 50 },
      ],
    },
    {
      id: "sub_103",
      code: "CS101",
      name: "Programming in C",
      credits: 4,
      faculty: "Dr. A. Verma",
      currentScore: 89,
      targetGrade: "O",
      attendance: 96.0,
      trend: "up",
      trendValue: "+5% vs test 1",
      status: "Good Standing",
      assessments: [
        { id: "a103_1", title: "Coding Practical", type: "internal", maxMarks: 20, obtainedMarks: 19, weightagePercentage: 20 },
        { id: "a103_2", title: "Midterm Exam", type: "midterm", maxMarks: 50, obtainedMarks: 46, weightagePercentage: 30 },
        { id: "a103_3", title: "End Semester Exam", type: "endterm", maxMarks: 100, obtainedMarks: 89, weightagePercentage: 50 },
      ],
    },
    {
      id: "sub_104",
      code: "ME101",
      name: "Engineering Mechanics",
      credits: 3,
      faculty: "Prof. S. Das",
      currentScore: 75,
      targetGrade: "A",
      attendance: 85.0,
      trend: "down",
      trendValue: "-3% vs test 1",
      status: "Needs Attention",
      assessments: [
        { id: "a104_1", title: "Internal Assessment 1", type: "internal", maxMarks: 20, obtainedMarks: 14, weightagePercentage: 20 },
        { id: "a104_2", title: "Midterm Exam", type: "midterm", maxMarks: 50, obtainedMarks: 37, weightagePercentage: 30 },
        { id: "a104_3", title: "End Semester Exam", type: "endterm", maxMarks: 100, obtainedMarks: 75, weightagePercentage: 50 },
      ],
    },
  ],
  "2": [
    {
      id: "sub_201",
      code: "MA102",
      name: "Engineering Mathematics II",
      credits: 4,
      faculty: "Prof. R. Sen",
      currentScore: 80,
      targetGrade: "A",
      attendance: 90.0,
      trend: "stable",
      trendValue: "Stable",
      status: "Good Standing",
      assessments: [],
    },
    {
      id: "sub_202",
      code: "CS102",
      name: "Data Structures & Algorithms",
      credits: 4,
      faculty: "Dr. K. Raman",
      currentScore: 86,
      targetGrade: "A+",
      attendance: 94.0,
      trend: "up",
      trendValue: "+6% on Trees test",
      status: "Good Standing",
      assessments: [],
    },
    {
      id: "sub_203",
      code: "EC101",
      name: "Basic Electronics",
      credits: 3,
      faculty: "Dr. N. Joshi",
      currentScore: 79,
      targetGrade: "A",
      attendance: 84.0,
      trend: "down",
      trendValue: "-2% vs test 1",
      status: "Needs Attention",
      assessments: [],
    },
  ],
  "3": [
    {
      id: "sub_301",
      code: "CS301",
      name: "Object Oriented Programming (Java)",
      credits: 4,
      faculty: "Prof. P. Bannerjee",
      currentScore: 88,
      targetGrade: "O",
      attendance: 95.0,
      trend: "up",
      trendValue: "+3% on project",
      status: "Good Standing",
      assessments: [],
    },
    {
      id: "sub_302",
      code: "CS302",
      name: "Digital Logic & Design",
      credits: 4,
      faculty: "Dr. S. Mehra",
      currentScore: 83,
      targetGrade: "A+",
      attendance: 89.0,
      trend: "stable",
      trendValue: "Stable",
      status: "Good Standing",
      assessments: [],
    },
  ],
  "4": [
    {
      id: "sub_401",
      code: "CS401",
      name: "Operating Systems",
      credits: 4,
      faculty: "Dr. V. Rao",
      currentScore: 81,
      targetGrade: "A",
      attendance: 88.0,
      trend: "up",
      trendValue: "+2%",
      status: "Good Standing",
      assessments: [],
    },
    {
      id: "sub_402",
      code: "CS402",
      name: "Theory of Computation",
      credits: 4,
      faculty: "Prof. N. Kulkarni",
      currentScore: 76,
      targetGrade: "A",
      attendance: 82.0,
      trend: "down",
      trendValue: "-5% on Turing Machines",
      status: "Needs Attention",
      assessments: [],
    },
  ],
  "5": [
    {
      id: "sub_01",
      code: "CS501",
      name: "Analysis of Algorithms",
      credits: 4,
      faculty: "Dr. K. Raman",
      currentScore: 68,
      targetGrade: "A+",
      attendance: 79.0,
      trend: "down",
      trendValue: "-4% vs last test",
      status: "Needs Attention",
      assessments: [
        { id: "a1", title: "Internal Assessment 1", type: "internal", maxMarks: 20, obtainedMarks: 13, weightagePercentage: 15 },
        { id: "a2", title: "Midterm Exam", type: "midterm", maxMarks: 50, obtainedMarks: 34, weightagePercentage: 25 },
        { id: "a3", title: "Algorithm Assignment 1", type: "assignment", maxMarks: 10, obtainedMarks: 8, weightagePercentage: 10 },
        { id: "a4", title: "End Semester Exam", type: "endterm", maxMarks: 100, weightagePercentage: 50 },
      ],
    },
    {
      id: "sub_02",
      code: "CS502",
      name: "Computer Organization & Architecture",
      credits: 4,
      faculty: "Prof. S. Mehra",
      currentScore: 74,
      targetGrade: "A",
      attendance: 88.0,
      trend: "up",
      trendValue: "+6% vs last test",
      status: "Good Standing",
      assessments: [
        { id: "a5", title: "Internal Assessment 1", type: "internal", maxMarks: 20, obtainedMarks: 15, weightagePercentage: 15 },
        { id: "a6", title: "Midterm Exam", type: "midterm", maxMarks: 50, obtainedMarks: 38, weightagePercentage: 25 },
        { id: "a7", title: "Pipelining Assignment", type: "assignment", maxMarks: 10, obtainedMarks: 9, weightagePercentage: 10 },
        { id: "a8", title: "End Semester Exam", type: "endterm", maxMarks: 100, weightagePercentage: 50 },
      ],
    },
    {
      id: "sub_03",
      code: "CS503",
      name: "Database Management Systems",
      credits: 3,
      faculty: "Dr. Anita Rao",
      currentScore: 88,
      targetGrade: "O",
      attendance: 94.0,
      trend: "up",
      trendValue: "+2% vs last test",
      status: "Good Standing",
      assessments: [
        { id: "a9", title: "Internal Assessment 1", type: "internal", maxMarks: 20, obtainedMarks: 18, weightagePercentage: 15 },
        { id: "a10", title: "Midterm Exam", type: "midterm", maxMarks: 50, obtainedMarks: 45, weightagePercentage: 25 },
        { id: "a11", title: "SQL Project", type: "assignment", maxMarks: 10, obtainedMarks: 10, weightagePercentage: 10 },
        { id: "a12", title: "End Semester Exam", type: "endterm", maxMarks: 100, weightagePercentage: 50 },
      ],
    },
    {
      id: "sub_04",
      code: "CS504",
      name: "Discrete Mathematical Structures",
      credits: 3,
      faculty: "Prof. V. Sharma",
      currentScore: 61,
      targetGrade: "B+",
      attendance: 76.5,
      trend: "down",
      trendValue: "-7% vs quiz average",
      status: "Critical Focus",
      assessments: [
        { id: "a13", title: "Quiz 1 & 2", type: "internal", maxMarks: 20, obtainedMarks: 11, weightagePercentage: 15 },
        { id: "a14", title: "Midterm Exam", type: "midterm", maxMarks: 50, obtainedMarks: 29, weightagePercentage: 25 },
        { id: "a15", title: "Graph Theory Problem Set", type: "assignment", maxMarks: 10, obtainedMarks: 7, weightagePercentage: 10 },
        { id: "a16", title: "End Semester Exam", type: "endterm", maxMarks: 100, weightagePercentage: 50 },
      ],
    },
    {
      id: "sub_05",
      code: "CS505",
      name: "Operating Systems Lab",
      credits: 2,
      faculty: "Er. P. Deshmukh",
      currentScore: 92,
      targetGrade: "O",
      attendance: 95.0,
      trend: "stable",
      trendValue: "0% deviation",
      status: "Good Standing",
      assessments: [
        { id: "a17", title: "Lab Practical 1", type: "lab", maxMarks: 30, obtainedMarks: 28, weightagePercentage: 30 },
        { id: "a18", title: "Shell Scripting Viva", type: "lab", maxMarks: 20, obtainedMarks: 19, weightagePercentage: 20 },
        { id: "a19", title: "Final Lab Exam", type: "endterm", maxMarks: 50, weightagePercentage: 50 },
      ],
    },
  ],
  "6": [],
  "7": [],
  "8": [],
};

export const MOCK_SUBJECTS: Subject[] = SEMESTER_SUBJECTS_DEFAULT["5"];

export function getSemesterSubjects(
  viewedSemester: string | number,
  currentSemester: string | number,
  customStore?: Record<string, Subject[]>
): Subject[] {
  const viewedNum = parseInt(String(viewedSemester), 10) || 1;
  const currentNum = parseInt(String(currentSemester), 10) || 5;

  // Future semester: strictly empty unless user explicitly added custom pre-registered subjects
  if (viewedNum > currentNum) {
    if (customStore && customStore[String(viewedSemester)]) {
      return customStore[String(viewedSemester)].filter(
        (s) => s.id.startsWith("sub_custom_") || s.status === "Pre-registered"
      );
    }
    return [];
  }

  // Current or Past semester
  if (customStore && customStore[String(viewedSemester)] && customStore[String(viewedSemester)].length > 0) {
    return customStore[String(viewedSemester)];
  }

  return SEMESTER_SUBJECTS_DEFAULT[String(viewedSemester)] || [];
}

/**
 * Helper to get metrics for a viewed semester relative to current semester.
 * Future semesters (viewedSemester > currentSemester) return null.
 */
export function getSemesterMetric(
  viewedSemester: string | number,
  currentSemester: string | number
): AcademicMetric | null {
  const viewedNum = parseInt(String(viewedSemester), 10) || 1;
  const currentNum = parseInt(String(currentSemester), 10) || 5;

  if (viewedNum > currentNum) {
    return null;
  }

  return SEMESTER_METRICS[String(viewedSemester)] || null;
}

/**
 * Helper to get study priorities for a viewed semester relative to current semester.
 * Future semesters return [].
 */
export function getSemesterPriorities(
  viewedSemester: string | number,
  currentSemester: string | number
): StudyPriorityItem[] {
  const viewedNum = parseInt(String(viewedSemester), 10) || 1;
  const currentNum = parseInt(String(currentSemester), 10) || 5;

  if (viewedNum > currentNum) {
    return [];
  }

  return SEMESTER_PRIORITIES_DEFAULT[String(viewedSemester)] || [];
}

/**
 * Helper to get upcoming events for a viewed semester relative to current semester.
 * Future semesters return [].
 */
export function getSemesterEvents(
  viewedSemester: string | number,
  currentSemester: string | number
): UpcomingEvent[] {
  const viewedNum = parseInt(String(viewedSemester), 10) || 1;
  const currentNum = parseInt(String(currentSemester), 10) || 5;

  if (viewedNum > currentNum) {
    return [];
  }

  return SEMESTER_EVENTS_DEFAULT[String(viewedSemester)] || [];
}

// -------------------------------------------------------------
// Per-Semester Priorities
// -------------------------------------------------------------
export const SEMESTER_PRIORITIES_DEFAULT: Record<string, StudyPriorityItem[]> = {
  "1": [
    {
      id: "pri_101",
      rank: 1,
      subjectCode: "ME101",
      subjectName: "Engineering Mechanics",
      priorityScore: 88,
      urgency: "High",
      impactFactor: "High (3 Credits)",
      reason: "Current average (75%) needs boost for target Grade A; Free body diagrams require practice.",
      recommendedAction: "Solve 10 equilibrium problems on trusses and friction tonight.",
      creditWeight: 3,
    },
    {
      id: "pri_102",
      rank: 2,
      subjectCode: "PH101",
      subjectName: "Engineering Physics",
      priorityScore: 72,
      urgency: "Medium",
      impactFactor: "High (4 Credits)",
      reason: "Quantum mechanics numericals require revision before midterm.",
      recommendedAction: "Review wave function derivations and Schrödinger equations.",
      creditWeight: 4,
    },
  ],
  "2": [
    {
      id: "pri_201",
      rank: 1,
      subjectCode: "CS102",
      subjectName: "Data Structures & Algorithms",
      priorityScore: 85,
      urgency: "High",
      impactFactor: "High (4 Credits)",
      reason: "AVL Tree balancing & Heap construction questions are imminent in midterm.",
      recommendedAction: "Practice rotations on binary search trees.",
      creditWeight: 4,
    },
  ],
  "3": [
    {
      id: "pri_301",
      rank: 1,
      subjectCode: "CS302",
      subjectName: "Digital Logic & Design",
      priorityScore: 82,
      urgency: "High",
      impactFactor: "High (4 Credits)",
      reason: "K-Map minimization with don't-care conditions needs reinforcement.",
      recommendedAction: "Complete 4-variable state transition tables.",
      creditWeight: 4,
    },
  ],
  "4": [
    {
      id: "pri_401",
      rank: 1,
      subjectCode: "CS402",
      subjectName: "Theory of Computation",
      priorityScore: 89,
      urgency: "High",
      impactFactor: "High (4 Credits)",
      reason: "Pumping Lemma proofs for Context-Free Grammars need rigorous review.",
      recommendedAction: "Practice 5 non-regularity contradiction proofs.",
      creditWeight: 4,
    },
  ],
  "5": [
    {
      id: "pri_1",
      rank: 1,
      subjectCode: "CS501",
      subjectName: "Analysis of Algorithms",
      priorityScore: 92,
      urgency: "High",
      impactFactor: "High (4 Credits)",
      reason: "Current average (68%) puts your target 'A+' at risk; Midterm weightage requires >= 82% on final exam.",
      recommendedAction: "Review Dynamic Programming & Graph Theory recurrences; allocate 90m tonight.",
      creditWeight: 4,
    },
    {
      id: "pri_2",
      rank: 2,
      subjectCode: "CS504",
      subjectName: "Discrete Mathematical Structures",
      priorityScore: 84,
      urgency: "High",
      impactFactor: "Medium (3 Credits)",
      reason: "Score dropped 7% after Graph Theory quiz; Attendance is close to minimum 75% cutoff (76.5%).",
      recommendedAction: "Complete past year theorem proofs on Relations and Combinatorics.",
      creditWeight: 3,
    },
    {
      id: "pri_3",
      rank: 3,
      subjectCode: "CS502",
      subjectName: "Computer Organization & Architecture",
      priorityScore: 66,
      urgency: "Medium",
      impactFactor: "High (4 Credits)",
      reason: "On track for Grade A (74%), but Cache Memory & Pipeline hazard questions need reinforcement.",
      recommendedAction: "Practice 5 numerical problems on direct and associative cache mapping.",
      creditWeight: 4,
    },
  ],
  "6": [],
  "7": [],
  "8": [],
};

export const MOCK_PRIORITY_ITEMS: StudyPriorityItem[] = SEMESTER_PRIORITIES_DEFAULT["5"];

// -------------------------------------------------------------
// Per-Semester Events
// -------------------------------------------------------------
export const SEMESTER_EVENTS_DEFAULT: Record<string, UpcomingEvent[]> = {
  "1": [
    {
      id: "evt_101",
      title: "Engineering Mechanics Practical Viva",
      subject: "Engineering Mechanics (ME101)",
      date: "In 2 days",
      daysLeft: 2,
      type: "Lab Evaluation",
      priority: "High",
    },
    {
      id: "evt_102",
      title: "Calculus Quiz 2",
      subject: "Mathematics I (MA101)",
      date: "In 4 days",
      daysLeft: 4,
      type: "Quiz",
      priority: "Medium",
    },
  ],
  "2": [
    {
      id: "evt_201",
      title: "Data Structures Midterm",
      subject: "Data Structures (CS102)",
      date: "Tomorrow, 09:30 AM",
      daysLeft: 1,
      type: "Exam",
      priority: "High",
    },
  ],
  "3": [
    {
      id: "evt_301",
      title: "Digital Logic Lab Practical",
      subject: "Digital Logic (CS302)",
      date: "In 3 days",
      daysLeft: 3,
      type: "Lab Evaluation",
      priority: "Medium",
    },
  ],
  "4": [
    {
      id: "evt_401",
      title: "Automata Theory Midterm Exam",
      subject: "Theory of Computation (CS402)",
      date: "In 2 days",
      daysLeft: 2,
      type: "Exam",
      priority: "High",
    },
  ],
  "5": [
    {
      id: "evt_1",
      title: "Midterm Assessment 2",
      subject: "Analysis of Algorithms (CS501)",
      date: "Tomorrow, 10:00 AM",
      daysLeft: 1,
      type: "Exam",
      priority: "High",
    },
    {
      id: "evt_2",
      title: "SQL Query Optimization Assignment",
      subject: "Database Management Systems (CS503)",
      date: "In 3 days (Friday)",
      daysLeft: 3,
      type: "Assignment",
      priority: "Medium",
    },
    {
      id: "evt_3",
      title: "Memory Organization Quiz",
      subject: "Computer Organization (CS502)",
      date: "Next Monday",
      daysLeft: 6,
      type: "Quiz",
      priority: "Medium",
    },
    {
      id: "evt_4",
      title: "IPC & Semaphores Lab Viva",
      subject: "Operating Systems Lab (CS505)",
      date: "Next Wednesday",
      daysLeft: 8,
      type: "Lab Evaluation",
      priority: "Low",
    },
  ],
  "6": [],
  "7": [],
  "8": [],
};

export const MOCK_UPCOMING_EVENTS: UpcomingEvent[] = SEMESTER_EVENTS_DEFAULT["5"];

export const MOCK_STUDY_PLAN: StudyPlanDay[] = [
  {
    day: "Monday",
    date: "Today",
    isToday: true,
    totalHours: 3.5,
    tasks: [
      {
        id: "tsk_1",
        subject: "Core Course Revision",
        title: "Key Recurrences & Problem Sets",
        durationMinutes: 90,
        completed: false,
        priority: "High",
        timeSlot: "06:30 PM - 08:00 PM",
      },
      {
        id: "tsk_2",
        subject: "Problem Solving",
        title: "Proof of Correctness & Practice Questions",
        durationMinutes: 60,
        completed: true,
        priority: "High",
        timeSlot: "08:30 PM - 09:30 PM",
      },
      {
        id: "tsk_3",
        subject: "Theory Notes",
        title: "Conceptual revision & flashcards",
        durationMinutes: 60,
        completed: false,
        priority: "Low",
        timeSlot: "10:00 PM - 11:00 PM",
      },
    ],
  },
  {
    day: "Tuesday",
    date: "Tomorrow",
    isToday: false,
    totalHours: 4.0,
    tasks: [
      {
        id: "tsk_4",
        subject: "Core Course Revision",
        title: "Comprehensive unit practice",
        durationMinutes: 90,
        completed: false,
        priority: "High",
        timeSlot: "06:00 PM - 07:30 PM",
      },
      {
        id: "tsk_5",
        subject: "Architecture & Systems",
        title: "System modeling and practice problems",
        durationMinutes: 90,
        completed: false,
        priority: "Medium",
        timeSlot: "08:00 PM - 09:30 PM",
      },
      {
        id: "tsk_6",
        subject: "Lab Viva Preparation",
        title: "Hands-on implementation walkthrough",
        durationMinutes: 60,
        completed: false,
        priority: "Low",
        timeSlot: "10:00 PM - 11:00 PM",
      },
    ],
  },
  {
    day: "Wednesday",
    date: "Day After",
    isToday: false,
    totalHours: 3.0,
    tasks: [
      {
        id: "tsk_7",
        subject: "Applied Course",
        title: "Worked examples & assignments",
        durationMinutes: 75,
        completed: false,
        priority: "Medium",
        timeSlot: "07:00 PM - 08:15 PM",
      },
      {
        id: "tsk_8",
        subject: "Mathematical Proofs",
        title: "Structural proofs and theorems",
        durationMinutes: 75,
        completed: false,
        priority: "High",
        timeSlot: "08:30 PM - 09:45 PM",
      },
    ],
  },
];

export const MOCK_AI_CONVERSATION: AiChatMessage[] = [
  {
    id: "msg_1",
    sender: "assistant",
    content:
      "Hello Alex! I am your **AcaVise Academic Assistant**. Based on your academic records, your CGPA is **8.34** and your target is **8.80**. What would you like to examine today?",
    timestamp: "10:00 AM",
    suggestions: [
      "What should I study today?",
      "What do I need in my core courses to score an A+?",
      "How does my current SGPA impact my degree CGPA?",
    ],
  },
  {
    id: "msg_2",
    sender: "user",
    content: "What should I focus on first this evening?",
    timestamp: "10:02 AM",
  },
  {
    id: "msg_3",
    sender: "assistant",
    content:
      "Based on your **Study Priority Engine**, your top priority tonight is your #1 ranked core subject. You have an upcoming assessment and need to secure your target grade. I recommend dedicating a 90-minute focused revision block before 8:00 PM.",
    timestamp: "10:02 AM",
    suggestions: [
      "Show me sample exam questions",
      "Calculate minimum marks for target grade",
      "Adjust today's study schedule",
    ],
  },
];

export const MOCK_TARGET_PREVIEW: TargetCalculationPreview = {
  targetCgpa: 8.8,
  currentCgpa: 8.34,
  targetSgpa: 9.25,
  requiredSemesterScore: 84.5,
  feasibility: "Challenging",
  formulaExplanation:
    "To lift your cumulative CGPA from 8.34 to 8.80 across your degree, you need an average SGPA of ≥ 9.25 in your remaining semesters.",
};
