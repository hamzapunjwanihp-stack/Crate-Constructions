import { processOverview } from "@/data/process";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";

export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="section-y bg-white">
      <div className="container-site grid-site gap-y-16">
        <div className="col-span-4 md:col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <SectionLabel index="06">Process</SectionLabel>
            <AnimatedHeading id="process-title" lines={["How we build."]} className="mt-8 heading-xl" />
            <Reveal>
              <p className="mt-8 max-w-[36ch] body-lg text-charcoal">
                Seven stages, each with a clear purpose. You always know where the project stands and what comes next.
              </p>
              <TextLink href="/process" className="mt-8">
                The full process
              </TextLink>
            </Reveal>
          </div>
        </div>

        <div className="col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-6">
          <ProcessTimeline steps={processOverview} />
        </div>
      </div>
    </section>
  );
}
