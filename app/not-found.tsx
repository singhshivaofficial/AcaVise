import Link from "next/link";
import { BookOpenCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900 dark:bg-neutral-950 dark:text-neutral-100 antialiased">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-bold shadow-md">
          <BookOpenCheck className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">404 — Page Not Found</h1>
        <p className="text-sm text-slate-500 dark:text-neutral-400">
          The academic module or page you are looking for does not exist or has moved.
        </p>
        <div className="pt-2">
          <Link href="/dashboard">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
