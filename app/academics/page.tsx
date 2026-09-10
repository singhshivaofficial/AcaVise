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
import { Plus, BookOpen, User, Award, CheckCircle, Percent, AlertCircle } from "lucide-react";

export default function AcademicsPage() {
  const [selectedSemester, setSelectedSemester] = React.useState("5");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const semesters = [
    { id: "1", label: "Semester 1", sgpa: "8.10", credits: 22, status: "Completed" },
    { id: "2", label: "Semester 2", sgpa: "8.25", credits: 24, status: "Completed" },
    { id: "3", label: "Semester 3", sgpa: "8.40", credits: 25, status: "Completed" },
    { id: "4", label: "Semester 4", sgpa: "8.24", credits: 25, status: "Completed" },
    { id: "5", label: "Semester 5 (Current)", sgpa: "8.52 (Est)", credits: 16, status: "In Progress" },
    { id: "6", label: "Semester 6", sgpa: "—", credits: 20, status: "Upcoming" },
    { id: "7", label: "Semester 7", sgpa: "—", credits: 18, status: "Upcoming" },
    { id: "8", label: "Semester 8", sgpa: "—", credits: 16, status: "Upcoming" },
  ];

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
          {semesters.map((sem) => (
            <button
              key={sem.id}
              onClick={() => setSelectedSemester(sem.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedSemester === sem.id
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
                <p className="text-xs text-slate-500 font-medium">Estimated Semester SGPA</p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">8.52</p>
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
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">16 Credits (5 Subjects)</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 flex items-center justify-center">
                <Percent className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Semester Attendance</p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">86.5% (Safe)</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Subjects & Marks Table/Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Semester 5 Courses & Assessment Breakdown</CardTitle>
            <CardDescription>
              Detailed view of internals, midterms, labs, and projected endterm requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <th className="py-3 px-3">Subject & Code</th>
                    <th className="py-3 px-3">Credits</th>
                    <th className="py-3 px-3">Faculty</th>
                    <th className="py-3 px-3">Internal Marks</th>
                    <th className="py-3 px-3">Attendance</th>
                    <th className="py-3 px-3">Target Grade</th>
                    <th className="py-3 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {MOCK_SUBJECTS.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
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
                          {sub.currentScore}%
                        </span>
                        <div className="text-[11px] text-slate-500">
                          {sub.assessments.filter((a) => a.obtainedMarks !== undefined).length} evaluations recorded
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
                        <Badge
                          variant={
                            sub.status === "Good Standing"
                              ? "success"
                              : sub.status === "Needs Attention"
                              ? "warning"
                              : "destructive"
                          }
                          size="sm"
                        >
                          {sub.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add Subject Modal Placeholder */}
        <Dialog
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Subject / Course"
          description="Register a course in your current semester syllabus (Step 1 UI Modal)"
        >
          <div className="space-y-4">
            <Input label="Course Name" placeholder="e.g. Distributed Operating Systems" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Course Code" placeholder="e.g. CS506" />
              <Input label="Credits" type="number" defaultValue="3" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Faculty Name" placeholder="e.g. Dr. A. Sharma" />
              <Select
                label="Target Grade"
                options={[
                  { value: "O", label: "O (Outstanding / 10)" },
                  { value: "A+", label: "A+ (Excellent / 9)" },
                  { value: "A", label: "A (Very Good / 8)" },
                  { value: "B+", label: "B+ (Good / 7)" },
                ]}
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddModalOpen(false)}>
                Save Subject (Mock)
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </AppShell>
  );
}
