import Image from "next/image";
import type { Project } from "@/lib/projects";
import DsaCatScene from "@/components/DsaCatScene";
import styles from "./DsaCatScene.module.css";
import { MathLensAnimation } from "./MathLensGlassHero";
import mathStyles from "./MathLensGlassHero.module.css";
export default function ProjectVisual({
  project,
  priority = false,
}: {
  project: Pick<
    Project,
    "slug" | "title" | "screenshots" | "architecture" | "contentStage" | "visualKind"
  >;
  priority?: boolean;
}) {
  const image = project.screenshots[0];
  const showCat = priority && project.slug === "dsa";
  const showChase = !priority && project.slug === "dsa";
  if (project.slug === "mathlens" && !priority) return (
    <div className={`project-diagram ${mathStyles.preview}`} aria-label="MathLens animated mathematical illustration">
      <MathLensAnimation preview />
      <span className="diagram-label">MATHEMATICS IN MOTION</span>
      <span className={mathStyles.previewTitle}>A clearer<br />view of math.</span>
      <span className={mathStyles.previewCaption}>COMPUTE · LEARN · DISCOVER</span>
    </div>
  );
  return image ? (
    <div className="project-image">
      <Image
        src={image.src}
        alt={image.caption}
        fill
        sizes="(max-width:640px) 100vw, (max-width:1000px) 50vw, 420px"
        priority={priority}
      />
      <span className="capture-label">{project.visualKind === "illustration" ? "MATHEMATICAL ILLUSTRATION" : "REPOSITORY CAPTURE"}</span>
    </div>
  ) : (
    <div
      className={`project-diagram${showCat ? ` ${styles.diagram}` : ""}`}
      aria-label={showChase ? `${project.title} decorative animal scene` : `${project.title} source structure visualization`}
    >
      {showCat && <DsaCatScene />}
      <span className="diagram-label">
        {showChase ? "STUDY BREAK / IN MOTION" : project.contentStage === "concept"
          ? "PROPOSED WORKFLOW DESIGN"
          : "SYSTEM ARCHITECTURE"}
      </span>
      <span className="diagram-title">{project.title}</span>
      <div className="diagram-nodes">
        {project.architecture.slice(0, 3).map((node, i) => (
          <span key={node}>
            <small>0{i + 1}</small>
            {node}
          </span>
        ))}
      </div>
    </div>
  );
}
