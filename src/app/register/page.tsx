"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLearningStore } from "@/hooks/useLearningStore";
import { firebaseAuthReady, registerUser } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();
  const hydrateUser = useLearningStore((state) => state.hydrateUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    setLoading(true);
    try {
      const user = await registerUser(email, password, name);
      hydrateUser(user);
      router.push("/verify-email");
    } catch (event) {
      setError(event instanceof Error ? event.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle>Create student profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium">Full name</span>
            <input className="w-full rounded-md border bg-background px-3 py-2" value={name} onChange={(event) => setName(event.target.value)} aria-label="Full name" placeholder="Full name" />
          </label>
          <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
            <p className="text-xs text-muted-foreground">Role</p>
            <p className="font-medium">Computer Engineering Student</p>
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Email</span>
            <input className="w-full rounded-md border bg-background px-3 py-2" value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Email" placeholder="Email" type="email" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Password</span>
            <input className="w-full rounded-md border bg-background px-3 py-2" value={password} onChange={(event) => setPassword(event.target.value)} aria-label="Password" placeholder="Password" type="password" />
          </label>
          {!firebaseAuthReady() ? <p className="rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-200">Firebase Auth env değerleri eksik. Gerçek kayıt için Vercel env ayarlarını ekle.</p> : null}
          {error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
          <Button className="w-full" onClick={submit} disabled={loading}>{loading ? "Creating..." : "Create account"}</Button>
        </CardContent>
      </Card>
    </main>
  );
}
