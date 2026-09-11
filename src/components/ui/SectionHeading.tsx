import { cn } from "@/lib/cn";

/**
 * Cabeçalho padrão das seções: sobrelinha com pesponto, título e apoio.
 */

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** "escuro" quando a seção tem fundo azul. */
  tone?: "claro" | "escuro";
  align?: "esquerda" | "centro";
  id?: string;
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "claro",
  align = "esquerda",
  id,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const escuro = tone === "escuro";
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "centro" && "items-center text-center",
        className,
      )}
    >
      <p
        data-reveal
        className={cn(
          "flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.28em] uppercase",
          escuro ? "text-coral-claro" : "text-coral",
        )}
      >
        <span
          aria-hidden="true"
          className="inline-block h-px w-8 border-t-[1.5px] border-dashed border-current"
        />
        {eyebrow}
      </p>

      <h2
        id={id}
        data-reveal
        style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
        className={cn(
          "mt-5 max-w-2xl text-[clamp(2rem,1.3rem+2.6vw,3.35rem)] leading-[1.08]",
          escuro ? "text-linho" : "text-mare",
          align === "centro" && "mx-auto",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          data-reveal
          style={{ "--reveal-delay": "170ms" } as React.CSSProperties}
          className={cn(
            "mt-5 max-w-xl text-[1.0625rem] leading-relaxed",
            escuro ? "text-linho/70" : "text-tinta-suave",
            align === "centro" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
