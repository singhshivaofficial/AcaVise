import Link from "next/link";
import { BookOpenCheck, Lock, Mail, User, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="w-full max-w-lg space-y-6">
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
            Create your Student Account
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Set up your academic profile to unlock target tracking, priority scoring, and AI assistance.
          </p>
        </div>

        {/* Signup Card UI Mockup */}
        <Card className="shadow-sm border-slate-200/90 dark:border-slate-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Student Registration</CardTitle>
            <CardDescription>Academic profile & credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Full Name"
                placeholder="e.g. Alex Rivera"
                defaultValue="Alex Rivera"
                leftIcon={<User className="h-4 w-4" />}
              />
              <Input
                label="Student Email"
                type="email"
                placeholder="alex@univ.edu"
                defaultValue="alex.rivera@eng.univ.edu"
                leftIcon={<Mail className="h-4 w-4" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Degree / Major"
                placeholder="Computer Science & Engineering"
                defaultValue="Computer Science"
                leftIcon={<GraduationCap className="h-4 w-4" />}
              />
              <Select
                label="Current Semester"
                defaultValue="5"
                options={[
                  { value: "1", label: "Semester 1" },
                  { value: "2", label: "Semester 2" },
                  { value: "3", label: "Semester 3" },
                  { value: "4", label: "Semester 4" },
                  { value: "5", label: "Semester 5" },
                  { value: "6", label: "Semester 6" },
                  { value: "7", label: "Semester 7" },
                  { value: "8", label: "Semester 8" },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Create Password"
                type="password"
                placeholder="••••••••••••"
                defaultValue="mock-pass"
                leftIcon={<Lock className="h-4 w-4" />}
              />
              <Input
                label="Target CGPA"
                type="number"
                step="0.01"
                placeholder="e.g. 8.80"
                defaultValue="8.80"
              />
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-3 text-xs text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
              <span className="font-semibold">Step 1 UI Demo:</span> User registration will be powered by Supabase Auth in Step 2.
            </div>

            <Link href="/dashboard" className="block w-full">
              <Button className="w-full gap-2">
                Create Account & Enter Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="justify-center border-t border-slate-100 dark:border-slate-800 pt-4 text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="ml-1 font-semibold text-blue-600 hover:underline">
              Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
