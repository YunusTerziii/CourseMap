"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, ChevronDown, Clock, Eye, ShieldCheck, Users } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courses, getWeekById } from "@/data/courses";
import { pdfPageCounts } from "@/data/pdf-page-counts";
import { useLearningStore } from "@/hooks/useLearningStore";
import { fetchAdminDashboard, isAdminEmail } from "@/services/adminTrackingService";
import type { TrackedUser, UserActivityEvent, UserSession } from "@/types/admin";

export default function AdminPage() {
  const currentUser = useLearningStore((state) => state.user);
  const [users, setUsers] = useState<TrackedUser[]>([]);
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [events, setEvents] = useState<UserActivityEvent[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openCourseIds, setOpenCourseIds] = useState<string[]>(["ce103"]);
  const [loading, setLoading] = useState(true);

  const canView = isAdminEmail(currentUser?.email);

  useEffect(() => {
    if (!canView) return;
    let active = true;
    async function load() {
      setLoading(true);
      const data = await fetchAdminDashboard();
      if (!active) return;
      setUsers(data.users);
      setSessions(data.sessions);
      setEvents(data.events);
      setSelectedUserId((current) => current ?? data.users[0]?.id ?? null);
      setLoading(false);
    }
    void load();
    const timer = window.setInterval(load, 30000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [canView]);

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? users[0];
  const selectedSessions = selectedUser ? sessions.filter((session) => session.userId === selectedUser.id) : [];
  const selectedLessonSessions = selectedSessions.filter((session) => Boolean(getWeekIdFromPath(session.lastPath)));
  const selectedEvents = selectedUser ? events.filter((event) => event.userId === selectedUser.id) : [];
  const totalActiveSeconds = users.reduce((sum, user) => sum + (user.totalActiveSeconds ?? 0), 0);
  const activeToday = sessions.filter((session) => isToday(session.lastActiveAt)).length;

  useEffect(() => {
    const currentCourseId = selectedUser?.currentCourseId;
    if (!currentCourseId) return;
    setOpenCourseIds((current) =>
      current.includes(currentCourseId) ? current : [currentCourseId, ...current]
    );
  }, [selectedUser?.currentCourseId, selectedUser?.id]);

  const courseProgress = useMemo(() => {
    if (!selectedUser) return [];

    const completedByWeek = new Map<string, number>();
    for (const item of selectedUser.completedChecklist ?? []) {
      if (item.sectionId !== "pdf-pages" || !item.isCompleted) continue;
      completedByWeek.set(item.weekId, (completedByWeek.get(item.weekId) ?? 0) + 1);
    }

    return courses.map((course) => {
      const weeks = course.weeks.map((week) => {
        const total = pdfPageCounts[week.id] ?? 0;
        const completed = completedByWeek.get(week.id) ?? 0;
        return {
          id: week.id,
          label: `Week ${week.weekNumber}`,
          title: week.title,
          total,
          completed,
          activeSeconds: selectedUser.weekActiveSeconds?.[week.id] ?? 0,
          percentage: total ? Math.round((completed / total) * 100) : 0
        };
      });
      const total = weeks.reduce((sum, week) => sum + week.total, 0);
      const completed = weeks.reduce((sum, week) => sum + week.completed, 0);
      const activeSeconds = weeks.reduce((sum, week) => sum + week.activeSeconds, 0);
      return {
        id: course.id,
        code: course.code,
        title: course.title,
        weeks,
        total,
        completed,
        activeSeconds,
        percentage: total ? Math.round((completed / total) * 100) : 0
      };
    });
  }, [selectedUser]);

  const toggleCourse = (courseId: string) => {
    setOpenCourseIds((current) =>
      current.includes(courseId) ? current.filter((id) => id !== courseId) : [...current, courseId]
    );
  };

  if (!canView) {
    return (
      <AppLayout>
        <div className="p-6">
          <Card>
            <CardHeader><CardTitle>Admin access required</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Bu panel sadece admin kullanıcılar içindir.</p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Teacher dashboard</p>
            <h1 className="text-2xl font-bold">Admin student activity</h1>
          </div>
          <Button variant="outline" onClick={() => window.location.reload()}>Refresh</Button>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          <Metric title="Students" value={users.length} icon={<Users className="h-5 w-5" />} />
          <Metric title="Sessions today" value={activeToday} icon={<Eye className="h-5 w-5" />} />
          <Metric title="Total lesson time" value={formatDuration(totalActiveSeconds)} icon={<Clock className="h-5 w-5" />} />
          <Metric title="Events" value={events.length} icon={<Activity className="h-5 w-5" />} />
        </section>

        <section className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
          <Card>
            <CardHeader><CardTitle>Users</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {loading ? <p className="text-sm text-muted-foreground">Loading...</p> : null}
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`w-full rounded-md border p-3 text-left transition ${selectedUser?.id === user.id ? "border-primary bg-primary/10" : "hover:bg-muted"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge>{formatDuration(user.totalActiveSeconds ?? 0)}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Last login: {formatDate(user.lastLoginAt)}</p>
                  <p className="text-xs text-muted-foreground">Last active: {formatDate(user.lastActiveAt)}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          {selectedUser ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>{selectedUser.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                    </div>
                    <Badge className="gap-1"><ShieldCheck className="h-3 w-3" /> Student</Badge>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <Info label="Login count" value={selectedUser.loginCount ?? 0} />
                  <Info label="Lesson time" value={formatDuration(selectedUser.totalActiveSeconds ?? 0)} />
                  <Info label="Favorite pages" value={selectedUser.favoritePages?.length ?? 0} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Course progress</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {courseProgress.map((course) => {
                    const isOpen = openCourseIds.includes(course.id);
                    return (
                      <div key={course.id} className="overflow-hidden rounded-md border">
                        <button
                          type="button"
                          onClick={() => toggleCourse(course.id)}
                          className="flex w-full items-center justify-between gap-3 p-3 text-left transition hover:bg-muted/50"
                          aria-expanded={isOpen}
                        >
                          <div className="min-w-0">
                            <p className="font-semibold">{course.code} - {course.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {course.weeks.length
                                ? `${course.completed} / ${course.total} PDF pages completed · ${formatDuration(course.activeSeconds)} active`
                                : "PDF materials not added yet"}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <Badge>{course.percentage}%</Badge>
                            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </div>
                        </button>
                        <div className="px-3 pb-3">
                          <Progress value={course.percentage} />
                        </div>
                        {isOpen ? (
                          <div className="space-y-2 border-t bg-muted/20 p-3">
                            {course.weeks.length ? course.weeks.map((week) => (
                              <div key={week.id} className="rounded-md border bg-background p-3">
                                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                                  <div>
                                    <p className="font-semibold">{week.label} - {week.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {week.completed} / {week.total} PDF pages completed · {formatDuration(week.activeSeconds)} active
                                    </p>
                                  </div>
                                  <Badge className="bg-background text-foreground">{week.percentage}%</Badge>
                                </div>
                                <Progress value={week.percentage} />
                              </div>
                            )) : (
                              <p className="rounded-md border bg-background p-3 text-sm text-muted-foreground">
                                Bu ders için PDF haftaları eklendiğinde burada ayrı ayrı görünecek.
                              </p>
                            )}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <section className="grid gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader><CardTitle>Recent lesson sessions</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {selectedLessonSessions.slice(0, 10).map((session) => {
                      const weekId = getWeekIdFromPath(session.lastPath);
                      const week = weekId ? getWeekById(weekId) : undefined;
                      return (
                        <div key={session.id} className="rounded-md border p-3 text-sm">
                          <div className="flex justify-between gap-3">
                            <span className="font-medium">{formatDuration(session.activeSeconds)}</span>
                            <span className="text-muted-foreground">{formatDate(session.startedAt)}</span>
                          </div>
                          <p className="mt-1 text-xs font-medium">{week ? `Week ${week.weekNumber} - ${week.title}` : weekId}</p>
                          <p className="mt-1 text-xs text-muted-foreground">Only lesson page active time is counted.</p>
                        </div>
                      );
                    })}
                    {!selectedLessonSessions.length ? (
                      <p className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
                        Bu öğrenci henüz bir lesson/PDF sayfasında aktif süre geçirmemiş.
                      </p>
                    ) : null}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {selectedEvents.slice(0, 14).map((event) => (
                      <div key={event.id} className="rounded-md border p-3 text-sm">
                        <div className="flex justify-between gap-3">
                          <span className="font-medium">{eventLabel(event.type)}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(event.createdAt)}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {event.weekId ? `${event.weekId} ` : ""}{event.page ? `page ${event.page}` : ""}{event.path ? ` ${event.path}` : ""}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>
            </div>
          ) : null}
        </section>
      </div>
    </AppLayout>
  );
}

function Metric({ title, value, icon }: { title: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">{title}</CardTitle><span className="text-primary">{icon}</span></CardHeader><CardContent><div className="text-2xl font-bold">{value}</div></CardContent></Card>;
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="rounded-md border bg-muted/30 p-3"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-xl font-bold">{value}</p></div>;
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function isToday(value?: string) {
  if (!value) return false;
  const date = new Date(value);
  const now = new Date();
  return date.toDateString() === now.toDateString();
}

function eventLabel(type: string) {
  return type.replaceAll("_", " ");
}

function getWeekIdFromPath(path?: string) {
  const match = path?.match(/^\/weeks\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}
