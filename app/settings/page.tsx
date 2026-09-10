"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Palette, GraduationCap, Shield, Save, Check } from "lucide-react";
import { MOCK_USER } from "@/lib/mock-data";

export default function SettingsPage() {
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              Settings & Preferences
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage your academic profile, grading scale rules, notification alerts, and UI theme.
            </p>
          </div>

          <Button onClick={handleSave} className="gap-2 shrink-0">
            {isSaved ? <Check className="h-4 w-4 text-emerald-300" /> : <Save className="h-4 w-4" />}
            {isSaved ? "Saved Successfully" : "Save Preferences"}
          </Button>
        </div>

        {/* 1. Student Academic Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle>Academic Profile</CardTitle>
                <CardDescription>Your university identity and degree credentials</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                defaultValue={MOCK_USER.name}
              />
              <Input
                label="University Email"
                defaultValue={MOCK_USER.email}
                type="email"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="University / Institution"
                defaultValue={MOCK_USER.university}
              />
              <Input
                label="Department / Branch"
                defaultValue={MOCK_USER.branch}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Current Semester"
                defaultValue={String(MOCK_USER.semester)}
                options={[
                  { value: "1", label: "Semester 1" },
                  { value: "2", label: "Semester 2" },
                  { value: "3", label: "Semester 3" },
                  { value: "4", label: "Semester 4" },
                  { value: "5", label: "Semester 5" },
                  { value: "6", label: "Semester 6" },
                  { value: "7", label: "Semester 7" },
                  { value: "8", label: "Semester 8" },
                ]}
              />
              <Input
                label="Target Graduation CGPA"
                type="number"
                step="0.05"
                defaultValue={String(MOCK_USER.targetCgpa)}
              />
            </div>
          </CardContent>
        </Card>

        {/* 2. Grading & Calculation Rules */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
              <div>
                <CardTitle>Grading Scheme & Calculation Rules</CardTitle>
                <CardDescription>Configure how SGPA/CGPA and attendance weights are computed</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Grading Scale System"
                defaultValue="10"
                options={[
                  { value: "10", label: "10.0 UGC / AICTE Scale (India/Asia)" },
                  { value: "4", label: "4.0 GPA Scale (US / Standard)" },
                  { value: "7", label: "7.0 GPA Scale (Australia)" },
                  { value: "percentage", label: "Direct Percentage Scheme" },
                ]}
              />
              <Select
                label="Minimum Attendance Threshold"
                defaultValue="75"
                options={[
                  { value: "75", label: "75% (Standard University Cutoff)" },
                  { value: "80", label: "80% (Strict Department Policy)" },
                  { value: "85", label: "85% (High Attendance Buffer)" },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Total Degree Credits Required"
                type="number"
                defaultValue="120"
              />
              <Select
                label="Assessment Weight Ratio (Internal : Endterm)"
                defaultValue="50-50"
                options={[
                  { value: "50-50", label: "50% Internal : 50% End Semester" },
                  { value: "40-60", label: "40% Internal : 60% End Semester" },
                  { value: "30-70", label: "30% Internal : 70% End Semester" },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        {/* 3. Appearance & Theme */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-amber-600" />
              <div>
                <CardTitle>Appearance & Theme</CardTitle>
                <CardDescription>Customize the visual presentation of the platform</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border-2 border-blue-600 bg-white dark:bg-slate-800 flex items-center justify-between cursor-pointer">
                <span className="text-xs font-semibold">Light Theme</span>
                <Badge variant="default" size="sm">Active</Badge>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 dark:border-slate-800 flex items-center justify-between cursor-pointer text-slate-500">
                <span className="text-xs font-semibold">Dark Theme</span>
                <Badge variant="secondary" size="sm">Available</Badge>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 dark:border-slate-800 flex items-center justify-between cursor-pointer text-slate-500">
                <span className="text-xs font-semibold">System Default</span>
                <Badge variant="secondary" size="sm">Auto</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Notification Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-600" />
              <div>
                <CardTitle>Alerts & Reminders</CardTitle>
                <CardDescription>Configure reminder triggers for exams and attendance alerts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                title: "Exam & Assessment Countdown",
                desc: "Send reminders 48h and 24h prior to scheduled internal tests and final exams.",
                defaultChecked: true,
              },
              {
                title: "Attendance Cutoff Warning",
                desc: "Alert when subject attendance drops below 80% (safety threshold).",
                defaultChecked: true,
              },
              {
                title: "Weekly Study Priority Digest",
                desc: "Summary email highlighting the top 3 focus subjects every Sunday evening.",
                defaultChecked: false,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30"
              >
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={item.defaultChecked}
                  className="h-4 w-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
