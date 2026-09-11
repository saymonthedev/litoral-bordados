import { ArrowRight } from "lucide-react";
import { EmbroideryHoop } from "@/components/hero/EmbroideryHoop";
import { Button } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { content } from "@/config/content";
import { ctaLabels } from "@/config/siteConfig";
import { quoteAction } from "@/lib/contact";

/**
 * Hero — a assinatura visual do site.
 *
 * À direita, o bastidor onde a animação "Do fio ao bordado" desenha o
 * símbolo da marca sobre o tecido, na frente do espaço reservado para a
 * futura foto dos trabalhos. À esquerda, o texto entra em seguida, no
 * ritmo do bordado.
 */
export function Hero() {
  const acao = quoteAction();

  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-14 md:pt-32 lg:pt-36 lg:pb-24">
      {/* tecido de fundo */}
      <div aria-hidden="true" className="textura-linho absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        data-parallax="80"
        className="absolute -top-52 -right-40 -z-10 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,var(--color-areia)_0%,transparent_62%)] opacity-70"
      />
      <div
        aria-hidden="true"
        data-parallax="-60"
        className="absolute -bottom-40 -left-52 -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgb(42_97_131/0.1)_0%,transparent_65%)]"
      />

      <div className="mx-auto grid max-w-[78rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* ---------- bastidor + espaço de foto ---------- */}
        <div className="order-1 lg:order-2 lg:col-span-6">
          <div className="relative mx-auto aspect-[1/1.04] w-full max-w-[24rem] sm:max-w-[27rem] lg:mr-0 lg:ml-auto lg:max-w-[33rem]">
            <div data-parallax="34" className="absolute top-0 right-0 h-[70%] w-[60%]">
              <PhotoFrame
                src="/images/hero-placeholder.svg"
                alt="Espaço reservado para uma foto dos bordados da Litoral Bordados"
                aspect="h-full"
                sizes="(max-width: 1023px) 56vw, 21vw"
                priority
                badge={content.portfolio.placeholderBadge}
                className="h-full"
                rounded="rounded-[24px]"
              />
            </div>

            <div data-parallax="-18" className="absolute bottom-0 left-0 w-[78%]">
              <EmbroideryHoop
                replayLabel={content.hero.replayLabel}
                pauseLabel={content.hero.pauseLabel}
                label="Animação: uma linha de bordado atravessa o tecido, costura a orla e forma a onda do símbolo da Litoral Bordados."
              />
            </div>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-tinta-clara lg:justify-end">
            <span aria-hidden="true" className="h-px w-6 border-t border-dashed border-tinta-clara" />
            {content.hero.photoCaption}
          </p>
        </div>

        {/* ---------- texto ---------- */}
        <div data-parallax="22" className="order-2 lg:order-1 lg:col-span-6 lg:pr-6">
          <p
            data-reveal
            style={{ "--reveal-delay": "500ms" } as React.CSSProperties}
            className="flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.28em] text-coral uppercase"
          >
            <span aria-hidden="true" className="inline-block h-px w-8 border-t-[1.5px] border-dashed border-current" />
            {content.hero.eyebrow}
          </p>

          <h1
            data-reveal
            style={{ "--reveal-delay": "640ms" } as React.CSSProperties}
            className="mt-6 text-[clamp(2.4rem,1.5rem+3.4vw,4.3rem)] leading-[1.04] text-mare"
          >
            {content.hero.headline.lead}{" "}
            <span className="relative inline-block whitespace-nowrap">
              <em className="italic">{content.hero.headline.emphasis}</em>
              <svg
                aria-hidden="true"
                viewBox="0 0 260 12"
                preserveAspectRatio="none"
                data-stitch-reveal
                style={{ "--draw-delay": "1500ms", "--draw-duration": "1.4s" } as React.CSSProperties}
                className="absolute -bottom-1 left-0 h-2.5 w-full text-coral"
                fill="none"
              >
                <g>
                  <path
                    d="M4 8.5c52-6 104 4.5 156 1s70-1.5 100 1.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="12 9"
                  />
                </g>
              </svg>
            </span>
            .
          </h1>

          <p
            data-reveal
            style={{ "--reveal-delay": "820ms" } as React.CSSProperties}
            className="mt-7 max-w-xl text-[1.06rem] leading-relaxed text-tinta-suave"
          >
            {content.hero.description}
          </p>

          <div
            data-reveal
            style={{ "--reveal-delay": "980ms" } as React.CSSProperties}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              href={acao.href}
              external={acao.external}
              icon={
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-linha group-hover:translate-x-1"
                />
              }
            >
              {ctaLabels.primary}
            </Button>
            <Button href="#trabalhos" variant="secundaria">
              {ctaLabels.secondary}
            </Button>
          </div>

          <ul
            data-reveal
            style={{ "--reveal-delay": "1120ms" } as React.CSSProperties}
            className="mt-11 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] font-semibold tracking-[0.18em] text-tinta-clara uppercase"
          >
            {content.hero.highlights.map((item, i) => (
              <li key={item} className="flex items-center gap-4">
                {i > 0 ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-coral/60" /> : null}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
