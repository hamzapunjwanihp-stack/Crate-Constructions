import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { images } from "@/data/images";

export const metadata = pageMetadata({
  title: "Residential Projects in Dallas",
  description:
    "New homes, whole-home remodels, renovations, kitchens, baths, and additions by Crate Construction across Dallas and surrounding DFW communities.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <PageTransition>
      <PageHero
        label="Our work"
        title={[
          <>
            Our work
            <span className="ml-[0.12em] inline-block align-top font-mono text-[0.15em] font-medium leading-none tracking-[0.08em] text-muted">
              ({String(projects.length).padStart(2, "0")})
            </span>
          </>,
        ]}
        intro="New homes, remodels, renovations, and additions across Dallas and its surrounding communities."
        aside={
          site.showPlaceholderNotices ? (
            <p className="label-mono leading-relaxed text-muted">
              Placeholder portfolio. Project names, details, and photography are representative and will be replaced
              with documented Crate Construction work.
            </p>
          ) : undefined
        }
      />

      <section aria-label="Project list" className="bg-bone pb-28 lg:pb-40">
        <div className="container-site">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <CTASection image={images.trusses} />
    </PageTransition>
  );
}
