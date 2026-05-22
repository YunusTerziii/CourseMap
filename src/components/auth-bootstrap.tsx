"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { useLearningStore } from "@/hooks/useLearningStore";
import { appUserFromFirebaseUser } from "@/services/authService";
import { fetchUserLearningSnapshot } from "@/services/adminTrackingService";
import { withTimeout } from "@/lib/async";

export function AuthBootstrap() {
  const hydrateUser = useLearningStore((state) => state.hydrateUser);
  const setUser = useLearningStore((state) => state.setUser);
  const setAuthReady = useLearningStore((state) => state.setAuthReady);

  useEffect(() => {
    if (!auth || !isFirebaseConfigured) {
      setUser(null);
      setAuthReady(true);
      return;
    }
    const firebaseAuth = auth;

    let currentUserId: string | null = null;

    const refreshSnapshot = async () => {
      const firebaseUser = firebaseAuth.currentUser;
      if (!firebaseUser) return;
      const user = appUserFromFirebaseUser(firebaseUser);
      const snapshot = await withTimeout(fetchUserLearningSnapshot(user.id), 15000, undefined);
      hydrateUser(user, snapshot);
    };

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (!firebaseUser) {
        currentUserId = null;
        setUser(null);
        setAuthReady(true);
        return;
      }

      const user = appUserFromFirebaseUser(firebaseUser);
      currentUserId = user.id;
      const snapshot = await withTimeout(fetchUserLearningSnapshot(user.id), 15000, undefined);
      hydrateUser(user, snapshot);
    });

    const onFocus = () => {
      if (currentUserId) void refreshSnapshot();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && currentUserId) void refreshSnapshot();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      unsubscribe();
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [hydrateUser, setAuthReady, setUser]);

  return null;
}
