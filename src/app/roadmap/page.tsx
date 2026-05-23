"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, MapPin, Route } from "lucide-react";
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
        <div className="mb-8 rounded-2xl border bg-gradient-to-br from-card via-card to-primary/10 p-6 shadow-sm sm:p-8">
          <Badge className="gap-2"><Route className="h-3.5 w-3.5" /> Developer Journey Map</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{course.shortTitle}</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">{course.description}</p>
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:block" />
          <div className="space-y-5">
            {weeks.map((week) => {
              const value = getWeekProgressPercentage(week, checklist);
              const status = getWeekStatus(value);
              return (
                <Card key={week.id} className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_16px_40px_rgba(2,6,23,0.12)]">
                  <CardContent className="grid gap-4 p-5 md:grid-cols-[44px_1fr_auto] md:items-center">
                    <div className="z-10 grid h-11 w-11 place-items-center rounded-full bg-background shadow-sm ring-1 ring-border transition group-hover:ring-primary/40">
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
                    <Button asChild variant={value > 0 ? "default" : "outline"} className="justify-between gap-2">
                      <Link href={`/weeks/${week.id}`} prefetch={false}>{value > 0 ? "Continue" : "Start"} <ArrowRight className="h-4 w-4" /></Link>
                    </Button>
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
