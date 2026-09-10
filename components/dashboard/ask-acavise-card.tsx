import * as React from "react";
import Link from "next/link";
import { BotMessageSquare, Sparkles, ArrowRight, MessageSquareQuote } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AskAcaViseCard() {
  const suggestedQuestions = [
    "What should I study today?",
    "What do I need to score an A+ in Algorithms?",
    "Which subject should I prioritize this week?",
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base">Ask AcaVise — AI Academic Assistant</CardTitle>
              <CardDescription>
                Context-aware guidance based on your grades, targets, and exam schedules
              </CardDescription>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-600 dark:text-neutral-400 bg-slate-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
            UI Preview
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 dark:text-neutral-400">
            Suggested prompt questions for your current standing:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <Link
                key={idx}
                href={`/ai-assistant?q=${encodeURIComponent(q)}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-xs font-medium text-slate-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700/80 transition-all shadow-2xs"
              >
                <MessageSquareQuote className="h-3.5 w-3.5 text-slate-500" />
                <span>&quot;{q}&quot;</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-neutral-800">
          <span className="text-xs text-slate-400">
            AI Assistant will analyze your syllabus and past semester weights
          </span>
          <Link href="/ai-assistant">
            <Button size="sm" variant="subtle" className="gap-1.5">
              Open Full AI Chat <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
