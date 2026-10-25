import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://portfolio-ten-omega-4ibkho6f7u.vercel.app/sitemap.xml",
  };
}
