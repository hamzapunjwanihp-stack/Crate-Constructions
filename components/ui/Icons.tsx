import { cn } from "@/lib/utils";

type IconProps = { className?: string };

/** Long, thin architectural arrow → */
export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 12" fill="none" aria-hidden="true" className={cn("h-[0.7em] w-auto shrink-0", className)}>
      <path d="M0 6h22.5M17 .75 22.5 6 17 11.25" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

/** Diagonal arrow ↗ */
export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn("size-[0.9em] shrink-0", className)}>
      <path d="M2.5 13.5 13.5 2.5M5 2.5h8.5V11" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 12" fill="none" aria-hidden="true" className={cn("h-[0.7em] w-auto shrink-0", className)}>
      <path d="M24 6H1.5M7 .75 1.5 6 7 11.25" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn("size-[0.95em] shrink-0", className)}>
      <path
        d="M5.6 1.75H3.25a1.5 1.5 0 0 0-1.5 1.6c.4 5.8 5.1 10.5 10.9 10.9a1.5 1.5 0 0 0 1.6-1.5V10.4l-3-1.25-1.5 1.5a8.6 8.6 0 0 1-3.4-3.4l1.5-1.5L6.6 2.75z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
