import { SectionHeading } from "@/components/ui/SectionHeading";
import { StitchSample } from "@/components/ui/StitchSample";
import { WaveEdge } from "@/components/ui/WaveEdge";
import { content } from "@/config/content";
import { differentials } from "@/data/differentials";

/**
 * Diferenciais — um mostruário de pontos.
 *
 * Cada diferencial vem com a amostra de um ponto de bordado de verdade,
 * bordada na tela quando a seção aparece. É a seção escura da página:
 * entra e sai por uma bainha em onda.
 */
export function Differentials() {
  return (
    <section
      aria-labelledby="titulo-diferenciais"
      className="sobre-escuro relative bg-mare text-linho"
    >
      <WaveEdge position="topo" className="absolute inset-x-0 top-0 z-10 -translate-y-px" />

      <div className="textura-linho-clara">
        <div className="mx-auto max-w-[78rem] px-5 pt-28 pb-28 sm:px-8 md:pt-36 md:pb-36">
          <SectionHeading
            id="titulo-diferenciais"
            eyebrow={content.differentials.eyebrow}
            title={content.differentials.title}
            description={content.differentials.description}
            tone="escuro"
          />

          <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {differentials.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="group border-t border-dashed border-linho/25 pt-7"
              >
                <StitchSample
                  name={item.stitch}
                  className="h-9 text-coral-claro/90 transition-colors duration-500 group-hover:text-coral-claro"
                />

                <p className="mt-6 text-[0.68rem] font-semibold tracking-[0.22em] text-linho/45 uppercase">
                  {item.stitchLabel}
                </p>
                <h3 className="mt-2 text-[1.35rem] leading-snug text-linho">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-linho/65">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <WaveEdge position="base" className="absolute inset-x-0 bottom-0 z-10 translate-y-px" />
    </section>
  );
}
