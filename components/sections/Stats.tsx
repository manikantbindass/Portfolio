"use client";
import { motion } from "framer-motion";
import { usePortfolioStats } from "@/components/StatsProvider";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
function Source({
  provider,
  source,
  verifiedAt,
}: {
  provider: string;
  source: string;
  verifiedAt: string;
}) {
  return (
    <p className="source-note">
      {provider} · {source}
      <br />
      Last verified{" "}
      <time dateTime={verifiedAt}>
        {new Date(verifiedAt).toISOString().slice(0, 16).replace("T", " ")} UTC
      </time>{" "}
      · Refreshes every 6 hours
    </p>
  );
}
export default function Stats() {
  const { lc, gh } = usePortfolioStats();
  return (
    <section id="stats" className="section-pad">
      <div className="content-width">
        <p className="section-label">Consistency, in code</p>
        <h2 className="section-heading">
          Practice meets <span className="gradient-text">progress.</span>
        </h2>
        <div className="stats-layout">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass metric-card"
          >
            <div className="eyebrow-row">
              <span>01 / PROBLEM SOLVING</span>
              <a
                href="https://leetcode.com/u/manikantbindass/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LeetCode ↗
              </a>
            </div>
            <div className="big-number">
              <AnimatedCounter to={lc.total} />
              <span>problems solved</span>
            </div>
            <div className="difficulty-list">
              {[
                ["Easy", lc.easy],
                ["Medium", lc.medium],
                ["Hard", lc.hard],
              ].map(([name, count], i) => (
                <div key={name}>
                  <div>
                    <span>{name}</span>
                    <strong>{count}</strong>
                  </div>
                  <div className="difficulty-track">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(Number(count) / lc.total) * 100}%`,
                      }}
                      viewport={{ once: true }}
                      style={{
                        background: [
                          "var(--teal)",
                          "var(--gold)",
                          "var(--rose)",
                        ][i],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {lc.rating && (
              <p className="rating">
                Contest rating <strong>{lc.rating.toFixed(1)}</strong>
              </p>
            )}
            <Source {...lc} />
          </motion.article>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass metric-card"
          >
            <div className="eyebrow-row">
              <span>02 / BUILDING IN PUBLIC</span>
              <a
                href="https://github.com/manikantbindass"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
            <div className="big-number">
              <AnimatedCounter to={gh.repos} />
              <span>public repositories</span>
            </div>
            <p>
              {gh.followers} followers · Code, experiments, and project
              documentation.
            </p>
            {gh.languages && gh.languages.length > 0 && (
              <div className="language-list">
                <p>Primary language by non-fork public repository</p>
                {gh.languages.map((l) => (
                  <span key={l.name}>
                    {l.name} <strong>{l.count}</strong>
                  </span>
                ))}
              </div>
            )}
            <Source {...gh} />
          </motion.article>
        </div>
        <div className="glass contribution-card">
          <h3>Small steps. A visible trail.</h3>
          <p>
            Contribution chart supplied by ghchart; availability and refresh
            timing depend on that service.
          </p>
          <a
            href="https://github.com/manikantbindass"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://ghchart.rshah.org/818cf8/manikantbindass"
              alt="Manikant Kumar's public GitHub contribution calendar"
              width="1000"
              height="160"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.hidden = true;
              }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
