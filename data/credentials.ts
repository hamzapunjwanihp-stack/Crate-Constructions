/**
 * Verified, third-party credibility data.
 *
 * Source: Crate Construction's public BuildZoom profile
 * https://www.buildzoom.com/contractor/crate-construction
 *
 * These figures are calculated and published by BuildZoom, not by
 * Crate Construction, and they change over time. Re-check the profile
 * and update `retrieved` whenever the numbers are refreshed.
 */
export const buildZoom = {
  source: "BuildZoom",
  url: "https://www.buildzoom.com/contractor/crate-construction",
  retrieved: "September 2026",
  score: 98,
  scoreContext: "Above 84% of 222,249 contractors in Texas",
  activeSince: 2017,
  permitsOnRecord: 24,
  permitCities: ["Dallas", "Richardson"],
  registrations: [
    { jurisdiction: "City of Arlington", type: "General Contractor", status: "Active" },
    { jurisdiction: "City of Midlothian", type: "Home Builder", status: "Active" },
  ],
  /**
   * Selected permits as listed on BuildZoom. Street numbers are omitted
   * intentionally to respect homeowners' privacy.
   */
  permitHistory: [
    { year: 2024, work: "New single-family dwelling", city: "Dallas", status: "Issued" },
    { year: 2024, work: "New construction — multi-family", city: "Dallas", status: "Applied" },
    { year: 2023, work: "Addition to single-family dwelling", city: "Dallas", status: "Complete" },
    { year: 2023, work: "New single-family dwelling", city: "Dallas", status: "Complete" },
    { year: 2023, work: "New single-family dwelling", city: "Dallas", status: "Issued" },
    { year: 2022, work: "Remodel — electrical & plumbing", city: "Richardson", status: "Issued" },
    { year: 2022, work: "Concrete flatwork", city: "Richardson", status: "Issued" },
    { year: 2020, work: "New single-family dwellings (2)", city: "Dallas", status: "Complete" },
    { year: 2019, work: "New single-family dwelling", city: "Dallas", status: "Complete" },
  ],
} as const;

/**
 * Company-reported facts.
 *
 * Leave each value `null` (or empty) until Crate Construction confirms it.
 * The UI only renders items that have a value — nothing here is invented.
 */
export const companyFacts: {
  yearsInBusiness: number | null;
  homesCompleted: number | null;
  insuranceSummary: string | null;
  warrantySummary: string | null;
  memberships: string[];
  testimonials: { quote: string; name: string; project: string }[];
} = {
  yearsInBusiness: null,
  homesCompleted: null,
  insuranceSummary: null,
  warrantySummary: null,
  memberships: [],
  testimonials: [],
};
