/**
 * Central image library.
 *
 * ── Replacing placeholder photography ──────────────────────────
 * Every image is currently REPRESENTATIVE stock photography (Unsplash,
 * free license), stored locally in /public/images/placeholders so the
 * site runs with no external image dependency. `origin` records where
 * each placeholder came from.
 *
 * To swap in real Crate Construction photography:
 *   1. Add files to /public/images/... (e.g. /public/images/projects/oak-cliff/hero.jpg)
 *   2. Point `src` at the new path and update `alt` to describe the real photo.
 *   3. Remove `origin`. Delete unused files from /public/images/placeholders.
 * Every component reads from this file, so nothing else needs to change.
 * ───────────────────────────────────────────────────────────────
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** Source of a placeholder image (for attribution/tracking). */
  origin?: string;
  /** CSS object-position focal point for tight crops, e.g. "50% 70%". */
  position?: string;
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const images = {
  /* Exteriors */
  heroDusk: {
    src: "/images/placeholders/hero-dusk.jpg",
    origin: unsplash("1724931420584-d360afc3e1f8"),
    alt: "Dark board-and-batten home lit warmly from within at dusk",
  },
  blackStoneBuild: {
    src: "/images/placeholders/black-stone-build.jpg",
    origin: unsplash("1773427457869-6fbded8b89b9"),
    alt: "New home with black vertical siding and limestone gables nearing completion",
  },
  whiteContemporary: {
    src: "/images/placeholders/white-contemporary.jpg",
    origin: unsplash("1662505899914-1000c566477b"),
    alt: "White brick contemporary home with black-framed windows and steep gables",
  },
  modernFarmhouse: {
    src: "/images/placeholders/modern-farmhouse.jpg",
    origin: unsplash("1771366260867-7e07094579d7"),
    alt: "Modern farmhouse entry with white board-and-batten siding, a white oak door, and glass garage doors",
  },
  infillModern: {
    src: "/images/placeholders/infill-modern.jpg",
    origin: unsplash("1627141234469-24711efb373c"),
    alt: "Modern infill home clad in dark metal and wood beside a traditional neighbor",
  },
  pergolaModern: {
    src: "/images/placeholders/pergola-modern.jpg",
    origin: unsplash("1633354747567-e0682586f082"),
    alt: "Contemporary home with a slatted steel pergola and warm interior light",
  },
  duskEntry: {
    src: "/images/placeholders/dusk-entry.jpg",
    origin: unsplash("1494526585095-c41746248156"),
    alt: "Two-story home with a lit entry and garage under an evening sky",
  },
  stoneWoodDetail: {
    src: "/images/placeholders/stone-wood-detail.jpg",
    origin: unsplash("1691425700585-c108acad6467"),
    alt: "Cantilevered white volume above stacked stone and vertical wood siding",
  },
  darkPorch: {
    src: "/images/placeholders/dark-porch.jpg",
    origin: unsplash("1779588000947-d1fe6adab784"),
    alt: "Dark gray home with a timber-framed front porch among mature trees",
    position: "50% 72%",
  },
  houseInProgress: {
    src: "/images/placeholders/house-in-progress.jpg",
    origin: unsplash("1778164912282-c89de4d198ea"),
    alt: "Two-story home under construction behind a mature tree",
    position: "50% 80%",
  },

  /* Construction */
  framingAerial: {
    src: "/images/placeholders/framing-aerial.jpg",
    origin: unsplash("1556156653-e5a7c69cc263"),
    alt: "Aerial view of a home's wood framing revealing its floor plan",
  },
  framingInterior: {
    src: "/images/placeholders/framing-interior.jpg",
    origin: unsplash("1715760374522-a609a0c2f65e"),
    alt: "Interior stud walls framing a doorway and window openings",
  },
  framingRoom: {
    src: "/images/placeholders/framing-room.jpg",
    origin: unsplash("1704742950992-9815a104820c"),
    alt: "Room framed in lumber with sheathing and rough window openings",
  },
  trusses: {
    src: "/images/placeholders/trusses.jpg",
    origin: unsplash("1676802037786-3697d60497ae"),
    alt: "Roof trusses set on a new wood-framed house against a clear sky",
  },
  roofFraming: {
    src: "/images/placeholders/roof-framing.jpg",
    origin: unsplash("1690719095815-549c60090c9f"),
    alt: "Roof framing on a house under construction",
  },
  framerOnWall: {
    src: "/images/placeholders/framer-on-wall.jpg",
    origin: unsplash("1587582423116-ec07293f0395"),
    alt: "Framer working on top of a wall frame against a blue sky",
  },
  twoStoryFrame: {
    src: "/images/placeholders/two-story-frame.jpg",
    origin: unsplash("1693639767415-27ff64ce4da2"),
    alt: "Two-story wood frame wrapped in scaffolding",
  },
  concretePour: {
    src: "/images/placeholders/concrete-pour.jpg",
    origin: unsplash("1685464196332-ed9c9da28d9a"),
    alt: "Concrete being placed and screeded for a slab",
  },
  planMarkup: {
    src: "/images/placeholders/plan-markup.jpg",
    origin: unsplash("1503387762-592deb58ef4e"),
    alt: "Hands marking up architectural drawings on a desk",
  },
  planFlatlay: {
    src: "/images/placeholders/plan-flatlay.jpg",
    origin: unsplash("1603901622056-0a5bee231395"),
    alt: "Architectural plans with drafting pencils and a steel ruler",
  },
  carpenterMarking: {
    src: "/images/placeholders/carpenter-marking.jpg",
    origin: unsplash("1659930087003-2d64e33181f7"),
    alt: "Carpenter marking a cut line on a timber board",
  },
  renoKitchen: {
    src: "/images/placeholders/reno-kitchen.jpg",
    origin: unsplash("1618832515490-e181c4794a45"),
    alt: "Kitchen mid-renovation with cabinetry protected in plastic",
  },
  renoShoring: {
    src: "/images/placeholders/reno-shoring.jpg",
    origin: unsplash("1634586648651-f1fb9ec10d90"),
    alt: "Gutted room supported by temporary steel shoring posts during renovation",
  },
  renoHallway: {
    src: "/images/placeholders/reno-hallway.jpg",
    origin: unsplash("1674649207083-281c2517ab49"),
    alt: "Tradesperson working in a hallway during an interior renovation",
  },
  openedToStuds: {
    src: "/images/placeholders/opened-to-studs.jpg",
    origin: unsplash("1517581177682-a085bb7ffb15"),
    alt: "Interior opened to the structure during a renovation",
  },

  /* Interiors */
  kitchenDark: {
    src: "/images/placeholders/kitchen-dark.jpg",
    origin: unsplash("1696986681606-b156ccd761c5"),
    alt: "Kitchen with black cabinetry, a concrete-topped island, and tall windows",
  },
  kitchenGalley: {
    src: "/images/placeholders/kitchen-galley.jpg",
    origin: unsplash("1502005097973-6a7082348e28"),
    alt: "Long galley kitchen in warm wood opening onto a garden",
  },
  kitchenIsland: {
    src: "/images/placeholders/kitchen-island.jpg",
    origin: unsplash("1686056040167-1e3dead46d9a"),
    alt: "Open kitchen with a deep-teal island and open shelving",
  },
  kitchenWarm: {
    src: "/images/placeholders/kitchen-warm.jpg",
    origin: unsplash("1628745277862-bc0b2d68c50c"),
    alt: "Bright kitchen with a white island and warm wood cabinetry",
  },
  kitchenMarble: {
    src: "/images/placeholders/kitchen-marble.jpg",
    origin: unsplash("1686023858216-4f54c853acf2"),
    alt: "White kitchen with a marble backsplash and waterfall island",
  },
  kitchenMatte: {
    src: "/images/placeholders/kitchen-matte.jpg",
    origin: unsplash("1600684388091-627109f3cd60"),
    alt: "Matte black kitchen cabinetry above wide-plank wood floors",
  },
  bathDouble: {
    src: "/images/placeholders/bath-double.jpg",
    origin: unsplash("1584622650111-993a426fbf0a"),
    alt: "Bathroom with a frameless glass shower and double vanity",
  },
  bathStone: {
    src: "/images/placeholders/bath-stone.jpg",
    origin: unsplash("1661107259637-4e1c55462428"),
    alt: "Bathroom with stone-look tile and a floating wood vanity",
  },
  bathSuite: {
    src: "/images/placeholders/bath-suite.jpg",
    origin: unsplash("1638799869566-b17fa794c4de"),
    alt: "Primary bath with a freestanding tub, walk-in shower, and wood vanity",
  },
  bathGreen: {
    src: "/images/placeholders/bath-green.jpg",
    origin: unsplash("1682888818696-906287d759f5"),
    alt: "Green shaker vanity with marble shower walls and brass fixtures",
  },
  bathWoodTub: {
    src: "/images/placeholders/bath-wood-tub.jpg",
    origin: unsplash("1642755622932-d1e0cb783dc5"),
    alt: "Black freestanding tub against a warm wood-paneled wall",
  },
  livingGlass: {
    src: "/images/placeholders/living-glass.jpg",
    origin: unsplash("1600210492493-0946911123ea"),
    alt: "Living room with a leather sofa beneath a wood ceiling and a wall of glass",
  },
  livingBright: {
    src: "/images/placeholders/living-bright.jpg",
    origin: unsplash("1613545325278-f24b0cae1224"),
    alt: "Double-height living room with a linear fireplace",
  },
  livingClerestory: {
    src: "/images/placeholders/living-clerestory.jpg",
    origin: unsplash("1618221195710-dd6b41faaea6"),
    alt: "Living room with clerestory windows and natural materials",
  },

  /* Details */
  timberCeiling: {
    src: "/images/placeholders/timber-ceiling.jpg",
    origin: unsplash("1728025801541-20b44f6ed5f3"),
    alt: "Exposed timber trusses over a tongue-and-groove wood ceiling",
  },
  beamDetail: {
    src: "/images/placeholders/beam-detail.jpg",
    origin: unsplash("1632164661434-505c7a17b228"),
    alt: "Close view of a timber beam meeting a wood ceiling",
  },
  stairShadow: {
    src: "/images/placeholders/stair-shadow.jpg",
    origin: unsplash("1691325483800-3b86f809399c"),
    alt: "Stair railing casting a hard-edged shadow across a plaster wall",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
