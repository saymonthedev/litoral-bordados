/**
 * Geometria do símbolo da Litoral Bordados — fonte única de verdade.
 *
 * O símbolo é uma onda construída como um bordado de verdade:
 *  - a "orla": uma linha de pesponto (running stitch) que passa por baixo;
 *  - a "onda": uma faixa de ponto cheio (satin stitch) que nasce fina,
 *    ganha corpo na crista e se enrola, terminando fina outra vez.
 *
 * Este arquivo é usado por:
 *  - a animação "Do fio ao bordado" (src/components/hero/EmbroideryHoop.tsx);
 *  - o componente <LogoMark /> (src/components/brand/LogoMark.tsx);
 *  - o script que gera os SVGs de /public/brand (scripts/generate-brand.ts).
 *
 * Todas as coordenadas estão num quadro de 100 x 100.
 * Este módulo não importa nada, para poder rodar tanto no Next.js quanto no Node.
 */

export type Vec = { x: number; y: number };

export type Stitch = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Posição (0–1) do ponto dentro do seu trecho de bordado. */
  at: number;
};

/** Curva de Bézier cúbica: x0 y0, c1x c1y, c2x c2y, x1 y1. */
export type CubicSegment = readonly [number, number, number, number, number, number, number, number];

/** Linha central da onda: nasce à esquerda, sobe até a crista e se enrola. */
export const WAVE_CURVE: readonly CubicSegment[] = [
  [5, 71, 22, 71, 35, 64, 45, 50],
  [45, 50, 53, 38, 57, 25, 70, 23],
  [70, 23, 80, 21.5, 88, 29, 87, 38],
  [87, 38, 86, 46.5, 78, 50, 73, 46],
  [73, 46, 68.5, 42.5, 71, 35.5, 76.5, 36.5],
];

/** Linha da orla: um pesponto suave que atravessa o símbolo. */
export const SHORE_CURVE: readonly CubicSegment[] = [
  [6, 84, 22, 79, 34, 89, 50, 84],
  [50, 84, 66, 79, 78, 89, 94, 84],
];

export const MARK_SETTINGS = {
  /** Largura máxima da faixa de ponto cheio (na crista). */
  waveMaxWidth: 13,
  /** Largura nas pontas. */
  waveMinWidth: 1.2,
  /** Distância entre os pontos cheios, medida ao longo da onda. */
  satinSpacing: 1.3,
  /** Inclinação dos pontos cheios em relação à perpendicular (radianos). */
  satinSlant: -0.5,
  /** Comprimento de cada ponto do pesponto e do espaço entre eles. */
  shoreStitch: 4.6,
  shoreGap: 2.9,
} as const;

/* ------------------------------------------------------------------ */
/* Matemática de curvas                                                */
/* ------------------------------------------------------------------ */

function cubicAt(s: CubicSegment, t: number): Vec {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  return {
    x: a * s[0] + b * s[2] + c * s[4] + d * s[6],
    y: a * s[1] + b * s[3] + c * s[5] + d * s[7],
  };
}

export type SampledCurve = {
  points: Vec[];
  /** Comprimento acumulado até cada ponto. */
  lengths: number[];
  total: number;
};

export function sampleCurve(curve: readonly CubicSegment[], perSegment = 160): SampledCurve {
  const points: Vec[] = [];
  const lengths: number[] = [];
  let total = 0;
  curve.forEach((seg, i) => {
    for (let k = i === 0 ? 0 : 1; k <= perSegment; k++) {
      const p = cubicAt(seg, k / perSegment);
      if (points.length) {
        const prev = points[points.length - 1];
        total += Math.hypot(p.x - prev.x, p.y - prev.y);
      }
      points.push(p);
      lengths.push(total);
    }
  });
  return { points, lengths, total };
}

/** Ponto e ângulo da tangente a uma distância `d` do início da curva. */
export function pointAtLength(c: SampledCurve, d: number): Vec & { angle: number } {
  const dist = Math.min(Math.max(d, 0), c.total);
  let lo = 0;
  let hi = c.lengths.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (c.lengths[mid] < dist) lo = mid;
    else hi = mid;
  }
  const a = c.points[lo];
  const b = c.points[hi];
  const span = c.lengths[hi] - c.lengths[lo] || 1;
  const t = (dist - c.lengths[lo]) / span;
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    angle: Math.atan2(b.y - a.y, b.x - a.x),
  };
}

