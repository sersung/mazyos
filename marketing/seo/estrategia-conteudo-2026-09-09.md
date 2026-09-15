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

## Rodada 2 — 2026-09-15: Cluster 2 (Ofícios específicos)

Retomei o backlog via a skill `/seo` (Passo 5, continuação — Passo 0-2 já feitos na
rodada anterior). Fechei os itens 1, 3 e 6 da lista de pendências:

### Três artigos novos, verificados

- **`/artigos/309a-x-442a-diferenca-licenca-eletricista`** (Pilar 2) — tabela
  comparativa: escopo de trabalho, obrigatoriedade, renovação. Confirmado: 309A é
  compulsório (canteiro de obras, renovação anual $60+HST) e 442A não é
  (industrial, sem renovação).
- **`/artigos/quanto-ganha-eletricista-no-canada-2026`** — resolve a divergência de
  salário que ficou como *caveat* aberto no relatório original (mediana $34/hora do
  Job Bank do governo federal vs. média $50,92/hora da CTAO). Confirmei os dois
  números na fonte e expliquei a diferença de metodologia (mediana de todo o NOC
  72200 vs. média só de journeypersons 309A licenciados) — nenhum concorrente do
  nicho faz essa transparência.
- **`/artigos/encanador-plumber-canada-como-validar`** — primeiro ofício fora da
  elétrica: plumber (NOC 72300), compulsório, 9.000h (8.280 trabalho + 720 escola),
  mediana $32,50/hora (Job Bank). Reusa o processo do TEA já publicado.

Título 43-49 caracteres, description 150-163, schema `BlogPosting` + `FAQPage` em
todos, fonte oficial linkada (Job Bank do Governo do Canadá nos dois artigos de
salário — fortalece ainda mais a Authoritativeness).

### Schema `HowTo` instalado

`Artigo` ganhou o campo opcional `howTo` (nome + lista de passos em texto puro, sem
HTML — é o que o schema HowTo exige). Aplicado no pilar TEA, que já tinha os 7 passos
em lista numerada — reuso direto, zero conteúdo novo escrito só pra alimentar schema.
Qualquer artigo futuro de processo usa o mesmo campo.

### Ligação pilar ↔ cluster nos dois sentidos

Antes, os artigos linkavam *para* o pilar TEA mas o pilar não apontava de volta pros
clusters. Adicionei seção "O TEA por ofício" no pilar, linkando os 3 artigos novos —
fecha o padrão de arquitetura que o relatório pede (pilar central, satélites
interligados nos dois sentidos, não só satélite → pilar).

### Vitrine da home atualizada

`SLUGS_RELACIONADOS` trocou "custo de vida" e "profissões em alta" (genéricos) por
"quanto ganha eletricista" e "309A x 442A" — mais específicos pro comprador que já
está avaliando o produto. Confirmado por screenshot: os 3 artigos mais recentes +
salário + licenças + erros comuns, nessa ordem.

### FAQ da home corrigida

O "3 a 6 meses" pro TEA que ficou pendente na rodada anterior foi trocado por texto
honesto: a STO não publica prazo oficial, e o motivo (depende da resposta das
referências e da completude da documentação) — mesma redação do artigo novo. As duas
páginas não se contradizem mais.

**Total do site agora: 16 artigos** (13 + 3), todos aparecendo na listagem `/artigos`
e no `sitemap.xml`, zero link quebrado (checado com Playwright em todas as páginas
novas).

---

## Rodada 3 — 2026-09-15 (continuação): soldador, mecânico, HVAC

Mesmo dia, segunda leva — completei os 3 ofícios que tinha sugerido como próximo
passo. Cada um verificado contra Job Bank do Governo do Canadá e Skilled Trades
Ontario antes de publicar.

### Três artigos novos

- **`/artigos/soldador-no-canada-salario-como-validar`** — o achado mais importante
  desta leva: **welding não é ofício compulsório em Ontário** (é em Alberta). Isso
  muda o argumento de venda — não dá pra dizer "você precisa validar por lei" pra
  esse público, o enquadramento certo é custo-benefício por empregador-alvo. NOC
  72106, 6.000h (5.280 trabalho + 720 escola), mediana $28,00/hora — a mais baixa
  dos ofícios cobertos.
- **`/artigos/mecanico-automotivo-canada-validacao`** — Automotive Service
  Technician (NOC 72410), compulsório, 7.220h (6.500 + 720). **Não consegui
  confirmar a mediana oficial isolada do Job Bank** nas buscas (só o range
  $18,75–$43,27/hora) — documentei isso explicitamente no artigo em vez de inventar
  um número, com link direto pro Job Bank pra quem quiser conferir.
- **`/artigos/hvac-canada-como-validar-refrigeracao`** — Refrigeration and Air
  Conditioning Systems Mechanic (NOC 72402), compulsório, 9.000h (8.280 + 720),
  mediana **$37,00/hora — a mais alta entre todos os ofícios cobertos no site**,
  acima até do eletricista. Virou uma tabela comparativa de mediana salarial entre
  os 4 ofícios com dado confirmado, linkando os 4 artigos entre si.

