import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // O site é publicado como estático (Cloudflare Pages).
  // `npm run build` gera a pasta out/ com o site pronto.
  output: "export",
  images: {
    // Sem servidor de imagens: as fotos são servidas exatamente como estão.
    // Reduza e comprima as fotos antes de colocá-las em /public (ver README).
    unoptimized: true,
  },
};

export default nextConfig;
