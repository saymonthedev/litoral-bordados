"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  MARK_BOUNDS,
  SHORE_CURVE,
  WAVE_CURVE,
  type CubicSegment,
  curveToPath,
  pointAtLength,
  sampleCurve,
  satinStitches,
  shoreStitches,
  stitchPath,
} from "@/lib/brand/mark";
import { BORDADOS, LITORAL } from "@/lib/brand/wordmark";
import { brandColors } from "@/lib/brand/palette";
import { cn } from "@/lib/cn";
import "./embroidery.css";

/* ==================================================================
   "Do fio ao bordado"
   ------------------------------------------------------------------
   A agulha entra por fora do bastidor puxando o fio, costura o
   pesponto da orla, troca de linha, preenche a onda em ponto cheio e
   sai — e então o nome é bordado letra a letra.

   Toda a geometria vem de src/lib/brand/mark.ts: é exatamente o mesmo
   desenho da logo. Mudou a marca, muda a animação junto.

   Para ajustar o ritmo, mexa em TEMPOS (valores em milissegundos).
   ================================================================== */

const TEMPOS = {
  entrada: { inicio: 300, fim: 1000 },
  orla: { inicio: 1000, fim: 2250 },
  salto: { inicio: 2250, fim: 2600 },
  onda: { inicio: 2600, fim: 4600 },
  saida: { inicio: 4600, fim: 5050 },
  nome: { inicio: 4850 },
  total: 5900,
};

/** Caminho de entrada: o fio chega de fora do bastidor. */
const ENTRADA: CubicSegment[] = [[-46, 104, -24, 101, -8, 93, 6, 84.2]];
/** Salto entre a orla e a onda (a agulha viaja sem costurar). */
const SALTO: CubicSegment[] = [[94, 84, 72, 102, 30, 98, 5, 71]];
/** Saída: a agulha se afasta e o fio some. */
const SAIDA: CubicSegment[] = [[76.5, 36.5, 92, 26, 112, 8, 132, -14]];

/* Medidas do bastidor (viewBox 400 x 400) */
const RAIO_EXTERNO = 182;
const RAIO_TECIDO = 167;
const ESCALA = 2;
const OX = 200 - (MARK_BOUNDS.x + MARK_BOUNDS.width / 2) * ESCALA;
const OY = 166 - (MARK_BOUNDS.y + MARK_BOUNDS.height / 2) * ESCALA;

/* Medidas do nome dentro do bastidor */
const NOME_TAMANHO = 56;
const NOME_LARGURA = (LITORAL.bbox.width / 100) * NOME_TAMANHO;
const NOME_BASE = 300;
const SUB_TAMANHO = 10.5;
const SUB_LARGURA = (BORDADOS.bbox.width / 100) * SUB_TAMANHO;
const SUB_BASE = 324;

/* Amostragens (feitas uma vez só) */
const amostras = {
  entrada: sampleCurve(ENTRADA),
  orla: sampleCurve(SHORE_CURVE),
  salto: sampleCurve(SALTO),
  onda: sampleCurve(WAVE_CURVE),
  saida: sampleCurve(SAIDA),
};

/** Comprimento do fio solto que fica arrastando atrás da agulha. */
const RABICHO = 26;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const faseProgresso = (t: number, fase: { inicio: number; fim: number }) =>
  clamp01((t - fase.inicio) / (fase.fim - fase.inicio));
const suave = (t: number) => t * t * (3 - 2 * t);

type EmbroideryHoopProps = {
  className?: string;
  /** Rótulo do botão que refaz o bordado. */
  replayLabel: string;
  /** Descrição da animação para leitores de tela. */
  label: string;
};

