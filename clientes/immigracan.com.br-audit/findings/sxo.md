# SXO Audit — immigracan.com.br
**SXO Gap Score** (separate from SEO Health Score) — see per-page scores below.
Audit date: 2026-07-23 | Locale of SERP checks: Brazil / pt-BR

## Primary Finding (lead insight)

**CRITICAL page-type/intent mismatch on commercial "consultant" and "true cost" queries.**
The site is not a licensed immigration consultancy — its own Terms of Use state (verbatim,
extracted from `/termos`): *"RCIC licenciado ou advogado especializado no Canadá"* should be
consulted for real decisions. Yet the site's only monetized asset is a R$19.90 one-time
AI-generated "eligibility report" plus a R$29.90/mo subscription, sold on `/precos` with **zero
trust signals** (no testimonials, no sample-report preview, no refund policy, no accuracy
disclosure, no schema). For the two commercial-intent query clusters most adjacent to this
business — **"consultor de imigração canadá"** (100% of top results are licensed
RCIC/lawyer consultancy Service Pages) and **"quanto custa imigrar para o canadá"** (dominant
result type is itemized-cost Blog Posts citing real government fees: CAD $600 language test,
$400 ECA, $400 medical, $825/adult processing, $500/adult RPRF, ~$24,083 proof of funds) —
ImmigraCan has no page that credibly serves either intent. `/precos` answers "how much does
*your product* cost," not "how much does immigration cost" or "who can I trust to handle my
case" — the two things these searchers actually want. This is a **CRITICAL** mismatch: ranking
for (or being compared against) these queries invites a public trust breach, since a visitor
expecting licensed guidance would find an AI-generated report with no credentialing.

Ranked by severity, the other five sampled pages range from ALIGNED-but-thin (blog guide) to
HIGH mismatch (thin program/city pages competing against 1,500+ word guides and government
sources).

---

## Limitations

- SERP checks were performed via WebSearch (Google-adjacent aggregated results), not a live,
  geolocated (Brazil), logged-out Google SERP scrape — PAA boxes, ads, AI Overview presence/
  absence, and exact ranking positions could not be directly observed and are inferred from
  the composition of returned organic results and their content patterns.
- Target pages were fetched via `render_page.py --mode auto` (raw HTML, `is_spa=false` for all
  six); word counts reflect the static HTML page shell. If any calculator/quiz input widgets
  are injected via client-side JS that the pre-render HTML doesn't expose as text, true
  interactive depth may be slightly understated — but the near-total absence of body copy,
  FAQ content, and schema is a static-HTML fact independent of that risk.
- `/precos` and `/calculadora-crs` currently carry the "2026" freshness signal in `<title>` and
  `publication_date` metadata (2026-01-01, likely a site-wide default rather than a true
  last-updated timestamp) — freshness scores below treat this as a weak, unverified signal.
- No access to Search Console/GA4 data, so ranking positions, CTR, and conversion data could
  not be verified against these mismatch findings — recommendations are based on SERP-pattern
  inference only.

---

## Per-Page SERP-Backwards Analysis

### 1. `/calculadora-crs` — target keyword: "calculadora crs" / "calculadora crs canada 2026"

| | |
|---|---|
| **SERP dominant type** | Tool / Interactive (~85%) — y-axis.com, libertyimmigration.ca/crs-calculator, crsscorecalculator.vercel.app, crscalculate.com, workvisa.guide/tools all return functional calculators. A meaningful share (Y-Axis, Liberty Immigration) are **Hybrid Tool+Service** — consultancy firms using the calculator as a lead-gen front door into a paid consultation. |
| **Confidence** | 85% Tool/Interactive, ~15% Hybrid (tool embedded in consultancy funnel) |
| **Target page classification** | Tool / Interactive (correct type) |
| **Mismatch severity** | **MEDIUM** — right type, badly under-executed |
| **Evidence** | Page body is 146 words, **zero JSON-LD schema** (confirmed empty via structured-data extraction — no WebApplication/SoftwareApplication schema on this specific URL, even though the homepage carries one), no FAQ, no explanation of what the CRS score means or how it maps to recent draw cutoffs, no visible link to the CRS-adjacent `/buscador-noc` (NOC/TEER lookup) tool despite that lookup being a documented dependency for CRS accuracy. Competitor sites explicitly surface "no fixed CRS score for 2026 — minimum changes every draw" — ImmigraCan doesn't contextualize the output against `/express-entry/draws`, an internal page it already has. |

