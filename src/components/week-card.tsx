"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { WeekContent } from "@/types/week";
import { getCompletedChecklistCount, getWeekProgressPercentage, getWeekStatus, getWeekChecklistTotal } from "@/lib/progress";
import { useLearningStore } from "@/hooks/useLearningStore";
import { cn } from "@/lib/utils";

type WeekCardState = "completed" | "in-progress" | "not-started";

export function WeekCard({ week }: { week: WeekContent }) {
  const checklist = useLearningStore((state) => state.checklist);
  const lastReadPage = useLearningStore((state) => state.lastReadPages?.[week.id]);
  const value = getWeekProgressPercentage(week, checklist);
  const status = getWeekStatus(value);
  const completed = getCompletedChecklistCount(week, checklist);
  const total = getWeekChecklistTotal(week);
  const resumeHref = `/weeks/${week.id}${lastReadPage ? `?page=${lastReadPage}` : ""}`;
  const state: WeekCardState = value === 100 ? "completed" : value > 0 || Boolean(lastReadPage) ? "in-progress" : "not-started";
  const visual = getVisualState(state);
  const topics = week.sections.slice(0, 3);
  const hiddenTopicCount = Math.max(0, week.sections.length - topics.length);

  return (
    <div className="group h-full">
      <Card
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-br shadow-sm transition-all duration-300 hover:-translate-y-1.5",
          visual.card,
          visual.shadow
        )}
      >
        <div className={cn("absolute inset-x-6 top-0 h-px opacity-80", visual.topLine)} />
        <div className={cn("pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100", visual.hoverWash)} />

        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Badge className={cn("mb-4 gap-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide shadow-sm", visual.badge)}>
                Week {week.weekNumber}
              </Badge>
              <CardTitle className="line-clamp-2 text-lg leading-6">{week.title}</CardTitle>
            </div>
            <div className="relative shrink-0">
              <CircularProgress value={value} state={state} />
              {state === "completed" ? (
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
              ) : null}
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative flex flex-1 flex-col space-y-4">
          <p className={cn("line-clamp-3 min-h-[3.75rem] text-sm leading-6", state === "not-started" ? "text-muted-foreground/75" : "text-muted-foreground")}>
            {week.summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {topics.map((section) => (
              <span key={section.id} className={cn("rounded-full border px-2.5 py-1 text-xs font-medium", visual.chip)}>
                {section.title}
              </span>
            ))}
            {hiddenTopicCount ? (
              <span className="rounded-full border border-dashed bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                +{hiddenTopicCount} more
              </span>
            ) : null}
          </div>

          <div className="mt-auto space-y-4 pt-1">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Metric label="Pages" value={`${completed}/${total}`} />
              <Metric label="Topics" value={String(week.sections.length)} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className={cn("font-semibold", visual.statusText)}>{status}</span>
                <span className="font-bold">{value}%</span>
              </div>
              <Progress value={value} className={cn("h-2", state === "not-started" && "opacity-55")} />
            </div>

            <Button asChild className={cn("w-full justify-between rounded-xl transition-all duration-300", visual.button)}>
              <Link href={resumeHref} prefetch={false}>
                {getActionLabel(state)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background/55 px-3 py-2">
      <span className="block text-muted-foreground">{label}</span>
      <span className="mt-0.5 block font-bold">{value}</span>
    </div>
  );
}

function CircularProgress({ value, state }: { value: number; state: WeekCardState }) {
  const size = 58;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circumference - (clamped / 100) * circumference;
  const ringClass =
    state === "completed"
      ? "stroke-emerald-400"
      : state === "in-progress"
        ? "stroke-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.55)]"
        : "stroke-muted-foreground/35";

  return (
    <div className="relative grid place-items-center rounded-2xl border bg-background/70 p-2 shadow-sm">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} className="stroke-muted" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          className={cn("transition-all duration-500", ringClass)}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-sm font-bold">{clamped}%</span>
    </div>
  );
}

function getActionLabel(state: WeekCardState) {
  switch (state) {
    case "completed":
      return "Review";
    case "in-progress":
      return "Continue Learning";
    default:
      return "Start Week";
  }
}

function getVisualState(state: WeekCardState) {
  switch (state) {
    case "completed":
      return {
        card: "border-emerald-500/30 from-emerald-500/10 via-card to-card hover:border-emerald-400/55",
        shadow: "hover:shadow-[0_22px_60px_rgba(16,185,129,0.18)]",
        topLine: "bg-emerald-400/55",
        hoverWash: "bg-emerald-500/5",
        badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
        chip: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
        statusText: "text-emerald-500",
        button: "bg-emerald-600 hover:bg-emerald-500 text-white"
      };
    case "in-progress":
      return {
        card: "border-cyan-400/25 from-cyan-500/8 via-card to-primary/8 hover:border-cyan-300/45",
        shadow: "hover:shadow-[0_22px_60px_rgba(34,211,238,0.12)] dark:hover:shadow-[0_22px_60px_rgba(129,140,248,0.14)]",
        topLine: "bg-cyan-300/55",
        hoverWash: "bg-cyan-400/[0.035]",
        badge: "border-cyan-400/20 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200",
        chip: "border-cyan-400/25 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200",
        statusText: "text-cyan-500 dark:text-cyan-300",
        button: "shadow-lg shadow-cyan-500/15"
      };
    default:
      return {
        card: "border-border/80 from-card via-card to-muted/35 opacity-95 hover:border-border",
        shadow: "hover:shadow-[0_18px_45px_rgba(2,6,23,0.12)]",
        topLine: "bg-muted-foreground/20",
        hoverWash: "bg-muted/20",
        badge: "border-border bg-muted/55 text-muted-foreground",
        chip: "border-border bg-muted/45 text-muted-foreground",
        statusText: "text-muted-foreground",
        button: "bg-foreground text-background hover:bg-foreground/90"
      };
  }
}
