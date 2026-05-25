"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Copy, Plus, School, UsersRound } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMyClassrooms } from "@/services/classroomService";
import { useLearningStore } from "@/hooks/useLearningStore";
import type { Classroom } from "@/types/classroom";
import { cn } from "@/lib/utils";

export default function ClassesPage() {
  const user = useLearningStore((state) => state.user);
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    async function load() {
      setLoading(true);
      const result = await fetchMyClassrooms(user!);
      if (!active) return;
      setClasses(result);
      setLoading(false);
    }
    void load();
    return () => {
      active = false;
    };
  }, [user]);

  return (
    <AppLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <section className="rounded-2xl border bg-gradient-to-br from-card via-card to-primary/10 p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge className="gap-2"><School className="h-3.5 w-3.5" /> Classroom beta</Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Create classes and invite students</h1>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                Keep the built-in CE course tracker intact while adding instructor-owned classrooms for custom PDFs, invite codes, and student analytics.
              </p>
            </div>
            <Button asChild size="lg"><Link href="/classes/create" prefetch={false}><Plus className="h-5 w-5" /> Create class</Link></Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <InfoCard title="Create" value="New class space" description="Set name, course code, term, and class identity." />
          <InfoCard title="Invite" value="Share code" description="Students will join with a generated invite code." />
          <InfoCard title="Analyze" value="Coming next" description="Track PDF progress and active study time per student." />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">My classes</h2>
              <p className="text-sm text-muted-foreground">Classes you created appear here. Student join flow comes next.</p>
            </div>
          </div>
          {loading ? (
            <Card><CardContent className="p-6 text-sm text-muted-foreground">Loading classes...</CardContent></Card>
          ) : classes.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {classes.map((classroom) => <ClassCard key={classroom.id} classroom={classroom} />)}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="grid gap-4 p-8 text-center sm:place-items-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <UsersRound className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">No custom classes yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Create your first classroom without changing the default course pages.</p>
                </div>
                <Button asChild><Link href="/classes/create" prefetch={false}>Create class <ArrowRight className="h-4 w-4" /></Link></Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

function InfoCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-5">
        <p className="text-sm font-semibold text-primary">{title}</p>
        <p className="mt-2 text-xl font-bold">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function ClassCard({ classroom }: { classroom: Classroom }) {
  const copyInvite = async () => {
    await navigator.clipboard?.writeText(classroom.inviteCode);
  };
  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_45px_rgba(2,6,23,0.14)]">
      <div className={cn("absolute inset-x-0 top-0 h-1", classColor(classroom.color))} />
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge>{classroom.code}</Badge>
            <CardTitle className="mt-3">{classroom.name}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{classroom.term}</p>
          </div>
          <span className={cn("grid h-11 w-11 place-items-center rounded-xl text-white", classColor(classroom.color))}>
            <School className="h-5 w-5" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-muted-foreground">{classroom.description || "Instructor-owned classroom for custom course materials."}</p>
        <div className="rounded-lg border bg-muted/20 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Invite code</p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <code className="rounded-md bg-background px-2 py-1 text-sm font-bold">{classroom.inviteCode}</code>
            <Button type="button" variant="outline" size="sm" onClick={copyInvite}><Copy className="h-4 w-4" /> Copy</Button>
          </div>
        </div>
      </CardContent>
    </Card>
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
