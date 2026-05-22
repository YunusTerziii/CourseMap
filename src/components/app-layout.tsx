"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, BookOpen, GraduationCap, LayoutDashboard, Map, Settings, ShieldCheck, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useActivityTracker } from "@/hooks/useActivityTracker";
import { useLearningStore } from "@/hooks/useLearningStore";
import { courses, getCourseById } from "@/data/courses";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useLearningStore((state) => state.user);
  const authReady = useLearningStore((state) => state.authReady);
  const currentCourseId = useLearningStore((state) => state.currentCourseId);
  const setCurrentCourseId = useLearningStore((state) => state.setCurrentCourseId);
  const [coursePickerOpen, setCoursePickerOpen] = useState(false);
  const currentCourse = getCourseById(currentCourseId);
  const lessonsHref = currentCourse.weeks[0] ? `/weeks/${currentCourse.weeks[0].id}` : "/dashboard";
  const nav = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/roadmap", label: "Roadmap", icon: Map },
    { href: lessonsHref, label: "Lessons", icon: BookOpen },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin", label: "Admin", icon: ShieldCheck },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings }
  ];
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
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r bg-card p-5 lg:block">
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
          <Link href="/" prefetch={false} className="min-w-0 pt-0.5">
            <div className="text-lg font-bold">CourseMap</div>
            <div className="truncate text-xs text-muted-foreground">{currentCourse.shortTitle}</div>
          </Link>
          <div
            className={cn(
              "absolute left-[3.25rem] top-0 z-50 w-60 origin-left rounded-lg border bg-card p-2 shadow-xl transition-all duration-300 ease-out",
              coursePickerOpen ? "pointer-events-auto translate-x-0 scale-100 opacity-100" : "pointer-events-none -translate-x-3 scale-95 opacity-0"
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
        <nav className="mt-8 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href.includes("/weeks") && pathname.startsWith("/weeks"));
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  active && "bg-primary/10 text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <header className="sticky top-0 z-20 border-b bg-background lg:ml-72">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm text-muted-foreground">Instructor-prepared weekly PDFs</p>
            <h1 className="text-base font-semibold">PDF reader and progress tracker</h1>
          </div>
          <div className="h-16 w-8" aria-hidden="true" />
        </div>
      </header>
      <main className="pb-20 lg:ml-72 lg:pb-0">{children}</main>
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
