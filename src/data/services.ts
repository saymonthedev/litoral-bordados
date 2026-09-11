/**
 * Serviços exibidos na seção "Serviços".
 *
 * Para editar: mude título e descrição à vontade. Para trocar o ícone,
 * use uma das chaves disponíveis em src/components/ui/StitchIcon.tsx
 * ("bordado", "uniforme", "camiseta", "bone", "identidade", "medida").
 * Para adicionar ou remover um serviço, basta acrescentar ou apagar um
 * item desta lista — o layout se ajusta sozinho.
 */

import type { StitchIconName } from "@/components/ui/StitchIcon";

export type Service = {
  title: string;
  description: string;
  icon: StitchIconName;
};

export const services: Service[] = [
  {
    title: "Bordados personalizados",
    description:
      "Personalização de peças com bordados desenvolvidos de acordo com cada projeto, do desenho ao acabamento final.",
    icon: "bordado",
  },
  {
    title: "Uniformes personalizados",
    description:
      "Bordados para uniformes empresariais e profissionais, aplicados com padrão uniforme em toda a equipe.",
    icon: "uniforme",
  },
  {
    title: "Camisetas e peças personalizadas",
    description:
      "Personalização de diferentes tipos de peças, respeitando o tecido, o caimento e o uso de cada uma.",
    icon: "camiseta",
  },
  {
    title: "Bonés e acessórios",
    description:
      "Aplicação de bordados em bonés e outros acessórios, com atenção ao posicionamento e ao relevo do ponto.",
    icon: "bone",
  },
  {
    title: "Identidade para empresas",
    description:
      "Bordados personalizados para fortalecer a identidade visual de marcas e equipes em cada peça.",
    icon: "identidade",
  },
  {
    title: "Personalização de peças",
    description:
      "Soluções personalizadas para diferentes necessidades, incluindo nomes, iniciais e pedidos sob medida.",
    icon: "medida",
  },
];
