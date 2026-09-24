"use client";

import { useEffect, useRef } from "react";
import type { ProcessStep } from "@/data/process";
import { cn } from "@/lib/utils";

type ProcessTimelineProps = {
  steps: ProcessStep[];
  tone?: "light" | "dark";
};

/**
 * Vertical timeline. A copper rule draws down as you scroll, and each step
 * settles into full contrast as it crosses the reading line. State lives in
 * DOM attributes (no re-renders while scrolling).
 */
export function ProcessTimeline({ steps, tone = "light" }: ProcessTimelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const dark = tone === "dark";

  useEffect(() => {
    const list = listRef.current;
    const bar = barRef.current;
    if (!list || !bar) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          e.target.toggleAttribute("data-reached", e.isIntersecting || e.boundingClientRect.top < 0);
      },
      { rootMargin: "0px 0px -42% 0px" },
    );
    list.querySelectorAll("[data-step]").forEach((el) => io.observe(el));

    // Progress: 0 when the list's top reaches 65% of the viewport, 1 when its bottom reaches 55%.
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const box = list.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (vh * 0.65 - box.top) / (box.height + vh * 0.1)));
      bar.style.transform = `scaleY(${progress.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative">
      <span
        aria-hidden="true"
        className={cn("absolute bottom-3 left-[5px] top-3 w-px", dark ? "bg-white/15" : "bg-ink/15")}
      >
        <span
          ref={barRef}
          className="absolute inset-0 block origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out"
        />
      </span>
      {steps.map((step) => (
        <li key={step.number} data-step className="group relative pb-12 pl-10 last:pb-0 md:pb-14 md:pl-14">
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-[0.45rem] size-[11px] border transition-colors duration-700 group-data-[reached]:border-accent group-data-[reached]:bg-accent",
              dark ? "border-white/40 bg-ink" : "border-ink/30 bg-bone",
            )}
          />
          <div className="grid gap-x-8 gap-y-3 md:grid-cols-[4.5rem_minmax(0,14rem)_minmax(0,1fr)] md:items-baseline">
            <span className={cn("font-mono text-xs tracking-[0.12em]", dark ? "text-concrete" : "text-muted")}>
              {step.number}
            </span>
            <h3
              className={cn(
                "heading-sm transition-[color,transform] duration-700 ease-expo md:group-data-[reached]:translate-x-1",
                dark ? "text-white/70 group-data-[reached]:text-white" : "text-muted group-data-[reached]:text-ink",
              )}
            >
              {step.title}
            </h3>
            <p className={cn("max-w-[46ch] text-[0.9875rem] leading-relaxed", dark ? "text-concrete" : "text-muted")}>
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
