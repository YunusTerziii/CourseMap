import type { ChecklistProgress, FavoritePage } from "@/types/progress";
import type { AppUser } from "@/types/user";

export type ActivityEventType =
  | "login"
  | "register"
  | "checklist_completed"
  | "checklist_uncompleted"
  | "favorite_added"
  | "favorite_removed"
  | "notes_saved";

export interface TrackedUser extends AppUser {
  lastLoginAt?: string;
  lastActiveAt?: string;
  totalActiveSeconds?: number;
  loginCount?: number;
  completedChecklist?: ChecklistProgress[];
  favoritePages?: FavoritePage[];
  lastReadPages?: Record<string, number>;
  weekActiveSeconds?: Record<string, number>;
  currentCourseId?: string;
}

export interface UserSession {
  id: string;
  userId: string;
  email: string;
  startedAt: string;
  endedAt?: string;
  lastActiveAt: string;
  activeSeconds: number;
  pageViews: number;
  actions: number;
  lastPath?: string;
}

export interface UserActivityEvent {
  id: string;
  userId: string;
  email: string;
  type: ActivityEventType;
  createdAt: string;
  path?: string;
  weekId?: string;
  page?: number;
  metadata?: Record<string, string | number | boolean | null>;
}
