import type { SiteImage } from "./images";

/**
 * Team members for the /about page.
 *
 * Intentionally empty — no people are invented. Add real team members
 * here and the About page will render them automatically, e.g.:
 *
 *   {
 *     name: "Full Name",
 *     role: "Founder & Project Lead",
 *     bio: "One or two sentences about their background.",
 *     photo: { src: "/images/team/full-name.jpg", alt: "Portrait of Full Name" },
 *   },
 */
export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  photo?: SiteImage;
};

export const team: TeamMember[] = [];
