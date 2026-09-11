import { cn } from "@/lib/cn";

/**
 * Ícones desenhados com traço pespontado — como se fossem bordados.
 *
 * Ao passar o mouse no card, os pontos "correm" pelo contorno
 * (o tracejado desliza), repetindo o gesto da animação do Hero.
 */

export type StitchIconName =
  | "bordado"
  | "uniforme"
  | "camiseta"
  | "bone"
  | "identidade"
  | "medida";

const desenhos: Record<StitchIconName, React.ReactNode> = {
  // Bastidor com uma onda bordada dentro
  bordado: (
    <>
      <path d="M21 7h6v4h-6z" />
      <circle cx="24" cy="27" r="15.5" />
      <circle cx="24" cy="27" r="11.8" strokeOpacity="0.45" />
      <path d="M15 30c4-7.5 7.5 4 11.5-2.5S32 20 34 24.5" strokeOpacity="0.95" />
    </>
  ),
  // Polo de uniforme com emblema bordado no peito
  uniforme: (
    <>
      <path d="M18 7.5 9.5 12l-3 9.5 6 2V42h23V23.5l6-2-3-9.5L30 7.5" />
      <path d="M18 7.5c2 4.5 10 4.5 12 0" />
      <path d="M22.5 11v6" strokeOpacity="0.7" />
      <rect x="26" y="25" width="9.5" height="7" rx="1.5" strokeOpacity="0.75" />
    </>
  ),
  // Camiseta com um bordado pequeno no peito
  camiseta: (
    <>
      <path d="M18 7.5 9.5 12l-3 9.5 6 2V42h23V23.5l6-2-3-9.5L30 7.5" />
      <path d="M18 7.5c2 5.5 10 5.5 12 0" />
      <path d="M17.5 28c2-2.5 4 1.5 6-1s4-2.5 6.5.5" strokeOpacity="0.85" />
    </>
  ),
  // Boné
  bone: (
    <>
      <path d="M8.5 32a15.5 15 0 0 1 31 0" />
      <path d="M39.5 32c5.5.5 8 3 8 5.5H9.5C9.5 35 11.5 32.5 15 32" />
      <path d="M24 17v15" strokeOpacity="0.6" />
      <path d="M24 24.5c5.5 0 9 2.5 10.5 7.5" strokeOpacity="0.6" />
      <circle cx="24" cy="16" r="1.7" strokeOpacity="0.85" />
    </>
  ),
  // Etiqueta de marca
  identidade: (
    <>
      <path d="M27 6.5h13.5a2 2 0 0 1 2 2V22a2 2 0 0 1-.6 1.4L25.4 40.4a2 2 0 0 1-2.8 0L8.1 25.9a2 2 0 0 1 0-2.8L25.1 7.1a2 2 0 0 1 1.9-.6Z" />
      <circle cx="35" cy="14" r="2.6" />
      <path d="M17 24.5c2.5-3 5 2 7.5-1" strokeOpacity="0.8" />
    </>
  ),
  // Carretel de linha
  medida: (
    <>
      <path d="M13 9.5h22M13 38.5h22" />
      <path d="M18.5 9.5v29M29.5 9.5v29" strokeOpacity="0.4" />
      <path d="M18.5 17c3.5 2.5 7.5 2.5 11 0M18.5 24c3.5 2.5 7.5 2.5 11 0M18.5 31c3.5 2.5 7.5 2.5 11 0" />
      <path d="M29.5 21c9.5 1.5 13 8.5 9 15.5" strokeOpacity="0.9" />
    </>
  ),
};

type StitchIconProps = {
  name: StitchIconName;
  className?: string;
};

export function StitchIcon({ name, className }: StitchIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("h-11 w-11", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g
        strokeDasharray="3.6 2.9"
        className="transition-[stroke-dashoffset] duration-[1100ms] ease-(--ease-linha) group-hover:[stroke-dashoffset:-13]"
      >
        {desenhos[name]}
      </g>
    </svg>
  );
}
