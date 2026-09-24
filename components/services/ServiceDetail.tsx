import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";

type ServiceDetailProps = {
  service: Service;
  index: number;
};

/**
 * One full service chapter: oversized number, headline, description,
 * capabilities, and a primary photograph with an offset detail image.
 * Layout mirrors on alternating services.
 */
export function ServiceDetail({ service, index }: ServiceDetailProps) {
  const flip = index % 2 === 1;

  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className={cn("scroll-mt-[var(--header-h)] py-24 lg:py-36", flip ? "bg-white" : "bg-bone")}
    >
      <div className="container-site grid-site gap-y-14">
        <div className={cn("relative col-span-4 md:col-span-12 lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}>
          <ImageReveal
            image={service.image}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="aspect-[4/3] lg:aspect-square"
            parallax={5}
          />
          <div
            className={cn(
              "absolute -bottom-10 hidden w-[38%] border-[10px] md:block lg:-bottom-16",
              flip ? "-left-6 lg:-left-14" : "-right-6 lg:-right-14",
              flip ? "border-white" : "border-bone",
            )}
          >
            <ImageReveal image={service.detailImage} sizes="22vw" className="aspect-square" />
          </div>
        </div>

        <div
          className={cn(
            "col-span-4 flex flex-col md:col-span-10 lg:col-span-4 lg:pt-4",
            flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9",
          )}
        >
          <div className="flex items-start justify-between gap-6 border-t border-ink/15 pt-6">
            <p className="label-mono text-muted">
              <span className="text-ink">{service.number}</span> / {service.title}
            </p>
            <span aria-hidden="true" className="numeral -mt-2 text-[clamp(5rem,9vw,9rem)] text-graphite">
              {service.number}
            </span>
          </div>

          <AnimatedHeading
            id={`${service.slug}-title`}
            as="h2"
            lines={[service.headline]}
            className="mt-6 heading-lg"
          />

          <Reveal className="mt-8">
            <div className="space-y-5 text-[1.0625rem] leading-relaxed text-charcoal">
              {service.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h3 className="mt-10 label-mono text-muted">Capabilities</h3>
            <ul className="mt-4 grid grid-cols-1 border-t border-ink/15 sm:grid-cols-2 sm:gap-x-6">
              {service.capabilities.map((c) => (
                <li key={c} className="flex items-center gap-3 border-b border-ink/15 py-3 text-[0.9375rem]">
                  <span aria-hidden="true" className="size-1.5 shrink-0 bg-accent" />
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <ButtonLink href={`/contact?type=${service.inquiryType}`} variant="outline" magnetic>
                {service.cta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
