import { cn } from "@/lib/cn";

/**
 * Amostras de pontos de bordado de verdade — um pequeno mostruário.
 *
 * Cada diferencial da seção "Diferenciais" vem acompanhado do ponto que
 * combina com ele. Os pontos são "bordados" um a um quando entram na tela
 * (data-stagger cuida do escalonamento; veja globals.css).
 */

export type StitchSampleName = "knot" | "chain" | "satin" | "cross" | "back" | "stem";

const W = 132;

function elementos(name: StitchSampleName): React.ReactNode[] {
  switch (name) {
    // Nó francês: pequenos nós ao longo da linha
    case "knot":
      return Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={10 + i * 14} cy={18 + (i % 2 ? 1.5 : -1.5)} r="3.1" fill="currentColor" stroke="none" />
      ));
    // Ponto corrente: elos encadeados
    case "chain":
      return Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={6 + i * 13.5} y="10.5" width="19" height="15" rx="7.5" pathLength="1" strokeDasharray="1" />
      ));
    // Ponto cheio: linhas paralelas bem juntas
    case "satin":
      return Array.from({ length: 22 }, (_, i) => (
        <path key={i} d={`M${12 + i * 5.4} 8.5l-5.5 19`} pathLength="1" strokeDasharray="1" />
      ));
    // Ponto cruz
    case "cross":
      return Array.from({ length: 8 }, (_, i) => (
        <path
          key={i}
          d={`M${9 + i * 15} 10l9 16M${18 + i * 15} 10l-9 16`}
          pathLength="1"
          strokeDasharray="1"
        />
      ));
    // Ponto atrás: traços encostados formando uma linha contínua
    case "back":
      return Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${8 + i * 15.5} ${20 + Math.sin(i / 1.6) * 3}L${21 + i * 15.5} ${20 + Math.sin((i + 1) / 1.6) * 3}`} pathLength="1" strokeDasharray="1" />
      ));
    // Ponto haste: traços inclinados sobrepostos, como uma corda
    default:
      return Array.from({ length: 17 }, (_, i) => (
        <path key={i} d={`M${8 + i * 7} ${24 - Math.sin(i / 3) * 4}l9.5-9`} pathLength="1" strokeDasharray="1" />
      ));
  }
}

type StitchSampleProps = {
  name: StitchSampleName;
  className?: string;
};

export function StitchSample({ name, className }: StitchSampleProps) {
  const itens = elementos(name);
  return (
    <svg
      viewBox={`0 0 ${W} 36`}
      aria-hidden="true"
      className={cn("h-9 w-full max-w-[132px]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      data-stagger
    >
      {itens.map((el, i) =>
        // cada ponto entra com um pequeno atraso, um depois do outro
        <g key={i} style={{ "--i": i } as React.CSSProperties}>
          {el}
        </g>,
      )}
    </svg>
  );
}
