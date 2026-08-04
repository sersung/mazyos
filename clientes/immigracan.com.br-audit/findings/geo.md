# GEO / AI-Search-Readiness Audit — immigracan.com.br

Audited: 2026-07-23
Scope: robots.txt, llms.txt, structured data, passage-level citability, technical (SSR/CSR) accessibility, and brand/entity authority signals for AI answer engines (ChatGPT/OAI-SearchBot, Google AI Overviews, Perplexity, Bing Copilot, Claude).

## GEO Health Score: 43 / 100

| Dimension | Weight | Score (0-100) | Weighted |
|---|---|---|---|
| Citability | 25% | 45 | 11.3 |
| Structural Readability | 20% | 40 | 8.0 |
| Multi-Modal Content | 15% | 35 | 5.3 |
| Authority & Brand Signals | 20% | 20 | 4.0 |
| Technical Accessibility | 20% | 70 | 14.0 |
| **Total** | | | **~43** |

Technical accessibility is the strongest dimension (robots.txt is genuinely open, most templated pages are server-rendered), but Authority/Brand and Multi-Modal are very weak, and a rendering gap on specific routes (starting with `/faq`) is a critical, fixable bug rather than an architectural limitation.

---

## AI Crawler Access Status

`https://immigracan.com.br/robots.txt` (verified live):

```
User-agent: *
Allow: /
Disallow: /painel /cofre /parceiro /admin /checkout /obrigado /login
          /cadastro /wizard /resultados /quiz/resultado /auth/ /api/db/
          /api/auth/ /api/vault/ ...

# Bloqueio de bots de conteúdo IA (evita treinamento sem retorno)
# Descomente se quiser bloquear:
# User-agent: GPTBot
# Disallow: /
# User-agent: ChatGPT-User
# Disallow: /
# User-agent: anthropic-ai
# Disallow: /
# User-agent: CCBot
# Disallow: /
```

| Crawler | Status | Notes |
|---|---|---|
| GPTBot | **Allowed** | Covered by wildcard `Allow: /`; block rule present but commented out |
| OAI-SearchBot | **Allowed** | Not referenced anywhere in the file (allowed by default) |
| ChatGPT-User | **Allowed** | Block rule present but commented out — see risk note below |
| ClaudeBot | **Allowed** | Not referenced anywhere in the file (allowed by default) |
| PerplexityBot | **Allowed** | Not referenced anywhere in the file (allowed by default) |
| CCBot | **Allowed** | Block rule present but commented out |
| anthropic-ai | **Allowed** | Block rule present but commented out |

**Finding (Medium): commented-out blocks are an accidental-flip risk, and the specific bot list is stale/incomplete.**
The file currently allows everything, which is correct for AI visibility today. But the dormant `# Disallow: /` blocks only cover `GPTBot`, `ChatGPT-User`, `anthropic-ai`, `CCBot` — they do **not** include `ClaudeBot`, `OAI-SearchBot`, or `PerplexityBot`. Two problems:
1. Any future dev who "cleans up" this file by uncommenting the block section will silently kill ChatGPT's ability to fetch/browse the site on user request (`ChatGPT-User` is a real-time, user-triggered fetcher, not just a training crawler — blocking it breaks link-preview/browsing use cases, not just training).
2. The block list gives a false sense of "blocking AI" — it would leave ClaudeBot, OAI-SearchBot and PerplexityBot completely untouched, so if the intent is ever "block all AI," this list is incomplete.
Recommendation: either delete the commented block entirely (since the decision is "stay open," a stray commented block is dead weight and a footgun) or replace it with a single clearly-labeled, dated comment stating the deliberate decision to allow all AI crawlers for visibility, with a link to whoever owns this decision. Effort: trivial (5 min).

---

## llms.txt Status: **Missing — and effectively unverifiable by naive checks**

**Finding (Critical): the entire site has no real 404 — every unknown path silently 200s with homepage HTML, which disguises the fact that llms.txt does not exist.**

Verified: `GET /llms.txt`, `GET /rsl.xml`, `GET /license.xml`, `GET /ai.txt`, `GET /this-page-does-not-exist-xyz123`, and `GET /faq` (see below) all return **HTTP 200**, `Content-Type: text/html`, and are **byte-for-byte identical** (same MD5 hash) to the homepage's HTML, including `<meta name="robots" content="index, follow">`. There is no dedicated `/llms.txt` file — the app's SPA catch-all route is serving the homepage shell for literally any unmatched path instead of a proper 404 or a real llms.txt.

