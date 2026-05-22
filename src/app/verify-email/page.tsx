"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MailCheck } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLearningStore } from "@/hooks/useLearningStore";
import { reloadCurrentUser, sendVerificationEmail } from "@/services/authService";
import { fetchUserLearningSnapshot } from "@/services/adminTrackingService";

export default function VerifyEmailPage() {
  const router = useRouter();
  const user = useLearningStore((state) => state.user);
  const hydrateUser = useLearningStore((state) => state.hydrateUser);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resend = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await sendVerificationEmail();
      setMessage("Doğrulama maili tekrar gönderildi. Gelen kutunu ve spam klasörünü kontrol et.");
    } catch (event) {
      setError(event instanceof Error ? event.message : "Mail gönderilemedi.");
    } finally {
      setLoading(false);
    }
  };

  const checkVerification = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const refreshed = await reloadCurrentUser();
      if (!refreshed) {
        router.push("/login");
        return;
      }
      const snapshot = await fetchUserLearningSnapshot(refreshed.id);
      hydrateUser(refreshed, snapshot);
      if (refreshed.emailVerified) {
        window.location.assign("/dashboard");
      } else {
        setMessage("Email henüz doğrulanmamış görünüyor. Linke tıkladıktan sonra tekrar kontrol et.");
      }
    } catch (event) {
      setError(event instanceof Error ? event.message : "Doğrulama kontrol edilemedi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="grid min-h-[calc(100vh-4rem)] place-items-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <MailCheck className="mx-auto h-12 w-12 text-primary" />
            <CardTitle>Email doğrulama gerekli</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              Devam etmek için <span className="font-semibold text-foreground">{user?.email}</span> adresine gönderilen doğrulama linkine tıkla.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button onClick={checkVerification} disabled={loading}>{loading ? "Kontrol ediliyor..." : "Doğruladım, kontrol et"}</Button>
              <Button variant="outline" onClick={resend} disabled={loading}>Maili tekrar gönder</Button>
            </div>
            {message ? <p className="rounded-md border bg-muted p-3 text-sm text-muted-foreground">{message}</p> : null}
            {error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
