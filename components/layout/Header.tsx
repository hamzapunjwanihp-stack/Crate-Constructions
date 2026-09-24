"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { darkHeroRoutes, mainNav, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight, PhoneIcon } from "@/components/ui/Icons";
// The full-screen menu (and its animation library) loads only when needed.
const loadMobileMenu = () => import("./MobileMenu").then((m) => m.MobileMenu);
const MobileMenu = dynamic(loadMobileMenu, { ssr: false });

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);

  // Solid background once scrolled; tuck away on scroll down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 560 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y < 560) setHidden(false);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Warm the menu chunk after the page settles on touch/small screens.
  useEffect(() => {
    if (window.matchMedia("(min-width: 64rem)").matches) return;
    const id = window.setTimeout(() => void loadMobileMenu(), 3000);
    return () => window.clearTimeout(id);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const overDarkHero = darkHeroRoutes.includes(pathname) && !scrolled;
  const light = overDarkHero || menuOpen;

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,color,border-color] duration-700 ease-expo",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
          menuOpen
            ? "border-transparent bg-transparent text-white"
            : overDarkHero
              ? "border-white/15 bg-transparent text-white"
              : "border-ink/10 bg-bone text-ink",
        )}
      >
        <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} — home`} className="relative -m-2 p-2" onClick={closeMenu}>
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {mainNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="group relative py-2 text-[0.9375rem] font-medium tracking-[-0.005em]"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-expo",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-5 xl:gap-7">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 font-mono text-[0.8125rem] tracking-[0.04em] opacity-80 transition-opacity hover:opacity-100 xl:inline-flex"
            >
              <PhoneIcon />
              {site.phone.display}
            </a>

            <Link
              href="/contact"
              className={cn(
                "group relative hidden min-h-11 items-center overflow-hidden border px-5 label-caps text-[0.75rem] lg:inline-flex",
                light ? "border-white/70" : "border-ink bg-ink text-bone",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-expo group-hover:scale-y-100",
                  light ? "bg-bone" : "bg-accent",
                )}
              />
              <span
                className={cn(
                  "relative flex items-center gap-3 transition-colors duration-500",
                  light ? "group-hover:text-ink" : "group-hover:text-white",
                )}
              >
                Start a project
                <ArrowRight className="transition-transform duration-500 ease-expo group-hover:translate-x-1" />
              </span>
            </Link>

            <button
              id="menu-toggle"
              type="button"
              className="-mr-2 flex min-h-11 items-center gap-3 px-2 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => {
                setMenuLoaded(true);
                setMenuOpen((open) => !open);
              }}
            >
              <span className="label-caps text-[0.75rem]">{menuOpen ? "Close" : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-7">
                <span
                  className={cn(
                    "absolute left-0 top-[2px] h-px w-full bg-current transition-transform duration-500 ease-expo",
                    menuOpen && "translate-y-[4px] rotate-[30deg]",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[10px] h-px w-full bg-current transition-transform duration-500 ease-expo",
                    menuOpen && "-translate-y-[4px] -rotate-[30deg]",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuLoaded && <MobileMenu open={menuOpen} onClose={closeMenu} />}
    </>
  );
}
