import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@/components/ui/Icons";

type ProjectCardProps = {
  project: Project;
  index: string;
  /** Aspect ratio utility for the image frame, e.g. "aspect-[4/5]". */
  aspect?: string;
  sizes?: string;
  headingLevel?: "h2" | "h3";
  className?: string;
};

/** Image-led project card. Hover: slow image push, title shift, arrow exchange. */
export function ProjectCard({
  project,
  index,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 768px) 50vw, 100vw",
  headingLevel: Heading = "h3",
  className,
}: ProjectCardProps) {
  return (
    <article className={cn("group relative", className)}>
      <Link href={`/projects/${project.slug}`} data-cursor="View" className="block focus-visible:outline-offset-8">
        <div className={cn("relative overflow-hidden bg-stone", aspect)}>
          <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
            <div className="absolute inset-0 transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.045]">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes={sizes}
                className="object-cover"
                style={project.cover.position ? { objectPosition: project.cover.position } : undefined}
              />
            </div>
          </ViewTransition>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10"
          />
        </div>

        <div className="mt-5 flex items-start justify-between gap-6 border-t border-ink/15 pt-5">
          <div className="min-w-0">
            <p className="flex items-center gap-3 label-mono text-muted">
              <span className="text-ink">{index}</span>
              <span aria-hidden="true" className="h-px w-5 bg-current" />
              <span>{project.type}</span>
            </p>
            <Heading className="mt-3 heading-md transition-transform duration-700 ease-expo group-hover:translate-x-2">
              {project.title}
            </Heading>
            <p className="mt-1.5 text-[0.9375rem] text-muted">{project.location}</p>
          </div>
          <span
            aria-hidden="true"
            className="relative mt-1 grid size-11 shrink-0 place-items-center overflow-hidden border border-ink/20 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-bone"
          >
            <ArrowUpRight className="transition-transform duration-500 ease-expo group-hover:-translate-y-8 group-hover:translate-x-8" />
            <ArrowUpRight className="absolute -translate-x-8 translate-y-8 transition-transform duration-500 ease-expo group-hover:translate-x-0 group-hover:translate-y-0" />
          </span>
        </div>
      </Link>
    </article>
  );
}
