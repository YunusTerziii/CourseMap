import { notFound } from "next/navigation";
import { getAllWeeks, getCourseForWeek, getWeekById } from "@/data/courses";
import { WeekDetailClient } from "@/components/weeks/week-detail-client";

export function generateStaticParams() {
  return getAllWeeks().map((week) => ({ weekId: week.id }));
}

export default function WeekDetailPage({
  params,
  searchParams
}: {
  params: { weekId: string };
  searchParams?: { page?: string };
}) {
  const week = getWeekById(params.weekId);
  if (!week) notFound();

  const course = getCourseForWeek(params.weekId);
  const weekNav = course.weeks.map((item) => ({
    id: item.id,
    weekNumber: item.weekNumber,
    title: item.title
  }));

  return <WeekDetailClient week={week} weekNav={weekNav} course={course} initialPageParam={searchParams?.page ?? null} />;
}
