/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  CONFIGURAÇÃO CENTRAL DA LITORAL BORDADOS                       │
 * │  Este é o único arquivo que precisa ser editado para trocar     │
 * │  nome, contatos, redes sociais e endereço do site.              │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Campos vazios ("") são tratados como "ainda não informado":
 * o site simplesmente esconde o elemento correspondente — nenhum
 * link quebrado é gerado.
 *
 * Projeto conceitual: a empresa e o endereço são fictícios. O WhatsApp é o do
 * desenvolvedor (Saymon), com uma mensagem que deixa claro que a conversa é
 * sobre o projeto — assim nenhum visitante cai no número de um desconhecido.
 * Telefone, e-mail e Instagram ficam vazios de propósito: um perfil ou e-mail
 * inventado poderia pertencer a outra pessoa.
 */

export const siteConfig = {
  /** Nome completo da empresa. Aparece no cabeçalho, rodapé e SEO. */
  name: "Litoral Bordados",
  /** Primeira palavra em destaque no logotipo. */
  shortName: "Litoral",
  /** Frase-conceito da marca (usada no rodapé e no Sobre). */
  tagline: "A precisão do bordado com a fluidez do litoral.",
  /** Descrição usada nas meta tags (SEO) e no rodapé. */
  description:
    "Bordados personalizados para uniformes, camisetas, bonés e peças sob medida. Personalização feita com precisão, cuidado e acabamento em cada ponto.",

  /* ----------------------------------------------------------------
   * CONTATO — preencha quando a empresa informar.
   * ---------------------------------------------------------------- */

  /**
   * WhatsApp: apenas números, com DDI (55) e DDD.
   * Exemplo do formato: "55" + DDD + número → "55DDNNNNNNNNN".
   * Enquanto estiver vazio, o botão de orçamento leva para a seção
   * de contato em vez de gerar um link quebrado.
   */
  whatsapp: "5547999171788",
  /** Mensagem que já vai escrita na conversa do WhatsApp. */
  whatsappMessage:
    "Olá, Saymon! Vi o projeto conceitual da Litoral Bordados e quero conversar sobre um site para a minha empresa.",

  /** Telefone para exibição livre, ex.: "(00) 0000-0000". */
  phone: "",
  /** E-mail de contato, ex.: "contato@litoralbordados.com.br". */
  email: "",
  /** Instagram: pode ser "@perfil", "perfil" ou a URL completa. */
  instagram: "",
  /** Endereço completo em uma linha, ex.: "Rua Exemplo, 000 — Bairro, Cidade/UF". */
  address: "Rua da Maré, 140 — Litoral de Santa Catarina",
  /** Horário de atendimento, ex.: "Segunda a sexta, 8h às 18h". */
  openingHours: "Segunda a sexta, das 8h às 18h",

  /* ----------------------------------------------------------------
   * MARCA — arquivos em /public/brand
   * ---------------------------------------------------------------- */

  /** Logotipo para fundos claros. */
  logo: "/brand/logo.svg",
  /** Logotipo para fundos escuros (rodapé). */
  logoLight: "/brand/logo-light.svg",
  /** Somente o símbolo. */
  logoMark: "/brand/logo-mark.svg",
  /** Favicon do site (veja também src/app/icon.svg). */
  favicon: "/brand/favicon.svg",

  /* ----------------------------------------------------------------
   * SITE
   * ---------------------------------------------------------------- */

  /**
   * Endereço final do site, usado no SEO (canonical, Open Graph, sitemap).
   * Sempre sem a barra no fim.
   */
  url: "https://litoralbordados.com",
  locale: "pt-BR",
} as const;

/** Itens do menu de navegação (cabeçalho e rodapé). */
export const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;

/** Textos dos botões usados em todo o site. */
export const ctaLabels = {
  primary: "Solicitar orçamento",
  secondary: "Conhecer nossos trabalhos",
  whatsapp: "Falar no WhatsApp",
} as const;

export type SiteConfig = typeof siteConfig;
