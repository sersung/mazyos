# Content Quality / E-E-A-T Audit — immigracan.com.br

Site: Brazilian-Portuguese YMYL immigration-advice site (free CRS/eligibility calculators + quiz, paid one-time R$19.90 AI-generated eligibility report, R$29.90/mo subscription).
Audit basis: Google Sept 2025 Quality Rater Guidelines. Live fetches (curl raw HTML + `render_page.py --mode auto/always`) performed 2026-07-23 against homepage, `/faq`, `/precos`, `/contato`, `/termos`, `/privacidade`, `/pnp/ontario`, `/programas/pnp_ontario`, `/imigrar-como/eletricista`, `/custo-de-vida/toronto`, `/blog/o-que-e-imigracao-guia-completo`, and three "sorteio CEC" draw-result blog posts, cross-referenced against `crawl-data.psv` (119 rows captured, NOC codes through 73110) and `urls.txt` (294 URLs).

Overall Content Quality Score: **34/100** — thin/templated programmatic content at scale, systemic trust-signal gaps for a YMYL niche, and a real duplicate-content problem in the blog, partially offset by genuinely useful free tools, real per-article publish dates, and surprisingly well-structured (if poorly exposed) FAQ data.

---

## E-E-A-T Breakdown

| Factor | Weight | Score /100 | Rationale |
|---|---|---|---|
| Experience | 20% | 15 | No first-hand signals anywhere: no case studies, no "we moved to Canada" narrative, no user testimonials/reviews, no dated personal accounts. Content reads as aggregated/derived, not lived. |
| Expertise | 25% | 20 | No named author on any page (Article JSON-LD uses `"@type":"Organization"` only). No credentials, no RCIC/lawyer sign-off, no bios anywhere on the site. Technical facts (CRS grids, NOC/TEER codes, IRCC terminology) are largely accurate/plausible on the pages sampled, but there's no way for a reader (or Google) to verify who produced them or whether they were reviewed by anyone qualified. |
| Authoritativeness | 25% | 25 | No external recognition signals found: no backlink-worthy original research beyond one dataset page (`/dados/brasileiros-express-entry-2026`, which is a genuinely good AI-citation asset), no press mentions, no `sameAs` social profiles in schema, no author archive, no "as featured in." One blog post cites CIC News as a source, which is good practice but is the exception, not the norm. |
| Trustworthiness | 30% | 20 | No About/Sobre page anywhere in nav or sitemap. `/contato` = one email address, no company legal name, no CNPJ, no address, no phone. Two different support emails appear on the site (`suporte@immigracan.com.br` on `/contato` vs. `contato@immigracan.com.br` inside a hidden FAQ answer) — an inconsistency that itself signals low editorial QA. The one place the site explicitly says "somos uma empresa independente brasileira" (in a hidden FAQ answer, see below) makes zero legal-identity disclosure, which is a Brazilian Código de Defesa do Consumidor concern, not just an SEO one, for a site taking payment. `Organization` schema is entirely absent (only bare `WebSite` schema with no address/logo/founder/sameAs). |

**Weighted E-E-A-T score: ~20/100.** Trustworthiness (30% weight, the factor Google says matters most) is the weakest-evidenced pillar for a site handling paid, life-altering financial/legal decisions.

---

## CRITICAL Findings

