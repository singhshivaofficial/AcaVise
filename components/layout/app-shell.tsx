"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { MobileNav } from "./mobile-nav";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50/70 text-slate-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-40">
        <Sidebar className="h-full w-full" />
      </div>

      {/* Mobile navigation drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:pl-64 min-w-0">
        <TopBar onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
