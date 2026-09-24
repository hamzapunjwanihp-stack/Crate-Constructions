import { images, type SiteImage } from "./images";

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

/** Condensed process shown on the homepage. */
export const processOverview: ProcessStep[] = [
  {
    number: "01",
    title: "Conversation",
    description:
      "We start by listening — your goals, your budget range, your timing, and how you want the home to work.",
  },
  {
    number: "02",
    title: "Site + Scope",
    description: "We walk the property, review existing conditions, and define exactly what the project includes.",
  },
  {
    number: "03",
    title: "Planning",
    description: "Drawings, selections, and specifications are coordinated so pricing is based on real information.",
  },
  {
    number: "04",
    title: "Pre-Construction",
    description: "Permits, schedules, materials, and trade partners are lined up before the first day on site.",
  },
  {
    number: "05",
    title: "Construction",
    description: "Managed on site with regular updates, clear decisions, and a clean, protected job site.",
  },
  {
    number: "06",
    title: "Walkthrough",
    description: "We walk the finished work together and document every item that still needs attention.",
  },
  {
    number: "07",
    title: "Completion",
    description: "Punch list closed, documentation handed over, and a home ready to be lived in.",
  },
];

export type DetailedProcessStep = ProcessStep & {
  phase: "Plan" | "Build" | "Deliver";
  deliverables: string[];
  image?: SiteImage;
};

/** Full process shown on /process. */
export const processDetailed: DetailedProcessStep[] = [
  {
    number: "01",
    phase: "Plan",
    title: "Discovery",
    description:
      "A focused conversation about what you want to build, why, and what success looks like. We talk openly about budget ranges and timing so expectations are grounded from day one.",
    deliverables: ["Project goals", "Budget range", "Preliminary timeline"],
  },
  {
    number: "02",
    phase: "Plan",
    title: "Site Evaluation",
    description:
      "We visit the property to understand access, existing structure, utilities, drainage, and anything that could shape cost or schedule.",
    deliverables: ["Existing-conditions notes", "Site constraints", "Photo documentation"],
    image: images.framingInterior,
  },
  {
    number: "03",
    phase: "Plan",
    title: "Scope",
    description:
      "We define what is — and isn't — included. A clear scope protects your budget and prevents the misunderstandings that cause most construction disputes.",
    deliverables: ["Written scope of work", "Allowances defined", "Open questions logged"],
  },
  {
    number: "04",
    phase: "Plan",
    title: "Design Coordination",
    description:
      "We work alongside your architect or designer — or connect you with one — so drawings, structure, and selections are buildable and coordinated.",
    deliverables: ["Constructability review", "Selections schedule", "Engineering coordination"],
    image: images.planFlatlay,
  },
  {
    number: "05",
    phase: "Plan",
    title: "Estimating",
    description:
      "Pricing built from the scope and drawings, not guesswork. You see how the budget is organized and where decisions affect cost.",
    deliverables: ["Itemized estimate", "Allowance summary", "Value options"],
  },
  {
    number: "06",
    phase: "Build",
    title: "Preconstruction",
    description:
      "Permits, schedule, procurement, and trade partners are locked in. Long-lead items are ordered early so the build doesn't wait on materials.",
    deliverables: ["Permit applications", "Construction schedule", "Procurement plan"],
  },
  {
    number: "07",
    phase: "Build",
    title: "Build",
    description:
      "Daily work managed on site, with regular updates on progress, upcoming decisions, and anything that changes. Changes are documented in writing before they happen.",
    deliverables: ["Progress updates", "Written change orders", "Inspection coordination"],
    image: images.framerOnWall,
  },
  {
    number: "08",
    phase: "Build",
    title: "Quality Control",
    description:
      "Work is checked at each stage — before it's covered up, not after. Framing, rough-ins, waterproofing, and finishes are reviewed against the plan.",
    deliverables: ["Stage inspections", "Pre-cover reviews", "Issue tracking"],
  },
  {
    number: "09",
    phase: "Deliver",
    title: "Final Walkthrough",
    description: "We walk the completed project with you room by room and record every item that needs attention.",
    deliverables: ["Documented punch list", "Completion schedule"],
  },
  {
    number: "10",
    phase: "Deliver",
    title: "Handover",
    description:
      "Punch list closed, spaces cleaned, and the information you need to live in and maintain the home handed over.",
    deliverables: ["Closed punch list", "Product & warranty documents", "Care information"],
  },
];
