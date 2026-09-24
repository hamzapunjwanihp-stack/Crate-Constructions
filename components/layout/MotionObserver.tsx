"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One lightweight controller for the site's ambient motion, instead of a
 * JavaScript animation instance per element:
 *
 *  - [data-reveal]       → gets [data-shown] the first time it enters the
 *                          viewport; CSS in globals.css does the animating.
 *  - [data-drift-scope]  → children with data-drift="from,to" slide
 *                          horizontally (in %) as the scope scrolls past.
 *  - [data-parallax]     → subtle scroll parallax (fine pointers only).
 *  - [data-magnetic]     → CTA drifts slightly toward the cursor (mouse only).
 *
 * Everything is skipped for prefers-reduced-motion.
 */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* Reveals */
    const revealIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          revealIO.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    /* Scroll-linked effects: only work on what's on screen */
    const visible = new Set<HTMLElement>();
    const scrollIO = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(el);
        else visible.delete(el);
      }
      schedule();
    });

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      visible.forEach((el) => {
        if (el.hasAttribute("data-drift-scope")) {
          const box = el.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (vh - box.top) / (vh + box.height)));
          el.querySelectorAll<HTMLElement>("[data-drift]").forEach((line) => {
            const [from, to] = (line.dataset.drift ?? "0,0").split(",").map(Number);
            const fadeStart = Number(line.dataset.driftFade ?? 0);
            const fade = Math.max(0, Math.min(1, (progress - fadeStart) / 0.16));
            line.style.transform = `translate3d(${(from + (to - from) * progress).toFixed(2)}%, 0, 0)`;
            line.style.opacity = (0.36 + 0.64 * fade).toFixed(3);
          });
          return;
        }
        const box = (el.parentElement ?? el).getBoundingClientRect();
        const amount = Number(el.dataset.parallax) || 0;
        const progress = Math.max(-1, Math.min(1, (box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2)));
        const scale = el.dataset.parallaxScale ? Number(el.dataset.parallaxScale) : 1 + (amount * 2) / 100;
        el.style.transform = `translate3d(0, ${(-progress * amount).toFixed(2)}%, 0) scale(${scale})`;
      });
    };
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => {
        if (reduce) el.setAttribute("data-shown", "");
        else revealIO.observe(el);
      });
      if (reduce) return;
      document.querySelectorAll<HTMLElement>("[data-drift-scope]").forEach((el) => scrollIO.observe(el));
      if (fine) document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => scrollIO.observe(el));
    };

    let scanFrame = 0;
    const mutations = new MutationObserver(() => {
      if (scanFrame) return;
      scanFrame = requestAnimationFrame(() => {
        scanFrame = 0;
        scan();
      });
    });

    scan();
    mutations.observe(document.body, { childList: true, subtree: true });

    /* Magnetic CTAs */
    let magnet: HTMLElement | null = null;
    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (el !== magnet) release();
      if (!el) return;
      magnet = el;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - (r.left + r.width / 2)) / r.width) * 14;
      const y = ((e.clientY - (r.top + r.height / 2)) / r.height) * 10;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };

    if (!reduce) {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
    }
    if (!reduce && fine) {
      document.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", release);
    }

    return () => {
      revealIO.disconnect();
      scrollIO.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scanFrame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", release);
      release();
    };
  }, [pathname]);

  return null;
}
