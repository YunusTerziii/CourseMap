"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLearningStore } from "@/hooks/useLearningStore";

const fields = [
  ["generalNotes", "General Notes", "Bugün IP ve port farkını öğrendim..."],
  ["keyTakeaways", "Key Takeaways", "Bu haftadan aklımda kalması gerekenler..."],
  ["confusingTopics", "I don't understand yet", "DNS ile NAT ilişkisini tekrar etmeliyim..."],
  ["questionsForTeacher", "Questions for teacher", "Hocaya sormak istediğim soru..."]
] as const;

export function NotesEditor({ weekId }: { weekId: string }) {
  const stored = useLearningStore((state) => state.notes[weekId]);
  const saveNotes = useLearningStore((state) => state.saveNotes);
  const [draft, setDraft] = useState({
    generalNotes: stored?.generalNotes || "",
    keyTakeaways: stored?.keyTakeaways || "",
    confusingTopics: stored?.confusingTopics || "",
    questionsForTeacher: stored?.questionsForTeacher || ""
  });
  useEffect(() => {
    const timer = window.setTimeout(() => saveNotes(weekId, draft), 500);
    return () => window.clearTimeout(timer);
  }, [draft, saveNotes, weekId]);
  return (
    <Card id="notes">
      <CardHeader><CardTitle>Auto-saved notes</CardTitle></CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {fields.map(([key, label, placeholder]) => (
          <label key={key} className="space-y-2">
            <span className="text-sm font-semibold">{label}</span>
            <textarea className="min-h-32 w-full resize-y rounded-md border bg-background p-3 text-sm" value={draft[key]} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} placeholder={placeholder} />
          </label>
        ))}
      </CardContent>
    </Card>
  );
}
