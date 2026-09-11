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
import { Subject } from "@/types";
import { Plus, BookOpen, Award, Percent, Eye, FileText, Clock, Trash2 } from "lucide-react";

export default function AcademicsPage() {
  const { currentSemester, getSemesterSubjectsList, addSubject, deleteSubject } = useAcademicPreferences();
  const [selectedSemester, setSelectedSemester] = React.useState(currentSemester || "1");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null);

  // Sync viewed semester if currentSemester updates externally
  React.useEffect(() => {
    setSelectedSemester(currentSemester);
  }, [currentSemester]);

  // Form State for Add Subject
  const [formData, setFormData] = React.useState({
    name: "",
    code: "",
    credits: "3",
    faculty: "",
    targetGrade: "A+",
  });
  const [formError, setFormError] = React.useState("");

  const currentNum = parseInt(currentSemester, 10) || 1;
  const selectedNum = parseInt(selectedSemester, 10) || 1;
  const isSelectedCurrent = selectedNum === currentNum;
  const isSelectedPast = selectedNum < currentNum;
  const isSelectedFuture = selectedNum > currentNum;

  const semStatus = isSelectedCurrent ? "In Progress" : isSelectedPast ? "Completed" : "Upcoming";

  const currentSubjects = getSemesterSubjectsList(selectedSemester);

  const totalCredits = currentSubjects.reduce((acc, s) => acc + (s.credits || 3), 0);

  const avgAttendance = isSelectedFuture
    ? "-"
    : currentSubjects.length > 0
    ? `${(currentSubjects.reduce((acc, s) => acc + (s.attendance || 0), 0) / currentSubjects.length).toFixed(1)}%`
    : "-";

  const avgScore = currentSubjects.length > 0
    ? currentSubjects.reduce((acc, s) => acc + (s.currentScore || 0), 0) / currentSubjects.length
    : 0;

  const semSgpa = isSelectedFuture
    ? "-"
    : currentSubjects.length > 0
    ? `${(avgScore / 10).toFixed(2)}${isSelectedCurrent ? " (Est)" : ""}`
    : "-";

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      setFormError("Please enter both Subject Name and Subject Code.");
      return;
    }

    const newSubjectData: Omit<Subject, "id"> = {
      code: formData.code.toUpperCase().trim(),
      name: formData.name.trim(),
      credits: parseInt(formData.credits, 10) || 3,
      faculty: formData.faculty.trim() || (isSelectedFuture ? "To be assigned" : "Department Faculty"),
      currentScore: isSelectedFuture ? 0 : 75,
      targetGrade: formData.targetGrade || (isSelectedFuture ? "-" : "A+"),
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

    addSubject(selectedSemester, newSubjectData);

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
    deleteSubject(selectedSemester, subjectId);
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
                              <span className="font-semibold text-slate-400">-</span>
                              <div className="text-[11px] text-slate-400">Not started</div>
                            </div>
                          ) : (
                            <div>
                              <span className="font-bold text-slate-900 dark:text-neutral-100">
                                {sub.currentScore > 0 ? `${sub.currentScore}%` : "-"}
                              </span>
                              <div className="text-[11px] text-slate-500">
                                {sub.assessments?.length || 0} evaluations recorded
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-3">
                          {isSelectedFuture ? (
                            <span className="text-xs text-slate-400 font-medium">-</span>
                          ) : (
                            <span
                              className={`font-semibold text-xs ${
                                (sub.attendance || 0) >= 85
                                  ? "text-emerald-600"
                                  : (sub.attendance || 0) >= 75
                                  ? "text-amber-600"
                                  : "text-rose-600"
                              }`}
                            >
                              {sub.attendance || 0}%
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3">
                          {sub.targetGrade && sub.targetGrade !== "-" ? (
                            <Badge variant="default" size="sm">
                              Grade {sub.targetGrade}
                            </Badge>
                          ) : (
                            <span className="text-xs text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSubject(sub);
                              }}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-colors"
                              title="Inspect Continuous Evaluation Marks"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleDeleteSubject(sub.id, e)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="Delete Course"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
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
      </div>

      {/* 1. Modal: Add New Subject */}
      <Dialog
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setFormError("");
        }}
        title={isSelectedFuture ? `Pre-Register Semester ${selectedSemester} Course` : `Add Semester ${selectedSemester} Enrolled Subject`}
        description={
          isSelectedFuture
            ? "Add an upcoming course to your curriculum plan. Assessment marks will remain empty until the term starts."
            : "Enroll a new subject to track continuous assessments, target grades, and attendance."
        }
      >
        <form onSubmit={handleAddSubject} className="space-y-4 pt-2">
          {formError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Subject Name *"
              placeholder="e.g. Data Structures & Algorithms"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Course Code *"
              placeholder="e.g. CS301"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Select
              label="Credit Units"
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
            <Input
              label="Faculty / Professor"
              placeholder={isSelectedFuture ? "Optional / TBA" : "e.g. Dr. Alan Turing"}
              value={formData.faculty}
              onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
            />
            <Select
              label="Target Grade"
              value={formData.targetGrade}
              onChange={(e) => setFormData({ ...formData, targetGrade: e.target.value })}
              options={[
                { value: "O", label: "O (Outstanding - 10)" },
                { value: "A+", label: "A+ (Excellent - 9)" },
                { value: "A", label: "A (Very Good - 8)" },
                { value: "B+", label: "B+ (Good - 7)" },
                { value: "B", label: "B (Above Average - 6)" },
              ]}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-neutral-800">
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
              {isSelectedFuture ? "Pre-Register Course" : "Enroll Course"}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* 2. Modal: Inspect Continuous Evaluations */}
      {selectedSubject && (
        <Dialog
          isOpen={!!selectedSubject}
          onClose={() => setSelectedSubject(null)}
          title={`${selectedSubject.name} (${selectedSubject.code})`}
          description={
            isSelectedFuture
              ? "Course Curriculum Details (Upcoming Term)"
              : `Continuous Internal Evaluations - ${selectedSubject.credits} Credits - Instructor: ${selectedSubject.faculty}`
          }
        >
          <div className="space-y-4 pt-2">
            {/* Header Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900">
                <span className="text-[11px] text-slate-500 font-medium">Target Grade</span>
                <p className="text-lg font-bold text-slate-900 dark:text-neutral-100">
                  {selectedSubject.targetGrade || "-"}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900">
                <span className="text-[11px] text-slate-500 font-medium">Internal Marks</span>
                <p className="text-lg font-bold text-slate-900 dark:text-neutral-100">
                  {selectedSubject.currentScore > 0 ? `${selectedSubject.currentScore}%` : "-"}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900">
                <span className="text-[11px] text-slate-500 font-medium">Attendance</span>
                <p className="text-lg font-bold text-slate-900 dark:text-neutral-100">
                  {selectedSubject.attendance || 0}%
                </p>
              </div>
            </div>

            {/* Assessment Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                Recorded Evaluations & Weights
              </h4>
              <div className="space-y-2">
                {selectedSubject.assessments && selectedSubject.assessments.length > 0 ? (
                  selectedSubject.assessments.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/60 dark:border-neutral-800/80 dark:bg-neutral-800/40 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-neutral-100">{a.title}</p>
                        <p className="text-[11px] text-slate-500">Weightage: {a.weightagePercentage}%</p>
                      </div>
                      <div className="text-right">
                        {a.obtainedMarks !== undefined ? (
                          <span className="font-bold text-slate-900 dark:text-neutral-100 text-sm">
                            {a.obtainedMarks} / {a.maxMarks}
                          </span>
                        ) : (
                          <Badge variant="secondary" size="sm">Scheduled</Badge>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-xs text-slate-500 dark:text-neutral-400 border border-dashed border-slate-200 dark:border-neutral-800 rounded-lg">
                    No evaluations recorded for this course yet.
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => setSelectedSubject(null)}>
                Close
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </AppShell>
  );
}
