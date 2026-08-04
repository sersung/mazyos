# Action Plan — immigracan.com.br

Prioritized Critical > High > Medium > Low, organized into phases. Each item notes the source category and estimated effort where the specialist audit provided one.

---

## Phase 1: Critical Fixes (Week 1)

1. **Fix the broken blog backend.** `GET /api/blog` currently returns `[]` and `GET /api/blog/{slug}` returns 404, so all 90 blog posts show "Erro ao carregar artigo" to real visitors right now. *[Visual/Technical — this blocks everything else about the blog and should be the very first fix.]*
2. **Fix the soft-404 architecture.** Return a real HTTP 404 (or 410) for unmatched routes instead of the homepage SPA shell; add `/faq`, `/templates`, `/comparador`, `/prontidao` to the SSR/prerender route list so each serves its own title/description/canonical/JSON-LD in raw HTML. *[Technical, Sitemap, Content, GEO, Content Architecture — independently confirmed by five passes. Effort: ~2-8 hours.]*
3. **Add a visible, non-collapsed disclaimer on `/precos` and at checkout**: "Relatório gerado por IA; não somos consultores licenciados (RCIC/CICC)." *[Content, SXO — Effort: Low.]*
4. **Correct the factual error on `/programas/pnp_ontario`** — it states "Status: Ativo" while the program was actually revoked 30 May 2026 (confirmed externally). *[Content Architecture — Effort: Trivial, one field.]*
5. **Fix plain-HTTP (port 80) to redirect to HTTPS** instead of dead-ending on a bare 404. *[Technical — Effort: Low, nginx config.]*
6. **Add site-wide Organization JSON-LD** (real logo, real `sameAs` only — do not fabricate social profiles that don't exist) and **Service/Offer schema to `/precos`** (currently zero structured data despite two real paid tiers). *[Schema — Effort: Low-Medium.]*

## Phase 2: High-Impact Improvements (Weeks 2-3)

7. Backfill meta description / og:description / twitter:description on all 90 blog posts and fix the template default so new posts don't ship empty. *[Technical, On-Page — Effort: templated, one fix covers all 90.]*
8. Fix relative → absolute URLs for blog `og:image`/`twitter:image`/Article `image`. *[Technical, Schema — Effort: Low.]*
9. Reserve layout height in the SSR fallback for `/quiz` and `/calculadora-crs` to eliminate the 0.31-0.52 CLS caused by the hydration DOM swap. *[Performance — Critical CWV fix, highest-priority performance item.]*
10. Re-time AdSense/analytics script injection so it stops overlapping React hydration's main-thread work (homepage TBT 1,380ms → target <500ms). *[Performance.]*
11. Add a named Person author (or `reviewedBy`) to Article schema; publish a real `/sobre` page with legal entity name, CNPJ, address, and team info. *[Content, Schema, GEO.]*
12. Add BreadcrumbList to blog posts and `/custo-de-vida/{city}`; port FAQPage+BreadcrumbList from `/pnp/{province}` onto `/programas/{id}` (~18 pages). *[Schema.]*
13. Add WebApplication/Offer schema to `/calculadora-crs` and the other schema-less tool pages (`/conversor-clb`, `/simulador-cenarios`, `/historico-draws`, `/buscador-noc`, `/checklist-documentos`). *[Schema, SXO.]*
14. Fix the late-mounting fixed overlays (cookie-consent banner, PWA install promo) that distort LCP measurements and cover primary CTAs on mobile and desktop `/precos`. *[Performance, Visual.]*
15. Add `X-Frame-Options: SAMEORIGIN`; begin a `Content-Security-Policy-Report-Only` rollout. *[Technical — Effort: Low.]*
16. Add an `<h1>` to `/quiz`. *[On-Page, Visual.]*
17. Add the RCIC/licensing disclaimer already used on blog posts to the `/programas/*`, `/pnp/*`, `/noc/*`, `/imigrar-como/*` templates. *[Content — Effort: one component update covers ~150 URLs.]*

## Phase 3: Content & Authority (Month 2)

18. Consolidate the ~25 recurring "sorteio"/processing-time blog posts into continuously-updated hub pages instead of a new near-identical article per event; merge `/express-entry/draws` and `/historico-draws` into one URL; build a new evergreen "processing times" hub (no equivalent page currently exists). *[Content, Content Architecture.]*
19. Add substantive unique content to the ~150 thin programmatic pages (NOC, imigrar-como, custo-de-vida, programas, pnp) — pathway narratives, sourced figures, worked examples, cross-links. *[Content — this family crosses the sitemap audit's HARD STOP gate at 86 NOC pages; needs a uniqueness pass regardless of the SEO benefit.]*
20. Fix the NOC hub (`/buscador-noc`) to link forward to its ~90 spoke pages (currently zero forward links); add `/pnp`, `/buscador-noc`, `/custo-de-vida`, `/imigrar-como` to global navigation. *[Content Architecture.]*
21. Rewrite the ~150 templated page headings into question form, reusing text already written for each page's FAQPage `Question.name`. *[GEO — cheap, cascades to ~150 pages at once, also resolves several schema/visible-content mismatches.]*
22. Add cross-links between related clusters: profession page → relevant NOC codes → relevant PNP provinces → relevant city cost-of-living pages. *[Content Architecture, SXO.]*
23. Re-encode blog hero images as WebP/AVIF with responsive `srcset`. *[Performance, Images.]*
24. Audit BC, Alberta, Quebec, and Atlantic PNP page pairs for the same live/revoked factual-contradiction pattern found on Ontario. *[Content Architecture.]*
25. Build a real off-site brand presence (YouTube, relevant community participation) and pursue Moz/Bing Webmaster verification now that the domain has content worth linking to. *[Backlinks, GEO.]*

## Phase 4: Monitoring & Iteration (Ongoing)

26. Stop stamping sitemap `lastmod` with the build date on non-blog URLs — only update on real content changes.
27. Set up an automated regression check: for every sitemap URL, fetch raw HTML and confirm the title matches the expected page — this catches future soft-404 regressions (like items #1-2 above) automatically.
28. Get a free Moz API key and verify the domain in Bing Webmaster Tools to start measuring real backlink data (currently absent from Common Crawl entirely).
29. Configure Google API credentials (PageSpeed Insights, CrUX, Search Console, GA4) to replace lab-only performance/indexation estimates with real field data.
30. Remove the duplicate `/noc/72410` sitemap entry.
31. Remove or justify the unused `images.unsplash.com` dns-prefetch hint.
32. Generate and publish an IndexNow key, wired into the publish pipeline for new/updated content.

---

## Priority Rationale

Phase 1 items are either actively broken in production right now (the blog, the soft-404 pages) or carry outsized legal/trust risk relative to their fix effort (the missing disclaimer, the factual error, the missing Organization/Offer schema). Fixing these first also unblocks accurate measurement of everything downstream — for example, the blog's true content quality can't really be assessed while its API is down, and the soft-404 pages can't be evaluated for on-page quality while they serve homepage content.

Phase 2 items are high-effort-to-impact ratio fixes that don't require new content or architectural decisions — template bugs, schema additions, and a well-diagnosed CLS fix.

Phase 3 items require genuine content and architecture investment (writing, cross-linking, consolidation decisions) and should follow once the Phase 1-2 foundation is solid.

Phase 4 items are process/tooling changes that prevent regression and unlock better future measurement rather than fixing a current problem.
