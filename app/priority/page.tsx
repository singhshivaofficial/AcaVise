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
import { SEMESTER_PRIORITIES_DEFAULT } from "@/lib/mock-data";

export default function PriorityPage() {
  const { currentSemester } = useAcademicPreferences();
  const [selectedSemester, setSelectedSemester] = React.useState(currentSemester || "5");
  const [expandedCards, setExpandedCards] = React.useState<Record<string, boolean>>({
    pri_1: true,
  });
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  // Sync selected semester with global currentSemester if updated
  React.useEffect(() => {
    setSelectedSemester(currentSemester);
  }, [currentSemester]);

  const currentPriorities =
    SEMESTER_PRIORITIES_DEFAULT[selectedSemester] || SEMESTER_PRIORITIES_DEFAULT["5"] || [];

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExport = () => {
    const textContent = `========================================================
ACAVISE — STUDY PRIORITY INTELLIGENCE MATRIX
Semester: ${selectedSemester}
Generated on: ${new Date().toLocaleDateString()}
========================================================

${currentPriorities.map(
  (item) => `[RANK #${item.rank}] ${item.subjectName} (${item.subjectCode})
• Priority Score: ${item.priorityScore}/100 [${item.urgency} Urgency]
• Weight: ${item.creditWeight} Credits (${item.impactFactor})
• Algorithmic Diagnosis: ${item.reason}
• Recommended Study Action: ${item.recommendedAction}
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
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Algorithmic prioritization ranking subjects based on credit weights, target grade deficit, and exam imminence.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              aria-label="Filter by semester"
              className="h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {["1", "2", "3", "4", "5", "6", "7", "8"].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem} {sem === currentSemester ? "(Active)" : parseInt(sem, 10) < parseInt(currentSemester, 10) ? "(Past)" : "(Upcoming)"}
                </option>
              ))}
            </select>

            <Button onClick={handleExport} size="sm" className="gap-1.5 text-xs">
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
                <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
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
                <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
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
                <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
                  {currentPriorities.filter((p) => p.urgency === "Low").map((p) => p.subjectCode).join(", ") || "None"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Ranked List with Accordion */}
        <div className="space-y-4">
          {currentPriorities.map((item) => {
            const isExpanded = !!expandedCards[item.id];

            return (
              <Card
                key={item.id}
                className={`overflow-hidden transition-all ${
                  item.rank === 1
                    ? "border-l-4 border-l-rose-600 border-slate-200 shadow-xs"
                    : item.rank === 2
                    ? "border-l-4 border-l-amber-500 border-slate-200"
                    : "border-l-4 border-l-blue-500 border-slate-200"
                }`}
              >
                <CardContent className="p-5 sm:p-6">
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-extrabold text-sm dark:bg-slate-100 dark:text-slate-900">
                        #{item.rank}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                          {item.subjectName}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                            {item.subjectCode}
                          </span>
                          <span>•</span>
                          <span>{item.creditWeight} Credits</span>
                          <span>•</span>
                          <span>Impact: {item.impactFactor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">Priority Score</p>
                        <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
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
                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-1">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                        Algorithmic Diagnosis:
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.reason}
                      </p>
                    </div>

                    {/* Recommendation Action */}
                    <div className="p-3.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 space-y-1">
                      <p className="text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-blue-600" />
                        Recommended Study Action:
                      </p>
                      <p className="text-xs text-blue-950 dark:text-blue-200 leading-relaxed">
                        {item.recommendedAction}
                      </p>
                    </div>
                  </div>

                  {/* Collapsible Deep-Dive Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-100/50 dark:bg-slate-800/60">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 block">Syllabus Risk Area</span>
                        <span className="text-slate-500 text-[11px]">Unit 3 & Unit 4 (45% exam weight)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-100/50 dark:bg-slate-800/60">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 block">Optimal Revision Window</span>
                        <span className="text-slate-500 text-[11px]">6:30 PM – 8:00 PM (Daily Block)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-100/50 dark:bg-slate-800/60">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 block">Estimated Grade Impact</span>
                        <span className="text-slate-500 text-[11px]">+0.12 CGPA on achieving Grade A+</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
