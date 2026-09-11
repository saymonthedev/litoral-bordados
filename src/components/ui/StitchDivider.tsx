import { cn } from "@/lib/cn";

/**
 * O fio condutor entre as seções.
 *
 * Uma linha de pesponto que atravessa a página em onda e se costura da
 * esquerda para a direita quando entra na tela, ligando uma seção à
 * seguinte. Em telas estreitas o desenho é recortado nas laterais
 * (preserveAspectRatio="slice"), então os pontos nunca ficam esticados.
 */

type StitchDividerProps = {
  tone?: "claro" | "escuro";
  className?: string;
  /** Um pequeno nó de linha no fim do percurso. */
  knot?: boolean;
};

export function StitchDivider({ tone = "claro", className, knot = true }: StitchDividerProps) {
  const cor = tone === "escuro" ? "text-linho/35" : "text-mare/30";
  return (
    <div aria-hidden="true" className={cn("relative w-full overflow-hidden", className)}>
      {/* o SVG é mais largo que o espaço visível: assim o fio pode ser
          arrastado na horizontal sem nunca abrir uma brecha nas laterais */}
      <svg
        viewBox="0 0 1200 56"
        preserveAspectRatio="xMidYMid slice"
        data-stitch-reveal
        data-parallax-x="-70"
        className={cn("-mx-24 h-14 w-[calc(100%+12rem)]", cor)}
        fill="none"
      >
        {/* o conteúdo vai dentro de um <g>: é ele que é recortado enquanto
            o pesponto ainda não foi costurado */}
        <g>
          <path
            d="M-20 40C140 40 200 14 330 14s200 26 330 26 200-26 330-26 190 26 290 26"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="13 10"
          />
          {knot ? <circle cx="1160" cy="40" r="4" className="fill-coral" /> : null}
        </g>
      </svg>
    </div>
  );
}
