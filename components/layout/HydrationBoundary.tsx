import { Suspense } from "react";

/**
 * Wraps a page section in its own Suspense boundary. Nothing here suspends,
 * so the server HTML is unchanged — but React can hydrate each boundary as a
 * separate, smaller task instead of one long one, keeping the main thread
 * responsive on slower phones.
 */
export function HydrationBoundary({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
