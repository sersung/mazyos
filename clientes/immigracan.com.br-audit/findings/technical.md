# Technical SEO Audit — immigracan.com.br

**Audited:** 2026-07-23
**Canonical host:** https://immigracan.com.br (no www; www 301s to apex — confirmed)
**Method:** raw HTML fetch (curl) + JS-rendered fetch (`render_page.py`, Playwright Chromium) across homepage, blog template, program/PNP templates, NOC template, cost-of-living template, tools/calculators, and a full 90-post sweep of the blog for one specific defect. Sitemap parsed directly (294 URLs). Crawl data at `C:\Users\pc\immigracan.com.br-audit\crawl-data.psv` cross-checked.

## Technical Score: 61 / 100

Solid fundamentals (HTTPS, HSTS, clean URLs, mostly-correct SSR, working sitemap, structured data on most templates) undercut by one systemic architectural gap (SSR fallback silently serves homepage content/metadata for a handful of real routes and for literally any non-existent URL, always with HTTP 200), a site-wide empty-meta-description bug on the entire blog (the largest content vertical), and a dead-end on the plain-HTTP protocol.

---

## Critical Severity

### C1. Plain HTTP (non-TLS) requests dead-end on a bare 404 instead of redirecting to HTTPS
**Evidence:**
```
$ curl -I http://immigracan.com.br/
HTTP/1.1 404 Not Found
404 page not found

$ curl -I http://www.immigracan.com.br/
HTTP/1.1 404 Not Found
404 page not found
```
Both the apex and `www` host return a plain-text 404 (no redirect, no HTML) on port 80. By contrast, `https://www.immigracan.com.br/` correctly 301s to `https://immigracan.com.br/`. HSTS with `preload` is set on the HTTPS response, which mitigates this for browsers that have already visited the site or ship with the HSTS preload list, but it does **not** help:
- First-time visitors on old bookmarks, print material, or any `http://` link who don't yet have the HSTS record and aren't on a preload-aware browser/network.
- Non-browser clients (curl, many bots, some link-preview unfurlers, older feed readers, QR-code scanners) that request plain HTTP and don't upgrade automatically.
- Backlinks/citations captured as `http://` (common in older directories, presskits, forum posts) — these currently die instead of passing authority through to the canonical HTTPS URL.

