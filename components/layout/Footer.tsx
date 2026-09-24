import Link from "next/link";
import { footerNav, site } from "@/data/site";
import { buildZoom } from "@/data/credentials";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowUpRight, PhoneIcon } from "@/components/ui/Icons";
import { LogoMark } from "@/components/ui/Logo";

const linkClass = "inline-flex py-1 text-[0.9375rem] text-bone/80 transition-colors duration-300 hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = site.social.filter((s) => s.href);

  return (
    <footer className="bg-ink text-bone" data-theme="dark">
      <div className="container-site pt-24 lg:pt-32">
        <div className="grid-site gap-y-16">
          <div className="col-span-4 md:col-span-12 lg:col-span-5">
            <LogoMark className="size-10 text-accent" />
            <p className="mt-8 max-w-[15ch] heading-lg text-white">Spaces made for living. Built for the long term.</p>
            <div className="mt-10">
              <ButtonLink href="/contact" variant="light" magnetic>
                Start a project
              </ButtonLink>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="col-span-4 grid grid-cols-2 gap-x-6 gap-y-12 md:col-span-12 md:grid-cols-4 lg:col-span-7"
          >
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="label-mono text-concrete">{group.title}</h2>
                <ul className="mt-5 space-y-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="label-mono text-concrete">Connect</h2>
              <ul className="mt-5 space-y-2">
                <li>
                  <Link href="/contact" className={linkClass}>
                    Contact
                  </Link>
                </li>
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {s.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={buildZoom.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} items-center gap-1.5`}
                  >
                    BuildZoom profile
                    <ArrowUpRight className="size-3" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="label-mono text-concrete">Contact</h2>
              <address className="mt-5 space-y-2 not-italic">
                <a href={site.phone.href} className={`${linkClass} items-center gap-2`}>
                  <PhoneIcon className="text-accent-light" />
                  {site.phone.display}
                </a>
                <p className="text-[0.9375rem] text-bone/80">
                  {site.location.city}, {site.location.regionName}
                </p>
                {site.email && (
                  <a href={`mailto:${site.email}`} className={linkClass}>
                    {site.email}
                  </a>
                )}
              </address>
            </div>
          </nav>
        </div>

        <div className="mt-24 border-t border-white/15 pt-8 lg:mt-32">
          <p
            aria-hidden="true"
            className="select-none font-display font-semibold uppercase leading-[0.8] tracking-[-0.045em] text-white [font-stretch:86%] text-[min(14vw,15.75rem)]"
          >
            <span className="block">Crate</span>
            <span className="block">Construction</span>
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/15 py-8 text-sm text-bone/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
          <p className="label-mono text-concrete">
            Built in {site.location.city}, {site.location.regionName}
          </p>
        </div>
      </div>
    </footer>
  );
}
