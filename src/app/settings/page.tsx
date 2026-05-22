"use client";

import { Download, RotateCcw } from "lucide-react";
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
      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Theme</CardTitle></CardHeader><CardContent className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Dark mode / light mode</span><ThemeToggle /></CardContent></Card>
        <Card><CardHeader><CardTitle>Course preferences</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-muted-foreground"><label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Show original PDF links</label><label className="flex items-center gap-2"><input type="checkbox" /> Enable notification reminders</label></CardContent></Card>
        <Card><CardHeader><CardTitle>Progress data</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-3"><Button variant="outline" onClick={exportProgress}><Download className="h-4 w-4" /> Export progress</Button><Button variant="destructive" onClick={resetProgress}><RotateCcw className="h-4 w-4" /> Reset progress</Button></CardContent></Card>
        <Card><CardHeader><CardTitle>Account</CardTitle></CardHeader><CardContent><Button variant="outline" onClick={signOut}>Sign out</Button></CardContent></Card>
      </div>
    </AppLayout>
  );
}
