import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/system/RevealObserver";
import { siteConfig } from "@/config/siteConfig";
import { instagramHref } from "@/lib/contact";
import { getSiteUrl } from "@/lib/site-url";

/* Tipografia: Fraunces (títulos, com itálico) + Manrope (texto) */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | Bordados personalizados`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "bordados personalizados",
    "bordado em uniformes",
    "bordado em camisetas",
    "bordado em bonés",
    "personalização de peças",
    "Litoral Bordados",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Bordados personalizados`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Bordados personalizados`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  // Os ícones são detectados automaticamente pelo Next.js a partir de
  // src/app/icon.svg e src/app/apple-icon.png (cópias de /public/brand).
};

export const viewport: Viewport = {
  themeColor: "#F5EFE4",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Dados estruturados: só o que a empresa realmente informou.
  const instagram = instagramHref();
  const dadosEstruturados = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    logo: `${siteUrl}${siteConfig.logo}`,
    ...(siteConfig.email.trim() ? { email: siteConfig.email } : {}),
    ...(siteConfig.phone.trim() ? { telephone: siteConfig.phone } : {}),
    ...(instagram ? { sameAs: [instagram] } : {}),
  };

  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        {/* marca que há JavaScript: só então os elementos entram animados */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />

        <a
          href="#conteudo"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-mare focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-linho"
        >
          Pular para o conteúdo
        </a>

        <Header />
        <main id="conteudo">{children}</main>
        <Footer />

        <RevealObserver />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />
      </body>
    </html>
  );
}
