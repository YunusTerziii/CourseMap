"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, School, Sparkles } from "lucide-react";
import Link from "next/link";
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClassroom } from "@/services/classroomService";
import { useLearningStore } from "@/hooks/useLearningStore";
import type { Classroom } from "@/types/classroom";
import { cn } from "@/lib/utils";

const colors: Array<{ value: Classroom["color"]; label: string; className: string }> = [
  { value: "violet", label: "Violet", className: "bg-primary" },
  { value: "emerald", label: "Emerald", className: "bg-emerald-500" },
  { value: "rose", label: "Rose", className: "bg-rose-500" },
  { value: "sky", label: "Sky", className: "bg-sky-500" }
];

export default function CreateClassPage() {
  const router = useRouter();
  const user = useLearningStore((state) => state.user);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [term, setTerm] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<Classroom["color"]>("violet");
  const [error, setError] = useState("");
  const [createdClass, setCreatedClass] = useState<Classroom | null>(null);
  const [saving, setSaving] = useState(false);

  const canSubmit = name.trim().length >= 3 && code.trim().length >= 2 && term.trim().length >= 2 && !saving;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    if (!canSubmit) {
      setError("Class name, course code, and term are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const classroom = await createClassroom({ name, code, description, term, color }, user);
      setCreatedClass(classroom);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Class could not be created.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
        <Button asChild variant="ghost" className="px-0"><Link href="/classes" prefetch={false}><ArrowLeft className="h-4 w-4" /> Back to classes</Link></Button>
        <section className="rounded-2xl border bg-gradient-to-br from-card via-card to-primary/10 p-6 shadow-sm sm:p-8">
          <Badge className="gap-2"><Sparkles className="h-3.5 w-3.5" /> Class setup</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Create a classroom</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Start with the class identity. In the next step this class will receive PDF materials, student membership, and instructor analytics.
          </p>
        </section>

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <Card>
            <CardHeader><CardTitle>Class information</CardTitle></CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={submit}>
                <Field label="Class name" value={name} onChange={setName} placeholder="CE103 Algorithms and Programming I" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Course code" value={code} onChange={setCode} placeholder="CE103" />
                  <Field label="Term" value={term} onChange={setTerm} placeholder="Spring 2026" />
                </div>
                <label className="block">
                  <span className="text-sm font-semibold">Description</span>
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={4}
                    placeholder="Weekly PDF materials, page completion tracking, and student progress analytics."
                    className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <div>
                  <p className="text-sm font-semibold">Class color</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {colors.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setColor(item.value)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border p-3 text-sm font-semibold transition hover:bg-muted",
                          color === item.value && "border-primary bg-primary/10"
                        )}
                      >
                        <span className={cn("h-4 w-4 rounded-full", item.className)} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
                {error ? <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
                <Button type="submit" disabled={!canSubmit} className="w-full sm:w-auto">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <School className="h-4 w-4" />}
                  Create class
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader><CardTitle>Invite preview</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className={cn("grid h-14 w-14 place-items-center rounded-2xl text-white", colors.find((item) => item.value === color)?.className)}>
                <School className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xl font-bold">{name || "Class name"}</p>
                <p className="text-sm text-muted-foreground">{code || "COURSE"} - {term || "Term"}</p>
              </div>
              <p className="text-sm text-muted-foreground">After creation, CourseMap generates an invite code that students can use to join this class.</p>
              {createdClass ? (
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Created invite code</p>
                  <code className="mt-2 block rounded-md bg-background px-3 py-2 text-lg font-bold">{createdClass.inviteCode}</code>
                  <Button type="button" className="mt-3 w-full" onClick={() => router.push("/classes")}>View class list</Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
