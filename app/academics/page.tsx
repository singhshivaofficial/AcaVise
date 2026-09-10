"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { MOCK_SUBJECTS } from "@/lib/mock-data";
import { Subject } from "@/types";
import { Plus, BookOpen, Award, Percent, Eye, FileText, CheckCircle2 } from "lucide-react";

const SEMESTER_DATA: Record<string, { label: string; sgpa: string; credits: number; status: string; subjects: Subject[] }> = {
  "1": {
    label: "Semester 1",
    sgpa: "8.10",
    credits: 22,
    status: "Completed",
    subjects: [
      { id: "s1_1", code: "MA101", name: "Engineering Mathematics I", credits: 4, faculty: "Prof. R. Sen", currentScore: 82, targetGrade: "A+", attendance: 92, trend: "stable", trendValue: "Final", status: "Good Standing", assessments: [{ id: "1", title: "Final Grade", type: "endterm", maxMarks: 100, obtainedMarks: 82, weightagePercentage: 100 }] },
      { id: "s1_2", code: "PH101", name: "Engineering Physics", credits: 4, faculty: "Dr. M. Roy", currentScore: 78, targetGrade: "A", attendance: 88, trend: "stable", trendValue: "Final", status: "Good Standing", assessments: [{ id: "2", title: "Final Grade", type: "endterm", maxMarks: 100, obtainedMarks: 78, weightagePercentage: 100 }] },
      { id: "s1_3", code: "CS101", name: "Programming in C", credits: 4, faculty: "Dr. A. Verma", currentScore: 89, targetGrade: "O", attendance: 96, trend: "stable", trendValue: "Final", status: "Good Standing", assessments: [{ id: "3", title: "Final Grade", type: "endterm", maxMarks: 100, obtainedMarks: 89, weightagePercentage: 100 }] },
      { id: "s1_4", code: "ME101", name: "Engineering Mechanics", credits: 3, faculty: "Prof. S. Das", currentScore: 75, targetGrade: "A", attendance: 85, trend: "stable", trendValue: "Final", status: "Good Standing", assessments: [{ id: "4", title: "Final Grade", type: "endterm", maxMarks: 100, obtainedMarks: 75, weightagePercentage: 100 }] },
    ],
  },
  "2": {
    label: "Semester 2",
    sgpa: "8.25",
    credits: 24,
    status: "Completed",
    subjects: [
      { id: "s2_1", code: "MA102", name: "Engineering Mathematics II", credits: 4, faculty: "Prof. R. Sen", currentScore: 80, targetGrade: "A", attendance: 90, trend: "stable", trendValue: "Final", status: "Good Standing", assessments: [{ id: "5", title: "Final Grade", type: "endterm", maxMarks: 100, obtainedMarks: 80, weightagePercentage: 100 }] },
      { id: "s2_2", code: "CS102", name: "Data Structures & Algorithms", credits: 4, faculty: "Dr. K. Raman", currentScore: 86, targetGrade: "A+", attendance: 94, trend: "stable", trendValue: "Final", status: "Good Standing", assessments: [{ id: "6", title: "Final Grade", type: "endterm", maxMarks: 100, obtainedMarks: 86, weightagePercentage: 100 }] },
      { id: "s2_3", code: "EC101", name: "Basic Electronics", credits: 3, faculty: "Dr. N. Joshi", currentScore: 79, targetGrade: "A", attendance: 84, trend: "stable", trendValue: "Final", status: "Good Standing", assessments: [{ id: "7", title: "Final Grade", type: "endterm", maxMarks: 100, obtainedMarks: 79, weightagePercentage: 100 }] },
    ],
  },
  "3": {
    label: "Semester 3",
    sgpa: "8.40",
    credits: 25,
    status: "Completed",
    subjects: [
      { id: "s3_1", code: "CS301", name: "Object Oriented Programming (Java)", credits: 4, faculty: "Prof. P. Bannerjee", currentScore: 88, targetGrade: "O", attendance: 95, trend: "stable", trendValue: "Final", status: "Good Standing", assessments: [] },
      { id: "s3_2", code: "CS302", name: "Digital Logic & Design", credits: 4, faculty: "Dr. S. Mehra", currentScore: 83, targetGrade: "A+", attendance: 89, trend: "stable", trendValue: "Final", status: "Good Standing", assessments: [] },
    ],
  },
  "4": {
    label: "Semester 4",
    sgpa: "8.24",
    credits: 25,
    status: "Completed",
    subjects: [
      { id: "s4_1", code: "CS401", name: "Operating Systems", credits: 4, faculty: "Dr. V. Rao", currentScore: 81, targetGrade: "A", attendance: 88, trend: "stable", trendValue: "Final", status: "Good Standing", assessments: [] },
      { id: "s4_2", code: "CS402", name: "Theory of Computation", credits: 4, faculty: "Prof. N. Kulkarni", currentScore: 76, targetGrade: "A", attendance: 82, trend: "stable", trendValue: "Final", status: "Good Standing", assessments: [] },
    ],
  },
  "5": {
    label: "Semester 5 (Current)",
    sgpa: "8.52 (Est)",
    credits: 16,
    status: "In Progress",
    subjects: MOCK_SUBJECTS,
  },
  "6": {
    label: "Semester 6",
    sgpa: "—",
    credits: 20,
    status: "Upcoming",
    subjects: [
      { id: "s6_1", code: "CS601", name: "Compiler Design", credits: 4, faculty: "TBD", currentScore: 0, targetGrade: "A+", attendance: 100, trend: "stable", trendValue: "TBD", status: "Good Standing", assessments: [] },
      { id: "s6_2", code: "CS602", name: "Computer Networks", credits: 4, faculty: "TBD", currentScore: 0, targetGrade: "O", attendance: 100, trend: "stable", trendValue: "TBD", status: "Good Standing", assessments: [] },
    ],
  },
  "7": {
    label: "Semester 7",
    sgpa: "—",
    credits: 18,
    status: "Upcoming",
    subjects: [
      { id: "s7_1", code: "CS701", name: "Cloud Computing & DevOps", credits: 4, faculty: "TBD", currentScore: 0, targetGrade: "O", attendance: 100, trend: "stable", trendValue: "TBD", status: "Good Standing", assessments: [] },
    ],
  },
  "8": {
    label: "Semester 8",
    sgpa: "—",
    credits: 16,
    status: "Upcoming",
    subjects: [
      { id: "s8_1", code: "CS801", name: "Major Project & Internship", credits: 12, faculty: "Department Committee", currentScore: 0, targetGrade: "O", attendance: 100, trend: "stable", trendValue: "TBD", status: "Good Standing", assessments: [] },
    ],
  },
};

