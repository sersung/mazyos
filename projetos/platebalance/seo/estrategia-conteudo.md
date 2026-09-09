# SEO — PlateBalance

Idioma único: **inglês (EN-CA)**. Nenhum termo em português entra na pesquisa
deste projeto — volume, concorrência e intenção são outros.

---

## Clusters e estado

| Cluster | Página-âncora | Publicado | Fila |
| --- | --- | --- | --- |
| Balanced plate | `/guides/how-to-build-a-balanced-plate/` | 2 | 4 |
| High protein | `/tools/protein-calculator/` | 2 | 4 |
| Meal prep | `/guides/high-protein-meal-prep-5-days/` | 2 | 3 |
| Budget meals | `/guides/best-high-protein-foods-per-dollar/` | 3 | 3 |
| Shift work | `/guides/meal-prep-for-physical-jobs/` | 3 | 2 |
| Cultural plates | `/guides/brazilian-balanced-plate/` | 1 | 4 |
| Gear (comercial) | `/guides/meal-prep-containers-and-cooler-bags/` | 1 | 2 |
| Ferramentas | `/tools/plate-builder/` | 3 | 2 |

**16 pilares no ar.** Cada arquivo declara sua `targetKeyword` no frontmatter —
é o que impede duas páginas de brigarem pelo mesmo termo. Antes de escrever
qualquer guia novo, conferir se o termo já está tomado:

```bash
grep -h targetKeyword src/content/articles/*.md
```

## Fila dos próximos 17 (do relatório de estratégia)

**Balanced plate:** balanced plate for weight loss · balanced plate for muscle
gain · balanced plate for kids · balanced plate for diabetes (cuidado redobrado
com alegação médica neste)

**High protein:** high-protein breakfast ideas · cheap high-protein meals ·
protein meal plan Canada · high-protein lactose-free meal prep

**Budget:** healthy meals under CAD 5 · budget grocery list for students ·
cheap healthy family meals

**Shift work:** meal prep for night shift · what to eat on a 12-hour shift

**Cultural:** Indian high-protein vegetarian meal prep · Latin meal prep on a
budget · Filipino balanced plate · West African balanced plate

## AEO / GEO — aparecer em resposta direta e em IA

Já implementado em toda página:

- Bloco **"Short answer"** de 40–55 palavras logo abaixo do H1 — o formato que o
  Google extrai como featured snippet e que as IAs citam.
- **FAQPage schema** gerado a partir do frontmatter, sem duplicação manual.
- **Article + BreadcrumbList + Organization + WebSite** em `@graph` único.
- **SoftwareApplication** nas três ferramentas.
- `robots.txt` liberando GPTBot, PerplexityBot, ClaudeBot e Google-Extended —
  bloquear esses crawlers é abrir mão de citação em IA, que é justamente o
  canal que este site pode ganhar cedo.

## O que falta (não bloqueia lançamento, bloqueia tráfego)

1. Search Console verificado + sitemap enviado
2. Bing Webmaster (importa do GSC; alimenta parte das respostas do ChatGPT)
3. Análise de concorrência real com WebSearch/WebFetch — a skill `/seo` passo 2
   ainda não rodou pra este projeto, foi feita a partir do relatório do Renan
4. Google Ads: só faz sentido depois que o orgânico mostrar quais páginas
   convertem pra newsletter

## Métrica que importa nos primeiros 90 dias

Não é posição no Google — é **página indexada e impressão no Search Console**.
Site novo em nicho YMYL passa por um período de avaliação. O sinal de que está
funcionando é impressão subindo em cauda longa, não posição 1 em termo curto.