### 2. `/quiz` — target keyword: "quiz elegibilidade imigração canadá" / "teste elegibilidade canada"

| | |
|---|---|
| **SERP dominant type** | Mixed: Tool/Interactive assessment (moving2canada.com "Canadian Immigration Eligibility Assessment — It's Free") + informational Blog/consultancy content (immi-canada.com, evisaimmigration.com, projetocanada.com) |
| **Confidence** | ~55% Tool, ~45% Hybrid Service+Content (consultancies using quiz-style content as a lead magnet toward paid consultation) |
| **Target page classification** | Tool / Interactive (Quiz schema present — a genuine positive differentiator) |
| **Mismatch severity** | **ALIGNED** on type, but **MEDIUM** on execution — search results explicitly note most competing tools are in English or generic; a dedicated pt-BR quiz is a real gap ImmigraCan fills well |
| **Evidence** | Only page in the sample with dedicated Quiz structured data. Body copy still thin (~130 words), no visible privacy/accuracy reassurance on-page (only in footer links), no social proof ("X mil brasileiros já fizeram o quiz"). |

### 3. `/precos` — no single head-term, but adjacent to "consultor de imigração canadá" and "quanto custa imigrar para o canadá"

| | |
|---|---|
| **SERP dominant type (consultor de imigração canadá)** | Service Page — **100%** of top 9 results (canada.com.vc, terryferreira.ca, futurecanimmigration.ca, lmconsultingservices.ca, entrycanada.com, immi-canada.com, integrativeimmigration.com, brasileiroscanada.com, evisaimmigration.com) are licensed-consultant firms with process/methodology sections, credential mentions (ICCRC/RCIC licensing), and consultation-booking CTAs. |
| **SERP dominant type (quanto custa imigrar)** | Blog Post / itemized-cost breakdown — ~90% (belta.org.br, evisaimmigration blog posts ×3, daitana.com.br) — expected answer structure is a **line-item table of real government + process costs**, not a product price list. |
| **Target page classification** | Product/Pricing Page (R$19.90 report / R$29.90/mo subscription) |
| **Mismatch severity** | **CRITICAL** |
| **Evidence** | Full extracted body text is 99 words: two plan descriptions, no comparison table, **zero schema** (jsonld-precos.json confirms 0 structured-data blocks despite two explicit price points — a missed Product/Offer rich-result opportunity even setting the intent mismatch aside), no testimonials, no sample report, no refund/guarantee language, no "this is an AI-generated estimate, not legal advice" disclosure on the page itself (that disclaimer only exists buried in `/termos`, which most buyers will never read before paying). If this page (or the site generally) is ever the surface a "consultor de imigração canadá" or "quanto custa imigrar" searcher lands on, it fails both intents: it isn't a licensed service, and it doesn't itemize real immigration costs. |

### 4. `/programas/express_entry_fsw` — target keyword: "express entry federal skilled worker requisitos"

| | |
|---|---|
| **SERP dominant type** | Hybrid (Service + informational content) ~75% — immigration.ca, canadim.com, moving2canada.com, elaarimmigration.com, canadabychoice.com all publish long-form eligibility guides with embedded consultation CTAs; one **Government Resource** result (canada.ca — outside the 8-type taxonomy, treated as top-tier authority) ~12%; one clinical/adjacent result (panelphysician.ca) ~12% |
| **Confidence** | 75% Hybrid, 12% Government, 12% other |
| **Target page classification** | Hybrid / informational program page (closest fit) |
| **Mismatch severity** | **HIGH** |
| **Evidence** | Body text is 161 words total: "Resumo do Programa," "Requisitos de Elegibilidade" (TEER 0–3, 1,560h experience, CLB 7, 67/100 point minimum, ECA), "Como Aplicar" (3 steps). This is directionally correct and cites the specific figures searchers want (CLB7, 67-point minimum, TEER bands) — genuinely good targeting of the underlying facts. But it is 5–10× thinner than ranking competitors, has **zero schema** (no Article/FAQPage/HowTo despite clearly structured Q&A-style content), no points-grid table, no worked example, and — notably — **no internal CTA linking this content to `/calculadora-crs` or `/quiz`** in the body (only standard nav links), a missed conversion path from an informational page to the site's own tools. One genuine strength: it links out to the official canada.ca page with `rel="noopener noreferrer"` — a real E-E-A-T positive that should be preserved and expanded to other program pages. |

### 5. `/custo-de-vida/toronto` — target keyword: "custo de vida em toronto"

