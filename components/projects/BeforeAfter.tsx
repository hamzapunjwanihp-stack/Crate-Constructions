"use client";

import Image from "next/image";
import { useState } from "react";
import type { SiteImage } from "@/data/images";

type BeforeAfterProps = {
  before: SiteImage;
  after: SiteImage;
  caption: string;
};

/**
 * Before/after comparison. A native range input drives the split, so it
 * works with mouse, touch, and keyboard (arrow keys) out of the box.
 */
export function BeforeAfter({ before, after, caption }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);

  return (
    <figure>
      <div className="relative aspect-[4/3] select-none overflow-hidden bg-stone outline-offset-4 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-accent md:aspect-[16/9]">
        <Image src={after.src} alt={`After: ${after.alt}`} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={before.src} alt={`Before: ${before.alt}`} fill sizes="100vw" className="object-cover" />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 bg-ink px-3 py-2 label-mono text-bone">Before</span>
        <span className="pointer-events-none absolute right-4 top-4 bg-bone px-3 py-2 label-mono text-ink">After</span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px bg-white"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center border border-white bg-ink text-white">
            <svg viewBox="0 0 24 12" className="w-6" fill="none">
              <path d="M7 1 2 6l5 5M17 1l5 5-5 5" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Compare before and after"
          aria-valuetext={`${position}% before`}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none opacity-0"
        />
      </div>
      <figcaption className="mt-4 flex flex-wrap justify-between gap-4 label-mono text-muted">
        <span>{caption}</span>
        <span>Drag to compare</span>
      </figcaption>
    </figure>
  );
}
