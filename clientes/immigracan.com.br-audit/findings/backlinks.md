# Backlink Profile Audit — immigracan.com.br

**Date:** 2026-07-23
**Data source tier:** Tier 0 (Common Crawl + local verification crawler only). No Moz API key, no Bing Webmaster API key, no DataForSEO extension configured. Confirmed via `backlinks_auth.py --check --json`.
**Validator run:** `validate_backlink_report.py` — status **PASS** (1 info-level note, incorporated below; 0 errors, 0 warnings).

---

## 1. Overall Verdict: INSUFFICIENT DATA FOR A NUMERIC SCORE

At Tier 0, only 2 of the 7 weighted scoring factors (referring domain count, domain quality distribution, anchor text naturalness, toxic link ratio, link velocity, follow/nofollow ratio, geographic relevance) have any available data source, and even those two returned **zero data points** for this specific domain (see below). Per the audit's own scoring rules, a numeric Backlink Health Score would be misleading with this little coverage, so **no 0–100 score is reported**. This is not a low score — it is an absence of measurement.

| Scoring factor | Weight | Tier‑0 source available? | Data obtained for this domain |
|---|---|---|---|
| Referring domain count | 20% | No (CC gives no domain-level referring-domain count) | None |
| Domain quality distribution | 20% | No | None |
| Anchor text naturalness | 15% | No | None |
| Toxic link ratio | 20% | Partial (verify crawler, if links supplied) | No candidate links were supplied to verify |
| Link velocity trend | 10% | No (DataForSEO-only factor) | None |
| Follow/nofollow ratio | 5% | No | None |
| Geographic relevance | 10% | No | None |

**Factors with data: 0 of 7. Recommendation: report as INSUFFICIENT DATA, not a score.**

---

## 2. Common Crawl Domain Graph — Tier 0, confidence 0.50

Source: `commoncrawl_graph.py immigracan.com.br --json`, Common Crawl release `cc-main-2026-jan-feb-mar`.

| Metric | Result |
|---|---|
| In Common Crawl page crawl (`in_crawl`) | **false** |
| In Common Crawl host-level rankings (`in_rankings`) | **false** |
| PageRank / PageRank rank | null / null |
| Harmonic centrality / rank | null / null |
| Referring host count (`n_hosts`) | null |

**Interpretation (per validator guidance — do not over-read this):** `immigracan.com.br` is **entirely absent from Common Crawl's web graph**, not merely low-ranked within it. Common Crawl's monthly/quarterly crawls have finite reach and skew toward domains that already have some inbound link signal or crawl seed priority. Absence means "not yet crawled/graphed" — it should **not** be reported as "zero authority" or "toxic," since CC coverage is incomplete by design (quarterly web graphs, https://commoncrawl.org/web-graphs) and frequently misses very new, small, or geo/language-niche sites (here: a Brazilian-Portuguese, .com.br property with 2026-dated content).

This absence is directionally consistent with — but not proof of — a young domain with no established backlink footprint yet. Freshness note: the CC release used (`cc-main-2026-jan-feb-mar`) is roughly one full quarter of crawl lag from today's date (2026-07-23), so even if the domain has picked up early external links since Q1 2026, they would not yet be reflected here.

## 3. Domain Age / History — Tier 0, confidence 0.30 (inconclusive)

Source: `domain_history.py immigracan.com.br --json` (expired-domain heritage / WHOIS check).

| Field | Result |
|---|---|
| WHOIS source | fallback (no authoritative response) |
| Creation date | null — "no creation date in whois response" |
| Registrar | null |
| Risk flag | unknown |

`.com.br` domains are registered through Registro.br, whose public WHOIS output frequently omits creation dates to generic/automated WHOIS clients (registrant-privacy behavior differs from gTLD registries). This tool could not confirm domain age. On-page circumstantial evidence (footer copyright "© 2026 ImmigraCan," all page titles and content dated 2026, e.g. "Como Morar no Canadá em 2026," "Calculadora CRS 2026") is consistent with a **domain/brand launched in 2026**, but this is inferred from on-page copy, not from an authoritative registration record — **do not present as a confirmed fact**.

**Not attempted / left as a manual follow-up:** a direct lookup via Registro.br's own WHOIS web tool and a Wayback Machine calendar check (`web.archive.org/web/*/immigracan.com.br`) could establish a first-seen date, but both require JavaScript-driven interactions the current fetch tooling could not complete (Registro.br's WHOIS page requires JS; a Wayback API cross-check was not run in this pass). Recommend as a quick manual step, not a blocker.

## 4. Referring Domains / Verified Backlinks — Tier 0, confidence n/a (no data)

- No known/candidate backlink URLs were supplied for this audit, and Common Crawl provides no referring-domain list at Tier 0 (only aggregate graph metrics, which returned null for this domain — see §2).
- `verify_backlinks.py` was therefore **not run** — there is nothing to verify against. This is a genuine gap, not a "zero backlinks" finding: it means **no free-tier source available today can enumerate who links to immigracan.com.br.**
- A supplementary attempt to surface open-web mentions of "immigracan.com.br" via DuckDuckGo's HTML search endpoint was blocked by an anti-bot CAPTCHA challenge (HTTP 202, "Please complete the following challenge to confirm this search was made by a human"). This was an informal due-diligence attempt outside the standard tool set, not a supported data source — result: **inconclusive, not a finding.**

