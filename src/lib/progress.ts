import type { WeekContent } from "@/types/week";
import type { ChecklistProgress, WeekStatus } from "@/types/progress";
import { pdfPageCounts } from "@/data/pdf-page-counts";

const pdfPageSectionId = "pdf-pages";

function pageChecklistId(page: number) {
  return `page-${page}`;
}

export function getWeekChecklistTotal(week: WeekContent) {
  const pageCount = pdfPageCounts[week.id];
  if (pageCount) return pageCount;
  return week.sections.reduce((sum, section) => sum + section.checklist.length, 0);
}

export function getCompletedChecklistCount(week: WeekContent, progress: ChecklistProgress[]) {
  const pageCount = pdfPageCounts[week.id];
  if (pageCount) {
    const completedPages = new Set(
      progress
        .filter((item) => item.weekId === week.id && item.sectionId === pdfPageSectionId && item.isCompleted)
        .map((item) => item.checklistItemId)
    );
    let completed = 0;
    for (let page = 1; page <= pageCount; page += 1) {
      if (completedPages.has(pageChecklistId(page))) completed += 1;
    }
    return completed;
  }

  const keys = new Set(
    progress
      .filter((item) => item.weekId === week.id && item.isCompleted)
      .map((item) => `${item.sectionId}:${item.checklistItemId}`)
  );

  return week.sections.reduce(
    (sum, section) => sum + section.checklist.filter((item) => keys.has(`${section.id}:${item.id}`)).length,
    0
  );
}

export function getWeekProgressPercentage(week: WeekContent, progress: ChecklistProgress[]) {
  const total = getWeekChecklistTotal(week);
  if (!total) return 0;
  return Math.round((getCompletedChecklistCount(week, progress) / total) * 100);
}

export function getWeekStatus(percentage: number): WeekStatus {
  if (percentage <= 0) return "Not Started";
  if (percentage >= 100) return "Completed";
  return "In Progress";
}

export function getCourseProgress(weeks: WeekContent[], progress: ChecklistProgress[]) {
  const total = weeks.reduce((sum, week) => sum + getWeekChecklistTotal(week), 0);
  const completed = weeks.reduce((sum, week) => sum + getCompletedChecklistCount(week, progress), 0);
  return {
    total,
    completed,
    percentage: total ? Math.round((completed / total) * 100) : 0
  };
}
