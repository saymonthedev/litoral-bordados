import Image from "next/image";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { content } from "@/config/content";
import { ctaLabels, siteConfig } from "@/config/siteConfig";
import {
  emailHref,
  instagramHandle,
  instagramHref,
  phoneHref,
  quoteAction,
  whatsappHref,
} from "@/lib/contact";

/**
 * Chamada final + contato.
 *
 * Cada canal só aparece se estiver preenchido em siteConfig. Sem nenhum
 * canal configurado, mostramos um aviso honesto no lugar — nunca um
 * número inventado ou um link quebrado.
 */
export function FinalCTA() {
  const acao = quoteAction();
  const whats = whatsappHref();
  const insta = instagramHref();
  const email = emailHref();
  const fone = phoneHref();
  const endereco = siteConfig.address.trim();
  const temCanal = Boolean(whats || insta || email || fone || endereco);

  const canais = [
    whats && { href: whats, external: true, icone: <WhatsAppIcon className="h-4.5 w-4.5" />, texto: "WhatsApp" },
    fone && { href: fone, external: false, icone: <Phone aria-hidden="true" className="h-4 w-4" />, texto: siteConfig.phone },
    email && { href: email, external: false, icone: <Mail aria-hidden="true" className="h-4 w-4" />, texto: siteConfig.email },
    insta && {
      href: insta,
      external: true,
      icone: <InstagramIcon className="h-4 w-4" />,
      texto: `@${instagramHandle()}`,
    },
  ].filter(Boolean) as Array<{ href: string; external: boolean; icone: React.ReactNode; texto: string }>;

  return (
    <section id="contato" aria-labelledby="titulo-contato" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="textura-linho absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-24 -z-10 h-72 bg-[radial-gradient(ellipse_at_center,var(--color-areia)_0%,transparent_70%)] opacity-80"
      />

      {/* símbolo da marca como marca d'água */}
      <Image
        src={siteConfig.logoMark}
        alt=""
        aria-hidden="true"
        width={124}
        height={96}
        data-parallax="70"
        className="pointer-events-none absolute -right-10 -bottom-6 -z-10 w-[18rem] opacity-[0.05] md:-right-4 md:w-[24rem]"
      />

      <div className="mx-auto max-w-[52rem] px-5 text-center sm:px-8">
        <p
          data-reveal
          className="flex items-center justify-center gap-3 text-[0.72rem] font-semibold tracking-[0.28em] text-coral uppercase"
        >
          <span aria-hidden="true" className="inline-block h-px w-8 border-t-[1.5px] border-dashed border-current" />
          {content.finalCta.eyebrow}
          <span aria-hidden="true" className="inline-block h-px w-8 border-t-[1.5px] border-dashed border-current" />
        </p>

        <h2
          id="titulo-contato"
          data-reveal
          style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
          className="mt-6 text-[clamp(2.15rem,1.3rem+3vw,3.6rem)] leading-[1.06] text-mare"
        >
          {content.finalCta.title}
        </h2>

        <p
          data-reveal
          style={{ "--reveal-delay": "170ms" } as React.CSSProperties}
          className="mx-auto mt-6 max-w-xl text-[1.04rem] leading-relaxed text-tinta-suave"
        >
          {content.finalCta.description}
        </p>

        <div
          data-reveal
          style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
          className="mt-10 flex flex-col items-center gap-4"
        >
          {temCanal ? (
            <Button
              href={acao.href}
              external={acao.external}
              icon={
                acao.channel === "whatsapp" ? (
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                ) : (
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 ease-linha group-hover:translate-x-1"
                  />
                )
              }
            >
              {acao.channel === "whatsapp" ? ctaLabels.whatsapp : ctaLabels.primary}
            </Button>
          ) : (
            <p className="max-w-md rounded-2xl border border-dashed border-mare/25 bg-papel/70 px-6 py-5 text-[0.92rem] leading-relaxed text-tinta-suave">
              {content.finalCta.emptyContactNote}
            </p>
          )}

          {canais.length > 0 ? (
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {canais.map((canal) => (
                <li key={canal.href}>
                  <a
                    href={canal.href}
                    {...(canal.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-2.5 text-[0.95rem] text-tinta-suave transition-colors duration-300 hover:text-mare"
                  >
                    <span className="text-coral transition-transform duration-300 group-hover:-translate-y-0.5">
                      {canal.icone}
                    </span>
                    {canal.texto}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          {endereco ? (
            <p className="mt-2 inline-flex items-center gap-2.5 text-[0.95rem] text-tinta-suave">
              <MapPin aria-hidden="true" className="h-4 w-4 text-coral" />
              {endereco}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
