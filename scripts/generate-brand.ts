/**
 * Gera os arquivos da identidade visual e os espaços reservados de imagem.
 *
 *   npm run brand
 *
 * Saída:
 *   /public/brand/…       logotipos e favicon
 *   /src/app/icon.svg     favicon que o Next.js reconhece sozinho
 *   /public/portfolio/…   6 espaços reservados para as fotos dos trabalhos
 *   /public/images/…      espaços reservados do Hero e da seção Sobre
 *
 * Tudo é desenhado a partir de src/lib/brand/mark.ts (a geometria do
 * símbolo) e src/lib/brand/wordmark.ts (o logotipo em curvas).
 *
 * Rodar este script só é necessário se você mudar a geometria da marca.
 * Para usar a logo oficial da empresa, basta substituir os arquivos de
 * /public/brand — veja o README.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { MARK_BOUNDS, satinStitches, shoreStitches, stitchPath, buildWaveOutline } from "../src/lib/brand/mark.ts";
import { LITORAL, BORDADOS, type WordmarkRun } from "../src/lib/brand/wordmark.ts";
import { brandColors as c } from "../src/lib/brand/palette.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const B = MARK_BOUNDS;
const n = (v: number) => +v.toFixed(2);

function write(relativePath: string, content: string) {
  const target = join(root, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content.replace(/\n\s*\n/g, "\n"), "utf8");
  console.log("✔", relativePath);
}

/* ------------------------------------------------------------------ */
/* Peças do desenho                                                    */
/* ------------------------------------------------------------------ */

type MarkColors = { fio: string; fioBrilho: string; linha: string };

const CLARO: MarkColors = { fio: c.mare, fioBrilho: c.mareMedio, linha: c.coral };
const ESCURO: MarkColors = { fio: c.linho, fioBrilho: "#DFD3BF", linha: c.coralClaro };

/** O símbolo bordado ponto a ponto, escalado para a altura pedida. */
function markGroup(colors: MarkColors, height: number, solid = false) {
  const k = height / B.height;
  const satin = solid
    ? `<path d="${buildWaveOutline()}" fill="${colors.fio}"/>`
    : satinStitches
        .map((s, i) => `<path d="${stitchPath(s)}" stroke="${i % 2 ? colors.fioBrilho : colors.fio}"/>`)
        .join("");
  const shore = shoreStitches.map((s) => `<path d="${stitchPath(s)}"/>`).join("");
  return `<g transform="scale(${n(k)}) translate(${-B.x} ${-B.y})">
    <g fill="none" stroke-linecap="round" stroke-width="1.5">${satin}</g>
    <g fill="none" stroke="${colors.linha}" stroke-linecap="round" stroke-width="2.1">${shore}</g>
  </g>`;
}

/** Uma palavra do logotipo, já em curvas. */
function word(run: WordmarkRun, size: number, fill: string) {
  const k = size / 100;
  return `<g fill="${fill}" transform="scale(${n(k)}) translate(${-run.bbox.x} 0)">${run.glyphs
    .map((g) => `<path d="${g.d}"/>`)
    .join("")}</g>`;
}

