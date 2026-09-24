import { buildZoom } from "@/data/credentials";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { DfwMap } from "./DfwMap";

const areas = [
  { name: "Dallas", note: "Home base" },
  { name: "Oak Cliff", note: "Dallas" },
  { name: "Richardson", note: "Permitted work on record" },
  { name: "Surrounding DFW communities", note: "By project" },
];

export function ServiceArea() {
  return (
    <section aria-labelledby="area-title" className="cv-auto section-y bg-bone">
      <div className="container-site grid-site gap-y-16">
        <div className="col-span-4 md:col-span-12 lg:col-span-5">
          <SectionLabel index="08">Service area</SectionLabel>
          <AnimatedHeading
            id="area-title"
            lines={[
              "Building across",
              <span key="dfw" className="whitespace-nowrap">
                Dallas–Fort Worth.
              </span>,
            ]}
            className="mt-8 heading-xl lg:text-[clamp(2.5rem,4.1vw,4.5rem)]"
          />
          <Reveal>
            <p className="mt-8 max-w-[40ch] body-lg text-charcoal">
              Based in Dallas, we build throughout the city and its neighboring communities — with city contractor
              registrations on record in{" "}
              {buildZoom.registrations.map((r) => r.jurisdiction.replace("City of ", "")).join(" and ")}.
            </p>

            <ul className="mt-12 border-t border-ink/15">
              {areas.map((area) => (
                <li key={area.name} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-4">
                  <span className="heading-sm">{area.name}</span>
                  <span className="label-mono text-muted">{area.note}</span>
                </li>
              ))}
            </ul>

            <TextLink href="/contact" className="mt-10">
              Discuss your project
            </TextLink>
          </Reveal>
        </div>

        <div className="col-span-4 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-7">
          <DfwMap />
        </div>
      </div>
    </section>
  );
}
