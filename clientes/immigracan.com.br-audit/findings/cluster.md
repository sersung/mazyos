# Semantic Cluster & Site-Architecture Audit — immigracan.com.br

Scope: 294-URL sitemap (tools, Express Entry data, Programs, PNP, NOC database, profession guides,
cost-of-living, lead magnets, blog). Evidence base: full crawl-data.psv (title/meta/word-count/schema
per URL), rendered HTML pulls of 12 representative pages across every family (homepage, both PNP
families, a NOC page, a profession page, a city hub, a program hub, the blog index, a draw-result post,
the two "canonical" Express Entry data pages), plus external web-search corroboration of the real-world
OINP status and of how authority competitors (CanadaVisa, CIC News, Moving2Canada) structure equivalent
content.

## Methodology note (read before the findings)

The skill's standard method is pairwise live-SERP overlap via WebSearch. That was attempted first:
`site:immigracan.com.br` returns **zero indexed results** — the domain is not currently indexed by
Google, so there is no live SERP to diff pairwise keyword-vs-keyword. Given that constraint, this audit
substitutes a **structural/topical-overlap method**: for each keyword cluster, I identified every URL on
the site that plausibly targets it (by title, H1, meta description, and body content pulled directly from
the pages), scored overlap using the same 0–1 / 2–3 / 4–6 / 7–10 rubric but applied to *on-site targeting
overlap* (same primary entity + same search intent + same content depth) rather than measured SERP
co-occurrence, and cross-checked the highest-risk cases against real-world source-of-truth facts (e.g.
IRCC/OINP status) via WebSearch. This is noted wherever a finding depends on it. If/when the site is
indexed, the pairwise live-SERP pass should be re-run to confirm severities.

---

## Executive summary — top 5 findings by severity

| # | Severity | Finding |
|---|---|---|
| 1 | **Critical** | The "Ontario PNP" keyword space is split across **four** live URLs with contradictory facts: `/pnp/ontario` and `/blog/oinp-foi-revogado-alternativas-2026` correctly state OINP was revoked 30 May 2026; `/programas/pnp_ontario` still states the program is `Status: Ativo` with live streams. A user or crawler landing on different URLs gets opposite answers to the same question. |
| 2 | **Critical** | 30+ "sorteio express entry/cec/pnp [mês] 2026" and "tempos de processamento [mês] 2026" blog posts compete with each other **and** with the intended canonical pages — which themselves are not consolidated (`/express-entry/draws`, `/express-entry/draws/2026`, `/historico-draws`, `/dados/brasileiros-express-entry-2026` are four separate, mutually non-linking, overlapping pages). There is no single evergreen "current processing times" page at all — the closest thing, `/estimador-de-prazo`, is a user-input estimator tool, not a live data page. |
| 3 | **Critical** | The NOC hub `/buscador-noc` (pillar for ~90 `/noc/{code}` spokes) contains **zero links to any NOC page**. The spokes link back to the hub (`Buscar outra NOC`), but the hub never links forward. This is a full orphan-cluster failure in one direction — Google can still reach NOC pages via sitemap/other pages, but no PageRank/relevance signal flows pillar→spoke, and users on the hub cannot browse to a spoke. |
| 4 | **High** | Site-wide global navigation only contains `/`, `/calculadora-crs`, `/programas`, `/blog`, `/precos`, `/contato`. The hubs `/pnp`, `/buscador-noc`, `/custo-de-vida`, `/imigrar-como`, `/materiais`, and the entire Express Entry data family are **not in primary nav** — they depend entirely on scattered in-content links (many pages, including the homepage, don't link to them at all), starving them of internal link equity from the site's ~294 pages. |
| 5 | **High** | At least 5 provinces (Ontario, BC, Alberta, Quebec, Atlantic) have a *third or fourth* competing URL: standalone news/guide blog posts (`imigrar-por-ontario-pnp-dicas-2026`, `british-columbia-pnp-mudancas-2026`, `imigracao-pnp-alberta-atualizacao-2026`, `imigrar-pelo-quebec-regras-2026`, `atlantic-immigration-program-prazos-2026`) target the same province+PNP intent as both `/pnp/{province}` and `/programas/pnp_{code}`, with no interlinking among the set. |

---

## 1. Hub-and-spoke architecture assessment, by content family

### 1.1 Tools hub (`/quiz`, `/calculadora-crs`, `/conversor-clb`, `/calculadora-proof-of-funds`,
`/calculadora-salario-liquido`, `/estimador-de-prazo`, `/simulador-cenarios`, `/comparador`, `/prontidao`)

- No single hub page lists all 9 tools; they're discoverable only through cross-links (e.g. homepage
  links to `/quiz`, `/calculadora-crs`, `/calculadora-proof-of-funds`, `/custo-de-vida`).