const svg = (width: number, height: number, title: string, body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${n(width)}" height="${n(height)}" viewBox="0 0 ${n(width)} ${n(height)}" fill="none" role="img" aria-label="${title}">
  <title>${title}</title>
  ${body}
</svg>
`;

/* ------------------------------------------------------------------ */
/* Logotipo horizontal: símbolo + Litoral / BORDADOS                   */
/* ------------------------------------------------------------------ */

function lockupHorizontal(colors: MarkColors, textColor: string, markH = 72) {
  const markW = (B.width / B.height) * markH;
  const gap = markH * 0.3;
  const litSize = markH * 0.86;
  const litW = (LITORAL.bbox.width / 100) * litSize;
  const litCap = (LITORAL.capHeight / 100) * litSize;
  const subSize = markH * 0.21;
  const subW = (BORDADOS.bbox.width / 100) * subSize;
  const subCap = (BORDADOS.capHeight / 100) * subSize;
  const subGap = markH * 0.17;
  const top = (markH - (litCap + subGap + subCap)) / 2;
  const textX = markW + gap;

  // Pesponto que completa a largura, do fim de "BORDADOS" até a direita de "Litoral"
  const dashes: string[] = [];
  for (let x = subW + subSize * 0.55; x < litW - 1; x += subSize * 0.62) {
    dashes.push(`<path d="M${n(x)} 0h${n(subSize * 0.34)}"/>`);
  }

  const body = `${markGroup(colors, markH)}
  <g transform="translate(${n(textX)} ${n(top + litCap)})">${word(LITORAL, litSize, textColor)}</g>
  <g transform="translate(${n(textX)} ${n(top + litCap + subGap + subCap)})">${word(BORDADOS, subSize, textColor)}</g>
  <g transform="translate(${n(textX)} ${n(top + litCap + subGap + subCap / 2)})" stroke="${colors.linha}" stroke-width="${n(subSize * 0.14)}" stroke-linecap="round">${dashes.join("")}</g>`;

  return svg(textX + Math.max(litW, subW), markH, "Litoral Bordados", body);
}

/* ------------------------------------------------------------------ */
/* Logotipo vertical (avatar de redes sociais, etiquetas)              */
/* ------------------------------------------------------------------ */

function lockupVertical(colors: MarkColors, textColor: string, markH = 86) {
  const markW = (B.width / B.height) * markH;
  const litSize = markH * 0.7;
  const litW = (LITORAL.bbox.width / 100) * litSize;
  const litCap = (LITORAL.capHeight / 100) * litSize;
  const subSize = markH * 0.17;
  const subW = (BORDADOS.bbox.width / 100) * subSize;
  const subCap = (BORDADOS.capHeight / 100) * subSize;
  const width = Math.max(markW, litW);
  const gapA = markH * 0.22;
  const gapB = markH * 0.16;

  const body = `<g transform="translate(${n((width - markW) / 2)} 0)">${markGroup(colors, markH)}</g>
  <g transform="translate(${n((width - litW) / 2)} ${n(markH + gapA + litCap)})">${word(LITORAL, litSize, textColor)}</g>
  <g transform="translate(${n((width - subW) / 2)} ${n(markH + gapA + litCap + gapB + subCap)})">${word(BORDADOS, subSize, textColor)}</g>`;

  return svg(width, markH + gapA + litCap + gapB + subCap, "Litoral Bordados", body);
}

/* ------------------------------------------------------------------ */
/* Favicon — versão sólida, legível a 16 px                            */
/* ------------------------------------------------------------------ */

function favicon() {
  const size = 64;
  const markH = 34;
  const markW = (B.width / B.height) * markH;
  const body = `<rect width="${size}" height="${size}" rx="15" fill="${c.mare}"/>
  <g transform="translate(${n((size - markW) / 2)} ${n((size - markH) / 2 + 1)})">
    <g transform="scale(${n(markH / B.height)}) translate(${-B.x} ${-B.y})">
      <path d="${buildWaveOutline()}" fill="${c.linho}"/>
      <path d="M8 84h84" stroke="${c.coralClaro}" stroke-width="5" stroke-linecap="round"/>
    </g>
  </g>`;
  return svg(size, size, "Litoral Bordados", body);
}

/* ------------------------------------------------------------------ */
/* Espaços reservados para as fotos                                    */
/* ------------------------------------------------------------------ */

type Swatch = { fundo: string; traco: string; destaque: string };

const swatches: Swatch[] = [
  { fundo: "#EDE3D1", traco: "#0E2C42", destaque: "#C8583A" },
  { fundo: "#DCD2BD", traco: "#17415E", destaque: "#B04A2E" },
  { fundo: "#0E2C42", traco: "#F5EFE4", destaque: "#E07A55" },
  { fundo: "#E5D5B8", traco: "#0E2C42", destaque: "#A8452C" },
  { fundo: "#F3EDE1", traco: "#2A6183", destaque: "#C8583A" },
  { fundo: "#CFC3AC", traco: "#0E2C42", destaque: "#B04A2E" },
];

/** Desenhos abstratos de pontos de bordado — um para cada espaço. */
function motif(index: number, s: Swatch, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const traco = `stroke="${s.traco}" stroke-opacity="0.5" fill="none" stroke-linecap="round"`;
  const destaque = `stroke="${s.destaque}" fill="none" stroke-linecap="round"`;

  switch (index % 6) {
    // Arcos concêntricos — o bastidor e as marolas
    case 0:
      return `<g ${traco} stroke-width="3">
        ${[0, 1, 2, 3, 4]
          .map(
            (i) =>
              `<circle cx="${cx}" cy="${cy}" r="${70 + i * 52}" stroke-dasharray="${16 + i * 2} ${11 + i}" stroke-opacity="${0.42 - i * 0.06}"/>`,
          )
          .join("")}
      </g>
      <g ${destaque} stroke-width="6" stroke-dasharray="22 14"><circle cx="${cx}" cy="${cy}" r="34"/></g>`;
    // Faixas diagonais de ponto cheio
    case 1:
      return `<g ${traco} stroke-width="7">
        ${Array.from({ length: 26 }, (_, i) => {
          const x = w * 0.18 + i * 18;
          return `<path d="M${n(x)} ${n(cy - 150 + Math.sin(i / 3) * 26)}l-56 ${n(190 + Math.cos(i / 4) * 30)}" stroke-opacity="${0.14 + Math.sin(i / 5) * 0.12 + 0.2}"/>`;
        }).join("")}
      </g>
      <g ${destaque} stroke-width="6" stroke-dasharray="20 13"><path d="M${n(w * 0.12)} ${n(h * 0.78)}h${n(w * 0.76)}"/></g>`;
    // Grade de ponto cruz
    case 2:
      return `<g ${traco} stroke-width="4">
        ${Array.from({ length: 7 }, (_, r) =>
          Array.from({ length: 5 }, (_, k) => {
            const x = w * 0.2 + k * (w * 0.15);
            const y = h * 0.18 + r * (h * 0.11);
            const o = 0.5 - r * 0.05;
            return `<path d="M${n(x - 13)} ${n(y - 13)}l26 26M${n(x + 13)} ${n(y - 13)}l-26 26" stroke-opacity="${n(Math.max(o, 0.12))}"/>`;
          }).join(""),
        ).join("")}
      </g>
      <g ${destaque} stroke-width="5" stroke-dasharray="18 12"><path d="M${n(w * 0.2)} ${n(h * 0.86)}h${n(w * 0.6)}"/></g>`;
    // Ondas de pesponto
    case 3:
      return `<g ${traco} stroke-width="5">
        ${Array.from({ length: 9 }, (_, i) => {
          const y = h * 0.2 + i * (h * 0.075);
          return `<path d="M${n(w * 0.1)} ${n(y)}q${n(w * 0.2)} ${-40 - i * 2} ${n(w * 0.4)} 0t${n(w * 0.4)} 0" stroke-dasharray="${19 + i} ${12}" stroke-opacity="${n(0.45 - i * 0.035)}"/>`;
        }).join("")}
      </g>
      <g ${destaque} stroke-width="6" stroke-dasharray="24 15"><path d="M${n(w * 0.1)} ${n(h * 0.86)}q${n(w * 0.2)} -38 ${n(w * 0.4)} 0t${n(w * 0.4)} 0"/></g>`;
    // Linhas verticais com nós
    case 4:
      return `<g ${traco} stroke-width="4">
        ${Array.from({ length: 11 }, (_, i) => {
          const x = w * 0.12 + i * (w * 0.076);
          return `<path d="M${n(x)} ${n(h * 0.16)}v${n(h * 0.62)}" stroke-dasharray="${14 + (i % 4) * 6} ${10}" stroke-opacity="${n(0.45 - (i % 5) * 0.05)}"/>`;
        }).join("")}
      </g>
      <g fill="${s.destaque}" fill-opacity="0.85">
        ${Array.from({ length: 6 }, (_, i) => `<circle cx="${n(w * 0.18 + i * (w * 0.13))}" cy="${n(h * 0.84)}" r="7"/>`).join("")}
      </g>`;
    // Espiral de pontos
    default: {
      const pts: string[] = [];
      for (let i = 0; i < 150; i++) {
        const a = i * 0.38;
        const r = 18 + i * 2.6;
        if (r > Math.min(w, h) * 0.42) break;
        pts.push(`${n(cx + Math.cos(a) * r)} ${n(cy + Math.sin(a) * r)}`);
      }
      return `<g ${traco} stroke-width="6" stroke-dasharray="17 13"><path d="M${pts.join("L")}"/></g>
      <g ${destaque} stroke-width="6" stroke-dasharray="20 14"><path d="M${n(w * 0.14)} ${n(h * 0.88)}h${n(w * 0.72)}"/></g>`;
    }
  }
}

/** Um espaço reservado: tecido + trama + moldura pespontada + desenho. */
function placeholder(index: number, w: number, h: number, title: string) {
  const s = swatches[index % swatches.length];
  const id = `trama-${index}`;
  const escuro = s.fundo === "#0E2C42";
  const tramaCor = escuro ? "#F5EFE4" : "#0E2C42";
  const body = `<defs>
    <pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse">
      <path d="M0 0h6M0 3h6" stroke="${tramaCor}" stroke-opacity="0.05" stroke-width="1.2"/>
      <path d="M0 0v6M3 0v6" stroke="${tramaCor}" stroke-opacity="0.04" stroke-width="1.2"/>
    </pattern>
    <radialGradient id="luz-${index}" cx="32%" cy="24%" r="88%">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="${escuro ? 0.13 : 0.3}"/>
      <stop offset="1" stop-color="${escuro ? "#000000" : "#8A6A3F"}" stop-opacity="${escuro ? 0.2 : 0.12}"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${s.fundo}"/>
  <rect width="${w}" height="${h}" fill="url(#${id})"/>
  <rect width="${w}" height="${h}" fill="url(#luz-${index})"/>
  ${motif(index, s, w, h)}
  <rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="6" stroke="${s.traco}" stroke-opacity="0.35" stroke-width="2.5" stroke-dasharray="14 10" fill="none"/>`;
  return svg(w, h, title, body);
}

/* ------------------------------------------------------------------ */
/* Geração                                                             */
/* ------------------------------------------------------------------ */

write("public/brand/logo.svg", lockupHorizontal(CLARO, c.mare));
write("public/brand/logo-light.svg", lockupHorizontal(ESCURO, c.linho));
write("public/brand/logo-vertical.svg", lockupVertical(CLARO, c.mare));
write("public/brand/logo-mark.svg", svg((B.width / B.height) * 96, 96, "Símbolo Litoral Bordados", markGroup(CLARO, 96)));
write(
  "public/brand/logo-mark-light.svg",
  svg((B.width / B.height) * 96, 96, "Símbolo Litoral Bordados", markGroup(ESCURO, 96)),
);
write("public/brand/favicon.svg", favicon());
write("src/app/icon.svg", favicon());

const portfolioTitles = [
  "Espaço reservado para foto de uniforme bordado",
  "Espaço reservado para foto de camiseta bordada",
  "Espaço reservado para foto de boné bordado",
  "Espaço reservado para foto de jaleco bordado",
  "Espaço reservado para foto de peça personalizada",
  "Espaço reservado para foto de aplicação de marca",
];
portfolioTitles.forEach((title, i) => {
  write(`public/portfolio/espaco-0${i + 1}.svg`, placeholder(i, 900, 1200, title));
});

write("public/images/hero-placeholder.svg", placeholder(3, 1000, 1250, "Espaço reservado para foto dos trabalhos"));
write("public/images/sobre-placeholder.svg", placeholder(1, 1100, 1000, "Espaço reservado para foto do ateliê"));

console.log("\nIdentidade gerada com sucesso.");
