/**
 * Seção "Diferenciais".
 *
 * Cada diferencial é apresentado ao lado de uma amostra de um ponto de
 * bordado real — como um mostruário de pontos. O campo `stitch` escolhe
 * qual amostra é desenhada (ver src/components/ui/StitchSample.tsx):
 * "knot" (nó francês), "chain" (corrente), "satin" (cheio),
 * "cross" (cruz), "back" (atrás) e "stem" (haste).
 *
 * Os textos são editáveis livremente. Nenhum número, prêmio ou dado de
 * mercado é apresentado aqui — apenas a forma de trabalho.
 */

export type Differential = {
  title: string;
  description: string;
  stitch: "knot" | "chain" | "satin" | "cross" | "back" | "stem";
  stitchLabel: string;
};

export const differentials: Differential[] = [
  {
    title: "Atenção aos detalhes",
    description: "Cada pedido é conferido ponto a ponto, do alinhamento do desenho ao arremate.",
    stitch: "knot",
    stitchLabel: "Nó francês",
  },
  {
    title: "Personalização",
    description: "O desenho é adaptado à peça, ao tecido e ao uso que ela vai ter.",
    stitch: "chain",
    stitchLabel: "Ponto corrente",
  },
  {
    title: "Qualidade no acabamento",
    description: "Densidade, tensão da linha e avesso limpo: o acabamento é parte do bordado.",
    stitch: "satin",
    stitchLabel: "Ponto cheio",
  },
  {
    title: "Precisão",
    description: "Posição, proporção e repetição iguais em todas as peças do mesmo pedido.",
    stitch: "cross",
    stitchLabel: "Ponto cruz",
  },
  {
    title: "Atendimento próximo",
    description: "Conversa direta do orçamento à entrega, sem etapas confusas pelo caminho.",
    stitch: "back",
    stitchLabel: "Ponto atrás",
  },
  {
    title: "Cuidado em cada etapa",
    description: "Da escolha da linha à embalagem, cada passo recebe a mesma atenção.",
    stitch: "stem",
    stitchLabel: "Ponto haste",
  },
];
