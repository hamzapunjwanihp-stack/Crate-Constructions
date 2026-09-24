"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { TextLink } from "@/components/ui/TextLink";

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block size-5 shrink-0">
      <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
      <span
        className={cn(
          "absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-500 ease-expo",
          open && "scale-y-0",
        )}
      />
    </span>
  );
}

/**
 * Numbered service accordion with a sticky, cross-wiping image on desktop.
 * Height and image transitions are pure CSS (grid-row interpolation and
 * clip-path), so the component stays light.
 */
export function ServiceAccordion({ services }: { services: Service[] }) {
  const [open, setOpen] = useState(0);
  const [shown, setShown] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const baseId = useId();

  const show = (i: number) => {
    if (i === shown) return;
    setPrevious(shown);
    setShown(i);
  };

  return (
    <div className="grid-site gap-y-12">
      <ul className="col-span-4 border-t border-white/15 md:col-span-12 lg:col-span-7">
        {services.map((service, i) => {
          const isOpen = open === i;
          const buttonId = `${baseId}-btn-${i}`;
          const panelId = `${baseId}-panel-${i}`;
          return (
            <li
              key={service.slug}
              className="border-b border-white/15"
              onMouseEnter={() => show(i)}
              onMouseLeave={() => show(open >= 0 ? open : i)}
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => {
                    setOpen(isOpen ? -1 : i);
                    show(i);
                  }}
                  className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 lg:py-7"
                >
                  <span className="w-7 shrink-0 font-mono text-xs text-concrete">{service.number}</span>
                  <span
                    className={cn(
                      "flex-1 font-display text-[clamp(1.5rem,2.9vw,2.875rem)] font-normal leading-[1.05] tracking-[-0.03em] transition-[color,transform] duration-500 ease-expo",
                      isOpen ? "text-white" : "text-white/60 group-hover:translate-x-1.5 group-hover:text-white",
                    )}
                  >
                    {service.title}
                  </span>
                  <span className={cn("transition-colors", isOpen ? "text-accent-light" : "text-white/70")}>
                    <PlusMinus open={isOpen} />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!isOpen}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-700 ease-expo",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="pb-9 pl-12 md:pl-[3.75rem] lg:pb-11">
                    {isOpen && (
                      <div className="relative mb-7 aspect-[16/10] overflow-hidden bg-charcoal lg:hidden">
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          fill
                          sizes="(min-width: 768px) 80vw, 90vw"
                          className="object-cover"
                          style={service.image.position ? { objectPosition: service.image.position } : undefined}
                        />
                      </div>
                    )}
                    <p className="max-w-[50ch] body-lg text-concrete">{service.summary}</p>
                    <TextLink href={`/services#${service.slug}`} className="mt-6 text-white">
                      Explore {service.shortTitle.toLowerCase()}
                    </TextLink>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
        <div className="sticky top-[calc(var(--header-h)+2.5rem)]">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
            {services.map((service, i) => {
              const state = i === shown ? "current" : i === previous ? "previous" : "idle";
              return (
                <div
                  key={service.slug}
                  aria-hidden={state !== "current"}
                  className={cn(
                    "absolute inset-0",
                    state === "current" &&
                      "z-20 [clip-path:inset(0_0_0_0)] transition-[clip-path] duration-[900ms] ease-expo",
                    state === "previous" && "z-10 [clip-path:inset(0_0_0_0)]",
                    state === "idle" && "z-0 [clip-path:inset(100%_0_0_0)]",
                  )}
                >
                  <Image
                    src={service.image.src}
                    alt={state === "current" ? service.image.alt : ""}
                    fill
                    sizes="(min-width: 1024px) 33vw, 1px"
                    className={cn(
                      "object-cover transition-transform duration-[1400ms] ease-expo",
                      state === "current" ? "scale-100" : "scale-110",
                    )}
                    style={service.image.position ? { objectPosition: service.image.position } : undefined}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between label-mono text-concrete">
            <span>{services[shown].shortTitle}</span>
            <span>
              <span className="text-white">{services[shown].number}</span> / {String(services.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
