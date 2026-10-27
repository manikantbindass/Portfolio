import data from "./projects.json";
import { orderProjects } from "./project-order";
export interface ProjectDetail {
  title: string;
  description: string;
  source: string;
}
export interface ProjectTechnology {
  name: string;
  description: string;
  stage: string;
  source?: string;
  version?: string;
}
export interface ProjectCaseStudy {
  architectureSummary: string;
  features: ProjectDetail[];
  technologies: ProjectTechnology[];
  decisions: (ProjectDetail & { tradeoff: string })[];
  outcomes: ProjectDetail[];
  workflow: string[];
  commands: string[];
  setup: string;
}
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
  release?: { version: string; url: string };
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
  visualKind?: string;
  screenshots: { src: string; caption: string; source: string }[];
  walkthrough?: { src: string; poster: string; caption: string; source: string };
  resources?: { label: string; url: string; description: string }[];
  evidence: { path: string; url: string }[];
  sourceCommit: string;
  verifiedAt: string;
  contentStage: string;
  caseStudy: ProjectCaseStudy;
}
export const projects: Project[] = orderProjects(data);
export const projectCategories = [
  "All Projects",
  "AI / Machine Learning",
  "Full Stack",
  "Blockchain / Web3",
  "Backend / Cloud / DevOps",
  "Developer Tools",
];
