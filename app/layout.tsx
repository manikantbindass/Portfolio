import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manikant Kumar | AI Engineer · Full Stack · Blockchain",
  description:
    "Portfolio of Manikant Kumar — AI Engineer, Full Stack Developer & Blockchain Builder. Building scalable AI-powered products and Web3 systems.",
  keywords: ["Manikant Kumar","AI Engineer","Blockchain Developer","Full Stack","Web3","Solidity","Next.js","LangChain","Portfolio"],
  authors: [{ name: "Manikant Kumar", url: "https://github.com/manikantbindass" }],
  openGraph: {
    title: "Manikant Kumar | AI Engineer · Blockchain · Full Stack",
    description: "Building scalable AI + Web3 systems at the intersection of code and cosmos.",
    type: "website",
    siteName: "Manikant Kumar Portfolio",
  },
  twitter: { card: "summary_large_image", creator: "@ManikantBindass" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030712" />
        {/* FOUC prevention */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t=localStorage.getItem('theme');
            var d=window.matchMedia('(prefers-color-scheme:dark)').matches;
            if(t==='light'){document.documentElement.classList.remove('dark');}
            else{document.documentElement.classList.add('dark');}
          })();
        `}} />
      </head>
      <body className="noise">{children}</body>
    </html>
  );
}
