/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  TEXTOS DO SITE                                                 │
 * │  Todo o conteúdo escrito das seções está reunido aqui.          │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Os textos atuais são institucionais e propositalmente genéricos:
 * nenhuma informação sobre história, tempo de mercado, clientes ou
 * números foi inventada. Basta substituir pelas informações reais
 * quando a empresa enviá-las.
 *
 * As listas (serviços, trabalhos, diferenciais, etapas) ficam em /src/data.
 */

export const content = {
  hero: {
    eyebrow: "Bordados personalizados",
    /** O trecho em destaque aparece em itálico, com um pesponto desenhado por baixo. */
    headline: {
      lead: "Detalhes que ganham vida",
      emphasis: "em cada ponto",
    },
    description:
      "Personalização de uniformes, camisetas, bonés e peças sob medida. Da primeira conversa à peça pronta, o bordado é feito com precisão, cuidado e acabamento impecável.",
    highlights: ["Uniformes", "Camisetas", "Bonés", "Peças sob medida"],
    /** Legenda discreta do espaço reservado para a futura foto do Hero. */
    photoCaption: "Espaço reservado para foto dos trabalhos",
    replayLabel: "Bordar novamente",
    scrollLabel: "Role para ver mais",
  },

  services: {
    eyebrow: "Serviços",
    title: "Bordado sob medida para cada tipo de peça.",
    description:
      "Acompanhamos a personalização do começo ao fim: definição do desenho, escolha do acabamento e aplicação na peça certa.",
  },

  portfolio: {
    eyebrow: "Nossos trabalhos",
    title: "Trabalhos que ganham vida em cada ponto.",
    description: "Os tipos de peça que personalizamos com bordado.",
    /** Aviso honesto enquanto as fotos reais não chegam. */
    note: "As fotos dos nossos bordados serão publicadas em breve. Os espaços abaixo já estão reservados para elas.",
    placeholderBadge: "Espaço reservado",
  },

  about: {
    eyebrow: "Sobre",
    title: "Um trabalho feito de detalhes.",
    paragraphs: [
      "A Litoral Bordados trabalha com personalização de peças por bordado. Cada pedido começa por uma conversa: entender a peça, o desenho e o resultado que o cliente espera ver pronto.",
      "O bordado é um processo de precisão. A definição do desenho, a densidade dos pontos, a escolha da linha e o acabamento do avesso fazem a diferença entre uma peça comum e uma peça bem-feita — e é nesse detalhe que a gente trabalha.",
      "Por isso cada peça é tratada de forma individual, do primeiro traço ao último ponto.",
    ],
    photoCaption: "Espaço reservado para foto do ateliê ou da equipe",
  },

  differentials: {
    eyebrow: "Diferenciais",
    title: "O cuidado aparece no acabamento.",
    description:
      "Como cada tipo de ponto tem uma função no bordado, cada detalhe do nosso trabalho tem um motivo.",
  },

  process: {
    eyebrow: "Como funciona",
    title: "Do primeiro contato à peça pronta.",
    description: "Um caminho simples e sem surpresas — uma etapa puxa a outra, como a linha no tecido.",
  },

  finalCta: {
    eyebrow: "Vamos começar",
    title: "Sua ideia merece ganhar vida em cada ponto.",
    description:
      "Conte o que você precisa bordar. Ajudamos a escolher a peça, o desenho e o acabamento ideais para o seu projeto.",
    /** Mostrado no lugar dos contatos enquanto nenhum canal estiver configurado. */
    emptyContactNote:
      "Os canais de atendimento da Litoral Bordados serão divulgados em breve nesta seção.",
  },

  footer: {
    description:
      "Bordados personalizados para marcas, equipes e pessoas que reparam no acabamento.",
    navTitle: "Navegação",
    contactTitle: "Contato",
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
  },
} as const;
