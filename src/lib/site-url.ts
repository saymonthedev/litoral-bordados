import { siteConfig } from "@/config/siteConfig";

/**
 * Endereço público do site, usado no SEO (canonical, Open Graph, sitemap).
 *
 * Ordem de prioridade:
 *  1. siteConfig.url — preencha quando houver domínio próprio;
 *  2. o domínio que a Vercel injeta sozinha no build (nenhuma variável
 *     de ambiente precisa ser criada à mão);
 *  3. localhost, no desenvolvimento.
 */
export function getSiteUrl(): string {
  const configurado = siteConfig.url.trim().replace(/\/+$/, "");
  if (configurado) return configurado;

  const vercel =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (vercel) return vercel.startsWith("http") ? vercel.replace(/\/+$/, "") : `https://${vercel}`;

  return "http://localhost:3000";
}