**Recommendation:** Add an HTTP‑only server block (or fix the existing one) that 301-redirects `http://immigracan.com.br/*` and `http://www.immigracan.com.br/*` to `https://immigracan.com.br/*`, preserving path and query. This is almost certainly an nginx config gap (a default/catch-all vhost is serving Go/Caddy-style `404 page not found` text on :80 instead of the app's redirect block).

### C2. Any non-existent URL returns HTTP 200 with the homepage's full title/description/canonical/JSON-LD (soft-404), only corrected client-side after JS hydration
**Evidence:** `curl https://immigracan.com.br/this-page-definitely-does-not-exist-xyz123` returns **byte-identical raw HTML** to the real homepage (`diff` against `homepage.html` = no output): same `<title>Como Morar no Canadá em 2026…`, same `<meta name="description">`, same `<link rel="canonical" href="https://immigracan.com.br">`, same `meta name="robots" content="index, follow"`, same WebSite/FAQPage/Offer/SoftwareApplication JSON-LD blocks. HTTP status is `200`.

Only after full client-side render (confirmed via `render_page.py --mode always`, ~2.3–11s render time) does the SPA correct itself: title becomes "Página não encontrada — ImmigraCan", and — to its credit — `meta name="robots"` is correctly rewritten to `noindex, nofollow` client-side. But the stale WebSite/FAQPage/Offer/SoftwareApplication JSON-LD from the homepage shell is never cleared from the rendered DOM either, so a fully-rendered 404 page still carries homepage structured data.

Confirmed same pattern on other synthetic non-existent paths (`sitemap_index.xml`, `wp-sitemap.xml` per the sitemap-discovery helper; `/.well-known/security.txt`; `/indexnow.txt`) — all return 200 with the homepage SPA shell rather than a real 404 or the intended file.

**Why this matters:**
- Any crawler/tool that does **not** execute JS (most non-Google bots, many SEO/backlink tools, most link-preview unfurlers, and — if the currently-commented-out robots.txt blocks were ever removed — GPTBot/CCBot/anthropic-ai, none of which render JS) sees an indexable, `index,follow` duplicate of the homepage at an unbounded number of URLs.
- This is unbounded index-bloat/duplicate-content surface: any 404 typo, stale backlink, or scraped/expired URL becomes a "real" 200 page in the eyes of non-rendering crawlers and third-party tools, and will never surface as a broken link in link-auditing tools (they all read HTTP 200).
- Even for Googlebot, which does render JS, this relies on the render queue actually completing before any indexing decision is made — a real risk at the crawl-budget scale of a growing 300+ URL site with a lot of parameterizable route space (`/noc/{code}`, `/imigrar-como/{slug}`, `/pnp/{slug}`, `/blog/{slug}`).

**Recommendation:** Have the server (not just the client) return a real `404` status code (or `410` for confirmed-removed content) for unknown routes at the HTTP layer — e.g., an Express/edge-function catch-all that checks the route against a known-routes list before falling back to the SPA shell, or minimally have the SSR layer set `X-Robots-Tag: noindex` and status 404 on any route it doesn't recognize. Clear the stale JSON-LD when rendering the not-found state client-side.

### C3. The soft-404 defect also affects real, legitimate, indexed-in-sitemap pages: `/faq`, `/templates`, `/comparador`, `/prontidao`
**Evidence:** These four URLs are in `sitemap.xml` and are real, unique, valuable pages (confirmed via JS-rendered fetch — each has genuine unique content, e.g. `/comparador` = "Comparador de Programas de Imigração Canadense", `/prontidao` = "Score de Prontidão Migratória"). But their **raw, pre-hydration HTML** — what `crawl-data.psv` captured and what any non-rendering crawler sees — is identical to the homepage: title "Como Morar no Canadá em 2026…", homepage meta description, `<link rel="canonical" href="https://immigracan.com.br">`, and homepage JSON-LD. Only after full client-side render (confirmed via `render_page.py --mode always`, saved to `rendered_faq.html`, `rendered_templates.html`, `rendered_comparador.html`, `rendered_prontidao.html`) do they get correct self-referencing canonical, title, and meta description.

This is the same root cause as C2 (these 4 routes apparently aren't included in whatever route-list drives server-side data-fetch/meta-injection for the rest of the site — every other template checked, including blog, NOC, programas, PNP, custo-de-vida, and the calculator tools, correctly serves unique SSR meta in raw HTML).

**Why this matters:** These 4 pages risk being indexed under the homepage's title/snippet, or de-duplicated/canonicalized away entirely by Google in favor of the homepage, actively hurting their ability to rank for their own target queries ("comparador de programas de imigração canadá", "score de prontidão migratória") — which matters commercially since these are engagement/monetization-adjacent tool pages.

**Recommendation:** Audit the full route list against whatever mechanism injects per-route `<title>/<meta>/<link rel=canonical>/<script type=application/ld+json>` server-side, and add these 4 routes (and re-check any other newer routes not sampled here) to it. Treat this as a regression test: any new route ships with a raw-HTML `curl` check confirming title/canonical/description are route-specific before merge.

---

## High Severity

### H1. 100% of blog posts (90/90 sampled) ship with an empty meta description and empty og:description/twitter:description
**Evidence:** Systematic check across every blog URL in the sitemap:
```
Empty meta desc: 90 / 90 blog posts
```
Confirmed pattern in raw SSR HTML, e.g. `blog/o-que-e-imigracao-guia-completo`:
```html
<meta name="description" content="">
...
<meta property="og:description" content="">
<meta name="twitter:description" content="">
```
Every other template checked (homepage, tools/calculators, programas, PNP, custo-de-vida, NOC, imigrar-como, materiais) has a correctly populated, well-written meta description. This is isolated to the blog article template.

**Why this matters:** The blog is the single largest content bucket (90 of 294 sitemap URLs, ~30%) and the primary vehicle for informational-intent traffic. With no meta description, Google auto-generates SERP snippets (frequently pulling awkward mid-paragraph text), and — more acutely for this audience — social/messaging previews (Facebook, LinkedIn, and especially **WhatsApp**, the dominant sharing channel for Brazilian users) will show a blank description under the title, which measurably hurts click-through on shares. Note: the visible on-page body text is present and good quality (confirmed in `blogpost.html`); this is purely a metadata wiring bug, likely a null/empty field from the CMS not falling back to an excerpt.

**Recommendation:** Backfill `meta description` / `og:description` / `twitter:description` for all 90 posts (auto-generate from the first ~155 characters of body copy as a fallback if the CMS field is empty, then have authors override per-post) and fix the underlying bug so new posts don't ship empty.

### H2. Blog post `og:image` / `twitter:image` use root-relative URLs, not absolute — inconsistent with homepage
**Evidence:**
```
blog/plano-de-imigracao-niveis-2027-2029: <meta property="og:image" content="/blog/plano-de-imigracao-niveis-2027-2029.png">
blog/poutine-timbits-e-mais-comidas-tipicas-canadenses: <meta property="og:image" content="/blog/poutine-timbits-e-mais-comidas-tipicas-canadenses.png">
```
vs. homepage: `<meta property="og:image" content="https://immigracan.com.br/og-image.png">` (absolute).

Open Graph's spec requires `og:image` to be an absolute URL. While major platforms (Facebook/Meta's current crawler) generally resolve relative paths against the page URL, many WhatsApp/Telegram/Slack/email-client unfurlers and older/other scrapers do not, and will silently fail to render a preview image on blog-post shares — again a meaningful loss given WhatsApp-driven sharing is core to this audience.

**Recommendation:** Emit fully-qualified absolute URLs for `og:image`/`twitter:image` on every template, not just the homepage.

### H3. Overlapping/competing URL structures for the same PNP entities are not consolidated
**Evidence:** `/pnp/ontario` and `/programas/pnp_ontario` both exist, both return 200, both self-canonicalize (`/pnp/ontario` → itself, `/programas/pnp_ontario` → itself), both `index,follow`:
```
/pnp/ontario           title: "OINP foi revogado — Alternativas para Ontário em 2026"
/programas/pnp_ontario title: "Ontario Immigrant Nominee Program (OINP) – Requisitos e Elegibilidade"
```
Content is angled differently (news/alternatives-after-revocation vs. program-requirements reference) so this is not strict duplicate content, but both target overlapping keyword space ("PNP Ontário" / "OINP") for the same real-world program, split internal links and topical authority across two URLs, and will likely confuse users/Google about which is the canonical resource for "Ontario PNP." The pattern repeats across most provinces (`/pnp/{province}` × `/programas/pnp_{code}` — confirmed for Ontario, British Columbia/BC, Alberta/AB, Manitoba/MB, Saskatchewan/SK, Nova Scotia/NS, Quebec, Northwest Territories, and others across both URL sets in `urls.txt`).

**Recommendation:** Make the differentiation explicit and mutually reinforcing rather than implicit: cross-link each pair prominently ("this program was revoked/changed — see full eligibility requirements here" / "see the latest program status here"), and consider consolidating into a single canonical page per province with a clearly-dated "status" module, or clearly separate the intents in title/H1/on-page framing so they don't compete for the same head query.

### H4. Sitemap `lastmod` is fabricated for 204 of 294 URLs (all non-blog templates); blog `lastmod` is accurate
**Evidence (refines the pre-audit hypothesis with data):**
```
blog URLs:     0 show today's date / 90 show varied real dates
non-blog URLs: 204 show 2026-07-23 (today, the exact day of this audit) / 0 show other dates
```
Cross-checked one blog article: sitemap `lastmod` = `2026-07-04`, matching its own Article JSON-LD `dateModified` = `"2026-07-04"` exactly — **blog lastmod is trustworthy.** But every tool/calculator, every `/programas/*`, every `/pnp/*`, every `/noc/*` (90 URLs), every `/custo-de-vida/*`, and the homepage itself show `lastmod` = today regardless of whether anything changed — these are almost certainly stamped at sitemap-generation time rather than reflecting real content modification. (Also found: `/noc/72410` is listed **twice** in `sitemap.xml` with identical `<loc>`/`<lastmod>` — a literal duplicate `<url>` entry; low-impact but sloppy.)

**Why this matters:** Google explicitly discounts `lastmod` values it doesn't trust when using them for recrawl prioritization; if 69% of the sitemap always shows "today," Google is likely to start ignoring `lastmod` sitewide (including the blog's otherwise-accurate values), reverting to its own crawl-frequency heuristics for the whole site — losing a legitimate signal you already have working for the blog.

