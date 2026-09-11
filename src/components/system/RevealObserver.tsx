"use client";

import { useEffect } from "react";

/**
 * Revela os elementos conforme eles entram na tela.
 *
 * Em vez de um componente por elemento, um único observador cuida de toda a
 * página: qualquer elemento marcado com data-reveal, data-draw ou
 * data-stagger recebe a classe "is-visible" quando aparece.
 *
 * Quem navega sem JavaScript vê tudo normalmente (o CSS só esconde os
 * elementos quando a classe "js" está no <html>), e quem pede
 * prefers-reduced-motion recebe o resultado final sem animação.
 */
export function RevealObserver() {
  useEffect(() => {
    const selector = "[data-reveal], [data-draw], [data-stagger], [data-stitch-reveal]";
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