| | |
|---|---|
| **SERP dominant type** | Blog Post / long-form guide ("Guia 2026," "Guia completo") — ~85% (ie.com.br, intercultural.com.br, holafly esim, trinityintercambio.com.br, newayforyou.com); Numbeo.com is a **Tool/Data** reference (~15%) with crowdsourced, dated cost-of-living data |
| **Confidence** | 85% Blog/Guide, 15% Tool/Data |
| **Target page classification** | Blog Post / data-snippet page |
| **Mismatch severity** | **HIGH** |
| **Evidence** | Body text is 104 words: one average rent figure (CAD 2,450 for a 1-bedroom downtown), one average salary figure (CAD 5,800/mo), no source/methodology citation. Competing "guias completos" segment by student vs. professional budgets, break down rent by neighborhood, and cover transport/groceries/visa costs — the CAD figures ImmigraCan shows are also **not cited to a source**, unlike Numbeo's user-submitted, dated data model, which undermines the trust dimension for a figure-driven page type. FAQPage schema is present (a genuine plus) but only answers 2 questions vs. the multi-question depth competitor content covers. |

### 6. `/blog/o-que-e-imigracao-guia-completo` — target keyword: "o que é imigração"

| | |
|---|---|
| **SERP dominant type** | Blog Post / encyclopedic-definitional (~75%) — educamaisbrasil.com.br, blog.mackenzie.br, conceito.de, Wikipedia, todamateria.com.br; Video (~25%) — 2 of 8 results are YouTube explainer videos |
| **Confidence** | 75% Blog/Definitional, 25% Video |
| **Target page classification** | Blog Post (Article schema present) |
| **Mismatch severity** | **ALIGNED** (best-fitting page in the sample) |
| **Evidence** | 1,050 words, clean H2/H3 hierarchy (types of migration, imigração vs. emigração, Canada-specific section, glossary of terms), Article schema with datePublished/dateModified/author/publisher, internal CTAs to `/quiz` and `/calculadora-crs` embedded in body copy. Gaps: (a) the query itself is a broad, non-Canada-specific, high-competition topic dominated by educational/encyclopedic domains and Wikipedia — very difficult to outrank regardless of on-page quality, and much of that search volume has zero Canada-immigration commercial intent; (b) no FAQPage schema despite clearly definitional Q&A structure; (c) author is a generic "Organization" entity, not a named contributor — weak E-E-A-T for a topic Google increasingly serves via AI Overview synthesis; (d) no video, despite video format appearing in 25% of top results; (e) only one static image, no infographic distinguishing the 5 migration types. |

---

## User Stories (SERP-signal-derived)