## 5. Off-Site Brand / Social Presence — confidence 0.60 (partially verified directly)

**JSON-LD `sameAs` check (confidence 0.95 — directly parsed):** All JSON-LD blocks captured across the homepage, blog post, and pricing page (`WebSite`, `FAQPage`, `SoftwareApplication`/`Offer` types) were inspected for a `sameAs` property. **None found.** The site declares no structured-data links to any external social/brand profile.

**On-page outbound link scan (confidence 0.95 — directly parsed):** All four captured HTML samples (homepage, blog post, `pnp_ontario`, `programas_pnp_ontario`) were scanned for outbound links to facebook.com, instagram.com, linkedin.com, tiktok.com, youtube.com, twitter.com, and x.com. **Zero matches.** There is no discoverable social profile link anywhere on the crawled pages — the only social reference on the site is the `<meta name="twitter:site" content="@ImmigraCan" />` tag in the homepage `<head>`, which is metadata for how the page *would* render if shared on X, not a clickable/discoverable link.

**Twitter/X handle `@ImmigraCan` — direct check (confidence 0.55, not fully conclusive):** Fetched `https://x.com/ImmigraCan` directly (raw HTTP, no JS render). Result: **HTTP 404**, page text: *"We're unable to show this account — The account may be private, deleted, or only available on the app."* Taken together with (a) the sameAs finding and (b) zero on-site social links, this suggests **no publicly discoverable, active X/Twitter presence exists at that handle today** — but this is not certain proof of non-existence: X routinely returns this same generic message for rate-limited, geo-blocked, or anti-bot-flagged unauthenticated requests, independent of whether an account is real. **Recommend the site owner confirm directly (log into X, or ask ImmigraCan's team) rather than treating this as fully settled.**

**Net finding:** ImmigraCan currently has **no verifiable off-site brand footprint** discoverable through free/direct means — no confirmed social profiles, no declared `sameAs` entries, and (per §2–4) no referring domains identifiable through Common Crawl or supplied backlink data.

---

## Priority Recommendations

**High**
1. Get a free Moz API key (moz.com/products/api, 2,500 rows/month) and re-run this audit at Tier 1. This is the single highest-value upgrade for a domain that Common Crawl hasn't indexed at all — Moz's own index is refreshed more frequently and independently, and will give DA/PA, spam score, and an actual referring-domain list where CC currently returns nothing.
2. Verify immigracan.com.br in Bing Webmaster Tools (free) and add the resulting API key. Once verified, `bing_webmaster.py links <url>` will return Bing's own inbound-link index for the property — a second independent read, especially useful since CC shows zero presence.
3. Confirm directly (not via automated fetch) whether `@ImmigraCan` is a real, active account, and whether the business has any social presence at all. If not, and if the growth strategy depends on organic/social distribution, treat "off-site brand footprint" as a build-from-zero item, not a measurement gap.

**Medium**
4. Given this is a monetizing SaaS product (R$19.90 report / R$29.90-mo subscription) rather than a hobby site, consider budgeting for the DataForSEO extension (`./extensions/dataforseo/install.sh`) for confidence-1.00 referring-domain, toxicity, and link-velocity data once there is an actual link profile to measure — premature before any links exist, but worth planning for post-launch digital PR.
5. Manually check Registro.br's WHOIS portal and the Wayback Machine calendar for immigracan.com.br to pin down actual domain age/first-crawl date; this pass could not automate that due to JS/anti-bot barriers.

**Low**
6. Because the domain is (per on-page evidence, not confirmed registration data) newly launched in 2026 with no measurable inbound-link footprint yet, initial off-site priorities should focus on link acquisition/digital PR fundamentals (Brazilian immigration-consultant partnerships, PT-BR personal-finance/expat blogs, .gov.br or university international-office resource pages) rather than backlink cleanup — there is nothing yet to clean up.

**Not covered in this report (by design):**
- On-page E-E-A-T / content quality — see `/seo content <url>`.
- Crawlability, indexability, technical SEO — see `/seo technical <url>`.

---

## Source / Confidence Key
- **Common Crawl domain graph** — confidence 0.50 (domain-level only; quarterly refresh; https://commoncrawl.org/web-graphs)
- **domain_history.py (WHOIS)** — confidence 0.30 (fallback source, no creation date returned)
- **Direct parse of collected JSON-LD/HTML** (sameAs check, outbound social-link scan) — confidence 0.95
- **Direct fetch of x.com/ImmigraCan** — confidence 0.55 (informative but not conclusive proof of non-existence)
- **DuckDuckGo mention search** — attempted, blocked by anti-bot challenge, no confidence assigned (not used as a finding)
- **Moz / Bing / DataForSEO** — not available this run (Tier 0)
