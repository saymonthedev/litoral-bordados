import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Botão da Litoral Bordados.
 *
 * O detalhe da marca: um pesponto tracejado corre por dentro do botão e
 * "costura" ao passar o mouse — o mesmo gesto da animação do Hero.
 */

type Variant = "primaria" | "secundaria" | "clara" | "contorno-claro";

const variantes: Record<Variant, string> = {
  primaria:
    "bg-mare text-linho hover:bg-mare-700 shadow-[0_14px_34px_-20px_rgb(14_44_66/0.85)] hover:shadow-[0_18px_38px_-18px_rgb(14_44_66/0.75)]",
  secundaria: "text-mare border border-mare/25 hover:border-mare/45 hover:bg-mare/[0.04]",
  clara: "bg-linho text-mare hover:bg-white shadow-[0_14px_34px_-20px_rgb(0_0_0/0.6)]",
  "contorno-claro": "text-linho border border-linho/30 hover:border-linho/60 hover:bg-linho/[0.06]",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Abre em nova aba (WhatsApp, Instagram). */
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function Button({
  href,
  children,
  variant = "primaria",
  external = false,
  icon,
  className,
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5",
        "text-[0.95rem] font-semibold tracking-tight",
        "transition-[transform,background-color,border-color,box-shadow] duration-300 ease-(--ease-linha)",
        "hover:-translate-y-0.5 active:translate-y-0",
        variantes[variant],
        className,
      )}
    >
      {/* pesponto interno */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-[5px] overflow-visible"
        style={{ width: "calc(100% - 10px)", height: "calc(100% - 10px)" }}
      >
        <rect
          x="0.75"
          y="0.75"
          rx="999"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="5 4.5"
          style={{ width: "calc(100% - 1.5px)", height: "calc(100% - 1.5px)" }}
          className="transition-[stroke-dashoffset] duration-[900ms] ease-(--ease-linha) group-hover:[stroke-dashoffset:-19]"
        />
      </svg>
      <span className="relative">{children}</span>
      {icon ? <span className="relative flex shrink-0 items-center">{icon}</span> : null}
    </a>
  );
}
