import type { Metadata } from "next";
import "./globals.css";

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
      <body className="h-full antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
