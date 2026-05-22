"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
  };
};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  const toggleTheme = () => {
    if (!mounted || isPulling) return;

    const nextTheme = isDark ? "light" : "dark";
    const root = document.documentElement;
    const rect = buttonRef.current?.getBoundingClientRect();
    const originX = rect ? rect.left + rect.width / 2 : window.innerWidth - 48;
    const originY = rect ? rect.top + 52 : 64;

    root.style.setProperty("--theme-x", `${originX}px`);
    root.style.setProperty("--theme-y", `${originY}px`);
    setIsPulling(true);

    const applyTheme = () => {
      root.classList.toggle("dark", nextTheme === "dark");
      setTheme(nextTheme);
    };

    const finishPull = () => {
      setIsPulling(false);
      root.classList.remove("theme-switching", "theme-view-transition");
      root.style.removeProperty("--theme-x");
      root.style.removeProperty("--theme-y");
    };

    root.classList.add("theme-view-transition");
    buttonRef.current?.blur();

    const transition = (document as ViewTransitionDocument).startViewTransition?.(() => {
      applyTheme();
    });

    window.setTimeout(() => setIsPulling(false), 520);

    if (transition) {
      transition.finished.finally(finishPull);
      return;
    }

    root.classList.add("theme-switching");
    window.setTimeout(applyTheme, 140);
    window.setTimeout(finishPull, 760);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={isDark ? "Aydınlık moda geç" : "Karanlık moda geç"}
      aria-pressed={isDark}
      onClick={toggleTheme}
      onMouseDown={(event) => event.preventDefault()}
      className="theme-pull-toggle group relative h-16 w-8 overflow-visible bg-transparent"
    >
      <span className="absolute left-1/2 top-0 h-px w-12 -translate-x-1/2 bg-border/90" />
      <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-muted-foreground/50" />
      <span className={`theme-chain absolute left-1/2 top-1.5 flex -translate-x-1/2 flex-col items-center gap-[1px] ${isPulling ? "is-pulling" : ""}`}>
        <span className="absolute left-1/2 top-0 h-[46px] w-px -translate-x-1/2 rounded-full bg-slate-400/70 dark:bg-slate-500/80" />
        {Array.from({ length: 7 }).map((_, index) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="relative z-10 h-2 w-2 rounded-full border border-slate-400/90 bg-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:border-slate-500 dark:bg-slate-400"
          />
        ))}
        <span className="relative z-10 mt-0.5 h-4 w-4 rounded-full bg-[#ffd8b5] shadow-[0_2px_8px_rgba(0,0,0,0.22)] ring-1 ring-black/5" />
      </span>
    </button>
  );
}
