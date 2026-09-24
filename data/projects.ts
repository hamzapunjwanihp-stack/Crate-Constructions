import { images, type SiteImage } from "./images";

/**
 * Project portfolio.
 *
 * ── IMPORTANT ──────────────────────────────────────────────────
 * Every project below is PLACEHOLDER content (flagged `placeholder: true`)
 * used to design and build the portfolio templates. Names, scopes, and
 * copy are illustrative; photography is representative stock imagery.
 * Replace each entry with a documented Crate Construction project,
 * set `placeholder: false`, and fill in `year`.
 * ───────────────────────────────────────────────────────────────
 */

export const projectCategories = ["New Construction", "Renovations", "Remodeling", "Additions"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  location: string;
  /** Used by the filters on /projects. */
  category: ProjectCategory;
  /** Display label, e.g. "Whole Home Renovation". */
  type: string;
  /** Completion year — leave null until confirmed. */
  year: number | null;
  placeholder: boolean;
  /** One-line scope shown in the project header. */
  scopeSummary: string;
  summary: string;
  overview: string[];
  scope: string[];
  hero: SiteImage;
  cover: SiteImage;
  gallery: SiteImage[];
  beforeAfter?: { before: SiteImage; after: SiteImage; caption: string };
};

export const projects: Project[] = [
  {
    slug: "modern-dallas-residence",
    scopeSummary: "Ground-up, lot to handover",
    title: "Modern Dallas Residence",
    location: "Dallas, TX",
    category: "New Construction",
    type: "New Construction",
    year: null,
    placeholder: true,
    summary: "A ground-up family home organized around natural light, simple volumes, and durable exterior materials.",
    overview: [
      "A new two-story residence planned from the lot up. The brief called for a calm, modern exterior that sits comfortably on a traditional Dallas street, with an interior that opens to the backyard.",
      "Pre-construction focused on sequencing the envelope correctly — flashing, window installation, and siding details were coordinated before framing began so the exterior would perform as well as it looks.",
    ],
    scope: [
      "Pre-construction planning & permitting",
      "Foundation & structural framing",
      "Exterior envelope & roofing",
      "MEP coordination",
      "Custom millwork & interior finishes",
    ],
    hero: images.modernFarmhouse,
    cover: images.modernFarmhouse,
    gallery: [images.kitchenIsland, images.livingGlass, images.bathSuite, images.beamDetail, images.framingAerial],
  },
  {
    slug: "oak-cliff-residence",
    scopeSummary: "Whole home, structure to finish",
    title: "Oak Cliff Residence",
    location: "Dallas, TX",
    category: "Renovations",
    type: "Whole Home Renovation",
    year: null,
    placeholder: true,
    summary:
      "A whole-home renovation that keeps the character of an established neighborhood while rebuilding what's behind the walls.",
    overview: [
      "An older home taken back to its structure and rebuilt for how a family lives today. The exterior keeps its street presence; the interior was replanned around a single, open kitchen and living space.",
      "Opening walls in an older house always reveals something. Structural corrections, new electrical and plumbing, and insulation upgrades were documented and approved before finishes were ordered.",
    ],
    scope: [
      "Existing-conditions assessment",
      "Selective demolition & structural repair",
      "Electrical, plumbing & HVAC replacement",
      "Kitchen & bath rebuild",
      "Interior & exterior finishes",
    ],
    hero: images.darkPorch,
    cover: images.darkPorch,
    gallery: [images.kitchenGalley, images.bathGreen, images.livingClerestory, images.renoShoring],
    beforeAfter: {
      before: images.renoKitchen,
      after: images.kitchenGalley,
      caption: "Kitchen — during renovation and complete",
    },
  },
  {
    slug: "contemporary-family-home",
    scopeSummary: "Ground-up, lot to handover",
    title: "Contemporary Family Home",
    location: "Dallas, TX",
    category: "New Construction",
    type: "New Construction",
    year: null,
    placeholder: true,
    summary: "Steep gables, painted brick, and black steel windows — a contemporary take on a familiar form.",
    overview: [
      "A new home with a strong, simple silhouette. Painted brick, black-framed windows, and a restrained palette let the proportions do the work.",
      "Inside, generous ceiling heights and a clear circulation spine connect the main living spaces, kitchen, and a quiet primary suite.",
    ],
    scope: [
      "Site preparation & foundation",
      "Framing & roof structure",
      "Masonry & window installation",
      "Kitchen & primary suite",
      "Final finishes & landscaping coordination",
    ],
    hero: images.whiteContemporary,
    cover: images.whiteContemporary,
    gallery: [images.kitchenMarble, images.trusses, images.bathDouble, images.livingBright],
  },
  {
    slug: "richardson-residence",
    scopeSummary: "Kitchen, baths & living areas",
    title: "Richardson Residence",
    location: "Richardson, TX",
    category: "Remodeling",
    type: "Residential Remodel",
    year: null,
    placeholder: true,
    summary:
      "A focused remodel that reworks the kitchen, baths, and main living spaces without changing the home's footprint.",
    overview: [
      "A remodel scoped to the rooms that mattered most: the kitchen, both bathrooms, and the main living area. The layout stayed; nearly every surface, fixture, and system in those rooms changed.",
      "Work was phased so the family could plan around it, with clear protection between active work areas and the rest of the house.",
    ],
    scope: [
      "Kitchen remodel",
      "Bathroom remodels",
      "Electrical & plumbing updates",
      "Flooring & lighting",
      "Paint & trim",
    ],
    hero: images.duskEntry,
    cover: images.duskEntry,
    gallery: [images.kitchenWarm, images.bathStone, images.renoHallway, images.livingGlass],
  },
  {
    slug: "lakewood-kitchen",
    scopeSummary: "Kitchen, down to the studs",
    title: "Lakewood Kitchen",
    location: "Dallas, TX",
    category: "Remodeling",
    type: "Kitchen Remodel",
    year: null,
    placeholder: true,
    summary:
      "Dark cabinetry, a concrete-topped island, and tall glass — a kitchen rebuilt around the way the family cooks.",
    overview: [
      "A kitchen taken down to the studs and rebuilt with a new layout, relocated plumbing, and upgraded electrical service for modern appliances.",
      "Cabinetry, counters, and lighting were resolved in drawings before demolition, so the room came together on a predictable schedule.",
    ],
    scope: [
      "Layout redesign coordination",
      "Demolition & rough-in",
      "Custom cabinetry installation",
      "Counters, tile & lighting",
      "Appliance integration",
    ],
    hero: images.kitchenDark,
    cover: images.kitchenDark,
    gallery: [images.kitchenMatte, images.carpenterMarking, images.timberCeiling],
    beforeAfter: {
      before: images.openedToStuds,
      after: images.kitchenDark,
      caption: "Opened to the structure — and complete",
    },
  },
  {
    slug: "east-dallas-addition",
    scopeSummary: "Second-story primary suite",
    title: "East Dallas Addition",
    location: "Dallas, TX",
    category: "Additions",
    type: "Home Addition",
    year: null,
    placeholder: true,
    summary: "A second-story addition that reads as part of the original house — new space, one continuous home.",
    overview: [
      "An addition planned to add a primary suite without giving up the yard. The new volume ties into the existing structure, roof lines, and material palette.",
      "Structural engineering, tie-in details, and weather protection were planned in advance so the existing home stayed livable through construction.",
    ],
    scope: [
      "Structural engineering coordination",
      "Foundation & framing tie-in",
      "Roofing & envelope integration",
      "Primary suite build-out",
      "Matching exterior finishes",
    ],
    hero: images.stoneWoodDetail,
    cover: images.stoneWoodDetail,
    gallery: [images.twoStoryFrame, images.bathWoodTub, images.framingRoom, images.livingClerestory],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export function projectIndex(slug: string) {
  return String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");
}
