import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ProjectDetails from "@/components/ProjectDetails";
import ThemeHeader from "@/components/layout/ThemeHeader";
import RagGlassHero from "@/components/RagGlassHero";
import FlowNovaGlassHero from "@/components/FlowNovaGlassHero";
import NeuroMapGlassHero from "@/components/NeuroMapGlassHero";
import MathLensGlassHero from "@/components/MathLensGlassHero";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — Engineering Case Study | Manikant Kumar`,
    description: p.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: p.title,
      description: p.description,
      images: p.screenshots[0] ? [p.screenshots[0].src] : ["/profile.jpg"],
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const headingId = slug === "enterprise-rag" ? "rag-project-heading" : slug === "flownova" ? "flownova-project-heading" : slug === "neuromap" ? "neuromap-project-heading" : slug === "mathlens" ? "mathlens-project-heading" : undefined;
  const introduction = (
    <>
        <p className="section-label">
          Engineering case study · {p.categories.join(" / ")}
        </p>
        <h1 id={headingId} className="case-title">{p.title}</h1>
        <p className="case-subtitle">{p.subtitle}</p>
        <p className="section-intro">{p.description}</p>
        <div className="case-meta">
          <span>{p.status}</span>
          <span>Source reviewed · {p.sourceCommit.slice(0, 7)}</span>
        </div>
        <div className="resume-actions">
          <a
            className="button primary"
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore repository ↗
          </a>
          {p.live && (
            <a
              className="button"
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open demo ↗
            </a>
          )}
          {p.release && (
            <a className="button" href={p.release.url} target="_blank" rel="noopener noreferrer">Release v{p.release.version} · Downloads ↗</a>
          )}
        </div>
    </>
  );
  return (
    <>
      <ThemeHeader />
      <main className="content-width case-page">
        <Link href="/#projects" className="back-link">
          ← Back to projects
        </Link>
        {slug === "enterprise-rag" ? <RagGlassHero>{introduction}</RagGlassHero> : slug === "flownova" ? <FlowNovaGlassHero>{introduction}</FlowNovaGlassHero> : slug === "neuromap" ? <NeuroMapGlassHero>{introduction}</NeuroMapGlassHero> : slug === "mathlens" ? <MathLensGlassHero>{introduction}</MathLensGlassHero> : introduction}
        <ProjectDetails project={p} />
        <Link href="/#projects" className="back-link">
          ← Explore all {projects.length} projects
        </Link>
      </main>
    </>
  );
}
