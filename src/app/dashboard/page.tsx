"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Flame, GraduationCap, Layers3, ListChecks, Target } from "lucide-react";
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
  const nextSection = activeWeek?.sections.find((section) =>
    section.checklist.some(
      (item) =>
        !checklist.some(
          (entry) =>
            entry.weekId === activeWeek.id &&
            entry.sectionId === section.id &&
            entry.checklistItemId === item.id &&
            entry.isCompleted
        )
    )
  );
  const courseTone = getCourseTone(activeCourse.id);

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

        <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <Card className="relative overflow-hidden border-primary/15 bg-card shadow-[0_20px_60px_rgba(2,6,23,0.10)]">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#14b8a6,#38bdf8,#818cf8,#f59e0b)]" />
            <CardContent className="relative p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  {activeCourse.shortTitle}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <Clock3 className="h-3.5 w-3.5 text-amber-500" />
                  Page memory on
                </div>
              </div>

              <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {user?.name || "Student"}</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Your next PDF, current page, and course momentum are gathered here so the first click is obvious.
              </p>

              <div className="mt-6 rounded-lg border bg-muted/25 p-4">
                <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <span>Week map</span>
                  <span>{completedWeeks}/{weeks.length} complete</span>
                </div>
                <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.max(weeks.length, 1)}, minmax(0, 1fr))` }}>
                  {weeks.map((week) => {
                    const value = getWeekProgressPercentage(week, checklist);
                    return (
                      <Link
                        key={week.id}
                        href={`/weeks/${week.id}${lastReadPages[week.id] ? `?page=${lastReadPages[week.id]}` : ""}`}
                        prefetch={false}
                        title={`Week ${week.weekNumber}: ${value}%`}
                        className={cn(
                          "h-2.5 rounded-full transition hover:-translate-y-0.5",
                          value === 100 ? "bg-emerald-500" : value > 0 ? "bg-sky-500" : "bg-border"
                        )}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild disabled={!activeWeek}>
                  <Link href={activeWeekHref} prefetch={false}>
                    {activeWeek ? "Continue studying" : "PDFs will be added soon"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline"><Link href="/roadmap" prefetch={false}>Open roadmap</Link></Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-primary/10 bg-card">
            <CardContent className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">{activeCourse.code} progress</p>
                  <p className="mt-1 text-3xl font-bold">{course.percentage}%</p>
                </div>
                <ProgressRing value={course.percentage} size={88} />
              </div>

              <div className="rounded-lg border bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Target className={cn("h-4 w-4", courseTone.text)} />
                  Today&apos;s focus
                </div>
                <p className="mt-3 text-base font-bold">{activeWeek ? `Week ${activeWeek.weekNumber}: ${activeWeek.title}` : "No active week"}</p>
                <p className="mt-1 text-sm text-muted-foreground">{nextSection?.title || "Review completed material"}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-md bg-background px-3 py-2">
                    <span className="block text-muted-foreground">Resume page</span>
                    <span className="mt-1 block font-bold">{activeWeekPage || 1}</span>
                  </div>
                  <div className="rounded-md bg-background px-3 py-2">
                    <span className="block text-muted-foreground">Completed</span>
                    <span className="mt-1 block font-bold">{course.completed}/{course.total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Stat title="Completed weeks" value={`${completedWeeks}/${weeks.length}`} icon={<GraduationCap className="h-5 w-5" />} tone="emerald" />
          <Stat title="Completed pages" value={course.completed} icon={<ListChecks className="h-5 w-5" />} tone="sky" />
          <Stat title="Study streak" value="3 days" icon={<Flame className="h-5 w-5" />} tone="amber" />
        </section>

        <section>
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Layers3 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Courses</h2>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {courses.map((courseItem) => {
                const itemTone = getCourseTone(courseItem.id);
                const itemProgress = getCourseProgress(courseItem.weeks, checklist);
                return (
                  <button
                    key={courseItem.id}
                    onClick={() => setCurrentCourseId(courseItem.id)}
                    className={cn(
                      "group rounded-lg border bg-card p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted/40 hover:shadow-md",
                      courseItem.id === activeCourse.id && "border-foreground/20 bg-muted/45 shadow-[0_12px_35px_rgba(2,6,23,0.10)]"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={cn("grid h-9 w-9 place-items-center rounded-lg text-xs font-bold text-white", itemTone.bg)}>
                        {courseItem.code.replace("CE", "")}
                      </span>
                      {courseItem.id === activeCourse.id ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : null}
                    </div>
                    <p className="mt-3 text-sm font-semibold">{courseItem.code}</p>
                    <p className="mt-1 min-h-10 text-sm text-muted-foreground">{courseItem.title}</p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className={cn("h-full rounded-full", itemTone.bg)} style={{ width: `${itemProgress.percentage}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{courseItem.weeks.length ? `${courseItem.weeks.length} weeks ready` : "PDFs waiting"}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">{activeCourse.code} week cards</h2>
            <Button asChild variant="outline"><Link href="/roadmap" prefetch={false}>Open roadmap</Link></Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {weeks.map((week) => <WeekCard key={week.id} week={week} />)}
            {!weeks.length ? <Card><CardContent className="p-6 text-sm text-muted-foreground">Bu dersin PDF materyalleri eklendiginde haftalar burada gorunecek.</CardContent></Card> : null}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function Stat({
  title,
  value,
  icon,
  tone = "primary"
}: {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  tone?: "primary" | "emerald" | "sky" | "amber";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-500/10 text-emerald-500"
      : tone === "sky"
        ? "bg-sky-500/10 text-sky-500"
        : tone === "amber"
          ? "bg-amber-500/10 text-amber-500"
          : "bg-primary/10 text-primary";
  return (
    <Card className="overflow-hidden border-l-4 border-l-primary/30 transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <span className={cn("grid h-9 w-9 place-items-center rounded-lg", toneClass)}>{icon}</span>
      </CardHeader>
      <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
    </Card>
  );
}

function getCourseTone(courseId: string) {
  switch (courseId) {
    case "ce100":
      return { bg: "bg-emerald-500", text: "text-emerald-500" };
    case "ce204":
      return { bg: "bg-sky-500", text: "text-sky-500" };
    case "ce205":
      return { bg: "bg-rose-500", text: "text-rose-500" };
    default:
      return { bg: "bg-primary", text: "text-primary" };
  }
}
