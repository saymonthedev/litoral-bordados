import type Lenis from "lenis";

/**
 * Guarda a instância da rolagem suave para que outras partes do site possam
 * conversar com ela — hoje, o menu do celular, que precisa travar a rolagem
 * enquanto está aberto.
 */

let instancia: Lenis | null = null;

export function definirRolagem(lenis: Lenis | null) {
  instancia = lenis;
}

export function obterRolagem(): Lenis | null {
  return instancia;
}

/** Trava (ou destrava) a rolagem da página. */
export function travarRolagem(travar: boolean) {
  if (travar) instancia?.stop();
  else instancia?.start();
}
