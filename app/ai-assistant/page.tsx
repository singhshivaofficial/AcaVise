"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Bot, User, Lightbulb } from "lucide-react";
import { MOCK_AI_CONVERSATION } from "@/lib/mock-data";
import { AiChatMessage } from "@/types";

function AiChatComponent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = React.useState<AiChatMessage[]>(MOCK_AI_CONVERSATION);
  const [inputText, setInputText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

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

  const generateMockAiResponse = (userPrompt: string): { response: string; suggestions: string[] } => {
    const lower = userPrompt.toLowerCase();

    if (lower.includes("today") || lower.includes("tonight") || lower.includes("focus")) {
      return {
        response:
          "Based on your **Study Priority Engine**, your top priority tonight is **CS501: Analysis of Algorithms (4 Credits)**. You have Midterm Assessment 2 tomorrow at 10:00 AM, and your current performance is 68% against your target of Grade A+. I recommend dedicating a **90-minute block on Dynamic Programming recurrences** before 8:00 PM.",
        suggestions: [
          "Show me sample algorithm exam questions",
          "What do I need in Algorithms to score an A+?",
          "How does my attendance look?",
        ],
      };
    }

    if (lower.includes("a+") || lower.includes("algorithm") || lower.includes("cs501")) {
      return {
        response:
          "To score an **A+ in CS501 (Analysis of Algorithms)** with your current 68% internal mark, you need a minimum of **84/100 (≥ 84%) on your End-Semester Examination**. Focus on Unit 3 (Dynamic Programming & Greedy algorithms) and Unit 4 (Graph algorithms), as they represent 45% of total exam weightage.",
        suggestions: [
          "What should I study today?",
          "Simulate a 9.25 SGPA target",
          "Which subject is my second priority?",
        ],
      };
    }

    if (lower.includes("cgpa") || lower.includes("sgpa") || lower.includes("target")) {
      return {
        response:
          "To bridge your current **8.34 CGPA** to your **8.80 Target CGPA** across the remaining 24 credits (Semesters 5 & 6), you need an average SGPA of **≥ 9.25**. This requires securing at least three 'O' grades (10 points) and two 'A+' grades (9 points) in your core 4-credit courses.",
        suggestions: [
          "Which subjects have the highest credit weight?",
          "What is my weakest subject right now?",
          "Show me today's revision timetable",
        ],
      };
    }

    if (lower.includes("attendance") || lower.includes("bunk")) {
      return {
        response:
          "Your overall semester attendance stands at **86.5%**, well above the mandatory 75% cutoff (+11.5% safety buffer). However, **CS504 (Discrete Structures)** is currently at **76.5%**, meaning missing 2 more classes will breach the critical attendance threshold.",
        suggestions: [
          "How many classes can I afford to miss?",
          "What should I study today?",
          "Show my Discrete Structures score",
        ],
      };
    }

    return {
      response: `I've analyzed your question regarding "${userPrompt}" against your Semester 5 Computer Science records. In **Step 10**, this assistant will connect to OpenAI's GPT-4o API with live access to your syllabus breakdown, test scores, and grade curves to deliver deep customized guidance.`,
      suggestions: [
        "What should I study today?",
        "What do I need to score an A+ in Algorithms?",
        "How can I improve my CGPA by 0.3?",
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
      const { response, suggestions } = generateMockAiResponse(textToSend);
      const botMsg: AiChatMessage = {
        id: `bot_${Date.now() + 1}`,
        sender: "assistant",
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
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
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Guidance formulated from your academic profile, internal marks, and target graduation CGPA.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
          <span>Alex Rivera (Sem 5 CSE Context Active)</span>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col min-h-0 border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
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
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
                  }`}
                >
                  {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isAssistant
                        ? "bg-slate-50 border border-slate-200/80 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                        : "bg-blue-600 text-white shadow-xs"
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
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
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
              <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                AcaVise is formulating guidance...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about your study priorities, target marks, or exam strategies..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 h-10 px-4 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
