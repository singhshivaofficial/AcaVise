"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, Target, Sparkles, HelpCircle, RotateCcw, CheckCircle2, AlertTriangle } from "lucide-react";
import { useAcademicPreferences } from "@/lib/academic-context";

export default function TargetsPage() {
  const { targetCgpa, setTargetCgpa, currentSemester, subjects, metrics } = useAcademicPreferences();
  const [targetCgpaInput, setTargetCgpaInput] = React.useState<string>(targetCgpa.toFixed(2));
  const [isCalculated, setIsCalculated] = React.useState(false);

  React.useEffect(() => {
    setTargetCgpaInput(targetCgpa.toFixed(2));
  }, [targetCgpa]);

  const currentCgpa = metrics.cgpa;
  const currentSemNum = parseInt(currentSemester, 10) || 5;
  const completedCredits = Math.max(20, (currentSemNum - 1) * 24);
  const totalDegreeCredits = 120;
  const remainingCredits = Math.max(16, totalDegreeCredits - completedCredits);

  const targetCgpaNum = parseFloat(targetCgpaInput) || 8.8;

  // Exact formula calculation
  const rawRequiredSgpa =
    ((targetCgpaNum * totalDegreeCredits) - (currentCgpa * completedCredits)) / remainingCredits;

  const displayRequiredSgpa = rawRequiredSgpa.toFixed(2);
  const targetGap = (targetCgpaNum - currentCgpa).toFixed(2);

  // Dynamic feasibility logic
  let feasibilityBadge: { label: string; variant: "success" | "warning" | "destructive" } = {
    label: "Challenging",
    variant: "warning",
  };
  if (rawRequiredSgpa <= 8.5) {
    feasibilityBadge = { label: "Highly Achievable", variant: "success" };
  } else if (rawRequiredSgpa <= 9.3) {
    feasibilityBadge = { label: "Challenging", variant: "warning" };
  } else if (rawRequiredSgpa <= 10.0) {
    feasibilityBadge = { label: "Requires Near-Perfection", variant: "warning" };
  } else {
    feasibilityBadge = { label: "Infeasible (> 10.0 SGPA Required)", variant: "destructive" };
  }

  // Required exam average estimation
  const requiredExamAvg = Math.min(100, Math.max(40, Math.round(rawRequiredSgpa * 9.2)));

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setTargetCgpa(targetCgpaNum);
    setIsCalculated(true);
    setTimeout(() => setIsCalculated(false), 2000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Target Marks & CGPA Calculator
              </h2>
              <Badge variant="default" size="sm">
                Live Simulator
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-neutral-400">
              Calculate the exact SGPA and end-semester exam marks required to reach your target graduation CGPA.
            </p>
          </div>

          <Button onClick={() => handleCalculate()} className="gap-2 shrink-0">
            <RotateCcw className="h-4 w-4" />
            {isCalculated ? "Recalculated!" : "Recalculate Breakdown"}
          </Button>
        </div>

        {/* Target Simulator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Target CGPA Input */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700 dark:text-neutral-300">
                  Target Graduation CGPA
                </CardTitle>
                <Target className="h-4 w-4 text-slate-700 dark:text-neutral-300" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">{targetCgpaNum.toFixed(2)}</span>
                <span className="text-xs text-slate-400 font-medium">/ 10.0 Scale</span>
              </div>
              <p className="text-xs text-slate-500">
                Current: <strong>{currentCgpa}</strong> across {completedCredits} completed credits
              </p>
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
                  Adjust Target CGPA:
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.05"
                    min="5.0"
                    max="10.0"
                    value={targetCgpaInput}
                    onChange={(e) => setTargetCgpaInput(e.target.value)}
                    className="h-9 text-xs font-bold"
                  />
                  <Button size="sm" onClick={() => handleCalculate()} className="shrink-0">
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Required SGPA Output */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700 dark:text-neutral-300">
                  Required Semester SGPA
                </CardTitle>
                <Calculator className="h-4 w-4 text-slate-700 dark:text-neutral-300" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-extrabold ${rawRequiredSgpa > 10 ? "text-rose-600" : "text-slate-900 dark:text-neutral-100"}`}>
                  {displayRequiredSgpa}
                </span>
                <span className="text-xs text-slate-400 font-medium">in Sem 5 & 6</span>
              </div>
              <p className="text-xs text-slate-500">
                To bridge <strong>{targetGap.startsWith("-") ? targetGap : `+${targetGap}`} CGPA</strong> across remaining {remainingCredits} credits
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <Badge variant={feasibilityBadge.variant} size="sm">
                  {feasibilityBadge.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Endterm Average */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700 dark:text-neutral-300">
                  Endterm Target Average
                </CardTitle>
                <Sparkles className="h-4 w-4 text-slate-700 dark:text-neutral-300" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">{requiredExamAvg}%</span>
                <span className="text-xs text-slate-400 font-medium">Exam Average Needed</span>
              </div>
              <p className="text-xs text-slate-500">
                Projected against your continuous internal evaluation average (76.8%)
              </p>
              <div className="pt-1">
                <span className="text-xs font-semibold text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-neutral-700 block text-center">
                  {rawRequiredSgpa <= 9.0 ? "Target is well within reach" : "Prioritize 4-Credit Core Subjects"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Subject Breakdown Table */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-by-Subject Required Marks Breakdown</CardTitle>
            <CardDescription>
              Dynamically estimated marks required in end-semester examinations to achieve your target SGPA ({displayRequiredSgpa})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-neutral-800 text-xs font-semibold text-slate-500">
                    <th className="py-3 px-3">Subject</th>
                    <th className="py-3 px-3">Credits</th>
                    <th className="py-3 px-3">Internal Score</th>
                    <th className="py-3 px-3">Target Grade</th>
                    <th className="py-3 px-3">Required Endterm Marks</th>
                    <th className="py-3 px-3 text-right">Feasibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60 text-sm">
                  {subjects.map((sub, i) => {
                    // Dynamic mark offset based on target SGPA
                    const delta = (rawRequiredSgpa - 8.5) * 6;
                    const baseMarks = [84, 78, 72, 88, 80][i % 5] || 75;
                    const computedMarks = Math.min(100, Math.max(40, Math.round(baseMarks + delta)));
                    const diff =
                      computedMarks > 88
                        ? "High Effort"
                        : computedMarks > 75
                        ? "Moderate"
                        : "Comfortable";

                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/70 dark:hover:bg-neutral-800/40">
                        <td className="py-3.5 px-3">
                          <span className="font-semibold text-slate-900 dark:text-neutral-100">{sub.name}</span>
                          <div className="text-xs text-slate-400 font-mono">{sub.code}</div>
                        </td>
                        <td className="py-3.5 px-3 font-semibold">{sub.credits}</td>
                        <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-neutral-300">
                          {sub.currentScore}%
                        </td>
                        <td className="py-3.5 px-3">
                          <Badge variant="default" size="sm">
                            Grade {sub.targetGrade}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-slate-900 dark:text-neutral-100">
                            {computedMarks} / 100
                          </span>
                          <span className="text-xs text-slate-400 ml-1.5">(≥ {computedMarks}%)</span>
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
        <Card className="bg-slate-50 border-slate-200 dark:bg-neutral-900/60 dark:border-neutral-800">
          <CardContent className="p-5 space-y-2 text-xs text-slate-600 dark:text-neutral-400">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-neutral-200 text-sm">
              <HelpCircle className="h-4 w-4 text-slate-600 dark:text-neutral-400" />
              <span>Calculation Engine Formula</span>
            </div>
            <p className="leading-relaxed">
              In <strong>Step 5 & Step 6</strong>, this engine will connect to your real university grading scale:
            </p>
            <p className="font-mono bg-white dark:bg-neutral-800 p-2.5 rounded-md border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-neutral-100">
              Required SGPA = [ (Target CGPA × Total Degree Credits) - (Current CGPA × Completed Credits) ] / Remaining Credits
            </p>
            <p className="leading-relaxed">
              For your current profile: <code>[ ({targetCgpaNum} × 120) - (8.34 × 96) ] / 24 = {displayRequiredSgpa} SGPA</code>.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
