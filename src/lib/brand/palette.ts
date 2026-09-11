/**
 * Cores da marca Litoral Bordados.
 *
 * Estas são as mesmas cores declaradas em src/app/globals.css (bloco @theme).
 * Aqui elas existem em TypeScript porque os SVGs da marca e alguns desenhos
 * são gerados por código. Se mudar uma cor, mude nos dois lugares.
 */

export const brandColors = {
  /** Azul profundo — cor principal ("maré"). */
  mare: "#0E2C42",
  /** Variação usada para dar brilho de linha no ponto cheio. */
  mareMedio: "#1D4A69",
  mareClaro: "#2A6183",
  /** Off-white de linho — fundo do site. */
  linho: "#F5EFE4",
  /** Papel: um tom mais claro que o linho. */
  papel: "#FBF8F3",
  /** Areia — fundos alternados e bordas. */
  areia: "#E8DCC8",
  areiaEscura: "#D8C7AA",
  /** Coral — o tom artesanal da linha de bordado. */
  coral: "#C8583A",
  coralClaro: "#E07A55",
} as const;

export type BrandColor = keyof typeof brandColors;
