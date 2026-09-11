/**
 * Seção "Nossos trabalhos".
 *
 * ┌── COMO COLOCAR AS FOTOS REAIS ──────────────────────────────────┐
 * │ 1. Copie as fotos para /public/portfolio/                       │
 * │    (ex.: /public/portfolio/uniforme-01.jpg)                     │
 * │ 2. Troque o campo `image` pelo caminho do arquivo:              │
 * │    image: "/portfolio/uniforme-01.jpg"                          │
 * │ 3. Apague a linha `placeholder: true` do item.                  │
 * │ 4. Escreva um `alt` que descreva a foto (acessibilidade e SEO). │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Enquanto `placeholder: true` estiver presente, o site mostra o espaço
 * reservado com a etiqueta "Espaço reservado", deixando claro que ainda
 * não é uma foto de um trabalho realizado.
 *
 * Formato ideal das fotos: retrato (3:4) ou quadrado, a partir de 1200px
 * de largura. O Next.js cuida da otimização automaticamente.
 */

export type PortfolioItem = {
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  placeholder?: boolean;
};

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Uniforme corporativo",
    category: "Uniformes",
    description: "Logotipo bordado em peças de uniforme, com padrão repetido em toda a equipe.",
    image: "/portfolio/espaco-01.svg",
    alt: "Espaço reservado para foto de uniforme bordado",
    placeholder: true,
  },
  {
    title: "Camiseta personalizada",
    category: "Camisetas",
    description: "Bordado aplicado em camisetas, com escolha de posição, tamanho e cor da linha.",
    image: "/portfolio/espaco-02.svg",
    alt: "Espaço reservado para foto de camiseta bordada",
    placeholder: true,
  },
  {
    title: "Boné com logotipo",
    category: "Bonés",
    description: "Bordado frontal em bonés, trabalhado para acompanhar a curva da peça.",
    image: "/portfolio/espaco-03.svg",
    alt: "Espaço reservado para foto de boné bordado",
    placeholder: true,
  },
  {
    title: "Jaleco e vestuário profissional",
    category: "Vestuário profissional",
    description: "Nome, função e logotipo bordados em peças de trabalho.",
    image: "/portfolio/espaco-04.svg",
    alt: "Espaço reservado para foto de jaleco bordado",
    placeholder: true,
  },
  {
    title: "Peças sob medida",
    category: "Personalizados",
    description: "Iniciais, nomes e desenhos exclusivos aplicados em peças escolhidas pelo cliente.",
    image: "/portfolio/espaco-05.svg",
    alt: "Espaço reservado para foto de peça personalizada bordada",
    placeholder: true,
  },
  {
    title: "Identidade de marca",
    category: "Empresas",
    description: "Aplicação da marca em diferentes peças, mantendo proporção e leitura do desenho.",
    image: "/portfolio/espaco-06.svg",
    alt: "Espaço reservado para foto de aplicação de marca bordada",
    placeholder: true,
  },
];
