import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { HydrationBoundary as HB } from "@/components/layout/HydrationBoundary";
import { PageTransition } from "@/components/layout/PageTransition";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Statement } from "@/components/home/Statement";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Philosophy } from "@/components/home/Philosophy";
import { ProcessSection } from "@/components/home/ProcessSection";
import { Credentials } from "@/components/home/Credentials";
import { ServiceArea } from "@/components/home/ServiceArea";
import { CTASection } from "@/components/ui/CTASection";

export const metadata = pageMetadata({
  title: "Crate Construction | Dallas General Contractor & Residential Builder",
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <HB>
        <Intro />
      </HB>
      <HB>
        <Statement />
      </HB>
      <HB>
        <FeaturedProjects />
      </HB>
      <HB>
        <ServicesSection />
      </HB>
      <HB>
        <Philosophy />
      </HB>
      <HB>
        <ProcessSection />
      </HB>
      <HB>
        <Credentials />
      </HB>
      <HB>
        <ServiceArea />
      </HB>
      <HB>
        <CTASection />
      </HB>
    </PageTransition>
  );
}
