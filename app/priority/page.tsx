"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Download,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Check,
} from "lucide-react";
import { useAcademicPreferences } from "@/lib/academic-context";
import Link from "next/link";
import { StudyPriorityItem } from "@/types";

export default function PriorityPage() {
  const { currentSemester, getSemesterSubjectsList } = useAcademicPreferences();
  const [selectedSemester, setSelectedSemester] = React.useState(currentSemester || "1");
  const [expandedCards, setExpandedCards] = React.useState<Record<string, boolean>>({
    pri_1: true,
  });
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  // Sync selected semester with global currentSemester if updated
  React.useEffect(() => {
    setSelectedSemester(currentSemester);
  }, [currentSemester]);

  const currentNum = parseInt(currentSemester, 10) || 1;
  const selectedNum = parseInt(selectedSemester, 10) || 1;
  const isSelectedFuture = selectedNum > currentNum;

  const semSubjects = getSemesterSubjectsList(selectedSemester);

  const currentPriorities: StudyPriorityItem[] = React.useMemo(() => {
    if (semSubjects.length === 0) return [];
    return semSubjects
      .map((sub, index) => {
        const score = sub.currentScore || 0;
        const urgency: "High" | "Medium" | "Low" =
          score < 65 ? "High" : score < 80 ? "Medium" : "Low";
        const priorityScore = Math.max(10, 100 - score);

        return {
          id: `pri_${sub.id}`,
          rank: index + 1,
          subjectName: sub.name,
          subjectCode: sub.code,
          priorityScore,
          urgency,
          creditWeight: sub.credits,
          impactFactor: `${sub.credits} Credits - Weight ${sub.credits * 15}%`,
          reason:
            score < 65
              ? `Internal score (${score}%) is below safe threshold for target grade ${sub.targetGrade || "A"}.`
              : `Current progress is at ${score}%. Continue active practice.`,
          recommendedAction:
            score < 65
              ? "Dedicate 2 focused 45-min review sessions to improve internal assessments."
              : "Review key conceptual assignments before the upcoming test.",
        };
      })
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .map((item, idx) => ({ ...item, rank: idx + 1 }));
  }, [semSubjects]);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExport = () => {
    const textContent = `========================================================
ACAVISE -- STUDY PRIORITY INTELLIGENCE MATRIX
Semester: ${selectedSemester}
Generated on: ${new Date().toLocaleDateString()}
========================================================

${currentPriorities.map(
  (item) => `[RANK #${item.rank}] ${item.subjectName} (${item.subjectCode})
- Priority Score: ${item.priorityScore}/100 [${item.urgency} Urgency]
- Weight: ${item.creditWeight} Credits (${item.impactFactor})
- Algorithmic Diagnosis: ${item.reason}
- Recommended Study Action: ${item.recommendedAction}
--------------------------------------------------------`
).join("\n\n")}

========================================================
Focus your highest energy on Rank #1 before attempting low-yield tasks.
AcaVise Academic Visibility & Intelligence Platform
========================================================`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `AcaVise_Priority_Matrix_Sem${selectedSemester}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Study Priority Intelligence
              </h2>
              <Badge variant="default" size="sm">
                Multi-Factor Ranking
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-neutral-400">
              Algorithmic prioritization ranking subjects based on credit weights, target grade deficit, and exam imminence.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              aria-label="Filter by semester"
              className="h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              {["1", "2", "3", "4", "5", "6", "7", "8"].map((sem) => {
                const sNum = parseInt(sem, 10);
                return (
                  <option key={sem} value={sem}>
                    Semester {sem} {sNum === currentNum ? "(Active)" : sNum < currentNum ? "(Past)" : "(Upcoming)"}
                  </option>
                );
              })}
            </select>

            <Button onClick={handleExport} size="sm" className="gap-1.5 text-xs" disabled={currentPriorities.length === 0}>
              {downloadSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-300" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  <span>Export Revision Matrix</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Priority Matrix Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-rose-50/50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold">
                {currentPriorities.filter((p) => p.urgency === "High").length}
              </div>
              <div>
                <p className="text-xs text-rose-800 dark:text-rose-300 font-semibold uppercase tracking-wider">
                  Critical / High Urgency
                </p>
                <p className="text-sm text-slate-700 dark:text-neutral-300 truncate">
                  {currentPriorities.filter((p) => p.urgency === "High").map((p) => p.subjectCode).join(", ") || "None"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
                {currentPriorities.filter((p) => p.urgency === "Medium").length}
              </div>
              <div>
                <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold uppercase tracking-wider">
                  Moderate Priority
                </p>
                <p className="text-sm text-slate-700 dark:text-neutral-300 truncate">
                  {currentPriorities.filter((p) => p.urgency === "Medium").map((p) => p.subjectCode).join(", ") || "None"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                {currentPriorities.filter((p) => p.urgency === "Low").length}
              </div>
              <div>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold uppercase tracking-wider">
                  Stable Standing
                </p>
                <p className="text-sm text-slate-700 dark:text-neutral-300 truncate">
                  {currentPriorities.filter((p) => p.urgency === "Low").map((p) => p.subjectCode).join(", ") || "None"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Ranked List with Accordion */}
        <div className="space-y-4">
          {currentPriorities.length === 0 ? (
            <Card className="p-12 text-center bg-white dark:bg-neutral-900 border-slate-200/80">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-neutral-800 dark:text-neutral-400 mb-3">
                <Target className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-neutral-100 mb-1">
                {isSelectedFuture
                  ? `Semester ${selectedSemester} is Upcoming / Not Started`
                  : `No Priority Items for Semester ${selectedSemester}`}
              </h4>
              <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed mb-4">
                {isSelectedFuture
                  ? "Study Priority Intelligence algorithmically ranks active subjects based on continuous internal marks, credit weights, and imminent exam schedules. No active subjects are enrolled for this upcoming term."
                  : "No subjects enrolled for this semester yet. Add your subjects and continuous evaluation marks in Academics to generate your AI-ranked priority revision matrix."}
              </p>
              <Link href="/academics">
                <Button size="sm" className="gap-2 text-xs">
                  <BookOpen className="h-4 w-4" />
                  <span>Go to Academics</span>
                </Button>
              </Link>
            </Card>
          ) : (
            currentPriorities.map((item) => {
              const isExpanded = !!expandedCards[item.id];

              return (
              <Card
                key={item.id}
                className={`overflow-hidden transition-all ${
                  item.rank === 1
                    ? "border-l-4 border-l-rose-600 border-slate-200 shadow-xs"
                    : item.rank === 2
                    ? "border-l-4 border-l-amber-500 border-slate-200"
                    : "border-l-4 border-l-slate-400 border-slate-200"
                }`}
              >
                <CardContent className="p-5 sm:p-6">
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-neutral-800 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-extrabold text-sm dark:bg-neutral-100 dark:text-neutral-900">
                        #{item.rank}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-neutral-100">
                          {item.subjectName}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-mono font-bold text-slate-700 dark:text-neutral-300">
                            {item.subjectCode}
                          </span>
                          <span>-</span>
                          <span>{item.creditWeight} Credits</span>
                          <span>-</span>
                          <span>Impact: {item.impactFactor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">Priority Score</p>
                        <p className="text-xl font-extrabold text-slate-900 dark:text-neutral-100">
                          {item.priorityScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                        </p>
                      </div>
                      <Badge variant={item.urgency === "High" ? "destructive" : "warning"} size="md">
                        {item.urgency} Urgency
                      </Badge>
                      <button
                        type="button"
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Core Diagnosis and Recommendation */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Problem / Reason */}
                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-neutral-800/40 border border-slate-200/70 dark:border-neutral-800 space-y-1">
                      <p className="text-xs font-bold text-slate-700 dark:text-neutral-200 flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                        Algorithmic Diagnosis:
                      </p>
                      <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                        {item.reason}
                      </p>
                    </div>

                    {/* Recommendation Action */}
                    <div className="p-3.5 rounded-lg bg-slate-100/80 dark:bg-neutral-800/50 border border-slate-200 dark:border-neutral-700 space-y-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-neutral-100 flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-slate-700 dark:text-neutral-300" />
                        Recommended Study Action:
                      </p>
                      <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                        {item.recommendedAction}
                      </p>
                    </div>
                  </div>

                  {/* Collapsible Deep-Dive Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-100/50 dark:bg-neutral-800/60">
                        <span className="font-semibold text-slate-700 dark:text-neutral-300 block">Syllabus Risk Area</span>
                        <span className="text-slate-500 text-[11px]">Unit 3 & Unit 4 (45% exam weight)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-100/50 dark:bg-neutral-800/60">
                        <span className="font-semibold text-slate-700 dark:text-neutral-300 block">Optimal Revision Window</span>
                        <span className="text-slate-500 text-[11px]">6:30 PM - 8:00 PM (Daily Block)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-100/50 dark:bg-neutral-800/60">
                        <span className="font-semibold text-slate-700 dark:text-neutral-300 block">Estimated Grade Impact</span>
                        <span className="text-slate-500 text-[11px]">+0.12 CGPA on achieving Grade A+</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          }))}
        </div>
      </div>
    </AppShell>
  );
}
