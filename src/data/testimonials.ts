/**
 * Depoimentos de clientes.
 *
 * A lista está VAZIA de propósito: nenhum depoimento foi inventado.
 * Enquanto ela estiver vazia, a seção inteira não é renderizada — não
 * sobra nenhum espaço em branco no site.
 *
 * Quando a empresa enviar depoimentos reais, basta preencher a lista:
 *
 * export const testimonials: Testimonial[] = [
 *   {
 *     quote: "Texto do depoimento, exatamente como o cliente escreveu.",
 *     author: "Nome do cliente",
 *     role: "Empresa ou cargo",   // opcional
 *   },
 * ];
 *
 * A seção aparece sozinha assim que houver ao menos um item.
 */

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

export const testimonials: Testimonial[] = [];
