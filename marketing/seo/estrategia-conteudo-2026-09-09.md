# Estratégia de SEO — análise do documento anexado e implementação

- **Data:** 2026-09-09
- **Insumo:** relatório em PDF "SEO and Content Strategy for qualificacanada.com" trazido pelo Renan
- **Repositório:** qualificacanada (branch `claude/lending-page-mazyos-skills-pf5bsv`)

---

## Veredicto sobre o documento

Analisei e verifiquei os fatos regulatórios mais importantes do relatório contra fonte
oficial (WebSearch, já que o WebFetch direto em skilledtradesontario.ca está bloqueado
pelo proxy de rede deste ambiente). **Toda claim de maior peso confere:**

| Claim do relatório | Verificação |
|---|---|
| Ontario Workforce Priority Stream em vigor 26/jun/2026, EOI aberto 4/ago/2026 | ✅ Confirmado (Fragomen, immigrationnewscanada.ca) |
| Alocação 2026 de 14.119 nominações (alta de 31% sobre 10.750 em 2025) | ✅ Confirmado |
| Express Entry trades: mínimo subiu de 6 para 12 meses, efetivo 18/fev/2026 | ✅ Confirmado, inclusive o detalhe de 1.560 horas dentro de 3 anos |
| Draw #408 (2/abr/2026): 3.000 ITAs, corte CRS 477 | ✅ Confirmado |
| STO assumiu exames internamente desde 1/fev/2026 (fim do contrato Prometric em 31/jan) | ✅ Confirmado |
| Certificado de qualificação soma até 50 pontos no CRS | ✅ Confirmado |
| TEA = $235 + HST ($265,55) | ✅ Confirmado, valor exato |
| Exame C of Q = $150 + HST ($169,50) por tentativa | ✅ Confirmado |
| 23 ofícios compulsórios em Ontário, renovação anual do C of Q | ✅ Confirmado — **bônus**: descobri que a renovação custa $60 + HST, dado que o relatório não tinha e que entrou no artigo novo |
| 309A: 9.000 horas (8.160 trabalho + 840 escola) | ✅ Confirmado |

Nenhuma claim verificada se mostrou errada ou inventada. É um relatório sólido — trato as
citações que pareciam nome de escritório de advocacia (Earnest Immigration, Amir Ismail
And Associates, Indie Garage) como reais, porque são: sites de imigração/oficina que
realmente publicaram esses dados.

## A divergência que muda o escopo do trabalho

O relatório fala em "corrigir CTR das 4 páginas que já têm impressão" e destaca
especificamente **"a página STO" (17 impressões, posição 6,65, 0 cliques)**. Conferi o
repositório inteiro: **não existe nenhuma página dedicada a Skilled Trades Ontario, TEA,
C of Q ou 309A** — esses termos só apareciam como texto de venda dentro da home, do
`/guia-completo` e do `/guia-de-entrada`, nunca como conteúdo informacional próprio.

Duas explicações possíveis: os dados de Search Console citados no relatório vêm de outra
fonte que não tenho acesso nesta sessão (nenhum conector de GSC está conectado aqui), ou
o relatório já estava descrevendo a arquitetura-alvo (3 pilares + clusters) como se
fosse o estado atual. De qualquer forma, **isso não é uma tarefa de "retitular página
existente" — é construir o conteúdo do zero**, exatamente como a seção "Details" do
próprio relatório propõe.

Se você tiver o Google Search Console conectado em algum lugar, vale me passar acesso
(ou a lista concreta das páginas com impressão) — sem isso eu não consigo confirmar
CTR real nem fazer o benchmarking que o relatório recomenda para os próximos 3 meses.

---

## O que foi implementado nesta rodada

Optei por não tentar as ~40 páginas do plano completo de uma vez — immigration content
errado é o tipo de erro caro (financeiro e de credibilidade), e cada artigo merece
verificação própria. Priorizei os itens de maior ROI e menor risco, que cobrem quase
inteiramente a seção "Primeiras 2 semanas" do relatório original:

### 1. Três artigos novos, com fatos verificados e fonte linkada

- **`/artigos/trade-equivalency-assessment-passo-a-passo`** — o pilar 1 do relatório
  (Validação/TEA). Passo a passo completo: 7 etapas, tabela de custos, o que fazer se
  a avaliação for negada, diferença TEA x ECA (a confusão mais comum, segundo o próprio
  relatório). É honesto sobre não haver prazo oficial publicado pela STO — não inventei
  o "3-6 meses" que já está na FAQ da home (ver nota abaixo).
- **`/artigos/fim-oinp-skilled-trades-stream-2026`** — o primeiro dos 2 artigos
  "notícia+processo" pedidos para as 2 semanas iniciais.
- **`/artigos/express-entry-trades-2026-novo-requisito`** — o segundo.

