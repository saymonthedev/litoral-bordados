import { cn } from "@/lib/cn";

/**
 * Bainha em onda: a borda entre o fundo de linho e uma seção azul.
 *
 * É o recorte do tecido — uma onda com o pesponto correndo por dentro,
 * como o acabamento de uma peça.
 */

type WaveEdgeProps = {
  /** "topo" = entrada da seção escura; "base" = saída. */
  position?: "topo" | "base";
  className?: string;
};

export function WaveEdge({ position = "topo", className }: WaveEdgeProps) {
  return (
    <div aria-hidden="true" className={cn("relative w-full overflow-hidden leading-[0]", className)}>
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className={cn("block h-14 w-full md:h-[5.5rem]", position === "base" && "rotate-180")}
        fill="none"
      >
        <path
          d="M0 0h1440v46c-150 34-290-34-460-20s-330 62-510 46S150 14 0 44Z"
          fill="var(--color-linho)"
        />
        <path
          d="M1440 60c-150 34-290-34-460-20s-330 62-510 46S150 28 0 58"
          stroke="var(--color-coral)"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeDasharray="12 9"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
