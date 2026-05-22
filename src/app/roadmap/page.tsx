"use client";

import Link from "next/link";
import { CheckCircle2, Circle, MapPin } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCourseById } from "@/data/courses";
import { getWeekProgressPercentage, getWeekStatus } from "@/lib/progress";
import { useLearningStore } from "@/hooks/useLearningStore";

export default function RoadmapPage() {
  const checklist = useLearningStore((state) => state.checklist);
  const currentCourseId = useLearningStore((state) => state.currentCourseId);
  const course = getCourseById(currentCourseId);
  const weeks = course.weeks;
  return (
    <AppLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-8">
          <Badge>Developer Journey Map</Badge>
          <h2 className="mt-3 text-3xl font-bold">{course.shortTitle}</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">{course.description}</p>
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-border md:block" />
          <div className="space-y-4">
            {weeks.map((week) => {
              const value = getWeekProgressPercentage(week, checklist);
              const status = getWeekStatus(value);
              return (
                <Card key={week.id} className="relative overflow-hidden">
                  <CardContent className="grid gap-4 p-5 md:grid-cols-[44px_1fr_auto] md:items-center">
                    <div className="z-10 grid h-10 w-10 place-items-center rounded-full bg-background ring-1 ring-border">
                      {status === "Completed" ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : value > 0 ? <MapPin className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-muted">Week {week.weekNumber}</Badge>
                        <Badge className="border-cyan-200 bg-cyan-50 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200">{week.zone}</Badge>
                        <span className="text-sm text-muted-foreground">{status}</span>
                      </div>
                      <h3 className="mt-2 text-xl font-semibold">{week.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{week.summary}</p>
                      <div className="mt-3 max-w-xl"><Progress value={value} /></div>
                    </div>
                    <Button asChild variant={value > 0 ? "default" : "outline"}><Link href={`/weeks/${week.id}`} prefetch={false}>{value > 0 ? "Continue" : "Start"}</Link></Button>
                  </CardContent>
                </Card>
              );
            })}
            {!weeks.length ? (
              <Card>
                <CardContent className="p-6 text-sm text-muted-foreground">Bu dersin PDF haftaları eklendiğinde roadmap burada oluşacak.</CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
