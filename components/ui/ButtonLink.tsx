import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./Icons";

type Variant = "solid" | "light" | "outline" | "outline-light";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Subtle magnetic pull toward the cursor (fine pointers only, via MotionObserver). */
  magnetic?: boolean;
  arrow?: boolean;
};

const variants: Record<Variant, { base: string; fill: string; hoverText: string }> = {
  solid: { base: "bg-ink text-bone", fill: "bg-accent", hoverText: "group-hover:text-white" },
  light: { base: "bg-bone text-ink", fill: "bg-ink", hoverText: "group-hover:text-bone" },
  outline: {
    base: "border border-ink/80 text-ink",
    fill: "bg-ink",
    hoverText: "group-hover:text-bone",
  },
  "outline-light": {
    base: "border border-white/60 text-white",
    fill: "bg-bone",
    hoverText: "group-hover:text-ink",
  },
};

/**
 * Rectangular call-to-action. A fill wipes up from the baseline on hover,
 * and the arrow extends — deliberate, not bouncy.
 */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
  magnetic = false,
  arrow = true,
}: ButtonLinkProps) {
  const v = variants[variant];
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  const classes = cn(
    "group relative inline-flex min-h-[3.25rem] items-center justify-center overflow-hidden px-7 py-4 label-caps",
    v.base,
    className,
  );

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-expo group-hover:scale-y-100 group-focus-visible:scale-y-100",
          v.fill,
        )}
      />
      <span
        className={cn(
          "relative z-10 flex items-center gap-3 whitespace-nowrap transition-colors duration-500",
          v.hoverText,
        )}
      >
        {children}
        {arrow && <ArrowRight className="transition-transform duration-500 ease-expo group-hover:translate-x-1" />}
      </span>
    </>
  );

  return (
    <span className="magnetic inline-flex" data-magnetic={magnetic || undefined}>
      {isExternal ? (
        <a href={href} className={classes}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {inner}
        </Link>
      )}
    </span>
  );
}
