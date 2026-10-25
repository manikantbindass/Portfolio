import data from "./projects.json";
export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  categories: string[];
  tags: string[];
  github: string;
  live: string | null;
  featured: boolean;
  status: string;
  updatedAt: string;
  users: string;
  problem: string;
  solution: string;
  technicalDetails: string[];
  features: string[];
  architecture: string[];
  architectureReference?: string;
  challenges: string[];
  screenshots: { src: string; caption: string; source: string }[];
  evidence: { path: string; url: string }[];
  sourceCommit: string;
  verifiedAt: string;
}
export const projects: Project[] = data;
export const projectCategories = [
  "All Projects",
  "AI / Machine Learning",
  "Full Stack",
  "Blockchain / Web3",
  "Backend / Cloud / DevOps",
  "Developer Tools",
];
