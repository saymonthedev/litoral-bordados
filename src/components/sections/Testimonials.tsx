import { testimonials } from "@/data/testimonials";

/**
 * Depoimentos.
 *
 * A seção só existe quando houver depoimentos reais cadastrados em
 * src/data/testimonials.ts. Nada é inventado: com a lista vazia, este
 * componente não renderiza absolutamente nada.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="titulo-depoimentos" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
        <h2
          id="titulo-depoimentos"
          data-reveal
          className="max-w-2xl text-[clamp(2rem,1.3rem+2.6vw,3.35rem)] leading-[1.08] text-mare"
        >
          Quem já bordou com a gente.
        </h2>

        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((depoimento, i) => (
            <li
              key={`${depoimento.author}-${i}`}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className="flex flex-col border-t border-dashed border-mare/20 pt-7"
            >
              <blockquote className="font-display text-[1.15rem] leading-relaxed text-mare italic">
                “{depoimento.quote}”
              </blockquote>
              <p className="mt-5 text-sm font-semibold text-mare">{depoimento.author}</p>
              {depoimento.role ? (
                <p className="mt-1 text-sm text-tinta-suave">{depoimento.role}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
