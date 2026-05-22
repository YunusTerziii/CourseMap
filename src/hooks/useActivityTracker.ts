"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLearningStore } from "@/hooks/useLearningStore";
import { recordActiveSeconds, startUserSession, updateUserSession, upsertTrackedUser } from "@/services/adminTrackingService";

const heartbeatMs = 60000;

export function useActivityTracker() {
  const pathname = usePathname();
  const user = useLearningStore((state) => state.user);
  const sessionIdRef = useRef<string | null>(null);
  const pathRef = useRef(pathname);
  const userRef = useRef(user);
  const lastLessonTickRef = useRef<number | null>(null);
  const pendingLessonSecondsRef = useRef(0);
  const pendingWeekIdRef = useRef<string | undefined>(undefined);

  const startLessonTickIfNeeded = useCallback(() => {
    const weekId = getWeekIdFromPath(pathRef.current);
    if (!weekId || document.visibilityState !== "visible") {
      lastLessonTickRef.current = null;
      return;
    }
    pendingWeekIdRef.current = weekId;
    lastLessonTickRef.current = Date.now();
  }, []);

  const collectPendingLessonSeconds = useCallback(() => {
    const weekId = getWeekIdFromPath(pathRef.current);
    const startedAt = lastLessonTickRef.current;
    if (!weekId || !startedAt) return;
    const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
    if (elapsedSeconds <= 0) return;
    pendingWeekIdRef.current = weekId;
    pendingLessonSecondsRef.current += elapsedSeconds;
    lastLessonTickRef.current = Date.now();
  }, []);

  const flushLessonSeconds = useCallback(() => {
    collectPendingLessonSeconds();
    const user = userRef.current;
    const sessionId = sessionIdRef.current;
    const weekId = pendingWeekIdRef.current;
    const seconds = pendingLessonSecondsRef.current;
    if (!user || !sessionId || !weekId || seconds <= 0) return;
    pendingLessonSecondsRef.current = 0;
    void recordActiveSeconds(user, sessionId, seconds, pathRef.current, weekId);
  }, [collectPendingLessonSeconds]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    flushLessonSeconds();
    pathRef.current = pathname;
    startLessonTickIfNeeded();
    if (!user || !sessionIdRef.current) return;
    void updateUserSession(sessionIdRef.current, {
      pageViewsDelta: 1,
      lastPath: getWeekIdFromPath(pathname) ? pathname : undefined
    });
  }, [flushLessonSeconds, pathname, startLessonTickIfNeeded, user]);

  useEffect(() => {
    if (!user) return;
    const trackedUser = user;
    let cancelled = false;

    async function start() {
      await upsertTrackedUser(trackedUser, { lastActiveAt: new Date().toISOString() });
      const sessionId = await startUserSession(trackedUser, pathRef.current);
      if (cancelled) return;
      sessionIdRef.current = sessionId;
    }

    void start();

    const interval = window.setInterval(() => {
      flushLessonSeconds();
      startLessonTickIfNeeded();
    }, heartbeatMs);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushLessonSeconds();
        lastLessonTickRef.current = null;
        return;
      }
      startLessonTickIfNeeded();
    };

    const endSession = () => {
      flushLessonSeconds();
      const sessionId = sessionIdRef.current;
      if (!sessionId) return;
      void updateUserSession(sessionId, {
        endedAt: new Date().toISOString(),
        lastPath: getWeekIdFromPath(pathRef.current) ? pathRef.current : undefined
      });
    };
    startLessonTickIfNeeded();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", endSession);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", endSession);
      endSession();
      sessionIdRef.current = null;
    };
  }, [flushLessonSeconds, startLessonTickIfNeeded, user]);
}

function getWeekIdFromPath(path: string) {
  const match = path.match(/^\/weeks\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}
