"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let lenisInstance: Lenis | null = null;

/** Access the active Lenis instance (null when reduced motion is on). */
export function getLenis() {
  return lenisInstance;
}

/**
 * Inertial smooth scrolling for mouse and trackpad users. Touch devices
 * keep native scrolling, and it's disabled for reduced-motion users.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !finePointer) return;

    let cancelled = false;
    import("lenis").then(({ default: LenisClass }) => {
      if (cancelled) return;
      lenisInstance = new LenisClass({
        lerp: 0.11,
        autoRaf: true,
        anchors: { offset: -80 },
        stopInertiaOnNavigate: true,
        prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
      });
    });

    return () => {
      cancelled = true;
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  // Start each new page at the top (unless navigating to an anchor).
  useEffect(() => {
    if (!window.location.hash) lenisInstance?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
