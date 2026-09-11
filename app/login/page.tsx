"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpenCheck, Mail, ArrowRight, AlertCircle, KeyRound, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [step, setStep] = React.useState<"email" | "otp">("email");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [resendCooldown, setResendCooldown] = React.useState(0);

  // Cooldown countdown timer
  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid student or university email address.");
      return;
    }

    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          shouldCreateUser: true,
        },
      });

      if (otpError) {
        setError(otpError.message || "Failed to send verification code. Please try again.");
        setIsLoading(false);
        return;
      }

      setStep("otp");
      setMessage(`A 6-digit verification code was sent to ${cleanEmail}.`);
      setResendCooldown(30);
      setIsLoading(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otp.trim();
    if (cleanOtp.length < 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: cleanOtp,
        type: "email",
      });

      if (verifyError) {
        setError(verifyError.message || "Invalid or expired verification code. Please try again.");
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        const isOnboarded = !!data.user.user_metadata?.onboarding_completed;
        if (!isOnboarded) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 py-12 dark:bg-neutral-950">
      <div className="w-full max-w-md space-y-6">
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
            {step === "email" ? "Sign In to AcaVise" : "Enter Verification Code"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-xs">
            {step === "email"
              ? "Passwordless access with secure one-time email verification."
              : `Enter the 6-digit code sent to ${email.trim()}`}
          </p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-sm border-slate-200/90 dark:border-neutral-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">
              {step === "email" ? "Email Authentication" : "Verify Email OTP"}
            </CardTitle>
            <CardDescription>
              {step === "email"
                ? "Enter your student or university email to receive a 6-digit login code"
                : "Check your inbox and enter the 6-digit code below"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="p-3 mb-4 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {message && step === "otp" && (
              <div className="p-3 mb-4 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                {message}
              </div>
            )}

            {step === "email" ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <Input
                  label="Student / University Email"
                  type="email"
                  placeholder="alex.rivera@univ.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="h-4 w-4" />}
                  required
                  autoFocus
                />

                <Button type="submit" isLoading={isLoading} className="w-full gap-2">
                  Send Verification Code <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                    6-Digit Verification Code
                  </label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    leftIcon={<KeyRound className="h-4 w-4" />}
                    className="font-mono text-center tracking-widest text-lg font-bold"
                    required
                    autoFocus
                  />
                </div>

                <Button type="submit" isLoading={isLoading} className="w-full gap-2">
                  Verify & Continue <ArrowRight className="h-4 w-4" />
                </Button>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setError("");
                      setMessage("");
                    }}
                    className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Change Email
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    disabled={resendCooldown > 0 || isLoading}
                    className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
                  </button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="justify-center border-t border-slate-100 dark:border-neutral-800 pt-4 text-xs text-slate-500">
            {step === "email" ? (
              <span>
                New student?{" "}
                <Link href="/signup" className="ml-1 font-semibold text-slate-900 hover:underline dark:text-neutral-100">
                  Register here
                </Link>
              </span>
            ) : (
              <span>
                Didn&apos;t receive a code? Check spam or click Resend Code.
              </span>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
