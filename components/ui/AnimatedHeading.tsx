import { cn } from "@/lib/utils";

type AnimatedHeadingProps = {
  /** Each entry renders as its own masked line. */
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
};

/**
 * Editorial masked-line reveal: each line slides up from behind a mask the
 * first time the heading enters the viewport. Pure CSS, triggered by
 * MotionObserver — no per-heading JavaScript.
 */
export function AnimatedHeading({
  lines,
  as: Tag = "h2",
  id,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.085,
}: AnimatedHeadingProps) {
  return (
    <Tag id={id} className={className} data-reveal="lines">
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className={cn("line-inner", lineClassName)} style={{ transitionDelay: `${delay + i * stagger}s` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
