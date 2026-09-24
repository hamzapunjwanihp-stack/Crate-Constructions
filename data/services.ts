import { images, type SiteImage } from "./images";
import type { ProjectTypeValue } from "@/lib/inquiry";

export type Service = {
  slug: string;
  number: string;
  title: string;
  /** Short name used in compact lists. */
  shortTitle: string;
  headline: string;
  summary: string;
  description: string[];
  capabilities: string[];
  image: SiteImage;
  detailImage: SiteImage;
  /** Pre-selects the project type on /contact. */
  inquiryType: ProjectTypeValue;
  cta: string;
};

export const services: Service[] = [
  {
    slug: "new-home-construction",
    number: "01",
    title: "New Home Construction",
    shortTitle: "New Construction",
    headline: "Ground-up homes, managed end to end.",
    summary:
      "Custom and ground-up homes built from a clear plan — foundation, structure, envelope, and every finish that follows.",
    description: [
      "A new home is thousands of decisions made in the right order. We manage the sequence from site preparation and foundation through framing, the building envelope, systems, and interior finishes.",
      "You get one accountable team, a schedule you can follow, and a builder who treats the parts you'll never see with the same care as the parts you will.",
    ],
    capabilities: [
      "Lot & site evaluation",
      "Permitting coordination",
      "Foundation & framing",
      "Building envelope & roofing",
      "MEP coordination",
      "Interior finishes & millwork",
    ],
    image: images.houseInProgress,
    detailImage: images.framingAerial,
    inquiryType: "new-home",
    cta: "Discuss a new home",
  },
  {
    slug: "whole-home-remodeling",
    number: "02",
    title: "Whole Home Remodeling",
    shortTitle: "Whole Home Remodels",
    headline: "The house you have, rebuilt around how you live.",
    summary: "Comprehensive remodels that rework layout, systems, and finishes across the entire home.",
    description: [
      "When a home's bones are right but everything else isn't, a whole-home remodel lets you keep the location and the lot while changing how the house works.",
      "We plan layout changes, structural work, and system upgrades together, so the finished home feels intentional — not like a series of separate projects.",
    ],
    capabilities: [
      "Layout reconfiguration",
      "Structural modifications",
      "Electrical, plumbing & HVAC upgrades",
      "Kitchen & bath rebuilds",
      "Flooring, trim & lighting",
      "Phased or full-vacancy scheduling",
    ],
    image: images.livingClerestory,
    detailImage: images.renoHallway,
    inquiryType: "whole-home-remodel",
    cta: "Plan a whole-home remodel",
  },
  {
    slug: "kitchen-remodeling",
    number: "03",
    title: "Kitchen Remodeling",
    shortTitle: "Kitchen Remodeling",
    headline: "The hardest-working room, built right.",
    summary: "Kitchens rebuilt with careful layout, reliable systems, and finishes that hold up to daily use.",
    description: [
      "A kitchen has to work as hard as it looks. We coordinate layout, cabinetry, counters, lighting, ventilation, and appliances so each piece fits the one beside it.",
      "Rough-in, inspections, and install sequencing are planned before demolition, which keeps the room out of service for as short a time as possible.",
    ],
    capabilities: [
      "Layout & workflow planning",
      "Custom & semi-custom cabinetry",
      "Stone, quartz & tile",
      "Lighting & electrical",
      "Plumbing relocation",
      "Appliance & ventilation integration",
    ],
    image: images.kitchenIsland,
    detailImage: images.kitchenDark,
    inquiryType: "kitchen",
    cta: "Start a kitchen project",
  },
  {
    slug: "bathroom-remodeling",
    number: "04",
    title: "Bathroom Remodeling",
    shortTitle: "Bathroom Remodeling",
    headline: "Precise work in tight tolerances.",
    summary: "Primary suites, guest baths, and powder rooms — waterproofed properly and finished precisely.",
    description: [
      "Bathrooms are small rooms with little margin for error. Waterproofing, slopes, blocking, and valve placement all have to be right before the first tile goes down.",
      "We handle what's behind the walls with the same attention as the stone and fixtures you see every day.",
    ],
    capabilities: [
      "Primary suite remodels",
      "Walk-in & curbless showers",
      "Waterproofing systems",
      "Tile & stone installation",
      "Vanities & fixtures",
      "Ventilation & lighting",
    ],
    image: images.bathSuite,
    detailImage: images.bathGreen,
    inquiryType: "bathroom",
    cta: "Start a bathroom project",
  },
  {
    slug: "home-additions",
    number: "05",
    title: "Home Additions",
    shortTitle: "Home Additions",
    headline: "More space that looks like it was always there.",
    summary: "Ground-level and second-story additions that tie cleanly into the existing structure.",
    description: [
      "A good addition is hard to spot. Roof lines, floor heights, materials, and structure have to meet the existing house cleanly — inside and out.",
      "We coordinate engineering, permitting, and tie-in details up front, and plan protection so the rest of the home stays usable during construction.",
    ],
    capabilities: [
      "Ground-level additions",
      "Second-story additions",
      "Primary suite additions",
      "Structural tie-ins",
      "Roof & envelope integration",
      "Matching exterior materials",
    ],
    image: images.stoneWoodDetail,
    detailImage: images.twoStoryFrame,
    inquiryType: "addition",
    cta: "Discuss an addition",
  },
  {
    slug: "residential-renovations",
    number: "06",
    title: "Residential Renovations",
    shortTitle: "Renovations",
    headline: "Structure, systems, and surfaces — renewed.",
    summary: "Renovations for older homes and tired spaces, from structural repair to complete interior renewal.",
    description: [
      "Older homes deserve care, and they usually hide surprises. We assess existing conditions early, document what we find, and give you clear options before work continues.",
      "The result keeps the character worth keeping and replaces what no longer serves the house.",
    ],
    capabilities: [
      "Existing-conditions assessment",
      "Structural repair",
      "System replacement",
      "Interior renewal",
      "Exterior repair & refinishing",
      "Historic-character preservation",
    ],
    image: images.renoShoring,
    detailImage: images.darkPorch,
    inquiryType: "renovation",
    cta: "Talk through a renovation",
  },
  {
    slug: "construction-management",
    number: "07",
    title: "Construction Management",
    shortTitle: "Construction Management",
    headline: "One accountable team between plan and punch list.",
    summary: "Scheduling, trade coordination, budget tracking, and on-site oversight for residential projects.",
    description: [
      "Construction management is the discipline that holds a project together: schedules, trades, inspections, procurement, and communication.",
      "Whether we're building the whole project or managing it on your behalf, you'll always know what's happening, what's next, and what decisions need your input.",
    ],
    capabilities: [
      "Scheduling & sequencing",
      "Trade coordination",
      "Budget tracking",
      "Procurement",
      "Inspections & permitting",
      "Owner reporting",
    ],
    image: images.planFlatlay,
    detailImage: images.framerOnWall,
    inquiryType: "other",
    cta: "Discuss project management",
  },
];
