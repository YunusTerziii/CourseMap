export type WeekStatus = "Not Started" | "In Progress" | "Completed";

export interface ChecklistProgress {
  weekId: string;
  sectionId: string;
  checklistItemId: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface FavoritePage {
  weekId: string;
  page: number;
  title: string;
  createdAt: string;
}

export interface WeekProgress {
  userId: string;
  weekId: string;
  progressPercentage: number;
  status: WeekStatus;
  lastStudiedAt?: string;
  completedAt?: string;
}

export interface UserNotes {
  userId: string;
  weekId: string;
  generalNotes: string;
  keyTakeaways: string;
  confusingTopics: string;
  questionsForTeacher: string;
  updatedAt: string;
}
