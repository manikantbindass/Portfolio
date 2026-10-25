import type { Metadata } from "next";
import "./globals.css";
import { StatsProvider } from "@/components/StatsProvider";
import { MotionProvider } from "@/components/MotionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-ten-omega-4ibkho6f7u.vercel.app"),
  alternates: { canonical: "/" },
  title: "Manikant Kumar | AI Engineer · Full Stack · Blockchain",
  description:
    "Portfolio of Manikant Kumar — AI Engineer, Full Stack Developer & Blockchain Builder. Building scalable AI-powered products and Web3 systems.",
  keywords: [
    "Manikant Kumar",
    "AI Engineer",
    "Blockchain Developer",
    "Full Stack",
    "Web3",
    "Solidity",
    "Next.js",
    "LangChain",
    "Portfolio",
  ],
  authors: [
    { name: "Manikant Kumar", url: "https://github.com/manikantbindass" },
  ],
  openGraph: {
    title: "Manikant Kumar | AI Engineer · Blockchain · Full Stack",
    description:
      "Building scalable AI + Web3 systems at the intersection of code and cosmos.",
    type: "website",
    siteName: "Manikant Kumar Portfolio",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", creator: "@ManikantBindass" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030712" />
        {/* FOUC prevention */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){try{var t=localStorage.getItem('theme');var d=matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.classList.toggle('dark',t==='dark'||(t!=='light'&&d));}catch(e){document.documentElement.classList.toggle('dark',matchMedia('(prefers-color-scheme:dark)').matches);}})();
        `,
          }}
        />
      </head>
      <body className="noise">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Manikant Kumar",
              url: "https://portfolio-ten-omega-4ibkho6f7u.vercel.app",
              sameAs: [
                "https://github.com/manikantbindass",
                "https://leetcode.com/u/manikantbindass/",
              ],
              jobTitle: "AI-Augmented Full Stack Developer",
            }),
          }}
        />
        <MotionProvider>
          <StatsProvider>{children}</StatsProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
