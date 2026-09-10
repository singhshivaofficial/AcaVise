"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpenCheck, Lock, Mail, User, GraduationCap, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    branch: "Computer Science & Engineering",
    semester: "5",
    password: "",
    targetCgpa: "8.80",
  });
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Please complete all required registration fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password.trim(),
        options: {
          data: {
            full_name: formData.name.trim(),
            name: formData.name.trim(),
            branch: formData.branch.trim(),
            semester: formData.semester,
            target_cgpa: formData.targetCgpa,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message || "Failed to create account. Please try again.");
        setIsLoading(false);
        return;
      }

      if (data?.user && !data?.session) {
        // Email confirmation is required
        setSuccessMessage(
          `Account created successfully! We have sent a confirmation link to ${formData.email}. Please check your inbox and verify your email to log in.`
        );
        setIsLoading(false);
        return;
      }

      // If user is immediately logged in
      if (typeof window !== "undefined" && formData.targetCgpa) {
        localStorage.setItem("acavise_target_cgpa", formData.targetCgpa);
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred during signup.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 py-12 dark:bg-neutral-950">
      <div className="w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold dark:bg-neutral-100 dark:text-neutral-900 shadow-xs">
              <BookOpenCheck className="h-6 w-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
              AcaVise
            </span>
          </Link>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-neutral-100">
            Create your Student Account
          </h2>
          <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm">
            Set up your academic profile to unlock target tracking, priority scoring, and AI assistance.
          </p>
        </div>

        {/* Signup Card Form */}
        <Card className="shadow-sm border-slate-200/90 dark:border-neutral-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Student Registration</CardTitle>
            <CardDescription>Academic profile & credentials</CardDescription>
          </CardHeader>
          <CardContent>
            {successMessage ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-200 space-y-2">
                  <p className="text-sm font-semibold">Verification Email Sent</p>
                  <p className="text-xs leading-relaxed">{successMessage}</p>
                </div>
                <Button onClick={() => router.push("/login")} className="w-full gap-2">
                  Go to Sign In <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Full Name *"
                    placeholder="e.g. Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    leftIcon={<User className="h-4 w-4" />}
                    required
                  />
                  <Input
                    label="Student Email *"
                    type="email"
                    placeholder="alex@univ.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    leftIcon={<Mail className="h-4 w-4" />}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Degree / Major"
                    placeholder="Computer Science & Engineering"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    leftIcon={<GraduationCap className="h-4 w-4" />}
                  />
                  <Select
                    label="Current Semester"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
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
                    label="Create Password *"
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    leftIcon={<Lock className="h-4 w-4" />}
                    required
                  />
                  <Input
                    label="Target Graduation CGPA"
                    type="number"
                    step="0.05"
                    placeholder="e.g. 8.80"
                    value={formData.targetCgpa}
                    onChange={(e) => setFormData({ ...formData, targetCgpa: e.target.value })}
                  />
                </div>

                <Button type="submit" isLoading={isLoading} className="w-full gap-2">
                  Create Account & Enter Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="justify-center border-t border-slate-100 dark:border-neutral-800 pt-4 text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="ml-1 font-semibold text-slate-900 hover:underline dark:text-neutral-100">
              Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
