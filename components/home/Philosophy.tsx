import { images } from "@/data/images";
import { principles } from "@/data/principles";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Philosophy() {
  return (
    <section aria-labelledby="why-title" className="cv-auto bg-bone">
      <div className="grid lg:grid-cols-2">
        <div className="relative h-[72svh] min-h-[28rem] lg:h-auto">
          <div className="h-full lg:sticky lg:top-0 lg:h-svh">
            <ImageReveal
              image={images.carpenterMarking}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full"
              parallax={5}
            />
          </div>
        </div>

        <div className="px-[var(--gutter)] py-24 md:py-32 lg:py-40 lg:pl-[clamp(3rem,6vw,7rem)]">
          <SectionLabel index="05">Why Crate</SectionLabel>
          <AnimatedHeading
            id="why-title"
            lines={["Built on clarity.", "Measured by quality."]}
            className="mt-8 heading-xl lg:text-[clamp(2.5rem,4.3vw,4.75rem)]"
          />

          <ol className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-24">
            {principles.map((p, i) => (
              <li key={p.number}>
                <Reveal delay={i * 0.08} className="border-t border-ink/15 pt-6">
                  <span aria-hidden="true" className="block numeral text-[clamp(4.5rem,8vw,7.5rem)] text-graphite">
                    {p.number}
                  </span>
                  <h3 className="mt-6 label-caps text-ink">{p.title}</h3>
                  <p className="mt-3 max-w-[30ch] text-muted">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
