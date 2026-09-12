import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

// Necessário para o site estático: gera o sitemap.xml no build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