- `/comparador` and `/prontidao` **serve the homepage's exact HTML/title/meta/canonical** in the crawl
  (`crawl-data.psv` rows 24–25 show identical title/description/canonical `https://immigracan.com.br` to
  the homepage row). Same for `/templates` and `/faq`. These read as **unbuilt route stubs that 404-soft
  to the homepage** rather than real tool pages — functionally they are duplicate-content risks and,
  worse, dead weight in the sitemap (a crawler/Search Console will flag them as duplicate titles/canonicals
  of `/`). Recommend: either build them out or 404/noindex + remove from sitemap.
- Recommended architecture: promote `/quiz` (broadest intent, "Descubra sua elegibilidade") as pillar for
  a **Tools cluster**, with the calculators as spokes, and add a `/ferramentas` (or similar) index page
  linked from global nav.

### 1.2 Express Entry draws data family

- `/express-entry/draws`, `/express-entry/draws/{2023..2026}`, `/historico-draws`,
  `/dados/brasileiros-express-entry-2026`: four/eight URLs, no cross-linking confirmed between the two
  fetched (`/express-entry/draws` and `/historico-draws` link to neither each other nor
  `/dados/brasileiros-express-entry-2026`). Word counts are all in the 150–220 range — thin for what
  should be the site's most defensible "living data" pillar.
- Real-world competitor benchmark (CanadaVisa, CIC News, Moving2Canada, IRCC itself) all consolidate this
  into **one** continuously-updated tracker per topic (draws) rather than duplicating it across multiple
  URLs or spinning up an article per draw — see §2, Finding C2.
- `/dados/brasileiros-express-entry-2026` (an original-data/stats angle: "4.053 brasileiros estimados
  receberam ITA") is differentiated content (a genuine "same cluster, different angle" spoke rather than a
  duplicate) and should be kept, but needs to be linked *from* `/express-entry/draws` as the flagship data
  extension, and vice versa.

### 1.3 Programs pillar (`/programas` → 18 program pages)

- Hub→spoke linking is complete: all 18 `/programas/{code}` pages are linked from `/programas` with
  correct anchor text (verified via live fetch).
- Content depth is thin and template-driven: ~170–200 words per page, no schema (`has_jsonld=0` on every
  `/programas/*` row in crawl-data.psv), generic "Jurisdição / Status / Tempo médio / Resumo / Requisitos /
  Como Aplicar / link to canada.ca" skeleton with no FAQ, no breadcrumbs — noticeably lower production
  value than the NOC and profession pages (which carry `FAQPage`+`BreadcrumbList` schema and 2 images).
- **This whole family reads as a legacy/generic layer that `/pnp/{province}` has functionally superseded**
  for the 10 provinces both cover (see §2, Finding C1).

### 1.4 PNP by province (`/pnp` → 12 province pages)

