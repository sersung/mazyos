# Schema.org / Structured Data Audit — immigracan.com.br

Audited: 2026-07-23
Method: sitemap sample (294 URLs, `urls.txt`), curl-based crawl signal (`crawl-data.psv`, 132 pages), and targeted `render_page.py` fetches with `--json-ld-output` for full block validation on: homepage, `/blog/o-que-e-imigracao-guia-completo`, `/precos`, `/express-entry/draws`, `/noc/30010`, `/custo-de-vida/toronto`, `/custo-de-vida/vancouver`, `/imigrar-como/eletricista`, `/pnp/ontario`, `/programas/pnp_ontario`, `/quiz`, `/calculadora-proof-of-funds`.

Format check: all JSON-LD found on the site uses `"@context": "https://schema.org"` (correct, HTTPS) and is served in raw (non-JS-rendered) HTML — `render_page.py` confirmed `mode_used: "raw"` / `is_spa: false` on every page tested, so schema is server-rendered and there is no raw-vs-rendered discrepancy to worry about.

---

## Summary Table

| Template | URL count (approx) | JSON-LD present | Types found |
|---|---|---|---|
| Homepage | 1 | Yes | WebSite, FAQPage, SoftwareApplication+Offer |
| `/quiz` | 1 | Yes | `Quiz` (non-rich-result type) |
| `/calculadora-crs`, `/conversor-clb`, `/simulador-cenarios`, `/historico-draws`, `/buscador-noc`, `/checklist-documentos` | 6 | **None** | — |
| `/calculadora-proof-of-funds`, `/calculadora-salario-liquido`, `/estimador-de-prazo` | 3 | Yes | WebApplication+Offer (no aggregateRating) |
| `/express-entry/draws`, `/draws/2023-2026`, `/dados/brasileiros-express-entry-2026` | 6 | Yes | Dataset, Organization (minimal) |
| `/custo-de-vida/{city}` | ~15 | Yes | FAQPage only — **no BreadcrumbList** |
| `/imigrar-como/{profession}` | ~34 | Yes | FAQPage + BreadcrumbList |
| `/pnp/{province}` | ~13 | Yes | FAQPage + BreadcrumbList |
| `/programas/pnp_{code}` and other `/programas/{id}` | ~18 | **None** | — (sibling template `/pnp/{province}` covering near-identical province content DOES have schema — inconsistent) |
| `/noc/{code}` | ~90 | Yes | FAQPage + BreadcrumbList — **no Occupation/DefinedTerm** |
| `/blog/{slug}` (sampled) | ~1 of N | Yes | Article only — **no BreadcrumbList**, weak author/publisher |
| `/precos` | 1 | **None** | — (two paid tiers, R$19.90 + R$29.90/mo, completely unmarked) |
| `/faq`, `/contato`, `/privacidade`, `/termos`, `/materiais`, `/programas` (index), `/blog` (index) | ~7 | None sampled | — |
| Organization (site-wide entity) | n/a | **Never found** | — |

---

## CRITICAL

### C1. `/precos` (pricing/checkout page) has zero structured data
Confirmed via direct fetch (`render_page.py … /precos --json`): `"block_count": 0`. This is the page where real money changes hands (R$19,90 one-time report; R$29,90/mo subscription — confirmed in `extracted_text`: "Plano Relatório Único (R$ 19,90)" / "Plano Acesso Premium (R$ 29,90/mês)"). No `Product`, `Service`, or `Offer` markup exists to describe either paid tier. For a YMYL commerce page this is the single highest-value gap on the site.

