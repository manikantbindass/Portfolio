import Link from "next/link";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { resumes } from "@/lib/resumes";
export default function Resumes() {
  return (
    <section id="resumes" className="section-pad">
      <div className="content-width">
        <p className="section-label">A closer look</p>
        <h2 className="section-heading">
          One engineer.
          <br />
          <span className="gradient-text">Three perspectives.</span>
        </h2>
        <p className="section-intro">
          Choose the resume that fits the opportunity.
        </p>
        <div className="resume-grid">
          {resumes.map((r, i) => (
            <article className="glass resume-card card-hover" key={r.slug}>
              <div className="eyebrow-row">
                <FileText size={22} />
                <span>RESUME 0{i + 1} · PDF</span>
              </div>
              <h3>{r.title}</h3>
              <p className="resume-focus">{r.focus}</p>
              <p>{r.description}</p>
              <div className="tag-list">
                {r.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <div className="resume-actions">
                <Link href={`/resumes/${r.slug}`} className="button primary">
                  View Resume <ArrowUpRight size={16} />
                </Link>
                <a
                  href={r.file}
                  download
                  className="button"
                  aria-label={`Download ${r.title} PDF`}
                >
                  <Download size={16} />
                  PDF
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
