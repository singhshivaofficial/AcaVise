import * as React from "react";
import { Award, BookOpen, Calendar, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { AcademicMetric, UpcomingEvent } from "@/types";

interface StatGridProps {
  metrics: AcademicMetric;
  nextEvent?: UpcomingEvent;
}

export function StatGrid({ metrics, nextEvent }: StatGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Cumulative CGPA"
        value={metrics.cgpa.toFixed(2)}
        subtitle={`Target: ${metrics.targetCgpa.toFixed(2)} (${metrics.completedCredits}/${metrics.totalCredits} credits)`}
        trend={{ value: "+0.14 this year", positive: true }}
        icon={<Award className="h-5 w-5" />}
      />

      <StatCard
        title="Current SGPA (Sem 5)"
        value={metrics.currentSgpa.toFixed(2)}
        subtitle="Expected based on internal marks"
        trend={{ value: "+0.28 vs Sem 4", positive: true }}
        icon={<BookOpen className="h-5 w-5" />}
      />

      <StatCard
        title="Overall Attendance"
        value={`${metrics.attendancePercentage}%`}
        subtitle="Safety buffer: +11.5% above cutoff"
        trend={{ value: "Compliant", positive: true }}
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
