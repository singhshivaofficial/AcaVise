"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { BookOpenCheck, GraduationCap, User, Target, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useAcademicPreferences } from "@/lib/academic-context";

export default function OnboardingPage() {
  const router = useRouter();
  const { updateSettings, setCurrentSemester, setTargetCgpa } = useAcademicPreferences();

  const [fullName, setFullName] = React.useState("");
  const [branch, setBranch] = React.useState("Computer Engineering");
  const [semester, setSemester] = React.useState("1");
  const [targetCgpaInput, setTargetCgpaInput] = React.useState("9.00");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Prepopulate if user metadata already has partial values
  React.useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const meta = user.user_metadata || {};
        if (meta.full_name || meta.name) {
          setFullName(meta.full_name || meta.name);
        }
        if (meta.branch) setBranch(meta.branch);
        if (meta.semester) setSemester(String(meta.semester));
        if (meta.target_cgpa) setTargetCgpaInput(String(meta.target_cgpa));
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const parsedTarget = parseFloat(targetCgpaInput);
    if (isNaN(parsedTarget) || parsedTarget < 0 || parsedTarget > 10) {
      setError("Please enter a valid target CGPA between 0.00 and 10.00.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName.trim(),
          name: fullName.trim(),
          branch: branch.trim(),
          semester: semester,
          target_cgpa: parsedTarget.toFixed(2),
          onboarding_completed: true,
        },
      });

      if (updateError) {
        setError(updateError.message || "Failed to save profile. Please try again.");
        setIsLoading(false);
        return;
      }

      // Update local context
      updateSettings({
        profile: {
          name: fullName.trim(),
          branch: branch.trim(),
          semester: parseInt(semester, 10) || 1,
          targetCgpa: parsedTarget,
        },
      });
      setCurrentSemester(semester);
      setTargetCgpa(parsedTarget);

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 py-12 dark:bg-neutral-950">
      <div className="w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold dark:bg-neutral-100 dark:text-neutral-900 shadow-xs">
              <BookOpenCheck className="h-6 w-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
              AcaVise
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-neutral-100">
            Welcome to AcaVise
          </h2>
          <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm">
            Let&apos;s set up your academic profile to configure your personalized study workspace and target intelligence.
          </p>
        </div>

        {/* Onboarding Form Card */}
        <Card className="shadow-sm border-slate-200/90 dark:border-neutral-800">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-slate-700 dark:text-neutral-300" />
              <CardTitle className="text-base">Academic Profile Setup</CardTitle>
            </div>
            <CardDescription>Tell us about your current academic program</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Input
                label="Full Name *"
                placeholder="e.g. Alex Rivera"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                leftIcon={<User className="h-4 w-4" />}
                required
              />

              <Input
                label="Degree / Major *"
                placeholder="e.g. Computer Science & Engineering"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                leftIcon={<GraduationCap className="h-4 w-4" />}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  label="Current Semester *"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
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

                <Input
                  label="Target Graduation CGPA *"
                  type="number"
                  step="0.05"
                  min="0"
                  max="10"
                  placeholder="e.g. 9.00"
                  value={targetCgpaInput}
                  onChange={(e) => setTargetCgpaInput(e.target.value)}
                  leftIcon={<Target className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="rounded-lg bg-slate-100 dark:bg-neutral-800/60 p-3 text-xs text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700">
                You can change your semester and target CGPA anytime in Settings.
              </div>

              <Button type="submit" isLoading={isLoading} className="w-full gap-2">
                Complete Setup & Enter Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
