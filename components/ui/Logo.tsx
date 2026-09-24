import { cn } from "@/lib/utils";

/**
 * Temporary Crate Construction wordmark.
 * The mark is a square frame with a diagonal brace — a crate, and a braced
 * wall frame. Replace this component when official branding is supplied.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn("shrink-0", className)}>
      <rect x="1" y="1" width="30" height="30" stroke="currentColor" strokeWidth="2" />
      <path d="M1 31 31 1" stroke="currentColor" strokeWidth="2" />
      <path d="M1 12h30M1 20h30" stroke="currentColor" strokeWidth="1" opacity="0.45" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="size-7 lg:size-8" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-bold tracking-[0.2em] [font-stretch:110%] lg:text-[1.15rem]">
          CRATE
        </span>
        {!compact && (
          <span className="mt-[3px] font-mono text-[0.55rem] font-medium tracking-[0.34em] opacity-80 lg:text-[0.6rem]">
            CONSTRUCTION
          </span>
        )}
      </span>
    </span>
  );
}