**Recommendation:** Only update `lastmod` for a URL when its underlying content/data actually changes (e.g., NOC/program pages should get a fresh `lastmod` when IRCC data changes, not on every sitemap regeneration run; the homepage should reflect real content edits, not build time). Remove the duplicate `/noc/72410` entry.

---

## Medium Severity

### M1. No Content-Security-Policy or X-Frame-Options header
**Evidence:** Full header dump on the homepage and on a rendered page:
```
Alt-Svc, Cache-Control, Content-Type, Etag, Last-Modified, Permissions-Policy,
Referrer-Policy, Strict-Transport-Security, Vary, X-Content-Type-Options
```
No `Content-Security-Policy`, no `X-Frame-Options` (and no `frame-ancestors` CSP directive substituting for it) in any response checked (homepage, blog post, 404 fallback). The security baseline is otherwise good (HSTS with preload + includeSubDomains, `nosniff`, `Permissions-Policy`, `strict-origin-when-cross-origin` referrer policy) — this is the one gap.

**Why this matters:** The site loads several third-party scripts (Google Tag Manager, Google AdSense, Google Fonts) and has a monetization flow (R$19.90 report checkout, R$29.90/mo subscription) behind `/checkout`, `/login`, `/cadastro` (disallowed in robots.txt but still publicly reachable pages, just not meant to be crawled). Without CSP, there's no defense-in-depth against injected/compromised third-party script content; without `X-Frame-Options`/`frame-ancestors`, the site (including checkout-adjacent pages) can be framed by a third party for clickjacking.

