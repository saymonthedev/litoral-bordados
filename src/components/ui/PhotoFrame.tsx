import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Moldura de foto com acabamento pespontado.
 *
 * Serve tanto para os espaços reservados (SVGs de /public) quanto para as
 * fotos reais: quando a foto chegar, basta trocar o caminho em `src` e
 * remover `placeholder` — o enquadramento e o acabamento continuam iguais.
 */

type PhotoFrameProps = {
  src: string;
  alt: string;
  /** Proporção da moldura, ex.: "aspect-[4/5]". */
  aspect?: string;
  sizes: string;
  priority?: boolean;
  /** Etiqueta discreta no canto — usada nos espaços reservados. */
  badge?: string;
  caption?: string;
  className?: string;
  rounded?: string;
  /** Força do arraste da foto dentro da moldura (px). 0 desliga. */
  arraste?: number;
  children?: React.ReactNode;
};

export function PhotoFrame({
  src,
  alt,
  aspect = "aspect-[4/5]",
  sizes,
  priority = false,
  badge,
  caption,
  className,
  rounded = "rounded-[26px]",
  arraste = 26,
  children,
}: PhotoFrameProps) {
  return (
    <figure className={cn("group/foto relative", className)}>
      <div
        className={cn(
          "relative overflow-hidden bg-areia/70 ring-1 ring-mare/10",
          "shadow-[0_30px_70px_-45px_rgb(14_44_66/0.7)]",
          aspect,
          rounded,
        )}
      >
        {/* A foto é um pouco maior que a moldura e desliza dentro dela
            conforme a página rola — o arraste que dá profundidade. */}
        <div
          data-parallax={arraste || undefined}
          data-parallax-scale={arraste ? "1.12" : undefined}
          className={cn("absolute inset-0", arraste ? "scale-[1.12]" : undefined)}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1200ms] ease-(--ease-linha) group-hover/foto:scale-[1.02]"
          />
        </div>

        {/* acabamento pespontado por dentro da moldura */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-3 border border-dashed border-linho/40 mix-blend-soft-light",
            rounded === "rounded-full" ? "rounded-full" : "rounded-[18px]",
          )}
        />

        {badge ? (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-linho/92 px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.12em] text-mare/75 uppercase backdrop-blur-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
            {badge}
          </span>
        ) : null}

        {children}
      </div>

      {caption ? (
        <figcaption className="mt-3 flex items-center gap-2 text-xs text-tinta-suave/80">
          <span aria-hidden="true" className="h-px w-6 border-t border-dashed border-tinta-suave/50" />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
