export type ProjectStatus = "live" | "building" | "queued";
export type ProjectKind = "website" | "app";
export interface Project {
  slug: string;
  client: string;
  title: string;
  kind: ProjectKind;
  status: ProjectStatus;
  year: number;
  summary?: string;
  sector: string;
  url?: string;
  featured?: boolean;
  cover?: string;
  stack?: string[];
  /** Paragraphs for the case study page. Projects without one are not linked to a detail page. */
  story?: string[];
}
export const projects: Project[] = [
  {
    slug: "food4lives",
    client: "Food4Lives",
    title: "FCS Innovation Academy Food4Lives",
    kind: "website",
    status: "live",
    year: 2024,
    sector: "Hunger relief",
    url: "https://ia-food4lives.vercel.app/",
    featured: true,
    cover: "/media/work/food4lives/cover.webp",
    stack: ["React", "Vercel"],
    summary: "A home for student volunteers serving meals in downtown Atlanta.",
    story: [
      "The club needed to explain its work and make weekly volunteer sign-ups easy.",
      "We built a mobile-first site with the mission, volunteer details, photos, and contact information. Students, families, and school partners now share one public link.",
    ],
  },
  {
    slug: "stories-of-champions",
    client: "Champions Place",
    title: "Stories of Champions",
    kind: "website",
    status: "live",
    year: 2025,
    sector: "Disability services",
    url: "https://champions-stories.pages.dev/",
    featured: true,
    cover: "/media/work/stories-of-champions/cover.webp",
    stack: ["React", "Cloudflare Pages"],
    summary: "Resident stories for a community of adults with physical disabilities.",
    story: [
      "Champions Place wanted a respectful archive for resident stories.",
      "We built an accessible editorial site centered on each resident's own words. It gives families, supporters, and future participants a permanent place to read them.",
    ],
  },
  {
    slug: "re-imagine-robotics",
    client: "Re-Imagine Robotics",
    title: "Re-Imagine Robotics",
    kind: "website",
    status: "live",
    year: 2025,
    sector: "STEM education",
    url: "https://reimaginerobotics.org/",
    featured: true,
    cover: "/media/work/re-imagine-robotics/cover.webp",
    stack: ["React", "Vercel"],
    summary: "A clear program site for hands-on robotics classes and VEX IQ teams.",
    story: [
      "Parents needed to understand the program quickly.",
      "We organized the site by age group, outcomes, and next steps, so a family can evaluate the program in one place.",
    ],
  },
  {
    slug: "sewa-green-team",
    client: "SEWA Green Team",
    title: "SEWA Green Team",
    kind: "website",
    status: "live",
    year: 2025,
    sector: "Environmental service",
    url: "https://sewa-green-team.vercel.app/",
    cover: "/media/work/sewa-green-team/cover.webp",
    summary: "Projects, events, and resources for a student environmental service team.",
  },
  // TODO(confirm): live URL and screenshot for Hands of Hope.
  {
    slug: "hands-of-hope",
    client: "Hands of Hope",
    title: "Hands of Hope",
    kind: "website",
    status: "live",
    year: 2025,
    sector: "Community service",
    summary: "A public site for local service work and the people behind it.",
  },
  {
    slug: "science-olympiad",
    client: "Science Olympiad",
    title: "Science Olympiad",
    kind: "website",
    status: "building",
    year: 2026,
    sector: "STEM competition",
    summary: "A team site for schedules, events, and competition resources.",
  },
  {
    slug: "tsa",
    client: "TSA",
    title: "TSA",
    kind: "website",
    status: "queued",
    year: 2026,
    sector: "Student organization",
  },
];
export const featured = projects.filter((project) => project.featured);
export const live = projects.filter((project) => project.status === "live");
export const inProgress = projects.filter((project) => project.status !== "live");
export const caseStudies = projects.filter((project) => project.story);

const counts = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
/** Spells out small counts for running copy ("six sites live"). */
export function spell(count: number, capitalize = false) {
  const word = counts[count] ?? String(count);
  return capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}
