---
name: publicar-tema
description: >
  Orquestra a criação completa de uma peça de conteúdo SEO + redes sociais a partir de um tema.
  Pega um tema (manual ou da estratégia de conteúdo do SEO), escreve o artigo de blog completo,
  gera o carrossel resumo via skill /carrossel, e produz as legendas pra Instagram, Facebook e
  LinkedIn — tudo amarrado, com o carrossel apontando pro blog.
  Use quando o usuário pedir "publicar tema", "gera o conteúdo do tema X", "transforma esse tema
  em post", "cria o conteúdo completo", ou /publicar-tema.
---

# /publicar-tema — Pipeline de conteúdo SEO + redes sociais

Skill orquestradora. Pega um tema → entrega artigo no blog + carrossel + 3 legendas (Insta, FB, LinkedIn), tudo conectado.

## Dependências

- **Estratégia de conteúdo:** `marketing/seo/05-estrategia-conteudo.md` (lista mestra de temas, criada pelo `/seo`)
- **Outras pesquisas SEO:** `marketing/seo/01-pesquisa-demanda.md`, `02-analise-concorrencia.md`, `08-geo-otimizacao-ia.md`
- **Skill carrossel:** `.claude/skills/carrossel/SKILL.md` — usar pra fase do carrossel
- **Site (blog):** `site/` — destino dos artigos. Estrutura comum: Astro em `site/astro-site/src/content/blog/`, ou WordPress, ou outro. Se ainda não tiver site, perguntar antes
- **Tom de voz:** `_memoria/preferencias.md`
- **Contexto:** `_memoria/empresa.md`, `identidade/design-guide.md`

---

## Workflow

### Passo 0 — Escolher o tema e o idioma

Se o usuário passou um tema explícito → usar.

Se não passou nada → ler `marketing/seo/05-estrategia-conteudo.md`, listar os artigos satélite + a página pilar, e perguntar:

> "Qual tema da estratégia? (lista de opções)"

Marcar mentalmente quais já viraram blog (checar pasta do blog) pra não duplicar.

**Idioma:** se não estiver óbvio pela conversa ou pelo tema escolhido, perguntar:

> "Esse artigo é em português, em inglês, ou os dois?"

Se for pra sair nos dois idiomas, tratar como **duas peças separadas** (dois artigos, dois carrosséis, dois jogos de legenda) — nunca uma tradução automática da outra. Escrever cada versão pensando no público daquele idioma: exemplos, termos de busca e referências mudam.

### Passo 1 — Pesquisa rápida

Antes de escrever, ler o que tem nas pesquisas SEO sobre esse tema:
- Keyword principal e variações (`01-pesquisa-demanda.md`)
- Como concorrentes tratam (`02-analise-concorrencia.md`) — pra fugir do óbvio
- Ângulo GEO se aplicável (`08-geo-otimizacao-ia.md`) — perguntas que IAs respondem

### Passo 2 — Escrever o blog post

**Destino:** depende do stack do site. Padrões comuns:
- Astro: `site/astro-site/src/content/blog/<slug>.md`
- WordPress: gerar markdown que o usuário cola no editor
- Outro: confirmar com o usuário

**Slug:** kebab-case curto, sem stopwords. Ex: "Como conservar carne salgada no restaurante" → `conservar-carne-salgada`.

**Frontmatter (se o stack usa markdown com frontmatter):**

```yaml
---
title: "Título atrativo, próximo da keyword"
description: "Meta description 150-160 caracteres, com keyword e benefício pro leitor"
publishedAt: YYYY-MM-DD
updatedAt: YYYY-MM-DD
author: "<nome configurado em _memoria/empresa.md>"
lang: "pt-BR"  # ou "en" — nunca omitir se o site for bilíngue
keywords:
  - keyword principal
  - variação 1
  - variação 2
draft: true
---
```

**Sempre começar com `draft: true`.** O usuário revisa e flipa pra `false` quando aprovar.

**Estrutura do artigo (800-1500 palavras), pensada pra AEO (Google) e GEO (IAs generativas) desde a escrita:**

1. **Lead (1-2 parágrafos):** responder o problema/pergunta central do leitor **direto nas primeiras 1-3 frases** (formato answer-first — sem enrolação antes de entregar a resposta), depois contextualizar
2. **H2 explicativo, em formato de pergunta quando fizer sentido** ("O que é...", "Por que..."): resposta objetiva logo abaixo do heading, detalhamento depois
3. **H2 prático:** como fazer / o que olhar — preferir lista numerada ou tabela quando o conteúdo for passo a passo ou comparação (formatos que engines de busca e IA extraem melhor)
4. **H2 comparativo ou de detalhe técnico** (opcional) — dados concretos (números, certificações, prazos) em vez de afirmação vaga
5. **H2 onde a empresa se encaixa:** conexão natural com o produto, sem ser propaganda
6. **FAQ opcional (2-4 perguntas)** quando o tema tiver dúvidas recorrentes reais — vira candidato a `FAQPage` schema
7. **CTA final:** link WhatsApp / formulário / contato configurado