- Hub→spoke linking is complete and correctly labelled (including flagging Ontario as "revoked" directly
  in the hub's anchor text — a good practice not mirrored in `/programas`).
- Richer than `/programas/pnp_*`: FAQPage + BreadcrumbList schema present, news-style framing that's kept
  current (the Ontario page correctly reflects the May 2026 OINP revocation).
- Coverage mismatch vs. `/programas`: `/pnp/northwest-territories` exists with no `/programas/pnp_nt`
  counterpart at all (gap in the Programs pillar), while `/pnp/quebec` and `/programas/quebec_skilled` use
  different naming/URL conventions for the same province, likely confusing users who arrive at one and
  look for the other.

### 1.5 NOC occupation database (`/buscador-noc` → ~90 `/noc/{code}` pages)

- **Broken hub→spoke direction** (Critical Finding #3 above). Spokes have solid schema
  (`Answer/BreadcrumbList/FAQPage/ListItem/Question`) and link back to the hub and to `/calculadora-crs`
  and `/quiz`, but never to `/imigrar-como/{profession}`, `/pnp/{province}`, or `/custo-de-vida/{city}` —
  despite every NOC page being profession-specific and citing category eligibility (Healthcare, STEM,
  Trades, Transport, Agriculture, Education, Management, Business, Culinary, Services, Care, Cleaning).
- Two duplicate rows in the sitemap: `72410` and `72401`/`72410` appear twice in crawl-data.psv
  (lines "…/noc/72401…" and "…/noc/72410…" both present twice, at rows ~116/125). Verify this isn't a
  sitemap generation bug producing a real duplicate URL/duplicate content pair.

### 1.6 "Imigrar como {profissão}" guides (`/imigrar-como` → 36 profession pages)

- Hub→spoke linking is complete (all 36 professions linked from `/imigrar-como`, verified live).
- Spoke pages have good schema (FAQPage/BreadcrumbList) but **very thin cross-linking**: the fetched
  `/imigrar-como/enfermeiro` page links to exactly **one** NOC code (31301, correct for RN) and to
  `/calculadora-crs` and `/quiz` — nothing to `/pnp/{province}` (e.g. Manitoba/Saskatchewan actively
  target nurses), nothing to `/custo-de-vida/{city}`, nothing to sibling profession pages (e.g.
  enfermeiro ↔ tecnico-de-enfermagem, medico ↔ dentista/fisioterapeuta as healthcare-cluster peers).
- Many professions map to multiple relevant NOC codes (e.g. "engenheiro" spans 21300/21301/21310/21311/
  21321) but each profession page appears to link only to a single NOC — under-linking the NOC cluster
  further and leaving related NOC codes undiscoverable from the profession side too.

### 1.7 Cost of living by city (`/custo-de-vida` → 15 city pages)

- Hub→spoke linking is complete (verified live, all 15 cities linked with correct labels).
- Good schema (Answer/FAQPage/Question) on spokes; reasonable word counts (~165–175).
- No evidence of city↔province cross-linking (e.g. Toronto/Mississauga/Brampton/Hamilton/Ottawa/
  Kitchener/London — all Ontario cities — should link to `/pnp/ontario`'s post-OINP alternatives content
  and to relevant profession/NOC pages for in-demand local occupations). Not verified on every city page,
  but the pattern from other spokes (thin cross-cluster linking) makes it a likely site-wide gap.

### 1.8 Lead magnets (`/materiais` → 6 downloads)

- Hub exists with 173 words, `has_jsonld=0`. Not deep-audited beyond crawl-data.psv; no evidence found
  of these being linked from the profession/NOC/city spokes where they'd have natural relevance (e.g.
  "guia-60-dias" from every profession page, "checklist-express-entry" from every program/PNP page).

### 1.9 Blog (`/blog` → 150+ posts)

- No categories, tags, or pagination on the index (verified live) — evergreen guides, culture/curiosity
  posts, and the high-cadence news posts (draws, processing times, PNP policy) are interleaved in one flat
  reverse-chronological list. This actively hides the recurring-cadence cannibalization from both users and
  from the site's own architecture (nothing signals "these 15 posts are the same topic, updated monthly").
- The evergreen pillar candidate `/blog/o-que-e-imigracao-guia-completo` links only to `/quiz` and
  `/calculadora-crs` — none of the program, PNP, or profession pages it references by name in body copy
  (Express Entry, PNP, Family Sponsorship, PGWP) are actually hyperlinked from the article body.

---

## 2. Cannibalization risks, ranked by severity/impact

### C1 — CRITICAL — Ontario PNP: 4-way duplication + factual contradiction
**URLs:** `/pnp/ontario`, `/programas/pnp_ontario`, `/blog/oinp-foi-revogado-alternativas-2026`,
`/blog/imigrar-por-ontario-pnp-dicas-2026`
**Overlap score (topical, not live-SERP):** 8–9/10 between the first three (same entity, same core
questions: is OINP active, what are the streams, what are the requirements); 5–6/10 for the fourth
(broader "tips" framing).
**Why it matters:** `/programas/pnp_ontario` (title: "Ontario Immigrant Nominee Program (OINP) –
Requisitos e Elegibilidade", `Status: Ativo`, describing live streams) directly **contradicts**
`/pnp/ontario` and `/blog/oinp-foi-revogado-alternativas-2026`, both of which correctly state OINP was
revoked under Ontario Regulation 47/26 effective 30 May 2026 (confirmed against external sources — CIC
News, KPMG, Newland Chase all corroborate the revocation). A search engine or user could land on the
stale page and receive materially wrong information about a real immigration program — a genuine
E-E-A-T/trust risk on top of the cannibalization.
**Same pattern likely repeats** for BC, Alberta, Quebec, Atlantic (each has a `/pnp/{x}`, a
`/programas/pnp_{x}` or equivalent, and a dedicated blog "mudanças/regras/prazos 2026" post) — not
independently fact-checked here, but the structural duplication is identical and should be audited program
by program before the next content refresh cycle.
**Recommendation:**
1. Pick ONE canonical target per province: `/pnp/{province}` (it already carries FAQ/Breadcrumb schema and
   is being kept current) as the primary, evergreen "state of the program" page.
2. 301-redirect or canonicalize `/programas/pnp_{code}` → `/pnp/{province}` for provinces where both exist,
   OR clearly differentiate `/programas/pnp_{code}` as a "how this fits into the federal Programs
   comparison" page (shorter, comparison-table style, always `rel=canonical` pointing nowhere but
   cross-linked, never restating live/active status) while `/pnp/{province}` owns all "is it open/what
   changed" content.
3. Fold the blog "revogado/alternativas" and "dicas" posts into updates of the `/pnp/ontario` page itself
   (add a dated changelog section) rather than new URLs; 301 the blog posts once merged.
4. Immediately fix the `Status: Ativo` claim on `/programas/pnp_ontario` — this is a live factual error.

### C2 — CRITICAL — Draw-result and processing-time blog cadence vs. non-consolidated canonical pages
**Blog URLs (representative, not exhaustive):** `sorteio-cec-primeiro-julho-2026`,
`sorteio-express-entry-pnp-menor-crs-julho-2026`, `sorteio-healthcare-express-entry-25-jun-2026`,
`sorteio-medicos-express-entry-junho-2026`, `sorteio-cec-3000-convites-junho-2026`,
`sorteio-cec-4000-convites-junho-2026` (two CEC-invitation posts in the *same month*),
`sorteio-express-entry-22-junho-2026-pnp-955`, `nominados-provinciais-express-entry-junho-2026`,
`pei-maior-sorteio-provincial-junho-2026`, `pausa-sorteios-express-entry-maio-2026`,
`recorde-sorteio-frances-fevereiro-2026`, `sorteios-trades-express-entry-abril-2026`,
`sorteio-saude-express-entry-fevereiro-2026`, `sorteios-stem-express-entry-janeiro-2026` — **~15 posts**,
all targeting "resultado do sorteio Express Entry" intent.
Plus, separately: `ircc-tempos-processamento-work-permit-julho-2026`, `tempos-processamento-lmia-julho-2026`,
`tempos-processamento-lmia-junho-2026`, `tempos-de-processamento-ircc-junho-2026`,
`tempos-espera-residencia-permanente-cidadania-2026`, `tempos-espera-residencia-temporaria-sobem-2026`,
`tempos-espera-residencia-temporaria-caem-julho-2026` (note: "sobem" in one post, "caem" in another,
same underlying topic, contradictory-sounding titles a month apart), `work-permit-in-canada-menor-tempo-
junho-2026`, `lmia-prazos-melhoram-tfwp-streams-junho-2026`, `residencia-permanente-economica-tempos-
processamento-2026`, `backlog-imigracao-canada-cai-junho-2026` — **~10 more posts**, all targeting
"tempos de processamento IRCC" intent.
**Overlap score:** 7–8/10 within each sub-group (same intent, same recurring template, differing only by
month/number).
**Canonical-target check (your hypothesis, confirmed with a caveat):** Yes, `/express-entry/draws` +
`/historico-draws` *should* be the draw canonical, and a "current processing times" page *should* exist
for the second group — but:
- `/express-entry/draws` and `/historico-draws` **do not link to each other** and are themselves
  near-duplicate (both ~200–240 words describing the same CRS-by-round history for 2025–2026). Confirmed
  by direct fetch of both pages.
- There is **no equivalent canonical page for "tempos de processamento"** at all. `/estimador-de-prazo` is
  a *user-input estimator* ("quanto tempo meu caso vai demorar"), not a live "current official IRCC
  processing times by program" reference page — so this half of the recurring-post cluster has nowhere
  to consolidate into today. This is simultaneously a cannibalization problem and a content gap (§3).
- The one draw-result post fetched (`sorteio-express-entry-pnp-menor-crs-julho-2026`) links to
  `/historico-draws` but not `/express-entry/draws`, and to no sibling draw posts — confirming zero
  interlinking within the cluster.
**Recommendation:**
1. Merge `/express-entry/draws` and `/historico-draws` into one URL (retain `/express-entry/draws` as it
   has the stronger Dataset schema + "updates every 12h" framing); 301 `/historico-draws`.
2. Build a new evergreen `/tempos-processamento` (or `/ircc/tempos-processamento`) hub structured like
   `/express-entry/draws`: current processing times by program, updated on a fixed cadence, with a
   changelog. This becomes the canonical target for all "tempos de processamento" content going forward.
3. Stop publishing a new blog URL per draw/per monthly processing-time update. Where a "story" genuinely
   exists (e.g. a record-breaking French-category draw, a policy reform), keep the blog post but make it
   short and **link prominently to the live data page** rather than restating the numbers; where there is
   no story (routine monthly update), update the data page only — don't create a post.
4. Retroactively 301 the ~25 identified recurring posts to the relevant canonical/data page once merged,
   or at minimum add a prominent "ver dados atualizados" link block to each, both directions.

### C3 — HIGH — Province/PNP topical blog posts triangulating with both PNP page families
**Examples:** `british-columbia-pnp-mudancas-2026` vs. `/pnp/british-columbia` + `/programas/pnp_bc`;
`imigracao-pnp-alberta-atualizacao-2026` vs. `/pnp/alberta` + `/programas/pnp_ab`;
`imigrar-pelo-quebec-regras-2026` vs. `/pnp/quebec` + `/programas/quebec_skilled`;
`atlantic-immigration-program-prazos-2026` vs. `/programas/atlantic_aip` (no `/pnp/atlantic` equivalent —
AIP is federal-regional, correctly modeled as a `/programas` entry only, so this one is a genuine 2-way
not 3-way overlap).
**Overlap score:** 5–7/10 (same province + same program entity, different framing/depth).
**Recommendation:** Same consolidation pattern as C1 — merge into the `/pnp/{province}` page as a
changelog/update section; keep `/programas/{code}` as a shorter comparison-table entry that links out to
the full `/pnp/{province}` page rather than restating status.

### C4 — MEDIUM — CRS-topic fragmentation
**URLs:** `/calculadora-crs`, `/simulador-cenarios`, `/blog/pontuacao-crs-alta-como-pontuar-2026`,
`/blog/calculadora-crs-passo-a-passo-2026`, `/blog/reformas-crs-express-entry-junho-2026`.
**Overlap score:** 4–6/10 (related intent — "how do I raise/calculate my CRS" — but different
format/depth: two are tools, three are articles).
**Recommendation:** This is a legitimate interlink cluster, not a merge candidate — the tools and the
"como pontuar" article target complementary intents. Action: add explicit bidirectional links (tool →
"leia o guia de como pontuar" / article → "calcule agora") rather than leaving them to be discovered
independently. Low urgency relative to C1–C3.

### C5 — MEDIUM — LMIA/work-permit topic fragmentation
**URLs:** `/programas/work_permit_lmia`, `/blog/trabalhar-no-canada-lmia-regras-2026`,
`/blog/tempos-processamento-lmia-julho-2026`, `/blog/tempos-processamento-lmia-junho-2026`,
`/blog/lmia-prazos-melhoram-tfwp-streams-junho-2026`, `/blog/fim-restricoes-lmia-8-regioes-canada-2026`.
**Overlap score:** 6–7/10 among the four LMIA-timing posts (subset of C2's processing-time problem);
4/10 between the program page and the news posts.
**Recommendation:** Fold the LMIA processing-time posts into the same C2 fix (route to the new
`/tempos-processamento` hub, filtered/anchored to LMIA). Keep `/programas/work_permit_lmia` and
`trabalhar-no-canada-lmia-regras-2026` as distinct (program mechanics vs. practical "regras" guide) but
link them to each other.

### C6 — LOW/STRUCTURAL — Tool route stubs serving homepage content
**URLs:** `/comparador`, `/prontidao`, `/templates`, `/faq` (per crawl-data.psv rows 24–27, identical
title/description/canonical to `/`).
**Not a keyword-cannibalization issue** in the classic sense (they don't rank for anything since they
have no unique content) but a **technical duplicate-content / crawl-budget** issue worth fixing alongside
the above: these are indexed, `robots: index,follow`, with `canonical` pointing at their own URL in some
crawler views yet content identical to homepage — flag for dev to confirm intended behavior (soft-launch
placeholders vs. real routes not yet built) and noindex or complete them.

---

## 3. Internal link matrix — current state vs. recommended

Legend: ● = present/complete, ◐ = partial, ✗ = missing (verified live where noted, else inferred from
crawl-data.psv + consistent site pattern).

| Hub | Hub → all spokes | Spoke → hub | Spoke ↔ spoke (siblings) | Cross-cluster (spoke → other clusters) |
|---|---|---|---|---|
| `/programas` (18 programs) | ● verified | not verified per-spoke | ✗ none observed | ✗ no links to `/pnp/{province}` |
| `/pnp` (12 provinces) | ● verified, well-labelled | not verified per-spoke | ✗ none observed | ✗ no links to `/programas/pnp_{code}` |
| `/buscador-noc` (~90 NOC) | **✗ zero links to spokes** | ● verified (`/noc/31301`) | ✗ none observed | ✗ no links to `/imigrar-como`, `/pnp` |
| `/imigrar-como` (36 professions) | ● verified | not verified per-spoke | ✗ none observed | ◐ 1 NOC link only; ✗ no `/pnp`, ✗ no `/custo-de-vida` |
| `/custo-de-vida` (15 cities) | ● verified | not verified per-spoke | ✗ none observed | ✗ no `/pnp`, ✗ no `/imigrar-como` |
| `/materiais` (6 downloads) | not verified | not verified | — | ✗ not observed from any other cluster |
| `/express-entry/draws` family (4 pages) | **✗ pages don't link each other** | — | — | ◐ `/express-entry/draws` links to `/conversor-clb`, `/simulador-cenarios` |
| `/blog` (150+ posts) | ● index lists all posts | ◐ 1 of 1 checked links out only to `/quiz`/`/calculadora-crs`/`/historico-draws` | ✗ none observed among draw/processing posts | ✗ no links from evergreen guide to program/PNP pages it names |
| Global nav (all pages) | — | — | — | ✗ excludes `/pnp`, `/buscador-noc`, `/custo-de-vida`, `/imigrar-como`, `/materiais`, Express Entry data family |

### Recommended link matrix additions (priority order)

1. **Mandatory, immediate:** `/buscador-noc` → every `/noc/{code}` (at minimum a filterable/categorized
   static list by TEER/category — Healthcare, STEM, Trades, Transport, Agriculture, Education,
   Management, Business, Culinary, Services, Care, Cleaning — mirroring the categories already used in
   each NOC page's meta description).
2. **Mandatory:** Add `/pnp`, `/buscador-noc`, `/custo-de-vida`, `/imigrar-como` to global nav (or a
   mega-menu/footer sitemap block reachable from every page) — these are pillar-level pages for
   ~150 combined spoke pages and currently get no nav-level equity.
3. **Recommended, per profession page:** link to (a) all relevant NOC codes for that profession (not just
   one), (b) the 2–3 provinces whose PNP most actively targets that occupation (e.g. `enfermeiro` →
   Manitoba/Saskatchewan/Atlantic PNPs and the Healthcare Express Entry category), (c) 1–2 relevant
   `/custo-de-vida/{city}` pages for the provinces where the job is concentrated (e.g. `desenvolvedor` →
   Toronto/Vancouver).
4. **Recommended, per city page:** link to the province's PNP page and to 2–3 profession pages
   locally in demand.
5. **Recommended, per NOC page:** link to the matching `/imigrar-como/{profession}` page (inverse of #3)
   where one exists (~half of NOC codes have a matching profession guide; the rest don't — see gap G3
   below).
6. **Optional, cross-cluster:** blog evergreen guides → hyperlink every program/PNP/tool name they
   mention in body copy instead of leaving them as plain text (confirmed missing on
   `o-que-e-imigracao-guia-completo`).
7. **Optional:** `/materiais` items surfaced contextually from the clusters they support (checklist from
   `/programas`, budget spreadsheet from `/custo-de-vida`, resume template from `/imigrar-como`).

---

## 4. Content gaps

- **G1 — No canonical "current IRCC processing times" page.** The single biggest structural gap: an
  entire recurring content stream (~10 blog posts) has no data-page home to consolidate into (see C2).
- **G2 — No single tools index/hub page.** 9 tools exist with no landing page listing all of them; new
  visitors can only discover tools they happen to be cross-linked to.
- **G3 — NOC ↔ profession mapping is incomplete.** ~90 NOC pages vs. 36 profession guides — most NOC
  codes (especially STEM/Trades codes like 21100 Físico, 21210 Matemático, 72010 Supervisor, 73100
  Empilhador, 73110 Vidraceiro) have no matching `/imigrar-como/{profession}` page and vice versa. A
  systematic NOC→profession (and profession→NOC, one-to-many) linking layer is missing, not just weakly
  implemented.
- **G4 — Territories inconsistently covered.** `/pnp/northwest-territories` exists with no
  `/programas/pnp_nt` counterpart; Nunavut has no PNP page in either family (correct, Nunavut has no PNP
  program, but worth an explicit "Nunavut has no PNP" note somewhere in the `/pnp` hub for completeness/
  people who search for it).
- **G5 — No "Express Entry vs. PNP" or "which program is right for me" comparison content** beyond the
  quiz itself — a natural pillar/spoke opportunity sitting between `/programas` and `/pnp` that currently
  has no dedicated page (the `/comparador` route exists in the sitemap but currently serves homepage
  content — see C6).
- **G6 — No credential-recognition (ECA / regulatory body licensing) pillar.** Profession pages for
  regulated occupations (medico, dentista, enfermeiro, fisioterapeuta, farmaceutico, engenheiro-*,
  arquiteto, contador) each briefly gesture at licensing but there's no dedicated
  "reconhecimento de diploma/licença por profissão" hub — a high-intent, high-differentiation topic for
  a Brazil-specific audience that competitors (Kiwi Education, Entry Canada, TFA) already cover.
- **G7 — Blog has no content taxonomy.** No categories/tags separating "Notícias" (news/cadence) from
  "Guias" (evergreen) from "Cultura" (curiosity/culture posts like poutine, hockey, national symbols) —
  needed both for users and to make the cannibalization in C2/C3 visible and manageable going forward.
- **G8 — No study-permit-first pillar.** `/programas/pgwp_study` assumes a completed study path; there is
  no standalone "study permit / visto de estudante" program page independent of the PGWP→PR framing,
  despite `/blog/visto-de-estudante-canada-limite-2026`, `/blog/novas-regras-trabalho-estudante-20h-2026`,
  and `/blog/fim-politica-estudar-sem-permit-junho-2026` all existing as blog-only coverage of the topic.

---

## 5. Validation checklist (per skill spec)

- [x] Cannibalization instances flagged (6 groups, C1–C6, ranked by severity)
- [x] Hub→spoke completeness checked for all 8 named clusters (1 fails: NOC hub, see §1.5/§2 C3-adjacent)
- [ ] Every spoke has ≥3 incoming internal links — **not met**: NOC spokes rely on sitemap + at most 1
      inbound profession link; profession pages get exactly the hub link + whatever blog/homepage
      happens to reference them (not systematic)
- [x] No orphan pages in the *sitemap* sense (all pages appear to be crawlable via sitemap), but several
      are orphaned from their *thematic hub* (NOC pages from `/buscador-noc`)
- [ ] Template/intent match — **flagged**: `/comparador`, `/prontidao`, `/templates`, `/faq` serve
      homepage content instead of intent-matched templates (C6)
- [x] Word count spot-checked: hubs 170–480 words, program pages ~170–200 (thin), NOC/profession/city
      pages ~150–250 (thin but schema-supported), blog evergreen guide ~1,400+ words (healthy)
- [x] Total cluster count within typical constraints structurally, but several clusters (PNP, Express
      Entry data, LMIA, CRS) are functionally split across 2–4 URL families that should be 1

---

## Structured findings (Content Architecture category, for audit-data.json)

```json
{
  "category": "Content Architecture",
  "site": "immigracan.com.br",
  "methodology_note": "Domain not indexed by Google (site: search returned 0 results); live pairwise SERP-overlap not possible. Used structural/topical-overlap scoring on crawled HTML + crawl-data.psv, corroborated against real-world facts via WebSearch where noted.",
  "findings": [
    {
      "id": "C1",
      "severity": "critical",
      "type": "cannibalization+factual_contradiction",
      "cluster": "PNP - Ontario",
      "urls": ["/pnp/ontario", "/programas/pnp_ontario", "/blog/oinp-foi-revogado-alternativas-2026", "/blog/imigrar-por-ontario-pnp-dicas-2026"],
      "overlap_score_estimate": "8-9/10 (pnp/ontario vs programas/pnp_ontario vs blog/oinp-foi-revogado); 5-6/10 for the dicas post",
      "description": "programas/pnp_ontario states 'Status: Ativo' with live streams while pnp/ontario and the oinp-foi-revogado blog post correctly state OINP was revoked 30 May 2026 (Ontario Regulation 47/26). Contradictory facts on same query intent, confirmed against external sources.",
      "recommendation": "Consolidate on /pnp/ontario as canonical; redirect or repurpose /programas/pnp_ontario as a non-status-claiming comparison entry; merge blog posts as changelog updates; fix stale 'Ativo' claim immediately."
    },
    {
      "id": "C2",
      "severity": "critical",
      "type": "cannibalization+content_gap",
      "cluster": "Express Entry draws / IRCC processing times (blog news cadence)",
      "urls_representative": ["/blog/sorteio-cec-primeiro-julho-2026", "/blog/sorteio-cec-3000-convites-junho-2026", "/blog/sorteio-cec-4000-convites-junho-2026", "/blog/tempos-processamento-lmia-julho-2026", "/blog/tempos-processamento-lmia-junho-2026", "/blog/tempos-de-processamento-ircc-junho-2026", "/express-entry/draws", "/historico-draws"],
      "post_count_estimate": {"draw_results": 15, "processing_times": 10},
      "overlap_score_estimate": "7-8/10 within each sub-group",
      "description": "Recurring monthly/biweekly posts cannibalize each other; the intended canonical pages (/express-entry/draws, /historico-draws) are themselves duplicative and non-interlinked; no canonical page exists at all for the processing-times sub-cluster (/estimador-de-prazo is a user-input tool, not a data page).",
      "recommendation": "Merge /express-entry/draws + /historico-draws into one URL; build new /tempos-processamento evergreen data hub; stop creating a new post per routine update; 301 old posts to canonical pages once merged."
    },
    {
      "id": "C3",
      "severity": "high",
      "type": "cannibalization",
      "cluster": "PNP - BC/Alberta/Quebec/Atlantic",
      "urls_representative": ["/pnp/british-columbia", "/programas/pnp_bc", "/blog/british-columbia-pnp-mudancas-2026", "/pnp/alberta", "/programas/pnp_ab", "/blog/imigracao-pnp-alberta-atualizacao-2026", "/pnp/quebec", "/programas/quebec_skilled", "/blog/imigrar-pelo-quebec-regras-2026", "/programas/atlantic_aip", "/blog/atlantic-immigration-program-prazos-2026"],
      "overlap_score_estimate": "5-7/10",
      "description": "Same triangulation pattern as C1 repeated for 4 more provinces/regions, not yet fact-checked individually.",
      "recommendation": "Same consolidation pattern as C1; audit each province's live program status before next content pass."
    },
    {
      "id": "C4",
      "severity": "medium",
      "type": "interlink_opportunity",
      "cluster": "CRS scoring",
      "urls": ["/calculadora-crs", "/simulador-cenarios", "/blog/pontuacao-crs-alta-como-pontuar-2026", "/blog/calculadora-crs-passo-a-passo-2026", "/blog/reformas-crs-express-entry-junho-2026"],
      "overlap_score_estimate": "4-6/10",
      "description": "Complementary intents (tool vs. explainer), not true cannibalization, but zero bidirectional linking observed.",
      "recommendation": "Add bidirectional links; not a merge/redirect candidate."
    },
    {
      "id": "C5",
      "severity": "medium",
      "type": "cannibalization",
      "cluster": "LMIA / work permit",
      "urls": ["/programas/work_permit_lmia", "/blog/trabalhar-no-canada-lmia-regras-2026", "/blog/tempos-processamento-lmia-julho-2026", "/blog/tempos-processamento-lmia-junho-2026", "/blog/lmia-prazos-melhoram-tfwp-streams-junho-2026", "/blog/fim-restricoes-lmia-8-regioes-canada-2026"],
      "overlap_score_estimate": "6-7/10 among timing posts; 4/10 program page vs news",
      "description": "Subset of C2's processing-time problem specific to LMIA.",
      "recommendation": "Route LMIA timing posts into the new /tempos-processamento hub (C2 fix); cross-link program page and practical guide."
    },
    {
      "id": "C6",
      "severity": "low",
      "type": "technical_duplicate_content",
      "cluster": "Unbuilt tool route stubs",
      "urls": ["/comparador", "/prontidao", "/templates", "/faq"],
      "description": "crawl-data.psv shows identical title/meta/canonical to homepage for these 4 URLs - likely unbuilt placeholder routes serving homepage content, indexed with robots:index,follow.",
      "recommendation": "Confirm intent with dev; noindex or complete before next crawl."
    }
  ],
  "hub_spoke_status": {
    "programas": {"hub_to_spoke": "complete", "spoke_count": 18, "issues": ["thin content ~170-200 words", "no schema", "no cross-links to /pnp"]},
    "pnp": {"hub_to_spoke": "complete", "spoke_count": 12, "issues": ["no cross-links to /programas/pnp_*", "coverage mismatch with /programas (NWT has no /programas counterpart)"]},
    "buscador_noc": {"hub_to_spoke": "BROKEN - zero links from hub to any of ~90 spokes", "spoke_count": 90, "issues": ["orphaned spokes relative to own hub", "no cross-links to /imigrar-como or /pnp"]},
    "imigrar_como": {"hub_to_spoke": "complete", "spoke_count": 36, "issues": ["spokes link to only 1 NOC code each despite multi-code professions", "no /pnp or /custo-de-vida cross-links"]},
    "custo_de_vida": {"hub_to_spoke": "complete", "spoke_count": 15, "issues": ["no cross-links to /pnp or /imigrar-como observed"]},
    "materiais": {"hub_to_spoke": "not fully verified", "spoke_count": 6, "issues": ["not surfaced contextually from other clusters"]},
    "express_entry_draws_family": {"hub_to_spoke": "N/A - flat family, not hub/spoke", "url_count": 4, "issues": ["pages don't interlink", "near-duplicate content between /express-entry/draws and /historico-draws"]},
    "blog": {"hub_to_spoke": "index lists all posts, no categorization", "post_count": "150+", "issues": ["no tags/categories/pagination", "recurring news posts don't interlink", "evergreen guide doesn't hyperlink named programs/tools in body"]}
  },
  "content_gaps": [
    "G1: no canonical current-IRCC-processing-times data page",
    "G2: no tools index/hub page for the 9 calculators/tools",
    "G3: incomplete NOC<->profession mapping (~90 NOC vs 36 professions, mostly unmapped both directions)",
    "G4: Northwest Territories PNP has no /programas counterpart; Nunavut has no PNP page/explanatory note in either family",
    "G5: no Express-Entry-vs-PNP comparison pillar (the /comparador route is an unbuilt stub)",
    "G6: no credential-recognition/ECA-by-profession pillar for regulated occupations",
    "G7: blog has no content taxonomy separating news-cadence from evergreen from culture content",
    "G8: no standalone study-permit pillar independent of PGWP->PR framing"
  ]
}
```
