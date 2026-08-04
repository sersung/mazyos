# Full SEO Audit — immigracan.com.br

**Audit date:** 2026-07-23
**Canonical URL:** https://immigracan.com.br/ (no www — `https://www.immigracan.com.br` 301-redirects to it)
**Business type:** YMYL content publisher + freemium SaaS tool. The site helps Brazilians evaluate and pursue immigration to Canada via free calculators/quiz (CRS score, proof of funds, cost of living, NOC lookup), monetized through a one-time R$19.90 AI-generated eligibility report and a R$29.90/month subscription (more simulations, province comparisons, draw alerts). It is not a licensed immigration consultancy — its own Terms of Service recommend hiring a licensed RCIC or lawyer for official decisions.
**Pages assessed:** 294 URLs (full sitemap), with deep sampling across every page-type family, plus 10 specialist passes (technical, content/E-E-A-T, schema, sitemap, performance, visual/mobile, GEO/AI-search, backlinks, content architecture/clustering, search experience).

---

## Executive Summary

### Overall SEO Health Score: 47 / 100

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 61 |
| Content Quality | 23% | 34 |
| On-Page SEO | 20% | 45 |
| Schema / Structured Data | 10% | 40 |
| Performance (Core Web Vitals) | 10% | 55 |
| AI Search Readiness (GEO) | 10% | 43 |
| Images | 5% | 65 |

This site has real bones: it's genuinely server-rendered (not a thin SPA shell), the sitemap and robots.txt are structurally sound, security headers are mostly strong, and the free tools (quiz, CRS calculator, cost-of-living lookups) are a legitimate, useful product. But the score is dragged down hard by a handful of severe, largely fixable problems: a broken content backend, an architecture that silently duplicates the homepage across several routes, and a near-total absence of the trust signals a YMYL, money-collecting site needs.

### Top 5 Critical Issues

