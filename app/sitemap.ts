import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { resumes } from "@/lib/resumes";
const base = "https://portfolio-ten-omega-4ibkho6f7u.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      priority: 0.8,
    })),
    ...resumes.map((r) => ({
      url: `${base}/resumes/${r.slug}`,
      priority: 0.7,
    })),
  ];
}
