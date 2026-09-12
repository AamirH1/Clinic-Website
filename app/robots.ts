import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://harborlightdental.example.com/sitemap.xml" // [PLACEHOLDER] set to real domain
  };
}
