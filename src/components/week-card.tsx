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
type WeekArtworkVariant =
  | "roadmap"
  | "terminal"
  | "git"
  | "testing"
  | "language"
  | "analysis"
  | "recurrence"
  | "matrix"
  | "heap"
  | "dp"
  | "greedy"
  | "huffman"
  | "graph"
  | "shortest-path"
  | "crypto"
  | "oop"
  | "uml"
  | "patterns"
  | "refactor"
  | "exam";

interface WeekArtwork {
  label: string;
  variant: WeekArtworkVariant;
  tone: string;
  muted: string;
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
    <div className={cn("pointer-events-none absolute right-0 top-0 z-0 hidden h-52 w-52 text-current opacity-35 transition duration-300 group-hover:translate-x-[-2px] group-hover:opacity-55 sm:block", artwork.tone)}>
      <div className={cn("absolute right-0 top-0 h-full w-full", artwork.muted)} />
      {renderArtworkScene(artwork)}
    </div>
  );
}

function renderArtworkScene(artwork: WeekArtwork) {
  const labelChip = (
    <div className="absolute right-8 top-14 grid h-20 w-20 place-items-center rounded-[1.6rem] border border-current/20 bg-background/30 text-sm font-black tracking-wide shadow-inner backdrop-blur-sm">
      {artwork.label}
    </div>
  );

  switch (artwork.variant) {
    case "roadmap":
      return (
        <div className="absolute right-6 top-10 h-32 w-36">
          <span className="absolute left-5 top-3 h-24 w-px bg-current/20" />
          {["Start", "Build", "Ship"].map((label, index) => (
            <span key={label} className="absolute left-0 flex items-center gap-2 text-[10px] font-bold" style={{ top: `${index * 2.6 + 0.2}rem` }}>
              <span className="h-3 w-3 rounded-full border border-current/50 bg-current/10" />
              <span className="rounded-md border border-current/20 bg-background/30 px-2 py-1">{label}</span>
            </span>
          ))}
          <span className="absolute right-0 top-6 rounded-xl border border-current/20 bg-background/25 px-3 py-2 text-lg font-black">DEV</span>
        </div>
      );
    case "terminal":
      return (
        <div className="absolute right-5 top-12 w-36 rounded-xl border border-current/20 bg-background/30 p-3 shadow-inner backdrop-blur-sm">
          <div className="mb-3 flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-current/40" />
            <span className="h-2 w-2 rounded-full bg-current/25" />
            <span className="h-2 w-2 rounded-full bg-current/20" />
          </div>
          <p className="text-[10px] font-bold">$ build</p>
          <span className="mt-2 block h-1.5 w-24 rounded-full bg-current/30" />
          <span className="mt-1.5 block h-1.5 w-16 rounded-full bg-current/20" />
          <span className="mt-1.5 block h-1.5 w-28 rounded-full bg-current/20" />
        </div>
      );
    case "git":
      return (
        <div className="absolute right-8 top-10 h-32 w-32">
          <span className="absolute left-6 top-4 h-24 w-px bg-current/25" />
          <span className="absolute left-6 top-9 h-px w-14 rotate-[-28deg] bg-current/25" />
          <span className="absolute left-6 top-20 h-px w-16 rotate-[28deg] bg-current/25" />
          {[
            "left-4 top-2",
            "left-4 top-14",
            "left-4 top-[6.5rem]",
            "right-6 top-4",
            "right-2 top-20"
          ].map((position, index) => (
            <span key={position} className={cn("absolute h-4 w-4 rounded-full border border-current/60 bg-background/40", position)}>
              {index === 0 ? <span className="absolute inset-1 rounded-full bg-current/40" /> : null}
            </span>
          ))}
          <span className="absolute right-0 bottom-0 rounded-md border border-current/20 bg-background/30 px-2 py-1 text-[10px] font-black">merge</span>
        </div>
      );
    case "testing":
      return (
        <div className="absolute right-5 top-12 w-36 space-y-2 rounded-xl border border-current/20 bg-background/30 p-3">
          {["Arrange", "Act", "Assert"].map((label, index) => (
            <div key={label} className="flex items-center gap-2 text-[10px] font-bold">
              <span className={cn("grid h-4 w-4 place-items-center rounded border border-current/30", index < 2 && "bg-current/20")}>{index < 2 ? "✓" : ""}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      );
    case "analysis":
      return (
        <div className="absolute right-6 top-12 h-32 w-36">
          <span className="absolute bottom-4 left-3 h-24 w-px bg-current/20" />
          <span className="absolute bottom-4 left-3 h-px w-28 bg-current/20" />
          <span className="absolute bottom-5 left-5 h-px w-24 rotate-[-18deg] bg-current/40" />
          <span className="absolute bottom-8 left-7 h-px w-20 rotate-[-38deg] bg-current/30" />
          <span className="absolute right-2 top-4 rounded-md border border-current/20 bg-background/30 px-2 py-1 text-[10px] font-black">O(n)</span>
          <span className="absolute right-8 top-14 rounded-md border border-current/20 bg-background/30 px-2 py-1 text-[10px] font-black">n²</span>
        </div>
      );
    case "recurrence":
      return (
        <div className="absolute right-4 top-10 h-36 w-40 text-[10px] font-black">
          <span className="absolute left-14 top-0 rounded-md border border-current/20 bg-background/30 px-2 py-1">T(n)</span>
          <span className="absolute left-6 top-10 rounded-md border border-current/20 bg-background/30 px-2 py-1">T(n/2)</span>
          <span className="absolute right-6 top-10 rounded-md border border-current/20 bg-background/30 px-2 py-1">T(n/2)</span>
          <span className="absolute left-12 top-8 h-px w-10 rotate-[28deg] bg-current/25" />
          <span className="absolute right-12 top-8 h-px w-10 rotate-[-28deg] bg-current/25" />
          <span className="absolute left-1 bottom-2 rounded-md border border-current/20 bg-background/25 px-2 py-1">+ c</span>
          <span className="absolute right-8 bottom-2 rounded-md border border-current/20 bg-background/25 px-2 py-1">log n</span>
        </div>
      );
    case "dp":
      return (
        <div className="absolute right-4 top-9 grid grid-cols-4 gap-1.5 rounded-xl border border-current/20 bg-background/25 p-3">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} className={cn("h-4 w-4 rounded border border-current/20", index % 3 === 0 ? "bg-current/30" : "bg-current/10")} />
          ))}
          <span className="absolute -bottom-6 right-4 rounded-md border border-current/20 bg-background/30 px-2 py-1 text-[10px] font-black">memo</span>
        </div>
      );
    case "graph":
      return (
        <div className="absolute right-5 top-9 h-36 w-40">
          {["left-3 top-4", "right-10 top-2", "right-2 top-16", "left-8 bottom-5", "right-16 bottom-1"].map((position) => (
            <span key={position} className={cn("absolute h-4 w-4 rounded-full border border-current/50 bg-background/30", position)} />
          ))}
          <span className="absolute left-7 top-7 h-px w-20 rotate-[-9deg] bg-current/25" />
          <span className="absolute right-9 top-6 h-px w-14 rotate-[52deg] bg-current/25" />
          <span className="absolute left-10 bottom-8 h-px w-24 rotate-[-34deg] bg-current/25" />
          <span className="absolute right-8 bottom-9 h-px w-16 rotate-[28deg] bg-current/25" />
        </div>
      );
    case "shortest-path":
      return (
        <div className="absolute right-4 top-10 h-36 w-40">
          <span className="absolute left-2 top-16 h-4 w-4 rounded-full border border-current/60 bg-current/20" />
          <span className="absolute left-16 top-8 h-4 w-4 rounded-full border border-current/60 bg-current/20" />
          <span className="absolute right-4 top-[4.5rem] h-4 w-4 rounded-full border border-current/60 bg-current/20" />
          <span className="absolute left-6 top-15 h-px w-16 rotate-[-28deg] bg-current/50" />
          <span className="absolute left-20 top-12 h-px w-16 rotate-[23deg] bg-current/50" />
          <span className="absolute right-14 top-2 rounded-md border border-current/20 bg-background/30 px-2 py-1 text-[10px] font-black">d=7</span>
        </div>
      );
    case "matrix":
      return (
        <div className="absolute right-7 top-10 grid grid-cols-4 gap-1.5 rounded-xl border border-current/20 bg-background/25 p-3">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} className={cn("h-4 w-4 rounded-sm border border-current/25", index === 0 || index === 5 || index === 10 || index === 15 ? "bg-current/30" : "bg-current/10")} />
          ))}
        </div>
      );
    case "heap":
      return (
        <div className="absolute right-5 top-10 h-36 w-40">
          {["left-16 top-0", "left-8 top-12", "right-8 top-12", "left-0 top-24", "left-16 top-24", "right-0 top-24"].map((position, index) => (
            <span key={position} className={cn("absolute grid h-8 w-8 place-items-center rounded-lg border border-current/25 bg-background/30 text-[10px] font-black", position)}>{[99, 42, 31, 18, 12, 7][index]}</span>
          ))}
          <span className="absolute left-14 top-9 h-px w-10 rotate-[35deg] bg-current/25" />
          <span className="absolute right-14 top-9 h-px w-10 rotate-[-35deg] bg-current/25" />
          <span className="absolute left-6 top-[5.25rem] h-px w-10 rotate-[35deg] bg-current/20" />
          <span className="absolute right-6 top-[5.25rem] h-px w-10 rotate-[-35deg] bg-current/20" />
        </div>
      );
    case "greedy":
      return (
        <div className="absolute right-5 top-12 h-32 w-36">
          <div className="absolute right-4 bottom-4 h-20 w-24 rounded-b-3xl border border-current/25 bg-background/30" />
          <span className="absolute left-5 top-4 h-8 w-8 rotate-12 rounded-lg border border-current/25 bg-current/10" />
          <span className="absolute left-16 top-1 h-7 w-7 -rotate-6 rounded-lg border border-current/25 bg-current/20" />
          <span className="absolute right-2 top-12 h-6 w-6 rotate-12 rounded-lg border border-current/25 bg-current/20" />
          <span className="absolute right-12 bottom-0 rounded-md border border-current/20 bg-background/30 px-2 py-1 text-[10px] font-black">best now</span>
        </div>
      );
    case "huffman":
      return (
        <div className="absolute right-4 top-9 h-36 w-40 text-[10px] font-black">
          <span className="absolute left-16 top-0 rounded-md border border-current/20 bg-background/30 px-2 py-1">Σ</span>
          <span className="absolute left-7 top-11 rounded-md border border-current/20 bg-background/30 px-2 py-1">0</span>
          <span className="absolute right-8 top-11 rounded-md border border-current/20 bg-background/30 px-2 py-1">1</span>
          <span className="absolute left-1 bottom-3 rounded-md border border-current/20 bg-background/25 px-2 py-1">A</span>
          <span className="absolute right-16 bottom-3 rounded-md border border-current/20 bg-background/25 px-2 py-1">B</span>
          <span className="absolute right-1 bottom-3 rounded-md border border-current/20 bg-background/25 px-2 py-1">C</span>
          <span className="absolute left-14 top-9 h-px w-12 rotate-[35deg] bg-current/25" />
          <span className="absolute right-14 top-9 h-px w-12 rotate-[-35deg] bg-current/25" />
        </div>
      );
    case "crypto":
      return (
        <div className="absolute right-5 top-12 h-32 w-36">
          <span className="absolute left-0 top-8 h-10 w-10 rounded-full border-2 border-current/30" />
          <span className="absolute left-9 top-12 h-2 w-20 rounded-full bg-current/30" />
          <span className="absolute right-9 top-12 h-7 w-2 rounded-full bg-current/25" />
          <span className="absolute right-1 top-12 h-5 w-2 rounded-full bg-current/20" />
          <span className="absolute right-2 bottom-0 rounded-xl border border-current/20 bg-background/30 px-3 py-2 text-[10px] font-black">SHA</span>
        </div>
      );
    case "oop":
      return (
        <div className="absolute right-4 top-11 w-40 space-y-2">
          {["User", "Course", "Progress"].map((label, index) => (
            <div key={label} className={cn("w-28 rounded-lg border border-current/20 bg-background/30 p-2 text-[10px] font-black", index === 1 && "ml-8", index === 2 && "ml-3")}>
              <p>{label}</p>
              <span className="mt-1 block h-px w-full bg-current/20" />
              <span className="mt-1 block h-1 w-16 rounded-full bg-current/20" />
            </div>
          ))}
        </div>
      );
    case "uml":
      return (
        <div className="absolute right-4 top-9 h-36 w-40">
          <div className="absolute left-2 top-3 w-24 rounded-lg border border-current/20 bg-background/30 p-2 text-[10px] font-black">
            Class
            <span className="mt-1 block h-px bg-current/20" />
            <span className="mt-1 block h-1 w-14 rounded-full bg-current/25" />
            <span className="mt-1 block h-1 w-10 rounded-full bg-current/20" />
          </div>
          <div className="absolute right-1 bottom-2 w-24 rounded-lg border border-current/20 bg-background/30 p-2 text-[10px] font-black">
            Interface
            <span className="mt-1 block h-px bg-current/20" />
            <span className="mt-1 block h-1 w-12 rounded-full bg-current/25" />
          </div>
          <span className="absolute left-20 top-[4.5rem] h-px w-16 rotate-[38deg] bg-current/25" />
        </div>
      );
    case "patterns":
      return (
        <div className="absolute right-5 top-11 h-36 w-40">
          {["Adapter", "Facade", "Proxy"].map((label, index) => (
            <span key={label} className="absolute rounded-lg border border-current/20 bg-background/30 px-2 py-1 text-[10px] font-black" style={{ right: `${index * 1.8}rem`, top: `${index * 2.1}rem` }}>
              {label}
            </span>
          ))}
          <span className="absolute left-8 bottom-4 h-px w-28 rotate-[-18deg] bg-current/20" />
          <span className="absolute right-2 bottom-2 rounded-full border border-current/20 bg-current/10 px-3 py-1 text-[10px] font-black">pattern</span>
        </div>
      );
    case "refactor":
      return (
        <div className="absolute right-5 top-10 w-36 space-y-2">
          <div className="rounded-lg border border-current/20 bg-background/30 p-2">
            <span className="block h-1.5 w-28 rounded-full bg-current/30" />
            <span className="mt-1.5 block h-1.5 w-20 rounded-full bg-current/20" />
            <span className="mt-1.5 block h-1.5 w-24 rounded-full bg-current/20" />
          </div>
          <div className="ml-8 rounded-lg border border-current/20 bg-background/30 p-2">
            <span className="block h-1.5 w-16 rounded-full bg-current/30" />
            <span className="mt-1.5 block h-1.5 w-20 rounded-full bg-current/20" />
          </div>
        </div>
      );
    case "exam":
      return (
        <div className="absolute right-7 top-10 w-32 rounded-xl border border-current/20 bg-background/30 p-3">
          <p className="text-[10px] font-black">Review</p>
          {["OOP", "UML", "DP"].map((label) => (
            <span key={label} className="mt-2 flex items-center gap-2 text-[10px] font-bold">
              <span className="h-3 w-3 rounded-sm border border-current/30 bg-current/20" />
              {label}
            </span>
          ))}
        </div>
      );
    default:
      return labelChip;
  }
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background/50 px-3 py-2">
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
        : "stroke-muted-foreground/30";

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

  if (text.includes("roadmap") || text.includes("professional profile") || text.includes("internet basics")) {
    return { label: "DEV", variant: "roadmap", tone: "text-cyan-300", muted: "bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_55%)]" };
  }
  if (text.includes("environment") || text.includes("console") || text.includes("command line") || text.includes("setup")) {
    return { label: "CLI", variant: "terminal", tone: "text-cyan-300", muted: "bg-[linear-gradient(145deg,rgba(34,211,238,0.10),transparent_58%)]" };
  }
  if (text.includes("git")) {
    return { label: "Git", variant: "git", tone: "text-orange-300", muted: "bg-[radial-gradient(circle_at_75%_35%,rgba(251,146,60,0.12),transparent_58%)]" };
  }
  if (text.includes("test") || text.includes("tdd") || text.includes("ci ")) {
    return { label: "TDD", variant: "testing", tone: "text-rose-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(251,113,133,0.12),transparent_58%)]" };
  }
  if (text.includes("analysis of algorithms") || text.includes("growth")) {
    return { label: "O(n)", variant: "analysis", tone: "text-amber-300", muted: "bg-[linear-gradient(145deg,rgba(252,211,77,0.10),transparent_58%)]" };
  }
  if (text.includes("recurrence") || text.includes("divide-and-conquer")) {
    return { label: "T(n)", variant: "recurrence", tone: "text-violet-300", muted: "bg-[radial-gradient(circle_at_80%_30%,rgba(196,181,253,0.12),transparent_58%)]" };
  }
  if (text.includes("graph") || text.includes("shortest") || text.includes("roadmap")) {
    return text.includes("shortest")
      ? { label: "Path", variant: "shortest-path", tone: "text-sky-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(125,211,252,0.12),transparent_58%)]" }
      : { label: "Graph", variant: "graph", tone: "text-sky-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(125,211,252,0.12),transparent_58%)]" };
  }
  if (text.includes("matrix")) {
    return { label: "MAT", variant: "matrix", tone: "text-cyan-300", muted: "bg-[linear-gradient(145deg,rgba(103,232,249,0.10),transparent_58%)]" };
  }
  if (text.includes("heap") || text.includes("huffman") || text.includes("stack") || text.includes("queue")) {
    return text.includes("huffman")
      ? { label: "ZIP", variant: "huffman", tone: "text-amber-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(252,211,77,0.12),transparent_58%)]" }
      : { label: "Heap", variant: "heap", tone: "text-amber-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(252,211,77,0.12),transparent_58%)]" };
  }
  if (text.includes("crypto") || text.includes("symenc") || text.includes("otp") || text.includes("key")) {
    return { label: "Key", variant: "crypto", tone: "text-emerald-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(110,231,183,0.12),transparent_58%)]" };
  }
  if (text.includes("dynamic") || text.includes("dp") || text.includes("recurrence") || text.includes("recursion") || text.includes("lcs") || text.includes("knapsack")) {
    return text.includes("knapsack") || text.includes("greedy")
      ? { label: "Bag", variant: "greedy", tone: "text-lime-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(190,242,100,0.10),transparent_58%)]" }
      : { label: "DP", variant: "dp", tone: "text-violet-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(196,181,253,0.12),transparent_58%)]" };
  }
  if (text.includes("java")) {
    return { label: "Java", variant: "language", tone: "text-red-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(252,165,165,0.10),transparent_58%)]" };
  }
  if (text.includes("c++") || text.includes("cpp")) {
    return { label: "C++", variant: "language", tone: "text-blue-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(147,197,253,0.12),transparent_58%)]" };
  }
  if (text.includes("c#") || text.includes("csharp")) {
    return { label: "C#", variant: "language", tone: "text-purple-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(216,180,254,0.12),transparent_58%)]" };
  }
  if (text.includes("uml") || text.includes("plantuml") || text.includes("umple")) {
    return { label: "UML", variant: "uml", tone: "text-sky-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(125,211,252,0.10),transparent_58%)]" };
  }
  if (text.includes("design pattern") || text.includes("patterns")) {
    return { label: "GoF", variant: "patterns", tone: "text-indigo-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(165,180,252,0.12),transparent_58%)]" };
  }
  if (text.includes("refactor") || text.includes("code smells") || text.includes("composing methods")) {
    return { label: "Clean", variant: "refactor", tone: "text-teal-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(94,234,212,0.10),transparent_58%)]" };
  }
  if (text.includes("class") || text.includes("object") || text.includes("oop") || text.includes("inheritance") || text.includes("polymorphism")) {
    return { label: "OOP", variant: "oop", tone: "text-indigo-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(165,180,252,0.12),transparent_58%)]" };
  }
  if (text.includes("review") || text.includes("exam")) {
    return { label: "Final", variant: "exam", tone: "text-fuchsia-300", muted: "bg-[radial-gradient(circle_at_80%_35%,rgba(240,171,252,0.10),transparent_58%)]" };
  }

  return { label: "CE", variant: "language", tone: "text-primary/70", muted: "bg-[radial-gradient(circle_at_80%_35%,hsl(var(--primary)/0.10),transparent_58%)]" };
}

