import Link from "next/link";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/layout/PageTransition";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Crate Construction collects, uses, and protects information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageTransition>
      <LegalPage
        title="Privacy Policy"
        updated="September 2026"
        sections={[
          {
            heading: "What we collect",
            body: (
              <p>
                When you submit a project inquiry, we collect the information you provide: your name, email address,
                phone number, project type, location, budget range, desired start date, project description, and any
                files you choose to attach. We do not use advertising or tracking cookies on this website.
              </p>
            ),
          },
          {
            heading: "How we use it",
            body: (
              <p>
                We use your information only to respond to your inquiry, discuss your project, and prepare proposals you
                request. We do not sell or rent your personal information.
              </p>
            ),
          },
          {
            heading: "Service providers",
            body: (
              <p>
                Inquiries may be processed by trusted service providers that deliver form submissions, email, or
                customer-relationship tools on our behalf. They may use your information only to provide those services
                to us.
              </p>
            ),
          },
          {
            heading: "Retention & security",
            body: (
              <p>
                We keep inquiry information for as long as needed to respond and to maintain reasonable business
                records, and we take reasonable measures to protect it. No method of transmission over the internet is
                completely secure.
              </p>
            ),
          },
          {
            heading: "Your choices",
            body: (
              <p>
                You may ask us to update or delete the information you&apos;ve submitted by calling{" "}
                <a href={site.phone.href}>{site.phone.display}</a>
                {site.email ? (
                  <>
                    {" "}
                    or emailing <a href={`mailto:${site.email}`}>{site.email}</a>
                  </>
                ) : null}
                .
              </p>
            ),
          },
          {
            heading: "Changes",
            body: (
              <p>
                We may update this policy from time to time. The date above reflects the latest version. See also our{" "}
                <Link href="/terms">Terms of Use</Link>.
              </p>
            ),
          },
        ]}
      />
    </PageTransition>
  );
}
