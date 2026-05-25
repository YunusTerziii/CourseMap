"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Copy, FileText, School, UsersRound } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchClassroomDetail, type ClassroomDetail } from "@/services/classroomService";
import { useLearningStore } from "@/hooks/useLearningStore";
import type { Classroom } from "@/types/classroom";
import { cn } from "@/lib/utils";

export default function ClassDetailPage() {
  const params = useParams<{ classId: string }>();
  const router = useRouter();
  const user = useLearningStore((state) => state.user);
  const [detail, setDetail] = useState<ClassroomDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!user || !params.classId) return;
      setLoading(true);
      const result = await fetchClassroomDetail(params.classId, user);
      if (!active) return;
      setDetail(result);
      setLoading(false);
    }
    void load();
    return () => {
      active = false;
    };
  }, [params.classId, user]);

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6">
          <Card><CardContent className="p-6 text-sm text-muted-foreground">Loading class...</CardContent></Card>
        </div>
      </AppLayout>
    );
  }

  if (!detail) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-3xl space-y-4 p-6">
          <Button type="button" variant="ghost" className="px-0" onClick={() => router.push("/classes")}>
            <ArrowLeft className="h-4 w-4" /> Back to classes
          </Button>
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <h1 className="text-xl font-bold">Class not found</h1>
              <p className="mt-2 text-sm text-muted-foreground">This class may have been removed or your account may not be a member.</p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const { classroom, members } = detail;
  const isOwner = classroom.ownerId === user?.id;
  const copyInvite = async () => {
    await navigator.clipboard?.writeText(classroom.inviteCode);
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <Button asChild variant="ghost" className="px-0">
          <Link href="/classes" prefetch={false}><ArrowLeft className="h-4 w-4" /> Back to classes</Link>
        </Button>

        <section className="rounded-2xl border bg-gradient-to-br from-card via-card to-primary/10 p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge className="gap-2"><School className="h-3.5 w-3.5" /> {isOwner ? "Instructor view" : "Student view"}</Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{classroom.name}</h1>
              <p className="mt-2 text-muted-foreground">{classroom.code} - {classroom.term}</p>
              {classroom.description ? <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">{classroom.description}</p> : null}
            </div>
            <span className={cn("grid h-14 w-14 place-items-center rounded-2xl text-white", classColor(classroom.color))}>
              <School className="h-7 w-7" />
            </span>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Class materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                  Custom class PDFs will live here next. The default CE103, CE100, and CE204 material pages stay separate.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><UsersRound className="h-5 w-5 text-primary" /> Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {members.map((member) => (
                  <div key={`${member.classId}-${member.userId}`} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{member.displayName}</p>
                      <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                    </div>
                    <Badge className={member.role === "owner" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}>{member.role}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Class summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <SummaryRow label="Course" value={classroom.code} />
                <SummaryRow label="Term" value={classroom.term} />
                <SummaryRow label="Owner" value={classroom.ownerName} />
                <SummaryRow label="Members" value={String(members.length)} />
              </CardContent>
            </Card>

            {isOwner ? (
              <Card>
                <CardHeader><CardTitle>Invite code</CardTitle></CardHeader>
                <CardContent>
                  <code className="block rounded-md bg-muted px-3 py-2 text-lg font-bold">{classroom.inviteCode}</code>
                  <Button type="button" variant="outline" className="mt-3 w-full" onClick={copyInvite}>
                    <Copy className="h-4 w-4" /> Copy invite
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/20 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="min-w-0 truncate font-semibold">{value}</span>
    </div>
  );
}

function classColor(color: Classroom["color"]) {
  switch (color) {
    case "emerald":
      return "bg-emerald-500";
    case "rose":
      return "bg-rose-500";
    case "sky":
      return "bg-sky-500";
    default:
      return "bg-primary";
  }
}
