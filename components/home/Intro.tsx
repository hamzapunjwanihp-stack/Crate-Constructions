import { images } from "@/data/images";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="section-y bg-bone">
      <div className="container-site">
        <div className="grid-site gap-y-8">
          <div className="col-span-4 md:col-span-3">
            <SectionLabel index="01">Who we are</SectionLabel>
          </div>
          <AnimatedHeading
            id="intro-title"
            lines={["Building Dallas homes", "with purpose."]}
            className="col-span-4 heading-xl md:col-span-9"
          />
        </div>

        <div className="mt-16 grid-site gap-y-14 lg:mt-24">
          <div className="col-span-4 flex flex-col justify-between gap-14 md:col-span-5 lg:col-span-4 lg:col-start-1">
            <Reveal>
              <p className="max-w-[40ch] body-lg text-charcoal">
                Crate Construction manages residential construction from renovation and remodeling to additions and
                ground-up homes. We combine thoughtful planning, experienced project management, and attention to detail
                to turn ambitious ideas into enduring spaces.
              </p>
              <div className="mt-8">
                <TextLink href="/about">About Crate</TextLink>
              </div>
            </Reveal>

            <figure className="hidden w-3/4 md:block">
              <ImageReveal
                image={images.framingInterior}
                sizes="(min-width: 1024px) 22vw, 30vw"
                className="aspect-[4/5]"
              />
              <figcaption className="mt-3 label-mono text-muted">Structure first</figcaption>
            </figure>
          </div>

          <figure className="col-span-4 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            <ImageReveal
              image={images.blackStoneBuild}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="aspect-[4/5] md:aspect-[5/6] lg:aspect-[5/4]"
              parallax={5}
            />
            <figcaption className="mt-3 flex justify-between gap-6 label-mono text-muted">
              <span>New construction</span>
              <span>Representative imagery</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
