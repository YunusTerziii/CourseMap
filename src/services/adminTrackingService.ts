"use client";

import type { ActivityEventType, TrackedUser, UserActivityEvent, UserSession } from "@/types/admin";
import type { ChecklistProgress, FavoritePage } from "@/types/progress";
import type { AppUser } from "@/types/user";

const usersKey = "coursemap-admin-users";
const sessionsKey = "coursemap-admin-sessions";
const eventsKey = "coursemap-admin-events";

export function isAdminEmail(email?: string | null) {
  const admins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "admin@coursemap.dev")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(email && admins.includes(email.toLowerCase()));
}

export async function trackAuthEvent(user: AppUser, type: "login" | "register") {
  const now = new Date().toISOString();
  await upsertTrackedUser(user, { lastLoginAt: now, lastActiveAt: now, loginCountDelta: 1 });
  await recordActivity(user, type, { metadata: { role: user.role } });
}

export async function upsertTrackedUser(
  user: AppUser,
  options: {
    lastLoginAt?: string;
    lastActiveAt?: string;
    loginCountDelta?: number;
    activeSecondsDelta?: number;
    weekActiveSecondsDelta?: { weekId: string; seconds: number };
    completedChecklist?: ChecklistProgress[];
    favoritePages?: FavoritePage[];
    lastReadPages?: Record<string, number>;
    currentCourseId?: string;
  } = {}
) {
  const existing = getLocalUsers();
  const current = existing.find((item) => item.id === user.id);
  const next: TrackedUser = {
    ...current,
    ...user,
    lastLoginAt: options.lastLoginAt ?? current?.lastLoginAt,
    lastActiveAt: options.lastActiveAt ?? current?.lastActiveAt,
    totalActiveSeconds: (current?.totalActiveSeconds ?? 0) + (options.activeSecondsDelta ?? 0),
    loginCount: (current?.loginCount ?? 0) + (options.loginCountDelta ?? 0),
    completedChecklist: options.completedChecklist ?? current?.completedChecklist ?? [],
    favoritePages: options.favoritePages ?? current?.favoritePages ?? [],
    lastReadPages: options.lastReadPages ?? current?.lastReadPages ?? {},
    weekActiveSeconds: options.weekActiveSecondsDelta
      ? {
          ...(current?.weekActiveSeconds ?? {}),
          [options.weekActiveSecondsDelta.weekId]: (current?.weekActiveSeconds?.[options.weekActiveSecondsDelta.weekId] ?? 0) + options.weekActiveSecondsDelta.seconds
        }
      : current?.weekActiveSeconds ?? {},
    currentCourseId: options.currentCourseId ?? current?.currentCourseId
  };
  setLocalUsers([next, ...existing.filter((item) => item.id !== user.id)]);

  const firestore = await getFirestoreContext();
  if (!firestore) return;
  const { db, doc, increment, serverTimestamp, setDoc } = firestore;
  const payload: Record<string, unknown> = {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified ?? false,
    role: user.role,
    avatarUrl: user.avatarUrl ?? null,
    createdAt: user.createdAt,
    updatedAt: serverTimestamp()
  };
  if (options.lastLoginAt) payload.lastLoginAt = options.lastLoginAt;
  if (options.lastActiveAt) payload.lastActiveAt = options.lastActiveAt;
  if (options.completedChecklist) payload.completedChecklist = options.completedChecklist;
  if (options.favoritePages) payload.favoritePages = options.favoritePages;
  if (options.lastReadPages) payload.lastReadPages = options.lastReadPages;
  if (options.currentCourseId) payload.currentCourseId = options.currentCourseId;
  if (options.loginCountDelta) payload.loginCount = increment(options.loginCountDelta);
  if (options.activeSecondsDelta) payload.totalActiveSeconds = increment(options.activeSecondsDelta);
  if (options.weekActiveSecondsDelta) {
    payload.weekActiveSeconds = {
      [options.weekActiveSecondsDelta.weekId]: increment(options.weekActiveSecondsDelta.seconds)
    };
  }
  try {
    await setDoc(doc(db, "users", user.id), payload, { merge: true });
  } catch (error) {
    console.warn("CourseMap Firestore user write failed; local progress was kept.", error);
  }
}