1. **As an anxious first-time researcher** (awareness stage), I want a simple definition of my
   options before committing to any tool, because I don't yet know if "imigração" applies to my
   situation, **but I'm blocked by acronym-dense content** (TEER, ECA, ITA, CLB used without
   glossary) on `/programas/express_entry_fsw`.
   *(Source: "o que é imigração" SERP dominated by plain-language encyclopedic/educational
   content, contrasted with the FSW page's unexplained acronyms.)*

2. **As a skilled-trades or occupation-specific worker** (consideration stage), I want to know
   if my specific NOC/TEER category qualifies before doing anything else, because generic CRS
   calculators don't tell me if my job even counts, **but I'm blocked** by `/calculadora-crs`
   not cross-linking to the site's own `/buscador-noc` tool.
   *(Source: immigration.ca ranking for "Eligible Occupations 2026," and FSW SERP results
   emphasizing "376 occupations... NOC 2021 TEER 0, 1, 2 or 3.")*

3. **As someone ready to pay for a personalized report** (decision stage), I want reassurance
   that a R$19.90 AI-generated report is worth it and accurate, because I'm about to spend
   real money on my immigration future, **but I'm blocked by a total absence of trust
   signals** — no sample report, no testimonials, no refund policy, no accuracy/limitation
   disclosure — on `/precos` itself.
   *(Source: absence of Product/Offer schema and trust content on `/precos`; compare to the
   "trust gap" pattern in the user-story framework — ads/SERPs for comparable purchases
   typically emphasize guarantees and reviews, which are wholly missing here.)*

4. **As a commercial-intent searcher looking for a real immigration consultant**
   (decision stage), I want to find a licensed professional who can handle my case end-to-end,
   because I don't trust myself to navigate Express Entry alone, **but I'm blocked** because
   ImmigraCan is not a licensed RCIC/law firm (per its own `/termos` disclaimer) and has no
   page that signals credentialing, case studies, or a human consultation path.
   *(Source: 100% of "consultor de imigração canadá" top results are licensed-consultant
   Service Pages with ICCRC/RCIC licensing language — a persona and intent this site cannot
   currently serve honestly.)*

5. **As a cost-conscious relocation planner** (consideration stage), I want an itemized,
   sourced breakdown of both government/process costs and city living costs, because I'm
   budgeting a multi-year move, **but I'm blocked by unsourced, single-line figures** on both
   `/precos` (only shows product pricing, not immigration cost) and `/custo-de-vida/toronto`
   (CAD figures with no cited methodology).
   *(Source: "quanto custa imigrar" SERP returning itemized fee tables — CAD $600 language
   test, $400 ECA, $825/adult processing, ~$24,083 proof of funds — vs. Numbeo's dated,
   sourced cost-of-living model ranking for "custo de vida em toronto.")*

Journey-stage coverage: Story 1 & 5 partly = awareness/consideration, Story 2 = consideration,
Story 3 & 4 = decision. All three stages represented.

---

## Gap Analysis — SXO Gap Score (7 dimensions / 100 pts)

| Page | Page Type (15) | Content Depth (15) | UX Signals (15) | Schema (15) | Media (15) | Authority (15) | Freshness (10) | **Total** |
|---|---|---|---|---|---|---|---|---|
| `/blog/o-que-e-imigracao-guia-completo` | 14 | 11 | 12 | 10 | 6 | 6 | 7 | **66/100** |
| `/quiz` | 13 | 5 | 8 | 10 | 2 | 4 | 6 | **48/100** |
| `/programas/express_entry_fsw` | 10 | 4 | 10 | 3 | 2 | 8 | 6 | **43/100** |
| `/calculadora-crs` | 13 | 5 | 10 | 2 | 2 | 4 | 6 | **42/100** |
| `/custo-de-vida/toronto` | 9 | 3 | 8 | 8 | 2 | 3 | 6 | **39/100** |
| `/precos` | 6 | 3 | 6 | 1 | 1 | 2 | 5 | **24/100** |

**Key evidence behind the low scores:**
- **Schema**: `/calculadora-crs` and `/precos` — the two pages with the clearest commercial/
  transactional value — carry the *least* structured data on the entire site (0 blocks each).
  The homepage's SoftwareApplication/FAQPage/Offer schema does not propagate to the pages
  where it would matter most for rich-result eligibility.
- **Media**: every sampled page except the blog guide (1 hero image) has **zero images** —
  no CRS score-breakdown visual, no sample-report screenshot, no rent-by-neighborhood map for
  Toronto, no program-comparison graphic.
- **Authority**: no page in the sample carries a named author, credential, citation to IRCC/
  Statistics Canada primary sources (beyond one outbound link on the FSW page), or third-party
  validation (reviews, press mentions, testimonials).
- **Content Depth**: five of six sampled pages have full body text under 165 words; the sole
  exception (blog guide, 1,050 words) is also the only page classified ALIGNED.

---

## Persona Derivation & Scoring

**P1 — Anxious First-Time Researcher** (awareness). Goal: understand if immigration to Canada
is realistic before investing time/money. Emotional state: confused/overwhelmed. Evidence:
"o que é imigração" dominated by plain-language educational sources; FSW page's unexplained
acronyms (TEER, ECA, ITA).

**P2 — Skilled-Trades / Occupation-Fit Checker** (consideration). Goal: confirm their specific
NOC/TEER occupation qualifies before doing anything else. Evidence: FSW SERP explicitly
surfaces "376 occupations... TEER 0-3," competitor "Eligible Occupations 2026" content.

**P3 — Ready-to-Pay Report Buyer** (decision). Goal: feel confident a R$19.90/R$29.90 AI report
is worth paying for. Evidence: total absence of trust content/schema on `/precos`.

**P4 — Commercial-Intent Consultancy Seeker** (decision). Goal: find a licensed professional
to handle their case. Evidence: 100% of "consultor de imigração canadá" results are licensed
Service Pages; ImmigraCan's own `/termos` disclaims being one.

**P5 — Cost-Conscious Relocation Planner** (consideration). Goal: get a real, sourced dollar
breakdown of both immigration process costs and destination-city living costs. Evidence:
"quanto custa imigrar" itemized-fee SERP; Numbeo's sourced, dated cost-of-living model.

### Persona Scores by Page

**`/precos`**

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| P3 – Ready-to-Pay Buyer | 22/25 | 18/25 | 5/25 | 12/25 | **57/100** | Needs Work |
| P4 – Consultancy Seeker | 8/25 | 15/25 | 4/25 | 10/25 | **37/100** | Critical Mismatch |

Weakest persona: **P4 (37/100)**. Top issue: page (and site) offers an unlicensed AI product
where the searcher expected a credentialed human consultant. Recommended fix: add an explicit
"O que NÃO somos" section above the pricing tables clarifying ImmigraCan is an informational/
estimation tool, not a licensed RCIC/law firm, with a clear referral path (e.g., a partner
directory or "encontre um RCIC licenciado" outbound link) — this converts an unaddressable
mismatch into an honest trust-building moment rather than a silent gap.

**`/calculadora-crs`**

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| P1 – First-Time Researcher | 19/25 | 14/25 | 6/25 | 16/25 | **55/100** | Needs Work |
| P2 – Occupation-Fit Checker | 14/25 | 12/25 | 5/25 | 15/25 | **46/100** | Needs Work |

Weakest persona: **P2 (46/100)**. Top issue: no visible NOC/TEER cross-link or explanation of
how occupation classification feeds the CRS score. Recommended fix: add an inline "não sabe seu
NOC/TEER? Use o Buscador de NOC" CTA directly beside the occupation/experience input field,
linking to `/buscador-noc`.

**`/quiz`**

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| P1 – First-Time Researcher | 20/25 | 18/25 | 8/25 | 20/25 | **66/100** | Good |
| P3 – Ready-to-Pay Buyer | 15/25 | 16/25 | 6/25 | 14/25 | **51/100** | Needs Work |

Weakest persona: **P3 (51/100)**. Top issue: the quiz doesn't build any advance trust toward
the eventual R$19.90 upsell. Recommended fix: add a one-line "o que você recebe no relatório
completo" preview (2-3 bullet points + a blurred sample screenshot) on the quiz results screen
before the paywall.

**`/programas/express_entry_fsw`**

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| P2 – Occupation-Fit Checker | 20/25 | 16/25 | 12/25 | 14/25 | **62/100** | Good |
| P1 – First-Time Researcher | 10/25 | 8/25 | 10/25 | 12/25 | **40/100** | Needs Work |

Weakest persona: **P1 (40/100)**. Top issue: acronym-dense copy (TEER, ECA, ITA, CLB) with no
glossary or tooltips. Recommended fix: add inline plain-language expansions on first use (e.g.
"TEER (nível de treinamento e responsabilidade do seu cargo)") and a "Calcule sua pontuação CRS
agora" CTA directly under the Requisitos section — currently missing entirely from body copy.

**`/custo-de-vida/toronto`**

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| P5 – Cost-Conscious Planner | 18/25 | 16/25 | 6/25 | 14/25 | **54/100** | Needs Work |
| P1 – First-Time Researcher | 12/25 | 14/25 | 6/25 | 10/25 | **42/100** | Needs Work |

Weakest persona: **P1 (42/100)**. Top issue: no CTA connecting cost data to the site's own
`/calculadora-proof-of-funds` tool. Recommended fix: add "Veja quanto você precisa comprovar
para imigrar" CTA linking cost-of-living figures directly to the proof-of-funds calculator.

**`/blog/o-que-e-imigracao-guia-completo`**

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| P1 – First-Time Researcher | 20/25 | 20/25 | 10/25 | 18/25 | **68/100** | Good |

Best-performing page/persona combination in the sample. Top remaining issue: no named author/
credential (Trust 10/25). Recommended fix: add a byline with a real contributor name/credential
or an "Equipe ImmigraCan / revisado por [credential]" line plus one citation to a primary source
(StatCan, IRCC, or UN migration data) for the definitional claims.

### Systemic Issues (across all personas/pages)
- **Trust dimension is the lowest score in every single persona/page combination** (range
  4-12/25) — no page in the sample has testimonials, named authorship, credentials, citations,
  or guarantees. This is the single highest-leverage fix across the site.
- **Schema is absent or minimal on every money page** (`/precos`, `/calculadora-crs` = 0
  blocks), while present only on lower-commercial-value pages (quiz, toronto FAQ, blog
  article).

### Priority Actions (ranked by severity × reach)
1. **[CRITICAL]** Add an explicit non-licensed-consultancy disclosure + referral path on
   `/precos` (and ideally site-wide footer/header near pricing CTAs) — addresses P4's Critical
   Mismatch and closes the biggest legal/trust exposure on the site.
2. **[CRITICAL]** Add trust content to `/precos`: sample report preview, refund/guarantee
   language, "gerado por IA — não substitui aconselhamento jurídico" micro-disclosure, and
   Product/Offer JSON-LD schema.
3. **[HIGH]** Add WebApplication/SoftwareApplication schema + FAQ content to `/calculadora-crs`
   — the single highest-intent page on the site currently has no structured data at all.
4. **[HIGH]** Cross-link the tool cluster: `/calculadora-crs` ↔ `/buscador-noc` ↔
   `/express-entry/draws`, and `/custo-de-vida/toronto` ↔ `/calculadora-proof-of-funds` — closes
   P2 and P5 relevance/action gaps cheaply using content that already exists on the site.
5. **[MEDIUM]** Expand `/programas/express_entry_fsw` and `/custo-de-vida/toronto` body copy
   3-5x (points-grid table, occupation examples, rent-by-neighborhood breakdown) and add
   Article/FAQPage schema to close the Content Depth gap against ranking competitors.
6. **[MEDIUM]** Add a named author/credential byline and at least one primary-source citation
   to `/blog/o-que-e-imigracao-guia-completo` to lift its Authority score — the page is
   otherwise the strongest in the sample and a template for the rest of the site.

---

## Cross-Skill Recommendations
- E-E-A-T gaps (no authorship, no citations, no credentials) are present on every sampled page
  → recommend `/seo content` for a deep E-E-A-T remediation pass.
- Missing schema on `/precos` (Product/Offer) and `/calculadora-crs` (WebApplication/FAQPage)
  → recommend `/seo schema` for generation.
- Thin content (5 of 6 pages under 165 words) on program, city, and pricing pages
  → recommend `/seo page` for page-level depth audits.
- No local intent detected in this sample (no city-specific service-area content) — local
  audit not indicated for these six pages specifically.

---

## Structured Summary (for audit-data.json — Search Experience category)

```json
{
  "category": "search_experience",
  "primary_finding": {
    "type": "page_type_intent_mismatch",
    "severity": "CRITICAL",
    "summary": "Site sells an unlicensed AI-generated eligibility report on /precos with zero trust signals, while the two most relevant commercial-intent SERPs ('consultor de imigração canadá', 'quanto custa imigrar para o canadá') are dominated by licensed RCIC/lawyer Service Pages and itemized-cost Blog Posts respectively -- neither intent is credibly served."
  },
  "pages": [
    {"url": "/calculadora-crs", "serp_dominant_type": "Tool/Interactive", "confidence_pct": 85, "target_type": "Tool/Interactive", "mismatch_severity": "MEDIUM", "sxo_gap_score": 42},
    {"url": "/quiz", "serp_dominant_type": "Tool/Interactive + Hybrid", "confidence_pct": 55, "target_type": "Tool/Interactive", "mismatch_severity": "ALIGNED (execution gaps)", "sxo_gap_score": 48},
    {"url": "/precos", "serp_dominant_type": "Service Page (consultant query) / Blog Post (cost query)", "confidence_pct": 90, "target_type": "Product/Pricing Page", "mismatch_severity": "CRITICAL", "sxo_gap_score": 24},
    {"url": "/programas/express_entry_fsw", "serp_dominant_type": "Hybrid Service+Content", "confidence_pct": 75, "target_type": "Hybrid/Informational", "mismatch_severity": "HIGH", "sxo_gap_score": 43},
    {"url": "/custo-de-vida/toronto", "serp_dominant_type": "Blog Post/Guide", "confidence_pct": 85, "target_type": "Blog Post", "mismatch_severity": "HIGH", "sxo_gap_score": 39},
    {"url": "/blog/o-que-e-imigracao-guia-completo", "serp_dominant_type": "Blog Post/Definitional", "confidence_pct": 75, "target_type": "Blog Post", "mismatch_severity": "ALIGNED", "sxo_gap_score": 66}
  ],
  "weakest_persona": {"name": "Commercial-Intent Consultancy Seeker", "page": "/precos", "score": 37, "rating": "Critical Mismatch"},
  "systemic_issue": "Trust dimension scores lowest (4-12/25) across every persona x page combination; schema absent on the two highest-commercial-value pages (/precos, /calculadora-crs)."
}
```

---

Generate a PDF report? Use `/seo google report`
