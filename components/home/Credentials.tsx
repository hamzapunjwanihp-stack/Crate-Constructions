import { buildZoom, companyFacts } from "@/data/credentials";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";

const stats = [
  {
    value: String(buildZoom.score),
    label: "BuildZoom score",
    note: buildZoom.scoreContext,
    marker: true,
  },
  {
    value: String(buildZoom.activeSince),
    label: "Active since",
    note: "Per BuildZoom's permit and licensing records",
    marker: true,
  },
  {
    value: String(buildZoom.permitsOnRecord),
    label: "Building permits on record",
    note: `Permitted work in ${buildZoom.permitCities.join(" and ")}`,
    marker: true,
  },
  {
    value: String(buildZoom.registrations.length).padStart(2, "0"),
    label: "Active city registrations",
    note: buildZoom.registrations.map((r) => `${r.type}, ${r.jurisdiction.replace("City of ", "")}`).join(" · "),
    marker: true,
  },
];

/** Credibility built only from verifiable, clearly attributed third-party data. */
export function Credentials() {
  const extraFacts = [
    companyFacts.yearsInBusiness && { label: "Years in business", value: String(companyFacts.yearsInBusiness) },
    companyFacts.homesCompleted && { label: "Homes completed", value: String(companyFacts.homesCompleted) },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section aria-labelledby="record-title" data-theme="dark" className="cv-auto section-y bg-ink text-white">
      <div className="container-site">
        <div className="grid-site gap-y-10">
          <div className="col-span-4 md:col-span-7">
            <SectionLabel index="07" tone="dark">
              On the record
            </SectionLabel>
            <AnimatedHeading id="record-title" lines={["Credentials", "you can check."]} className="mt-8 heading-xl" />
          </div>
          <Reveal className="col-span-4 self-end md:col-span-5">
            <p className="max-w-[42ch] body-lg text-concrete">
              We&apos;d rather show you the record than ask you to take our word for it. The figures below are published
              by BuildZoom, an independent platform that tracks contractor permits and licensing.
            </p>
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {[...stats, ...extraFacts.map((f) => ({ ...f, note: "Company reported", marker: false }))].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="flex flex-col border-t border-white/20 pb-12 pt-8">
              <dt className="order-2 mt-6 label-mono text-white">
                {stat.label}
                {stat.marker && <span className="text-accent-light">*</span>}
              </dt>
              <dd className="order-1 numeral text-[clamp(4.5rem,8.5vw,8.5rem)] text-white">{stat.value}</dd>
              <dd className="order-3 mt-3 max-w-[30ch] text-sm leading-relaxed text-concrete">{stat.note}</dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-20 grid-site gap-y-14 lg:mt-28">
          <div className="col-span-4 md:col-span-12 lg:col-span-8">
            <h3 className="label-mono text-concrete">Selected permit history</h3>
            <ul className="mt-6 border-t border-white/25 md:hidden">
              {buildZoom.permitHistory.map((row, i) => (
                <li key={i} className="border-b border-white/10 py-4">
                  <p className="text-white">{row.work}</p>
                  <p className="mt-1 flex gap-3 font-mono text-xs text-concrete">
                    <span>{row.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{row.city}</span>
                    <span aria-hidden="true">·</span>
                    <span>{row.status}</span>
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 hidden md:block">
              <table className="w-full border-collapse text-left text-[0.9375rem]">
                <caption className="sr-only">
                  Selected building permits for Crate Construction as listed by BuildZoom
                </caption>
                <thead>
                  <tr className="border-b border-white/25 label-mono text-concrete">
                    <th scope="col" className="py-3 pr-6 font-medium">
                      Year
                    </th>
                    <th scope="col" className="py-3 pr-6 font-medium">
                      Work
                    </th>
                    <th scope="col" className="py-3 pr-6 font-medium">
                      City
                    </th>
                    <th scope="col" className="py-3 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {buildZoom.permitHistory.map((row, i) => (
                    <tr key={i} className="border-b border-white/10 transition-colors hover:bg-white/[0.03]">
                      <td className="py-4 pr-6 font-mono text-sm text-concrete">{row.year}</td>
                      <td className="py-4 pr-6 text-white">{row.work}</td>
                      <td className="py-4 pr-6 text-concrete">{row.city}</td>
                      <td className="py-4 text-concrete">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-4 lg:pl-8">
            <h3 className="label-mono text-concrete">Registrations on record</h3>
            <ul className="mt-6 border-t border-white/25">
              {buildZoom.registrations.map((r) => (
                <li
                  key={r.jurisdiction}
                  className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4"
                >
                  <span>
                    <span className="block text-white">{r.type}</span>
                    <span className="text-sm text-concrete">{r.jurisdiction}</span>
                  </span>
                  <span className="label-mono text-accent-light">{r.status}</span>
                </li>
              ))}
            </ul>
            <TextLink href={buildZoom.url} className="mt-8 text-white">
              Full profile on BuildZoom
            </TextLink>
          </div>
        </div>

        <p className="mt-20 max-w-[90ch] border-t border-white/15 pt-6 text-xs leading-relaxed text-concrete">
          <span className="text-accent-light">*</span> Third-party information. Score, ranking, activity dates, permit
          counts, and registrations are calculated and published by {buildZoom.source} (buildzoom.com) and were
          retrieved in {buildZoom.retrieved}. They may change over time and are shown for reference only. Street
          addresses are omitted to protect homeowners&apos; privacy.
        </p>
      </div>
    </section>
  );
}