export async function startUserSession(user: AppUser, path: string) {
  const now = new Date().toISOString();
  const localSession: UserSession = {
    id: createId("session"),
    userId: user.id,
    email: user.email,
    startedAt: now,
    lastActiveAt: now,
    activeSeconds: 0,
    pageViews: 1,
    actions: 0,
    lastPath: path
  };
  setLocalSessions([localSession, ...getLocalSessions()]);

  const firestore = await getFirestoreContext();
  if (!firestore) return localSession.id;
  const { addDoc, collection, db, serverTimestamp } = firestore;
  try {
    const ref = await addDoc(collection(db, "userSessions"), {
      userId: user.id,
      email: user.email,
      startedAt: now,
      lastActiveAt: now,
      activeSeconds: 0,
      pageViews: 1,
      actions: 0,
      lastPath: path,
      createdAt: serverTimestamp()
    });
    return ref.id;
  } catch (error) {
    console.warn("CourseMap Firestore session write failed; local session was kept.", error);
    return localSession.id;
  }
}

export async function updateUserSession(
  sessionId: string,
  patch: Partial<Pick<UserSession, "activeSeconds" | "pageViews" | "actions" | "lastPath" | "endedAt">> & { activeSecondsDelta?: number; actionsDelta?: number; pageViewsDelta?: number }
) {
  const now = new Date().toISOString();
  const sessions = getLocalSessions();
  setLocalSessions(
    sessions.map((item) =>
      item.id === sessionId
        ? {
            ...item,
            activeSeconds: patch.activeSeconds ?? item.activeSeconds + (patch.activeSecondsDelta ?? 0),
            pageViews: patch.pageViews ?? item.pageViews + (patch.pageViewsDelta ?? 0),
            actions: patch.actions ?? item.actions + (patch.actionsDelta ?? 0),
            lastPath: patch.lastPath ?? item.lastPath,
            endedAt: patch.endedAt ?? item.endedAt,
            lastActiveAt: now
          }
        : item
    )
  );

  const firestore = await getFirestoreContext();
  if (!firestore) return;
  const { db, doc, increment, serverTimestamp, updateDoc } = firestore;
  const payload: Record<string, unknown> = { lastActiveAt: now, updatedAt: serverTimestamp() };
  if (patch.activeSecondsDelta) payload.activeSeconds = increment(patch.activeSecondsDelta);
  if (patch.actionsDelta) payload.actions = increment(patch.actionsDelta);
  if (patch.pageViewsDelta) payload.pageViews = increment(patch.pageViewsDelta);
  if (patch.lastPath) payload.lastPath = patch.lastPath;
  if (patch.endedAt) payload.endedAt = patch.endedAt;
  try {
    await updateDoc(doc(db, "userSessions", sessionId), payload);
  } catch (error) {
    console.warn("CourseMap Firestore session update failed; local session was kept.", error);
  }
}

export async function recordActiveSeconds(user: AppUser, sessionId: string, seconds: number, path: string, weekId?: string) {
  const now = new Date().toISOString();
  await upsertTrackedUser(user, {
    activeSecondsDelta: seconds,
    lastActiveAt: now,
    weekActiveSecondsDelta: weekId ? { weekId, seconds } : undefined
  });
  await updateUserSession(sessionId, { activeSecondsDelta: seconds, lastPath: path });
}

export async function recordActivity(
  user: AppUser,
  type: ActivityEventType,
  options: {
    path?: string;
    weekId?: string;
    page?: number;
    metadata?: Record<string, string | number | boolean | null>;
    sessionId?: string;
  } = {}
) {
  const event: UserActivityEvent = {
    id: createId("event"),
    userId: user.id,
    email: user.email,
    type,
    createdAt: new Date().toISOString(),
    path: options.path,
    weekId: options.weekId,
    page: options.page,
    metadata: options.metadata
  };
  setLocalEvents([event, ...getLocalEvents()].slice(0, 500));
  if (options.sessionId) await updateUserSession(options.sessionId, { actionsDelta: 1 });

  const firestore = await getFirestoreContext();
  if (!firestore) return;
  const { addDoc, collection, db, serverTimestamp } = firestore;
  try {
    await addDoc(collection(db, "userActivity"), {
      ...event,
      createdAt: event.createdAt,
      serverCreatedAt: serverTimestamp()
    });
  } catch (error) {
    console.warn("CourseMap Firestore activity write failed; local event was kept.", error);
  }
}

