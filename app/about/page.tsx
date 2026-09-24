import { images } from "@/data/images";
import { buildZoom } from "@/data/credentials";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/layout/PageTransition";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { CTASection } from "@/components/ui/CTASection";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { TeamSection } from "@/components/about/TeamSection";

export const metadata = pageMetadata({
  title: "About — Dallas Residential General Contractor",
  description:
    "Crate Construction is a Dallas-based general contractor for new homes, remodels, renovations, and additions — built on planning, clear communication, and careful craft.",
  path: "/about",
});

const philosophy = [
  {
    number: "01",
    title: "Plan before you build.",
    body: "Most construction problems are planning problems in disguise. We resolve scope, sequence, and selections before the work starts — not while it's underway.",
  },
  {
    number: "02",
    title: "Say it plainly. Then do it.",
    body: "Clear expectations, written decisions, and regular updates. You should never have to wonder what's happening on your project.",
  },
  {
    number: "03",
    title: "Build the hidden parts well.",
    body: "Framing, flashing, waterproofing, and rough-ins decide how a home performs for decades. They get the same care as the finishes you see every day.",
  },
];

const standards = [
  { title: "Written scope", body: "Every project starts with a documented scope and clearly defined allowances." },
  { title: "Permitted work", body: "Permits are pulled where required, and inspections are scheduled at each stage." },
  { title: "Pre-cover reviews", body: "Framing, rough-ins, and waterproofing are checked before they're closed up." },
  { title: "Documented changes", body: "Changes are priced and approved in writing before the work proceeds." },
  {
    title: "Protected homes",
    body: "Floors, finishes, and lived-in areas are protected for the length of the project.",
  },
  { title: "Closed punch lists", body: "A project is complete when the punch list is closed — not before." },
];

