import { images } from "@/data/images";
import { processDetailed } from "@/data/process";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/layout/PageTransition";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { CTASection } from "@/components/ui/CTASection";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "Our Construction Process",
  description:
    "From discovery and site evaluation through estimating, preconstruction, build, quality control, and handover — how Crate Construction runs residential projects in Dallas.",
  path: "/process",
});

const phases = [
  { name: "Plan", range: "01 — 05", note: "Define, design, and price the work." },
  { name: "Build", range: "06 — 08", note: "Prepare, construct, and check every stage." },
  { name: "Deliver", range: "09 — 10", note: "Walk it, close it out, hand it over." },
];

export default function ProcessPage() {
  return (
    <PageTransition>
      <PageHero
        tone="dark"
        size="lg"
        label="Process"
        title={[
          "Good construction",
          "starts before",
          <span key="c">
            construction<span className="text-accent">.</span>
          </span>,
        ]}
        intro="Ten stages, each with a clear purpose and a clear output. The planning happens up front, so the building can run clean."
      >
        <ol className="mt-16 grid gap-px bg-white/15 animate-fade-up [animation-delay:800ms] sm:grid-cols-3 lg:mt-24">
          {phases.map((phase, i) => (
            <li key={phase.name} className="bg-ink py-6 sm:px-6 sm:first:pl-0">
              <p className="flex items-baseline justify-between gap-4">
                <span className="heading-md">
                  <span className="mr-3 font-mono text-xs text-concrete">Phase {i + 1}</span>
                  {phase.name}
                </span>
                <span className="font-mono text-xs text-concrete">{phase.range}</span>
              </p>
              <p className="mt-2 text-sm text-concrete">{phase.note}</p>
            </li>
          ))}
        </ol>
      </PageHero>

      <div className="bg-bone">
        {processDetailed.map((step, i) => (
          <div key={step.number}>
            <section
              aria-labelledby={`step-${step.number}`}
              className={cn("border-t border-ink/15", i === 0 && "border-t-0")}
            >
              <div className="container-site grid-site gap-y-6 py-20 lg:py-32">
                <div className="col-span-4 md:col-span-5">
                  <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                    <span aria-hidden="true" className="block numeral text-[clamp(7rem,19vw,17rem)] text-ink">
                      {step.number}
                    </span>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-7 lg:col-span-6 lg:col-start-7 lg:pt-6">
                  <p className="flex items-center gap-3 label-mono text-muted">
                    <span aria-hidden="true" className="inline-block size-[7px] bg-accent" />
                    Phase — {step.phase}
                  </p>
                  <AnimatedHeading id={`step-${step.number}`} lines={[step.title]} className="mt-6 heading-xl" />
                  <Reveal>
                    <p className="mt-8 max-w-[48ch] body-lg text-charcoal">{step.description}</p>
                    <h3 className="mt-10 label-mono text-muted">What you get</h3>
                    <ul className="mt-4 border-t border-ink/15">
                      {step.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-3 border-b border-ink/15 py-3.5 text-[0.9875rem]">
                          <span aria-hidden="true" className="size-1.5 shrink-0 bg-ink" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            </section>

            {step.image && (
              <ImageReveal
                image={step.image}
                sizes="100vw"
                className="h-[62svh] min-h-[22rem] lg:h-[88svh]"
                parallax={10}
              />
            )}
          </div>
        ))}
      </div>

      <CTASection
        image={images.concretePour}
        lines={["Start with a", "conversation."]}
        body="Every project starts the same way. Tell us what you're planning and we'll walk you through what comes next."
      />
    </PageTransition>
  );
}
