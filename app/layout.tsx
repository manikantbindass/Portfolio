import type { Metadata } from "next";
import "./globals.css";
import NeonCursor       from "@/components/NeonCursor";
import CosmosBackground from "@/components/CosmosBackground";

export const metadata: Metadata = {
  title: "Manikant Kumar | AI Developer · Full Stack · Blockchain",
  description:
    "Portfolio of Manikant Kumar — Blockchain and AI enthusiast, B.Tech CSE (Blockchain Technology) at Parul University. Building scalable AI + Web3 systems.",
  keywords: ["Manikant Kumar","AI Developer","Blockchain Engineer","Full Stack","Web3","Solidity","React","Next.js"],
  authors: [{ name: "Manikant Kumar" }],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var t=localStorage.getItem('theme');
                var d=window.matchMedia('(prefers-color-scheme: dark)').matches;
                if(t==='dark'||(t===null&&d)){
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="w-full overflow-x-hidden">
        <CosmosBackground />
        <NeonCursor />
        {children}
      </body>
    </html>
  );
}
