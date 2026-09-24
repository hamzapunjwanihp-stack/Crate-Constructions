import Link from "next/link";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/layout/PageTransition";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms governing use of the Crate Construction website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageTransition>
      <LegalPage
        title="Terms of Use"
        updated="September 2026"
        sections={[
          {
            heading: "Using this website",
            body: (
              <p>
                This website provides general information about {site.name} and its residential construction services.
                By using it, you agree to these terms.
              </p>
            ),
          },
          {
            heading: "No offer or contract",
            body: (
              <p>
                Content on this website is informational. It is not an offer, estimate, or guarantee. Pricing, scope,
                schedules, and warranties are established only in a written agreement signed by both parties.
              </p>
            ),
          },
          {
            heading: "Imagery & project content",
            body: (
              <p>
                Some photography and project content on this website is representative and may not depict work performed
                by {site.name}. Such content is identified where it appears.
              </p>
            ),
          },
          {
            heading: "Third-party information",
            body: (
              <p>
                This website references third-party information, including data published by BuildZoom. That information
                is provided for reference, belongs to its publisher, and may change without notice. Links to other
                websites are provided for convenience; we are not responsible for their content.
              </p>
            ),
          },
          {
            heading: "Intellectual property",
            body: (
              <p>
                The text, design, and branding on this website belong to {site.name} or its licensors and may not be
                reused without permission.
              </p>
            ),
          },
          {
            heading: "Governing law",
            body: (
              <p>
                These terms are governed by the laws of the State of Texas. Questions? Call{" "}
                <a href={site.phone.href}>{site.phone.display}</a> or review our{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>
            ),
          },
        ]}
      />
    </PageTransition>
  );
}
