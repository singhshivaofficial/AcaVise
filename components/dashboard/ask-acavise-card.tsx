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
    <Card className="border-blue-200/80 bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/20 dark:border-blue-900/50 dark:from-blue-950/20 dark:via-slate-900 dark:to-indigo-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base">Ask AcaVise — AI Academic Assistant</CardTitle>
              <CardDescription>
                Context-aware guidance based on your grades, targets, and exam schedules
              </CardDescription>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded-md">
            UI Preview
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Suggested prompt questions for your current standing:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <Link
                key={idx}
                href="/ai-assistant"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80 transition-all shadow-2xs"
              >
                <MessageSquareQuote className="h-3.5 w-3.5 text-blue-500" />
                <span>&quot;{q}&quot;</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
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
