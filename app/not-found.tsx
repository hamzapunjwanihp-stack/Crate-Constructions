import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-end bg-bone">
      <div className="container-site pb-20 pt-[calc(var(--header-h)+4rem)] lg:pb-28">
        <SectionLabel>Error 404</SectionLabel>
        <h1 className="mt-10 display-xl">
          <span className="block">Not on</span>
          <span className="block">
            the plans<span className="text-accent">.</span>
          </span>
        </h1>
        <p className="mt-10 max-w-[40ch] body-lg text-charcoal">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
          <ButtonLink href="/">Back to home</ButtonLink>
          <TextLink href="/projects">View projects</TextLink>
        </div>
      </div>
    </section>
  );
}
