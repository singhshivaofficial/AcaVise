import type { Metadata } from "next";
import "./globals.css";
import { AcademicProvider } from "@/lib/academic-context";

export const metadata: Metadata = {
  title: "AcaVise — Academic Visibility & Intelligence Platform",
  description:
    "Know where you stand. Know what you need. Know what to do next. Student-focused academic intelligence, CGPA tracking, study prioritization, and planning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased selection:bg-slate-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900">
        <AcademicProvider>
          {children}
        </AcademicProvider>
      </body>
    </html>
  );
}
