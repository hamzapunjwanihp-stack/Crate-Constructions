import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Quiet fade-and-rise for supporting content as it enters the viewport (CSS, via MotionObserver). */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <div
      data-reveal="fade"
      className={cn("reveal-fade", className)}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
