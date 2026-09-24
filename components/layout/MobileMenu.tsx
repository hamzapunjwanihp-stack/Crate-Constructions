"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { mainNav, site } from "@/data/site";
import { cn, ease } from "@/lib/utils";
import { ArrowRight, PhoneIcon } from "@/components/ui/Icons";
import { getLenis } from "./SmoothScroll";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Full-screen navigation for tablet and mobile. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    getLenis()?.stop();

    const focusables = () => {
      const toggle = document.getElementById("menu-toggle");
      const inPanel = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
      return toggle ? [...inPanel, toggle] : inPanel;
    };

    const focusTimer = window.setTimeout(() => focusables()[0]?.focus(), 80);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        document.getElementById("menu-toggle")?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = focusables();
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 64rem)");
    const onBreakpoint = (e: MediaQueryListEvent) => e.matches && onClose();

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      window.clearTimeout(focusTimer);
      root.style.overflow = previousOverflow;
      getLenis()?.start();
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, onClose]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-theme="dark"
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink text-bone lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.7, ease: ease.quart, delay: 0.1 } }}
            transition={{ duration: 0.85, ease: ease.quart }}
          >
            <div className="container-site flex min-h-full flex-1 flex-col pb-10 pt-[calc(var(--header-h)+2.5rem)]">
              <nav aria-label="Mobile" className="flex-1">
                <ul className="border-t border-white/12">
                  {mainNav.map((item, i) => {
                    const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <li key={item.href} className="overflow-hidden border-b border-white/12">
                        <motion.div
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: "-40%", opacity: 0, transition: { duration: 0.35, ease: ease.quart } }}
                          transition={{ duration: 0.9, ease: ease.expo, delay: 0.28 + i * 0.06 }}
                        >
                          <Link
                            href={item.href}
                            onClick={onClose}
                            aria-current={active ? "page" : undefined}
                            className="group flex items-baseline justify-between gap-6 py-4 sm:py-5"
                          >
                            <span className="flex items-baseline gap-5">
                              <span className="font-mono text-xs text-concrete">0{i + 1}</span>
                              <span
                                className={cn(
                                  "font-display text-[clamp(2.5rem,10vw,4.5rem)] font-medium uppercase leading-none tracking-[-0.035em] [font-stretch:88%]",
                                  active && "text-accent-light",
                                )}
                              >
                                {item.label}
                              </span>
                            </span>
                            <ArrowRight className="text-xl text-concrete transition-transform duration-500 ease-expo group-hover:translate-x-1" />
                          </Link>
                        </motion.div>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                className="mt-12 grid gap-8 sm:grid-cols-2 sm:items-end"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.8, ease: ease.expo, delay: 0.62 }}
              >
                <div>
                  <p className="label-mono text-concrete">Dallas, Texas</p>
                  <a
                    href={site.phone.href}
                    className="mt-3 inline-flex items-center gap-3 font-display text-3xl tracking-[-0.02em]"
                  >
                    <PhoneIcon className="text-accent-light" />
                    {site.phone.display}
                  </a>
                </div>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex min-h-14 items-center justify-between gap-4 bg-bone px-6 text-ink label-caps"
                >
                  Start a project
                  <ArrowRight />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