**Fix — recommended `Service` + `OfferCatalog` JSON-LD for `/precos`:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Relatório de Elegibilidade de Imigração ImmigraCan",
  "serviceType": "Análise de elegibilidade de imigração por IA",
  "provider": {
    "@type": "Organization",
    "name": "ImmigraCan",
    "url": "https://immigracan.com.br"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Brasil"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Brasileiros interessados em imigrar para o Canadá"
  },
  "url": "https://immigracan.com.br/precos",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Planos ImmigraCan",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Relatório Único",
        "url": "https://immigracan.com.br/precos",
        "price": "19.90",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock",
        "description": "Análise detalhada por IA enviada por e-mail, recomendação dos 3 melhores programas e checklist básico de próximos passos."
      },
      {
        "@type": "Offer",
        "name": "Acesso Premium (mensal)",
        "url": "https://immigracan.com.br/precos",
        "priceCurrency": "BRL",
        "price": "29.90",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "29.90",
          "priceCurrency": "BRL",
          "billingDuration": "P1M",
          "billingIncrement": 1
        },
        "availability": "https://schema.org/InStock",
        "description": "Até 10 simulações de cenários por mês, comparação avançada de províncias, atualizações de novos draws oficiais e checklist interativo."
      }
    ]
  }
}
```
Note: `Service` has no dedicated Google rich-result surface today, but it is the semantically correct type (this is a recurring digital service, not a shippable/physical good) and it is required groundwork before any `Offer`/price markup is valid at all — Google will not show price/currency for un-marked pages. If the business prefers to target Google's Product snippet instead, use `@type: Product` with the same `offers` array, but add `image` (required for Product) and do **not** add `aggregateRating`/`review` unless real customer reviews exist (see C2/M-series below on fabricated ratings).

---

### C2. `SoftwareApplication` (homepage) is missing `aggregateRating` — fails Google's Software App rich-result eligibility, and only represents the free tier
**Detected (validated, `@context`/`@type` correct):**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ImmigraCan – Simulador de Imigração para o Canadá",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "url": "https://immigracan.com.br",
  "description": "...",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL",
    "description": "Quiz gratuito com resultado instantâneo, sem cadastro."
  }
}
```
**Validation against Google's Software App structured data guidelines:**
- Required: `name` ✅, `aggregateRating` ❌ **MISSING** — without this property the page is **not eligible** for the Software App rich result (star rating + price shown in SERP) at all. The `Offer` and `applicationCategory` are present but are wasted without `aggregateRating`.
- Recommended: `operatingSystem` ✅, `applicationCategory` ✅, `offers` ⚠️ present but incomplete (see below).
- The same defect (missing `aggregateRating`) exists on every `WebApplication` block found on tool pages (`/calculadora-proof-of-funds`, `/calculadora-salario-liquido`, `/estimador-de-prazo`) — none of these can currently earn a Software App rich result either.

**Do not fabricate an `aggregateRating`** — Google explicitly prohibits self-generated/fake ratings and can issue a manual action for it. The correct remediation path is: (1) implement a genuine rating-collection mechanism (e.g., a lightweight NPS/star prompt after the quiz or report delivery), (2) only then add `aggregateRating` with real `ratingValue`/`reviewCount`/`ratingCount`.

**Second issue — Offer completeness:** the current single `Offer` for price "0" ignores the two paid products entirely, even though this same `SoftwareApplication` node is presumably the entry point to the paid report/subscription funnel. Replace the single `offers` object with an array (or `AggregateOffer`) covering all three tiers:
```json
"offers": [
  {
    "@type": "Offer",
    "name": "Quiz gratuito",
    "price": "0",
    "priceCurrency": "BRL",
    "description": "Quiz gratuito com resultado instantâneo, sem cadastro."
  },
  {
    "@type": "Offer",
    "name": "Relatório Único",
    "price": "19.90",
    "priceCurrency": "BRL",
    "url": "https://immigracan.com.br/precos"
  },
  {
    "@type": "Offer",
    "name": "Acesso Premium (mensal)",
    "price": "29.90",
    "priceCurrency": "BRL",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "29.90",
      "priceCurrency": "BRL",
      "billingDuration": "P1M"
    },
    "url": "https://immigracan.com.br/precos"
  }
]
```
Or, if a single price point is preferred for the rich-result snippet, use `AggregateOffer` with `lowPrice: "0"`, `highPrice: "29.90"`, `priceCurrency: "BRL"`, `offerCount: 3`.

---

### C3. No `Organization` schema anywhere on the site
Sampled homepage, blog post, `/precos`, NOC/PNP/profession/cost-of-living templates, and the Express Entry draws pages (which nest a bare `Organization` with only `name` inside `Dataset.creator`/`Article.publisher` — never as a standalone top-level entity). No page anywhere declares a full `Organization` with `logo`, `sameAs` (social/profile links), `founder`, or `contactPoint`.

This matters specifically because:
- This is a YMYL site (immigration advice + paid financial transactions) — Google's guidance on E-E-A-T signals for YMYL content explicitly calls out clear site/company identity (who is behind this, is it trustworthy) as a quality signal, and `Organization` + `sameAs` is the standard structured-data mechanism to reinforce that identity and support Knowledge Panel eligibility.
- Every `Organization` reference currently in use on the site (in `Article.publisher`, `Article.author`, `Dataset.creator`) is a bare `{"@type":"Organization","name":"ImmigraCan"}` stub with no `@id` — so Google cannot even reliably merge/dedupe these into one entity across pages.