### C1. No About/Sobre page and no legal-entity identity anywhere on the site
**Evidence:** Sitemap/nav only link `/faq`, `/precos`, `/contato`, `/privacidade`, `/termos`, `/blog`. `/contato` (68 words) contains only: "E-mail de suporte: suporte@immigracan.com.br" — no company name, no CNPJ, no registered address, no phone, no founder/team names. Homepage `WebSite` JSON-LD has no `Organization` entity, no `sameAs`, no `logo`, no `founder`. `/privacidade` (106 words) references LGPD/PIPEDA compliance but never names the data controller (a legal requirement under LGPD Art. 9, not just a Google guideline).
**Impact:** For a YMYL money-and-life-decision niche, absence of "who is behind this" is one of the most heavily weighted Quality Rater signals ("Who is responsible for the website?"). Combined with two different unexplained support email addresses (`suporte@` vs. `contato@immigracan.com.br`, the latter found only inside a hidden FAQ JSON-LD answer), this reads as a low-accountability operation to both raters and to any AI system trying to assess source credibility before citing the site.
**Fix:** Publish a real `/sobre` page with: legal entity name + CNPJ, founder/team names and relevant backgrounds (even if not RCIC-licensed, disclose that plainly and explain what expertise the team *does* have — e.g., "founded by X who immigrated via Express Entry in 20XX" or "advised by RCIC member #12345"), physical/mailing address, and a single consistent support email. Add matching `Organization` schema (`name`, `legalName`, `address`, `sameAs`, `founder`) site-wide.

### C2. No named author / no expertise attribution on any content page
**Evidence:** Sampled Article JSON-LD (`/blog/o-que-e-imigracao-guia-completo`) sets `"author":{"@type":"Organization","name":"ImmigraCan"}`. No byline, no author bio, no credentials appear in the rendered page text on any of the ~110 blog posts, ~90 NOC pages, ~34 profession pages, or ~15 program pages sampled.
**Impact:** Google's Sept 2025 QRG explicitly asks raters to assess "who created this content and are they a qualified expert." Immigration eligibility guidance with zero attributable expertise is the textbook YMYL red flag, and it's made worse by the fact the operators clearly *know* the regulatory landscape well enough to write blog posts about CICC rule changes and RCIC fraud recovery — meaning this is a curable gap of disclosure, not of underlying capability.
**Fix:** Add named `Person` authors (even a small team of 2-3 named writers/editors) with short bios stating real qualifications (immigration experience, journalism, data background, etc.), and — ideally — a named RCIC or immigration lawyer as a paid or volunteer "reviewed by" for at least the program/eligibility pages and the paid AI report. Update Article schema to `"author":{"@type":"Person", ...}` with an `url` to an author page.

### C3. Paid AI-generated eligibility report (R$19.90) has no disclosed human review, and the "we are not a licensed consultant" disclaimer is invisible at the exact point of purchase
**Evidence:** `/precos` (99 words total) states only: "Análise detalhada por IA enviada por e-mail, recomendação dos 3 melhores programas e checklist básico de próximos passos." No RCIC/lawyer disclaimer, no mention of human review, no accuracy caveat appears on this page. The only place the disclaimer exists in full is `/termos` (buried ToS, 93 words: "Para decisões oficiais e assessoria regulamentada, sempre contrate um consultor de imigração RCIC licenciado ou advogado especializado"), and — found via forced JS-render — inside a *collapsed, click-to-reveal* FAQ answer ("O ImmigraCan substitui um consultor de imigração? Não... Para casos complexos, sempre consulte um RCIC licenciado pelo CICC").
**Impact:** A user paying money specifically for an AI-generated "eligibility report" on a YMYL decision never sees, at the moment of paying, that (a) it's unreviewed AI output and (b) the company is not itself a licensed CICC consultant. This is the single highest-stakes trust gap on the site — it is precisely the "low-quality AI content sold as expert advice" pattern the Sept 2025 QRG update was designed to catch, compounded by real consumer-protection exposure in Brazil (CDC requires clear pre-contractual disclosure of what's being sold).
**Fix:** Add a prominent, non-collapsed disclaimer directly on `/precos` and immediately before the checkout/payment step: "Relatório gerado por IA, não constitui aconselhamento jurídico de imigração; não somos consultores licenciados (RCIC/CICC)." Disclose whether/how outputs are reviewed (even lightweight rules-based QA) before being emailed to the paying customer.

---

## HIGH Findings