1. **The blog's backend is broken right now.** `GET /api/blog` returns an empty array and `GET /api/blog/{slug}` returns 404, so every one of the 90 blog posts (30% of the site's URLs) renders a full "Erro ao carregar artigo" error page to real visitors — confirmed via live browser screenshots. The raw server-rendered HTML still looks fine (which is why several other specialist passes analyzed it as if it were live content), but anyone who actually visits a blog post today hits a dead end, and any JS-executing crawler (including Google's second-wave renderer) may well index the error state instead.
2. **The whole site runs on a soft-404 architecture.** Any nonexistent URL — and four real, sitemapped pages (`/faq`, `/templates`, `/comparador`, `/prontidao`) — return HTTP 200 with the homepage's exact title, meta description, canonical tag, and JSON-LD in raw HTML, only correcting after full JavaScript hydration. This hides the site's single richest FAQ/trust content from every non-JS-executing crawler (including most AI answer engines) and creates unbounded duplicate-content surface.
3. **Critical E-E-A-T/trust gaps on a YMYL, payment-taking site.** No About page exists anywhere. No content is attributed to a named person — every author is a bare "Organization." No Organization schema exists at all. And the one honest disclosure on the whole site — "we are not a licensed immigration consultant" — is buried in the Terms of Service and inside a collapsed FAQ accordion, never shown on `/precos` where someone is actually deciding whether to pay R$19.90–29.90.
4. **A live factual contradiction on a real immigration program.** `/programas/pnp_ontario` still states the Ontario PNP is "Status: Ativo" with open streams, while `/pnp/ontario` and a blog post correctly report OINP was revoked on 30 May 2026 (independently confirmed against external sources). A user or search engine landing on the stale page gets objectively wrong information about a real government program.
5. **Two sitewide execution bugs with outsized impact.** All 90 blog posts ship with an empty meta description (and og:image/twitter:image use relative instead of absolute URLs), and the sitemap's `lastmod` is fabricated — stamped to "today" — on 204 of 294 URLs (69%), which risks Google discounting the field sitewide, including the blog's otherwise-genuine dates.

### Top 5 Quick Wins

1. Backfill meta description / og:description / twitter:description on all 90 blog posts — one templated fix covers all of them.
2. Add a visible, non-collapsed disclaimer on `/precos` and at checkout: the report is AI-generated and ImmigraCan is not a licensed RCIC/CICC consultant.
3. Fix the raw-HTML metadata for `/faq`, `/comparador`, `/prontidao`, `/templates` so each serves its own title/description/canonical instead of the homepage's.
4. Correct the "Status: Ativo" factual error on `/programas/pnp_ontario`.
5. Add `X-Frame-Options: SAMEORIGIN` (five-minute fix) and Service/Offer JSON-LD to `/precos` (currently zero structured data on the site's highest-commercial-value page).

---

## Technical SEO — Score: 61/100

**What works:** HTTPS everywhere with HSTS (preload + includeSubDomains), a correct www→apex redirect, `X-Content-Type-Options`, `Permissions-Policy`, and a strict referrer policy. robots.txt is well-formed and correctly scoped. The large majority of templates — blog, NOC, programas, PNP, custo-de-vida, tools — are genuinely server-rendered with unique per-route metadata in raw HTML; this is not a thin-SPA site. Mobile viewport and PWA tags are present and correct everywhere sampled, and `ads.txt` is implemented correctly.

**Critical**
- **Soft-404 architecture.** Any nonexistent URL returns HTTP 200 with byte-identical homepage HTML (title, description, canonical, WebSite/FAQPage/Offer/SoftwareApplication JSON-LD), and the same defect hits four real sitemapped pages (`/faq`, `/templates`, `/comparador`, `/prontidao`) whose genuine content only appears after full JS hydration. *Fix:* return a real 404/410 at the HTTP layer for unmatched routes; add the four affected routes to the SSR metadata pipeline.
- **Plain HTTP dead-ends.** `http://immigracan.com.br/` and `http://www.immigracan.com.br/` both return a bare 404 instead of redirecting to HTTPS. *Fix:* add/repair the HTTP-only nginx redirect block.

**High**
- All 90 blog posts ship an empty meta description, og:description, and twitter:description — isolated to the blog template, every other template is fine.
- Blog `og:image`/`twitter:image` use relative URLs (`/blog/{slug}.png`) instead of absolute, risking broken WhatsApp/Telegram/email link previews — the dominant sharing channel for this audience.
- `/pnp/{province}` and `/programas/pnp_{code}` are separate, overlapping URL structures competing for the same real-world programs.
- Sitemap `lastmod` is fabricated (stamped "today") on 204 of 294 URLs (69%) — verified against real Article `dateModified` on the blog, which is accurate. Google may start discounting `lastmod` sitewide if this continues.

**Medium** — No CSP or `X-Frame-Options`; no IndexNow key file; a duplicate `/noc/72410` sitemap entry; AI-crawler blocks in robots.txt are present but commented out (a business decision to flag explicitly, not a bug); minor JSON-LD date off-by-one on blog articles; blog H1 duplicates the title's brand suffix.

**Low** — `/express-entry/draws` and `/express-entry/draws/2026` share an identical title; render-blocking CSS and JS payload sizes are flagged structurally (see Performance for measurement).

---

## Content Quality (E-E-A-T) — Score: 34/100

**What works:** The evergreen blog guide (`o-que-e-imigracao-guia-completo`) has genuine depth (~950-1,050 words), clean structure, a comparison table, and a glossary. Blog posts carry real, differentiated publish dates. `/dados/brasileiros-express-entry-2026` is a genuinely original-data asset with real authority-building potential. Calculators/quiz pages carry solid standalone explainer text. Keyword usage is natural throughout.

**Critical**
- **No About/Sobre page and no legal-entity identity anywhere.** No company name, CNPJ, address, or team is disclosed anywhere on the site; two different, unexplained support emails appear (`suporte@` vs. `contato@immigracan.com.br`). For a YMYL site taking payment, this is one of the most heavily-weighted trust signals in Google's own Quality Rater Guidelines, and a Brazilian consumer-protection (CDC) concern in its own right.
- **No named author or expertise attribution anywhere.** Every Article uses `"author":{"@type":"Organization"}` — no byline, bio, or credential appears on any of the ~90 blog posts, ~90 NOC pages, ~36 profession pages, or program pages.
- **The paid AI report has no disclaimer at the point of sale.** `/precos` never discloses that the report is AI-generated or that ImmigraCan isn't a licensed consultant — that only exists buried in Terms of Service and a collapsed FAQ answer.

**High**
- Thin, near-boilerplate content across ~150 programmatic pages (NOC, imigrar-como, custo-de-vida, programas, pnp) — often just 40-150 unique words per page.
- Verbatim-template duplicate content across 15+ "sorteio" draw-result posts and 10+ processing-time posts — two sampled posts are word-for-word identical except for date and invite count.
- The FAQ page's 26 genuinely good Q&A pairs — including the honest "we're not a licensed consultant" answer — are invisible to non-JS crawlers and hidden inside a click-to-reveal accordion.
- The RCIC/licensing disclaimer used on blog posts is missing from the programmatic pages making the most specific actionable claims (and from `/precos`, the highest-stakes page of all).

**Medium** — Homepage and program-hub pages sit at or below content-type word-count floors; high publish cadence is real but a large share is templated re-skins, not new analysis; readability/self-containment is inconsistent across templates (the blog guide is well-structured, NOC/imigrar-como pages are terse bullet fragments).

**Low** — Inconsistent support email addresses; the original-data page (`/dados/...`) is a strong, underpromoted asset.

**AI Citation Readiness: 38/100** — the site's best Q&A content is unreachable by plain-text crawlers, thin programmatic pages provide little self-contained context, and duplicate blog content adds no incremental value for any system sampling multiple posts.

---

## On-Page SEO — Score: 45/100

**What works:** Titles are natural and reasonably sized across sampled templates. Every one of the 294 crawled pages has exactly one H1 and a canonical tag. No stray `noindex` was found anywhere. Zero images sitewide were found missing alt text.

**High**
- All 90 blog posts are missing meta descriptions (same root bug as the Technical SEO finding).
- 5 sitemap-listed pages (`/comparador`, `/prontidao`, `/templates`, `/faq`) self-canonicalize to the homepage instead of themselves.

**Medium**
- `/quiz` — the core conversion entry point — has no `<h1>` anywhere in the DOM.
- 9 pages carry duplicate titles/descriptions beyond the homepage-cannibalized 5 (the draws/2026 archive pair, the duplicate NOC entry).

**Low** — Blog H1 duplicates the full title including the " | ImmigraCan" brand suffix.

---

## Schema & Structured Data — Score: 40/100

**What works:** All JSON-LD sitewide uses correct `@context` and is genuinely server-rendered. NOC (~90), imigrar-como (36), and pnp (12) templates correctly carry matched FAQPage + BreadcrumbList schema. The homepage carries WebSite, FAQPage, and SoftwareApplication/Offer. Express Entry draws pages carry Dataset schema.

**Critical**
- `/precos` has zero structured data despite two real paid tiers — the single highest-value schema gap on the site.
- No Organization schema exists anywhere; every reference is a bare, un-linkable stub.
- Homepage `SoftwareApplication` is missing `aggregateRating` (blocking rich-result eligibility entirely) and only represents the free tier, ignoring both paid products.

**High** — Blog `Article.author` is Organization not Person; `publisher.logo` uses `favicon.ico` (a non-standard format for this property); `Article.image` is a relative URL. `/programas/pnp_{code}` (~18 pages) has zero schema while its sibling `/pnp/{province}` template has FAQPage+BreadcrumbList. No BreadcrumbList on blog posts or `/custo-de-vida/{city}` (~15 pages).

**Medium** — `/calculadora-crs` and several other tool pages have zero schema; `/quiz` uses a non-rich-result `Quiz` type; NOC pages lack Occupation/DefinedTerm entity markup; Dataset schema on draws pages is minimal.

**Low/Info** — Existing FAQPage usage is valid and harmless but no longer earns a Google rich result (retired May 2026) — not a gap, just no further SERP upside from expanding it.

---

## Performance (Core Web Vitals) — Score: 55/100 *(lab-only; no PSI/CrUX credentials configured)*

**What works:** TTFB is consistently good (163-364ms) everywhere — server response is not a bottleneck. Fonts load via a correct async preload→swap pattern. GTM/AdSense are deferred via `requestIdleCallback` and confirmed to stay off the LCP path. DOM size is reasonable.

**Critical**
- SSR-fallback-to-hydration DOM swap causes severe CLS (0.31-0.52, "Poor") on `/quiz` and `/calculadora-crs` — the two primary conversion pages — because the tall real widget replaces a much shorter text-only SSR fallback, shoving the footer down the page.

**High**
- None of the 5 pages tested pass all three Core Web Vitals (scores 51-70; homepage TBT 1,380ms).
- Blog LCP (4.9s) and quiz LCP are distorted by late-mounting fixed overlays (a PWA install promo, the cookie-consent banner) becoming the LCP element instead of real content.
- AdSense script execution directly overlaps React hydration's long tasks, producing the homepage's 1,380ms TBT.
- Blog hero image is an unoptimized 308KB PNG with no WebP/AVIF or responsive `srcset` — 31% of the page's total byte weight.

**Medium** — Render-blocking 16.2KB CSS bundle on every page; unused `images.unsplash.com` dns-prefetch hint; Google Fonts could be self-hosted to remove a cross-origin hop.

---

## AI Search Readiness (GEO) — Score: 43/100

**What works:** robots.txt currently allows all major AI crawlers (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, CCBot, anthropic-ai). ~150+ templated pages carry genuine, well-matched FAQPage + BreadcrumbList schema. Calculators/quiz pages carry solid standalone declarative text. The Dataset schema on draws pages is a good, underused citability asset.

**Critical**
- `/faq` — the richest, most citable Q&A content on the site — is completely invisible to every non-JS-executing AI crawler (same root cause as the Technical soft-404 finding).
- The universal soft-200 catch-all disguises the fact that `llms.txt` does not actually exist — a naive status-code check would falsely report success.

**High**
- Homepage FAQPage schema doesn't match any visible on-page text — a genuine schema/content mismatch, not the positive signal originally assumed.
- None of the ~150+ templated pages use question-phrased headings, despite the question text already existing in each page's own FAQPage schema.
- No Organization schema and no `sameAs`/social links anywhere — near-zero externally-verifiable entity presence for AI systems to corroborate the brand against.

**Medium** — A freshness claim ("updates every 12 hours") on `/express-entry/draws` is contradicted by live data that was roughly 7 weeks stale at audit time; commented-out AI-crawler blocks in robots.txt are an accidental-flip risk; several template-level data-quality bugs (duplicated "TEER X — TEER X" text on NOC pages, a dangling empty field on revoked-program pages).

---

## Images — Score: 65/100

**What works:** Zero images sitewide were found missing alt text across the full 294-page crawl. The blog hero image correctly sets explicit width/height and `loading="eager"`. No hotlinking to external image hosts was observed.

**High** — Blog hero images are unoptimized (308KB PNG, no modern format, no responsive delivery) — see Performance.

**Medium** — Money pages (quiz, calculators, pricing) carry almost no imagery at all — no sample-report screenshot, no comparison visuals — a missed trust/comprehension opportunity exactly where it would help conversion most.

**Low** — Unused `images.unsplash.com` dns-prefetch hint.

---

## Supplementary Analysis

### Search Experience (SXO)
**Primary finding (Critical):** `/precos` sells an unlicensed AI-generated report with zero trust signals, while the two most commercially-adjacent search queries — "consultor de imigração canadá" and "quanto custa imigrar para o canadá" — are dominated by licensed RCIC/lawyer service pages and itemized real-cost blog posts, respectively. ImmigraCan currently serves neither intent credibly. SXO Gap Scores (0-100): `/precos` 24, `/custo-de-vida/toronto` 39, `/calculadora-crs` 42, `/programas/express_entry_fsw` 43, `/quiz` 48, blog guide 66. The "Trust" dimension scored lowest across every single persona/page combination tested.

### Content Architecture / Clustering
The Ontario PNP keyword space is split across four URLs with a live factual contradiction (see Critical Issue #4 above); the same structural pattern (a `/pnp/{province}` page, a `/programas/pnp_{code}` page, and a dedicated "news/changes" blog post) likely repeats for BC, Alberta, Quebec, and Atlantic, not yet independently fact-checked. The NOC hub (`/buscador-noc`, ~90 spokes) contains **zero forward links** to any NOC page — spokes link back to the hub, but not vice versa. Global navigation excludes `/pnp`, `/buscador-noc`, `/custo-de-vida`, `/imigrar-como`, and `/materiais` entirely, starving these hub pages of internal link equity. ~25 recurring "sorteio"/processing-time blog posts cannibalize each other and their own intended canonical pages, which are themselves duplicative and non-interlinked.

### Visual / Mobile
**Primary finding (Critical):** the blog's client-side API is broken in production — confirmed via live browser screenshots showing "Erro ao carregar artigo" on every blog post. Separately, the LGPD cookie-consent banner covers 35-45% of the mobile viewport on every page and hides the "Assinar Premium" CTA on desktop `/precos` without scrolling — a self-inflicted conversion cost on the pages meant to fund the whole business. `/quiz` has no `<h1>` and thin DOM text. Tap targets on newsletter checkboxes (16×16px) and a footer "Entrar" link (34×15px) fall well under the 44×44px guideline.

### Backlinks / Authority
Only Tier-0 data (Common Crawl + verification crawler) was available — no Moz, Bing, or DataForSEO credentials configured. **immigracan.com.br is entirely absent from Common Crawl's web graph**, not merely low-ranked, consistent with a young domain (on-page evidence suggests a 2026 launch, though this couldn't be confirmed via WHOIS). No `sameAs` entries, no discoverable social profile links, and no verifiable referring domains were found through any free-tier source. This is reported as insufficient data, not a fabricated score — get a free Moz API key and verify the domain in Bing Webmaster Tools to start real measurement.

---

## Methodology Notes

- No Google API credentials were configured (no PageSpeed Insights, CrUX, GSC, or GA4 access) — all Core Web Vitals figures are single-run Lighthouse lab measurements, not real-user field data.
- No Moz, Bing Webmaster, or DataForSEO credentials were configured — backlink analysis is Tier 0 (Common Crawl + direct verification only).
- The domain is not currently indexed by Google (`site:immigracan.com.br` returns zero results), so live pairwise-SERP-overlap clustering was substituted with structural/topical-overlap analysis, cross-checked against real-world facts via web search where noted (e.g. the Ontario OINP revocation date).
- All findings were independently corroborated across at least two specialist passes wherever the underlying evidence overlapped (e.g., the soft-404/`/faq` issue was independently found by the technical, sitemap, content, GEO, and content-architecture passes).

Full per-category evidence, raw data captures, and screenshots are available in `findings/` and `screenshots/` in this audit directory.