**Fix — recommended site-wide `Organization` block (place on homepage, and reference by `@id` from `Article.publisher`/`Dataset.creator` elsewhere):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://immigracan.com.br/#organization",
  "name": "ImmigraCan",
  "url": "https://immigracan.com.br",
  "logo": {
    "@type": "ImageObject",
    "url": "https://immigracan.com.br/logo-schema.png",
    "width": 600,
    "height": 600
  },
  "description": "Ferramenta online que analisa perfis e calcula elegibilidade para programas de imigração canadense, com foco em brasileiros.",
  "email": "contato@immigracan.com.br",
  "sameAs": [
    "https://www.instagram.com/REPLACE_WITH_REAL_HANDLE",
    "https://www.linkedin.com/company/REPLACE_WITH_REAL_HANDLE"
  ]
}
```
**Important — do not deploy `sameAs`/`logo` URLs verbatim.** These are placeholders illustrating required structure only; replace with the site's real social profile URLs and a real ≥112×112px raster/vector logo asset (see C-adjacent finding on the favicon below — do **not** reuse `favicon.ico`). If ImmigraCan has no public social profiles yet, omit `sameAs` entirely rather than inventing one — a broken or fake `sameAs` link is worse than none.

---

## HIGH

### H1. Blog `Article` schema — `author` is `Organization`, not `Person` (weak E-E-A-T for YMYL content)
**Detected on `/blog/o-que-e-imigracao-guia-completo`:**
```json
"author": { "@type": "Organization", "name": "ImmigraCan" }
```
This is schema.org-valid (`author` accepts `Organization` or `Person`) but is a missed E-E-A-T opportunity: Google's guidance for YMYL/advice content recommends attributing articles to a named individual with visible expertise/credentials, since author trust signals matter more for content that influences life/financial decisions (here: immigration strategy). An anonymous "published by the brand" byline is the weakest form of authorship signal available.

**Recommended fix (adds a real named author while keeping the brand as publisher):**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "O Que É Imigração? Significado, Tipos e Guia Completo (2026)",
  "image": ["https://immigracan.com.br/blog/o-que-e-imigracao-guia-completo.png"],
  "datePublished": "2026-07-04",
  "dateModified": "2026-07-04",
  "author": {
    "@type": "Person",
    "name": "REPLACE_WITH_REAL_AUTHOR_NAME",
    "url": "https://immigracan.com.br/autores/REPLACE_WITH_SLUG",
    "jobTitle": "REPLACE (e.g., Consultor de Imigração / RCIC, ou Redator especializado)"
  },
  "publisher": {
    "@id": "https://immigracan.com.br/#organization"
  },
  "mainEntityOfPage": "https://immigracan.com.br/blog/o-que-e-imigracao-guia-completo",
  "articleSection": "geral",
  "keywords": "imigração, conceitos, emigração, refugiado, guia",
  "inLanguage": "pt-BR"
}
```
If no individual writer wants a byline, an acceptable middle ground per Google's guidance is to keep `Organization` as `author` but add a `reviewedBy: {"@type":"Person", ...}` for content reviewed by a credentialed immigration consultant — do not fabricate credentials that don't exist.

