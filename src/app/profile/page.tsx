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
        <Card className="relative overflow-hidden border-primary/15 bg-gradient-to-br from-card via-card to-primary/10 shadow-sm">
          <CardContent className="relative flex flex-wrap items-center gap-6 p-6 sm:p-8">
            <span className="grid h-20 w-20 place-items-center rounded-2xl bg-primary/10 text-primary">
              <UserCircle2 className="h-12 w-12" />
            </span>
            <div>
              <p className="text-sm font-semibold text-primary">Student profile</p>
              <h2 className="mt-1 text-3xl font-bold">{user?.name || "CE Student"}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <Badge className="mt-3">{activeCourse.shortTitle}</Badge>
            </div>
            <div className="ml-auto"><ProgressRing value={course.percentage} /></div>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-4">
          <Stat title="Completed weeks" value={completedWeeks} icon={<BookOpenCheck className="h-5 w-5" />} />
          <Stat title="Study streak" value="3 days" icon={<Flame className="h-5 w-5" />} />
          <Stat title="Completed pages" value={course.completed} icon={<Award className="h-5 w-5" />} />
          <Stat title="Favorite pages" value={courseFavoritePages} icon={<FileText className="h-5 w-5" />} />
        </div>
        <Card>
          <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map((badge, index) => {
              const unlocked = index < Math.max(1, Math.floor(course.percentage / 20));
              return (
                <div key={badge} className={`rounded-lg border p-4 transition ${unlocked ? "border-emerald-500/30 bg-emerald-50 text-emerald-800 shadow-sm dark:bg-emerald-950 dark:text-emerald-200" : "bg-muted/20 text-muted-foreground"}`}>
                  <Award className="mb-3 h-5 w-5" />
                  <p className="font-semibold">{badge}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle>Notes count</CardTitle></CardHeader><CardContent className="text-muted-foreground"><span className="text-2xl font-bold text-foreground">{Object.keys(notes).length}</span> week note sets saved.</CardContent></Card>
      </div>
    </AppLayout>
  );
}

function Stat({ title, value, icon }: { title: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <Card className="transition hover:-translate-y-0.5 hover:shadow-md"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">{title}</CardTitle><span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</span></CardHeader><CardContent><div className="text-2xl font-bold">{value}</div></CardContent></Card>;
}
