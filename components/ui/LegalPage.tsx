import { PageHero } from "./PageHero";

type LegalPageProps = {
  title: string;
  updated: string;
  sections: { heading: string; body: React.ReactNode }[];
};

/** Simple, readable layout for policy pages. */
export function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <>
      <PageHero label={`Last updated ${updated}`} title={[title]} size="lg" />
      <section className="bg-bone pb-28 lg:pb-40">
        <div className="container-site grid-site">
          <div className="col-span-4 md:col-span-10 lg:col-span-7 lg:col-start-4">
            {sections.map((s, i) => (
              <div key={s.heading} className="grid gap-4 border-t border-ink/15 py-10 md:grid-cols-[3rem_1fr]">
                <span className="font-mono text-xs leading-8 text-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="heading-md">{s.heading}</h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-charcoal [&_a]:underline [&_a]:underline-offset-4">
                    {s.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
