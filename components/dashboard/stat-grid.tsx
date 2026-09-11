import * as React from "react";
import { Award, BookOpen, Calendar, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { AcademicMetric, UpcomingEvent } from "@/types";

interface StatGridProps {
  metrics: AcademicMetric;
  nextEvent?: UpcomingEvent;
  currentSemester?: string;
  hasSubjects?: boolean;
}

export function StatGrid({ metrics, nextEvent, currentSemester = "1", hasSubjects = false }: StatGridProps) {
  const hasRecordedData = hasSubjects && metrics.completedCredits > 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Cumulative CGPA"
        value={hasRecordedData ? metrics.cgpa.toFixed(2) : "-"}
        subtitle={`Target: ${metrics.targetCgpa.toFixed(2)} (${metrics.completedCredits}/${metrics.totalCredits} credits)`}
        trend={hasRecordedData ? { value: "+0.14 this year", positive: true } : undefined}
        icon={<Award className="h-5 w-5" />}
      />

      <StatCard
        title={`Current SGPA (Sem ${currentSemester})`}
        value={hasRecordedData ? metrics.currentSgpa.toFixed(2) : "-"}
        subtitle={hasRecordedData ? "Calculated from enrolled courses" : "No evaluations recorded yet"}
        trend={hasRecordedData ? { value: "On track", positive: true } : undefined}
        icon={<BookOpen className="h-5 w-5" />}
      />

      <StatCard
        title="Overall Attendance"
        value={hasRecordedData && metrics.attendancePercentage > 0 ? `${metrics.attendancePercentage}%` : "-"}
        subtitle={hasRecordedData ? "Safety buffer: Compliant" : "Add subjects to track attendance"}
        trend={hasRecordedData ? { value: "Compliant", positive: true } : undefined}
        icon={<CheckCircle2 className="h-5 w-5" />}
      />

      <StatCard
        title="Upcoming Exam"
        value={nextEvent ? `${nextEvent.daysLeft} Day` : "None"}
        subtitle={nextEvent ? `${nextEvent.title} (${nextEvent.subject.split(" ")[0]})` : "No upcoming exams"}
        icon={<Calendar className="h-5 w-5" />}
      />
    </div>
  );
}
