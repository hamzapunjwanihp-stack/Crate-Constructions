import { images } from "@/data/images";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TextLink } from "@/components/ui/TextLink";
import { HeroMedia } from "./HeroMedia";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-theme="dark"
      className="relative isolate flex min-h-[max(40rem,100svh)] flex-col overflow-hidden bg-ink text-white"
    >
      <HeroMedia image={images.heroDusk} />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,17,17,0.62)_0%,rgba(17,17,17,0.12)_32%,rgba(17,17,17,0.22)_58%,rgba(17,17,17,0.9)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,17,17,0.55)_0%,rgba(17,17,17,0)_60%)]"
      />

      <div className="container-site relative flex flex-1 flex-col pb-8 pt-[calc(var(--header-h)+1.75rem)] lg:pb-12">
        <div className="flex items-start justify-between gap-6 animate-fade [animation-delay:500ms]">
          <p className="label-mono leading-relaxed text-white/85">
            <span className="block">Crate Construction</span>
            <span className="block text-white/60">
              {site.location.city}, {site.location.regionName}
            </span>
          </p>
          <p className="hidden label-mono text-right leading-relaxed text-white/60 md:block">
            <span className="block">{site.coordinates.lat}</span>
            <span className="block">{site.coordinates.lng}</span>
          </p>
        </div>

        <div className="flex-1" />

        <h1 id="hero-title" className="display-hero">
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <span className="block animate-rise [animation-delay:150ms]">We build</span>
          </span>
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <span className="block animate-rise [animation-delay:260ms]">
              What lasts<span className="text-accent">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-10 grid items-end gap-8 border-t border-white/20 pt-8 md:grid-cols-12 lg:mt-14">
          <p className="max-w-[34ch] body-lg text-white/85 animate-fade-up [animation-delay:650ms] md:col-span-6 lg:col-span-5">
            Construction built around craftsmanship, clarity, and the way you live.
          </p>

          <ScrollCue />

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 animate-fade-up [animation-delay:780ms] md:col-span-6 md:justify-end lg:col-span-5">
            <ButtonLink href="/contact" variant="light" magnetic>
              Start a project
            </ButtonLink>
            <TextLink href="/projects" arrow={false} className="text-white">
              View our work
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollCue() {
  return (
    <div
      aria-hidden="true"
      className="hidden flex-col items-center gap-3 self-center animate-fade [animation-delay:1300ms] lg:col-span-2 lg:flex"
    >
      <span className="label-mono text-[0.625rem] text-white/60">Scroll</span>
      <span className="relative block h-10 w-px overflow-hidden bg-white/20">
        <span className="absolute inset-0 block bg-white animate-scroll-cue" />
      </span>
    </div>
  );
}
