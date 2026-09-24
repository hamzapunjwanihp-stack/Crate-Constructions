import { services } from "@/data/services";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { ServiceAccordion } from "./ServiceAccordion";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-title" data-theme="dark" className="cv-auto section-y bg-ink text-white">
      <div className="container-site">
        <div className="grid-site items-end gap-y-10">
          <div className="col-span-4 md:col-span-8">
            <SectionLabel index="04" tone="dark">
              What we build
            </SectionLabel>
            <AnimatedHeading
              id="services-title"
              lines={["From first idea", "to final detail."]}
              className="mt-8 heading-xl"
            />
          </div>
          <Reveal className="col-span-4 md:col-span-4">
            <p className="max-w-[36ch] text-concrete">
              Seven disciplines, one accountable team. Every service is managed with the same planning, communication,
              and standard of finish.
            </p>
            <TextLink href="/services" className="mt-6 text-white">
              All services
            </TextLink>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-24">
          <ServiceAccordion services={services} />
        </div>
      </div>
    </section>
  );
}
