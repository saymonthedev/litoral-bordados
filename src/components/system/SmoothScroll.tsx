"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { criarParallax } from "@/lib/parallax";
import { definirRolagem } from "@/lib/smooth-scroll";

/**
 * Rolagem com inércia + parallax.
 *
 * A página passa a "arrastar": ao parar de rolar, ela ainda desliza um pouco
 * e assenta, e as camadas de cada seção acompanham em velocidades diferentes
 * (veja src/lib/parallax.ts).
 *
 * Decisões importantes:
 *  - a rolagem continua sendo a nativa do navegador (o Lenis anima a posição
 *    real, não um `transform` na página) — então cabeçalho fixo, barra de
 *    rolagem, busca do navegador e teclado continuam funcionando;
 *  - no celular o toque segue nativo: arrastar com o dedo precisa responder na
 *    hora, e só o parallax acompanha;
 *  - com prefers-reduced-motion nada disso é ligado: rolagem normal, sem
 *    deslocamento de camadas.
 *
 * Para ajustar a sensação, mexa em INERCIA (quanto menor, mais "pesado" e
 * longo é o arraste).
 */

/** Suavização da rolagem: 0.06 = bem arrastado · 0.15 = quase imediato. */
const INERCIA = 0.085;

export function SmoothScroll() {
  useEffect(() => {
    const pediuMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pediuMenosMovimento) return;

    const parallax = criarParallax();
    const lenis = new Lenis({
      lerp: INERCIA,
      wheelMultiplier: 0.95,
      // o toque no celular continua nativo
      syncTouch: false,
    });
    definirRolagem(lenis);

    let frame = 0;
    const passo = (tempo: number) => {
      lenis.raf(tempo);
      parallax.atualizar();
      frame = requestAnimationFrame(passo);
    };
    frame = requestAnimationFrame(passo);

    // primeira medição (e de novo quando tudo terminar de carregar)
    parallax.medir();
    const remedir = () => parallax.medir();
    window.addEventListener("load", remedir);
    document.fonts?.ready.then(remedir).catch(() => {});

    let esperaResize = 0;
    const aoRedimensionar = () => {
      window.clearTimeout(esperaResize);
      esperaResize = window.setTimeout(remedir, 180);
    };
    window.addEventListener("resize", aoRedimensionar);

    // Links internos (#servicos, #contato…) deslizam junto com a inércia
    const aoClicar = (evento: MouseEvent) => {
      if (evento.defaultPrevented || evento.button !== 0) return;
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;

      const alvo = (evento.target as HTMLElement | null)?.closest?.<HTMLAnchorElement>("a[href^='#']");
      // o link "Pular para o conteúdo" segue o caminho nativo, para não
      // atrapalhar o foco de quem navega por teclado
      if (!alvo || alvo.dataset.noSmooth !== undefined) return;

      const destino = alvo.getAttribute("href");
      if (!destino || destino === "#") return;

      const secao = document.querySelector(destino);
      if (!secao) return;

      evento.preventDefault();
      // O respiro abaixo do cabeçalho fixo já vem do scroll-padding-top
      // declarado em globals.css — descontar de novo aqui dobraria a folga.
      lenis.scrollTo(destino === "#inicio" ? 0 : (secao as HTMLElement), { duration: 1.5 });
      window.history.replaceState(null, "", destino);
    };
    document.addEventListener("click", aoClicar);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(esperaResize);
      window.removeEventListener("load", remedir);
      window.removeEventListener("resize", aoRedimensionar);
      document.removeEventListener("click", aoClicar);
      definirRolagem(null);
      lenis.destroy();
      parallax.destruir();
    };
  }, []);

  return null;
}
