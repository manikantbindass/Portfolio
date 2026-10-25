import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import styles from "./PortfolioFAQ.module.css";

const questions = [
  {
    question: "What kind of work do you focus on?",
    answer: <>AI-assisted applications, full-stack interfaces, backend APIs, and blockchain integrations. The <Link href="#projects">project collection</Link> shows the implementation, design decisions, and source behind each area.</>,
  },
  {
    question: "Can I explore the code and try the projects?",
    answer: <>Each case study links to its GitHub repository and source references. Projects with a public demo also include a demo link. Project pages explain where an experience uses sample data or needs local configuration.</>,
  },
  {
    question: "Are you open to freelance or full-time work?",
    answer: <>Yes, I’m open to freelance and full-time opportunities. Share the problem you are working on, the scope, and any timeline through the <Link href="#contact">contact form</Link>; it prepares an email draft in your email app.</>,
  },
  {
    question: "Which resume should I use?",
    answer: <>Choose the Full Stack, DevOps & Infrastructure, or AI & Machine Learning version that best fits the opportunity. All three have a browser preview and a PDF download in the <Link href="#resumes">resume section</Link>.</>,
  },
];

export default function PortfolioFAQ() {
  return (
    <section id="faq" className={`section-pad ${styles.section}`} aria-labelledby="faq-heading">
      <div className={`content-width ${styles.layout}`}>
        <div className={styles.heading}>
          <p className="section-label">A few useful details</p>
          <h2 id="faq-heading" className="section-heading">Before we<br /><span className="gradient-text">build something.</span></h2>
          <p>Code, opportunities, and the next conversation.</p>
          <a href="#contact" className={styles.contactLink}>Let’s talk <ArrowUpRight size={16} aria-hidden /></a>
        </div>
        <div className={styles.questions}>
          {questions.map(({ question, answer }, index) => (
            <details key={question} className={`${styles.question} glass`}>
              <summary><span className={styles.number} aria-hidden>{String(index + 1).padStart(2, "0")}</span><span>{question}</span><Plus size={17} aria-hidden /></summary>
              <div className={styles.answer}><p>{answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
