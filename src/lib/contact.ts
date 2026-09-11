/**
 * Monta os links de contato a partir de src/config/siteConfig.ts.
 *
 * Regra de ouro: nada é inventado. Se um campo estiver vazio na configuração,
 * a função devolve `null` e o componente correspondente simplesmente não é
 * exibido — nunca existe link quebrado no site.
 */

import { siteConfig } from "@/config/siteConfig";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

/** Link do WhatsApp com a mensagem já escrita. */
export function whatsappHref(message: string = siteConfig.whatsappMessage): string | null {
  const number = onlyDigits(siteConfig.whatsapp);
  if (!number) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

/** Perfil do Instagram sem o "@" — aceita usuário ou URL completa na configuração. */
export function instagramHandle(): string | null {
  const raw = siteConfig.instagram.trim();
  if (!raw) return null;
  const handle = raw
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/^@/, "")
    .replace(/\/+$/, "")
    .trim();
  return handle || null;
}

export function instagramHref(): string | null {
  const handle = instagramHandle();
  return handle ? `https://instagram.com/${handle}` : null;
}

export function phoneHref(): string | null {
  const digits = onlyDigits(siteConfig.phone);
  if (!digits) return null;
  // Números com DDD (10 ou 11 dígitos) recebem o DDI do Brasil.
  const full = digits.length <= 11 ? `55${digits}` : digits;
  return `tel:+${full}`;
}

export function emailHref(): string | null {
  const email = siteConfig.email.trim();
  if (!email) return null;
  const subject = encodeURIComponent(`Orçamento — ${siteConfig.name}`);
  return `mailto:${email}?subject=${subject}`;
}

export type QuoteAction = {
  href: string;
  /** true quando o link abre em outra aba (WhatsApp, Instagram). */
  external: boolean;
  /** Canal escolhido, útil para rótulos e ícones. */
  channel: "whatsapp" | "email" | "phone" | "none";
};

/**
 * Para onde o botão "Solicitar orçamento" deve levar.
 * Prioridade: WhatsApp → e-mail → telefone. Sem nenhum canal configurado,
 * o botão apenas rola a página até a seção de contato.
 */
export function quoteAction(): QuoteAction {
  const whatsapp = whatsappHref();
  if (whatsapp) return { href: whatsapp, external: true, channel: "whatsapp" };
  const email = emailHref();
  if (email) return { href: email, external: false, channel: "email" };
  const phone = phoneHref();
  if (phone) return { href: phone, external: false, channel: "phone" };
  return { href: "#contato", external: false, channel: "none" };
}

/** Existe pelo menos um canal de contato configurado? */
export function hasContactChannel(): boolean {
  return Boolean(
    whatsappHref() || emailHref() || phoneHref() || instagramHref() || siteConfig.address.trim(),
  );
}
