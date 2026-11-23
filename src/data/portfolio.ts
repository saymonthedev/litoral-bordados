/**
 * Seção "Nossos trabalhos".
 *
 * Projeto conceitual de portfólio: a Litoral Bordados é uma empresa fictícia,
 * e as marcas bordadas abaixo também. As imagens das peças foram geradas em
 * código (scripts/fotos-ficticias/gerar-bordados.html): tecido, pontos,
 * relevo e luz desenhados em Canvas, sem foto de trabalho de ninguém.
 *
 * Para usar fotos reais: copie para /public/portfolio/, troque `image` e
 * escreva um `alt` que descreva a foto. `placeholder: true` volta a mostrar
 * a etiqueta "Espaço reservado" no lugar de uma foto que ainda não existe.
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
    image: "/portfolio/trabalho-uniforme.webp",
    alt: "Logotipo da marca fictícia Maré Alta Pescados bordado em branco e coral numa polo piquê azul-marinho",
  },
  {
    title: "Camiseta personalizada",
    category: "Camisetas",
    description: "Bordado aplicado em camisetas, com escolha de posição, tamanho e cor da linha.",
    image: "/portfolio/trabalho-camiseta.webp",
    alt: "Emblema fictício Praia Brava, com sol e ondas, bordado numa camiseta cinza mescla",
  },
  {
    title: "Boné com logotipo",
    category: "Bonés",
    description: "Bordado frontal em bonés, trabalhado para acompanhar a curva da peça.",
    image: "/portfolio/trabalho-bone.webp",
    alt: "Marca fictícia Restinga Café bordada em relevo na frente de um boné cáqui",
  },
  {
    title: "Jaleco e vestuário profissional",
    category: "Vestuário profissional",
    description: "Nome, função e logotipo bordados em peças de trabalho.",
    image: "/portfolio/trabalho-jaleco.webp",
    alt: "Nome fictício Dra. Helena Prado e a palavra Odontologia bordados acima do bolso de um jaleco branco",
  },
  {
    title: "Peças sob medida",
    category: "Personalizados",
    description: "Iniciais, nomes e desenhos exclusivos aplicados em peças escolhidas pelo cliente.",
    image: "/portfolio/trabalho-toalha.webp",
    alt: "Monograma A & L bordado em verde e coral numa toalha de felpo creme com barra tecida",
  },
  {
    title: "Identidade de marca",
    category: "Empresas",
    description: "Aplicação da marca em diferentes peças, mantendo proporção e leitura do desenho.",
    image: "/portfolio/trabalho-identidade.webp",
    alt: "Patch redondo da marca fictícia Farol Norte, com farol listrado, bordado sobre jeans",
  },
];
