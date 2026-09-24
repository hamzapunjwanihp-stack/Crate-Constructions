"use client";

import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "framer-motion";
import { useState } from "react";
import { projectCategories, projectIndex, type Project, type ProjectCategory } from "@/data/projects";
import { cn, ease } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | ProjectCategory;

/** Editorial rhythm: wide / narrow, then narrow / wide. */
const rhythm = [
  { col: "md:col-span-7", aspect: "aspect-[4/3]", sizes: "(min-width: 768px) 58vw, 100vw" },
  { col: "md:col-span-5 md:mt-32", aspect: "aspect-[4/5]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { col: "md:col-span-5", aspect: "aspect-[4/5]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { col: "md:col-span-7 md:mt-32", aspect: "aspect-[4/3]", sizes: "(min-width: 768px) 58vw, 100vw" },
];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...projectCategories];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const count = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.category === f).length);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <div
          role="group"
          aria-label="Filter projects by type"
          className="flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-ink/15 pb-4 md:gap-x-10"
        >
          {filters.map((f) => {
            const active = filter === f;
            const n = count(f);
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                disabled={n === 0}
                onClick={() => setFilter(f)}
                className={cn(
                  "group relative py-3 text-[0.9875rem] font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40",
                  active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {f}
                <sup className="ml-1 font-mono text-[0.625rem] font-normal">{String(n).padStart(2, "0")}</sup>
                {active && (
                  <motion.span
                    layoutId="project-filter"
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-ink"
                    transition={{ duration: 0.6, ease: ease.expo }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
          {filter === "All" ? "" : ` in ${filter}`}
        </p>

        <motion.ul layout className="mt-14 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-12 lg:mt-20 lg:gap-x-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => {
              const r = rhythm[i % rhythm.length];
              return (
                <motion.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.35 } }}
                  transition={{ duration: 0.8, ease: ease.expo, delay: i * 0.04 }}
                  className={cn("col-span-1", r.col)}
                >
                  <ProjectCard
                    project={project}
                    index={projectIndex(project.slug)}
                    aspect={r.aspect}
                    sizes={r.sizes}
                    headingLevel="h2"
                  />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </MotionConfig>
  );
}