Impact:
- A simple automated "does llms.txt exist? check for 200" script will falsely report success. It does not exist.
- Because every non-existent URL is indexable (200 + `index, follow`), the site is exposed to unbounded soft-404 duplicate-content surface — any malformed/guessed/broken link (internal typo, stale backlink, scraper artifact) becomes an indexable "page" that duplicates the homepage. This dilutes topical authority signals AI engines and Google use to understand which URL is canonical for which content, and can waste crawler budget for all bots including the AI crawlers this audit is trying to attract.
- No RSL 1.0 (Really Simple Licensing) file present either — same caveat, can't be distinguished from "missing" via a plain status-code check, but content confirms it does not exist.

**Recommendations:**
1. (Critical, ~1 hr) Fix the catch-all route to return a real `404` status for unmatched paths (keep the friendly HTML fallback if desired, but with `HTTP 404` and `<meta name="robots" content="noindex">`), rather than 200 + index,follow.
2. (High, ~2-4 hrs) Create a real `/llms.txt` at the root. Given the site's structure, a good llms.txt should list: the ~150+ templated content hubs (`/programas`, `/buscador-noc` + NOC pattern, `/pnp`, `/imigrar-como`, `/custo-de-vida`, `/express-entry/draws`), the blog, and explicitly separate "interactive tools" (quiz/calculators) from "reference content" so LLM crawlers know where the citable facts live vs. where the personalization tools are (which they can't usefully crawl).
3. (Medium, ~1 hr) Decide on RSL 1.0 licensing intentionally (allow reuse with attribution vs. restrict commercial reuse) and publish `/rsl.xml`, rather than leaving it undecided-by-omission.

---

## FAQPage Schema vs. Visible Content — Correction to Initial Assumption

The brief's assumption was that homepage FAQPage JSON-LD (2 Q&As) "maps to genuinely visible on-page FAQ content." **This is not what was found on direct verification.**

**Finding (Critical): homepage FAQPage schema has zero matching visible text.**
The homepage's `<script type="application/ld+json">` FAQPage block asks "O que é o ImmigraCan?" and "O quiz de elegibilidade é gratuito?" — but grepping the rendered homepage body for either question string returns **zero matches outside the `<script>` tag**. The visible homepage content is about "O que é imigração e como ela funciona" (a different topic — general immigration definitions), not "what is ImmigraCan" or quiz pricing. This is a textbook schema/content mismatch:
- Google's structured-data guidelines require FAQPage markup to match visible, user-facing Q&A content; mismatches risk rich-result demotion or manual action.
- For AI answer engines specifically, this is worse than having no schema at all: the "answer" text in the JSON-LD isn't grounded in extractable page copy, so it can't be verified/quoted from the rendered page, and looks like a manipulation signal to any quality classifier that cross-checks schema against content.
Fix (High, ~1-2 hrs): either add a real, visible 2-question FAQ block to the homepage matching the schema text, or move/delete this specific FAQPage block from the homepage (the real, comprehensive FAQ content lives on `/faq` — see below).

**Finding (Positive, worth preserving): the ~150+ templated pages (NOC, PNP, "imigrar como") DO have genuine, well-matched FAQPage + BreadcrumbList schema.**
Verified on `/noc/30010`, `/noc/31100`, `/pnp/ontario`, `/pnp/quebec`, `/pnp/british-columbia`, `/imigrar-como/eletricista`: each carries a page-specific `FAQPage` block with 2-3 questions phrased as real questions (e.g. "Como imigrar para o Canadá como Eletricista?", "Qual o código NOC de médico especialista clínico?"), whose answer text substantially overlaps with the visible body copy, plus a `BreadcrumbList` schema. This is good practice and should be the template for the rest of the site (see gaps below).

**Finding (Medium): FAQPage + BreadcrumbList schema coverage is inconsistent across templated categories.** `/custo-de-vida/*` pages have a FAQPage block but **no BreadcrumbList**. `/programas` (index), `/programas/:slug` (detail), blog listing, and blog article pages have **zero JSON-LD Q&A or breadcrumb schema at all** (blog articles only carry `Article` schema). Recommendation: extend the NOC/PNP/imigrar-como pattern (FAQPage + BreadcrumbList, matched to visible text) to every templated category for consistency. Effort: Medium (shared component, ~1-2 days engineering).

