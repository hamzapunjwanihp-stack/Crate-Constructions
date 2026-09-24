import { ViewTransition } from "react";

/**
 * Wraps a page's content so route changes fade the old page out and
 * rise the new one in (native View Transitions; no-op where unsupported).
 * Must live in each page — layouts persist, so they never enter/exit.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
