"use client";

import Link from "next/link";
import { ArrowRight, Flame, GraduationCap, ListChecks } from "lucide-react";
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
        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <Card className="glass">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Welcome back</p>
              <h2 className="mt-1 text-3xl font-bold">{user?.name || "Student"}</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">Continue your {activeCourse.code} roadmap from instructor-provided PDF materials.</p>
              <Button asChild className="mt-6" disabled={!activeWeek}><Link href={activeWeekHref} prefetch={false}>{activeWeek ? "Continue where you left off" : "PDFs will be added soon"} <ArrowRight className="h-4 w-4" /></Link></Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-5 p-4 sm:p-6">
              <ProgressRing value={course.percentage} />
              <div>
                <p className="text-sm text-muted-foreground">{activeCourse.code} course progress</p>
                <p className="text-2xl font-bold">{course.completed} / {course.total}</p>
                <p className="text-sm text-muted-foreground">PDF pages completed</p>
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="grid gap-4 md:grid-cols-3">
          <Stat title="Completed weeks" value={completedWeeks} icon={<GraduationCap className="h-5 w-5" />} />
          <Stat title="Total completed pages" value={course.completed} icon={<ListChecks className="h-5 w-5" />} />
          <Stat title="Study streak" value="3 days" icon={<Flame className="h-5 w-5" />} />
        </section>
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Courses</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {courses.map((courseItem) => (
                <button
                  key={courseItem.id}
                  onClick={() => setCurrentCourseId(courseItem.id)}
                  className={`rounded-md border p-4 text-left transition ${courseItem.id === activeCourse.id ? "border-primary bg-primary/10" : "hover:bg-muted"}`}
                >
                  <p className="text-sm font-semibold">{courseItem.code}</p>
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

function Stat({ title, value, icon }: { title: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">{title}</CardTitle><span className="text-primary">{icon}</span></CardHeader><CardContent><div className="text-2xl font-bold">{value}</div></CardContent></Card>;
}
