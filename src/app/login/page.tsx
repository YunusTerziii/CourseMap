"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLearningStore } from "@/hooks/useLearningStore";
import { firebaseAuthReady, loginUser, sendPasswordReset } from "@/services/authService";
import { fetchUserLearningSnapshot } from "@/services/adminTrackingService";
import { withTimeout } from "@/lib/async";

export default function LoginPage() {
  const router = useRouter();
  const hydrateUser = useLearningStore((state) => state.hydrateUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const submit = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      const snapshot = await withTimeout(fetchUserLearningSnapshot(user.id), 15000, undefined);
      hydrateUser(user, snapshot);
      router.push(user.emailVerified ? "/dashboard" : "/verify-email");
    } catch (event) {
      setError(event instanceof Error ? event.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setError("");
    setMessage("");
    if (!email.trim()) {
      setError("Sifre sifirlama maili icin once email adresini yaz.");
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordReset(email);
      setMessage("Sifre sifirlama baglantisi email adresine gonderildi.");
    } catch (event) {
      setError(event instanceof Error ? event.message : "Password reset failed");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <GraduationCap className="mx-auto h-10 w-10 text-primary" />
          <CardTitle>Login to CourseMap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input className="w-full rounded-md border bg-background px-3 py-2" value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Email" placeholder="Email" type="email" />
          <input className="w-full rounded-md border bg-background px-3 py-2" value={password} onChange={(event) => setPassword(event.target.value)} aria-label="Password" placeholder="Password" type="password" />
          {!firebaseAuthReady() ? <p className="rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-200">Firebase Auth env degerleri eksik. Gercek login icin Vercel env ayarlarini ekle.</p> : null}
          {error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
          {message ? <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-200">{message}</p> : null}
          <Button className="w-full" onClick={submit} disabled={loading}>{loading ? "Signing in..." : "Continue"}</Button>
          <button type="button" onClick={resetPassword} disabled={resetLoading} className="w-full text-center text-sm font-medium text-primary transition hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-60">
            {resetLoading ? "Gonderiliyor..." : "Sifremi unuttum"}
          </button>
          <p className="text-center text-sm text-muted-foreground">Firebase Email/Password Auth kullanilir.</p>
          <p className="text-center text-sm"><Link href="/register" className="text-primary">Create account</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
