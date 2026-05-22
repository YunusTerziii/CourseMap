"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppUser } from "@/types/user";
import type { ChecklistProgress, FavoritePage, UserNotes } from "@/types/progress";
import { recordActivity, upsertTrackedUser } from "@/services/adminTrackingService";
import { defaultCourseId } from "@/data/courses";

interface LearningState {
  user: AppUser | null;
  currentCourseId: string;
  checklist: ChecklistProgress[];
  favoritePages: FavoritePage[];
  lastReadPages: Record<string, number>;
  notes: Record<string, UserNotes>;
  authReady: boolean;
  signIn: (email: string, name?: string) => void;
  setCurrentCourseId: (courseId: string) => void;
  setUser: (user: AppUser | null) => void;
  setAuthReady: (ready: boolean) => void;
  hydrateUser: (user: AppUser, snapshot?: Partial<Pick<LearningState, "checklist" | "favoritePages" | "lastReadPages" | "currentCourseId">>) => void;
  signOut: () => void;
  toggleChecklist: (weekId: string, sectionId: string, checklistItemId: string) => void;
  toggleFavoritePage: (weekId: string, page: number, title: string) => void;
  setLastReadPage: (weekId: string, page: number) => void;
  saveNotes: (weekId: string, notes: Omit<UserNotes, "userId" | "weekId" | "updatedAt">) => void;
  resetProgress: () => void;
}

function mergeChecklist(local: ChecklistProgress[], remote: ChecklistProgress[]) {
  const map = new Map<string, ChecklistProgress>();
  for (const item of local) map.set(`${item.weekId}:${item.sectionId}:${item.checklistItemId}`, item);
  for (const item of remote) map.set(`${item.weekId}:${item.sectionId}:${item.checklistItemId}`, item);
  return Array.from(map.values()).filter((item) => item.isCompleted);
}

function mergeFavoritePages(local: FavoritePage[], remote: FavoritePage[]) {
  const map = new Map<string, FavoritePage>();
  for (const item of local) map.set(`${item.weekId}:${item.page}`, item);
  for (const item of remote) map.set(`${item.weekId}:${item.page}`, item);
  return Array.from(map.values());
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      user: null,
      currentCourseId: defaultCourseId,
      authReady: false,
      checklist: [],
      favoritePages: [],
      lastReadPages: {},
      notes: {},
      signIn: (email, name) =>
        set({
          user: {
            id: email.toLowerCase(),
            name: name || email.split("@")[0],
            email,
            role: "Computer Engineering Student",
            createdAt: new Date().toISOString()
          }
        }),
      setUser: (user) => set({ user }),
      setCurrentCourseId: (courseId) => {
        set({ currentCourseId: courseId });
        const user = get().user;
        if (user) void upsertTrackedUser(user, { currentCourseId: courseId });
      },
      setAuthReady: (ready) => set({ authReady: ready }),
      hydrateUser: (user, snapshot) => {
        const currentUser = get().user;
        const userChanged = currentUser?.id !== user.id;
        const current = get();
        set({
          user,
          authReady: true,
          checklist: snapshot?.checklist
            ? mergeChecklist(userChanged ? [] : current.checklist, snapshot.checklist)
            : userChanged
              ? []
              : current.checklist,
          favoritePages: snapshot?.favoritePages
            ? mergeFavoritePages(userChanged ? [] : current.favoritePages, snapshot.favoritePages)
            : userChanged
              ? []
              : current.favoritePages,
          lastReadPages: snapshot?.lastReadPages
            ? { ...(userChanged ? {} : current.lastReadPages), ...snapshot.lastReadPages }
            : userChanged
              ? {}
              : current.lastReadPages,
          currentCourseId: snapshot?.currentCourseId ?? current.currentCourseId,
          notes: userChanged ? {} : current.notes
        });
      },
      signOut: () => set({ user: null }),
      toggleChecklist: (weekId, sectionId, checklistItemId) => {
        const existing = get().checklist;
        const index = existing.findIndex(
          (item) => item.weekId === weekId && item.sectionId === sectionId && item.checklistItemId === checklistItemId
        );
        if (index >= 0) {
          const next = [...existing];
          next[index] = {
            ...next[index],
            isCompleted: !next[index].isCompleted,
            completedAt: !next[index].isCompleted ? new Date().toISOString() : undefined
          };
          set({ checklist: next });
          const user = get().user;
          if (user) {
            void upsertTrackedUser(user, { completedChecklist: next.filter((item) => item.isCompleted), currentCourseId: get().currentCourseId });
            void recordActivity(user, next[index].isCompleted ? "checklist_completed" : "checklist_uncompleted", {
              weekId,
              metadata: { sectionId, checklistItemId }
            });
          }
          return;
        }
        const next = [
          ...existing,
          { weekId, sectionId, checklistItemId, isCompleted: true, completedAt: new Date().toISOString() }
        ];
        set({ checklist: next });
        const user = get().user;
        if (user) {
          void upsertTrackedUser(user, { completedChecklist: next.filter((item) => item.isCompleted), currentCourseId: get().currentCourseId });
          void recordActivity(user, "checklist_completed", { weekId, metadata: { sectionId, checklistItemId } });
        }
      },
      toggleFavoritePage: (weekId, page, title) => {
        const existing = get().favoritePages ?? [];
        const exists = existing.some((item) => item.weekId === weekId && item.page === page);
        if (exists) {
          const next = existing.filter((item) => !(item.weekId === weekId && item.page === page));
          set({ favoritePages: next });
          const user = get().user;
          if (user) {
            void upsertTrackedUser(user, { favoritePages: next, currentCourseId: get().currentCourseId });
            void recordActivity(user, "favorite_removed", { weekId, page, metadata: { title } });
          }
          return;
        }
        const next = [
          ...existing,
          { weekId, page, title, createdAt: new Date().toISOString() }
        ];
        set({ favoritePages: next });
        const user = get().user;
        if (user) {
          void upsertTrackedUser(user, { favoritePages: next, currentCourseId: get().currentCourseId });
          void recordActivity(user, "favorite_added", { weekId, page, metadata: { title } });
        }
      },
      setLastReadPage: (weekId, page) => {
        if (!Number.isFinite(page) || page < 1) return;
        const current = get().lastReadPages ?? {};
        if (current[weekId] === page) return;
        const next = { ...current, [weekId]: page };
        set({ lastReadPages: next });
        const user = get().user;
        if (user) void upsertTrackedUser(user, { lastReadPages: next, currentCourseId: get().currentCourseId });
      },
      saveNotes: (weekId, notes) => {
        const user = get().user;
        if (!user) return;
        set({
          notes: {
            ...get().notes,
            [weekId]: { ...notes, userId: user.id, weekId, updatedAt: new Date().toISOString() }
          }
        });
        void recordActivity(user, "notes_saved", { weekId });
      },
      resetProgress: () => set({ checklist: [], favoritePages: [], lastReadPages: {}, notes: {} })
    }),
    { name: "coursemap-learning-state" }
  )
);
