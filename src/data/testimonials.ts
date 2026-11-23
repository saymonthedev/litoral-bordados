/**
 * Depoimentos.
 *
 * Projeto conceitual: os depoimentos abaixo são FICTÍCIOS, assim como as
 * empresas citadas, e a seção avisa isso na própria página. Num site real,
 * troque por depoimentos de verdade, exatamente como o cliente escreveu. Com
 * a lista vazia, a seção não aparece.
 */

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Pedimos as polos da equipe inteira e o logotipo saiu igual em todas, da primeira à última peça.",
    author: "Júlia Ramos",
    role: "Maré Alta Pescados",
  },
  {
    quote: "Os bonés saíram com o bordado em relevo, do jeito que a gente imaginou. Viraram o item mais pedido no balcão.",
    author: "Caio Brandt",
    role: "Restinga Café",
  },
  {
    quote: "Levei o desenho do patch num rascunho de papel e recebi a prova antes de bordar. Atendimento direto, sem enrolação.",
    author: "Marina Kuhn",
    role: "Farol Norte",
  },
];
