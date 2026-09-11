/**
 * Motor de parallax — o "arraste" entre as seções.
 *
 * Cada camada marcada no HTML se move numa velocidade um pouco diferente da
 * rolagem, como se estivesse sendo puxada. Quem fica para trás dá profundidade;
 * quem adianta dá leveza.
 *
 * Como usar no JSX:
 *
 *   <div data-parallax="40">…</div>      arrasta 40px para baixo (fica para trás)
 *   <div data-parallax="-25">…</div>     adianta 25px
 *   <div data-parallax-x="-60">…</div>   arrasta na horizontal
 *   <div data-parallax-scale="1.14">     mantém uma escala junto do arraste
 *
 * O número é a distância máxima, em pixels, quando o centro do elemento está
 * a uma tela de distância do centro da janela. Valores entre 20 e 90 costumam
 * ficar bons; acima disso o efeito começa a aparecer demais.
 *
 * Regra importante: não coloque data-parallax no mesmo elemento que tem
 * data-reveal — os dois mexem em `transform` e brigariam. Use um elemento em
 * volta.
 *
 * Nada disso roda quando o visitante pede prefers-reduced-motion.
 */

type Camada = {
  el: HTMLElement;
  /** Força vertical e horizontal, em pixels. */
  y: number;
  x: number;
  escala: number;
  /** Posição do centro do elemento no documento (medida sem transform). */
  centro: number;
  ultimo: string;
};

/** Limite de segurança: nenhuma camada passa disso. */
const LIMITE = 160;

const numero = (valor: string | undefined, padrao = 0) => {
  const n = Number.parseFloat(valor ?? "");
  return Number.isFinite(n) ? n : padrao;
};

export function criarParallax() {
  let camadas: Camada[] = [];
  let intensidade = 1;
  let anterior = Number.NaN;

  /** Relê a posição de cada camada (início, resize, troca de fonte/imagem). */
  function medir() {
    // Em telas pequenas o arraste é mais discreto: a tela já é curta.
    intensidade = window.innerWidth < 640 ? 0.5 : window.innerWidth < 1024 ? 0.75 : 1;

    const elementos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax], [data-parallax-x]"),
    );

    camadas = elementos.map((el) => {
      // mede sem transform, senão a medição acumula o deslocamento anterior
      el.style.transform = "";
      const r = el.getBoundingClientRect();
      return {
        el,
        y: numero(el.dataset.parallax),
        x: numero(el.dataset.parallaxX),
        escala: numero(el.dataset.parallaxScale, 1),
        centro: r.top + window.scrollY + r.height / 2,
        ultimo: "",
      };
    });

    anterior = Number.NaN;
    atualizar();
  }

  /** Recalcula o deslocamento das camadas para a posição atual da rolagem. */
  function atualizar() {
    const rolagem = window.scrollY;
    if (rolagem === anterior) return;
    anterior = rolagem;

    const altura = window.innerHeight;
    const centroDaTela = rolagem + altura / 2;

    for (const camada of camadas) {
      // -1 (camada uma tela abaixo) … 0 (no centro) … 1 (uma tela acima)
      const distancia = (centroDaTela - camada.centro) / altura;
      const fator = Math.max(-1.5, Math.min(1.5, distancia)) * intensidade;

      const y = Math.max(-LIMITE, Math.min(LIMITE, fator * camada.y));
      const x = Math.max(-LIMITE, Math.min(LIMITE, fator * camada.x));

      const transform =
        camada.escala === 1
          ? `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
          : `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${camada.escala})`;

      // só escreve no DOM quando o valor muda de verdade
      if (transform !== camada.ultimo) {
        camada.ultimo = transform;
        camada.el.style.transform = transform;
      }
    }
  }

  function destruir() {
    for (const camada of camadas) camada.el.style.transform = "";
    camadas = [];
  }

  return { medir, atualizar, destruir };
}

export type Parallax = ReturnType<typeof criarParallax>;
