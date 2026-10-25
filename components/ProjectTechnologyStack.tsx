import { ArrowUpRight, Layers3 } from "lucide-react";
import type { ProjectTechnology } from "@/lib/projects";
import TechIcon from "@/components/ui/TechIcon";

interface TechnologyStackProps {
  technologies: ProjectTechnology[];
  concept: boolean;
  githubUrl: string;
  sourceCommit: string;
}

export default function ProjectTechnologyStack({
  technologies,
  concept,
  githubUrl,
  sourceCommit,
}: TechnologyStackProps) {
  return (
    <div className="technology-stack">
      <div className="technology-stack-heading">
        <div>
          <p className="section-label">04 / Technology Stack</p>
          <h2>{concept ? "Proposed technology choices" : "The technology behind it"}</h2>
          <p className="technology-stack-intro">
            {concept
              ? "A suggested foundation for the workflow-builder concept. These choices describe the proposed design."
              : "The tools, frameworks, and services behind the project — and the role each one plays."}
          </p>
        </div>
        <div className="technology-stack-count" aria-label={`${technologies.length} technologies`}>
          <Layers3 size={18} aria-hidden />
          <strong>{String(technologies.length).padStart(2, "0")}</strong>
          <span>technologies</span>
        </div>
      </div>

      <div className="stack-grid">
        {technologies.map((tech, index) => (
          <article className="glass technology-card" key={tech.name}>
            <div className="technology-card-top">
              <span className="technology-icon"><TechIcon name={tech.name} size={27} /></span>
              <span className="technology-order" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>{tech.name}</h3>
            <div className="technology-meta">
              {tech.version ? (
                <span className="tech-version">{tech.version.replace(/^==/, "")}</span>
              ) : (
                <span className="technology-usage">{concept ? "Proposed option" : "Project component"}</span>
              )}
            </div>
            <p className="technology-description">{tech.description}</p>
            <div className="technology-card-footer">
              {tech.source ? (
                <a className="technology-source" href={`${githubUrl}/blob/${sourceCommit}/${tech.source}`} target="_blank" rel="noopener noreferrer" aria-label={`View ${tech.name} source: ${tech.source}`}>
                  <span className="technology-source-label">{concept ? "Project brief" : "Explore source"}<ArrowUpRight size={14} aria-hidden /></span>
                  <span className="technology-source-path">{tech.source}</span>
                </a>
              ) : <span className="technology-proposal">Design proposal</span>}
            </div>
          </article>
        ))}
      </div>

      <p className="technology-stack-note">
        <span className="technology-note-dot" aria-hidden />
        {concept
          ? "Proposed stack · These options are separate from dependencies in published application code."
          : "Version badges show declared dependency ranges from the reviewed repository."}
      </p>
    </div>
  );
}
