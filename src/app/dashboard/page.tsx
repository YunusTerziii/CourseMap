"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Flame, GraduationCap, Layers3, ListChecks } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { WeekCard } from "@/components/week-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "@/components/progress-ring";
import { courses, getCourseById } from "@/data/courses";
import { getCourseProgress, getWeekProgressPercentage } from "@/lib/progress";
import { useLearningStore } from "@/hooks/useLearningStore";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const checklist = useLearningStore((state) => state.checklist);
  const user = useLearningStore((state) => state.user);
  const lastReadPages = useLearningStore((state) => state.lastReadPages ?? {});
  const currentCourseId = useLearningStore((state) => state.currentCourseId);
  const setCurrentCourseId = useLearningStore((state) => state.setCurrentCourseId);
  const activeCourse = getCourseById(currentCourseId);
  const weeks = activeCourse.weeks;
  const course = getCourseProgress(weeks, checklist);
  const activeWeek = weeks.find((week) => getWeekProgressPercentage(week, checklist) < 100) || weeks[0];
  const activeWeekPage = activeWeek ? lastReadPages[activeWeek.id] : undefined;
  const activeWeekHref = activeWeek ? `/weeks/${activeWeek.id}${activeWeekPage ? `?page=${activeWeekPage}` : ""}` : "/dashboard";
  const completedWeeks = weeks.filter((week) => getWeekProgressPercentage(week, checklist) === 100).length;
  return (
    <AppLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <section className="lg:hidden">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Course</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {courses.map((courseItem) => (
              <button
                key={courseItem.id}
                onClick={() => setCurrentCourseId(courseItem.id)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-2 text-left text-xs font-semibold transition",
                  courseItem.id === activeCourse.id ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
                )}
              >
                {courseItem.code}
              </button>
            ))}
          </div>
        </section>
        <section className="grid gap-4 lg:grid-cols-[1fr_340px]">
          <Card className="relative overflow-hidden border-primary/15 bg-gradient-to-br from-card via-card to-primary/10 shadow-[0_20px_60px_rgba(2,6,23,0.12)]">
            <div className="absolute right-8 top-8 hidden h-32 w-32 rounded-full border border-primary/20 bg-primary/10 blur-2xl sm:block" />
            <CardContent className="relative p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                Active course: {activeCourse.shortTitle}
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {user?.name || "Student"}</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">Pick up your PDF-based learning flow exactly where you left it. Completed pages, favorites, and active time stay attached to your account.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild disabled={!activeWeek}>
                  <Link href={activeWeekHref} prefetch={false}>{activeWeek ? "Continue where you left off" : "PDFs will be added soon"} <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline"><Link href="/roadmap" prefetch={false}>Open roadmap</Link></Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-primary/10">
            <CardContent className="flex h-full items-center gap-5 p-4 sm:p-6">
              <ProgressRing value={course.percentage} />
              <div>
                <p className="text-sm text-muted-foreground">{activeCourse.code} course progress</p>
                <p className="text-2xl font-bold">{course.completed} / {course.total}</p>
                <p className="text-sm text-muted-foreground">PDF pages completed</p>
                <div className="mt-4 rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                  {completedWeeks} of {weeks.length} weeks completed
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="grid gap-4 md:grid-cols-3">
          <Stat title="Completed weeks" value={`${completedWeeks}/${weeks.length}`} icon={<GraduationCap className="h-5 w-5" />} tone="emerald" />
          <Stat title="Total completed pages" value={course.completed} icon={<ListChecks className="h-5 w-5" />} tone="indigo" />
          <Stat title="Study streak" value="3 days" icon={<Flame className="h-5 w-5" />} />
        </section>
        <section>
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Layers3 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Courses</h2>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {courses.map((courseItem) => (
                <button
                  key={courseItem.id}
                  onClick={() => setCurrentCourseId(courseItem.id)}
                  className={cn(
                    "group rounded-lg border bg-card p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted/40 hover:shadow-md",
                    courseItem.id === activeCourse.id && "border-primary/60 bg-primary/10 shadow-[0_12px_35px_rgba(129,140,248,0.16)]"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{courseItem.code}</p>
                    {courseItem.id === activeCourse.id ? <CheckCircle2 className="h-4 w-4 text-primary" /> : null}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{courseItem.title}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{courseItem.weeks.length ? `${courseItem.weeks.length} weeks ready` : "PDFs waiting"}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">{activeCourse.code} week cards</h2>
            <Button asChild variant="outline"><Link href="/roadmap" prefetch={false}>Open roadmap</Link></Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {weeks.map((week) => <WeekCard key={week.id} week={week} />)}
            {!weeks.length ? <Card><CardContent className="p-6 text-sm text-muted-foreground">Bu dersin PDF materyalleri eklendiğinde haftalar burada görünecek.</CardContent></Card> : null}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function Stat({ title, value, icon, tone = "primary" }: { title: string; value: React.ReactNode; icon: React.ReactNode; tone?: "primary" | "emerald" | "indigo" }) {
  const toneClass = tone === "emerald" ? "bg-emerald-500/10 text-emerald-500" : tone === "indigo" ? "bg-indigo-500/10 text-indigo-400" : "bg-primary/10 text-primary";
  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <span className={cn("grid h-9 w-9 place-items-center rounded-lg", toneClass)}>{icon}</span>
      </CardHeader>
      <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
    </Card>
  );
}