### H1. Thin, near-boilerplate content across ~150+ programmatic page templates
**Evidence (raw body text, nav/footer included):**
| Page family | Sample | Total word count | Est. unique content (excl. nav/footer) |
|---|---|---|---|
| `/programas/{program}` (15 pages) | `pnp_ontario`, `pnp_bc`, `pnp_sk`, etc. | 173–222 (per crawl-data.psv) | ~90–120 |
| `/noc/{code}` (~90 pages) | `31100`, `21231`, `72200`, etc. | 171–205 (per crawl-data.psv) | ~90–110 |
| `/imigrar-como/{profession}` (~34 pages) | `eletricista` (fetched live) | 185 words full page | ~150 words after removing 7-word nav + boilerplate footer; core content is 4 short bullet lists (NOC/TEER, PR pathways, salary, provinces) plus one 2-sentence intro |
| `/custo-de-vida/{city}` (15 pages) | `toronto` (fetched live) | 104 words full page | ~40–50 words — literally one sentence + a 2-line cost list |
| `/pnp/{province}` (12 pages, distinct from `/programas/pnp_*`) | `ontario` (fetched live) | 227 words full page | ~180 |

These four families alone account for ~150 of the site's ~294 indexed URLs.
**Impact:** Per the skill's Content Minimums table, service-page-equivalent content (`/programas/*`, `/pnp/*`) sits at roughly 1/4 to 1/3 of the 800-word service-page floor, and location-page-equivalent content (`/custo-de-vida/*`) sits at roughly 1/6–1/10 of the 500-600 word floor. Word count is not itself a ranking factor, but at these levels there is close to zero differentiated topical coverage per page — each page is essentially a data field lookup (NOC code, TEER, salary, province list) wrapped in identical boilerplate, which is squarely the "thin/templated content at scale" risk the Sept 2025 QRG flags for programmatic pages. Recommend the parent audit also route this to the `seo-programmatic` sub-skill for template-design remediation, but from a content-quality lens: these pages currently read as auto-generated data snippets rather than genuine guidance.
**Fix:** For each family, add substantive unique value per page: for `/imigrar-como/*` — a short "day in the life"/pathway narrative, common pitfalls specific to that profession's credential recognition, realistic timeline; for `/custo-de-vida/*` — neighborhood-level detail, seasonal cost variation, a comparison callout, cited source for the cost figures; for `/noc/*` — link to 2-3 relevant blog posts/case notes, common employer sectors, licensing-body links. Even 150-250 additional genuinely differentiated words per page would materially change the topical-coverage picture.

### H2. Verbatim-template duplicate content in the blog's news/draw-update posts
**Evidence:** Full-text comparison of `/blog/sorteio-cec-primeiro-julho-2026` (524 words) and `/blog/sorteio-cec-3000-convites-junho-2026` (524 words) shows **identical body text word-for-word** except for the date (2026-07-07 vs. 2026-06-23) and the headline/invite-count. Structure: "Em [DATE], o cenário migratório canadense registrou uma atualização relevante... A informação vem do CIC News... O que muda para brasileiros [3-step generic explainer, verbatim] ... Próximos passos [4-step generic CTA list, verbatim] ... Contexto do sistema Express Entry [paragraph, verbatim] ... Conclusão [verbatim except date]." The same Mad-Libs pattern is visible across the broader "sorteio" URL cluster (`sorteio-express-entry-*`, `sorteio-healthcare-*`, `sorteio-medicos-*`, `sorteio-stem-*`, `sorteio-cec-*` — at least 15+ URLs in `urls.txt` follow this naming pattern) and the recurring "tempos de processamento/tempos de espera" monthly-update posts (10+ URLs).
**Impact:** This is textbook low-quality AI-content generation per Sept 2025 QRG: "repetitive structure across pages," "no original insight," content whose only variable is a number substituted into a fixed paragraph shell. At >100 blog posts published at a cadence far exceeding what a small team could hand-write with real analysis, and with dozens of these draw/processing-time posts targeting overlapping keywords ("sorteio express entry [month] 2026"), there is real keyword cannibalization risk in addition to the quality risk — Google is likely to fold near-duplicate URLs together in its index, diluting whichever one it picks (which won't necessarily be the newest/most relevant to the user's current query).
**Fix:** Consolidate the draw-result and processing-time updates into a small number of continuously-updated hub pages (the site already has good models for this: `/express-entry/draws`, `/historico-draws`) rather than minting a new near-identical article per event. Where a standalone article is still wanted (e.g. for social/email distribution), require at least one paragraph of genuine analysis specific to that draw (why the cutoff moved, what it means relative to the prior 3 draws, trend context) rather than the fixed generic-explainer paragraphs, and vary the boilerplate sections themselves across posts.

