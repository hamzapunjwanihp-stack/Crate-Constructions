import { images, type SiteImage } from "@/data/images";
import { site } from "@/data/site";
import { AnimatedHeading } from "./AnimatedHeading";
import { ButtonLink } from "./ButtonLink";
import { ImageReveal } from "./ImageReveal";
import { PhoneIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

type CTASectionProps = {
  image?: SiteImage;
  lines?: string[];
  body?: string;
};

/** Closing call-to-action: full-bleed photograph, oversized type, direct contact. */
export function CTASection({
  image = images.framingAerial,
  lines = ["Have something", "in mind?"],
  body = "Tell us what you're planning. We'll help you understand the next step.",
}: CTASectionProps) {
  return (
    <section
      aria-labelledby="cta-title"
      data-theme="dark"
      className="cv-auto relative isolate overflow-hidden bg-ink text-white"
    >
      <ImageReveal image={image} sizes="100vw" className="absolute inset-0 -z-10" parallax={9} reveal={false} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/65" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,17,17,0)_40%,rgba(17,17,17,0.75)_100%)]"
      />

      <div className="container-site py-[clamp(7rem,15vw,13rem)]">
        <SectionLabel tone="dark">Start a project</SectionLabel>
        <AnimatedHeading id="cta-title" lines={lines} className="mt-10 display-xl" />

        <Reveal className="mt-14 grid items-end gap-10 border-t border-white/25 pt-10 md:grid-cols-12 lg:mt-20">
          <p className="max-w-[36ch] body-lg text-white/85 md:col-span-5">{body}</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6 md:col-span-7 md:justify-end">
            <ButtonLink href="/contact" variant="light" magnetic>
              Start a project
            </ButtonLink>
            <a
              href={site.phone.href}
              className="group inline-flex items-center gap-3 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] tracking-[-0.02em]"
            >
              <PhoneIcon className="text-accent-light" />
              <span className="link-underline">{site.phone.display}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