### H2. Blog `Article.publisher.logo` uses `favicon.ico` — non-standard image format for a "logo" property
**Detected:** `"logo": {"@type": "ImageObject", "url": "https://immigracan.com.br/favicon.ico"}`.
**Verified via direct fetch:** the file at that URL is a genuine multi-res `.ico` container whose largest embedded image is 256×256px PNG-in-ICO (`file` output: *"MS Windows icon resource - 1 icon, 256x256 with PNG image data"*). So the pixel dimensions technically clear Google's ≥112×112px minimum for logos — **but** `.ico` is not one of the image formats Google Images / Rich Results documentation lists as supported for structured-data image properties (BMP, GIF, JPEG, PNG, WebP, SVG). Serving `image/x-icon` content-type as a schema.org `logo` is non-compliant with best practice and risks the logo being silently ignored/unparsed by Google's renderer, even though it "looks" big enough.
**Fix:** point `logo` at a real PNG/SVG brand-mark asset (square, ideally 600×600px per Google's recommended max, min 112×112, max file size 5MB), e.g. `https://immigracan.com.br/logo-schema.png`, and reuse the same asset in the top-level `Organization.logo` from C3.

### H3. Blog `Article.image` is a relative URL, not absolute
**Detected:** `"image": "/blog/o-que-e-imigracao-guia-completo.png"`.
**Verified:** the relative path is genuinely relative in the raw JSON-LD (not resolved server-side) — confirmed by fetching the JSON-LD block directly. The file itself resolves correctly at the absolute URL `https://immigracan.com.br/blog/o-que-e-imigracao-guia-completo.png` (verified: 200 OK, PNG, 1200×630px — good aspect ratio/size for Article rich results). The image asset itself is fine; only the JSON-LD reference is malformed.
Google's structured data guidelines state image URLs "must be absolute", so this is a real (if often silently tolerated) validation gap — Google's crawler generally does resolve same-origin relative URLs against the page's base URL successfully in practice, but this should not be relied upon, and the Rich Results Test / Schema Markup Validator will flag it.
**Fix:** `"image": ["https://immigracan.com.br/blog/o-que-e-imigracao-guia-completo.png"]` (array form recommended by Google so multiple aspect ratios can be added later, e.g., 16:9, 4:3, 1:1).

### H4. No `BreadcrumbList` on blog posts
Confirmed: the sampled post has exactly one JSON-LD block (`Article` only). This is inconsistent with the NOC, `/imigrar-como/{profession}`, and `/pnp/{province}` templates, all three of which already correctly implement `BreadcrumbList`. Blog posts sit at least 2 levels deep (`Home > Blog > {post}`) and are exactly the kind of URL where Google's breadcrumb rich result (replacing the raw URL in the SERP snippet) provides real value.
**Fix:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://immigracan.com.br/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://immigracan.com.br/blog" },
    { "@type": "ListItem", "position": 3, "name": "O Que É Imigração? Significado, Tipos e Guia Completo", "item": "https://immigracan.com.br/blog/o-que-e-imigracao-guia-completo" }
  ]
}
```

### H5. `/programas/pnp_{code}` template (≥13 pages, e.g. `pnp_ontario`, `pnp_bc`, `pnp_ab`, `pnp_mb`, `pnp_sk`, `pnp_nb`, `pnp_ns`, `pnp_pe`, `pnp_nl`, `pnp_yt`, plus `atlantic_aip`, `quebec_skilled`, `family_sponsorship`, `pgwp_study`, `work_permit_lmia`, `express_entry_fsw/fst/cec`) has **zero** structured data
Verified directly: `render_page.py … /programas/pnp_ontario --json` → `"block_count": 0`. This is notable because the sibling template `/pnp/{province}` (e.g. `/pnp/ontario`) covering closely related province-program content **does** carry `FAQPage` + `BreadcrumbList` — confirmed via direct fetch. This is an inconsistent implementation across ~18 program-detail pages that otherwise look like prime FAQ/breadcrumb candidates (each has a clear H1, ~150-475 words of program-specific eligibility content per `crawl-data.psv`).
**Fix:** port the same `FAQPage` + `BreadcrumbList` pattern already live on `/pnp/{province}` onto every `/programas/{id}` page (breadcrumb: `Início > Programas > {Program Name}`). Separately flag to the content team: having near-duplicate province-program content live at two different URL patterns (`/pnp/ontario` and `/programas/pnp_ontario`) is a content-architecture/duplicate-content risk independent of schema — worth a canonical-tag or consolidation review outside this audit's scope.

### H6. `/custo-de-vida/{city}` template (~15 pages) has `FAQPage` only — no `BreadcrumbList`
Verified on `/custo-de-vida/toronto` and `/custo-de-vida/vancouver`: both return exactly one JSON-LD block (`FAQPage`). These are 2-level-deep URLs (`Home > Custo de Vida > {City}`) that would benefit from the same breadcrumb pattern already implemented on NOC/profession/PNP templates.
**Fix (Toronto example, replicate per city):**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://immigracan.com.br/" },
    { "@type": "ListItem", "position": 2, "name": "Custo de Vida", "item": "https://immigracan.com.br/custo-de-vida" },
    { "@type": "ListItem", "position": 3, "name": "Toronto", "item": "https://immigracan.com.br/custo-de-vida/toronto" }
  ]
}
```

---

## MEDIUM

