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
    },
    {
      icon: Calculator,
      title: "Target Calculator",
      description: "Know exactly what you need to achieve your academic goals.",
      highlight: "Reverse calculation of internal and final exam marks needed for target grades.",
    },
    {
      icon: Target,
      title: "Study Intelligence",
      description: "Find out which subjects deserve your attention first.",
      highlight: "Algorithmic ranking balancing credit weight, syllabus volume, and grade risk.",
    },
    {
      icon: CalendarDays,
      title: "Smart Planner",
      description: "Turn exams and goals into an actionable study plan.",
      highlight: "Dynamic daily schedule mapped directly to upcoming vivas and midterm exams.",
    },
    {
      icon: BotMessageSquare,
      title: "AI Academic Assistant",
      description: "Get personalized academic guidance based on your academic context.",
      highlight: "Contextual advice tuned to your university curriculum, weak areas, and deadlines.",
    },
  ];

  const questions = [
    {
      q: "Where do I currently stand academically?",
      a: "Comprehensive SGPA/CGPA tracking with continuous assessment analytics.",
      color: "border-blue-200 bg-blue-50/50 text-blue-900",
    },
    {
      q: "What do I need to achieve my target?",
      a: "Precise score requirements computed backwards from your target graduation GPA.",
      color: "border-indigo-200 bg-indigo-50/50 text-indigo-900",
    },
    {
      q: "What should I focus on next?",
      a: "Weighted prioritization engine identifying high-impact subjects requiring intervention.",
      color: "border-amber-200 bg-amber-50/50 text-amber-900",
    },
    {
      q: "What should I do today?",
      a: "Actionable daily study blocks designed to hit exam targets with zero cognitive overload.",
      color: "border-emerald-200 bg-emerald-50/50 text-emerald-900",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-xs">
              <BookOpenCheck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                AcaVise
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider">
                ACADEMIC INTELLIGENCE
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#philosophy" className="hover:text-slate-900 transition-colors">Philosophy</a>
            <Link href="/dashboard" className="hover:text-slate-900 transition-colors">Live Preview</Link>
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Academic Visibility & Intelligence Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Know where you stand. <br className="hidden sm:inline" />
            <span className="text-blue-600">Know what you need.</span> <br className="hidden sm:inline" />
            Know what to do next.
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Your academic data, goals and progress — organized into insights that help you make better study decisions.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 shadow-md shadow-blue-500/15">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 bg-white hover:bg-slate-50">
                Explore Dashboard
              </Button>
            </Link>
          </div>

          {/* Quick Pillars */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            {questions.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${item.color} shadow-xs transition-all hover:-translate-y-0.5`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Question #{idx + 1}
                </div>
                <h3 className="text-sm font-bold leading-snug">{item.q}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Comprehensive Intelligence
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Serious College Academics
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-500">
              Transform scattered marks sheets, syllabus PDFs, and grading formulas into clear, actionable daily roadmaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-6 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs mb-4 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{feat.title}</h4>
                    <p className="mt-1.5 text-sm font-medium text-slate-700">{feat.description}</p>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">{feat.highlight}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Feature module</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}

            {/* Target Calculator Highlight Card */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 flex flex-col justify-between shadow-lg shadow-blue-500/10">
              <div>
                <div className="h-11 w-11 rounded-xl bg-white/10 text-white flex items-center justify-center backdrop-blur-xs mb-4">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-bold">Reverse Score Engine</h4>
                <p className="mt-1.5 text-sm text-blue-100 font-medium">
                  Never guess what exam score is required for your target CGPA.
                </p>
                <p className="mt-2 text-xs text-blue-200 leading-relaxed">
                  AcaVise runs precision calculations considering your university&apos;s credit weights, internal benchmarks, and grading curves.
                </p>
              </div>

              <Link href="/dashboard" className="mt-5">
                <Button variant="secondary" size="sm" className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold">
                  Test In Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Target Users: College & Engineering Students</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Stop Guessing Your Academic Future. Build It.
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            College demands balance. AcaVise ensures you invest your revision hours where they provide the maximum CGPA payoff.
          </p>

          <div className="mt-10 p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-left max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-6 w-6 text-blue-600" />
              <h4 className="text-base font-bold text-slate-900">The 4-Step Academic Clarity Loop</h4>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Track effortlessly:</strong> Record internal exams, assignments, and attendance in one place.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Simulate targets:</strong> Set target SGPA/CGPA and see the exact marks needed per subject.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Prioritize rationally:</strong> High-credit, high-risk subjects automatically bubble to the top.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Execute daily:</strong> Get structured study blocks and AI guidance on what to conquer next.</span>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
