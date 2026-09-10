import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatGrade(score: number): string {
  if (score >= 90) return "O";
  if (score >= 80) return "A+";
  if (score >= 70) return "A";
  if (score >= 60) return "B+";
  if (score >= 50) return "B";
  if (score >= 40) return "C";
  return "F";
}

export function getStatusBadgeVariant(status: string): "default" | "success" | "warning" | "destructive" | "secondary" {
  switch (status.toLowerCase()) {
    case "high":
    case "critical":
    case "urgent":
      return "destructive";
    case "medium":
    case "in-progress":
      return "warning";
    case "low":
    case "completed":
    case "stable":
      return "success";
    default:
      return "secondary";
  }
}

export function getInitials(name: string): string {
  if (!name || typeof name !== "string") return "ST";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
