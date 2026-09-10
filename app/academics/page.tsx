"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAcademicPreferences } from "@/lib/academic-context";
import { SEMESTER_SUBJECTS_DEFAULT, getSemesterSubjects, getSemesterMetric } from "@/lib/mock-data";
import { Subject } from "@/types";
import { Plus, BookOpen, Award, Percent, Eye, FileText, Clock, Trash2 } from "lucide-react";

export default function AcademicsPage() {
  const { currentSemester } = useAcademicPreferences();
  const [selectedSemester, setSelectedSemester] = React.useState(currentSemester || "5");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null);

  // Sync viewed semester if currentSemester updates externally
  React.useEffect(() => {
    setSelectedSemester(currentSemester);
  }, [currentSemester]);

  // Local subjects state with hydration-safe localStorage persistence
  const [semesterSubjects, setSemesterSubjects] = React.useState<Record<string, Subject[]>>(SEMESTER_SUBJECTS_DEFAULT);
  const [isClientLoaded, setIsClientLoaded] = React.useState(false);

  // Load from localStorage on client mount only
  React.useEffect(() => {
    const saved = localStorage.getItem("acavise_semester_subjects");
    if (saved) {
      try {
        setSemesterSubjects(JSON.parse(saved));
      } catch {
        // fallback
      }
    }
    setIsClientLoaded(true);
  }, []);

  // Save to localStorage when updated after initial client load
  React.useEffect(() => {
    if (isClientLoaded) {
      localStorage.setItem("acavise_semester_subjects", JSON.stringify(semesterSubjects));
    }
  }, [semesterSubjects, isClientLoaded]);

  // Form State for Add Subject
  const [formData, setFormData] = React.useState({
    name: "",
    code: "",
    credits: "3",
    faculty: "",
    targetGrade: "A+",
  });
  const [formError, setFormError] = React.useState("");

  const currentNum = parseInt(currentSemester, 10) || 5;
  const selectedNum = parseInt(selectedSemester, 10) || 1;
  const isSelectedCurrent = selectedNum === currentNum;
  const isSelectedPast = selectedNum < currentNum;
  const isSelectedFuture = selectedNum > currentNum;

  const semStatus = isSelectedCurrent ? "In Progress" : isSelectedPast ? "Completed" : "Upcoming";

  // If future semester, strictly empty unless user custom-added subjects in this prototype
  const currentSubjects = getSemesterSubjects(selectedSemester, currentSemester, semesterSubjects);
  const currentMetric = getSemesterMetric(selectedSemester, currentSemester);

  const semSgpa = isSelectedFuture
    ? "—"
    : isSelectedCurrent
    ? `${currentMetric?.currentSgpa.toFixed(2) || "8.52"} (Est)`
    : `${currentMetric?.currentSgpa.toFixed(2) || "8.20"}`;

  const totalCredits = currentSubjects.reduce((acc, s) => acc + s.credits, 0);
  const avgAttendance = isSelectedFuture
    ? "—"
    : currentSubjects.length > 0
    ? `${(currentSubjects.reduce((acc, s) => acc + s.attendance, 0) / currentSubjects.length).toFixed(1)}%`
    : "—";

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
      faculty: formData.faculty.trim() || (isSelectedFuture ? "To be assigned" : "Department Faculty"),
      currentScore: isSelectedFuture ? 0 : 75,
      targetGrade: formData.targetGrade || (isSelectedFuture ? "—" : "A+"),
      attendance: isSelectedFuture ? 0 : 90,
      trend: "stable",
      trendValue: isSelectedFuture ? "Upcoming" : "New",
      status: isSelectedFuture ? "Pre-registered" : "Good Standing",
      assessments: isSelectedFuture
        ? []
        : [
            { id: `a_${Date.now()}_1`, title: "Internal Assessment 1", type: "internal", maxMarks: 20, obtainedMarks: 15, weightagePercentage: 20 },
            { id: `a_${Date.now()}_2`, title: "Midterm Exam", type: "midterm", maxMarks: 50, obtainedMarks: 38, weightagePercentage: 30 },
            { id: `a_${Date.now()}_3`, title: "End Semester Exam", type: "endterm", maxMarks: 100, weightagePercentage: 50 },
          ],
    };

    setSemesterSubjects((prev) => {
      const existing = prev[selectedSemester] || SEMESTER_SUBJECTS_DEFAULT[selectedSemester] || [];
      return {
        ...prev,
        [selectedSemester]: [...existing, newSubject],
      };
    });

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

  const handleDeleteSubject = (subjectId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSemesterSubjects((prev) => {
      const currentList = prev[selectedSemester] || SEMESTER_SUBJECTS_DEFAULT[selectedSemester] || [];
      return {
        ...prev,
        [selectedSemester]: currentList.filter((s) => s.id !== subjectId),
      };
    });
    if (selectedSubject?.id === subjectId) {
      setSelectedSubject(null);
    }
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
            <p className="text-sm text-slate-500 dark:text-neutral-400">
              Track course enrollment, continuous internal assessments, and attendance records.
            </p>
          </div>

          <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 shrink-0">
            <Plus className="h-4 w-4" /> {isSelectedFuture ? "Pre-Register Subject" : "Add Enrolled Subject"}
          </Button>
        </div>

        {/* Semester Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["1", "2", "3", "4", "5", "6", "7", "8"].map((semId) => {
            const semNum = parseInt(semId, 10);
            const isCurrent = semNum === currentNum;
            const isPast = semNum < currentNum;
            const isSelected = selectedSemester === semId;

            return (
              <button
                key={semId}
                onClick={() => setSelectedSemester(semId)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100 shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800"
                }`}
              >
                <span>Semester {semId}</span>
                {isCurrent && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected ? "bg-white/20 text-white dark:bg-neutral-900/20 dark:text-neutral-900" : "bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300"
                    }`}
                  >
                    Current
                  </span>
                )}
                {!isCurrent && isPast && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isSelected ? "bg-white/20 text-white dark:bg-neutral-900/20 dark:text-neutral-900" : "bg-slate-100 text-slate-500 dark:bg-neutral-800 dark:text-neutral-400"
                    }`}
                  >
                    Past
                  </span>
                )}
                {!isCurrent && !isPast && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isSelected ? "bg-white/20 text-white dark:bg-neutral-900/20 dark:text-neutral-900" : "bg-slate-50 text-slate-400 dark:bg-neutral-800/60 dark:text-neutral-500"
                    }`}
                  >
                    Upcoming
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Semester Summary Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-white dark:bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Semester SGPA</p>
                <p className="text-xl font-bold text-slate-900 dark:text-neutral-100">{semSgpa}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isSelectedFuture ? "Not started yet" : isSelectedCurrent ? "Expected based on CIE" : "Final grade record"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">
                  {isSelectedFuture ? "Pre-Registered Credits" : "Enrolled Course Credits"}
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-neutral-100">
                  {currentSubjects.length === 0 ? "0 Credits" : `${totalCredits} Credits`}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {currentSubjects.length === 0
                    ? "No courses registered"
                    : `${currentSubjects.length} ${
                        currentSubjects.length === 1
                          ? isSelectedFuture ? "course pre-registered" : "course registered"
                          : isSelectedFuture ? "courses pre-registered" : "courses registered"
                      }`}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300 flex items-center justify-center">
                <Percent className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Average Attendance</p>
                <p className="text-xl font-bold text-slate-900 dark:text-neutral-100">{avgAttendance}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isSelectedFuture ? "No sessions held" : currentSubjects.length > 0 ? "Active term average" : "No attendance data"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Subjects & Marks Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  Semester {selectedSemester} Courses & Assessments{" "}
                  {isSelectedCurrent && <span className="text-xs text-slate-600 dark:text-neutral-400 font-semibold">(Current Active)</span>}
                  {isSelectedFuture && <span className="text-xs text-slate-400 font-normal">(Upcoming / Not Started)</span>}
                </CardTitle>
                <CardDescription>
                  {isSelectedFuture
                    ? "This semester has not commenced yet. Pre-registered courses will appear here once added."
                    : "Click any subject row to inspect continuous internal evaluations and exam weights."}
                </CardDescription>
              </div>
              <Badge variant={semStatus === "Completed" ? "success" : semStatus === "In Progress" ? "default" : "secondary"}>
                {semStatus}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentSubjects.length === 0 ? (
              <div className="py-14 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-neutral-800 dark:text-neutral-400">
                  {isSelectedFuture ? <Clock className="h-6 w-6" /> : <BookOpen className="h-6 w-6" />}
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-neutral-100">
                    {isSelectedFuture
                      ? `Semester ${selectedSemester} is Upcoming`
                      : `No Courses Recorded for Semester ${selectedSemester}`}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
                    {isSelectedFuture
                      ? "This semester has not started yet. No course enrollments, attendance records, or continuous internal assessment marks have been recorded."
                      : "No course enrollments found for this semester. Click \"Add Enrolled Subject\" to add one."}
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    size="sm"
                    variant={isSelectedFuture ? "outline" : "primary"}
                    onClick={() => setIsAddModalOpen(true)}
                    className="gap-1.5 text-xs"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {isSelectedFuture ? "Pre-Register Subject" : "Add Enrolled Subject"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-neutral-800 text-xs font-semibold text-slate-500 dark:text-neutral-400">
                      <th className="py-3 px-3">Subject & Code</th>
                      <th className="py-3 px-3">Credits</th>
                      <th className="py-3 px-3">Faculty</th>
                      <th className="py-3 px-3">Internal Score</th>
                      <th className="py-3 px-3">Attendance</th>
                      <th className="py-3 px-3">Target Grade</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60 text-sm">
                    {currentSubjects.map((sub) => (
                      <tr
                        key={sub.id}
                        onClick={() => setSelectedSubject(sub)}
                        className="hover:bg-slate-50/80 dark:hover:bg-neutral-800/40 transition-colors cursor-pointer group"
                      >
                        <td className="py-3.5 px-3">
                          <div className="font-semibold text-slate-900 dark:text-neutral-100 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                            {sub.name}
                          </div>
                          <span className="text-xs text-slate-500 font-mono">{sub.code}</span>
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-neutral-300">
                          {sub.credits}
                        </td>
                        <td className="py-3.5 px-3 text-xs text-slate-600 dark:text-neutral-400">
                          {sub.faculty}
                        </td>
                        <td className="py-3.5 px-3">
                          {isSelectedFuture ? (
                            <div>
                              <span className="font-semibold text-slate-400">—</span>
                              <div className="text-[11px] text-slate-400">Not started</div>
                            </div>
                          ) : (
                            <div>
                              <span className="font-bold text-slate-900 dark:text-neutral-100">
                                {sub.currentScore > 0 ? `${sub.currentScore}%` : "—"}
                              </span>
                              <div className="text-[11px] text-slate-500">
                                {sub.assessments?.length || 0} evaluations recorded
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-3">
                          {isSelectedFuture ? (
                            <span className="text-xs text-slate-400 font-medium">—</span>
                          ) : (
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
                          )}
                        </td>
                        <td className="py-3.5 px-3">
                          {sub.targetGrade && sub.targetGrade !== "—" ? (
                            <Badge variant="default" size="sm">
                              Grade {sub.targetGrade}
                            </Badge>
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSubject(sub);
                              }}
                              className="text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white inline-flex items-center gap-1 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                            >
                              <Eye className="h-3.5 w-3.5" /> Inspect
                            </button>
                            {sub.id.startsWith("sub_custom_") && (
                              <button
                                type="button"
                                onClick={(e) => handleDeleteSubject(sub.id, e)}
                                title="Remove Course"
                                className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 inline-flex items-center gap-1 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
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
          title={isSelectedFuture ? `Pre-Register Subject (Semester ${selectedSemester})` : `Add Enrolled Subject (Semester ${selectedSemester})`}
          description={
            isSelectedFuture
              ? "Pre-register an upcoming course into your academic plan. Saved to prototype local state."
              : "Register a course into this semester. Saved to prototype local state."
          }
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

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-neutral-800">
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
                {isSelectedFuture ? "Pre-Register Subject" : "Save Subject"}
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
              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-neutral-800 border border-slate-200/80 dark:border-neutral-700 text-center">
                <div>
                  <p className="text-[11px] text-slate-500">Current Score</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-neutral-100">
                    {isSelectedFuture || !selectedSubject.currentScore ? "—" : `${selectedSubject.currentScore}%`}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Attendance</p>
                  <p className="text-lg font-bold text-emerald-600">
                    {isSelectedFuture || !selectedSubject.attendance ? "—" : `${selectedSubject.attendance}%`}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Status</p>
                  <p className="text-xs font-bold pt-1 text-slate-800 dark:text-neutral-200">
                    {selectedSubject.status || (isSelectedFuture ? "Pre-registered" : "Enrolled")}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-neutral-100 uppercase tracking-wider mb-2">
                  Continuous Internal Evaluations
                </h4>
                {selectedSubject.assessments && selectedSubject.assessments.length > 0 ? (
                  <div className="space-y-2">
                    {selectedSubject.assessments.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-neutral-700 text-xs bg-white dark:bg-neutral-900"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-400" />
                          <span className="font-semibold">{a.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({a.weightagePercentage}% weight)</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-neutral-100">
                          {a.obtainedMarks !== undefined ? `${a.obtainedMarks} / ${a.maxMarks}` : `Max ${a.maxMarks} (Pending)`}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 p-3 rounded-lg bg-slate-50 dark:bg-neutral-800/60 border border-dashed border-slate-200 dark:border-neutral-700 text-center">
                    {isSelectedFuture
                      ? "No internal evaluations recorded. This course has not commenced yet."
                      : "No individual assessment records yet."}
                  </p>
                )}
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-neutral-800">
                {selectedSubject.id.startsWith("sub_custom_") ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => handleDeleteSubject(selectedSubject.id, e)}
                    className="gap-1.5"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove Subject
                  </Button>
                ) : <div />}
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