### H3. FAQ page's actual answers are invisible to any crawler that doesn't execute JS *and* click each accordion — a major AI-citation-readiness gap on the site's single best trust/Q&A asset
**Evidence:** `curl` (no JS) on `/faq` returns the **homepage's** title/meta/H1 ("Como Morar no Canadá em 2026...") and 0 FAQ content — confirmed also via `crawl-data.psv` where `/faq`, `/comparador`, `/prontidao`, `/templates` all show byte-identical title/meta/word-count to the homepage row. Forcing `render_page.py --mode always` (full JS execution) surfaces the real page shell and the 26 FAQ **questions** as visible text (447 words), but the **answers** are not present in the rendered DOM/`extracted_text` at all — they only exist inside `FAQPage` JSON-LD (`<script type="application/ld+json">`, confirmed 26-entry `mainEntity` block, 9,925 bytes) that populates an accordion on click. Sample recovered answers include genuinely good, quotable, specific content: *"O ImmigraCan substitui um consultor de imigração? Não. Somos uma ferramenta de orientação e educação — não fornecemos consultoria legal... Para casos complexos, sempre consulte um RCIC licenciado pelo CICC."* and *"Meu diploma brasileiro vale no Canadá? Vale para propósito de imigração (via ECA)... Áreas reguladas (medicina, engenharia, direito, contabilidade) exigem certificação canadense, que pode levar 1–5 anos."*
**Impact:** This is a split-severity finding: (a) **for classic search/SEO crawling**, `/faq` and at least 3 other routes (`/comparador`, `/prontidao`, `/templates`) return duplicate homepage content on first (non-JS) fetch, which is a real indexing/duplicate-content risk independent of JS rendering; (b) **for AI citation readiness specifically**, the answer text — which is exactly the kind of well-labeled, specific, quotable Q&A content LLMs prefer to lift — is only reachable via structured data that many simpler crawlers (and some LLM training/retrieval crawlers that read visible text rather than parsing embedded JSON-LD) will simply never see. The best trust-building content on the entire site (the honest "we are not a licensed consultant" answer) is the single most hidden piece of content on the site.
**Fix:** Server-render the FAQ answers as visible, indexable text (either expand-by-default or ensure the answer text is present in the initial HTML `<p>`/`<div>` even if visually collapsed via CSS, not JS-gated). Fix the routing/rendering issue causing `/faq`, `/comparador`, `/prontidao`, `/templates` to return homepage boilerplate on non-JS fetch — these should each return their own unique `<title>`/meta/H1 in the raw HTML response.

### H4. Trust/licensing disclaimer is inconsistently applied — present on blog posts and buried in ToS/hidden FAQ, but absent from the pages making the most specific actionable claims
**Evidence:** Confirmed present (small italic footer note) on the blog guide post and both sampled draw-update posts: *"Este conteúdo é informativo e não constitui aconselhamento jurídico ou de imigração... consulte um consultor de imigração regulamentado (RCIC) ou advogado."* Confirmed **absent** on: `/programas/pnp_ontario` (227 words, states specific processing times and eligibility criteria with no caveat), `/pnp/ontario` (states OINP was revoked and prescribes "estratégias" with no caveat), `/imigrar-como/eletricista` (states a specific salary range and "vale a pena começar o processo de reconhecimento antes de imigrar" with no caveat), `/custo-de-vida/toronto` (no caveat needed here, lower stakes), and `/precos` (highest-stakes page — see C3).
**Impact:** The originally-noted "buried in ToS" issue is only half the picture — the disclaimer discipline that *does* exist on blog posts was not carried through to the programmatic pages, which arguably contain more specific, more actionable, and more consequential claims (e.g., telling a reader their specific trade qualifies for a specific PR pathway) than a generic news post does.
**Fix:** Add the same short disclaimer footer used on blog posts to the `/programas/*`, `/pnp/*`, `/noc/*`, and `/imigrar-como/*` templates (trivial to do at scale since these are templated pages — one component update covers ~150 URLs).

