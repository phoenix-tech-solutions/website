export type ProjectStatus = "live" | "building" | "queued";
export type ProjectKind = "website" | "app";
export interface Project {
  slug: string;
  client: string;
  title: string;
  kind: ProjectKind;
  status: ProjectStatus;
  year: number;
  summary: string;
  sector: string;
  url?: string;
  featured?: boolean;
  cover?: string;
  stack?: string[];
  team?: string[];
  caseStudy?: {
    ask: string;
    made: string;
    result: string;
    shots: { src: string; alt: string; caption?: string }[];
  };
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
    caseStudy: {
      ask: "The school club needed one clear place to explain its work, recruit volunteers, and point students to weekly service sign-ups.",
      made: "We built a mobile-first site with a direct path from the mission to the volunteer details, photo evidence, and contact form.",
      result:
        "Food4Lives now has a public home its student organizers can share with volunteers, families, and school partners.",
      shots: [],
    },
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
    caseStudy: {
      ask: "Champions Place wanted a respectful, readable archive for resident profiles written through a student storytelling program.",
      made: "We designed an editorial story site that keeps the residents and their words at the center, with simple navigation and accessible reading layouts.",
      result:
        "The stories now have a permanent public home that families, supporters, and future participants can visit.",
      shots: [],
    },
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
    caseStudy: {
      ask: "A youth robotics program needed a credible public site that parents could understand quickly and use to find program information.",
      made: "We organized the program around age groups, outcomes, and next steps, then built a responsive site that works cleanly on a phone.",
      result:
        "Parents now have one dependable place to understand the program and decide whether it fits their student.",
      shots: [],
    },
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
    slug: "it-summer-camp",
    client: "IT Summer Camp",
    title: "IT Summer Camp",
    kind: "website",
    status: "live",
    year: 2025,
    sector: "Technology education",
    summary: "Program information and registration guidance for a student summer camp.",
  },
  {
    slug: "re-imagine-robotics-app",
    client: "Re-Imagine Robotics",
    title: "Robotics mobile app",
    kind: "app",
    status: "building",
    year: 2026,
    sector: "STEM education",
    summary: "A companion app for students and families in the robotics program.",
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
    slug: "vihari",
    client: "Vihari",
    title: "Vihari",
    kind: "website",
    status: "building",
    year: 2026,
    sector: "Community",
    summary: "A new public website, currently in design and content work.",
  },
  {
    slug: "charith",
    client: "Charith",
    title: "Charith",
    kind: "website",
    status: "building",
    year: 2026,
    sector: "Community",
    summary: "A new public website, currently in design and content work.",
  },
  {
    slug: "tsa",
    client: "TSA",
    title: "TSA",
    kind: "website",
    status: "queued",
    year: 2026,
    sector: "Student organization",
    summary: "A student organization website queued for the next build cycle.",
  },
];
export const featured = projects.filter((project) => project.featured);
export const live = projects.filter((project) => project.status === "live");
export const building = projects.filter((project) => project.status === "building");
