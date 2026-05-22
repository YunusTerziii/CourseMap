"use client";

import Link from "next/link";
import { CheckCircle2, FileText } from "lucide-react";
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
    <div>
      <Card className="h-full overflow-hidden">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge className="mb-3 border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-200">
                Week {week.weekNumber}
              </Badge>
              <CardTitle>{week.title}</CardTitle>
            </div>
            {status === "Completed" ? <CheckCircle2 className="h-6 w-6 text-emerald-500" /> : <FileText className="h-6 w-6 text-muted-foreground" />}
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
          <Button asChild className="w-full">
            <Link href={resumeHref} prefetch={false}>{value > 0 || lastReadPage ? "Continue Learning" : "Start Week"}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
