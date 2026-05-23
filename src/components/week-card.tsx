"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { WeekContent } from "@/types/week";
import { getCompletedChecklistCount, getWeekProgressPercentage, getWeekStatus, getWeekChecklistTotal } from "@/lib/progress";
import { useLearningStore } from "@/hooks/useLearningStore";

export function WeekCard({ week }: { week: WeekContent }) {
  const checklist = useLearningStore((state) => state.checklist);
  const lastReadPage = useLearningStore((state) => state.lastReadPages?.[week.id]);
  const value = getWeekProgressPercentage(week, checklist);
  const status = getWeekStatus(value);
  const completed = getCompletedChecklistCount(week, checklist);
  const resumeHref = `/weeks/${week.id}${lastReadPage ? `?page=${lastReadPage}` : ""}`;
  return (
    <div className="group h-full">
      <Card className="relative h-full overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_45px_rgba(2,6,23,0.14)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-indigo-400 to-emerald-400 opacity-70" />
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge className="mb-3 border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-200">
                Week {week.weekNumber}
              </Badge>
              <CardTitle>{week.title}</CardTitle>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground transition group-hover:bg-primary/10 group-hover:text-primary">
              {status === "Completed" ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <FileText className="h-5 w-5" />}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="line-clamp-3 text-sm text-muted-foreground">{week.summary}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{status}</span>
              <span className="font-semibold">{value}%</span>
            </div>
            <Progress value={value} />
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-md bg-muted px-2 py-1">{completed} / {getWeekChecklistTotal(week)} pages</span>
            <span className="rounded-md bg-muted px-2 py-1">{week.sections.length} topics</span>
          </div>
          <Button asChild className="w-full justify-between">
            <Link href={resumeHref} prefetch={false}>
              {value > 0 || lastReadPage ? "Continue Learning" : "Start Week"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
