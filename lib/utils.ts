export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Shared easing curves for Framer Motion (mirrors --motion-* in globals.css). */
export const ease = {
  expo: [0.19, 1, 0.22, 1] as const,
  quart: [0.76, 0, 0.24, 1] as const,
  out: [0.22, 1, 0.36, 1] as const,
};
