import Link from "next/link";
import { BookOpenCheck, Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20">
              <BookOpenCheck className="h-6 w-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
              AcaVise
            </span>
          </Link>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Welcome back to AcaVise
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            Log in to view your academic dashboard, track targets, and prioritize your studies.
          </p>
        </div>

        {/* Login Card UI Mockup */}
        <Card className="shadow-sm border-slate-200/90 dark:border-slate-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Sign In</CardTitle>
            <CardDescription>Enter your student or university email credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="University / Student Email"
              type="email"
              placeholder="alex.rivera@univ.edu"
              defaultValue="alex.rivera@eng.univ.edu"
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a href="#" className="text-xs text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                type="password"
                placeholder="••••••••••••"
                defaultValue="mock-password"
                leftIcon={<Lock className="h-4 w-4" />}
              />
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-3 text-xs text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
              <span className="font-semibold">Step 1 UI Demo:</span> Authentication will be connected in Step 2. Click below to explore the dashboard directly.
            </div>

            <Link href="/dashboard" className="block w-full">
              <Button className="w-full gap-2">
                Continue to Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="justify-center border-t border-slate-100 dark:border-slate-800 pt-4 text-xs text-slate-500">
            Don&apos;t have an account yet?{" "}
            <Link href="/signup" className="ml-1 font-semibold text-blue-600 hover:underline">
              Create account
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