const approach = [
  { title: "One point of contact", body: "A single accountable lead from first meeting to handover." },
  { title: "A schedule you can follow", body: "Milestones, decisions, and inspections laid out in advance." },
  { title: "Regular updates", body: "Progress, next steps, and open decisions — shared consistently." },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        tone="dark"
        label="About Crate"
        title={["Built around", "the work."]}
        image={images.timberCeiling}
        intro="A Dallas general contractor for homeowners planning something significant — and expecting it to be built right."
      />

      {/* Company introduction */}
      <section aria-labelledby="company-title" className="section-y bg-bone">
        <div className="container-site grid-site gap-y-10">
          <div className="col-span-4 md:col-span-3">
            <SectionLabel index="01">Company</SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-9">
            <AnimatedHeading
              id="company-title"
              lines={["A residential builder", "for serious projects."]}
              className="heading-xl"
            />
            <Reveal className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16">
              <p className="body-lg text-charcoal">
                Crate Construction manages residential construction across Dallas — new homes, whole-home remodels,
                kitchens and baths, additions, and renovations of older houses.
              </p>
              <p className="body-lg text-charcoal">
                We work with homeowners, architects, and designers who value planning as much as building, and who want
                a contractor that communicates clearly from the first conversation to the final walkthrough.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section aria-labelledby="mission-title" data-theme="dark" className="section-y bg-ink text-white">
        <div className="container-site">
          <SectionLabel index="02" tone="dark">
            Mission
          </SectionLabel>
          <h2 id="mission-title" className="sr-only">
            Mission
          </h2>
          <AnimatedHeading
            as="p"
            lines={["Plan carefully. Build honestly.", "Leave every home better built", "than we found it."]}
            className="mt-12 max-w-[22ch] font-display text-[clamp(2.25rem,5.2vw,5.5rem)] leading-[1.02] tracking-[-0.035em] lg:mt-16 lg:max-w-none"
          />
        </div>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy-title" className="section-y bg-bone">
        <div className="container-site">
          <div className="grid-site gap-y-8">
            <div className="col-span-4 md:col-span-3">
              <SectionLabel index="03">Philosophy</SectionLabel>
            </div>
            <AnimatedHeading
              id="philosophy-title"
              lines={["How we think", "about building."]}
              className="col-span-4 heading-xl md:col-span-9"
            />
          </div>
          <ol className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-3 lg:mt-24">
            {philosophy.map((item, i) => (
              <li key={item.number}>
                <Reveal delay={i * 0.08} className="border-t border-ink/15 pt-6">
                  <span aria-hidden="true" className="block numeral text-[clamp(4.5rem,8vw,7.5rem)] text-graphite">
                    {item.number}
                  </span>
                  <h3 className="mt-8 heading-md">{item.title}</h3>
                  <p className="mt-4 max-w-[38ch] text-charcoal">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quality standards */}
      <section aria-labelledby="standards-title" className="bg-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative h-[60svh] min-h-[24rem] lg:h-auto">
            <div className="h-full lg:sticky lg:top-0 lg:h-svh">
              <ImageReveal
                image={images.framerOnWall}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full"
                parallax={5}
              />
            </div>
          </div>
          <div className="px-[var(--gutter)] py-24 lg:py-36 lg:pl-[clamp(3rem,6vw,7rem)]">
            <SectionLabel index="04">Quality standards</SectionLabel>
            <AnimatedHeading
              id="standards-title"
              lines={["Standards we hold", "on every job."]}
              className="mt-8 heading-lg"
            />
            <ul className="mt-12 border-t border-ink/15 lg:mt-16">
              {standards.map((s, i) => (
                <li key={s.title} className="border-b border-ink/15">
                  <Reveal delay={i * 0.04} className="grid gap-2 py-6 sm:grid-cols-[3rem_12rem_1fr] sm:gap-6">
                    <span className="font-mono text-xs leading-7 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="heading-sm">{s.title}</h3>
                    <p className="text-charcoal">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-title" className="section-y bg-bone">
        <div className="container-site grid-site gap-y-14">
          <div className="col-span-4 md:col-span-5">
            <SectionLabel index="05">Approach</SectionLabel>
            <AnimatedHeading id="approach-title" lines={["Working with", "Crate."]} className="mt-8 heading-xl" />
            <Reveal>
              <p className="mt-8 max-w-[40ch] body-lg text-charcoal">
                Building a home is a long collaboration. We keep it organized, predictable, and personal.
              </p>
              <TextLink href="/process" className="mt-8">
                See our process
              </TextLink>
            </Reveal>
          </div>
          <ul className="col-span-4 self-end md:col-span-6 md:col-start-7">
            {approach.map((a, i) => (
              <li key={a.title} className="border-t border-ink/15 last:border-b">
                <Reveal delay={i * 0.06} className="flex items-baseline gap-6 py-7">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="heading-md">{a.title}</h3>
                    <p className="mt-2 text-charcoal">{a.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dallas roots */}
      <section aria-labelledby="roots-title" data-theme="dark" className="relative overflow-hidden bg-ink text-white">
        <div className="grid lg:grid-cols-12">
          <div className="relative h-[60svh] min-h-[24rem] lg:col-span-6 lg:h-auto">
            <ImageReveal
              image={images.infillModern}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full"
              parallax={5}
            />
          </div>
          <div className="px-[var(--gutter)] py-24 lg:col-span-6 lg:py-36 lg:pl-[clamp(3rem,6vw,7rem)]">
            <SectionLabel index="06" tone="dark">
              Dallas roots
            </SectionLabel>
            <AnimatedHeading
              id="roots-title"
              lines={["Based in Dallas.", "Built for Texas."]}
              className="mt-8 heading-xl"
            />
            <Reveal>
              <p className="mt-8 max-w-[44ch] body-lg text-concrete">
                North Texas asks a lot of a house: expansive clay soils, long summers of heat, and storms that arrive
                fast. We plan foundations, envelopes, and drainage with that in mind.
              </p>
              <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-white/15 pt-8">
                <div>
                  <dt className="label-mono text-concrete">Based in</dt>
                  <dd className="mt-2 heading-md">
                    {site.location.city}, {site.location.region}
                  </dd>
                </div>
                <div>
                  <dt className="label-mono text-concrete">
                    Active since<span className="text-accent-light">*</span>
                  </dt>
                  <dd className="mt-2 heading-md">{buildZoom.activeSince}</dd>
                </div>
              </dl>
              <p className="mt-8 text-xs leading-relaxed text-concrete">
                <span className="text-accent-light">*</span> Per {buildZoom.source}&apos;s public permit and licensing
                records, retrieved {buildZoom.retrieved}.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <TeamSection />

      <CTASection image={images.whiteContemporary} />
    </PageTransition>
  );
}
