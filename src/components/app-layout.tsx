"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, BarChart3, BookOpen, ChevronLeft, ChevronRight, GraduationCap, LayoutDashboard, Map, School, Settings, ShieldCheck, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useActivityTracker } from "@/hooks/useActivityTracker";
import { useLearningStore } from "@/hooks/useLearningStore";
import { courses, getCourseById } from "@/data/courses";
import { getCourseProgress } from "@/lib/progress";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  match?: string;
  badge?: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useLearningStore((state) => state.user);
  const authReady = useLearningStore((state) => state.authReady);
  const currentCourseId = useLearningStore((state) => state.currentCourseId);
  const setCurrentCourseId = useLearningStore((state) => state.setCurrentCourseId);
  const checklist = useLearningStore((state) => state.checklist);
  const lastReadPages = useLearningStore((state) => state.lastReadPages);
  const [coursePickerOpen, setCoursePickerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const currentCourse = getCourseById(currentCourseId);
  const lessonsHref = currentCourse.weeks[0] ? `/weeks/${currentCourse.weeks[0].id}` : "/dashboard";
  const courseProgress = getCourseProgress(currentCourse.weeks, checklist);
  const lastStudiedWeek =
    currentCourse.weeks.find((week) => lastReadPages[week.id]) ??
    currentCourse.weeks.find((week) => checklist.some((item) => item.weekId === week.id && item.isCompleted)) ??
    currentCourse.weeks[0];
  const continueHref = lastStudiedWeek ? `/weeks/${lastStudiedWeek.id}` : "/dashboard";
  const continuePage = lastStudiedWeek ? lastReadPages[lastStudiedWeek.id] ?? 1 : 1;
  const navGroups: NavGroup[] = [
    {
      title: "Learning",
      items: [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/roadmap", label: "Roadmap", icon: Map },
        { href: lessonsHref, label: "Lessons", icon: BookOpen, match: "/weeks" },
        { href: "/classes", label: "Classes", icon: School, match: "/classes" }
      ]
    },
    {
      title: "Insights",
      items: [
        { href: "/analytics", label: "Analytics", icon: BarChart3 },
        { href: "/admin", label: "Admin", icon: ShieldCheck, badge: "Admin" }
      ]
    },
    {
      title: "Account",
      items: [
        { href: "/profile", label: "Profile", icon: User },
        { href: "/settings", label: "Settings", icon: Settings }
      ]
    }
  ];
  const nav = navGroups.flatMap((group) => group.items);
  useActivityTracker();

  const selectCourse = (courseId: string) => {
    const nextCourse = getCourseById(courseId);
    setCurrentCourseId(courseId);
    setCoursePickerOpen(false);
    if (pathname.startsWith("/weeks")) {
      const nextHref = nextCourse.weeks[0] ? `/weeks/${nextCourse.weeks[0].id}` : "/dashboard";
      router.push(nextHref);
    }
  };

  useEffect(() => {
    if (authReady && !user) router.replace("/login");
    if (authReady && user && !user.emailVerified && pathname !== "/verify-email") router.replace("/verify-email");
    if (authReady && user?.emailVerified && pathname === "/verify-email") router.replace("/dashboard");
  }, [authReady, pathname, router, user]);

  if (!authReady) {
    return <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">Checking session...</div>;
  }

  if (!user) {
    return <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">Redirecting to login...</div>;
  }
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute right-8 top-0 z-40 sm:right-10">
        <ThemeToggle />
      </div>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden border-r bg-card/95 p-5 shadow-[20px_0_60px_rgba(2,6,23,0.18)] backdrop-blur transition-[width] duration-300 ease-out lg:block",
          sidebarCollapsed ? "w-20" : "w-72"
        )}
      >
        <button
          type="button"
          onClick={() => {
            setSidebarCollapsed((collapsed) => !collapsed);
            setCoursePickerOpen(false);
          }}
          className="absolute -right-3 top-20 z-50 grid h-7 w-7 place-items-center rounded-full border bg-background text-muted-foreground shadow-md transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
        <div className="relative flex items-start gap-3">
          <button
            type="button"
            onClick={() => setCoursePickerOpen((open) => !open)}
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-lg text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              courseHatColor(currentCourse.id),
              coursePickerOpen && "scale-105"
            )}
            aria-label="Open course selector"
            aria-expanded={coursePickerOpen}
          >
            <GraduationCap className="h-6 w-6" />
          </button>
          <Link
            href="/dashboard"
            prefetch={false}
            className={cn(
              "min-w-0 pt-0.5 transition-all duration-200",
              sidebarCollapsed && "pointer-events-none w-0 translate-x-2 overflow-hidden opacity-0"
            )}
          >
            <div className="text-lg font-bold">CourseMap</div>
            <div className="truncate text-xs text-muted-foreground">{currentCourse.shortTitle}</div>
          </Link>
          <div
            className={cn(
              "absolute left-[3.25rem] top-0 z-50 w-60 origin-left rounded-lg border bg-card p-2 shadow-xl transition-all duration-300 ease-out",
              coursePickerOpen && !sidebarCollapsed ? "pointer-events-auto translate-x-0 scale-100 opacity-100" : "pointer-events-none -translate-x-3 scale-95 opacity-0"
            )}
          >
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Choose course</p>
            <div className="space-y-1">
              {courses.map((course, index) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => selectCourse(course.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition hover:bg-muted",
                    course.id === currentCourse.id && "bg-primary/10"
                  )}
                  style={{ transitionDelay: coursePickerOpen ? `${index * 35}ms` : "0ms" }}
                >
                  <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white shadow-sm", courseHatColor(course.id))}>
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{course.code}</span>
                    <span className="block truncate text-xs text-muted-foreground">{course.title}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <nav className="mt-8 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1.5">
              <p
                className={cn(
                  "px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground/75 transition-all duration-200",
                  sidebarCollapsed && "h-0 overflow-hidden opacity-0"
                )}
              >
                {group.title}
              </p>
              {group.items.map((item) => {
                const active = pathname === item.href || Boolean(item.match && pathname.startsWith(item.match));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={cn(
                      "group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:bg-muted/70 hover:text-foreground",
                      sidebarCollapsed && "justify-center px-2 hover:translate-x-0",
                      active && "bg-primary/[0.12] text-primary shadow-[0_10px_30px_rgba(129,140,248,0.16)] hover:translate-x-0 hover:bg-primary/[0.12]"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-2 h-7 w-1 rounded-r-full bg-transparent transition-all duration-200",
                        active && "bg-primary"
                      )}
                    />
                    <span
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-md transition-all duration-200 group-hover:scale-105 group-hover:bg-background/60",
                        active && "bg-primary text-primary-foreground shadow-sm"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span className={cn("min-w-0 flex-1 transition-all duration-200", sidebarCollapsed && "w-0 flex-none overflow-hidden opacity-0")}>
                      {item.label}
                    </span>
                    {item.badge && !sidebarCollapsed ? (
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <div className={cn("absolute inset-x-5 bottom-5 transition-all duration-200", sidebarCollapsed && "pointer-events-none translate-y-2 opacity-0")}>
          <Link
            href={continueHref}
            prefetch={false}
            className="group block rounded-xl border bg-background/55 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background/80 hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Continue</p>
                <p className="mt-1 truncate text-sm font-bold">{lastStudiedWeek ? `Week ${lastStudiedWeek.weekNumber}` : currentCourse.code}</p>
              </div>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary transition group-hover:translate-x-0.5 group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Page {continuePage}</span>
              <span>{courseProgress.percentage}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-indigo-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${courseProgress.percentage}%` }}
              />
            </div>
          </Link>
        </div>
      </aside>
      <header className={cn("sticky top-0 z-20 border-b bg-background transition-[margin] duration-300 ease-out", sidebarCollapsed ? "lg:ml-20" : "lg:ml-72")}>
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm text-muted-foreground">Instructor-prepared weekly PDFs</p>
            <h1 className="text-base font-semibold">PDF reader and progress tracker</h1>
          </div>
          <div className="h-16 w-8" aria-hidden="true" />
        </div>
      </header>
      <main className={cn("pb-20 transition-[margin] duration-300 ease-out lg:pb-0", sidebarCollapsed ? "lg:ml-20" : "lg:ml-72")}>{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-card p-1 lg:hidden">
        {nav.slice(0, 5).map((item) => (
          <Link key={item.href} href={item.href} prefetch={false} className="grid place-items-center gap-1 rounded-md py-2 text-[11px] text-muted-foreground">
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function courseHatColor(courseId: string) {
  switch (courseId) {
    case "ce100":
      return "bg-emerald-500";
    case "ce205":
      return "bg-rose-500";
    case "ce204":
      return "bg-sky-500";
    default:
      return "bg-primary";
  }
}
