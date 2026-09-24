"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CursorLabel = dynamic(() => import("./CursorLabel").then((m) => m.CursorLabel), { ssr: false });

/**
 * Loads the custom cursor label only on devices with a fine pointer,
 * after the page has settled — phones never download it.
 */
export function CursorLabelLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const id = window.setTimeout(() => setEnabled(query.matches), 1200);
    return () => window.clearTimeout(id);
  }, []);

  return enabled ? <CursorLabel /> : null;
}
