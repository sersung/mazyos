# Auditoria — qualificacanada.com (landing page da coleção)

- **URL:** https://qualificacanada.com
- **Arquivo:** `qualificacanada/app/page.tsx`
- **Idioma:** português do Brasil (`<html lang="pt-BR">`)
- **Data:** 2026-08-07
- **Objetivo do pedido:** melhorar retenção e tráfego

---

## Scorecard

Notas de 0 a 2 — 0 ausente, 1 parcial, 2 presente. Coluna "depois" reflete o
que já foi corrigido nesta rodada.

| Critério | Antes | Depois | Observação |
|---|---|---|---|
| E-E-A-T — Experience | 2 | 2 | Ponto mais forte da página. Caso real, três negativas assumidas, data da licença (dez/2022). É exatamente o que o Google chama de vivência de primeira mão. |
| E-E-A-T — Expertise | 1 | 2 | Bio e credencial 309A já estavam no texto, mas não existiam em dado estruturado. Adicionado schema `Person` com `jobTitle` e `knowsAbout`. |
| E-E-A-T — Authoritativeness | 1 | 1 | A página cita Skilled Trades Ontario, Ontario.ca e Canada.ca no texto, mas **não linka** nenhuma delas. Nenhuma menção externa verificável. Não resolvido nesta rodada. |
| E-E-A-T — Trust | 0 | 2 | "Termos de uso" e "Privacidade" apontavam para `href="#"` — links mortos numa página que vende produto pago. Corrigido para `/termos` e `/privacidade`. Adicionada data de revisão visível. |
| Legibilidade | 2 | 2 | Frases curtas, parágrafos de 2-4 linhas, tom direto e em primeira pessoa. Coerente com `_memoria/preferencias.md`. Sem jargão de guru. |
| AEO/GEO-readiness | 1 | 2 | FAQ excelente em formato answer-first, mas **sem `FAQPage` schema** — o ativo mais citável da página era invisível para AI Overviews e IAs generativas. Schema implementado. |
| Saúde técnica | 0 | 2 | Ver detalhamento abaixo. Era o pior critério. |

**Nota geral: 7/14 → 13/14**

---

## Problemas encontrados, do mais barato ao mais caro

### 1. Os dois CTAs da coleção completa não vendiam nada ⚠️ AINDA PENDENTE

`href="#LINK-HOTMART-BUNDLE"` — âncora inexistente, nos dois botões do combo
(painel de preço e CTA final). O produto de maior ticket da página (R$ 297,
o único com desconto anunciado) **não tinha checkout**.

Não dá para inventar a URL. Enquanto ela não existir, os botões passam a cair
na trilha de guias individuais (destino real) em vez de num link morto. Basta
definir `NEXT_PUBLIC_HOTMART_BUNDLE` para ligar a venda.

**Essa é a correção de maior impacto financeiro da lista e depende do Renan.**

### 2. Toda partilha em rede social renderizava um favicon quebrado

`openGraph.images` apontava para `favicon.ico` (256x256) com
`twitter:card = summary_large_image`. Card grande + imagem quadrada minúscula =
preview vazio ou distorcido no WhatsApp, Facebook e X.

Para um público que circula em grupo de WhatsApp e Facebook de brasileiro no
Canadá, esse é provavelmente o maior vazamento de tráfego da página inteira.

Corrigido: `app/opengraph-image.tsx` gera um card 1200x630 com a identidade
da marca (azul maple, faixa hi-vis, credencial 309A).

### 3. A landing page era uma ilha dentro do próprio site

A home (`app/page.tsx`) fica fora do route group `(site)`, então não recebe
Header nem Footer. Resultado: **nenhum link** para os 10 artigos publicados,
para `/guia-completo`, `/sobre` ou `/contato`.

Duas perdas ao mesmo tempo:

- **Retenção:** quem não estava pronto para comprar só tinha uma saída — fechar a aba.
- **Tráfego:** a página de maior autoridade do domínio não passava link para nenhum artigo.

Corrigido: seção "Ainda pesquisando? Comece por aqui — de graça." com 6 artigos
selecionados para o público de ofícios, mais links no header e no rodapé.

### 4. Navegação sumia inteira no mobile

`@media(max-width:760px){.nav-links{display:none}}` sem hambúrguer para
substituir. O visitante de celular — a maioria desse público — ficava sem
nenhuma navegação. Corrigido com linha rolável, sem JavaScript.

### 5. Preço do schema divergia do preço da página

`Product.offers.price` dizia `497.00`; a página anuncia R$ 297. Divergência
entre dado estruturado e preço visível é motivo de perda de rich result e
sinal de desconfiança. Corrigido para 297, mais `seller` e política de
devolução de 7 dias em `hasMerchantReturnPolicy`.

### 6. Fontes bloqueando a renderização

Três famílias do Google Fonts carregadas por `<link rel="stylesheet">` dentro
do corpo da página, mais dois `preconnect`. Requisição externa bloqueante +
layout shift, com impacto direto em LCP/CLS — que são justamente as métricas
que derrubam retenção em conexão de celular.

Migrado para `next/font/google` (auto-hospedado, `display: swap`). O aviso
`@next/next/no-page-custom-font` do lint sumiu junto.

### 7. Título e meta description fora do tamanho útil

- Title: 76 caracteres → cortado no resultado de busca. Reescrito para 50.
- Description: 232 caracteres → truncada. Reescrita para 158.

### 8. Nenhuma medição

Sem GA4, sem pixel, sem evento de clique em CTA. Não dava para saber qual
botão converte nem até onde o visitante lê. Adicionado `components/Analytics.tsx`,
inerte enquanto `NEXT_PUBLIC_GA_ID` não for definido, com eventos `cta_click`
(cada botão tem `data-cta`) e `scroll_depth`.

---

## Não verificável nesta auditoria

Sem acesso a dados reais, ficam de fora: tráfego atual, posição no Google,
backlinks, Core Web Vitals de campo e taxa de conversão. Para fechar isso é
preciso Search Console + GA4 ligados (ver item 8).

---

## O que ficou de fora e depende do Renan

1. **Checkout do combo na Hotmart** (item 1) — maior impacto direto em receita.
2. **Captura de e-mail no material gratuito.** O Guia de Entrada é entregue
   como download direto de PDF, sem pedir e-mail. Um lead magnet sem captura
   não constrói lista, e sem lista não existe retenção nem remarketing.
   É o segundo maior vazamento da página.
3. **Prova social.** A página não tem um único depoimento, número de alunos ou
   avaliação. Tem só o selo "Mais vendido". Inventar depoimento ou nota está
   fora de questão — mas se existirem mensagens reais de quem usou os guias,
   é o conteúdo de maior impacto em conversão que falta.
4. **Links para as fontes oficiais** (Skilled Trades Ontario, Ontario.ca,
   Canada.ca) — citadas no texto sem link. Elevaria a nota de
   Authoritativeness, que segue em 1.
5. **AdSense na página de venda.** O script roda no site inteiro, incluindo a
   landing. Anúncio de terceiro numa página de venda compete com o próprio
   CTA. Decisão de receita — não mexi.
