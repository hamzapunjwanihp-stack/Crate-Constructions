import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getAdjacentProject, getProject, projectIndex, projects } from "@/data/projects";
import { site } from "@/data/site";
import { breadcrumbJsonLd, jsonLdString, pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/layout/PageTransition";
import { CTASection } from "@/components/ui/CTASection";
import { ArrowLeft } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BeforeAfter } from "@/components/projects/BeforeAfter";
import { NextProject } from "@/components/projects/NextProject";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — ${project.type} in ${project.location}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: { url: project.hero.src, alt: project.hero.alt },
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);
  const index = projectIndex(slug);
  const meta = [
    { label: "Location", value: project.location },
    { label: "Project type", value: project.type },
    { label: "Year", value: project.year ? String(project.year) : "—" },
    { label: "Scope", value: project.scopeSummary },
  ];

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: project.title, path: `/projects/${project.slug}` },
            ]),
          ),
        }}
      />

      <article>
        <header className="bg-bone">
          <div className="container-site pb-12 pt-[calc(var(--header-h)+2.5rem)] lg:pb-16 lg:pt-[calc(var(--header-h)+3.5rem)]">
            <div className="flex flex-wrap items-center justify-between gap-6 animate-fade">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 py-2 label-caps text-muted transition-colors hover:text-ink"
              >
                <ArrowLeft className="transition-transform duration-500 ease-expo group-hover:-translate-x-1" />
                All projects
              </Link>
              {site.showPlaceholderNotices && project.placeholder && (
                <p className="border border-ink/20 px-3 py-1.5 label-mono text-muted">
                  Placeholder project · Representative imagery
                </p>
              )}
            </div>

            <p className="mt-12 flex items-center gap-3 label-mono text-muted animate-fade [animation-delay:150ms] lg:mt-16">
              <span aria-hidden="true" className="inline-block size-[7px] bg-accent" />
              <span className="text-ink">Project {index}</span>
              <span aria-hidden="true" className="h-px w-6 bg-current opacity-50" />
              <span>{project.type}</span>
            </p>

            <h1 className="mt-6 display-lg">
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <span className="block animate-rise [animation-delay:200ms]">{project.title}</span>
              </span>
            </h1>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink/15 pt-8 animate-fade-up [animation-delay:500ms] md:grid-cols-4 lg:mt-16">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="label-mono text-muted">{m.label}</dt>
                  <dd className="mt-2 heading-sm">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="bg-bone">
          <div className="container-site">
            <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone md:aspect-[16/9]">
                <Image
                  src={project.hero.src}
                  alt={project.hero.alt}
                  fill
                  preload
                  sizes="(min-width: 1792px) 1664px, 100vw"
                  className="object-cover animate-settle"
                  style={project.hero.position ? { objectPosition: project.hero.position } : undefined}
                />
              </div>
            </ViewTransition>
          </div>
        </div>

        <section aria-labelledby="overview-title" className="bg-bone py-24 lg:py-36">
          <div className="container-site grid-site gap-y-12">
            <div className="col-span-4 md:col-span-3">
              <SectionLabel>Overview</SectionLabel>
            </div>
            <div className="col-span-4 md:col-span-9 lg:col-span-6">
              <Reveal>
                <h2
                  id="overview-title"
                  className="heading-md lg:text-[clamp(1.75rem,2.5vw,2.625rem)] lg:leading-[1.12]"
                >
                  {project.summary}
                </h2>
                <div className="mt-10 space-y-6 body-lg text-charcoal">
                  {project.overview.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="col-span-4 md:col-span-9 md:col-start-4 lg:col-span-3 lg:col-start-10">
              <Reveal delay={0.1}>
                <h3 className="label-mono text-muted">Scope of work</h3>
                <ul className="mt-5 border-t border-ink/15">
                  {project.scope.map((item, i) => (
                    <li key={item} className="flex gap-4 border-b border-ink/15 py-3.5 text-[0.9875rem]">
                      <span className="font-mono text-xs leading-6 text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <ProjectGallery images={project.gallery} />

        {project.beforeAfter && (
          <section aria-labelledby="compare-title" className="bg-white py-24 lg:py-36">
            <div className="container-site">
              <div className="grid-site mb-12 items-end gap-y-6 lg:mb-16">
                <div className="col-span-4 md:col-span-6">
                  <SectionLabel>Before &amp; after</SectionLabel>
                  <h2 id="compare-title" className="mt-6 heading-lg">
                    What changed.
                  </h2>
                </div>
                {site.showPlaceholderNotices && project.placeholder && (
                  <p className="col-span-4 label-mono text-muted md:col-span-5 md:col-start-8 md:text-right">
                    Representative imagery — not the same room
                  </p>
                )}
              </div>
              <BeforeAfter {...project.beforeAfter} />
            </div>
          </section>
        )}
      </article>

      <NextProject project={next} index={projectIndex(next.slug)} />
      <CTASection />
    </PageTransition>
  );
}
