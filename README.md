# Litoral Bordados — site institucional

**No ar:** <https://litoralbordados.com>
**Repositório:** <https://github.com/saymonthedev/litoral-bordados>

Landing page da **Litoral Bordados**, construída em Next.js e publicada na Cloudflare.

A assinatura visual do site é a animação **“Do fio ao bordado”**: no bastidor do topo da página, uma agulha entra puxando a linha, costura o pesponto da orla, troca de linha, preenche a onda em ponto cheio e, no fim, borda o nome da marca — exatamente o mesmo desenho da logo.

> **Importante:** nenhuma informação da empresa foi inventada. Telefone, WhatsApp, Instagram, e-mail, endereço, fotos, depoimentos, história, números e datas estão vazios ou marcados como espaço reservado, prontos para receber o material oficial. Este README explica onde colocar cada coisa.

---

## Índice

1. [Tecnologias](#tecnologias)
2. [Instalação](#instalação)
3. [Desenvolvimento](#desenvolvimento)
4. [Build de produção](#build-de-produção)
5. [Estrutura do projeto](#estrutura-do-projeto)
6. [Como alterar as informações da empresa](#como-alterar-as-informações-da-empresa)
7. [Como alterar os textos das seções](#como-alterar-os-textos-das-seções)
8. [Como editar serviços, diferenciais e etapas](#como-editar-serviços-diferenciais-e-etapas)
9. [Como adicionar as fotos reais](#como-adicionar-as-fotos-reais)
10. [Como trocar a logo](#como-trocar-a-logo)
11. [Como alterar a animação do bordado](#como-alterar-a-animação-do-bordado)
12. [Depoimentos](#depoimentos)
13. [Acessibilidade e movimento reduzido](#acessibilidade-e-movimento-reduzido)
14. [SEO](#seo)
15. [Deploy (Cloudflare)](#deploy-cloudflare)
16. [Como atualizar o site depois de publicado](#como-atualizar-o-site-depois-de-publicado)
17. [Variáveis de ambiente](#variáveis-de-ambiente)
18. [Checklist de entrega do material da empresa](#checklist-de-entrega-do-material-da-empresa)

---

## Tecnologias

| Ferramenta | Para quê |
| --- | --- |
| [Next.js 16](https://nextjs.org) (App Router) | Estrutura do site, SEO e geração dos arquivos estáticos |
| React 19 + TypeScript | Componentes e segurança de tipos |
| [Tailwind CSS 4](https://tailwindcss.com) | Estilos, tema e responsividade |
| [lucide-react](https://lucide.dev) | Ícones de interface (menu, setas, contato) |
| [Lenis](https://lenis.darkroom.engineering) | Inércia da rolagem (o "arraste" da página) |

A animação do bordado e o parallax são feitos à mão, com SVG, CSS e um pequeno laço de `requestAnimationFrame`. A única biblioteca de movimento é o Lenis (~3 KB), responsável só pela inércia da rolagem.

**Requisito:** Node.js **20.9 ou superior** (`node -v` para conferir).

---

## Instalação

Baixe o projeto e, dentro da pasta dele, instale as dependências:

```bash
npm install
```

Isso só precisa ser feito uma vez (e novamente quando alguma dependência mudar).

---

## Desenvolvimento

```bash
npm run dev
```

Depois abra <http://localhost:3000> no navegador.

O servidor recarrega a página sozinho a cada arquivo salvo. Para parar, pressione `Ctrl + C` no terminal.

---

## Build de produção

Para conferir se está tudo certo antes de publicar:

```bash
npm run build
```

O comando compila o site e verifica os tipos do TypeScript. Se aparecer algum erro, ele indica o arquivo e a linha.

Para rodar localmente a versão compilada (igual à da internet):

```bash
npm start
```

E o site fica em <http://localhost:3000>.

### Todos os comandos disponíveis

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Compila para produção |
| `npm start` | Roda a versão compilada |
| `npm run typecheck` | Só a checagem de tipos |
| `npm run brand` | Regera os SVGs da marca e os espaços reservados de imagem |

---

## Estrutura do projeto

```text
public/
  brand/                 arquivos da identidade visual (logo, símbolo, favicon)
  images/                espaços reservados do Hero e da seção Sobre
  portfolio/             6 espaços reservados para as fotos dos trabalhos

scripts/
  generate-brand.ts      gera os SVGs da marca e os espaços reservados

src/
  app/
    layout.tsx           cabeçalho, rodapé, fontes, SEO e dados estruturados
    page.tsx             a ordem das seções da página
    globals.css          tema (cores, fontes), texturas e animações de entrada
    icon.svg             favicon (o Next.js reconhece automaticamente)
    apple-icon.png       ícone para iPhone/iPad
    opengraph-image.png  imagem exibida quando o link é compartilhado
    robots.ts            robots.txt
    sitemap.ts           sitemap.xml
  components/
    hero/                a animação "Do fio ao bordado"
    layout/              Header e Footer
    sections/            Hero, Services, Portfolio, About, Differentials,
                         Process, Testimonials, FinalCTA
    system/              revela os elementos ao rolar e controla a rolagem
                         com inércia + o parallax
    ui/                  botões, molduras de foto, ícones e detalhes de costura
  config/
    siteConfig.ts        ⭐ contatos, redes sociais e dados da empresa
    content.ts           ⭐ todos os textos das seções
  data/
    services.ts          lista de serviços
    portfolio.ts         lista dos trabalhos (e das fotos)
    differentials.ts     lista de diferenciais
    process.ts           etapas do atendimento
    testimonials.ts      depoimentos (vazio de propósito)
  lib/
    brand/               geometria da marca, logotipo em curvas e paleta
    contact.ts           monta os links de WhatsApp, e-mail, telefone e Instagram
    parallax.ts          motor do arraste entre as seções
    smooth-scroll.ts     acesso à rolagem (usado para travar no menu)
    site-url.ts          endereço do site usado no SEO
```

Os dois arquivos marcados com ⭐ resolvem quase tudo o que o cliente costuma pedir.

---

## Como alterar as informações da empresa

Abra **`src/config/siteConfig.ts`**. É o único arquivo necessário para nome, contatos e redes sociais:

```ts
export const siteConfig = {
  name: "Litoral Bordados",
  shortName: "Litoral",
  tagline: "A precisão do bordado com a fluidez do litoral.",
  description: "Bordados personalizados para uniformes, camisetas...",

  whatsapp: "",          // só números, com DDI e DDD
  whatsappMessage: "Olá! Conheci a Litoral Bordados pelo site...",
  phone: "",             // ex.: "(00) 0000-0000"
  email: "",             // ex.: "contato@litoralbordados.com.br"
  instagram: "",         // "@perfil", "perfil" ou a URL completa
  address: "",           // ex.: "Rua Exemplo, 000 — Bairro, Cidade/UF"
  openingHours: "",      // ex.: "Segunda a sexta, 8h às 18h"

  url: "https://litoralbordados.com",   // endereço final do site
};
```

### Regra dos campos vazios

Todo campo vazio (`""`) some do site — **nunca** gera link quebrado:

- **WhatsApp vazio:** o botão “Solicitar orçamento” leva para a seção de contato. Se houver e-mail ou telefone cadastrado, ele usa esse canal.
- **Sem nenhum canal:** no lugar dos contatos aparece o aviso “Os canais de atendimento da Litoral Bordados serão divulgados em breve”.
- **Instagram/endereço vazios:** o item simplesmente não é exibido no rodapé nem no contato.

### WhatsApp — formato do número

Escreva **apenas números**, com o código do país (55) e o DDD, sem espaços, parênteses ou traços:

```ts
whatsapp: "5511987654321",   // 55 + DDD (11) + número
```

Com o número preenchido, todos os botões de orçamento passam a abrir a conversa no WhatsApp já com a mensagem escrita em `whatsappMessage`.

### Instagram

Qualquer um dos formatos funciona:

```ts
instagram: "@litoralbordados";
instagram: "litoralbordados";
instagram: "https://instagram.com/litoralbordados";
```

---

## Como alterar os textos das seções

Abra **`src/config/content.ts`**. Ali estão, agrupados por seção, todos os textos do site: título principal, descrições, avisos e rótulos dos botões.

Exemplo — o título do Hero:

```ts
hero: {
  eyebrow: "Bordados personalizados",
  headline: {
    lead: "Detalhes que ganham vida",
    emphasis: "em cada ponto",   // parte em itálico, com pesponto por baixo
  },
  description: "Personalização de uniformes, camisetas...",
},
```

O texto institucional da seção Sobre está em `content.about.paragraphs` — é só trocar os parágrafos pelo texto real da empresa quando ele chegar.

Os rótulos dos botões (“Solicitar orçamento”, “Conhecer nossos trabalhos”) ficam em `ctaLabels`, no fim de `src/config/siteConfig.ts`.

---

## Como editar serviços, diferenciais e etapas

| Seção | Arquivo |
| --- | --- |
| Serviços | `src/data/services.ts` |
| Trabalhos (portfólio) | `src/data/portfolio.ts` |
| Diferenciais | `src/data/differentials.ts` |
| Como funciona (etapas) | `src/data/process.ts` |

Cada arquivo é uma lista. Para **adicionar**, copie um item e cole abaixo; para **remover**, apague o item. O layout se ajusta sozinho.

Nos serviços, o campo `icon` aceita: `"bordado"`, `"uniforme"`, `"camiseta"`, `"bone"`, `"identidade"` e `"medida"`.

Nos diferenciais, o campo `stitch` escolhe a amostra de ponto desenhada ao lado: `"knot"` (nó francês), `"chain"` (corrente), `"satin"` (cheio), `"cross"` (cruz), `"back"` (atrás) e `"stem"` (haste).

---

## Como adicionar as fotos reais

### 1. Fotos dos trabalhos (seção “Nossos trabalhos”)

1. Copie as fotos para a pasta **`public/portfolio/`**, por exemplo `public/portfolio/uniforme-01.jpg`.
2. Abra `src/data/portfolio.ts` e, no item correspondente:
   - troque `image` pelo caminho do arquivo (sempre começando com `/portfolio/`);
   - **apague a linha `placeholder: true`** (é ela que mostra a etiqueta “Espaço reservado”);
   - escreva em `alt` uma descrição curta do que aparece na foto.

Antes:

```ts
{
  title: "Uniforme corporativo",
  category: "Uniformes",
  description: "Logotipo bordado em peças de uniforme...",
  image: "/portfolio/espaco-01.svg",
  alt: "Espaço reservado para foto de uniforme bordado",
  placeholder: true,
},
```

Depois:

```ts
{
  title: "Uniforme corporativo",
  category: "Uniformes",
  description: "Logotipo bordado em peças de uniforme...",
  image: "/portfolio/uniforme-01.jpg",
  alt: "Camisa polo azul com o logotipo bordado no peito",
},
```

3. Quando **todas** as fotos estiverem no lugar, apague também o aviso `note` em `src/config/content.ts` (`portfolio.note`) — ou substitua por outro texto.

### 2. Foto do Hero (topo da página)

Coloque a foto em `public/images/` e troque o caminho em `src/components/sections/Hero.tsx`, na linha `src="/images/hero-placeholder.svg"`. Remova também a propriedade `badge` para tirar a etiqueta de espaço reservado.

### 3. Foto da seção Sobre

Mesma coisa em `src/components/sections/About.tsx` (`src="/images/sobre-placeholder.svg"`).

### Formato recomendado das fotos

- JPG ou WebP, a partir de 1200 px de largura.
- Retrato (3:4) ou quadrado funcionam melhor na grade dos trabalhos.
- **Comprima antes de subir.** Como o site é estático, não há otimização automática: a foto chega ao visitante exatamente como está no repositório. Uma foto de celular tem 4–8 MB e deixaria o site lento. Salve em JPG ou WebP com até ~1600 px de largura e ~300 KB por arquivo — o <https://squoosh.app> faz isso no navegador, sem instalar nada.

---

## Como trocar a logo

Os arquivos da identidade estão em **`public/brand/`**:

| Arquivo | Onde aparece |
| --- | --- |
| `logo.svg` | cabeçalho (símbolo + “Litoral Bordados”) |
| `logo-light.svg` | rodapé (versão para fundo escuro) |
| `logo-mark.svg` | só o símbolo |
| `logo-mark-light.svg` | só o símbolo, para fundo escuro |
| `logo-vertical.svg` | versão empilhada (avatar de redes sociais, etiquetas) |
| `favicon.svg` | ícone da aba do navegador |

Para usar a logo oficial da empresa, **substitua os arquivos mantendo os mesmos nomes**. Nada mais precisa ser alterado — o site lê os caminhos de `siteConfig.logo`, `logoLight` e `logoMark`.

Se os nomes forem outros, ajuste-os em `src/config/siteConfig.ts`.

### Favicon e ícone do celular

Além de `public/brand/favicon.svg`, troque também:

- `src/app/icon.svg` — é este arquivo que o navegador usa na aba;
- `src/app/apple-icon.png` — ícone de 180×180 px para iPhone/iPad;
- `src/app/opengraph-image.png` — imagem de 1200×630 px exibida ao compartilhar o link.

### Regerar a identidade provisória

A logo provisória é desenhada por código. Se quiser ajustar a onda (curva, espessura, densidade dos pontos), edite `src/lib/brand/mark.ts` e rode:

```bash
npm run brand
```

O comando regera todos os SVGs de `public/brand`, o favicon e os espaços reservados de imagem.

---

## Como alterar a animação do bordado

A animação “Do fio ao bordado” está em:

```text
src/components/hero/EmbroideryHoop.tsx   ← a animação
src/components/hero/embroidery.css       ← os estilos dela
src/lib/brand/mark.ts                    ← o desenho que é bordado
```

### Mudar o ritmo

No topo de `EmbroideryHoop.tsx` existe a tabela de tempos (em milissegundos):

```ts
const TEMPOS = {
  entrada: { inicio: 300, fim: 1000 },   // o fio entra no bastidor
  orla:    { inicio: 1000, fim: 2250 },  // pesponto da orla
  salto:   { inicio: 2250, fim: 2600 },  // troca de linha
  onda:    { inicio: 2600, fim: 4600 },  // ponto cheio da onda
  saida:   { inicio: 4600, fim: 5050 },  // a agulha sai
  nome:    { inicio: 4850 },             // o nome é bordado
  total: 5900,
};
```

Diminua os números para acelerar; aumente para deixar mais lento.

A animação roda **em laço**, sozinha. O intervalo entre uma volta e outra fica logo abaixo, no mesmo arquivo:

```ts
const ESPERA = 5000;   // o bordado pronto descansa 5s antes de recomeçar
const SUMICO = 700;    // some suavemente em 0,7s antes da próxima volta
```

O laço só roda enquanto o bastidor está visível na tela — fora dela, a animação pausa sozinha e não gasta processamento.

### Mudar o desenho bordado

O desenho vem de `src/lib/brand/mark.ts` (`WAVE_CURVE` é a onda e `SHORE_CURVE` é a orla). Alterando essas curvas, mudam ao mesmo tempo a logo, o favicon e a animação — tudo continua coerente. Depois de alterar, rode `npm run brand`.

Em `MARK_SETTINGS`, no mesmo arquivo, é possível ajustar a largura da onda, a distância entre os pontos e a inclinação do ponto cheio.

### Botão de pausa

Como o bordado se repete sozinho, existe um botão abaixo do bastidor para parar o movimento — exigência de acessibilidade para conteúdo que fica em laço (WCAG 2.2.2, *Pause, Stop, Hide*).

- Rodando, ele mostra **”Pausar bordado”** (`content.hero.pauseLabel`);
- Pausado, o bastidor descansa com o bordado pronto e o botão vira **”Bordar novamente”** (`content.hero.replayLabel`), que recomeça do fio.

Com `prefers-reduced-motion` não há laço nem botão: o bordado já aparece pronto.

---

## Como ajustar o arraste (rolagem e parallax)

A página tem duas camadas de movimento ligadas à rolagem:

**1. Inércia da rolagem** — ao parar de rolar, a página ainda desliza um pouco e assenta. Fica em `src/components/system/SmoothScroll.tsx`:

```ts
/** Suavização da rolagem: 0.06 = bem arrastado · 0.15 = quase imediato. */
const INERCIA = 0.085;
```

Diminua para um arraste mais longo e pesado; aumente para uma resposta mais direta. Para desligar por completo, basta remover `<SmoothScroll />` de `src/app/layout.tsx`.

**2. Parallax das camadas** — dentro de cada seção, os elementos se movem em velocidades diferentes. Isso é controlado direto no HTML, por atributos:

```tsx
<div data-parallax="40">…</div>       {/* fica para trás 40px */}
<div data-parallax="-25">…</div>      {/* adianta 25px */}
<div data-parallax-x="-70">…</div>    {/* arrasta na horizontal */}
```

O número é a distância máxima, em pixels. Valores entre 20 e 90 costumam ficar bons — acima disso o efeito começa a chamar mais atenção que o conteúdo. O motor está em `src/lib/parallax.ts`.

Onde o arraste está aplicado hoje:

| Elemento | Força |
| --- | --- |
| Brilhos do fundo do Hero | `80` e `-60` |
| Espaço de foto do Hero | `34` |
| Bastidor do Hero | `-18` |
| Texto do Hero | `22` |
| Fotos dentro das molduras | `26` (prop `arraste` do `PhotoFrame`) |
| Fio condutor entre seções | `-70` na horizontal |
| Círculos decorativos do Sobre | `55` e `-45` |
| Fio das etapas do processo | `-45` na horizontal |
| Marca d'água do contato | `70` |

> **Regra importante:** nunca coloque `data-parallax` no mesmo elemento que tem `data-reveal` — os dois mexem em `transform` e um anula o outro. Use um elemento em volta.

Nas telas pequenas a força cai automaticamente (50% no celular, 75% no tablet), e o toque continua sendo o nativo do navegador — arrastar com o dedo responde na hora.

Com `prefers-reduced-motion`, tanto a inércia quanto o parallax ficam desligados: rolagem normal e cada elemento exatamente onde o layout o colocou.

## Depoimentos

A seção existe, mas **não é exibida** enquanto não houver depoimentos reais — nada foi inventado.

Para ativá-la, preencha `src/data/testimonials.ts`:

```ts
export const testimonials: Testimonial[] = [
  {
    quote: "Texto do depoimento, como o cliente escreveu.",
    author: "Nome do cliente",
    role: "Empresa ou cargo", // opcional
  },
];
```

Assim que houver um item na lista, a seção aparece automaticamente entre “Como funciona” e o contato final.

---

## Acessibilidade e movimento reduzido

- HTML semântico, títulos em ordem (um `h1` por página) e textos alternativos em todas as imagens.
- Navegação completa por teclado, com foco visível em coral e link “Pular para o conteúdo”.
- Menu do celular com `Esc` para fechar, rolagem travada e foco devolvido ao botão.
- Contraste conferido nas cores de texto sobre linho e sobre azul.
- **`prefers-reduced-motion`**: quem configura o sistema para reduzir animações vê o bordado já pronto, sem agulha, sem linha correndo e sem animações de entrada.
- Sem JavaScript, o site continua legível: o bordado aparece finalizado e todas as seções ficam visíveis.

Para testar o modo de movimento reduzido no Windows: *Configurações → Acessibilidade → Efeitos visuais → Efeitos de animação* (desligado). No Chrome também dá para simular em *DevTools → Rendering → Emulate CSS prefers-reduced-motion*.

---

## SEO

Já configurados em `src/app/layout.tsx`:

- título e descrição (`Litoral Bordados | Bordados personalizados`);
- Open Graph e Twitter Card, com imagem de compartilhamento;
- `lang="pt-BR"`, canonical, favicon e dados estruturados (`Organization`) — que incluem e-mail, telefone e Instagram **somente quando preenchidos**;
- `robots.txt` e `sitemap.xml` gerados automaticamente.

O endereço do site vem do campo `url` em `src/config/siteConfig.ts` — hoje `https://litoralbordados.com`. Se o domínio mudar, basta trocar ali: canonical, Open Graph e sitemap acompanham.

---

## Deploy (Cloudflare)

O site é publicado como **estático**: `npm run build` gera a pasta `out/`, e é ela que vai para o ar. Não existe servidor Node em produção — só arquivos servidos pela rede da Cloudflare.

A configuração do deploy está em [`wrangler.jsonc`](wrangler.jsonc), na raiz do projeto.

### 1. Enviar o projeto para o GitHub

Se o projeto ainda não estiver em um repositório:

```bash
git init
git add .
git commit -m "Site da Litoral Bordados"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/litoral-bordados.git
git push -u origin main
```

### 2. Publicar

Com a conta autenticada uma única vez (`npx wrangler login`), publicar é:

```bash
npm run build
npx wrangler deploy
```

O primeiro comando gera a pasta `out/`; o segundo envia essa pasta para a Cloudflare. Em cerca de 15 segundos o site está no ar.

> Só os arquivos alterados sobem a cada publicação — as demais já ficam em cache na Cloudflare.

**Publicação automática a cada `git push`** (opcional): no painel da Cloudflare, em **Workers & Pages → litoral-bordados → Settings → Build**, é possível conectar o repositório do GitHub. A partir daí, cada push na `main` publica sozinho, com `npm run build` como comando e `out` como diretório de saída.

### 3. Domínio próprio

Para o domínio funcionar na raiz (sem `www`), o DNS precisa estar na Cloudflare:

1. No painel da Cloudflare: **Add a site** → digite o domínio → plano **Free**.
2. A Cloudflare mostra dois nameservers — copie os dois.
3. No registrador (na Hostinger: **Domínios → seu domínio → DNS / Nameservers → Alterar nameservers**), cole-os e salve.
4. Volte em **Workers & Pages → litoral-bordados → Settings → Domains & Routes → Add → Custom domain** e adicione `litoralbordados.com`; repita para `www.litoralbordados.com`.
5. Os registros de DNS e o certificado HTTPS são criados automaticamente.

A troca de nameservers costuma valer em minutos, mas pode levar até 24h para propagar no mundo todo.

---

## Como atualizar o site depois de publicado

O fluxo é sempre o mesmo:

```text
alterar o código (ou trocar uma foto)
        ↓
npm run build          gera a pasta out/
        ↓
npx wrangler deploy    envia para a Cloudflare (~15 s)
        ↓
site atualizado em litoralbordados.com
```

E, para guardar a alteração no repositório:

```bash
git add .
git commit -m "Atualiza fotos dos trabalhos"
git push
```

> **Atenção:** hoje o `git push` **não** publica sozinho — ele apenas guarda o código no GitHub. Quem publica é o `npx wrangler deploy`. Para que o push passe a publicar automaticamente, conecte o repositório conforme o [passo 2 do deploy](#2-publicar).

---

## Variáveis de ambiente

**Este projeto não usa nenhuma variável de ambiente.** Não é preciso criar `.env`, nem configurar nada na Cloudflare além de conectar o repositório.

(Opcionalmente, `NEXT_PUBLIC_SITE_URL` pode ser definida para forçar o endereço usado no SEO — mas o normal é preencher `url` em `siteConfig.ts`.)

---

## Checklist de entrega do material da empresa

Quando a Litoral Bordados enviar o material oficial, siga esta lista:

- [ ] **WhatsApp** → `whatsapp` em `src/config/siteConfig.ts` (só números, com 55 + DDD)
- [ ] **Telefone** → `phone`
- [ ] **E-mail** → `email`
- [ ] **Instagram** → `instagram`
- [ ] **Endereço** → `address`
- [ ] **Horário de atendimento** → `openingHours`
- [ ] **Texto do Sobre** → `about.paragraphs` em `src/config/content.ts`
- [ ] **Fotos dos trabalhos** → `public/portfolio/` + `src/data/portfolio.ts` (remover `placeholder: true`)
- [ ] **Foto do Hero** → `public/images/` + `src/components/sections/Hero.tsx`
- [ ] **Foto do ateliê/equipe** → `public/images/` + `src/components/sections/About.tsx`
- [ ] **Logo oficial** → substituir os arquivos de `public/brand/` (e `src/app/icon.svg`, `apple-icon.png`, `opengraph-image.png`)
- [ ] **Depoimentos** → `src/data/testimonials.ts`
- [ ] **Domínio** → já configurado (`litoralbordados.com`). Para trocar: `url` em `siteConfig.ts` e as rotas em `wrangler.jsonc`
- [ ] Publicar: `npm run build` e depois `npx wrangler deploy` (o `git push` guarda o código, mas não publica)

---

## Licença

Projeto desenvolvido sob medida para a Litoral Bordados. A identidade visual criada aqui é provisória e pode ser substituída pela logo oficial a qualquer momento.
