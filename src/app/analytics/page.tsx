"use client";

import dynamic from "next/dynamic";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "@/components/progress-ring";
import { getCourseById } from "@/data/courses";
import { getCourseProgress, getWeekProgressPercentage, getCompletedChecklistCount } from "@/lib/progress";
import { useLearningStore } from "@/hooks/useLearningStore";

const WeekProgressChart = dynamic(
  () => import("@/components/analytics/analytics-charts").then((module) => module.WeekProgressChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const StudyActivityChart = dynamic(
  () => import("@/components/analytics/analytics-charts").then((module) => module.StudyActivityChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

export default function AnalyticsPage() {
  const checklist = useLearningStore((state) => state.checklist);
  const currentCourseId = useLearningStore((state) => state.currentCourseId);
  const activeCourse = getCourseById(currentCourseId);
  const weeks = activeCourse.weeks;
  const course = getCourseProgress(weeks, checklist);
  const weekData = weeks.map((week) => ({
    name: `W${week.weekNumber}`,
    progress: getWeekProgressPercentage(week, checklist),
    tasks: getCompletedChecklistCount(week, checklist)
  }));
  return (
    <AppLayout>
      <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-[320px_1fr]">
        <Card><CardHeader><CardTitle>{activeCourse.code} progress</CardTitle></CardHeader><CardContent className="grid place-items-center gap-4"><ProgressRing value={course.percentage} size={150} /><p className="text-center text-sm text-muted-foreground">{course.completed} of {course.total} PDF pages completed</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Week by week progress</CardTitle></CardHeader><CardContent className="h-80"><WeekProgressChart data={weekData} /></CardContent></Card>
        <Card className="xl:col-span-2"><CardHeader><CardTitle>Study activity</CardTitle></CardHeader><CardContent className="h-72"><StudyActivityChart data={weekData} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Strong topics</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{weekData.filter((w) => w.progress >= 70).map((w) => <div key={w.name} className="rounded-md bg-emerald-50 p-3 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">{w.name} looks strong</div>)}{weekData.every((w) => w.progress < 70) && <p className="text-muted-foreground">Complete more checkpoints to reveal strong topics.</p>}</CardContent></Card>
        <Card><CardHeader><CardTitle>Topics needing review</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{weekData.filter((w) => w.progress > 0 && w.progress < 70).map((w) => <div key={w.name} className="rounded-md bg-amber-50 p-3 text-amber-800 dark:bg-amber-950 dark:text-amber-200">{w.name} needs review</div>)}{weekData.every((w) => w.progress === 0 || w.progress >= 70) && <p className="text-muted-foreground">Pages between 1% and 69% progress will appear here.</p>}</CardContent></Card>
      </div>
    </AppLayout>
  );
}

function ChartSkeleton() {
  return <div className="h-full w-full animate-pulse rounded-md bg-muted" />;
}
