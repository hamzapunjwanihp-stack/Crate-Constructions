/**
 * Central company information.
 *
 * Everything here is either (a) supplied in the project brief or
 * (b) verified from Crate Construction's public BuildZoom profile.
 * Anything not yet verified is left empty/null and is hidden in the UI
 * until it is filled in.
 */

/**
 * Canonical site origin. Uses NEXT_PUBLIC_SITE_URL when it holds a valid URL,
 * otherwise Vercel's production domain, otherwise localhost. Empty or
 * malformed values are ignored so a blank environment variable can't break
 * the build.
 */
function resolveSiteUrl() {
  const candidates = [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL];
  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    try {
      return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`).origin;
    } catch {
      // Not a usable URL — try the next option.
    }
  }
  return "http://localhost:3000";
}

export const site = {
  name: "Crate Construction",
  shortName: "Crate",
  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.yourdomain.com). */
  url: resolveSiteUrl(),
  tagline: "We build what lasts.",
  description:
    "Crate Construction provides residential construction, remodeling, renovations, additions, and new-home construction across Dallas and surrounding communities.",

  phone: {
    display: "(214) 664-8589",
    href: "tel:+12146648589",
    e164: "+12146648589",
  },

  /** Add a public inbox when available — hidden in the UI while null. */
  email: null as string | null,

  location: {
    city: "Dallas",
    region: "TX",
    regionName: "Texas",
    postalCode: "75211",
    country: "US",
  },

  /** Dallas city-center coordinates — used only for decorative map details. */
  coordinates: { lat: "32.7767° N", lng: "96.7970° W" },

  serviceAreas: {
    primary: ["Dallas", "Oak Cliff", "Richardson"],
    summary: "Dallas, Oak Cliff, Richardson, and surrounding Dallas–Fort Worth communities",
  },

  /**
   * Social profiles. Leave empty until the real URLs are confirmed —
   * empty entries are not rendered anywhere on the site.
   */
  social: [
    { label: "Instagram", href: "" },
    { label: "Facebook", href: "" },
    { label: "LinkedIn", href: "" },
  ],

  /**
   * While the portfolio uses placeholder projects and representative
   * photography, keep this `true` so pages are transparently labeled.
   * Switch to `false` once real Crate Construction projects are loaded.
   */
  showPlaceholderNotices: true,
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Process", href: "/process" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "New Construction", href: "/services#new-home-construction" },
      { label: "Remodeling", href: "/services#whole-home-remodeling" },
      { label: "Renovations", href: "/services#residential-renovations" },
      { label: "Additions", href: "/services#home-additions" },
    ],
  },
];

/** Routes whose hero is dark, so the header starts transparent with light text. */
export const darkHeroRoutes = ["/", "/services", "/about", "/process"];