**Regras de escrita** (seguir `_memoria/preferencias.md` estritamente):
- Sem jargão de marketing/inglês quando o público não usa
- Frases curtas, parágrafos de 2-4 linhas
- Concreto: números, certificações, datas, valores quando souber
- Markdown limpo: `##` pra H2, `###` pra H3, listas com `-`, links em `[texto](url)`
- Nomear a empresa/produto explicitamente pelo menos algumas vezes no texto, não só com pronomes — ajuda IAs a identificar a entidade
- Se o artigo for a versão traduzida/paralela de outro já publicado, adaptar exemplos e termos de busca pro mercado daquele idioma — nunca traduzir ao pé da letra

### Passo 3 — Carrossel resumo

**Sem perguntar, partir direto pra criação do carrossel** chamando `.claude/skills/carrossel/SKILL.md` (tipo 1: carrossel texto puro).

**Pasta:** `marketing/conteudo/<slug-do-blog>-<YYYY-MM-DD>/`

Estrutura de slides do resumo:
- **Slide 1 — capa:** mesmo título do blog (ou variação enxuta)
- **Slides 2-6:** os pontos-chave do blog (1 ideia por slide, frase natural, não bullet seco)
- **Slide final — CTA pro blog:** "Texto completo no nosso blog" + URL `<dominio>/blog/<slug>`

**Capa:** seguir sequência alternada do feed (claro → foto/escuro → cor principal → repete) — checar `marketing/conteudo/` mais recente.

### Passo 4 — Legendas (3 versões)

Salvar todas em `marketing/conteudo/<pasta-do-carrossel>/`:

**`legenda.md`** (Instagram + Facebook — mesmo texto):
- Hook na primeira linha
- 2-3 parágrafos de contexto (frases naturais, sem corporativês)
- CTA pro carrossel ("Arraste pro lado") + CTA pro blog ("Texto completo no link da bio" ou URL direta)
- Bloco oferta da empresa (diferenciais, contato)
- 10-15 hashtags (público + nicho + local)

**`legenda-linkedin.md`** (LinkedIn — mais formal, sem hashtags):
- Hook (pode ser provocativo, profissional)
- 3-5 parágrafos analíticos — LinkedIn aceita texto longo
- Sem "arraste pro lado" (público diferente, comportamento diferente)
- CTA: link direto pro blog
- Sem bloco de oferta agressivo — fechar com 1 linha de quem é a empresa
- Máx 3 hashtags no final, do nicho profissional

### Passo 5 — Checagem rápida de qualidade

Antes de entregar, passar o artigo pelo checklist rápido (sem precisar chamar a skill separada, mas usando o mesmo critério do `/qualidade-conteudo`):

- Lead responde a pergunta central logo nas primeiras frases? (answer-first)
- Tem pelo menos uma lista, tabela ou dado concreto extraível?
- Empresa/produto nomeado explicitamente, não só por pronome?
- `title`/`description` dentro do tamanho ideal e `lang` preenchido no frontmatter?
- Frases curtas, sem jargão fora do tom de `_memoria/preferencias.md`?

Se algo falhar, ajustar antes de seguir pro resumo final — não entregar sabendo que tem furo óbvio.

### Passo 6 — Resumo de entrega

No fim, mostrar pro usuário uma lista clara:

```
✓ Blog post: <caminho>/<slug>.md (draft, lang: <pt-BR|en>)
✓ Carrossel: marketing/conteudo/<pasta>/
  - carrossel.html + render.js
  - PNGs em instagram/
✓ Legendas:
  - legenda.md (Insta + FB)
  - legenda-linkedin.md

Pra publicar:
1. Revisar o blog → flipar draft: false
2. Rebuild do site (se Astro/Hugo/etc) ou copiar pro CMS
3. Renderizar PNGs do carrossel: cd marketing/conteudo/<pasta> && node render.js
4. Postar carrossel no Insta + FB com legenda.md (ou usar /aprovar-post)
5. Postar texto + link no LinkedIn com legenda-linkedin.md

Se quiser uma auditoria mais a fundo de qualidade/AEO nesse artigo antes de publicar, rodar /qualidade-conteudo.
```

---

## Quando NÃO usar essa skill

- Pedido de carrossel avulso (sem blog) → usar `/carrossel` direto
- Atualização de artigo existente → editar direto o .md
- Post único, frase de impacto → `/carrossel`

## Princípios

1. **Blog é a peça-mãe.** Carrossel e legendas são derivados dele, não o contrário.
2. **Tudo conectado.** Cada peça referencia a outra (carrossel linka pro blog, blog tem CTA pro contato).
3. **Draft sempre.** Nunca publicar automaticamente — usuário revisa antes (ou usa `/aprovar-post`).
4. **Linguagem do público real.** Sem corporativês. Sempre.
5. **Bilíngue não é tradução.** PT e EN são peças pensadas cada uma pro seu mercado, nunca uma cópia mecânica da outra.
