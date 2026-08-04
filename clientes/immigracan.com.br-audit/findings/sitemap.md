# Sitemap Audit — immigracan.com.br

Audited: `https://immigracan.com.br/sitemap.xml` | Date: 2026-07-23
Source files: `C:\Users\pc\immigracan.com.br-audit\urls.txt` (294 URLs), `C:\Users\pc\immigracan.com.br-audit\crawl-data.psv` (147 crawled pages)
Live sitemap fetched to: `C:\Users\pc\AppData\Local\Temp\claude\C--Users-pc\1ad03be6-b9ae-462d-a1ab-044f0dbc8a01\scratchpad\sitemap.xml` (47,982 bytes, 294 `<url>` entries)

## Validation Report (Pass/Fail)

| Check | Result | Detail |
|---|---|---|
| Declared in robots.txt | PASS | `Sitemap: https://immigracan.com.br/sitemap.xml` present; `robots.txt` returns 200, correctly formatted, `Allow: /` + explicit `Disallow` list for app/private routes |
| Reachable / 200 | PASS | `sitemap.xml` → HTTP 200, `Content-Type: text/xml` |
| Well-formed XML, correct namespace | PASS | `sitemap_discovery.py` validated `kind: urlset`, `valid: true`, no errors. Root: `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, valid `<?xml version="1.0" encoding="UTF-8"?>` declaration |
| No sitemap index needed | PASS | Single flat `urlset` (294 URLs) — no index file needed at this size |
| Per-file URL limit (≤50,000) | PASS | 294 URLs = 0.6% of cap |
| Per-file size limit (≤50MB uncompressed) | PASS | 47,982 bytes ≈ 0.05MB, far under cap |
| Every `<url>` has `<loc>` | PASS | 294/294 |
| Every `<url>` has `<lastmod>` | PASS (present) / **FAIL (accuracy)** | 294/294 present, but see Critical finding below |
| `<changefreq>` / `<priority>` present | PASS (present) / Info (deprecated) | 294/294 both present; Google has stated both are ignored for ranking/crawl purposes since 2023 |
| No duplicate `<loc>` entries | **FAIL** | `/noc/72410` listed twice |
| No orphaned crawled pages missing from sitemap | PASS | 0 of 147 crawled URLs are absent from the sitemap (see Coverage below) |
| Sampled URLs return 200, no redirects | PASS | 20-URL spot-check across every page-type family returned 200 with no redirect hops |
| No noindexed URLs in sitemap | PASS | 0/147 crawled pages carry `noindex` per `crawl-data.psv` |
| Canonical tags match sitemap URL | **FAIL (5 pages)** | See High finding below |

## Coverage: Sitemap vs Crawl vs urls.txt

- `urls.txt` (294 lines) and the live sitemap's 294 `<loc>` entries match 1:1 in content — confirms `urls.txt` was extracted directly from this sitemap.
- Cross-referencing all 147 URLs in `crawl-data.psv` against the sitemap: **0 orphans** — every crawled page is present in the sitemap. (Note: the crawl only covers 147/294 sitemap URLs, so this is a partial-coverage check, not proof the crawl found everything; it does confirm no crawl-discovered page is *missing* from the sitemap.)
- **No extra/dead pages found**: sampled URLs across every family (homepage, tools, `/express-entry/draws*`, `/programas/*`, `/custo-de-vida/*`, `/noc/*`, `/imigrar-como/*`, `/pnp/*`, `/materiais/*`, `/blog/*` old and new) all return clean 200s with no redirect chains.

### Page-family counts (verified against actual sitemap, correcting brief's estimates)

| Family | Brief estimate | Actual count |
|---|---|---|
| NOC occupation pages `/noc/{code}` | ~90 | **86** (comment in XML itself says "86 códigos NOC") |
| Profession guides `/imigrar-como/{profession}` | ~34 | **36** |
| Blog posts `/blog/*` | 150+ | **90** |
| Cost-of-living cities `/custo-de-vida/{city}` | ~15 | 15 (confirmed) |
| Province pages `/pnp/{province}` | — | 12 |
| Province program pages `/programas/pnp_{code}` | — | 9 (+ 3 federal EE + 6 other program pages = 18 total under `/programas/`) |

These are minor factual corrections, not audit failures — flagged so downstream numbers (e.g., location-quality-gate math) use real counts.

### `/pnp/{province}` vs `/programas/pnp_{code}` — not a duplicate

Both families are present in the sitemap and are **not duplicates of each other**. Verified via `crawl-data.psv`:
- `/pnp/ontario` → title "OINP foi revogado — Alternativas para Ontário em 2026", canonical self-referential.
- `/programas/pnp_ontario` → title "Ontario Immigrant Nominee Program (OINP) – Requisitos e Elegibilidade", canonical self-referential.

Different titles, different content intent (province overview/news angle vs. program-requirements page), distinct canonicals. Both legitimately belong in the sitemap. No action needed.

---

## CRITICAL

### 1. Fabricated `lastmod` on 204 of 294 URLs (69%) — sitemap regenerated with today's date stamped on unrelated pages

Verified by extracting all `<lastmod>` values:

```
204 × 2026-07-23   (= today, the date this sitemap.xml was fetched)
 90 × [90 distinct dates from 2026-01-10 to 2026-07-17]  (all under /blog/)
```

Every non-blog URL in the sitemap — homepage, all 7 calculator/tool pages, all 5 `/express-entry/draws*` pages, `/dados/*`, `/historico-draws`, `/buscador-noc`, `/checklist-documentos`, the `/custo-de-vida` index + all 15 city pages, the `/imigrar-como` index + all 36 profession pages, the `/pnp` index + all 12 province pages, the `/materiais` index + all 6 material pages, the `/programas` index + all 18 program pages, `/comparador`, `/prontidao`, `/templates`, `/faq`, `/blog` index, `/precos`, `/contato`, `/privacidade`, `/termos`, and all 86 `/noc/{code}` pages — carry the **identical** `lastmod` value of the day the sitemap was fetched. It is not credible that 204 structurally unrelated pages (a legal Terms page, a 2023 historical draws archive, and 86 individual NOC occupation pages) were all substantively modified on the same calendar day. This is the signature of a sitemap generator that stamps `datetime.now()` at build time for any route not backed by CMS-tracked content metadata, rather than pulling a true last-significant-change date.

By contrast, the 90 `/blog/*` posts **do** carry differentiated, apparently genuine `lastmod` values that decay sensibly with post age (recent posts get `weekly`/high-priority treatment, older posts get `yearly`/lower priority — see priority table below). Spot-checked directly against on-page structured data:

- `/blog/o-que-e-imigracao-guia-completo`: sitemap `lastmod = 2026-07-04`; live-page JSON-LD `"datePublished":"2026-07-04"` and `"dateModified":"2026-07-04"` — **match, confirmed correct**.

So the blog pipeline is doing the right thing; the static/programmatic-page pipeline is not.

**Why this matters**: Google explicitly uses `lastmod` as a recrawl-prioritization signal *only if it is reliably accurate*. Google's own documentation warns that if a sitemap is found to report false/unchanged `lastmod` values repeatedly, Googlebot will start ignoring the field for that site entirely — which then also degrades trust in the (currently correct) blog `lastmod` values. It can also read as a mild content-freshness/manipulation signal ("everything changed today") if reviewed manually.

**Fix**: Only write `lastmod` when the underlying page content meaningfully changed (driven by the CMS's actual `updated_at` for that record — NOC data revision, program-rule change, city cost-of-living data refresh — not sitemap-build time). For pages with no real edit history yet, either omit `lastmod` or seed it with the page's true creation date, not "today." Re-generate `lastmod` per-page on content save, not on every sitemap build.

### 2. Duplicate URL entry: `/noc/72410` listed twice

`grep` confirms `https://immigracan.com.br/noc/72410` appears at two separate `<url>` entries in the sitemap (positions ~115 and ~124), both with identical `lastmod`/`priority`/`changefreq`. 293 unique URLs across 294 entries.

**Fix**: De-duplicate the NOC-code source list feeding the sitemap generator; this is very likely a data-pipeline bug (duplicate row in the NOC dataset) rather than intentional. Worth checking whether `72400`/`72401`/`72410` are correctly distinct NOC 2021 codes in the underlying dataset (they are distinct real codes — 72400 Ind. mechanics, 72410 Machine fitters, etc. — but confirm no other silent duplicates exist beyond this one, since NOC pages are dataset-driven).

---

## HIGH

### 3. Five sitemap-listed URLs self-canonicalize to the homepage, not to themselves

From `crawl-data.psv`, canonical tag ≠ page URL for:

| URL (in sitemap, priority 0.85–0.9) | Canonical points to |
|---|---|
| `/comparador` | `https://immigracan.com.br` |
| `/prontidao` | `https://immigracan.com.br` |
| `/templates` | `https://immigracan.com.br` |
| `/faq` | `https://immigracan.com.br` |

Verified live on `/comparador`: `<link rel="canonical" href="https://immigracan.com.br" />` while `<title>` still reads "Como Morar no Canadá em 2026 – Imigração para Brasileiros" (the homepage's title, not a comparator-specific title) — indicating these pages may not have been fully built out yet (placeholder/stub pages inheriting the homepage's `<head>` metadata wholesale) even though they're listed in the sitemap at 0.85–0.9 priority (higher than most blog posts).

**Why this matters**: This sends Google a direct contradiction — the sitemap says "index this distinct URL," the page itself says "no, treat me as a duplicate of the homepage." Google will honor the canonical tag over the sitemap in virtually all cases, meaning these 4 URLs are very unlikely to ever rank independently, and any unique content on them gets its signals consolidated into the homepage instead. This also wastes indexing/crawl attention on 4 of the highest-priority (0.85–0.9) sitemap entries.

**Fix**: Either (a) finish building these pages with self-referential canonicals and unique `<title>`/meta once real content exists, or (b) if they are intentionally thin/placeholder pages not ready for indexing, remove them from the sitemap and set canonical + noindex until launch-ready, rather than shipping conflicting signals.

---

## MEDIUM

### 4. Priority values are only meaningfully differentiated within two families; most large URL families are flat/noisy

Priority *is* present on all 294 URLs and is tiered sensibly at the top level (homepage 1.0 > tools 0.8–0.95 > section indexes 0.8–0.9 > detail pages 0.65–0.85 > legal 0.3), but within the large programmatic families that the brief specifically asked about, differentiation collapses to near-flat noise:

| Family | Count | Priority spread | Verdict |
|---|---|---|---|
| `/custo-de-vida/{city}` | 15 | **100% at 0.75** (no variance at all) | Flat — Toronto and London get identical priority despite obviously different traffic/business value |
| `/materiais/{item}` | 6 | **100% at 0.85** (identical to parent index) | Flat, and child = parent priority (unusual) |
| `/imigrar-como/{profession}` | 36 | 33 @ 0.85, 3 @ 0.75 | Near-flat (92% identical) |
| `/noc/{code}` | 86 | 59 @ 0.8, 27 @ 0.7 | Coarse two-tier, no real per-code differentiation |
| `/pnp/{province}` | 12 | 8 @ 0.8, 4 @ 0.9 | Coarse two-tier |
| `/programas/{program}` | 18 | 11 @ 0.75, 7 @ 0.85 | Coarse two-tier |
| `/blog/{post}` | 90 | 45 @ 0.85, 31 @ 0.75, 14 @ 0.65 — **tracks recency** (recent posts `weekly`+0.85, mid-age `monthly`+0.75, oldest `yearly`+0.65) | Best-differentiated family in the sitemap |
| `/express-entry/draws/{year}` | 4 | 0.85 → 0.75 → 0.7 → 0.65, decreasing with year age | Well differentiated |

**Why this matters (lower severity)**: Per Google's own guidance (and this skill's quality table), `priority` and `changefreq` are **ignored entirely** by Google for crawling/indexing/ranking — so the flat values on `/custo-de-vida` and `/materiais` cause zero live SEO harm today. This is flagged as Medium rather than Low only because it signals that the sitemap-generation logic for these two families has no differentiation logic at all (copy-pasted constant), which is worth fixing for internal data hygiene and in case these values are ever consumed by another crawler (e.g., Bing, which does use priority as a weak hint) or an internal tool.

**Fix**: Not urgent for Google. If kept, make `/custo-de-vida` priority reflect real relative importance (e.g., by search-volume/traffic tier: Toronto/Vancouver/Montreal higher than Saskatoon/Kitchener). Longer-term recommendation below (#6) is to drop both tags entirely and stop maintaining this logic.

### 5. `changefreq` values don't match real update cadence for several families

`changefreq` distribution: 210 `monthly`, 66 `weekly`, 16 `yearly`, 2 `daily`. Spot examples that look mismatched against actual content type:
- `/pnp/{province}` marked `weekly` (12 pages) — but these are policy/program reference pages, not news; unlikely to change weekly.
- `/custo-de-vida/{city}` marked `monthly` — reasonable given they hold cost data that could update periodically.
- `/express-entry/draws` (the rolling current-year tracker) marked `daily` — reasonable, this page genuinely updates around IRCC draw days.
- `/termos`, `/privacidade` marked `yearly` — reasonable.

**Why this matters**: Same caveat as above — Google ignores `changefreq` for crawl scheduling. Flagged as Medium/Info only for internal consistency; not an indexing risk.

---

## LOW / INFO

### 6. `priority` and `changefreq` are deprecated/ignored by Google — consider removing entirely

Per this skill's quality table and Google's public documentation, both tags carry no ranking or crawl-priority weight in Google Search. Given finding #4 shows large chunks of these values are flat/uninformative anyway, the simplest long-term fix is to drop both tags from the generator and ship a minimal sitemap with only `<loc>` and an accurate `<lastmod>`. This also removes the maintenance burden of keeping priority "meaningful" across 8+ URL families.

### 7. `lastmod` date-only format (`YYYY-MM-DD`, no time/timezone)

All 294 `lastmod` values use the short W3C Datetime "complete date" form (e.g., `2026-07-23`), which is valid per the sitemap protocol. No fix needed — noting only because full-precision datetimes with timezone are an equally valid alternative if the CMS ever needs sub-day granularity (e.g., for the `daily`-changefreq draws page, which realistically updates intraday around draw announcements).

---

## Quality Gates — Location/Programmatic Page Assessment

Applying the skill's location-page thresholds to the site's programmatic families:

| Family | Count | Gate status |
|---|---|---|
| `/noc/{code}` | 86 | **Exceeds HARD STOP (50+)** |
| `/imigrar-como/{profession}` | 36 | **Exceeds WARNING (30+)**, under hard stop |
| `/custo-de-vida/{city}` | 15 | Under warning threshold |
| `/pnp/{province}` | 12 | Under warning threshold |
| `/programas/{program}` | 18 | Under warning threshold |

**`/noc/{code}` (86 pages) — HARD STOP triggered.** This is the largest programmatic family on the site and crosses the 50-page hard-stop threshold requiring explicit user justification per the skill's gate. NOC occupation pages are a classic "doorway page" risk pattern if templated with only the occupation code/title swapped and boilerplate CRS/eligibility text repeated. This audit did not run a full duplicate-content/uniqueness pass across all 86 NOC pages (out of scope of the sitemap check itself) — **recommend a dedicated content-quality audit of the `/noc/*` family** (word count variance, % boilerplate vs. NOC-specific detail — wage data, job duties, program eligibility specific to that code) before treating this as safe. Flagging here because the sitemap audit surfaced the scale; the content-uniqueness verdict itself belongs to a content-quality pass.

**`/imigrar-como/{profession}` (36 pages) — WARNING triggered.** Same recommendation: verify 60%+ unique content per page (profession-specific licensing/certification paths, wage benchmarks, NOC cross-references) rather than a shared template with only the profession name swapped.

Both families are currently indexed at high priority (NOC 0.7–0.8, imigrar-como 0.75–0.85) with no signal in the sitemap itself of content depth — this audit can only confirm structural presence/validity, not content uniqueness. Escalate to a content-quality skill pass before this scales further (e.g., before adding the remaining ~450 NOC codes not yet covered, if that's on the roadmap).

---

## Summary Table

| Severity | Count | Issues |
|---|---|---|
| Critical | 2 | Fabricated `lastmod` on 204/294 URLs (69%); duplicate `/noc/72410` entry |
| High | 1 | 5 URLs (comparador, prontidao, templates, faq) self-canonicalize away from themselves to homepage |
| Medium | 2 | Priority flat/non-differentiated on 2 major families (custo-de-vida, materiais); changefreq mismatched on some families |
| Low/Info | 2 | priority/changefreq are Google-ignored tags (consider removal); lastmod date-only format (no issue, informational) |
| Quality Gate | 2 | `/noc/*` (86 pages) HARD STOP — needs uniqueness justification; `/imigrar-como/*` (36 pages) WARNING — needs 60%+ uniqueness verification |

**No orphaned pages found** (0 crawled URLs missing from sitemap). **No broken/redirecting URLs found** in a 20-URL cross-family spot-check (all HTTP 200, no redirects). **Well within** the 50,000-URL / 50MB per-file caps.
