import { SectionHeading } from "@/components/ui/SectionHeading";
import { StitchIcon } from "@/components/ui/StitchIcon";
import { content } from "@/config/content";
import { services } from "@/data/services";

/**
 * Serviços — lista editorial, sem excesso de cartões: cada item é
 * separado por uma linha pespontada e "costura" ao passar o mouse.
 */
export function Services() {
  return (
    <section id="servicos" aria-labelledby="titulo-servicos" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
        <SectionHeading
          id="titulo-servicos"
          eyebrow={content.services.eyebrow}
          title={content.services.title}
          description={content.services.description}
        />

        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((servico, i) => (
            <li
              key={servico.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="group relative border-t border-dashed border-mare/20 pt-7"
            >
              {/* pesponto coral que se costura no hover */}
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-0 border-t-[1.5px] border-dashed border-coral transition-[width] duration-700 ease-linha group-hover:w-full"
              />

              <div className="flex items-start justify-between gap-4">
                <StitchIcon
                  name={servico.icon}
                  className="h-11 w-11 text-mare/70 transition-colors duration-500 group-hover:text-coral"
                />
                <span className="font-display text-sm text-tinta-clara">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-6 text-[1.35rem] leading-snug text-mare">{servico.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-tinta-suave">
                {servico.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