export default function AcademicsPage() {
  const [selectedSemester, setSelectedSemester] = React.useState("5");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null);

  // Local subjects state with localStorage persistence
  const [semesterSubjects, setSemesterSubjects] = React.useState<Record<string, Subject[]>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("acavise_semester_subjects");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    const initial: Record<string, Subject[]> = {};
    Object.keys(SEMESTER_DATA).forEach((k) => {
      initial[k] = SEMESTER_DATA[k].subjects;
    });
    return initial;
  });

  // Save to localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("acavise_semester_subjects", JSON.stringify(semesterSubjects));
    }
  }, [semesterSubjects]);

  // Form State for Add Subject
  const [formData, setFormData] = React.useState({
    name: "",
    code: "",
    credits: "3",
    faculty: "",
    targetGrade: "A+",
  });
  const [formError, setFormError] = React.useState("");

  const currentSubjects = semesterSubjects[selectedSemester] || [];
  const currentSemInfo = SEMESTER_DATA[selectedSemester] || { label: `Semester ${selectedSemester}`, sgpa: "—", credits: 0, status: "Unknown" };

  const totalCredits = currentSubjects.reduce((acc, s) => acc + s.credits, 0);
  const avgAttendance =
    currentSubjects.length > 0
      ? (currentSubjects.reduce((acc, s) => acc + s.attendance, 0) / currentSubjects.length).toFixed(1)
      : "100.0";

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      setFormError("Please enter both Subject Name and Subject Code.");
      return;
    }

    const newSubject: Subject = {
      id: `sub_custom_${Date.now()}`,
      code: formData.code.toUpperCase().trim(),
      name: formData.name.trim(),
      credits: parseInt(formData.credits, 10) || 3,
      faculty: formData.faculty.trim() || "Department Faculty",
      currentScore: 75,
      targetGrade: formData.targetGrade,
      attendance: 90,
      trend: "stable",
      trendValue: "New",
      status: "Good Standing",
      assessments: [
        { id: `a_${Date.now()}_1`, title: "Internal Assessment 1", type: "internal", maxMarks: 20, obtainedMarks: 15, weightagePercentage: 20 },
        { id: `a_${Date.now()}_2`, title: "Midterm Exam", type: "midterm", maxMarks: 50, obtainedMarks: 38, weightagePercentage: 30 },
        { id: `a_${Date.now()}_3`, title: "End Semester Exam", type: "endterm", maxMarks: 100, weightagePercentage: 50 },
      ],
    };

    setSemesterSubjects((prev) => ({
      ...prev,
      [selectedSemester]: [...(prev[selectedSemester] || []), newSubject],
    }));

    setFormData({
      name: "",
      code: "",
      credits: "3",
      faculty: "",
      targetGrade: "A+",
    });
    setFormError("");
    setIsAddModalOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              Academics & Semester Management
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Track course enrollment, continuous internal assessments, and attendance records.
            </p>
          </div>

          <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 shrink-0">
            <Plus className="h-4 w-4" /> Add Enrolled Subject
          </Button>
        </div>

        {/* Semester Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {Object.entries(SEMESTER_DATA).map(([id, sem]) => (
            <button
              key={id}
              onClick={() => setSelectedSemester(id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedSemester === id
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800"
              }`}
            >
              <span>{sem.label}</span>
              {sem.status === "In Progress" && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                  Active
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Semester Summary Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Semester SGPA</p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{currentSemInfo.sgpa}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Enrolled Course Credits</p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {totalCredits} Credits ({currentSubjects.length} Courses)
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 flex items-center justify-center">
                <Percent className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Average Attendance</p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{avgAttendance}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Subjects & Marks Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{currentSemInfo.label} Courses & Assessments</CardTitle>
                <CardDescription>
                  Click any subject row to inspect continuous internal evaluations and exam weights.
                </CardDescription>
              </div>
              <Badge variant={currentSemInfo.status === "Completed" ? "success" : currentSemInfo.status === "In Progress" ? "default" : "secondary"}>
                {currentSemInfo.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentSubjects.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No enrolled courses for this semester. Click &quot;Add Enrolled Subject&quot; to add one.
              </div>
            ) : (
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <th className="py-3 px-3">Subject & Code</th>
                      <th className="py-3 px-3">Credits</th>
                      <th className="py-3 px-3">Faculty</th>
                      <th className="py-3 px-3">Internal Score</th>
                      <th className="py-3 px-3">Attendance</th>
                      <th className="py-3 px-3">Target Grade</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                    {currentSubjects.map((sub) => (
                      <tr
                        key={sub.id}
                        onClick={() => setSelectedSubject(sub)}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                      >
                        <td className="py-3.5 px-3">
                          <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                            {sub.name}
                          </div>
                          <span className="text-xs text-slate-500 font-mono">{sub.code}</span>
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                          {sub.credits}
                        </td>
                        <td className="py-3.5 px-3 text-xs text-slate-600 dark:text-slate-400">
                          {sub.faculty}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            {sub.currentScore > 0 ? `${sub.currentScore}%` : "—"}
                          </span>
                          <div className="text-[11px] text-slate-500">
                            {sub.assessments?.length || 0} evaluations recorded
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`font-semibold text-xs ${
                              sub.attendance >= 85
                                ? "text-emerald-600"
                                : sub.attendance >= 75
                                ? "text-amber-600"
                                : "text-rose-600"
                            }`}
                          >
                            {sub.attendance}%
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <Badge variant="default" size="sm">
                            Grade {sub.targetGrade}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSubject(sub);
                            }}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" /> Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Subject Modal */}
        <Dialog
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setFormError("");
          }}
          title={`Add Enrolled Subject (${currentSemInfo.label})`}
          description="Register a course into this semester. Saved to prototype local state."
        >
          <form onSubmit={handleAddSubject} className="space-y-4">
            {formError && (
              <p className="text-xs text-rose-600 font-medium bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {formError}
              </p>
            )}

            <Input
              label="Course Name *"
              placeholder="e.g. Distributed Systems"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Course Code *"
                placeholder="e.g. CS506"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
              <Select
                label="Credits"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                options={[
                  { value: "1", label: "1 Credit" },
                  { value: "2", label: "2 Credits" },
                  { value: "3", label: "3 Credits" },
                  { value: "4", label: "4 Credits" },
                  { value: "5", label: "5 Credits" },
                ]}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Faculty Name"
                placeholder="e.g. Dr. A. Sharma"
                value={formData.faculty}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
              />
              <Select
                label="Target Grade"
                value={formData.targetGrade}
                onChange={(e) => setFormData({ ...formData, targetGrade: e.target.value })}
                options={[
                  { value: "O", label: "O (Outstanding / 10)" },
                  { value: "A+", label: "A+ (Excellent / 9)" },
                  { value: "A", label: "A (Very Good / 8)" },
                  { value: "B+", label: "B+ (Good / 7)" },
                ]}
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setFormError("");
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Subject
              </Button>
            </div>
          </form>
        </Dialog>

        {/* Inspect Subject Detail Modal */}
        <Dialog
          isOpen={!!selectedSubject}
          onClose={() => setSelectedSubject(null)}
          title={selectedSubject ? `${selectedSubject.name} (${selectedSubject.code})` : "Subject Details"}
          description={selectedSubject ? `Faculty: ${selectedSubject.faculty} • ${selectedSubject.credits} Credits • Target Grade: ${selectedSubject.targetGrade}` : ""}
        >
          {selectedSubject && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
                <div>
                  <p className="text-[11px] text-slate-500">Current Score</p>
                  <p className="text-lg font-bold text-blue-600">{selectedSubject.currentScore}%</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Attendance</p>
                  <p className="text-lg font-bold text-emerald-600">{selectedSubject.attendance}%</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Status</p>
                  <p className="text-xs font-bold pt-1 text-slate-800 dark:text-slate-200">{selectedSubject.status}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-2">
                  Continuous Internal Evaluations
                </h4>
                {selectedSubject.assessments && selectedSubject.assessments.length > 0 ? (
                  <div className="space-y-2">
                    {selectedSubject.assessments.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-400" />
                          <span className="font-semibold">{a.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({a.weightagePercentage}% weight)</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {a.obtainedMarks !== undefined ? `${a.obtainedMarks} / ${a.maxMarks}` : `Max ${a.maxMarks} (Pending)`}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No individual assessment records yet.</p>
                )}
              </div>

              <div className="pt-2 flex justify-end border-t border-slate-100 dark:border-slate-800">
                <Button variant="secondary" onClick={() => setSelectedSubject(null)}>
                  Close Inspection
                </Button>
              </div>
            </div>
          )}
        </Dialog>
      </div>
    </AppShell>
  );
}
