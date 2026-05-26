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
type WeekArtworkVariant = "code" | "flow" | "graph" | "matrix" | "stack" | "key";

interface WeekArtwork {
  label: string;
  variant: WeekArtworkVariant;
  tone: string;
  panel: string;
}

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
  const artwork = getWeekArtwork(week);
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
        <WeekBackgroundArtwork artwork={artwork} />

        <CardHeader className="relative z-10 pb-3">
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

        <CardContent className="relative z-10 flex flex-1 flex-col space-y-4">
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

function WeekBackgroundArtwork({ artwork }: { artwork: WeekArtwork }) {
  return (
    <div className={cn("pointer-events-none absolute right-4 top-14 z-0 hidden h-36 w-36 text-current opacity-45 transition duration-300 group-hover:opacity-65 sm:block", artwork.tone)}>
      <div className="absolute right-1 top-1 h-24 w-24 rotate-12 rounded-[1.7rem] border border-current/20 bg-background/25 shadow-inner backdrop-blur-sm" />
      <div className={cn("absolute right-1 top-1 grid h-24 w-24 rotate-12 place-items-center rounded-[1.7rem] border backdrop-blur-sm", artwork.panel)}>
        <div className="-rotate-12">
          {renderArtworkGlyph(artwork)}
        </div>
      </div>
      <div className="absolute right-20 top-24 h-11 w-11 rounded-full border border-current/15" />
      <div className="absolute right-24 top-28 h-3 w-3 rounded-full bg-current/20" />
      <div className="absolute right-10 top-32 h-px w-16 bg-current/15" />
      <div className="absolute right-6 top-36 h-px w-10 bg-current/10" />
    </div>
  );
}

function renderArtworkGlyph(artwork: WeekArtwork) {
  switch (artwork.variant) {
    case "graph":
      return (
        <div className="relative h-14 w-16 opacity-70">
          <span className="absolute left-1 top-1 h-3 w-3 rounded-full border border-current/70 bg-current/10" />
          <span className="absolute right-2 top-4 h-3 w-3 rounded-full border border-current/70 bg-current/10" />
          <span className="absolute bottom-2 left-6 h-3 w-3 rounded-full border border-current/70 bg-current/10" />
          <span className="absolute left-4 top-4 h-px w-9 rotate-12 bg-current/35" />
          <span className="absolute left-8 top-8 h-px w-8 rotate-[115deg] bg-current/35" />
          <span className="absolute left-4 top-8 h-px w-8 rotate-[55deg] bg-current/35" />
        </div>
      );
    case "matrix":
      return (
        <div className="grid grid-cols-3 gap-1.5 opacity-70">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className="h-3 w-3 rounded-sm border border-current/45 bg-current/10" />
          ))}
        </div>
      );
    case "stack":
      return (
        <div className="space-y-1.5 opacity-70">
          <span className="block h-2 w-12 rounded-full bg-current/45" />
          <span className="block h-2 w-16 rounded-full bg-current/30" />
          <span className="block h-2 w-10 rounded-full bg-current/20" />
          <span className="block h-2 w-14 rounded-full bg-current/25" />
        </div>
      );
    case "key":
      return (
        <div className="relative h-14 w-16 opacity-70">
          <span className="absolute left-1 top-3 h-7 w-7 rounded-full border-2 border-current/45" />
          <span className="absolute left-8 top-6 h-1.5 w-8 rounded-full bg-current/45" />
          <span className="absolute right-3 top-6 h-5 w-1.5 rounded-full bg-current/35" />
          <span className="absolute right-0 top-6 h-4 w-1.5 rounded-full bg-current/25" />
        </div>
      );
    case "flow":
      return (
        <div className="relative h-14 w-16 opacity-70">
          <span className="absolute left-0 top-2 rounded-md border border-current/35 px-2 py-1 text-[10px] font-black">01</span>
          <span className="absolute right-0 bottom-2 rounded-md border border-current/35 px-2 py-1 text-[10px] font-black">10</span>
          <span className="absolute left-8 top-7 h-px w-8 rotate-45 bg-current/35" />
        </div>
      );
    default:
      return <span className="text-lg font-black tracking-wide opacity-65">{artwork.label}</span>;
  }
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

function getWeekArtwork(week: WeekContent): WeekArtwork {
  const text = `${week.id} ${week.title} ${week.summary} ${week.sections.map((section) => section.title).join(" ")}`.toLowerCase();

  if (text.includes("graph") || text.includes("shortest") || text.includes("roadmap")) {
    return { label: "Graph", variant: "graph", tone: "text-sky-300", panel: "border-sky-300/20 bg-sky-300/10" };
  }
  if (text.includes("matrix")) {
    return { label: "MAT", variant: "matrix", tone: "text-cyan-300", panel: "border-cyan-300/20 bg-cyan-300/10" };
  }
  if (text.includes("heap") || text.includes("huffman") || text.includes("stack") || text.includes("queue")) {
    return { label: "Heap", variant: "stack", tone: "text-amber-300", panel: "border-amber-300/20 bg-amber-300/10" };
  }
  if (text.includes("crypto") || text.includes("symenc") || text.includes("otp") || text.includes("key")) {
    return { label: "Key", variant: "key", tone: "text-emerald-300", panel: "border-emerald-300/20 bg-emerald-300/10" };
  }
  if (text.includes("dynamic") || text.includes("dp") || text.includes("recurrence") || text.includes("recursion") || text.includes("lcs") || text.includes("knapsack")) {
    return { label: "DP", variant: "flow", tone: "text-violet-300", panel: "border-violet-300/20 bg-violet-300/10" };
  }
  if (text.includes("git")) {
    return { label: "Git", variant: "graph", tone: "text-orange-300", panel: "border-orange-300/20 bg-orange-300/10" };
  }
  if (text.includes("test")) {
    return { label: "TDD", variant: "flow", tone: "text-rose-300", panel: "border-rose-300/20 bg-rose-300/10" };
  }
  if (text.includes("java")) {
    return { label: "Java", variant: "code", tone: "text-red-300", panel: "border-red-300/20 bg-red-300/10" };
  }
  if (text.includes("c++") || text.includes("cpp")) {
    return { label: "C++", variant: "code", tone: "text-blue-300", panel: "border-blue-300/20 bg-blue-300/10" };
  }
  if (text.includes("c#") || text.includes("csharp")) {
    return { label: "C#", variant: "code", tone: "text-purple-300", panel: "border-purple-300/20 bg-purple-300/10" };
  }
  if (text.includes("class") || text.includes("object") || text.includes("oop") || text.includes("inheritance") || text.includes("polymorphism")) {
    return { label: "OOP", variant: "code", tone: "text-indigo-300", panel: "border-indigo-300/20 bg-indigo-300/10" };
  }
  if (text.includes("setup") || text.includes("developer") || text.includes("console") || text.includes("program")) {
    return { label: "Dev", variant: "code", tone: "text-cyan-300", panel: "border-cyan-300/20 bg-cyan-300/10" };
  }

  return { label: "CE", variant: "code", tone: "text-primary/70", panel: "border-primary/20 bg-primary/10" };
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
        card: "border-cyan-400/25 from-cyan-500/10 via-card to-primary/10 hover:border-cyan-300/45",
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
