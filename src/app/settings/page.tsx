"use client";

import { Bell, Download, LogOut, Palette, RotateCcw, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/app-layout";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLearningStore } from "@/hooks/useLearningStore";

export default function SettingsPage() {
  const router = useRouter();
  const resetProgress = useLearningStore((state) => state.resetProgress);
  const clearUser = useLearningStore((state) => state.signOut);
  const state = useLearningStore();
  const exportProgress = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "coursemap-progress.json";
    link.click();
    URL.revokeObjectURL(url);
  };
  const signOut = async () => {
    const { logoutUser } = await import("@/services/authService");
    await logoutUser();
    clearUser();
    router.push("/login");
  };
  return (
    <AppLayout>
      <div className="space-y-4 p-4 sm:p-6">
        <section className="rounded-2xl border bg-gradient-to-br from-card via-card to-primary/10 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><Settings2 className="h-6 w-6" /></span>
            <div>
              <p className="text-sm font-semibold text-primary">Workspace settings</p>
              <h1 className="text-3xl font-bold tracking-tight">Preferences and account</h1>
            </div>
          </div>
        </section>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="transition hover:-translate-y-0.5 hover:shadow-md"><CardHeader><CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary" /> Theme</CardTitle></CardHeader><CardContent className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Dark mode / light mode</span><ThemeToggle /></CardContent></Card>
          <Card className="transition hover:-translate-y-0.5 hover:shadow-md"><CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Course preferences</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-muted-foreground"><label className="flex items-center gap-2 rounded-lg border bg-muted/20 p-3"><input type="checkbox" defaultChecked /> Show original PDF links</label><label className="flex items-center gap-2 rounded-lg border bg-muted/20 p-3"><input type="checkbox" /> Enable notification reminders</label></CardContent></Card>
          <Card className="transition hover:-translate-y-0.5 hover:shadow-md"><CardHeader><CardTitle>Progress data</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-3"><Button variant="outline" onClick={exportProgress}><Download className="h-4 w-4" /> Export progress</Button><Button variant="destructive" onClick={resetProgress}><RotateCcw className="h-4 w-4" /> Reset progress</Button></CardContent></Card>
          <Card className="transition hover:-translate-y-0.5 hover:shadow-md"><CardHeader><CardTitle>Account</CardTitle></CardHeader><CardContent><Button variant="outline" onClick={signOut}><LogOut className="h-4 w-4" /> Sign out</Button></CardContent></Card>
        </div>
      </div>
    </AppLayout>
  );
}
