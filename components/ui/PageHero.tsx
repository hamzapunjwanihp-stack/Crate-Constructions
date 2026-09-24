import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";
import { ImageReveal } from "./ImageReveal";
import { SectionLabel } from "./SectionLabel";

type PageHeroProps = {
  label: string;
  title: React.ReactNode[];
  intro?: React.ReactNode;
  image?: SiteImage;
  tone?: "light" | "dark";
  /** Typography scale for the title. */
  size?: "xl" | "lg";
  aside?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * Inner-page hero. Title lines rise in with CSS on first paint (no JS
 * dependency). Dark heroes can carry a full-bleed photograph.
 */
export function PageHero({ label, title, intro, image, tone = "light", size = "xl", aside, children }: PageHeroProps) {
  const dark = tone === "dark";

  return (
    <section
      data-theme={dark ? "dark" : undefined}
      className={cn(
        "relative isolate overflow-hidden",
        dark ? "bg-ink text-white" : "bg-bone text-ink",
        image && "flex min-h-[max(38rem,88svh)] flex-col",
      )}
    >
      {image && (
        <>
          <ImageReveal
            image={image}
            sizes="100vw"
            className="absolute inset-0 -z-10 animate-fade"
            parallax={8}
            reveal={false}
            preload
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,17,17,0.6)_0%,rgba(17,17,17,0.25)_40%,rgba(17,17,17,0.85)_100%)]"
          />
        </>
      )}

      <div
        className={cn(
          "container-site relative flex flex-1 flex-col pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+4.5rem)]",
          image ? "justify-end pb-12 lg:pb-16" : "pb-16 lg:pb-24",
        )}
      >
        <div className="animate-fade [animation-delay:200ms]">
          <SectionLabel tone={dark ? "dark" : "light"} as="p">
            {label}
          </SectionLabel>
        </div>

        <h1 className={cn("mt-8 lg:mt-12", size === "xl" ? "display-xl" : "display-lg")}>
          {title.map((line, i) => (
            <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span className="block animate-rise" style={{ animationDelay: `${120 + i * 110}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        {(intro || aside) && (
          <div
            className={cn(
              "mt-10 grid gap-8 border-t pt-8 animate-fade-up [animation-delay:600ms] md:grid-cols-12 lg:mt-14",
              dark ? "border-white/20" : "border-ink/15",
            )}
          >
            {intro && (
              <div
                className={cn(
                  "max-w-[44ch] body-lg md:col-span-6 lg:col-span-5",
                  dark ? "text-white/85" : "text-charcoal",
                )}
              >
                {intro}
              </div>
            )}
            {aside && <div className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">{aside}</div>}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
