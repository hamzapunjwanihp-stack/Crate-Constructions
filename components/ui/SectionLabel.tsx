import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  index?: string;
  tone?: "light" | "dark";
  className?: string;
  as?: "p" | "span" | "div";
};

/** Small uppercase mono label with a copper tick — used above section headings. */
export function SectionLabel({ children, index, tone = "light", className, as: Tag = "p" }: SectionLabelProps) {
  return (
    <Tag
      className={cn("label-mono flex items-center gap-3", tone === "dark" ? "text-concrete" : "text-muted", className)}
    >
      <span aria-hidden="true" className="inline-block size-[7px] shrink-0 bg-accent" />
      {index && (
        <>
          <span className={tone === "dark" ? "text-white" : "text-ink"}>{index}</span>
          <span aria-hidden="true" className="h-px w-6 bg-current opacity-50" />
        </>
      )}
      <span>{children}</span>
    </Tag>
  );
}
