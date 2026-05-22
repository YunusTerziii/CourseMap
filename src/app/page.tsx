"use client";

import Link from "next/link";
import { ArrowRight, BookOpenCheck, CheckCircle2, FileLock2, LineChart, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { weeks } from "@/data/weeks";
import { courses } from "@/data/courses";
import { useLearningStore } from "@/hooks/useLearningStore";

export default function LandingPage() {
  const user = useLearningStore((state) => state.user);

  return (
    <main className="course-grid min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <Link href="/" prefetch={false} className="text-lg font-bold">CourseMap</Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <>
              <span className="hidden max-w-48 truncate text-sm text-muted-foreground sm:inline">{user.email}</span>
              <Button asChild variant="outline"><Link href="/dashboard" prefetch={false}>Dashboard</Link></Button>
            </>
          ) : (
            <Button asChild variant="outline"><Link href="/login" prefetch={false}>Login</Link></Button>
          )}
        </div>
      </header>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="mb-5 inline-flex rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground">
            Computer engineering PDFs prepared by the instructor, transformed into guided study.
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-normal sm:text-6xl">
            Turn course PDFs into an interactive learning path.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Study weekly computer engineering materials with guided PDF pages, checklists, progress tracking, and notes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/dashboard" prefetch={false}>Start Learning <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/weeks/week-1" prefetch={false}>View Week 1 Demo</Link></Button>
          </div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="rounded-lg bg-slate-950 p-4 text-white shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active week</p>
                <h2 className="text-xl font-semibold">Week 3 Git Workflow</h2>
              </div>
              <div className="rounded-full bg-emerald-400/20 px-3 py-1 text-sm text-emerald-200">64%</div>
            </div>
            <Progress value={64} />
            <div className="mt-6 grid gap-3">
              {weeks.slice(0, 4).map((week, index) => (
                <div key={week.id} className="flex items-center gap-3 rounded-md bg-white/8 p-3">
                  <CheckCircle2 className={index < 2 ? "h-5 w-5 text-emerald-300" : "h-5 w-5 text-slate-500"} />
                  <div>
                    <p className="text-sm font-medium">Week {week.weekNumber} — {week.title}</p>
                    <p className="text-xs text-slate-400">{week.zone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Course materials are prepared by the instructor/developer", FileLock2],
            ["Each PDF becomes a guided weekly lesson", BookOpenCheck],
            ["Students complete topics with checklists", CheckCircle2],
            ["Progress is saved automatically", LineChart]
          ].map(([text, Icon], index) => (
            <Card key={String(text)} className="glass">
              <CardContent className="p-5">
                <Icon className="mb-4 h-6 w-6 text-primary" />
                <div className="text-sm font-semibold">0{index + 1}</div>
                <p className="mt-2 text-sm text-muted-foreground">{String(text)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-2">
        <Card className="glass"><CardContent className="p-6"><Map className="mb-4 h-6 w-6 text-primary" /><h2 className="text-2xl font-bold">Course library preview</h2><div className="mt-5 space-y-3">{courses.map((course) => <div key={course.id} className="flex justify-between rounded-md bg-background/70 p-3 text-sm"><span>{course.shortTitle}</span><span className="text-muted-foreground">{course.weeks.length ? `${course.weeks.length} weeks` : "coming soon"}</span></div>)}</div></CardContent></Card>
        <Card className="glass"><CardContent className="p-6"><LineChart className="mb-4 h-6 w-6 text-primary" /><h2 className="text-2xl font-bold">Features</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{["PDF-based static course content", "Checklist persistence", "Week notes", "Page favorites", "Progress analytics", "Dark mode", "Responsive dashboard", "Original PDF links"].map((item) => <div key={item} className="rounded-md bg-background/70 p-3 text-sm">{item}</div>)}</div></CardContent></Card>
      </section>
      <footer className="border-t px-5 py-8 text-center text-sm text-muted-foreground">CourseMap — built for computer engineering students.</footer>
    </main>
  );
}
