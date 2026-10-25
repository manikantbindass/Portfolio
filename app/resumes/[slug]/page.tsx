import ThemeHeader from "@/components/layout/ThemeHeader";
import { notFound } from "next/navigation";
import Link from "next/link";
import { resumes } from "@/lib/resumes";
import type { Metadata } from "next";
export function generateStaticParams() {
  return resumes.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = resumes.find((r) => r.slug === slug);
  return {
    title: `${r?.title ?? "Resume"} | Manikant Kumar`,
    description: r?.description,
    alternates: { canonical: `/resumes/${slug}` },
  };
}
export default async function ResumePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = resumes.find((r) => r.slug === slug);
  if (!r) notFound();
  return (
    <>
      <ThemeHeader />
      <main className="document-page content-width with-header">
        <Link href="/#resumes" className="back-link">
          ← All resumes
        </Link>
        <p className="section-label">Manikant Kumar · PDF resume</p>
        <h1 className="section-heading">{r.title}</h1>
        <p className="section-intro">{r.description}</p>
        <div className="resume-actions">
          <a className="button primary" href={r.file} download>
            Download PDF ↓
          </a>
          <a
            className="button"
            href={r.file}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open PDF in new tab ↗
          </a>
        </div>
        <object
          className="pdf-viewer glass"
          data={r.file}
          type="application/pdf"
          aria-label={`${r.title} PDF preview`}
        >
          <p>
            Your browser does not support an embedded preview.{" "}
            <a href={r.file}>Open the PDF</a> or use Download PDF above.
          </p>
        </object>
      </main>
    </>
  );
}
