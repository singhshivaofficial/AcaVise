# AcaVise — Academic Visibility & Intelligence Platform

> **"Know where you stand. Know what you need. Know what to do next."**

AcaVise is a student-focused academic intelligence platform designed for college and engineering students to eliminate ambiguity around their academic trajectory, target scores, and daily study priorities.

---

## 🎯 Core Product Questions

AcaVise is engineered to help students answer four essential academic questions:

1. **Where do I currently stand academically?** → Comprehensive SGPA & CGPA tracking, continuous internal evaluation metrics, and attendance tracking.
2. **What do I need to achieve my target?** → Reverse calculation engine showing required end-semester marks per course to achieve target GPA.
3. **What should I focus on next?** → Algorithmic prioritization that weighs credit hours, grade risks, and assessment deadlines.
4. **What should I do today?** → Dynamic study blocks and AI-assisted guidance tailored to upcoming exams.

---

## 🚀 Current Status: Step 1 Complete (Foundation & UI Architecture)

* **Phase**: Step 1 of 11 (Project Foundation & UI Architecture)
* **Status**: **Completed & Verified**
* **Database / Backend**: Local typed mock data architecture (Supabase integration scheduled for Step 3)
* **Auth**: UI mock forms ready (Supabase Auth scheduled for Step 2)
* **AI**: UI mock preview ready (OpenAI API integration scheduled for Step 10)

---

## 🛠️ Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4 design system)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Utilities**: `clsx`, `tailwind-merge`
* **Upcoming Services (Phased Integration)**:
  * Supabase (PostgreSQL, Auth, RLS) — *Steps 2 & 3*
  * OpenAI API (Academic counseling assistant) — *Step 10*
  * Vercel (Deployment) — *Step 11*

---

## 📁 Project Structure

```text
AcaVise/
├── app/                      # Next.js App Router routes & layouts
│   ├── (auth)/
│   │   ├── login/            # /login (UI Mockup)
│   │   └── signup/           # /signup (UI Mockup)
│   ├── academics/            # /academics (Semester & Subject manager)
│   ├── ai-assistant/         # /ai-assistant (Context-aware AI Chat UI)
│   ├── dashboard/            # /dashboard (Academic Overview & Intelligence)
│   ├── planner/              # /planner (Daily study planner & timeline)
│   ├── priority/             # /priority (Study Priority Matrix)
│   ├── settings/             # /settings (Academic & App Preferences)
│   ├── targets/              # /targets (Reverse Target Marks Simulator)
│   ├── globals.css           # Design tokens, variables & base styles
│   ├── layout.tsx            # Root HTML & Metadata layout
│   └── page.tsx              # Landing Page & Product Overview
├── components/
│   ├── dashboard/            # Dashboard feature components (StatGrid, Lists, etc.)
│   ├── layout/               # AppShell, Sidebar, TopBar, MobileNav
│   └── ui/                   # Reusable atomic UI primitives (Button, Card, Input, etc.)
├── lib/
│   ├── mock-data.ts          # Centralized typed mock data
│   └── utils.ts              # Styling helpers and formatting utilities
├── types/
│   └── index.ts              # TypeScript interfaces for academic entities
├── public/                   # Static assets
├── package.json              # Scripts and dependencies
└── tsconfig.json             # TypeScript configuration with @/* alias
```

---

## 🗺️ 11-Day Phased Implementation Plan

| Step | Phase Description | Status |
| :--- | :--- | :--- |
| **Step 1** | **Project foundation & UI architecture** | ✅ **Completed** |
| **Step 2** | Authentication (Supabase Auth, session guards, protected routes) | ⏳ Next |
| **Step 3** | Supabase database (PostgreSQL schema, RLS policies, migrations) | ⏳ Planned |
| **Step 4** | Academic & semester management (CRUD for subjects, assessments) | ⏳ Planned |
| **Step 5** | SGPA + CGPA calculation engine (Strict weighted algorithms) | ⏳ Planned |
| **Step 6** | Target marks calculator (Reverse target simulation) | ⏳ Planned |
| **Step 7** | Main academic dashboard (Real dynamic data integration) | ⏳ Planned |
| **Step 8** | Study priority engine (Multi-factor weighting algorithm) | ⏳ Planned |
| **Step 9** | Study planner (Timeline generation & task synchronization) | ⏳ Planned |
| **Step 10** | AI Academic Assistant (OpenAI context-aware agent) | ⏳ Planned |
| **Step 11** | Testing, security audit, UI polish & production deployment | ⏳ Planned |

---

## 💻 Local Setup Instructions

1. **Clone or Navigate to the Workspace**:
   ```bash
   cd AcaVise
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open [http://localhost:3000](http://localhost:3000) to explore the landing page and dashboard.

5. **Run Type-check & Production Build**:
   ```bash
   npm run build
   ```
