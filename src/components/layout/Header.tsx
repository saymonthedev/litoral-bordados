"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ctaLabels, navItems, siteConfig } from "@/config/siteConfig";
import { instagramHref, quoteAction, whatsappHref } from "@/lib/contact";
import { travarRolagem } from "@/lib/smooth-scroll";
import { Button } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Cabeçalho fixo: transparente no topo e, ao rolar, ganha fundo de linho
 * com uma linha pespontada embaixo. No celular, o menu abre em painel.
 */
export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botaoRef = useRef<HTMLButtonElement | null>(null);
  const fecharRef = useRef<HTMLButtonElement | null>(null);
  const acao = quoteAction();
  const whats = whatsappHref();
  const insta = instagramHref();

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Painel do celular: trava a rolagem, fecha no Esc e devolve o foco.
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    document.addEventListener("keydown", aoTeclar);
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    travarRolagem(true); // pausa também a rolagem com inércia
    fecharRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = anterior;
      travarRolagem(false);
      botaoRef.current?.focus();
    };
  }, [aberto]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-linha",
        rolou ? "bg-linho/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      {/* pesponto que aparece quando a página rola */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-px border-t-[1.5px] border-dashed border-mare/20 transition-opacity duration-500",
          rolou ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="mx-auto flex h-18 max-w-[78rem] items-center justify-between gap-6 px-5 sm:px-8 md:h-20">
        <a
          href="#inicio"
          className="relative flex shrink-0 items-center rounded-sm"
          aria-label={`${siteConfig.name} — ir para o início`}
        >
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={269}
            height={72}
            priority
            className="h-9 w-auto md:h-10"
          />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "group relative text-[0.94rem] font-medium text-tinta-suave transition-colors duration-300 hover:text-mare",
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 border-t-[1.5px] border-dashed border-coral transition-transform duration-500 ease-linha group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={acao.href} external={acao.external} className="px-6 py-3 text-sm">
            {ctaLabels.primary}
          </Button>
        </div>

        <button
          ref={botaoRef}
          type="button"
          onClick={() => setAberto(true)}
          aria-label="Abrir menu"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-mare/15 text-mare transition-colors duration-300 hover:border-mare/40 lg:hidden"
        >
          <Menu aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      {/* ---------------- painel do celular ---------------- */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          aberto ? "visible" : "pointer-events-none invisible",
        )}
        // inert tira o painel fechado da navegação por teclado e dos leitores de
        // tela sem usar display:none — assim ele desliza ao abrir.
        inert={!aberto}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setAberto(false)}
          className={cn(
            "absolute inset-0 bg-mare/45 backdrop-blur-sm transition-opacity duration-400",
            aberto ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={cn(
            "textura-linho absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-linho shadow-2xl",
            "transition-transform duration-500 ease-linha",
            aberto ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <Image
              src={siteConfig.logoMark}
              alt=""
              width={124}
              height={96}
              className="h-9 w-auto"
            />
            <button
              ref={fecharRef}
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-mare/15 text-mare transition-colors duration-300 hover:border-mare/40"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Navegação do menu" className="flex flex-col px-6 pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                className="group flex items-center justify-between border-b border-dashed border-mare/15 py-4 font-display text-2xl text-mare"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="h-px w-8 border-t-[1.5px] border-dashed border-coral/70 transition-all duration-500 ease-linha group-hover:w-12"
                />
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-4 px-6 pb-8 pt-6">
            <Button
              href={acao.href}
              external={acao.external}
              className="w-full"
              icon={acao.channel === "whatsapp" ? <WhatsAppIcon className="h-4 w-4" /> : undefined}
            >
              {acao.channel === "whatsapp" ? ctaLabels.whatsapp : ctaLabels.primary}
            </Button>

            {(whats || insta) && (
              <div className="flex items-center gap-3">
                {whats ? (
                  <a
                    href={whats}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-mare/15 text-mare transition-colors hover:border-coral/50 hover:text-coral"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                ) : null}
                {insta ? (
                  <a
                    href={insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-mare/15 text-mare transition-colors hover:border-coral/50 hover:text-coral"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