**Recommendation:** Add `X-Frame-Options: SAMEORIGIN` (or CSP `frame-ancestors 'self'`) immediately — this is low-risk, low-effort. Introduce a CSP incrementally, starting in `Content-Security-Policy-Report-Only` mode with a report endpoint to catalog exactly which third-party origins (GTM, AdSense/googlesyndication, fonts.googleapis.com/fonts.gstatic.com, images.unsplash.com already seen in `dns-prefetch` hints) need to be allow-listed before enforcing.

### M2. No IndexNow key file present (Bing/Yandex/Naver not being pinged for fast indexing)
**Evidence:** Both common key-file locations return HTTP 200, but with the SPA's homepage shell (same soft-404 pattern as C2), not a real key file:
```
GET /indexnow.txt              -> 200, content = homepage HTML shell
GET /.well-known/indexnow.txt  -> 200, content = homepage HTML shell
```
No mention of IndexNow in `robots.txt`, and no evidence of an IndexNow key anywhere on the site.

**Why this matters:** This site publishes frequently (draws/news blog posts, Express Entry draw data refreshed "automatically a cada 12h" per the `/express-entry/draws` meta description) — exactly the kind of freshness-sensitive content IndexNow is designed to accelerate indexing for on Bing and Yandex, at effectively zero cost. Currently that entire channel is unused.

