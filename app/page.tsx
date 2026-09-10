import Link from "next/link";
import {
  BookOpenCheck,
  LayoutDashboard,
  Calculator,
  Target,
  CalendarDays,
  BotMessageSquare,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Academic Dashboard",
      description: "Understand your academic performance at a glance.",
      highlight: "Real-time SGPA/CGPA, attendance alerts, and continuous evaluation tracking.",
      href: "/dashboard",
    },
    {
      icon: Calculator,
      title: "Target Calculator",
      description: "Know exactly what you need to achieve your academic goals.",
      highlight: "Reverse calculation of internal and final exam marks needed for target grades.",
      href: "/targets",
    },
    {
      icon: Target,
      title: "Study Intelligence",
      description: "Find out which subjects deserve your attention first.",
      highlight: "Algorithmic ranking balancing credit weight, syllabus volume, and grade risk.",
      href: "/priority",
    },
    {
      icon: CalendarDays,
      title: "Smart Planner",
      description: "Turn exams and goals into an actionable study plan.",
      highlight: "Dynamic daily schedule mapped directly to upcoming vivas and midterm exams.",
      href: "/planner",
    },
    {
      icon: BotMessageSquare,
      title: "AI Academic Assistant",
      description: "Get personalized academic guidance based on your academic context.",
      highlight: "Contextual advice tuned to your university curriculum, weak areas, and deadlines.",
      href: "/ai-assistant",
    },
  ];

  const questions = [
    {
      q: "Where do I currently stand academically?",
      a: "Comprehensive SGPA/CGPA tracking with continuous assessment analytics.",
      href: "/dashboard",
    },
    {
      q: "What do I need to achieve my target?",
      a: "Precise score requirements computed backwards from your target graduation GPA.",
      href: "/targets",
    },
    {
      q: "What should I focus on next?",
      a: "Weighted prioritization engine identifying high-impact subjects requiring intervention.",
      href: "/priority",
    },
    {
      q: "What should I do today?",
      a: "Actionable daily study blocks designed to hit exam targets with zero cognitive overload.",
      href: "/planner",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col justify-between selection:bg-slate-900 selection:text-white dark:bg-neutral-950 dark:text-neutral-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-bold shadow-xs dark:bg-neutral-100 dark:text-neutral-900">
              <BookOpenCheck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                AcaVise
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider">
                ACADEMIC INTELLIGENCE
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-neutral-400">
            <a href="#features" className="hover:text-slate-900 dark:hover:text-neutral-100 transition-colors">Features</a>
            <a href="#philosophy" className="hover:text-slate-900 dark:hover:text-neutral-100 transition-colors">Philosophy</a>
            <Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-neutral-100 transition-colors">Live Dashboard</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium mb-6 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
            <Sparkles className="h-3.5 w-3.5 text-slate-500" />
            <span>Academic Visibility & Intelligence Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Know where you stand. <br className="hidden sm:inline" />
            Know what you need. <br className="hidden sm:inline" />
            Know what to do next.
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Your academic data, goals and progress — organized into insights that help you make better study decisions.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 shadow-sm">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 bg-white hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                Explore Dashboard
              </Button>
            </Link>
          </div>

          {/* Quick Pillars (Interactive links) */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto text-left">
            {questions.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="p-4 rounded-xl border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs transition-all hover:-translate-y-0.5 group block dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800/60"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  <span>Question #{idx + 1}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-sm font-semibold leading-snug">{item.q}</h3>
                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">{item.a}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-white border-y border-slate-200/80 dark:bg-neutral-900 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Comprehensive Intelligence
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-neutral-100 tracking-tight">
              Engineered for Serious College Academics
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-neutral-400">
              Transform scattered marks sheets, syllabus PDFs, and grading formulas into clear, actionable daily roadmaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <Link
                  key={index}
                  href={feat.href}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-6 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between group shadow-2xs dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:bg-neutral-800/60"
                >
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs mb-4 dark:bg-neutral-100 dark:text-neutral-900 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-neutral-100">{feat.title}</h4>
                    <p className="mt-1.5 text-sm font-medium text-slate-700 dark:text-neutral-300">{feat.description}</p>
                    <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">{feat.highlight}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-neutral-800 flex items-center text-xs font-medium text-slate-700 hover:text-slate-950 dark:text-neutral-300 dark:hover:text-white">
                    <span>Explore module</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}

            {/* Target Calculator Highlight Card */}
            <Link
              href="/targets"
              className="rounded-2xl border border-slate-800 bg-slate-900 text-white p-6 flex flex-col justify-between shadow-md transition-all group dark:border-neutral-700 dark:bg-neutral-800"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-white/10 text-white flex items-center justify-center backdrop-blur-xs mb-4 group-hover:scale-105 transition-transform">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold">Reverse Score Engine</h4>
                <p className="mt-1.5 text-sm text-slate-300 font-medium">
                  Never guess what exam score is required for your target CGPA.
                </p>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  AcaVise runs precision calculations considering your university&apos;s credit weights, internal benchmarks, and grading curves.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white">
                <span>Simulate Targets</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-16 bg-slate-50 dark:bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-4 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
            <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
            <span>Target Users: College & Engineering Students</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 tracking-tight">
            Stop Guessing Your Academic Future. Build It.
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
            College demands balance. AcaVise ensures you invest your revision hours where they provide the maximum CGPA payoff.
          </p>

          <div className="mt-10 p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-left max-w-3xl mx-auto dark:bg-neutral-900 dark:border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-5 w-5 text-slate-700 dark:text-neutral-300" />
              <h4 className="text-base font-bold text-slate-900 dark:text-neutral-100">The 4-Step Academic Clarity Loop</h4>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-neutral-400">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong className="text-slate-800 dark:text-neutral-200">Track effortlessly:</strong> Record internal exams, assignments, and attendance in one place.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong className="text-slate-800 dark:text-neutral-200">Simulate targets:</strong> Set target SGPA/CGPA and see the exact marks needed per subject.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong className="text-slate-800 dark:text-neutral-200">Prioritize rationally:</strong> High-credit, high-risk subjects automatically bubble to the top.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong className="text-slate-800 dark:text-neutral-200">Execute daily:</strong> Get structured study blocks and guidance on what to conquer next.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-900 font-bold">
                <BookOpenCheck className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">AcaVise</span>
            </div>
            <p className="text-xs text-slate-400 text-center md:text-left">
              Academic Visibility & Intelligence Platform • <em>&quot;Know where you stand. Know what you need. Know what to do next.&quot;</em>
            </p>
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button size="sm" variant="secondary">
                  Open Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} AcaVise Platform. Built for academic excellence.</p>
            <div className="flex gap-6">
              <Link href="/dashboard" className="hover:text-slate-300">Dashboard</Link>
              <Link href="/academics" className="hover:text-slate-300">Academics</Link>
              <Link href="/targets" className="hover:text-slate-300">Targets</Link>
              <Link href="/priority" className="hover:text-slate-300">Priorities</Link>
              <Link href="/planner" className="hover:text-slate-300">Planner</Link>
              <Link href="/ai-assistant" className="hover:text-slate-300">AI Assistant</Link>
              <Link href="/settings" className="hover:text-slate-300">Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