---

## MEDIUM Findings

### M1. Homepage and several program-hub pages sit below or right at their content-type floor
**Evidence:** Homepage extracted body ≈ 411 words (crawl-data.psv) — below the 500-word homepage floor, though it does contain a genuine ~250-word "what is immigration" intro with internal links (previously confirmed) plus tool CTAs, so this is a much lower-severity gap than the programmatic families in H1.
**Fix:** Lower priority than H1; consider adding a short "how ImmigraCan works" / trust-signal block (3 bullet points: free tools, paid report, not a law firm) to close the gap while reinforcing C1/C3 fixes.

### M2. Freshness signals are real at the article level but shallow in substance
**Evidence:** Individual blog posts do carry genuine, differentiated `Publicado em: DD/MM/YYYY` dates in visible text (e.g. 03/07/2026, 06/07/2026, 22/06/2026 — all distinct, plausible publish dates, in contrast to the sitemap `lastmod` fabrication being tracked by the technical audit). This is a genuine positive: the blog is being actively, frequently published to (cadence is very high — dozens of 2026 posts).
**However:** as shown in H2, a large share of that cadence is templated re-skins of the same event type (draw results, monthly processing-time updates) rather than substantively new analysis. So while the *publish-date* freshness signal is real and trustworthy, the *editorial-value* freshness behind many of those dates is thin — Google's helpful-content evaluation (now folded into core ranking, per the March 2024 merge) looks at whether updates reflect genuine new value, not just a new timestamp.
**Fix:** Keep the real per-article dating (good practice, don't change), but reduce the count of near-duplicate "new post per event" articles per H2's fix, favoring fewer, more substantively updated hub pages.

### M3. Readability is generally good but structurally inconsistent across templates
**Evidence:** The `/blog/o-que-e-imigracao-guia-completo` guide post uses short paragraphs, a genuinely useful imigração/emigração/migração comparison table, a numbered process list, and a glossary of acronyms (PR, CRS, CLB, IRCC, NOC, ITA, AOR, PGWP, ECA) — this is good, scannable, AI-citation-friendly structure. By contrast, the `/imigrar-como/*` and `/noc/*` templates are just unlabeled bullet fragments (no full sentences in the spec sections), which reads fine for a human skimming but provides less quotable/self-contained context for an LLM lifting a passage out of context (e.g., "NOC 2021: 72200 / TEER: 2 / Categoria: Trades" without restating what NOC/TEER means on that page).
**Fix:** On programmatic templates, add one plain-language sentence expanding each abbreviation/spec on first use per page (even lightweight, e.g. "TEER 2 (nível de treinamento/educação/experiência exigido)"), since these pages don't reliably link back to a glossary and may be the only page an AI system or reader lands on.

### M4. Keyword optimization is generally natural, not stuffed
**Evidence:** Titles/meta descriptions sampled (crawl-data.psv) read naturally (e.g., "NOC 30010 — Gerente de serviços de saúde (TEER 0)", "Custo de vida em Toronto 2026: quanto custa morar (em reais)") with reasonable title lengths (mostly 50-70 chars) and no evident stuffing. This is a low-risk area; no action required beyond what H1/H2 fixes will naturally improve (more real content reduces reliance on keyword-matched titles alone to signal relevance).

---

## LOW Findings

### L1. Inconsistent support email addresses
**Evidence:** `/contato` lists `suporte@immigracan.com.br`; a hidden FAQ JSON-LD answer about data deletion instead lists `contato@immigracan.com.br`.
**Fix:** Standardize on one address across all surfaces (or clearly state that both route to the same inbox).

### L2. Dataset page is a strong, underused authority asset
**Evidence:** `/dados/brasileiros-express-entry-2026` ("Estudo original ImmigraCan: 4.053 brasileiros estimados receberam ITA em 2026. CRS médio 517...") is a genuinely original-data page — exactly the kind of asset that builds authoritativeness and is highly AI-citable (specific numbers, clearly attributed as an original study).
**Fix:** This is a positive finding, not a problem — recommend promoting it more (internal links from blog posts and NOC pages, methodology transparency on how the 4,053 estimate was derived) since it's one of the only pages on the site with real authoritativeness potential; also add a visible methodology/named-analyst credit here specifically to reinforce C2's fix.

---

## AI Citation Readiness Score: 38/100

**What works:**
- FAQPage JSON-LD is well-formed, current, and contains specific, well-labeled, self-contained Q&A pairs that are genuinely good LLM-citation material (26 questions covering exactly the questions a prospective immigrant or an AI assistant would need: eligibility basics, program differences, cost/salary, and — notably — the honest "are you affiliated with the government / can you replace an RCIC" disclosure).
- The definitional blog guide post (`o-que-e-imigracao-guia-completo`) has clean heading hierarchy, a comparison table, and a glossary — good structure for extraction.
- `/dados/brasileiros-express-entry-2026` provides genuinely original, quotable statistics.
- `Dataset`, `FAQPage`, `SoftwareApplication`/`WebApplication`, and `Answer`/`Question` structured data are deployed fairly broadly across tool and draw pages (per crawl-data.psv `jsonld_types` column).

**What fails:**
- The site's best Q&A content (FAQ answers) is not present in crawlable visible text at all (H3) — a plain-text or non-JSON-LD-aware AI crawler gets nothing.
- `/faq`, `/comparador`, `/prontidao`, `/templates` serve duplicate homepage content on raw fetch, actively confusing any crawler trying to distinguish these pages (H3).
- No `Organization` schema and no named `Person` authors anywhere means an AI system has no basis to attribute or vet the source (C1/C2).
- Programmatic pages (H1) are too thin to serve as good standalone citation targets — a passage lifted from `/imigrar-como/eletricista` ("NOC 2021: 72200, TEER: 2") has almost no self-contained context.
- Duplicate blog content (H2) means an AI system sampling multiple "sorteio" posts would see the same boilerplate paragraph repeated, adding no incremental value and potentially triggering duplicate-detection suppression.

---

## Summary Priority List

| # | Severity | Finding | Effort to fix |
|---|---|---|---|
| C1 | Critical | No About page / no legal entity identity | Medium |
| C2 | Critical | No named/credentialed authors anywhere | Medium |
| C3 | Critical | Paid AI report: no visible disclaimer or human-review disclosure at point of sale | Low |
| H1 | High | Thin content across ~150 programmatic page templates | High |
| H2 | High | Verbatim duplicate "sorteio"/processing-time blog posts | Medium |
| H3 | High | FAQ answers invisible to non-JS/non-JSON-LD crawlers; 4 routes serve duplicate homepage content | Medium |
| H4 | High | RCIC/licensing disclaimer missing from programmatic pages that need it most | Low (templated fix) |
| M1 | Medium | Homepage/program-hub word counts below floor | Low |
| M2 | Medium | High publish cadence but templated substance | Medium |
| M3 | Medium | Inconsistent readability/self-containment across templates | Low |
| M4 | Medium | (Positive) keyword optimization is natural | N/A |
| L1 | Low | Inconsistent support email addresses | Trivial |
| L2 | Low | Original-data page underused for authority-building | Low |
