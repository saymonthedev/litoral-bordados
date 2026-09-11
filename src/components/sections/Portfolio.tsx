import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/config/content";
import { portfolioItems } from "@/data/portfolio";
import { cn } from "@/lib/cn";

/** Itens que ocupam duas colunas na grade (ritmo assimétrico). */
const largos = new Set([0, 3, 4]);

/**
 * Nossos trabalhos.
 *
 * Enquanto as fotos reais não chegam, cada espaço mostra um tecido
 * desenhado e a etiqueta "Espaço reservado" — nada aqui se apresenta
 * como um trabalho já realizado. Veja src/data/portfolio.ts.
 */
export function Portfolio() {
  return (
    <section id="trabalhos" aria-labelledby="titulo-trabalhos" className="relative py-20 md:py-28">
      <div aria-hidden="true" className="textura-linho absolute inset-0 -z-10 opacity-70" />

      <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="titulo-trabalhos"
            eyebrow={content.portfolio.eyebrow}
            title={content.portfolio.title}
            description={content.portfolio.description}
            className="lg:max-w-2xl"
          />

          <p
            data-reveal
            style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            className="flex max-w-sm items-start gap-3 rounded-2xl border border-dashed border-mare/25 bg-papel/70 p-4 text-[0.85rem] leading-relaxed text-tinta-suave"
          >
            <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral" />
            {content.portfolio.note}
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, i) => {
            const largo = largos.has(i);
            return (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
                className={cn("group flex flex-col", largo && "lg:col-span-2")}
              >
                <PhotoFrame
                  src={item.image}
                  alt={item.alt}
                  aspect={cn("aspect-[4/5]", largo && "lg:aspect-[16/10]")}
                  sizes={largo ? "(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 52vw" : "(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 26vw"}
                  badge={item.placeholder ? content.portfolio.placeholderBadge : undefined}
                />

                <div className="mt-5 flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-coral uppercase">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-[1.3rem] leading-snug text-mare">{item.title}</h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-3 h-px w-8 shrink-0 border-t-[1.5px] border-dashed border-mare/30 transition-all duration-500 ease-linha group-hover:w-12 group-hover:border-coral"
                  />
                </div>

                <p className="mt-3 max-w-md text-[0.93rem] leading-relaxed text-tinta-suave">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
