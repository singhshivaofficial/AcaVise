"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Bot, User, MessageSquare, Lightbulb, AlertCircle } from "lucide-react";
import { MOCK_AI_CONVERSATION } from "@/lib/mock-data";

export default function AiAssistantPage() {
  const [messages, setMessages] = React.useState(MOCK_AI_CONVERSATION);
  const [inputText, setInputText] = React.useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: `msg_${Date.now()}`,
      sender: "user" as const,
      content: inputText,
      timestamp: "Just now",
    };

    const botMsg = {
      id: `bot_${Date.now() + 1}`,
      sender: "assistant" as const,
      content: `I've analyzed your question regarding "${inputText}". In Step 10, this AI assistant will connect directly to OpenAI API with your full academic context (internal marks, credit weights, syllabus, attendance) to formulate custom study plans and exam strategies.`,
      timestamp: "Just now",
      suggestions: [
        "How can I improve my CGPA by 0.3?",
        "Give me a 3-day revision timetable",
        "Summarize my risk factors",
      ],
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputText("");
  };

  const handleSuggestionClick = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <AppShell>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                AI Academic Assistant
              </h2>
              <Badge variant="default" size="sm">
                Step 10 Preview
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Context-aware guidance based on your academic profile, internal scores, and target CGPA.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Academic Context Loaded (Sem 5)</span>
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
                      <p>{msg.content}</p>
                    </div>

                    {/* Suggestions Chips if provided */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestions.map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSuggestionClick(s)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
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
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
            <form onSubmit={handleSend} className="flex items-center gap-2">
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
              AI Academic Assistant is in UI Preview mode. OpenAI API integration will be implemented in Step 10.
            </p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
