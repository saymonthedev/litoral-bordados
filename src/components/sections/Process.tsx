import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/config/content";
import { processSteps } from "@/data/process";

/**
 * Como funciona — as etapas ligadas por um fio.
 *
 * No desktop, uma linha pespontada atravessa as etapas e se costura da
 * esquerda para a direita; no celular, o mesmo fio desce pela lateral.
 */
export function Process() {
  return (
    <section id="processo" aria-labelledby="titulo-processo" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
        <SectionHeading
          id="titulo-processo"
          eyebrow={content.process.eyebrow}
          title={content.process.title}
          description={content.process.description}
        />

        <div className="relative mt-16">
          {/* fio que liga as etapas (desktop) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            data-stitch-reveal
            data-parallax-x="-45"
            className="absolute top-7 -left-12 hidden h-10 w-[calc(100%+6rem)] text-mare/35 lg:block"
            fill="none"
          >
            <g>
              <path
                d="M30 22C230 2 380 38 580 20s390-32 590-4"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="13 10"
              />
            </g>
          </svg>

          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((etapa, i) => (
              <li
                key={etapa.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
                className="group relative pl-16 sm:pl-0"
              >
                {/* fio vertical (celular) */}
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-[1.4rem] h-full w-px border-l-[1.5px] border-dashed border-mare/25 sm:hidden"
                />

                <span className="absolute top-0 left-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border border-mare/20 bg-linho font-display text-lg text-mare transition-colors duration-500 group-hover:border-coral sm:relative sm:flex">
                  {String(i + 1).padStart(2, "0")}
                  <span
                    aria-hidden="true"
                    className="absolute inset-1.5 rounded-full border border-dashed border-mare/20 transition-colors duration-500 group-hover:border-coral/50"
                  />
                </span>

                <h3 className="mt-0 text-[1.2rem] leading-snug text-mare sm:mt-6">{etapa.title}</h3>
                <p className="mt-2 pb-6 text-[0.93rem] leading-relaxed text-tinta-suave sm:pb-0">
                  {etapa.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
