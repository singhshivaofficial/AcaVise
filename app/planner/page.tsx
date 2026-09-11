"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Clock, CheckCircle2, Plus, Flame } from "lucide-react";
import { useAcademicPreferences } from "@/lib/academic-context";
import { StudyPlanDay, StudyPlanTask } from "@/types";

const DEFAULT_EMPTY_DAYS: StudyPlanDay[] = [
  { day: "Monday", date: "Mon", isToday: true, totalHours: 0, tasks: [] },
  { day: "Tuesday", date: "Tue", isToday: false, totalHours: 0, tasks: [] },
  { day: "Wednesday", date: "Wed", isToday: false, totalHours: 0, tasks: [] },
  { day: "Thursday", date: "Thu", isToday: false, totalHours: 0, tasks: [] },
  { day: "Friday", date: "Fri", isToday: false, totalHours: 0, tasks: [] },
  { day: "Saturday", date: "Sat", isToday: false, totalHours: 0, tasks: [] },
  { day: "Sunday", date: "Sun", isToday: false, totalHours: 0, tasks: [] },
];

export default function PlannerPage() {
  const { userId, subjects } = useAcademicPreferences();
  const [planDays, setPlanDays] = React.useState<StudyPlanDay[]>(DEFAULT_EMPTY_DAYS);
  const [isClientLoaded, setIsClientLoaded] = React.useState(false);

  // Storage key scoped to user
  const storageKey = userId ? `acavise_study_plan_${userId}` : "acavise_study_plan_guest";

  // Load from localStorage on client mount or user change
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setPlanDays(JSON.parse(saved));
      } else {
        setPlanDays(DEFAULT_EMPTY_DAYS);
      }
    } catch {
      setPlanDays(DEFAULT_EMPTY_DAYS);
    }
    setIsClientLoaded(true);
  }, [storageKey]);

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const defaultSubjectName = subjects.length > 0 ? subjects[0].name : "General Study";

  // Add Study Block Form State
  const [formData, setFormData] = React.useState({
    day: "Monday",
    subject: defaultSubjectName,
    title: "",
    duration: "60",
    priority: "High" as "High" | "Medium" | "Low",
    timeSlot: "08:00 PM - 09:00 PM",
  });
  const [formError, setFormError] = React.useState("");

  // Keep default subject updated if subjects list changes
  React.useEffect(() => {
    if (subjects.length > 0 && formData.subject === "General Study") {
      setFormData((prev) => ({ ...prev, subject: subjects[0].name }));
    }
  }, [subjects, formData.subject]);

  // Persist to localStorage
  React.useEffect(() => {
    if (isClientLoaded && typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(planDays));
    }
  }, [planDays, isClientLoaded, storageKey]);

  const toggleTask = (dayIndex: number, taskId: string) => {
    setPlanDays((prev) =>
      prev.map((day, dIdx) => {
        if (dIdx !== dayIndex) return day;
        return {
          ...day,
          tasks: day.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      })
    );
  };

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError("Please enter a study task topic.");
      return;
    }

    const newTask: StudyPlanTask = {
      id: `tsk_custom_${Date.now()}`,
      subject: formData.subject || "General Study",
      title: formData.title.trim(),
      durationMinutes: parseInt(formData.duration, 10) || 60,
      completed: false,
      priority: formData.priority,
      timeSlot: formData.timeSlot,
    };

    setPlanDays((prev) =>
      prev.map((day) => {
        if (day.day.toLowerCase() === formData.day.toLowerCase()) {
          return {
            ...day,
            totalHours: +(day.totalHours + newTask.durationMinutes / 60).toFixed(1),
            tasks: [...day.tasks, newTask],
          };
        }
        return day;
      })
    );

    setFormData({
      day: "Monday",
      subject: defaultSubjectName,
      title: "",
      duration: "60",
      priority: "High",
      timeSlot: "08:00 PM - 09:00 PM",
    });
    setFormError("");
    setIsAddModalOpen(false);
  };

  const totalTasks = planDays.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedTasks = planDays.reduce(
    (acc, d) => acc + d.tasks.filter((t) => t.completed).length,
    0
  );
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const totalPlannedHours = planDays.reduce((acc, d) => acc + d.totalHours, 0);

  // Subject options for select dropdown
  const subjectOptions =
    subjects.length > 0
      ? subjects.map((s) => ({
          value: s.name,
          label: `${s.code ? `${s.code} - ` : ""}${s.name}`,
        }))
      : [{ value: "General Study", label: "General Study" }];

  const dayOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Smart Study Planner
              </h2>
              <Badge variant="default" size="sm">
                Interactive Schedule
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-neutral-400">
              Turn your priority subjects and upcoming exams into a realistic daily revision schedule.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={() => setIsAddModalOpen(true)} size="sm" className="gap-1.5 text-xs">
              <Plus className="h-3.5 w-3.5" /> Add Study Block
            </Button>
          </div>
        </div>

        {/* Progress & Focus Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-white dark:bg-neutral-900 sm:col-span-2 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-neutral-100">
                  Weekly Goal Progress
                </span>
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                {completedTasks} of {totalTasks} blocks completed ({completionPercentage.toFixed(0)}%)
              </span>
            </div>
            <Progress value={completionPercentage} variant="default" size="md" />
            <p className="text-[11px] text-slate-400 mt-2">
              Click any task card below to toggle completion and update your progress.
            </p>
          </Card>

          <Card className="p-4 bg-white dark:bg-neutral-900 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-semibold">
                  Total Planned Schedule
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-neutral-100">
                  {totalPlannedHours.toFixed(1)} Hours - {totalTasks} Sessions
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Daily Schedule Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planDays.map((day, dIdx) => (
            <Card
              key={day.day}
              className={`flex flex-col ${
                day.isToday
                  ? "border-slate-900 ring-1 ring-slate-900 dark:border-neutral-100 dark:ring-neutral-100 bg-white dark:bg-neutral-900 shadow-sm"
                  : "bg-white dark:bg-neutral-900"
              }`}
            >
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{day.day}</CardTitle>
                    {day.isToday && (
                      <Badge variant="default" size="sm">
                        Today
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {day.totalHours} hrs planned
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3 flex-1">
                {day.tasks.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No study blocks scheduled for {day.day}.
                  </div>
                ) : (
                  day.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(dIdx, task.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer select-none ${
                        task.completed
                          ? "bg-emerald-50/40 border-emerald-200 text-slate-400 dark:bg-emerald-950/10 dark:border-emerald-900"
                          : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70 dark:bg-neutral-800/40 dark:border-neutral-700/80"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                            task.completed
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-slate-400 bg-white dark:bg-neutral-800"
                          }`}
                        >
                          {task.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-xs font-bold truncate ${
                                task.completed
                                  ? "line-through text-slate-400"
                                  : "text-slate-800 dark:text-neutral-200"
                              }`}
                            >
                              {task.subject}
                            </span>
                            <Badge
                              variant={
                                task.priority === "High"
                                  ? "destructive"
                                  : task.priority === "Medium"
                                  ? "warning"
                                  : "secondary"
                              }
                              size="sm"
                            >
                              {task.durationMinutes}m
                            </Badge>
                          </div>
                          <p
                            className={`mt-1 text-xs leading-snug ${
                              task.completed
                                ? "line-through text-slate-400"
                                : "text-slate-600 dark:text-neutral-400"
                            }`}
                          >
                            {task.title}
                          </p>
                          {task.timeSlot && (
                            <span className="mt-1.5 flex items-center gap-1 text-[10px] font-mono text-slate-400">
                              <Clock className="h-3 w-3" /> {task.timeSlot}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Study Block Modal */}
        <Dialog
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setFormError("");
          }}
          title="Add New Study Session"
          description="Schedule a focused revision block into your weekly timetable."
        >
          <form onSubmit={handleAddBlock} className="space-y-4">
            {formError && (
              <p className="text-xs text-rose-600 font-medium bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {formError}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Day of Week"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                options={dayOptions}
              />
              <Select
                label="Course"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                options={subjectOptions}
              />
            </div>

            <Input
              label="Task Topic / Goal *"
              placeholder="e.g. Master dynamic programming concepts"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-3 gap-3">
              <Select
                label="Duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                options={[
                  { value: "30", label: "30 mins" },
                  { value: "45", label: "45 mins" },
                  { value: "60", label: "60 mins" },
                  { value: "90", label: "90 mins" },
                  { value: "120", label: "120 mins" },
                ]}
              />
              <Select
                label="Priority"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as "High" | "Medium" | "Low",
                  })
                }
                options={[
                  { value: "High", label: "High" },
                  { value: "Medium", label: "Medium" },
                  { value: "Low", label: "Low" },
                ]}
              />
              <Input
                label="Time Slot"
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                placeholder="e.g. 07:00 PM"
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
              <Button type="submit">Add Block</Button>
            </div>
          </form>
        </Dialog>
      </div>
    </AppShell>
  );
}
