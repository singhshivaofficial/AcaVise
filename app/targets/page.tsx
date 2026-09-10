import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, Target, Sparkles, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { MOCK_TARGET_PREVIEW, MOCK_SUBJECTS } from "@/lib/mock-data";

export default function TargetsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              Target Marks & CGPA Calculator
            </h2>
            <Badge variant="warning" size="sm">
              Phase 6 Engine Preview
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Calculate the exact SGPA and end-semester exam marks required to reach your target graduation CGPA.
          </p>
        </div>

        {/* Target Simulator Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-blue-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Target Graduation CGPA
                </CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-blue-600">8.80</span>
                <span className="text-xs text-slate-400 font-medium">/ 10.0 Scale</span>
              </div>
              <p className="text-xs text-slate-500">
                Current: <strong>8.34</strong> across 96 completed credits
              </p>
              <Input
                label="Simulate New Target CGPA"
                type="number"
                step="0.05"
                defaultValue="8.80"
                className="h-8 text-xs"
              />
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Required Semester SGPA
                </CardTitle>
                <Calculator className="h-4 w-4 text-indigo-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-indigo-600">9.25</span>
                <span className="text-xs text-slate-400 font-medium">in Sem 5 & 6</span>
              </div>
              <p className="text-xs text-slate-500">
                To bridge <strong>+0.46 CGPA</strong> across remaining 24 credits
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <Badge variant="warning" size="sm">
                  {MOCK_TARGET_PREVIEW.feasibility}
                </Badge>
                <span className="text-[11px] text-slate-500">Requires minimum 3 &apos;O&apos; grades</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Endterm Target Average
                </CardTitle>
                <Sparkles className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-600">84.5%</span>
                <span className="text-xs text-slate-400 font-medium">Exam Average</span>
              </div>
              <p className="text-xs text-slate-500">
                Based on current continuous internal assessments (75.2% avg)
              </p>
              <Button size="sm" variant="subtle" className="w-full text-xs">
                Recalculate Breakdown
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Reverse Calculated Subject Goals Table */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-by-Subject Required Marks Breakdown</CardTitle>
            <CardDescription>
              Exact marks required in upcoming end-semester examinations to achieve your target SGPA (9.25)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500">
                    <th className="py-3 px-3">Subject</th>
                    <th className="py-3 px-3">Credits</th>
                    <th className="py-3 px-3">Internal Score</th>
                    <th className="py-3 px-3">Target Grade</th>
                    <th className="py-3 px-3">Required Endterm Marks</th>
                    <th className="py-3 px-3 text-right">Feasibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {MOCK_SUBJECTS.map((sub, i) => {
                    const reqMarks = [84, 78, 72, 88, 80][i] || 75;
                    const diff = reqMarks > 85 ? "High Effort" : reqMarks > 75 ? "Moderate" : "Comfortable";

                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                        <td className="py-3.5 px-3">
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{sub.name}</span>
                          <div className="text-xs text-slate-400 font-mono">{sub.code}</div>
                        </td>
                        <td className="py-3.5 px-3 font-semibold">{sub.credits}</td>
                        <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                          {sub.currentScore}%
                        </td>
                        <td className="py-3.5 px-3">
                          <Badge variant="default" size="sm">
                            Grade {sub.targetGrade}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {reqMarks} / 100
                          </span>
                          <span className="text-xs text-slate-400 ml-1.5">(≥ {reqMarks}%)</span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <Badge
                            variant={diff === "High Effort" ? "destructive" : diff === "Moderate" ? "warning" : "success"}
                            size="sm"
                          >
                            {diff}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Engine Explanation Box */}
        <Card className="bg-slate-50 border-slate-200 dark:bg-slate-900/60 dark:border-slate-800">
          <CardContent className="p-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-200 text-sm">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <span>How the Target Calculation Engine works</span>
            </div>
            <p className="leading-relaxed">
              In <strong>Step 5 & Step 6</strong>, this engine uses your university&apos;s exact grading scale formula:
            </p>
            <p className="font-mono bg-white dark:bg-slate-800 p-2.5 rounded-md border border-slate-200 dark:border-slate-700 text-blue-700 dark:text-blue-300">
              Required SGPA = [ (Target CGPA × Total Degree Credits) - (Current CGPA × Completed Credits) ] / Remaining Credits
            </p>
            <p className="leading-relaxed">
              It then breaks this down into exact numerical threshold marks across your internals (weightage 50%) and end-semester exams (weightage 50%), accounting for credit weights.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
