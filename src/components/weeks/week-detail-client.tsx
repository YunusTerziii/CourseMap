"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Download, Heart, ListChecks, Maximize2, Minimize2, Minus, Plus, RotateCcw, Search } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { NotesEditor } from "@/components/notes-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLearningStore } from "@/hooks/useLearningStore";
import { cn } from "@/lib/utils";
import type { CourseContent, WeekContent } from "@/types/week";

export interface WeekNavItem {
  id: string;
  weekNumber: number;
  title: string;
}

interface PdfPageData {
  weekId: string;
  source: string;
  pageCount: number;
  pages: Array<{
    page: number;
    title: string;
    lines: string[];
    text: string;
  }>;
}

const pageSectionId = "pdf-pages";

export function WeekDetailClient({
  week,
  weekNav,
  course,
  initialPageParam
}: {
  week: WeekContent;
  weekNav: WeekNavItem[];
  course: CourseContent;
  initialPageParam: string | null;
}) {
  const checklist = useLearningStore((state) => state.checklist);
  const favoritePages = useLearningStore((state) => state.favoritePages ?? []);
  const lastReadPages = useLearningStore((state) => state.lastReadPages ?? {});
  const lastReadPage = lastReadPages[week.id];
  const lastReadPageRef = useRef(lastReadPage);
  const toggleChecklist = useLearningStore((state) => state.toggleChecklist);
  const toggleFavoritePage = useLearningStore((state) => state.toggleFavoritePage);
  const setLastReadPage = useLearningStore((state) => state.setLastReadPage);
  const setCurrentCourseId = useLearningStore((state) => state.setCurrentCourseId);
  const [data, setData] = useState<PdfPageData | null>(null);
  const [selectedPage, setSelectedPage] = useState(() => getInitialPage(initialPageParam, lastReadPage));
  const [query, setQuery] = useState("");

  useEffect(() => {
    setCurrentCourseId(course.id);
  }, [course.id, setCurrentCourseId]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, []);

  useEffect(() => {
    lastReadPageRef.current = lastReadPage;
  }, [lastReadPage]);

  useEffect(() => {
    let active = true;
    setData(null);
    setSelectedPage(getInitialPage(initialPageParam, lastReadPageRef.current));
    fetch(`/generated/pdf-pages/${week.id}.json`)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: PdfPageData | null) => {
        if (active) setData(payload);
      })
      .catch(() => {
        if (active) setData(null);
      });
    return () => {
      active = false;
    };
  }, [initialPageParam, week.id]);

  useEffect(() => {
    if (!data) return;
    setSelectedPage((page) => Math.min(Math.max(page, 1), data.pageCount));
  }, [data]);

  useEffect(() => {
    if (!data) return;
    setLastReadPage(week.id, selectedPage);
  }, [data, selectedPage, setLastReadPage, week.id]);

  const completedPages = useMemo(
    () => checklist.filter((item) => item.weekId === week.id && item.sectionId === pageSectionId && item.isCompleted).length,
    [checklist, week.id]
  );
  const pageCount = data?.pageCount ?? 0;
  const progress = pageCount ? Math.round((completedPages / pageCount) * 100) : 0;
  const currentPage = data?.pages.find((page) => page.page === selectedPage);
  const weekFavorites = useMemo(
    () => favoritePages.filter((item) => item.weekId === week.id).sort((a, b) => a.page - b.page),
    [favoritePages, week.id]
  );
  const normalizedQuery = query.trim().toLowerCase();
  const filteredPages = data
    ? normalizedQuery
      ? data.pages.filter((page) => `${page.page} ${page.title} ${page.text}`.toLowerCase().includes(normalizedQuery))
      : data.pages
    : [];

  const isPageDone = (page: number) =>
    checklist.some((item) => item.weekId === week.id && item.sectionId === pageSectionId && item.checklistItemId === pageId(page) && item.isCompleted);
  const isFavorite = (page: number) => weekFavorites.some((item) => item.page === page);

  const goToPage = (page: number) => {
    if (!data) return;
    setSelectedPage(Math.min(Math.max(page, 1), data.pageCount));
  };

  const completeAndContinue = () => {
    if (!data) return;
    if (!isPageDone(selectedPage)) {
      toggleChecklist(week.id, pageSectionId, pageId(selectedPage));
    }
    goToPage(selectedPage + 1);
  };

  return (
    <AppLayout>
      <div className="h-[calc(100dvh-8rem)] overflow-hidden bg-slate-100 dark:bg-slate-950 lg:h-[calc(100vh-4rem)]">
        <div className="grid h-full min-h-0 lg:grid-cols-[300px_minmax(0,1fr)_320px]">
          <aside className="hidden min-h-0 overflow-hidden border-b bg-background lg:block lg:border-b-0 lg:border-r">
            <div className="h-full overflow-auto p-4">
              <div className="rounded-md border bg-card p-4">
                <Badge>Week {week.weekNumber}</Badge>
                <h1 className="mt-3 text-lg font-semibold leading-6">{week.title}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{course.shortTitle}</p>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{completedPages}/{pageCount || "..."} sayfa</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              </div>

              <div className="mt-4 rounded-md border bg-card p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Haftalar</p>
                <div className="space-y-1">
                  {weekNav.map((item) => (
                    <Link
                      key={item.id}
                      href={`/weeks/${item.id}`}
                      prefetch={false}
                      className={`block rounded-md px-3 py-2 text-sm ${item.id === week.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    >
                      Week {item.weekNumber} - {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-md border bg-card p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Favoriler</p>
                {weekFavorites.length ? (
                  <div className="space-y-1">
                    {weekFavorites.map((favorite) => (
                      <button
                        key={`${favorite.weekId}-${favorite.page}`}
                        onClick={() => setSelectedPage(favorite.page)}
                        className={`flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-sm transition ${favorite.page === selectedPage ? "bg-rose-500/10 text-rose-500" : "hover:bg-muted"}`}
                      >
                        <Heart className={`mt-0.5 h-4 w-4 shrink-0 ${favorite.page === selectedPage ? "fill-rose-500" : "fill-rose-500 text-rose-500"}`} />
                        <span className="min-w-0">
                          <span className="block font-medium">Sayfa {favorite.page}</span>
                          <span className="line-clamp-2 text-xs text-muted-foreground">{favorite.title}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-md bg-muted/40 p-3 text-xs text-muted-foreground">Kalp butonuyla önemli sayfaları buraya ekleyebilirsin.</p>
                )}
              </div>

              <div className="mt-4 rounded-md border bg-card p-3">
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="PDF içinde ara"
                    className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>
                <div className="mt-3 max-h-[42vh] space-y-1 overflow-auto pr-1">
                  {filteredPages.map((page) => (
                    <button
                      key={page.page}
                      onClick={() => setSelectedPage(page.page)}
                      className={`flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-sm transition ${page.page === selectedPage ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                    >
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border text-[10px] ${isPageDone(page.page) ? "border-emerald-500 bg-emerald-500 text-white" : "border-border"}`}>
                        {isPageDone(page.page) ? <Check className="h-3 w-3" /> : page.page}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-medium">Sayfa {page.page}</span>
                        <span className="line-clamp-2 text-xs text-muted-foreground">{page.title}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex min-h-0 min-w-0 flex-col bg-slate-200 p-1 dark:bg-slate-900 sm:p-3">
            <div className="mb-2 flex items-center justify-between gap-2 rounded-md border bg-background px-2 py-2 lg:mb-3 lg:px-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold lg:hidden">Week {week.weekNumber} - {week.title}</p>
                <p className="text-[11px] text-muted-foreground lg:hidden">{completedPages}/{pageCount || "..."} sayfa - {progress}%</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={week.originalMaterialUrl} target="_blank" rel="noreferrer">
                    <Download className="h-4 w-4" /> PDF dosyasını aç
                  </a>
                </Button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden rounded-md border bg-background shadow-sm">
              {data ? (
                <PdfCanvasPage
                  source={week.originalMaterialUrl}
                  pageNumber={selectedPage}
                  pageCount={pageCount}
                  canGoPrevious={Boolean(data && selectedPage > 1)}
                  canGoNext={Boolean(data && selectedPage < pageCount)}
                  onPrevious={() => goToPage(selectedPage - 1)}
                  onNext={() => goToPage(selectedPage + 1)}
                  isCompleted={isPageDone(selectedPage)}
                  isFavorite={isFavorite(selectedPage)}
                  onCompleteAndContinue={completeAndContinue}
                  onToggleFavorite={() => toggleFavoritePage(week.id, selectedPage, currentPage?.title ?? `Sayfa ${selectedPage}`)}
                />
              ) : (
                <div className="grid h-[640px] place-items-center text-sm text-muted-foreground">PDF yükleniyor...</div>
              )}
            </div>
          </main>

          <aside className="hidden min-h-0 overflow-hidden border-t bg-background lg:block lg:border-l lg:border-t-0">
            <div className="h-full overflow-auto p-4">
              <Card>
                <CardHeader>
                  <CardTitle>İlerleme takibi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-4xl font-bold">{progress}%</div>
                    <p className="text-sm text-muted-foreground">Bu haftanın PDF ilerlemesi</p>
                  </div>
                  <Progress value={progress} />
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Stat label="Tamamlanan" value={completedPages} />
                    <Stat label="Kalan" value={Math.max(0, pageCount - completedPages)} />
                  </div>
                  <Button
                    className="w-full"
                    variant={isPageDone(selectedPage) ? "default" : "outline"}
                    onClick={() => toggleChecklist(week.id, pageSectionId, pageId(selectedPage))}
                  >
                    {isPageDone(selectedPage) ? <Check className="h-4 w-4" /> : <ListChecks className="h-4 w-4" />}
                    {isPageDone(selectedPage) ? "Bu sayfa tamamlandı" : "Bu sayfayı tamamla"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Hafta bölümleri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {week.sections.map((section) => (
                    <div key={section.id} className="rounded-md border p-3">
                      <p className="text-sm font-medium">{section.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">PDF içinde ilgili başlığı arayarak çalış.</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="mt-4" id="notes">
                <NotesEditor weekId={week.id} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}

function pageId(page: number) {
  return `page-${page}`;
}

function getInitialPage(pageParam: string | null, lastReadPage?: number) {
  const urlPage = Number(pageParam);
  if (Number.isFinite(urlPage) && urlPage > 0) return Math.floor(urlPage);
  if (Number.isFinite(lastReadPage) && lastReadPage && lastReadPage > 0) return Math.floor(lastReadPage);
  return 1;
}

function PdfCanvasPage({
  source,
  pageNumber,
  pageCount,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  isCompleted,
  isFavorite,
  onCompleteAndContinue,
  onToggleFavorite
}: {
  source: string;
  pageNumber: number;
  pageCount: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  isCompleted: boolean;
  isFavorite: boolean;
  onCompleteAndContinue: () => void;
  onToggleFavorite: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const pdfRef = useRef<any>(null);
  const [status, setStatus] = useState("PDF sayfası yükleniyor...");
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const zoomPercent = Math.round(zoom * 100);
  const zoomOut = () => setZoom((current) => Math.max(0.5, Number((current - 0.1).toFixed(2))));
  const zoomIn = () => setZoom((current) => Math.min(2.5, Number((current + 0.1).toFixed(2))));
  const resetZoom = () => setZoom(1);
  const toggleFullscreen = async () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await viewer.requestFullscreen();
  };

  useEffect(() => {
    pdfRef.current = null;
  }, [source]);

  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreen(document.fullscreenElement === viewerRef.current);
    };
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let renderTask: { cancel: () => void; promise: Promise<void> } | null = null;

    async function renderPage() {
      const canvas = canvasRef.current;
      const host = hostRef.current;
      if (!canvas || !host) return;

      setStatus("PDF sayfası hazırlanıyor...");
      const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      if (!pdfRef.current) {
        const documentTask = pdfjs.getDocument({ url: source });
        pdfRef.current = await documentTask.promise;
      }
      const pdf = pdfRef.current;
      if (cancelled) return;

      const page = await pdf.getPage(pageNumber);
      if (cancelled) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.max(280, host.clientWidth - 12);
      const availableHeight = Math.max(280, host.clientHeight - 12);
      const widthScale = availableWidth / baseViewport.width;
      const heightScale = availableHeight / baseViewport.height;
      const scale = Math.min(widthScale, heightScale, 2.25) * zoom;
      const viewport = page.getViewport({ scale });
      const ratio = window.devicePixelRatio || 1;
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = Math.floor(viewport.width * ratio);
      canvas.height = Math.floor(viewport.height * ratio);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, viewport.width, viewport.height);

      renderTask = page.render({ canvasContext: context, viewport }) as { cancel: () => void; promise: Promise<void> };
      await renderTask.promise;
      if (!cancelled) setStatus("");
    }

    renderPage().catch((error) => {
      if (!cancelled && error?.name !== "RenderingCancelledException") {
        console.error("PDF page render failed", error);
        setStatus("PDF sayfası çizilemedi. Orijinal PDF dosyasını açmayı deneyebilirsin.");
      }
    });

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [source, pageNumber, zoom, isFullscreen]);

  return (
    <div
      ref={viewerRef}
      className={cn(
        "relative flex h-full min-h-0 flex-col overflow-hidden bg-slate-950/5 dark:bg-slate-950",
        isFullscreen && "h-screen w-screen bg-slate-950"
      )}
    >
      <div ref={hostRef} className={`min-h-0 flex-1 p-2 sm:p-3 ${zoom > 1 ? "overflow-auto" : "overflow-x-hidden overflow-y-auto"}`}>
        <div className="flex min-h-full w-max min-w-full items-center justify-center">
          <canvas ref={canvasRef} className="rounded-sm bg-white shadow-2xl" />
        </div>
      </div>
      <div className="shrink-0 border-t border-white/10 bg-slate-950/95 px-2 py-2 shadow-lg">
        <div className="mx-auto flex max-w-full items-center justify-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-slate-950/80 p-1.5 backdrop-blur sm:gap-2 sm:p-2">
          <Button variant="outline" size="sm" onClick={onPrevious} disabled={!canGoPrevious} className="h-9 w-9 shrink-0 rounded-full p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="shrink-0 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground sm:px-4 sm:text-sm">
            Sayfa {pageNumber} / {pageCount || "..."}
          </div>
          <Button variant="outline" size="sm" onClick={onNext} disabled={!canGoNext} className="h-9 w-9 shrink-0 rounded-full p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant={isCompleted ? "default" : "outline"}
            size="sm"
            onClick={onCompleteAndContinue}
            disabled={!canGoNext && isCompleted}
            className="h-9 w-9 shrink-0 rounded-full p-0"
            title="Bu sayfayı tamamla ve sonraki sayfaya geç"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            variant={isFavorite ? "default" : "outline"}
            size="sm"
            onClick={onToggleFavorite}
            className="h-9 w-9 shrink-0 rounded-full p-0"
            title="Bu sayfayı favorilere ekle"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          <div className="mx-1 h-6 w-px shrink-0 bg-white/15" />
          <Button variant="outline" size="sm" onClick={zoomOut} disabled={zoom <= 0.5} className="h-9 w-9 shrink-0 rounded-full p-0" title="Uzaklaştır">
            <Minus className="h-4 w-4" />
          </Button>
          <button
            type="button"
            onClick={resetZoom}
            className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full border border-white/10 bg-background px-3 text-xs font-semibold text-foreground transition hover:bg-muted"
            title="Yakınlaştırmayı sıfırla"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {zoomPercent}%
          </button>
          <Button variant="outline" size="sm" onClick={zoomIn} disabled={zoom >= 2.5} className="h-9 w-9 shrink-0 rounded-full p-0" title="Yakınlaştır">
            <Plus className="h-4 w-4" />
          </Button>
          <div className="mx-1 h-6 w-px shrink-0 bg-white/15" />
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="h-9 w-9 shrink-0 rounded-full p-0"
            title={isFullscreen ? "Tam ekrandan cik" : "Tam ekran kullan"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      {status ? <div className="pointer-events-none absolute inset-x-0 top-28 text-center text-sm text-muted-foreground">{status}</div> : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border bg-muted/30 p-3">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