function getVisualState(state: WeekCardState) {
  switch (state) {
    case "completed":
      return {
        card: "border-emerald-500/30 from-emerald-500/10 via-card to-card hover:border-emerald-400/50",
        shadow: "hover:shadow-[0_22px_60px_rgba(16,185,129,0.18)]",
        topLine: "bg-emerald-400/50",
        hoverWash: "bg-emerald-500/5",
        badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
        chip: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
        statusText: "text-emerald-500",
        button: "bg-emerald-600 hover:bg-emerald-500 text-white"
      };
    case "in-progress":
      return {
        card: "border-cyan-400/25 from-cyan-500/10 via-card to-primary/10 hover:border-cyan-300/40",
        shadow: "hover:shadow-[0_22px_60px_rgba(34,211,238,0.12)] dark:hover:shadow-[0_22px_60px_rgba(129,140,248,0.14)]",
        topLine: "bg-cyan-300/50",
        hoverWash: "bg-cyan-400/[0.035]",
        badge: "border-cyan-400/20 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200",
        chip: "border-cyan-400/25 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200",
        statusText: "text-cyan-500 dark:text-cyan-300",
        button: "shadow-lg shadow-cyan-500/20"
      };
    default:
      return {
        card: "border-border/80 from-card via-card to-muted/30 opacity-95 hover:border-border",
        shadow: "hover:shadow-[0_18px_45px_rgba(2,6,23,0.12)]",
        topLine: "bg-muted-foreground/20",
        hoverWash: "bg-muted/20",
        badge: "border-border bg-muted/50 text-muted-foreground",
        chip: "border-border bg-muted/40 text-muted-foreground",
        statusText: "text-muted-foreground",
        button: "bg-foreground text-background hover:bg-foreground/90"
      };
  }
}
