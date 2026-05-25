import type { Metadata } from "next";
import "./globals.css";
import NeonCursor       from "@/components/NeonCursor";
import CosmosBackground from "@/components/CosmosBackground";

export const metadata: Metadata = {
  title: "Manikant Kumar | AI Developer · Full Stack · Blockchain Engineer",
  description:
    "Portfolio of Manikant Kumar — Blockchain and AI enthusiast, B.Tech CSE (Blockchain Technology) at Parul University. Building scalable AI + Web3 systems.",
  keywords: [
    "Manikant Kumar","AI Developer","Blockchain Engineer",
    "Full Stack Developer","Web3","Solidity","React","Next.js","Portfolio",
  ],
  authors: [{ name: "Manikant Kumar" }],
  openGraph: {
    title: "Manikant Kumar | AI · Full Stack · Blockchain",
    description: "Building at the intersection of AI and Web3.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ManikantBindass",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0A0F" />
      </head>
      <body className="bg-[#0A0A0F] text-white transition-colors duration-300 w-full overflow-x-hidden antialiased">
        <CosmosBackground />
        <NeonCursor />
        {children}
      </body>
    </html>
  );
}
