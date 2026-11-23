# Litoral Bordados

Projeto conceitual de portfólio: landing page da **Litoral Bordados**, uma empresa **fictícia** de bordados personalizados para uniformes, camisetas, bonés e peças sob medida. Marca, peças, endereço e depoimentos são inventados, e a página avisa isso no rodapé, na galeria e nos depoimentos.

**No ar:** [litoralbordados.com](https://litoralbordados.com). Fica fora da busca do Google de propósito (`noindex`), para ninguém confundir com uma empresa real.

<p align="center">
  <img src="docs/screenshots/bordado.gif" alt="Animação do topo da página: a agulha borda a onda e o nome Litoral Bordados no bastidor" width="380">
</p>

## A ideia

Bordado é feito ponto a ponto, e a página conta isso logo no primeiro segundo. No topo, um bastidor recebe a linha: a agulha costura o pesponto da orla, troca de linha, preenche a onda em ponto cheio e, por último, borda o nome da marca. É o mesmo desenho da logo, então a animação, a logo e o favicon nascem do mesmo traço.

A linguagem continua no resto da página: pespontos marcam títulos e divisões, cada diferencial vem com uma amostra de ponto de verdade (nó francês, corrente, cheio, cruz, atrás e haste) e um fio corre entre as etapas do atendimento.

![Topo da página](docs/screenshots/hero.png)

## O que tem na página

- **Topo** com a animação "Do fio ao bordado", chamada para orçamento e os tipos de peça.
- **Serviços:** seis tipos de personalização, cada um com ícone desenhado em pesponto.
- **Trabalhos:** seis peças com marcas fictícias (uniforme, camiseta, boné, jaleco, toalha e patch), com imagens de bordado geradas em código.
- **Sobre e diferenciais**, com as amostras de ponto.
- **Como funciona:** do primeiro contato à entrega, em cinco etapas.
- **Depoimentos** fictícios, com o aviso na própria seção.
- **Contato:** botão de WhatsApp que abre a conversa com a mensagem já escrita, além de telefone, e-mail e Instagram. Cada canal só aparece depois de cadastrado. Na demonstração, o WhatsApp é o do desenvolvedor, com uma mensagem que deixa claro que o assunto é o projeto.

| | |
| --- | --- |
| ![Serviços](docs/screenshots/servicos.png) | ![Como funciona](docs/screenshots/processo.png) |

![Galeria de trabalhos com as peças fictícias](docs/screenshots/trabalhos.png)

<p align="center">
  <img src="docs/screenshots/mobile.png" alt="A página no celular" width="300">
</p>

## Detalhes de construção

- **Fotos fictícias geradas em código:** [`scripts/fotos-ficticias/gerar-bordados.html`](scripts/fotos-ficticias/gerar-bordados.html) desenha em Canvas o tecido (piquê, malha, sarja, felpo, gabardine e jeans), os pontos de cetim e de preenchimento, o relevo do bordado, a luz e o desfoque de lente. Nenhuma foto de trabalho de terceiros e nenhuma marca real.
- **Animação feita à mão**, com SVG, CSS e um laço de `requestAnimationFrame`, sem biblioteca de animação. Ela roda em laço só enquanto o bastidor está visível e pausa sozinha fora da tela.
- **Botão de pausa** para o bordado, já que conteúdo em laço precisa poder ser parado (WCAG 2.2.2).
- **Movimento reduzido respeitado:** com `prefers-reduced-motion`, o bordado já aparece pronto e a rolagem fica normal. Sem JavaScript, a página continua completa e legível.
- **Rolagem com inércia e parallax** entre as camadas de cada seção, mais suave no celular, onde o toque continua nativo.
- **Identidade desenhada em código:** a curva da onda gera a logo, as variações para fundo escuro, o favicon e a animação.
- **Contatos à prova de link quebrado:** canal não informado simplesmente não aparece.
- **SEO completo:** Open Graph, dados estruturados (`Organization`), `sitemap.xml` e `robots.txt`. Por ser uma empresa fictícia, a página pede para não ser indexada (`noindex`).
- **Site estático** publicado na Cloudflare: cada push na `main` gera e publica uma nova versão.

## Tecnologias

- [Next.js 16](https://nextjs.org) (App Router, exportação estática)
- React 19 e TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Lenis](https://lenis.darkroom.engineering) para a inércia da rolagem
- [Lucide](https://lucide.dev) para ícones de interface
- Cloudflare Workers (arquivos estáticos) e domínio próprio

## Rodando

Requisito: Node.js 20.9 ou superior.

```bash
npm install
npm run dev        # http://localhost:3000
```

Para ver a versão compilada, servida do mesmo jeito que em produção:

```bash
npm run build
npm run preview    # http://localhost:8787
```

O guia de manutenção (onde trocar contatos, textos, fotos e logo, como ajustar a animação e como publicar) está em [`docs/MANUTENCAO.md`](docs/MANUTENCAO.md).

## Créditos

Design e desenvolvimento: [Saymon Oliveira de Castro](https://saymonthedev.com).

Fotos do ateliê: [Igor Ovsyannykov](https://unsplash.com/@igorovsyannykov), no Unsplash, em domínio público (CC0), via Wikimedia Commons: [Sewing Supplies](https://commons.wikimedia.org/wiki/File:Sewing_Supplies_(Unsplash).jpg) (topo) e [Threads for sewing in a workshop](https://commons.wikimedia.org/wiki/File:Threads_for_sewing_in_a_workshop._(Unsplash).jpg) (Sobre). As imagens das peças bordadas foram geradas em código para este projeto.