**Recommendation:** Generate an IndexNow key, publish it at `/{key}.txt`, and wire a ping (single URL or batch) into the publish pipeline for new/updated blog posts and draw-result updates.

### M3. `security.txt` and `ads.txt` inconsistency
**Evidence:** `/ads.txt` is correctly implemented as a real static file (`google.com, pub-4232544030037574, DIRECT, f08c47fec0942fa0`) — good, and consistent with the AdSense verification meta tag on the homepage. But `/.well-known/security.txt` is **not** implemented (returns the same SPA soft-404 shell, not a 404 or real content).

**Recommendation:** Low priority relative to the other findings, but trivial to add — a `security.txt` with a contact/disclosure policy is a light-touch trust signal, particularly relevant given the site handles PII (immigration eligibility data, LGPD is referenced in the privacy policy) and takes payments.

### M4. AI-crawler blocks in `robots.txt` are present but commented out — a deliberate-looking but unconfirmed decision
**Evidence:**
```
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
This means GPTBot, ChatGPT-User, anthropic-ai, and CCBot are all currently **allowed** to crawl the full site (the comment is inert, not a block).

**Why this matters (not inherently a bug, but worth surfacing explicitly):** For a monetized freemium product (paid AI eligibility report, subscription), there's a real strategic question of whether to let AI-crawler training bots ingest the free content/blog corpus at no attribution/traffic benefit, versus the upside of being cited in AI-assistant answers (ChatGPT/Perplexity-style referral traffic) for "how to immigrate to Canada from Brazil"-type queries — the latter is plausibly valuable for a brand this early. Given the soft-404 issue in C2, note also that these crawlers do not execute JS, so if ever enabled to crawl, they'd currently be exposed to the raw (sometimes homepage-duplicated) HTML rather than the fully-hydrated content.

**Recommendation:** This is a business decision, not a defect — flag it to stakeholders explicitly rather than leaving it as a dangling commented-out block that looks like leftover work-in-progress.

### M5. Minor JSON-LD/on-page date mismatch on blog articles
**Evidence:** `blog/o-que-e-imigracao-guia-completo` — Article JSON-LD: `"datePublished":"2026-07-04","dateModified":"2026-07-04"`; visible on-page byline: `"Publicado em: 03/07/2026"` (one day earlier). Minor but worth fixing for consistency/trust; likely a timezone (UTC vs. America/Sao_Paulo) off-by-one in date formatting.

### M6. H1 on blog posts duplicates the full `<title>` including the " | ImmigraCan" site-name suffix
**Evidence:**
```
<title>FMRI debate alocação provincial de imigrantes para o plano de níveis de 2027-2029 | ImmigraCan</title>
<h1>FMRI debate alocação provincial de imigrantes para o plano de níveis de 2027-2029 | ImmigraCan</h1>
```
Confirmed across every blog post sampled. H1 should be the on-page headline for readers; the `" | ImmigraCan"` brand suffix belongs in `<title>` for SERP branding, not duplicated into the visible H1. Low SEO impact on its own, but sloppy and worth a quick template fix (strip the suffix when rendering H1).

---

## Low Severity

### L1. `/express-entry/draws` and `/express-entry/draws/2026` carry an identical `<title>`
**Evidence:** Both "Express Entry Draws 2026 — Todos os Resultados e CRS Mínimo", each self-canonicalizing (not deduplicated). Likely intentional (the un-suffixed URL mirrors the current year), but consider a small title/meta differentiation ("mais recente" vs. "arquivo 2026") or an explicit canonical from `/express-entry/draws` → `/express-entry/draws/2026` (or vice-versa) to avoid Google picking one arbitrarily.

### L2. Render-blocking CSS + moderate JS payload (flag only — deep CWV pass owned by seo-performance agent)
**Evidence:** `index-DRBK-pWB.css` (91KB) loads via a blocking `<link rel="stylesheet">` in `<head>` with no `media`/`preload` deferral (fonts, by contrast, are correctly deferred via preload+onload swap, and GTM/AdSense are correctly deferred via `requestIdleCallback` — both called out directly in the page's own code comments, which is a good sign of prior CWV work). JS payload: `index-5FZD4RZo.js` ≈ 268KB + `vendor-react-DKzBJN8Z.js` ≈ 182KB (transfer sizes per `Content-Length`, pre/post-compression not independently confirmed here). These are structural risk flags only, not measurements — hand off to the performance-focused pass for LCP/INP/CLS lab measurement (no CrUX/PSI credentials available in this environment).

---

## Category Pass/Fail Summary

| Category | Status | Notes |
|---|---|---|
| Crawlability (robots.txt) | Pass, with note | Correct disallow list for private routes; AI-crawler blocks present but inert (M4) |
| Crawlability (sitemap) | Partial | Present, valid XML, declared correctly in robots.txt (294 URLs); `lastmod` fabricated for 204/294 URLs (H4); 1 duplicate `<url>` entry |
| Indexability (canonicals) | Fail | 4 real pages + unbounded synthetic 404 space serve homepage's canonical pre-hydration (C2, C3) |
| Indexability (noindex audit) | Pass | No stray `noindex` found on any of the ~115 sampled real templates; robots meta correctly `index,follow` sitewide; JS-rendered 404 correctly sets `noindex,nofollow` |
| Security (HTTPS/headers) | Partial | Strong HSTS/nosniff/Permissions-Policy/Referrer-Policy; missing CSP and X-Frame-Options (M1); plain-HTTP dead-ends instead of redirecting (C1) |
| URL structure | Partial | Clean, descriptive URLs throughout; but overlapping `/pnp/*` vs `/programas/pnp_*` structures compete for the same entities (H3) |
| Mobile | Pass | `viewport` meta present and correct on every template sampled; PWA manifest + apple-mobile-web-app tags present |
| Core Web Vitals (structural, lab-only) | Informational | Fonts/GTM/AdSense correctly deferred; CSS still render-blocking; deep LCP/INP/CLS measurement deferred to seo-performance agent |
| Structured Data | Mostly pass | WebSite/FAQPage/Offer/SoftwareApplication on homepage; Article on blog (minor date mismatch, M5); BreadcrumbList+FAQPage on NOC pages; Dataset+Organization on draws pages. Gap: stale JSON-LD persists on rendered 404 state (C2) |
| JS Rendering dependency | Partial | Correct SSR-in-raw-HTML for the large majority of templates (blog, NOC, programas, PNP, custo-de-vida, tools); broken for `/faq`, `/templates`, `/comparador`, `/prontidao`, and all non-existent routes (C2, C3) |
| IndexNow | Fail | No key file implemented at either common location (M2) |

---

## Files referenced
- `C:\Users\pc\immigracan.com.br-audit\homepage.html` — raw homepage HTML
- `C:\Users\pc\immigracan.com.br-audit\blogpost.html` — raw blog article HTML (empty meta description confirmed here)
- `C:\Users\pc\immigracan.com.br-audit\urls.txt` — 294-URL sitemap URL list
- `C:\Users\pc\immigracan.com.br-audit\sitemap.xml` — raw sitemap XML (lastmod analysis)
- `C:\Users\pc\immigracan.com.br-audit\crawl-data.psv` — curl-based per-URL scan (125 rows)
- `C:\Users\pc\immigracan.com.br-audit\bogus_raw.html` / `bogus_rendered_full.html` / `bogus_rendered.json` — soft-404 evidence (C2)
- `C:\Users\pc\immigracan.com.br-audit\rendered_faq.html`, `rendered_templates.html`, `rendered_comparador.html`, `rendered_prontidao.html` — JS-rendered evidence for C3
- `C:\Users\pc\immigracan.com.br-audit\pnp_ontario.html`, `programas_pnp_ontario.html` — H3 comparison evidence