### Pilar TEA agora linka os 6 clusters

A seção "O TEA por ofício" no pilar passou de 3 pra 6 links — cobre agora todos os
ofícios mencionados no "para quem" da landing page (eletricista, encanador,
soldador, mecânico, carpinteiro fica de fora ainda, HVAC).

**Total do site agora: 19 artigos**, verificado sem link quebrado.

---

## Rodada 4 — 2026-09-22: carpinteiro + os 3 artigos de processo

Fechei os dois itens que ficaram no topo da lista de pendências. Com isso, o
Cluster 1+2 do relatório original de SEO está essencialmente completo.

### Carpinteiro — mesma pegadinha do soldador, resolvida com cuidado extra

Na primeira busca sobre o status do carpinteiro, achei **resultados
contraditórios**: uma busca disse "compulsório em Ontário", outra disse
"voluntário em todo lugar exceto Quebec". Não publiquei nenhum dos dois até
resolver — uma terceira busca, mais específica (checando diretamente a lista
oficial dos 23 ofícios compulsórios de Ontário), confirmou: **General
Carpenter é voluntário em Ontário** (código 403A, NOC 72310), mesmo status do
soldador. Duas buscas independentes e mais direcionadas depois, sem
contradição. Vale registrar esse padrão: quando duas fontes se contradizem
numa claim de "compulsório ou não" — que tem consequência prática real pra
quem lê — o certo é aprofundar a verificação antes de publicar, não escolher
a resposta que parece mais plausível.

- **`/artigos/carpinteiro-no-canada-oficio-voluntario`** — 7.200h (6.480+720),
  range Job Bank $22-$48/hora (mediana isolada não encontrada nas buscas
  disponíveis, mesma situação do mecânico — documentado como tal no artigo).

### Os 3 artigos de processo — a parte que mais gera dúvida real

Esses não dependiam de fato regulatório novo, mas de traduzir com cuidado o
que a Skilled Trades Ontario já exige oficialmente, sem inventar estatística
que não existe:

- **`/artigos/checklist-documentos-tea-eletricista`** — schema `HowTo` (7
  passos). O achado mais útil da pesquisa: a STO só aceita referência de quem
  **praticou o ofício**, não de supervisor/gerente que nunca exerceu trabalho
  manual — detalhe que não estava em nenhum artigo anterior do site e que é
  provavelmente a causa mais comum de aplicação travada.
- **`/artigos/erros-que-reprovam-no-tea`** — deliberadamente **não** inventa
  taxa de reprovação (a STO não publica isso, e nenhum site sério deveria
  fingir que sabe). Em vez disso, traduz os requisitos oficiais da
  verificação de experiência em erros concretos e evitáveis, e documenta o
  processo formal de **reassessment** ($100 + HST, exige evidência nova) —
  informação que a página do pilar TEA tinha só como "existem rotas de
  reconsideração", vago. Atualizei o pilar com o dado específico.
- **`/artigos/quanto-tempo-demora-certificacao-oficio-canada`** — inclui uma
  seção específica desmontando o "3 a 6 meses" que circula em blogs sem fonte
  (a mesma claim que eu já tinha tirado da FAQ da home na Rodada 1). Em vez de
  dar um número, explica o que de fato controla a velocidade de cada etapa.

### Pilar TEA totalmente interligado

A seção de ofícios foi de 6 para 7 links (+ carpinteiro), e ganhou uma nova
seção "Documentação, erros comuns e prazos" com os 3 artigos de processo. Os
3 artigos de processo linkam entre si e de volta pro pilar. Vitrine da home
trocada: saíram os 2 artigos de notícia (OINP, Express Entry — mais datados)
e o "erros comuns" genérico, entraram os 3 artigos de processo — a home agora
mostra um funil coerente: TEA → salário → licenças → checklist → erros →
prazo.

**Total do site agora: 23 artigos**, verificado com Playwright sem link
quebrado, todos os schemas validando como JSON.

---

## O que ainda fica pendente

1. **Pilar 3 — Imigração via Trades** (apprenticeship em detalhe, OWP Stream
   aprofundado além do artigo de notícia) — não comecei.
2. **Confirmar a mediana oficial de Automotive Service Technician e de
   General Carpenter** direto no Job Bank quando o WebFetch nesses domínios
   estiver liberado — os dois artigos hoje só têm o range, documentado como
   tal.
3. Canal de vídeo/Shorts e presença em comunidades — distribuição, não
   código.
4. SEO programático por ofício × província — arquitetura nova, maior escopo
   técnico.

Com o Cluster 1+2 fechado (todos os ofícios do "para quem" da landing têm
conteúdo próprio, mais os 3 artigos de processo), o próximo passo natural do
relatório original é o Pilar 3. É mais trabalho de síntese que de fato novo
— a maior parte do material (OWP Stream, Express Entry, CRS) já foi
verificada nas rodadas anteriores; falta consolidar num pilar único e
aprofundado, com o passo a passo prático de apprenticeship que ainda não foi
coberto em nenhum artigo.
