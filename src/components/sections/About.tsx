import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/config/content";
import { siteConfig } from "@/config/siteConfig";

/**
 * Sobre — texto institucional, sem números, datas ou histórias que não
 * foram informadas pela empresa. É só substituir os parágrafos em
 * src/config/content.ts quando o texto oficial chegar.
 */
export function About() {
  return (
    <section id="sobre" aria-labelledby="titulo-sobre" className="relative py-20 md:py-28">
      <div className="mx-auto grid max-w-[78rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* foto futura */}
        <div className="relative lg:col-span-5">
          {/* aro de bastidor desenhado atrás da foto */}
          <span
            aria-hidden="true"
            data-parallax="55"
            className="absolute -top-8 -left-8 hidden h-40 w-40 rounded-full border border-dashed border-mare/25 sm:block"
          />
          <span
            aria-hidden="true"
            data-parallax="-45"
            className="absolute -right-6 -bottom-10 hidden h-28 w-28 rounded-full border border-dashed border-coral/40 sm:block"
          />

          <PhotoFrame
            src="/images/sobre-placeholder.svg"
            alt="Espaço reservado para uma foto do ateliê da Litoral Bordados"
            aspect="aspect-[6/5]"
            sizes="(max-width: 1023px) 92vw, 38vw"
            badge={content.portfolio.placeholderBadge}
            caption={content.about.photoCaption}
            className="relative"
          />
        </div>

        {/* texto */}
        <div data-parallax="-20" className="lg:col-span-7 lg:pl-4">
          <SectionHeading
            id="titulo-sobre"
            eyebrow={content.about.eyebrow}
            title={content.about.title}
          />

          <div className="mt-7 space-y-5">
            {content.about.paragraphs.map((paragrafo, i) => (
              <p
                key={i}
                data-reveal
                style={{ "--reveal-delay": `${200 + i * 90}ms` } as React.CSSProperties}
                className="max-w-xl text-[1.02rem] leading-relaxed text-tinta-suave"
              >
                {paragrafo}
              </p>
            ))}
          </div>

          <figure
            data-reveal
            style={{ "--reveal-delay": "520ms" } as React.CSSProperties}
            className="mt-10 border-l-[1.5px] border-dashed border-coral pl-6"
          >
            <blockquote className="font-display text-[1.45rem] leading-snug text-mare italic">
              “{siteConfig.tagline}”
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}