export async function fetchAdminDashboard() {
  const firestore = await getFirestoreContext();
  if (firestore) {
    const { collection, db, getDocs, limit, orderBy, query } = firestore;
    try {
      const [userSnap, sessionSnap, eventSnap] = await Promise.all([
        getDocs(query(collection(db, "users"), orderBy("lastActiveAt", "desc"), limit(200))),
        getDocs(query(collection(db, "userSessions"), orderBy("lastActiveAt", "desc"), limit(300))),
        getDocs(query(collection(db, "userActivity"), orderBy("createdAt", "desc"), limit(500)))
      ]);
      return {
        users: mergeUsers(
          getLocalUsers(),
          userSnap.docs.map((item) => ({ id: item.id, ...item.data() })) as TrackedUser[]
        ),
        sessions: mergeById(getLocalSessions(), sessionSnap.docs.map((item) => ({ id: item.id, ...item.data() })) as UserSession[]),
        events: mergeById(getLocalEvents(), eventSnap.docs.map((item) => ({ id: item.id, ...item.data() })) as UserActivityEvent[])
      };
    } catch (error) {
      console.warn("CourseMap Firestore admin read failed; showing local admin data.", error);
    }
  }

  return {
    users: getLocalUsers(),
    sessions: getLocalSessions(),
    events: getLocalEvents()
  };
}

export async function fetchUserLearningSnapshot(userId: string) {
  const localUser = getLocalUsers().find((user) => user.id === userId);
  const localSnapshot = {
    checklist: localUser?.completedChecklist ?? [],
    favoritePages: localUser?.favoritePages ?? [],
    lastReadPages: localUser?.lastReadPages ?? {},
    currentCourseId: localUser?.currentCourseId
  };
  const firestore = await getFirestoreContext();
  if (!firestore) {
    return localSnapshot;
  }

  const { db, doc, getDoc } = firestore;
  try {
    const snapshot = await getDoc(doc(db, "users", userId));
    const data = snapshot.exists() ? (snapshot.data() as TrackedUser) : undefined;
    return {
      checklist: mergeChecklist(localSnapshot.checklist, data?.completedChecklist ?? []),
      favoritePages: mergeFavoritePages(localSnapshot.favoritePages, data?.favoritePages ?? []),
      lastReadPages: { ...localSnapshot.lastReadPages, ...(data?.lastReadPages ?? {}) },
      currentCourseId: data?.currentCourseId ?? localSnapshot.currentCourseId
    };
  } catch (error) {
    console.warn("CourseMap Firestore progress read failed; using local progress.", error);
    return localSnapshot;
  }
}

async function getFirestoreContext() {
  const [{ db, isFirebaseConfigured }, firestore] = await Promise.all([
    import("@/lib/firebase"),
    import("firebase/firestore")
  ]);
  if (!db || !isFirebaseConfigured) return null;
  return { db, ...firestore };
}

function getLocalUsers() {
  return readLocal<TrackedUser[]>(usersKey, []);
}

function setLocalUsers(users: TrackedUser[]) {
  writeLocal(usersKey, users);
}

function getLocalSessions() {
  return readLocal<UserSession[]>(sessionsKey, []);
}

function setLocalSessions(sessions: UserSession[]) {
  writeLocal(sessionsKey, sessions.slice(0, 500));
}

function getLocalEvents() {
  return readLocal<UserActivityEvent[]>(eventsKey, []);
}

function setLocalEvents(events: UserActivityEvent[]) {
  writeLocal(eventsKey, events);
}

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function mergeUsers(localUsers: TrackedUser[], remoteUsers: TrackedUser[]) {
  const map = new Map<string, TrackedUser>();
  for (const user of localUsers) map.set(user.id, user);
  for (const user of remoteUsers) {
    const local = map.get(user.id);
    map.set(user.id, local ? { ...local, ...user } : user);
  }
  return Array.from(map.values()).sort((a, b) => String(b.lastActiveAt ?? "").localeCompare(String(a.lastActiveAt ?? "")));
}

function mergeById<T extends { id: string }>(localItems: T[], remoteItems: T[]) {
  const map = new Map<string, T>();
  for (const item of localItems) map.set(item.id, item);
  for (const item of remoteItems) map.set(item.id, item);
  return Array.from(map.values());
}

function mergeChecklist(localItems: ChecklistProgress[], remoteItems: ChecklistProgress[]) {
  const map = new Map<string, ChecklistProgress>();
  for (const item of localItems) map.set(`${item.weekId}:${item.sectionId}:${item.checklistItemId}`, item);
  for (const item of remoteItems) map.set(`${item.weekId}:${item.sectionId}:${item.checklistItemId}`, item);
  return Array.from(map.values()).filter((item) => item.isCompleted);
}

function mergeFavoritePages(localItems: FavoritePage[], remoteItems: FavoritePage[]) {
  const map = new Map<string, FavoritePage>();
  for (const item of localItems) map.set(`${item.weekId}:${item.page}`, item);
  for (const item of remoteItems) map.set(`${item.weekId}:${item.page}`, item);
  return Array.from(map.values()).sort((a, b) => a.weekId.localeCompare(b.weekId) || a.page - b.page);
}
