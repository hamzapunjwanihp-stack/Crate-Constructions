import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./Icons";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
};

/** Uppercase text link with a drawn underline and an extending arrow. */
export function TextLink({ href, children, className, arrow = true }: TextLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = cn("group inline-flex items-center gap-3 py-2 label-caps", className);
  const content = (
    <>
      <span className="relative pb-1">
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-700 ease-expo group-hover:scale-x-0 group-hover:origin-right"
        />
      </span>
      {arrow && <ArrowRight className="transition-transform duration-500 ease-expo group-hover:translate-x-1.5" />}
    </>
  );

  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
