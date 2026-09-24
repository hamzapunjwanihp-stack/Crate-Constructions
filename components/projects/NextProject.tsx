import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArrowRight } from "@/components/ui/Icons";

/** Large "next project" link that closes every project page. */
export function NextProject({ project, index }: { project: Project; index: string }) {
  return (
    <section aria-label="Next project" className="cv-auto border-t border-ink/15 bg-bone">
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="Next"
        className="group container-site grid-site items-center gap-y-10 py-20 lg:py-28"
      >
        <div className="col-span-4 md:col-span-7">
          <p className="flex items-center gap-3 label-mono text-muted">
            <span className="text-ink">Next project</span>
            <span aria-hidden="true" className="h-px w-6 bg-current" />
            <span>{index}</span>
          </p>
          <p className="mt-6 heading-xl transition-transform duration-700 ease-expo group-hover:translate-x-3">
            {project.title}
          </p>
          <p className="mt-5 flex items-center gap-4 text-muted">
            {project.location} — {project.type}
            <ArrowRight className="text-xl text-ink transition-transform duration-500 ease-expo group-hover:translate-x-2" />
          </p>
        </div>
        <div className="relative col-span-4 aspect-[4/3] overflow-hidden bg-stone md:col-span-5">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-expo group-hover:scale-105"
            style={project.cover.position ? { objectPosition: project.cover.position } : undefined}
          />
        </div>
      </Link>
    </section>
  );
}
