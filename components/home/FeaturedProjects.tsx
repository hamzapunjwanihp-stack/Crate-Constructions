import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { ProjectCard } from "@/components/projects/ProjectCard";

/** Editorial, staggered layout for the four featured projects. */
const layout = [
  { col: "md:col-span-7", aspect: "aspect-[4/3]", sizes: "(min-width: 768px) 58vw, 100vw" },
  { col: "md:col-span-4 md:col-start-9 md:mt-40", aspect: "aspect-[4/5]", sizes: "(min-width: 768px) 33vw, 100vw" },
  { col: "md:col-span-5 md:col-start-2", aspect: "aspect-[4/5]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { col: "md:col-span-6 md:col-start-7 md:mt-48", aspect: "aspect-[4/3]", sizes: "(min-width: 768px) 50vw, 100vw" },
];

export function FeaturedProjects() {
  const featured = projects.slice(0, 4);

  return (
    <section aria-labelledby="work-title" className="cv-auto section-y bg-bone">
      <div className="container-site">
        <div className="grid-site items-end gap-y-10">
          <div className="col-span-4 md:col-span-8">
            <SectionLabel index="03">Selected work</SectionLabel>
            <AnimatedHeading id="work-title" lines={["Built with intention."]} className="mt-8 heading-xl" />
          </div>
          <Reveal className="col-span-4 md:col-span-4 md:justify-self-end">
            <TextLink href="/projects">View all projects</TextLink>
          </Reveal>
        </div>

        <div className="mt-16 grid-site gap-y-20 lg:mt-24 lg:gap-y-10">
          {featured.map((project, i) => (
            <Reveal key={project.slug} className={cn("col-span-4", layout[i].col)} delay={0.05}>
              <ProjectCard
                project={project}
                index={String(i + 1).padStart(2, "0")}
                aspect={layout[i].aspect}
                sizes={layout[i].sizes}
              />
            </Reveal>
          ))}
        </div>

        {site.showPlaceholderNotices && (
          <p className="mt-20 max-w-[60ch] label-mono text-muted">
            Placeholder portfolio — projects and photography are representative and will be replaced with documented
            Crate Construction work.
          </p>
        )}
      </div>
    </section>
  );
}