**Finding (Low/Medium — data-quality bug found in schema text, affects trust): duplicated/empty template fields.**
- NOC pages: the TEER description is duplicated verbatim in the FAQ answer text — e.g. `"classificado como TEER 0 — TEER 0 — Ocupações de gestão"` and `"TEER 1 — TEER 1 — Requer diploma universitário"` (confirmed on both `/noc/30010` and `/noc/31100`, so likely all 86 NOC pages). This reads as a templating/string-concatenation bug, not copy — worth fixing since malformed, robotic-looking answer text undermines the "authoritative, human-vetted" quality signal AI quality filters look for.
- `/pnp/ontario`: the FAQ answer for "Quais setores estão em alta em Ontário?" ends with a dangling empty field: `"Categorias no PNP: ."` — confirmed this happens specifically because Ontario's OINP was marked revoked, and the categories lookup returns empty without a fallback (compare `/pnp/quebec` and `/pnp/british-columbia`, which populate this field correctly). Likely affects any other province whose PNP is paused/revoked. Fix: add a fallback string ("Nenhuma categoria ativa no momento") when the dynamic field is empty. Effort: Low (~1 hr).

**Finding (Medium): duplicate/unscoped FAQPage schema injected on every route by a global layout component.**
Rendering `/faq` through a JS-executing renderer shows **two separate `FAQPage` JSON-LD blocks** on the same page: the page-specific comprehensive FAQ block (~9.9KB, many real Q&As) *and* the generic homepage 2-question block (710 bytes) that shouldn't be there. This confirms the mismatched homepage FAQPage schema is emitted by a shared/global component rather than being scoped per-route, and is duplicating onto pages where it doesn't belong. Recommendation: scope FAQPage schema injection to the specific page component that owns the matching visible content; do not render it in a global layout/header. Effort: Low-Medium (~2-4 hrs, one component fix cascades everywhere).

---

## Critical Technical Accessibility Finding: `/faq` (and any unmapped route) is invisible to non-JS AI crawlers

This is the single highest-impact fix in this audit.

**What a plain HTTP fetch sees (what GPTBot/ClaudeBot/PerplexityBot/OAI-SearchBot see, since none of them execute JavaScript):**
`GET /faq` returns HTTP 200 with the **homepage's** title (`Como Morar no Canadá em 2026 – Imigração para Brasileiros`), the homepage's H1, and the homepage's body text about general immigration paths. There is no FAQ content whatsoever in this response — confirmed byte-identical (MD5 match) to the homepage and to a deliberately-invented nonexistent URL.

