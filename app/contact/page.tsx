import { Suspense } from "react";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/layout/PageTransition";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { PhoneIcon } from "@/components/ui/Icons";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata = pageMetadata({
  title: "Start a Project — Contact a Dallas Home Builder",
  description:
    "Planning a new home, remodel, renovation, or addition in Dallas? Tell Crate Construction about your project or call (214) 664-8589.",
  path: "/contact",
});

const nextSteps = [
  { title: "We review your inquiry", body: "We read every detail you send — scope, location, timing, and any plans." },
  { title: "We talk it through", body: "A conversation about goals, budget range, and what the project involves." },
  { title: "We walk the site", body: "When it's a fit, we visit the property to understand existing conditions." },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHero
        label="Start a project"
        title={["Let's build", "something."]}
        intro="Tell us what you're planning. The more we know, the more useful our first conversation will be."
        aside={
          <p className="lg:hidden">
            <span className="block label-mono text-muted">Prefer to talk?</span>
            <a
              href={site.phone.href}
              className="mt-2 inline-flex items-center gap-3 font-display text-2xl tracking-[-0.02em]"
            >
              <PhoneIcon className="text-accent" />
              {site.phone.display}
            </a>
          </p>
        }
      />

      <section aria-label="Project inquiry" className="bg-bone pb-28 lg:pb-40">
        <div className="container-site grid-site gap-y-16">
          <aside className="order-2 col-span-4 md:col-span-12 lg:order-none lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <SectionLabel>Direct</SectionLabel>
              <a
                href={site.phone.href}
                className="group mt-6 inline-flex items-center gap-3 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] tracking-[-0.02em]"
              >
                <PhoneIcon className="text-accent" />
                <span className="link-underline">{site.phone.display}</span>
              </a>
              <p className="mt-3 text-muted">
                {site.location.city}, {site.location.regionName}
              </p>
              {site.email && (
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block text-charcoal underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              )}

              <div className="mt-14 border-t border-ink/15 pt-8">
                <h2 className="label-mono text-muted">What happens next</h2>
                <ol className="mt-6 space-y-6">
                  {nextSteps.map((step, i) => (
                    <li key={step.title} className="grid grid-cols-[2.5rem_1fr]">
                      <span className="font-mono text-xs leading-7 text-muted">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="heading-sm">{step.title}</h3>
                        <p className="mt-1 text-[0.9375rem] text-charcoal">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-14 border-t border-ink/15 pt-8 text-sm text-muted">
                Serving {site.serviceAreas.summary}.
              </p>
            </div>
          </aside>

          <div className="order-1 col-span-4 md:col-span-12 lg:order-none lg:col-span-7 lg:col-start-6">
            <Suspense fallback={<div className="min-h-[60rem]" aria-hidden="true" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