### M1. NOC occupation pages (~90 pages) have no `Occupation`/`DefinedTerm` markup describing the occupation entity itself
Confirmed on `/noc/30010`, `/noc/31100`, etc.: only `FAQPage` + `BreadcrumbList` are present. Each page's core content — a NOC code, English/Portuguese occupation name, TEER level, and Express Entry category (Healthcare/STEM/Trades/Transport/Agriculture/Education) — is exactly the kind of structured fact that benefits from explicit entity markup, even though there is no Google Rich Result surface for occupation codes. This is an entity-clarity / AI-answer-engine (GEO) opportunity, not a SERP-feature opportunity — flag accordingly (no guaranteed ranking/rich-result benefit, low risk to add).
**Recommended addition (NOC 30010 example):**
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Gerente de serviços de saúde",
  "alternateName": "Managers in health care",
  "termCode": "30010",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "National Occupational Classification (NOC) 2021",
    "url": "https://noc.esdc.gc.ca/"
  },
  "description": "Código NOC 30010, TEER 0, categoria Healthcare. Elegível para o draw Healthcare do Express Entry canadense."
}
```
`DefinedTerm`/`DefinedTermSet` is the stable, non-pending core-vocabulary choice. Schema.org also has an `Occupation` type (used elsewhere for `JobPosting.occupationalCategory`), but it originates from the pending/pre-release extension and has narrower renderer support — `DefinedTerm` is the safer choice here since there is no rich-result dependency either way.

### M2. `Dataset` schema on Express Entry draws pages is minimal — missing several Google-recommended (non-required) properties
Confirmed on `/express-entry/draws` and its year archives (`/2023` through `/2026`): `Dataset` block has only `name`, `description`, `creator`, `isAccessibleForFree`, `inLanguage`. Google's Dataset structured-data guidelines list `name` and `description` as the only hard requirements, but recommend `url`, `license`, `keywords`, `identifier`, `temporalCoverage`, `variableMeasured`, and `distribution` for full rich-result quality/eligibility robustness. This is genuinely tabular numeric data (draw dates, CRS cutoffs, ITAs issued, categories) that is a strong natural fit for the Dataset rich result if fleshed out.
**Recommended enhancement:**
```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Express Entry Draws — Histórico",
  "description": "Dataset atualizado com todos os draws do Express Entry canadense, incluindo data, categoria, número de ITAs emitidos e CRS mínimo.",
  "url": "https://immigracan.com.br/express-entry/draws",
  "creator": { "@id": "https://immigracan.com.br/#organization" },
  "isAccessibleForFree": true,
  "inLanguage": "pt-BR",
  "license": "https://immigracan.com.br/termos",
  "keywords": ["Express Entry", "CRS", "Canada immigration draws", "IRCC"],
  "temporalCoverage": "2023-01-01/2026-12-31",
  "variableMeasured": ["CRS mínimo", "ITAs emitidos", "categoria do draw", "data do draw"]
}
```

### M3. Inconsistent schema coverage across the "free tools" suite; `/quiz` uses a non-rich-result `Quiz` type
- `/calculadora-proof-of-funds`, `/calculadora-salario-liquido`, `/estimador-de-prazo` → `WebApplication` + `Offer` (valid, but see C2 — missing `aggregateRating` blocks rich-result eligibility for these too).
- `/calculadora-crs`, `/conversor-clb`, `/simulador-cenarios`, `/historico-draws`, `/buscador-noc`, `/checklist-documentos` → **no structured data at all**, despite being functionally identical free calculator/tool pages to the ones above.
- `/quiz` → a bespoke `{"@type": "Quiz", ...}` block (verified: valid schema.org vocabulary, correctly formed with `name`, `description`, `inLanguage`, `educationalLevel`, `assesses` — not deprecated). However, `Quiz` has **no Google Rich Results surface**; Google only recognizes `SoftwareApplication`/`WebApplication`/`MobileApplication`/`VideoGame` for the "Software App" feature. Using `Quiz` here means this, the single most important conversion page on the site, currently cannot earn any Google rich result.
**Fix:** standardize every free-tool page (including `/quiz`) on `WebApplication` + `Offer` (mirroring the three pages that already do it correctly), and once genuine ratings exist, add `aggregateRating` across the board. `Quiz` type markup can be kept *in addition* to `WebApplication` (they're not mutually exclusive — use `@graph` or two separate `<script>` blocks) if the team wants to preserve the more semantically precise educational-assessment typing for AI/GEO purposes, but `WebApplication` should be the primary type for Google eligibility.

### M4. `WebSite` schema lacks `publisher` linkage; no `potentialAction` (SearchAction) — low priority
Confirmed on homepage: `WebSite` has `name`, `url`, `description`, `inLanguage`, but no `publisher` (should reference the `Organization` from C3 via `@id` once it exists) and no `potentialAction`. Checked `urls.txt` for a sitewide search endpoint — none exists (`/buscador-noc` is a narrow occupation-code search tool, not a general site search), so a `SearchAction`/Sitelinks-searchbox recommendation is **not applicable** unless a general search feature is built. Add `publisher` once Organization schema (C3) ships; do not add `potentialAction` without a real search endpoint behind it.

---

## LOW / INFO

### L1. `FAQPage` (homepage, NOC pages, custo-de-vida pages, `/imigrar-como/*`, `/pnp/*`) — no Google SERP benefit, informational only
Per current policy, Google retired the FAQ rich result for all sites (May 7, 2026), so none of these existing, correctly-structured `FAQPage` blocks (validated: proper `mainEntity` array of `Question`/`acceptedAnswer` pairs matching visible on-page content) can earn a SERP feature anymore. They are not incorrect or harmful — just no longer providing search-visibility upside. Any residual value is unconfirmed AI/LLM-citation (GEO) benefit. **Recommendation: do not invest further engineering effort expanding FAQPage coverage; it's fine to leave existing instances as-is since they cost nothing and match visible content, but do not treat "missing FAQPage" as a gap anywhere in this audit.** These are genuine editorial FAQ blocks (not user-generated Q&A), so `QAPage` is not the correct type for any of them.

### L2. `Quiz` type on `/quiz` — valid schema.org type, not deprecated
Confirmed valid, current schema.org vocabulary (`https://schema.org/Quiz`, subtype of `LearningResource`/`CreativeWork`). Not on Google's deprecated list. Simply has no Rich Results surface today (see M3).

---

## Validation Checklist Results (per block type found)

| Check | WebSite | FAQPage | SoftwareApplication/WebApplication | Article | Dataset | BreadcrumbList | Quiz |
|---|---|---|---|---|---|---|---|
| `@context` = https://schema.org | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| `@type` valid, not deprecated | Pass | Pass (no rich result — L1) | Pass | Pass | Pass | Pass | Pass (no rich result) |
| Required properties present | Pass | Pass | **Fail** (`aggregateRating` missing — C2) | Pass (Article's own minimums met) | Pass | Pass | Pass |
| Property value types correct | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| No placeholder text | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| URLs absolute | Pass | n/a | Pass | **Fail** (`image` relative — H3) | Pass | Pass | n/a |
| Dates ISO 8601 | n/a | n/a | n/a | Pass (`2026-07-04`) | n/a | n/a | n/a |

---

## Priority Action List

1. **Critical** — Add `Service`/`Offer` schema to `/precos` (C1).
2. **Critical** — Fix `SoftwareApplication`: add all three price tiers to `offers`; do not add `aggregateRating` until real reviews exist, then add it (C2).
3. **Critical** — Add site-wide `Organization` schema with real logo + real `sameAs` (C3).
4. **High** — Swap blog `Article.author` from bare `Organization` to a named `Person` (or add `reviewedBy`) (H1).
5. **High** — Replace `favicon.ico` publisher logo with a proper PNG/SVG brand asset (H2).
6. **High** — Fix relative `image` URL on `Article` schema to absolute (H3).
7. **High** — Add `BreadcrumbList` to blog posts (H4) and to `/custo-de-vida/{city}` pages (H6).
8. **High** — Port `FAQPage`+`BreadcrumbList` from `/pnp/{province}` onto the currently-bare `/programas/{id}` template (H5).
9. **Medium** — Add `DefinedTerm` occupation markup to NOC pages (M1); enrich `Dataset` on draws pages (M2); standardize `WebApplication`+`Offer` across all free-tool pages including `/quiz` (M3); link `WebSite.publisher` to Organization once built (M4).
10. **Low/Info** — No action needed on existing `FAQPage` usage; it's valid and harmless, just no longer SERP-rewarded.

---

## Files referenced
- `C:\Users\pc\immigracan.com.br-audit\urls.txt` — full 294-URL sitemap list
- `C:\Users\pc\immigracan.com.br-audit\crawl-data.psv` — 132-row curl-based `has_jsonld`/`jsonld_types` signal
- `C:\Users\pc\immigracan.com.br-audit\jsonld-home.json`, `jsonld-blog.json`, `jsonld-precos.json`, `jsonld-draws.json`, `jsonld-noc.json`, `jsonld-pof.json`, `jsonld-quiz.json` — full parsed JSON-LD blocks captured during this audit for the pages named
- `C:\Users\pc\immigracan.com.br-audit\favicon.ico`, `blogimg.png` — downloaded assets used to verify format/dimensions for H2/H3