**What a JS-rendering crawler (e.g., Googlebot's second wave) sees:**
Rendering `/faq` with a headless browser produces a completely different, correct page: title `FAQ — Perguntas Frequentes sobre Imigração para o Canadá | ImmigraCan`, with real, extensive Q&A content organized into sections — Começando, Express Entry, PNPs, Documentos e processo, Custo de vida e trabalho, and **Sobre o ImmigraCan** (an About-style section that is one of the only entity-identity signals found anywhere on the site) — plus a substantial (~9.9KB) FAQPage JSON-LD block and a BreadcrumbList.

**Why this matters:** unlike NOC/PNP/imigrar-como/program/blog/quiz/calculator/contato/precos pages — which are genuinely server-rendered per-route and are correctly visible to non-JS fetchers (verified directly) — `/faq` appears to simply be missing from whatever static-route/prerender list the build uses, so it falls through to the generic catch-all. This is a narrow, fixable bug, not a site-wide CSR limitation. But it means:
1. The single richest Q&A resource on the site — exactly the content format (direct question → direct answer) that AI answer engines are most likely to lift and cite — is completely absent from what every major AI crawler actually retrieves.
2. Because the URL 200s with unrelated (homepage) content instead of erroring, this also actively pollutes AI engines' and Google's model of what `/faq` "is" — they may associate the URL with the homepage's topic, not FAQ topics, or discount it as a duplicate.
3. The "Sobre o ImmigraCan" entity-identity content living inside this JS-only section is also invisible to text-based crawlers — worsening the Authority gap below.

**Recommendation (Critical, ~2-8 hrs depending on how the prerender pipeline is configured):** add `/faq` to the same static-generation/prerender path used for `/programas`, `/contato`, `/precos`, `/quiz`, and the calculator pages. Then audit the full route list against the sitemap to make sure no other page silently falls back to the homepage shell (recommend automated diffing: for every sitemap URL, fetch raw HTML and confirm the `<title>` matches the sitemap entry's expected page, flagging any that match the homepage's title as false positives).

---

## Citability Assessment (passage length, directness, extractability)

| Page type | Approx. body word count | Direct-answer-first? | Question-phrased headings? | Assessment |
|---|---|---|---|---|
| Homepage | ~230 words | Yes (bolded lead sentence) | No (statement headings) | Reasonable length but topic mismatch vs. FAQ schema (see above) |
| Blog article (`o-que-e-imigracao-guia-completo`) | ~950 words across many H2/H3 sections | Yes, each section leads with a definition | No — all headings are statements ("O que é imigração?", "Significado do termo") not phrased as user questions | Good depth; the H2s are already close to question form and could be lightly rephrased |
| NOC pages (e.g. `/noc/30010`) | ~30-90 words total | Yes, single dense sentence | No | **Below the 134-167 word optimum** — very terse; extractable but thin |
| PNP pages (e.g. `/pnp/ontario`) | ~120-150 words | Yes | No | Close to optimal length; good direct-answer lead paragraph |
| "Imigrar como" pages (e.g. `/imigrar-como/eletricista`) | ~140-160 words | Yes | No (statement H2s: "Código NOC e classificação", "Salário médio") | **Near-optimal length**, good structure, easiest template to upgrade to question-headings |
| Custo-de-vida pages (e.g. `/custo-de-vida/toronto`) | ~50-60 words | Yes | No | **Well below optimum** — thinnest template on the site; risk of being seen as low-value/thin programmatic content |
| Calculator/quiz explainer copy (`/calculadora-crs`, `/quiz`) | ~120-140 words each | Yes | No | Good — see next section |

**Finding (High): none of the ~150+ templated pages use question-phrased H2/H3 headings**, despite this being one of the strongest, cheapest citability levers (AI answer engines semantically match a user's question to a heading phrased the same way). Every category currently uses statement-style headings ("Elegibilidade no Express Entry," "Código NOC e classificação," "Principais custos mensais"). Recommendation (High priority, Low-Medium effort): rewrite heading templates to question form — e.g. "Gerente de serviços de saúde (NOC 30010) é elegível para o Express Entry?", "Quanto custa morar em Toronto em 2026?", "Como faço para aplicar ao Family Sponsorship?" This is a template-level change (one edit per category cascades to all ~150 pages) and directly reuses text that mostly already exists in the FAQPage schema's `Question.name` fields noted above — i.e., the question phrasing has already been written for the schema, it just needs to be surfaced as a visible heading too, which would also resolve most of the schema/visible-content matching gaps noted above in one move.

**Finding (Medium): NOC and custo-de-vida templates are meaningfully under the 134-167 word citability sweet spot.** These are the two largest template categories (86 NOC pages + 16 city pages = 102 of ~150 templated URLs). Recommendation: expand each with 1-2 additional sentences of context (e.g., for NOC: what the occupation actually does day-to-day, typical requirements; for custo-de-vida: rent/transit/groceries breakdown, comparison to a Brazilian city) to reach a fuller, more self-contained, more citable passage — without diluting the direct-answer-first sentence that should remain first.

**Finding (Medium): specific statistics lack source attribution on templated pages.** Salary figures (e.g., "CAD 78.000/ano" for eletricista), cost-of-living figures (Toronto CAD 3450/month), and CRS cutoff ranges appear as bare assertions with no cited source (no "according to Statistics Canada," no link to IRCC/Job Bank/Numbeo, etc.), unlike the program detail pages which do link out to the official canada.ca page. Direct government/statistical source citation is a specific citability signal (and an E-E-A-T signal) that's inconsistently applied. Recommendation: add a visible "Fonte: [name]" line + link wherever a specific number is stated, at minimum for salary and cost-of-living figures.

**Finding (Medium): a freshness claim contradicted by live data.** `/express-entry/draws` states the page "é atualizada automaticamente a cada 12 horas com os dados oficiais" (updates automatically every 12 hours). The underlying `api/functions/draws-stats` endpoint's `latest_draw.draw_date` returned `2026-06-04` against an audit date of 2026-07-23 — roughly 7 weeks stale relative to the claimed 12-hour cadence. This `Dataset` schema block also has no `dateModified`/`temporalCoverage` property for AI systems to independently verify freshness. Recommendation: either fix the update job, or soften the on-page freshness claim to match actual update cadence, and add `dateModified` to the Dataset schema. A "we said daily/12h but it's actually weeks old" pattern is exactly the kind of claim that erodes an AI engine's or Google's trust in a domain's other freshness-sensitive assertions (e.g., "OINP revogado em 30 de maio de 2026").

**Finding (Positive): calculators/quiz pages already carry solid standalone declarative content**, directly answering the brief's open question about whether static, citable text exists alongside the interactive tools. `/calculadora-crs` and `/quiz` both open with a ~120-140 word, direct, self-contained paragraph explaining what CRS is, its 0-1200 scale, current draw cut-off ranges, and what factors are scored — genuinely citable material independent of the interactive calculator itself. This pattern should be treated as the template to replicate/expand elsewhere (e.g., it's the kind of explainer that's currently missing a "how NOC/TEER classification works" or "how PNP nomination adds CRS points" equivalent as a standalone page).

---

## Authority & Brand / Entity Signals

**Finding (Critical for entity establishment): no Organization schema anywhere on the site, and no sameAs / social profile links found on any page.**
Searched all fetched pages (homepage, program pages, NOC/PNP/imigrar-como/custo-de-vida templates, blog listing/article, contato, precos, faq) for LinkedIn, Instagram, Facebook, X/Twitter, YouTube, or Wikipedia URLs — **zero matches**. The only social reference anywhere is a bare `twitter:site` meta tag value (`@ImmigraCan`) with no corresponding link to a live, verifiable account. Blog articles carry `author: {"@type":"Organization","name":"ImmigraCan"}` but this Organization is never itself defined anywhere on the site (no separate `Organization` JSON-LD with `logo`, `sameAs`, `foundingDate`, address, etc.), and the referenced `logo` is just `favicon.ico` — below Google's recommended logo resolution and not a real branded asset.

Given this audit's own brand-mention correlation table (YouTube ~0.737, Reddit high, Wikipedia high, Domain Rating only ~0.266), the near-total absence of any externally-verifiable entity presence is the single biggest structural obstacle to AI engines treating "ImmigraCan" as a recognized, citable brand rather than an anonymous domain. An LLM asked "what is ImmigraCan / is it trustworthy" today has almost nothing to corroborate it with beyond the site's own text.

**Recommendations (High priority, effort varies):**
1. (Low, ~1 hr) Add a site-wide `Organization` JSON-LD block (on homepage at minimum, ideally referenced via `publisher`/`author` on every page) with `sameAs` pointing to every real, live social/profile account the business actually controls (even if follower count is low — presence matters more than scale for entity graph purposes).
2. (Medium) Publish a real `/sobre` (About) page as static/SSR HTML — not buried inside the JS-only `/faq` page's "Sobre o ImmigraCan" section — including founding info, what ImmigraCan is/isn't (not affiliated with IRCC — this disclaimer already exists on blog posts and should be prominent site-wide), and, ideally, named contributors/reviewers.
3. (Medium-High, ongoing) Pursue at minimum a YouTube channel (highest correlation with AI citation in the provided data) with short explainer videos derived from existing blog/FAQ content, and active participation in relevant Reddit communities (r/ImmigrationCanada, r/braziliansincanada-style communities) — both far higher-leverage than backlink/DR-building given the weak 0.266 correlation for Domain Rating.
4. (Low) Add a named author with a visible bio/credential (even if "reviewed by [name], RCIC" is not accurate today, at minimum attribute content to a real content lead rather than only "ImmigraCan" as Organization) — particularly important for YMYL-adjacent immigration content where E-E-A-T and AI-engine trust weighting overlap significantly.

**Finding (Low): only 2 of the ~150+ templated pages types (blog, homepage) carry any date signal; NOC/PNP/imigrar-como/custo-de-vida/program pages have no visible "last updated" date and no `dateModified` in schema**, despite several of them containing clearly time-sensitive claims (PNP program status, salary figures, draw cutoffs). Recommendation: add a visible "Dados atualizados em: [date]" line plus `dateModified` to the FAQPage/WebPage schema on every templated category — cheap, and directly supports the freshness signal AI engines weight heavily for time-sensitive immigration content.

---

## Multi-Modal Content

- Blog articles include a single hero image per post (`og:image` reused as in-body `<img>`), with reasonable `alt` text describing the article topic — acceptable but minimal.
- No video content, no embedded data visualizations/charts (despite having genuinely chartable data — CRS cutoffs over time, cost-of-living comparisons across 16 cities), no downloadable/structured tables beyond the sitemap's implied city/NOC lists.
- The `Dataset` schema on `/express-entry/draws` is a good, underused pattern (structured, machine-readable draw history) — worth expanding to other numeric datasets (cost-of-living table, NOC salary table) as `Dataset`/`Table` schema, which materially helps both AI Overviews and direct API-style consumption.
- Recommendation (Medium effort): add at least one simple, static (server-rendered, not canvas/JS-chart-only) comparison table per major hub page — e.g., a real HTML `<table>` of CRS cutoffs by category, or cost-of-living by city — since HTML tables are directly extractable by AI crawlers where JS-rendered charts are not.

---

## Platform-Specific Assessment (qualitative, based on retrieval mechanics)

| Platform | Est. visibility | Reasoning |
|---|---|---|
| Google AI Overviews | Fair | Google renders JS (2-wave indexing), so it likely does eventually see `/faq`'s real content and the JSON-LD despite the SSR gap — but the FAQPage/homepage mismatch risks rich-result suppression, and the soft-404 pattern wastes crawl budget. |
| ChatGPT / OAI-SearchBot | Weak-Fair | No JS execution — sees homepage duplicate at `/faq`, thin NOC/custo-de-vida passages, and no entity corroboration (no Organization schema, no sameAs). Templated NOC/PNP/imigrar-como pages with real FAQPage schema are the strongest asset here today. |
| Perplexity | Weak-Fair | Same JS limitation as ChatGPT; Perplexity also weights citation/source density and freshness, both currently weak (bare stats, stale "12h updated" claim). |
| Bing Copilot | Fair | Benefits from Bing's own indexing of the JS-rendered version (similar to Google), somewhat mitigating the SSR gap, but same schema-mismatch and thin-content issues apply. |

---

## Top 5 Highest-Impact Changes

1. **[Critical, ~2-8 hrs] Fix `/faq` to be server-rendered/prerendered like the other static routes**, and audit the full sitemap for any other URL silently falling back to the homepage shell. This single fix restores visibility of the site's richest, most citable Q&A content to every non-JS-executing AI crawler.
2. **[Critical, ~1 hr] Turn the universal soft-200 catch-all into a real 404 (`noindex`)**, which also resolves the "llms.txt appears to exist but doesn't" false-positive and shrinks the site's indexable duplicate-content surface.
3. **[High, ~1-2 hrs] Fix the homepage FAQPage schema/visible-content mismatch** (either add matching visible Q&A text or remove/relocate the block), and stop the global layout component from double-injecting FAQPage schema onto unrelated routes.
4. **[High, template-level, ~1-3 days cascades to ~150 pages] Rewrite NOC/PNP/imigrar-como/custo-de-vida H2 headings into question form**, reusing the phrasing already written for each page's FAQPage `Question.name` — directly increases both citability and schema/visible-content alignment in one change, and simultaneously fix the two confirmed template bugs (duplicated "TEER X — TEER X" text; empty "Categorias no PNP: ." on revoked-program pages).
5. **[High, effort varies from ~1 hr to ongoing] Establish real entity/authority signals**: add sitewide `Organization` JSON-LD with genuine `sameAs` links, publish a static `/sobre` page, and prioritize YouTube/Reddit presence over backlink volume, per the provided correlation data (YouTube ~0.737 vs. Domain Rating ~0.266).

---

## Files referenced during this audit
Raw fetches and JSON captured to `C:\Users\pc\AppData\Local\Temp\claude\C--Users-pc\1ad03be6-b9ae-462d-a1ab-044f0dbc8a01\scratchpad\` (robots.txt, sitemap.xml, homepage, /faq raw + Playwright-rendered JSON, /programas/family_sponsorship, /blog listing + article, /noc/30010, /noc/31100, /pnp/ontario, /pnp/quebec, /pnp/british-columbia, /imigrar-como/eletricista, /custo-de-vida/toronto, /programas index, /contato, /precos, /calculadora-crs, /quiz, /express-entry/draws, /api/functions/draws-stats, /api/blog). Additional pre-existing captures from a prior pass of this same audit are present at `C:\Users\pc\immigracan.com.br-audit\` root (e.g. `rendered_faq.html`, `jsonld-*.json`, `*_rendered.json`) and are consistent with the findings above.