export function curveToPath(curve: readonly CubicSegment[], transform?: (p: Vec) => Vec): string {
  const tf = transform ?? ((p: Vec) => p);
  const f = (n: number) => +n.toFixed(2);
  const pt = (x: number, y: number) => {
    const p = tf({ x, y });
    return `${f(p.x)} ${f(p.y)}`;
  };
  return curve
    .map((s, i) => `${i === 0 ? `M${pt(s[0], s[1])}` : ""}C${pt(s[2], s[3])} ${pt(s[4], s[5])} ${pt(s[6], s[7])}`)
    .join("");
}

const smoothstep = (a: number, b: number, t: number) => {
  const x = Math.min(Math.max((t - a) / (b - a), 0), 1);
  return x * x * (3 - 2 * x);
};

/** Largura da faixa de ponto cheio ao longo da onda (t = 0…1). */
export function waveWidthAt(t: number): number {
  const { waveMaxWidth: max, waveMinWidth: min } = MARK_SETTINGS;
  const rise = smoothstep(0, 0.4, t);
  const fall = 1 - 0.92 * smoothstep(0.5, 1, t);
  return min + (max - min) * rise * fall;
}

const round = (n: number) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------ */
/* Pontos do bordado                                                   */
/* ------------------------------------------------------------------ */

export const waveSampled = sampleCurve(WAVE_CURVE);
export const shoreSampled = sampleCurve(SHORE_CURVE);

/** Pontos cheios que formam a onda, na ordem em que são bordados. */
export function buildSatinStitches(spacing: number = MARK_SETTINGS.satinSpacing): Stitch[] {
  const c = waveSampled;
  const count = Math.round(c.total / spacing);
  const stitches: Stitch[] = [];
  for (let i = 0; i < count; i++) {
    const d = ((i + 0.5) / count) * c.total;
    const t = d / c.total;
    const p = pointAtLength(c, d);
    const half = waveWidthAt(t) / 2;
    const dir = p.angle + Math.PI / 2 + MARK_SETTINGS.satinSlant;
    // Estica o ponto inclinado para que ele cubra toda a largura da faixa.
    const reach = half / Math.cos(MARK_SETTINGS.satinSlant);
    const dx = Math.cos(dir) * reach;
    const dy = Math.sin(dir) * reach;
    // O ponto cheio vai e volta, como a linha de verdade.
    const flip = i % 2 === 1;
    stitches.push({
      x1: round(flip ? p.x + dx : p.x - dx),
      y1: round(flip ? p.y + dy : p.y - dy),
      x2: round(flip ? p.x - dx : p.x + dx),
      y2: round(flip ? p.y - dy : p.y + dy),
      at: round(t * 1000) / 1000,
    });
  }
  return stitches;
}

/** Pontos do pesponto da orla, da esquerda para a direita. */
export function buildShoreStitches(): Stitch[] {
  const c = shoreSampled;
  const { shoreStitch, shoreGap } = MARK_SETTINGS;
  const period = shoreStitch + shoreGap;
  const count = Math.floor((c.total + shoreGap) / period);
  const offset = (c.total - (count * period - shoreGap)) / 2;
  const stitches: Stitch[] = [];
  for (let i = 0; i < count; i++) {
    const start = offset + i * period;
    const a = pointAtLength(c, start);
    const b = pointAtLength(c, start + shoreStitch);
    stitches.push({
      x1: round(a.x),
      y1: round(a.y),
      x2: round(b.x),
      y2: round(b.y),
      at: round(((start + shoreStitch / 2) / c.total) * 1000) / 1000,
    });
  }
  return stitches;
}

/** Contorno sólido da onda — usado nas versões pequenas (favicon). */
export function buildWaveOutline(steps = 180): string {
  const c = waveSampled;
  const left: Vec[] = [];
  const right: Vec[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = pointAtLength(c, t * c.total);
    const half = waveWidthAt(t) / 2;
    const nx = Math.cos(p.angle + Math.PI / 2) * half;
    const ny = Math.sin(p.angle + Math.PI / 2) * half;
    left.push({ x: p.x + nx, y: p.y + ny });
    right.push({ x: p.x - nx, y: p.y - ny });
  }
  const pts = [...left, ...right.reverse()];
  return `M${pts.map((p) => `${round(p.x)} ${round(p.y)}`).join("L")}Z`;
}

export const satinStitches = buildSatinStitches();
export const shoreStitches = buildShoreStitches();

/** Área efetivamente ocupada pelo desenho dentro do quadro 100 x 100. */
export const MARK_BOUNDS = { x: 3, y: 15, width: 94, height: 73 } as const;

export const stitchPath = (s: Stitch) => `M${s.x1} ${s.y1}L${s.x2} ${s.y2}`;