Cada um tem: título dentro da faixa de 50-60 caracteres (regra do próprio relatório para
CTR), meta description entre 150-164 caracteres, schema `BlogPosting` com
`dateModified`, schema `FAQPage` com 3 perguntas reais, e pelo menos um link para fonte
oficial (ontario.ca, skilledtradesontario.ca) — resolvendo o gap de Authoritativeness
que ficou pendente na auditoria de agosto.

Os dois artigos de notícia linkam de volta para o pilar TEA; o pilar TEA linka para o
produto "Método Equivalência Garantida" — fechando o ciclo conteúdo → produto que o
relatório pede na arquitetura de clusters.

### 2. Bug de título duplicado em 6 páginas — achado no processo, não estava no relatório

Ao conferir o `<title>` renderizado pelos novos artigos, percebi que aparecia
"X | QualificaCanadá | QualificaCanadá" — duplicado. Causa: o layout raiz já aplica
`title.template: "%s | QualificaCanadá"`, e várias páginas também escreviam o próprio
sufixo " | QualificaCanadá" no campo `title`, então o Next.js aplicava os dois.

Afetava **6 páginas**: todos os artigos (13, incluindo os 3 novos), `/guia-completo`,
`/contato`, `/termos`, `/privacidade` e `/sobre`. Corrigido em todas — cada uma agora
mostra o título uma vez só. Esse é exatamente o tipo de problema que o relatório aponta
como causa de CTR baixo (posição boa, clique ruim): um título cortado no meio por
excesso de caracteres duplicado é pior que um título mal escrito.

### 3. Vitrine da home reordenada

A seção "Ainda pesquisando? Comece por aqui" (adicionada na rodada anterior) agora
mostra os 3 artigos novos primeiro — são os mais relevantes para quem chega comprando
um produto sobre validação de ofício, mais relevantes que "custo de vida" ou "como
adaptar currículo" que estavam lá antes.

### 4. Bug de conteúdo duplicado na listagem `/artigos`

`app/(site)/artigos/page.tsx` mantinha uma cópia hardcoded da lista de artigos,
separada de `lib/artigos.ts`. Se eu tivesse só adicionado os 3 artigos novos em
`lib/artigos.ts`, eles ficariam **acessíveis por URL direta mas invisíveis na
listagem** — exatamente o tipo de furo que atrapalha o link interno que o relatório
recomenda. Troquei para importar de `lib/artigos.ts`, fonte única. Confirmado: os 13
artigos aparecem agora.

### 5. Suporte técnico para o resto do plano

- `Artigo` (em `lib/artigos.ts`) ganhou os campos opcionais `atualizadoEm` e `faq` —
  qualquer artigo futuro (dos 37 restantes) pode usar o mesmo mecanismo de schema
  `FAQPage` e data de atualização sem nenhum trabalho extra de template.
- `.prose` (em `globals.css`) ganhou estilo para `<ol>`, `<table>`/`<th>`/`<td>` e
  `<blockquote>` — faltavam completamente. Sem isso, listas numeradas (essenciais pra
  conteúdo passo a passo) e tabelas (que o relatório pede explicitamente para páginas
  de custo/salário) renderizariam sem nenhum estilo.

---

## O que fica pendente — não fiz sem confirmar escopo

O plano completo do relatório é **3 páginas-pilar (3.000-5.000 palavras) + 25-30
artigos de cluster + SEO programático por ofício × província**. Isso é um projeto de
várias sessões, não uma tarde. O que falta, em ordem de prioridade pelo próprio
relatório:

1. **Pilar 2 — Ofícios específicos** (309A x 442A, encanador, soldador, mecânico, HVAC)
   e **Pilar 3 — Imigração via Trades** (apprenticeship, OWP Stream em detalhe).
2. Os ~10 artigos de cluster de maior intenção comercial (Cluster 1 e 2 do relatório:
   "quanto ganha eletricista no Canadá", "309A x 442A", "checklist de documentos do
   TEA", etc.) — cada um precisa da mesma verificação de fato que fiz para os 3 de hoje.
3. Instalar schema `HowTo` (diferente de `FAQPage`, que já existe) nos guias passo a
   passo — útil especificamente para os artigos de processo.
4. Canal de vídeo/Shorts e presença em comunidades (Facebook, Reddit
   r/ImmigrationCanada) — distribuição, não código.
5. SEO programático por ofício × província — arquitetura nova, maior escopo técnico.
6. **A FAQ da home cita "3 a 6 meses" para o TEA sem fonte** — não é claim do relatório
   nem consegui confirmar na fonte oficial (a STO não publica SLA). Vale decidir se
   suaviza para "sem prazo oficial publicado" como fiz no artigo novo, para as duas
   páginas não se contradizerem.

Recomendo decidirmos o ritmo do restante — cada pilar/cluster novo é uma sessão de
pesquisa + escrita + verificação, e vale eu saber se a prioridade é cobrir os ofícios
não-elétricos (encanador, soldador, HVAC — mencionados no produto mas sem conteúdo
próprio ainda) antes de ir para SEO programático.
