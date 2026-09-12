import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

// Necessário para o site estático: gera o robots.txt no build.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
