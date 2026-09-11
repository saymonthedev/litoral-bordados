/**
 * Seção "Como funciona" — as etapas do atendimento.
 *
 * A numeração é gerada automaticamente pela ordem da lista.
 * Para mudar o processo, edite, acrescente ou remova etapas aqui.
 */

export type ProcessStep = {
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Entre em contato",
    description: "Conte o que você precisa: tipo de peça, quantidade e prazo desejado.",
  },
  {
    title: "Envie sua ideia",
    description: "Mande a referência, o logotipo ou as informações que devem ser bordadas.",
  },
  {
    title: "Definimos os detalhes",
    description: "Alinhamos desenho, posição, cores da linha e acabamento da peça.",
  },
  {
    title: "Produção",
    description: "O bordado é produzido com atenção ao ponto, à tensão da linha e ao arremate.",
  },
  {
    title: "Entrega",
    description: "A peça é conferida, embalada e fica pronta para você.",
  },
];
