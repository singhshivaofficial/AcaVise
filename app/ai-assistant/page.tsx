"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Bot, User, Lightbulb, BookOpen } from "lucide-react";
import { useAcademicPreferences } from "@/lib/academic-context";
import { AiChatMessage } from "@/types";
import Link from "next/link";

function AiChatComponent() {
  const searchParams = useSearchParams();
  const { profile, currentSemester, subjects, priorities, targetCgpa, metrics } = useAcademicPreferences();

  const [messages, setMessages] = React.useState<AiChatMessage[]>([]);
  const [inputText, setInputText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Initialize greeting based on user state
  React.useEffect(() => {
    const studentName = profile.name || "Student";
    if (subjects.length === 0) {
      setMessages([
        {
          id: "init_1",
          sender: "assistant",
          content: `Hello ${studentName}! I am your AcaVise AI Academic Assistant.\n\nYou currently have **0 enrolled courses recorded for Semester ${currentSemester}**. To unlock personalized study priorities, grade target simulations, and exam strategies, please add your courses in the **Academics** section.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: [
            "How do I add my subjects?",
            "What is AcaVise's Target CGPA formula?",
            "How does the Study Priority Engine work?",
          ],
        },
      ]);
    } else {
      const topSubjectName = priorities[0]?.subjectName || subjects[0]?.name || "your core subjects";
      setMessages([
        {
          id: "init_1",
          sender: "assistant",
          content: `Hello ${studentName}! I'm tracking your **${subjects.length} enrolled subjects** in Semester ${currentSemester} against your target graduation goal of **${targetCgpa.toFixed(2)} CGPA**.\n\nYour current highest focus course is **${topSubjectName}**. How can I help you optimize your study plan or internal marks today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: [
            "What should I study today?",
            `What do I need in ${topSubjectName} for an A+?`,
            "How does my attendance look?",
          ],
        },
      ]);
    }
  }, [profile.name, currentSemester, subjects, priorities, targetCgpa]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle URL query parameter prefill
  React.useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      handleSendMessage(q);
    }
  }, [searchParams]);

  const generateAiResponse = (userPrompt: string): { response: string; suggestions: string[] } => {
    const lower = userPrompt.toLowerCase();

    if (subjects.length === 0) {
      if (lower.includes("how do i add") || lower.includes("add")) {
        return {
          response:
            "To add your courses, navigate to the **Academics** tab in the sidebar and click **'+ Add Enrolled Subject'**. You can enter course codes, credit weights, faculty names, and continuous internal assessment marks.",
          suggestions: [
            "What is AcaVise's Target CGPA formula?",
            "How does the Study Priority Engine work?",
          ],
        };
      }

      if (lower.includes("cgpa") || lower.includes("formula") || lower.includes("target")) {
        return {
          response: `AcaVise calculates your required semester SGPA using the degree progression formula:\n\n**Required SGPA = [ (Target CGPA × Total Degree Credits) - (Current CGPA × Completed Credits) ] / Remaining Credits**\n\nYour current Target CGPA is set to **${targetCgpa.toFixed(2)}**. Once you record your semester grades, live feasibility projections will appear in the Target Calculator.`,
          suggestions: [
            "How do I add my subjects?",
            "How does the Study Priority Engine work?",
          ],
        };
      }

      return {
        response: `You haven't added any subjects for Semester ${currentSemester} yet. Please add your subjects in the **Academics** section so I can analyze your specific course weights and exam schedules.`,
        suggestions: [
          "How do I add my subjects?",
          "What is AcaVise's Target CGPA formula?",
        ],
      };
    }

    // When user has enrolled subjects
    const topPriority = priorities[0];
    const topSubject = subjects.find((s) => s.id === topPriority?.id.replace("pri_", "")) || subjects[0];

    if (lower.includes("today") || lower.includes("tonight") || lower.includes("focus") || lower.includes("study")) {
      return {
        response: `Based on your **Study Priority Engine**, your top priority is **${topSubject.name} (${topSubject.code || "Core"}, ${topSubject.credits} Credits)**.\n\nYour recorded internal score is **${topSubject.currentScore > 0 ? `${topSubject.currentScore}%` : "pending"}** against your target grade of **Grade ${topSubject.targetGrade || "A+"}**. I recommend dedicating a focused 60-90 minute revision session to review recent lecture notes and continuous internal assessment problems.`,
        suggestions: [
          `What do I need in ${topSubject.name} to score an A+?`,
          "How does my attendance look?",
          "Which subject is my second priority?",
        ],
      };
    }

    if (lower.includes("a+") || lower.includes("grade") || lower.includes("score") || lower.includes("exam")) {
      return {
        response: `For **${topSubject.name} (${topSubject.code})**, to achieve your target **Grade ${topSubject.targetGrade || "A+"}**, you should aim for **≥ 80-85% in your End-Semester Examination**. Ensure all continuous internal assignments and lab submissions are completed to maximize your internal score baseline.`,
        suggestions: [
          "What should I study today?",
          "How does my attendance look?",
          "What is my target CGPA?",
        ],
      };
    }

    if (lower.includes("cgpa") || lower.includes("sgpa") || lower.includes("target")) {
      return {
        response: `Your target graduation CGPA is set to **${targetCgpa.toFixed(2)}**.\n\nWith ${subjects.length} active courses enrolled in Semester ${currentSemester}, maintaining an average score above 80% will keep your academic trajectory well within reach of your goal.`,
        suggestions: [
          "What should I study today?",
          "How does my attendance look?",
          `Show my progress in ${topSubject.name}`,
        ],
      };
    }

    if (lower.includes("attendance")) {
      return {
        response: `Your active semester average attendance is **${metrics.attendancePercentage > 0 ? `${metrics.attendancePercentage}%` : "recorded per course"}** across your enrolled subjects. The university minimum mandatory cutoff is **75%**. Ensure you maintain consistent attendance across all lectures.`,
        suggestions: [
          "What should I study today?",
          `Show details for ${topSubject.name}`,
          "What is my Target CGPA?",
        ],
      };
    }

    return {
      response: `I've analyzed your question regarding "${userPrompt}" against your Semester ${currentSemester} (${profile.branch || "Engineering"}) enrolled records. In **Step 10**, this assistant will connect to OpenAI's GPT-4o API with real-time syllabus parsing, automated question answering, and predictive grade curving.`,
      suggestions: [
        "What should I study today?",
        `What do I need in ${topSubject.name} for an A+?`,
        "How does my attendance look?",
      ],
    };
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: AiChatMessage = {
      id: `msg_${Date.now()}`,
      sender: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const { response, suggestions } = generateAiResponse(textToSend);
      const botMsg: AiChatMessage = {
        id: `bot_${Date.now() + 1}`,
        sender: "assistant",
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-5xl mx-auto space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              AI Academic Assistant
            </h2>
            <Badge variant="default" size="sm">
              Context-Aware Prototype
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-neutral-400">
            Guidance formulated from your academic profile, internal marks, and target graduation CGPA.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700">
          <Sparkles className="h-3.5 w-3.5 text-slate-600 dark:text-neutral-400 animate-pulse" />
          <span>{profile.name || "Student"} (Sem {currentSemester} Active)</span>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col min-h-0 border-slate-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isAssistant = msg.sender === "assistant";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${
                  isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isAssistant
                      ? "bg-slate-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs"
                      : "bg-slate-800 text-white dark:bg-neutral-200 dark:text-neutral-900"
                  }`}
                >
                  {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isAssistant
                        ? "bg-slate-50 border border-slate-200/80 text-slate-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100"
                        : "bg-slate-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>

                  {/* Suggestions Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(s)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                        >
                          <Lightbulb className="h-3 w-3 text-amber-500" />
                          <span>{s}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 max-w-2xl mr-auto animate-pulse">
              <div className="h-8 w-8 rounded-lg bg-slate-900 text-white dark:bg-neutral-100 dark:text-neutral-900 flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                AcaVise is formulating guidance...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about your study priorities, target marks, or exam strategies..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 h-10 px-4 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            />
            <Button type="submit" size="md" className="gap-1.5 shrink-0 px-4">
              <span>Send</span>
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-2 text-[11px] text-slate-400 text-center">
            UI Prototype Simulation: Contextual answers are generated locally. Full OpenAI GPT-4o integration will be wired in Step 10.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function AiAssistantPage() {
  return (
    <AppShell>
      <React.Suspense fallback={<div className="p-8 text-center text-slate-400">Loading AI Assistant...</div>}>
        <AiChatComponent />
      </React.Suspense>
    </AppShell>
  );
}
