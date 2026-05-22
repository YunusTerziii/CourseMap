"use client";

import { Award, BookOpenCheck, FileText, Flame, UserCircle2 } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "@/components/progress-ring";
import { getCourseById } from "@/data/courses";
import { getCourseProgress, getWeekProgressPercentage } from "@/lib/progress";
import { useLearningStore } from "@/hooks/useLearningStore";

const badges = ["First Topic Completed", "First Week Completed", "Internet Basics Learner", "CLI Beginner", "Roadmap Explorer", "50% Course Completed", "Course Finisher", "7-Day Study Streak"];

export default function ProfilePage() {
  const user = useLearningStore((state) => state.user);
  const checklist = useLearningStore((state) => state.checklist);
  const notes = useLearningStore((state) => state.notes);
  const favoritePages = useLearningStore((state) => state.favoritePages);
  const currentCourseId = useLearningStore((state) => state.currentCourseId);
  const activeCourse = getCourseById(currentCourseId);
  const weeks = activeCourse.weeks;
  const course = getCourseProgress(weeks, checklist);
  const completedWeeks = weeks.filter((week) => getWeekProgressPercentage(week, checklist) === 100).length;
  const courseFavoritePages = favoritePages.filter((page) =>
    weeks.some((week) => week.id === page.weekId)
  ).length;
  return (
    <AppLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <Card className="glass"><CardContent className="flex flex-wrap items-center gap-6 p-6"><UserCircle2 className="h-20 w-20 text-primary" /><div><h2 className="text-3xl font-bold">{user?.name || "CE Student"}</h2><p className="text-muted-foreground">{user?.email}</p><Badge className="mt-3">{activeCourse.shortTitle}</Badge></div><div className="ml-auto"><ProgressRing value={course.percentage} /></div></CardContent></Card>
        <div className="grid gap-4 md:grid-cols-4">
          <Stat title="Completed weeks" value={completedWeeks} icon={<BookOpenCheck className="h-5 w-5" />} />
          <Stat title="Study streak" value="3 days" icon={<Flame className="h-5 w-5" />} />
          <Stat title="Completed pages" value={course.completed} icon={<Award className="h-5 w-5" />} />
          <Stat title="Favorite pages" value={courseFavoritePages} icon={<FileText className="h-5 w-5" />} />
        </div>
        <Card><CardHeader><CardTitle>Achievements</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{badges.map((badge, index) => <div key={badge} className={`rounded-md border p-4 ${index < Math.max(1, Math.floor(course.percentage / 20)) ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" : "text-muted-foreground"}`}>{badge}</div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Notes count</CardTitle></CardHeader><CardContent>{Object.keys(notes).length} week note sets saved.</CardContent></Card>
      </div>
    </AppLayout>
  );
}

function Stat({ title, value, icon }: { title: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">{title}</CardTitle><span className="text-primary">{icon}</span></CardHeader><CardContent><div className="text-2xl font-bold">{value}</div></CardContent></Card>;
}
