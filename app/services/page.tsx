import Link from "next/link";
import { images } from "@/data/images";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { jsonLdString, pageMetadata } from "@/lib/seo";
import { HydrationBoundary as HB } from "@/components/layout/HydrationBoundary";
import { PageTransition } from "@/components/layout/PageTransition";
import { CTASection } from "@/components/ui/CTASection";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceDetail } from "@/components/services/ServiceDetail";

export const metadata = pageMetadata({
  title: "Home Building, Remodeling & Renovation Services in Dallas",
  description:
    "New home construction, whole-home remodeling, kitchen and bathroom remodeling, home additions, renovations, and construction management in Dallas, TX.",
  path: "/services",
});

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Crate Construction services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.summary,
      serviceType: s.title,
      url: `${site.url}/services#${s.slug}`,
      areaServed: { "@type": "City", name: "Dallas" },
      provider: { "@id": `${site.url}/#business` },
    },
  })),
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(servicesJsonLd) }} />

      <PageHero
        tone="dark"
        label="Services"
        title={["From ground-up", "to reimagined."]}
        image={images.trusses}
        intro="Seven residential disciplines, managed by one accountable team — from the first site walk to the final walkthrough."
      />

      <section aria-labelledby="index-title" className="bg-bone py-20 lg:py-28">
        <div className="container-site grid-site gap-y-10">
          <div className="col-span-4 md:col-span-4">
            <SectionLabel>Index</SectionLabel>
            <h2 id="index-title" className="mt-6 heading-md">
              What we build
            </h2>
          </div>
          <nav aria-label="Services" className="col-span-4 md:col-span-8">
            <ol className="grid border-t border-ink/15 md:grid-cols-2 md:gap-x-10">
              {services.map((s) => (
                <li key={s.slug} className="border-b border-ink/15">
                  <Link
                    href={`#${s.slug}`}
                    className="group flex items-baseline gap-5 py-5 transition-colors hover:text-accent-ink"
                  >
                    <span className="font-mono text-xs text-muted">{s.number}</span>
                    <span className="heading-sm transition-transform duration-500 ease-expo group-hover:translate-x-1.5">
                      {s.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {services.map((service, i) => (
        <HB key={service.slug}>
          <ServiceDetail service={service} index={i} />
        </HB>
      ))}

      <CTASection
        image={images.houseInProgress}
        lines={["Not sure where", "to start?"]}
        body="Most projects blend more than one service. Tell us what you're planning and we'll help define the right scope."
      />
    </PageTransition>
  );
}