export function EmbroideryHoop({ className, replayLabel, label }: EmbroideryHoopProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const agulhaRef = useRef<SVGGElement | null>(null);
  const fioOrlaRef = useRef<SVGPathElement | null>(null);
  const fioOndaRef = useRef<SVGPathElement | null>(null);
  const pontosOrla = useRef<Array<SVGPathElement | null>>([]);
  const pontosOnda = useRef<Array<SVGPathElement | null>>([]);
  const valores = useRef<{ orla: number[]; onda: number[] }>({
    orla: shoreStitches.map(() => -1),
    onda: satinStitches.map(() => -1),
  });

  const [execucao, setExecucao] = useState(0);
  const [concluido, setConcluido] = useState(false);

  /** Aplica o estado da animação para um instante `t` (em ms). */
  const desenhar = useCallback((t: number) => {
    const svg = svgRef.current;
    if (!svg) return;

    // ---- pontos da orla (pesponto) ----
    const pOrla = faseProgresso(t, TEMPOS.orla);
    const janelaOrla = 0.06;
    shoreStitches.forEach((s, i) => {
      const v = clamp01((pOrla - (s.at - janelaOrla)) / janelaOrla);
      if (v === valores.current.orla[i]) return;
      valores.current.orla[i] = v;
      const el = pontosOrla.current[i];
      if (!el) return;
      el.style.opacity = v > 0 ? "1" : "0";
      el.style.strokeDashoffset = String(1 - v);
    });

    // ---- pontos da onda (ponto cheio) ----
    const pOnda = faseProgresso(t, TEMPOS.onda);
    const janelaOnda = 0.022;
    satinStitches.forEach((s, i) => {
      const v = clamp01((pOnda - (s.at - janelaOnda)) / janelaOnda);
      if (v === valores.current.onda[i]) return;
      valores.current.onda[i] = v;
      const el = pontosOnda.current[i];
      if (!el) return;
      el.style.opacity = v > 0 ? "1" : "0";
      el.style.strokeDashoffset = String(1 - v);
    });

    // ---- fio solto + agulha ----
    const fioOrla = fioOrlaRef.current;
    const fioOnda = fioOndaRef.current;
    const agulha = agulhaRef.current;

    let ponto: { x: number; y: number; angle: number } | null = null;
    let passoDaAgulha = 0; // usado para a agulha "furar" o tecido

    if (t < TEMPOS.entrada.inicio) {
      if (fioOrla) fioOrla.style.opacity = "0";
      if (agulha) agulha.style.opacity = "0";
    } else if (t < TEMPOS.orla.fim) {
      const naEntrada = t < TEMPOS.entrada.fim;
      const avanco = naEntrada
        ? suave(faseProgresso(t, TEMPOS.entrada)) * amostras.entrada.total
        : amostras.entrada.total + faseProgresso(t, TEMPOS.orla) * amostras.orla.total;
      ponto = naEntrada
        ? pointAtLength(amostras.entrada, avanco)
        : pointAtLength(amostras.orla, avanco - amostras.entrada.total);
      passoDaAgulha = naEntrada ? 0 : pOrla * shoreStitches.length * 2;
      if (fioOrla) {
        fioOrla.style.opacity = "1";
        fioOrla.style.strokeDashoffset = String(RABICHO - avanco);
      }
      if (agulha) agulha.style.opacity = "1";
    } else if (t < TEMPOS.onda.inicio) {
      // troca de linha: a agulha viaja com a linha levantada
      const p = suave(faseProgresso(t, TEMPOS.salto));
      ponto = pointAtLength(amostras.salto, p * amostras.salto.total);
      if (fioOrla) fioOrla.style.opacity = String(1 - p);
      if (fioOnda) fioOnda.style.opacity = "0";
    } else if (t < TEMPOS.saida.fim) {
      const naOnda = t < TEMPOS.onda.fim;
      const avanco = naOnda
        ? faseProgresso(t, TEMPOS.onda) * amostras.onda.total
        : amostras.onda.total + suave(faseProgresso(t, TEMPOS.saida)) * amostras.saida.total;
      ponto = naOnda
        ? pointAtLength(amostras.onda, avanco)
        : pointAtLength(amostras.saida, avanco - amostras.onda.total);
      passoDaAgulha = naOnda ? pOnda * satinStitches.length : 0;
      if (fioOrla) fioOrla.style.opacity = "0";
      if (fioOnda) {
        fioOnda.style.opacity = naOnda ? "1" : String(1 - faseProgresso(t, TEMPOS.saida));
        fioOnda.style.strokeDashoffset = String(RABICHO - avanco);
      }
      if (agulha) agulha.style.opacity = "1";
    } else {
      if (agulha) agulha.style.opacity = "0";
      if (fioOnda) fioOnda.style.opacity = "0";
      if (fioOrla) fioOrla.style.opacity = "0";
    }

    if (ponto && agulha) {
      // pequeno mergulho a cada ponto, como a agulha entrando no tecido
      const furo = Math.abs(Math.sin(passoDaAgulha * Math.PI)) * 1.6;
      const graus = (ponto.angle * 180) / Math.PI;
      agulha.setAttribute(
        "transform",
        `translate(${ponto.x.toFixed(2)} ${ponto.y.toFixed(2)}) rotate(${graus.toFixed(1)}) translate(${(-furo).toFixed(2)} 0)`,
      );
    }

    // ---- o nome ----
    if (t >= TEMPOS.nome.inicio) svg.dataset.nome = "1";
    else delete svg.dataset.nome;
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reduzido =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // sempre parte do zero (também no "bordar novamente")
    valores.current.orla.fill(-1);
    valores.current.onda.fill(-1);

    if (reduzido) {
      desenhar(TEMPOS.total);
      setConcluido(true);
      return;
    }

    setConcluido(false);
    let frame = 0;
    let anterior = 0;
    let relogio = 0;

    const passo = (ts: number) => {
      if (!anterior) anterior = ts;
      // o tempo acumulado ignora pausas longas (aba em segundo plano)
      relogio += Math.min(ts - anterior, 64);
      anterior = ts;
      desenhar(relogio);
      if (relogio < TEMPOS.total) {
        frame = requestAnimationFrame(passo);
      } else {
        setConcluido(true);
      }
    };

    desenhar(0);
    frame = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frame);
  }, [desenhar, execucao]);

  return (
    <div className={cn("relative", className)}>
      {/* sombra do bastidor sobre a mesa */}
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full bg-mare/25 blur-3xl"
      />

      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="bastidor relative block w-full"
        role="img"
        aria-label={label}
      >
        <defs>
          <pattern id="trama-tecido" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M0 0h5M0 2.5h5" stroke={brandColors.mare} strokeOpacity="0.05" strokeWidth="1" />
            <path d="M0 0v5M2.5 0v5" stroke={brandColors.mare} strokeOpacity="0.04" strokeWidth="1" />
          </pattern>

          <radialGradient id="luz-tecido" cx="36%" cy="28%" r="78%">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="0.6" stopColor={brandColors.linho} stopOpacity="0.35" />
            <stop offset="1" stopColor="#8A6A3F" stopOpacity="0.22" />
          </radialGradient>

          <linearGradient id="madeira" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#EADCC3" />
            <stop offset="0.35" stopColor="#D6C1A0" />
            <stop offset="0.62" stopColor="#BFA582" />
            <stop offset="1" stopColor="#DFCDB1" />
          </linearGradient>

          <linearGradient id="agulha-metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F2F4F6" />
            <stop offset="0.45" stopColor="#B9C2C9" />
            <stop offset="1" stopColor="#7E8A93" />
          </linearGradient>

          <linearGradient id="brilho-bordado" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <clipPath id="recorte-tecido">
            <circle cx="200" cy="200" r={RAIO_TECIDO} />
          </clipPath>
        </defs>

        {/* ---------- bastidor ---------- */}
        <g>
          <circle cx="200" cy="200" r={RAIO_EXTERNO} fill="url(#madeira)" />
          <circle cx="200" cy="200" r={RAIO_EXTERNO} fill="none" stroke={brandColors.mare} strokeOpacity="0.14" strokeWidth="1.5" />
          {/* parafuso de aperto */}
          <g transform="translate(200 12)">
            <rect x="-17" y="-9" width="34" height="26" rx="7" fill="url(#madeira)" stroke={brandColors.mare} strokeOpacity="0.16" strokeWidth="1.2" />
            <circle cx="0" cy="4" r="5.5" fill="#B99F79" stroke={brandColors.mare} strokeOpacity="0.2" strokeWidth="1.2" />
            <path d="M-3 4h6" stroke={brandColors.mare} strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </g>

        {/* ---------- tecido ---------- */}
        <g clipPath="url(#recorte-tecido)">
          <circle cx="200" cy="200" r={RAIO_TECIDO} fill={brandColors.papel} />
          <circle cx="200" cy="200" r={RAIO_TECIDO} fill="url(#trama-tecido)" />
          <circle cx="200" cy="200" r={RAIO_TECIDO} fill="url(#luz-tecido)" />
        </g>
        <circle cx="200" cy="200" r={RAIO_TECIDO} fill="none" stroke={brandColors.mare} strokeOpacity="0.12" strokeWidth="2" />

        {/* ---------- o bordado ---------- */}
        <g transform={`translate(${OX} ${OY}) scale(${ESCALA})`}>
          {/* fio solto da orla (linha coral) */}
          <path
            ref={fioOrlaRef}
            data-fio="orla"
            d={`${curveToPath(ENTRADA)}${curveToPath(SHORE_CURVE).replace(/^M[^C]*/, "")}`}
            fill="none"
            stroke={brandColors.coral}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeDasharray={`${RABICHO} 4000`}
          />

          {/* pontos da orla */}
          <g fill="none" stroke={brandColors.coral} strokeWidth="2.1" strokeLinecap="round">
            {shoreStitches.map((s, i) => (
              <path
                key={`orla-${i}`}
                ref={(el) => {
                  pontosOrla.current[i] = el;
                }}
                data-ponto="orla"
                d={stitchPath(s)}
                pathLength={1}
                strokeDasharray="1"
              />
            ))}
          </g>

          {/* fio solto da onda (linha azul) */}
          <path
            ref={fioOndaRef}
            data-fio="onda"
            d={`${curveToPath(WAVE_CURVE)}${curveToPath(SAIDA).replace(/^M[^C]*/, "")}`}
            fill="none"
            stroke={brandColors.mareMedio}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={`${RABICHO} 4000`}
          />

          {/* pontos cheios da onda */}
          <g fill="none" strokeWidth="1.5" strokeLinecap="round">
            {satinStitches.map((s, i) => (
              <path
                key={`onda-${i}`}
                ref={(el) => {
                  pontosOnda.current[i] = el;
                }}
                data-ponto="onda"
                d={stitchPath(s)}
                pathLength={1}
                strokeDasharray="1"
                stroke={i % 2 ? brandColors.mareMedio : brandColors.mare}
              />
            ))}
          </g>
        </g>

        {/* ---------- o nome, bordado letra a letra ---------- */}
        <g
          transform={`translate(${200 - NOME_LARGURA / 2} ${NOME_BASE}) scale(${NOME_TAMANHO / 100}) translate(${-LITORAL.bbox.x} 0)`}
          fill={brandColors.mare}
          stroke={brandColors.mare}
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        >
          {LITORAL.glyphs.map((g, i) => (
            <path
              key={`lit-${i}`}
              className="letra"
              style={{ "--i": i } as React.CSSProperties}
              d={g.d}
              pathLength={1}
              strokeDasharray="1"
            />
          ))}
        </g>

        <g
          transform={`translate(${200 - SUB_LARGURA / 2} ${SUB_BASE}) scale(${SUB_TAMANHO / 100}) translate(${-BORDADOS.bbox.x} 0)`}
          fill={brandColors.mare}
          stroke={brandColors.mare}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        >
          {BORDADOS.glyphs.map((g, i) => (
            <path
              key={`bor-${i}`}
              className="letra"
              style={{ "--i": i + LITORAL.glyphs.length } as React.CSSProperties}
              d={g.d}
              pathLength={1}
              strokeDasharray="1"
            />
          ))}
        </g>

        {/* brilho que passa pelo bordado quando ele fica pronto */}
        <g clipPath="url(#recorte-tecido)">
          <rect
            className="brilho"
            x="60"
            y="40"
            width="120"
            height="320"
            fill="url(#brilho-bordado)"
            transform="rotate(14 200 200)"
          />
        </g>

        {/* ---------- a agulha ---------- */}
        <g transform={`translate(${OX} ${OY}) scale(${ESCALA})`}>
          <g ref={agulhaRef} className="agulha">
            {/* sombra sobre o tecido */}
            <path
              d="M0 0 -2 -1.3 -15 -1.1 -15 1.1 -2 1.3Z"
              fill={brandColors.mare}
              opacity="0.14"
              transform="translate(1.4 2.2)"
            />
            <path d="M0 0 -2 -1.3 -15 -1.1 -15 1.1 -2 1.3Z" fill="url(#agulha-metal)" />
            <ellipse cx="-11.6" cy="0" rx="1.5" ry="0.6" fill={brandColors.papel} />
          </g>
        </g>
      </svg>

      {/* botão para rever a animação */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-2 flex justify-center">
        <button
          type="button"
          onClick={() => setExecucao((n) => n + 1)}
          className={cn(
            "pointer-events-auto inline-flex items-center gap-2 rounded-full border border-mare/15 bg-linho/90 px-4 py-2",
            "text-xs font-semibold tracking-tight text-mare/80 shadow-[0_10px_26px_-18px_rgb(14_44_66/0.9)] backdrop-blur-sm",
            "transition-[opacity,transform,border-color] duration-500 ease-linha",
            "hover:-translate-y-0.5 hover:border-coral/40 hover:text-mare",
            concluido ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          {replayLabel}
        </button>
      </div>
    </div>
  );
}
