# Performance / Core Web Vitals Audit — immigracan.com.br

Methodology: No Google API credentials configured (no PageSpeed Insights key, no CrUX access) →
**lab-only assessment**. Lighthouse 13.4.1 (CLI, mobile default config, simulated throttling) run
against 5 pages on 2026-07-23. `render_page.py --mode auto` was used first on the homepage to
confirm SSR fallback behavior (`mode_used: raw`, `render_ms: null` — confirms the raw HTML
response already contains full text content, no headless render was needed to see it).

No CrUX field data available — all metrics below are single-run lab measurements (mobile,
simulated "Slow 4G"/4x CPU throttling defaults). Treat as directional; field data (real user
p75) should be pulled once Search Console / CrUX access exists, since lab TBT numbers in
particular tend to run pessimistic relative to field INP but are useful for relative
comparison and root-causing.

## Summary scorecard

| Page | Perf score | LCP | LCP status | CLS | CLS status | TBT (lab) | Max Potential FID (INP proxy) |
|---|---|---|---|---|---|---|---|
| `/` (home) | 61 | 3.7s | Needs Improvement | 0 | Good | **1,380ms** | 638ms |
| `/quiz` | 67 | 3.2s | Needs Improvement | **0.31** | **Poor** | 350ms | 220ms |
| `/calculadora-crs` | 70 | 1.1s | Good | **0.516** | **Poor** | 360ms | 200ms |
| `/blog/o-que-e-imigracao-guia-completo` | 51 | **4.9s** | **Poor** | 0.174 | Needs Improvement | 560ms | 230ms |
| `/express-entry/draws` | 68 | 3.2s | Needs Improvement | 0 | Good | 610ms | 310ms |

**None of the 5 tested pages pass all three Core Web Vitals in this lab run.** TBT/max-potential-FID
are lab proxies for INP; a TBT of 1,380ms on the homepage in particular indicates a very high risk
of failing the INP "good" (≤200ms) threshold at the real-world 75th percentile, since heavy main-thread
contention this early in the page lifecycle typically also blocks the first real user interaction.

Raw Lighthouse JSON saved for reference:
`C:\Users\pc\AppData\Local\Temp\claude\C--Users-pc\1ad03be6-b9ae-462d-a1ab-044f0dbc8a01\scratchpad\lh\{home,quiz,crs,blog,draws}.json`

---

## CRITICAL findings

### 1. SSR-fallback → React hydration DOM swap causes massive CLS on `/quiz` (0.31) and `/calculadora-crs` (0.516)

Lighthouse's `cls-culprits-insight` attributes essentially the *entire* CLS score on both pages to a single event:
the `<footer class="border-t py-10 bg-muted/20">` element (containing the newsletter signup block, ~1,262px tall)
jumping into a new position after page load, with a shift score of 0.5164 out of a total page CLS of 0.5164 on
`/calculadora-crs` (i.e., ~100% of the CLS budget) and 0.3098 of 0.3099 on `/quiz`.

Root cause, confirmed by diffing the raw (pre-hydration) HTML against the hydrated app: the server-rendered
fallback markup shipped in `<div id="root">` is a **minimal, unstyled SEO/no-JS fallback** — e.g. for
`/calculadora-crs` it is a plain `<h1>` + two `<p>` tags + a link list, no interactive calculator, no styling
(confirmed via `curl https://immigracan.com.br/calculadora-crs`):
```html
<div id="root">
<div style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
  <header>...</header>
  <main>
    <h1>Calculadora CRS Canadá 2026 – Simule sua Pontuação Grátis</h1>
    <div><p><strong>A pontuação CRS ...</strong></p><p>Consideramos...</p><p>...</p></div>
  </main>
  <footer>...</footer>
</div>
</div>
```
When React hydrates, this entire subtree is replaced by the actual styled app (real interactive CRS
form / quiz stepper, cards, Tailwind layout) which is dramatically taller. Because the fallback's `<footer>`
sits directly below ~3 short paragraphs, and the real app's footer sits below a much taller interactive
widget, the footer visually jumps down by roughly a full screen height (or more) the instant hydration
completes — this is the classic "late-injected/replaced content" CLS pattern, at the most severe end
(footer visible height 1262px, shift affecting nearly the whole viewport).

This is a distinct issue from the homepage and blog fallback, whose plain-HTML content (long article text)
happens to be closer in vertical size to the hydrated version, which is why `/` and `/express-entry/draws`
measured CLS ≈ 0 in this run — the SSR-fallback-vs-hydrated-height mismatch is what matters, not
the SSR pattern itself.

**Impact:** `/quiz` and `/calculadora-crs` are explicitly the two primary conversion/tool pages on the
site (per the audit brief). A CLS of 0.31–0.52 is "Poor" by a wide margin (>0.25 threshold) and will fail
the CWV assessment outright once real traffic accrues field data, independent of any image/ad/font fix.

**Recommendation (highest priority fix on the site):**
- Reserve layout space equal to (or a close approximation of) the hydrated content's height in the
  SSR fallback markup — e.g. render server-side the *actual* calculator/quiz skeleton (or a fixed
  `min-height` placeholder sized to the typical hydrated height) instead of a stripped-down text-only
  fallback, so hydration only fills in interactivity rather than replacing a short DOM subtree with a
  tall one.
- Alternatively, if full SSR of the interactive widgets is not feasible, render an inline CSS
  `min-height` on the wrapping container that matches the widget's expected rendered height, so the
  footer/newsletter block does not need to reflow when the real component mounts.
- Verify whether this is a true SSR fallback strategy (served to bots/no-JS) vs. a genuine
  first-paint you actually want real users to see — if it's meant as an SEO/no-JS fallback only, the
  hydration-time swap must still not visually move already-rendered content for real (JS-enabled)
  users; a same-height skeleton solves this either way.

---

## HIGH findings

### 2. Blog post LCP is Poor (4.9s) — but the LCP element is a floating UI overlay, not article content

`lcp-breakdown-insight` on `/blog/o-que-e-imigracao-guia-completo` shows TTFB 245.7ms +
**element render delay 2,189ms**, and the LCP element itself is:
```
selector: div.min-h-screen > div.fixed > div.p-4 > p.text-xs
text: "Acesse o simulador e a calculadora CRS direto do seu celular. Funciona offline …"
```
i.e. a `position: fixed` promotional banner (PWA "install on mobile" prompt) that mounts client-side
after hydration — not the article's `<h1>`, hero image, or lead paragraph. Because this banner is
`fixed` and covers a meaningful chunk of the narrow mobile viewport, the browser's LCP algorithm
picks it as the largest contentful paint candidate once it renders, and since it only mounts after
JS hydration + some delay, it drags the whole LCP metric out to 4.9s (Poor, above the 4.0s cutoff).

The same class of overlay shows up on `/quiz`, where the LCP element resolved to the **cookie-consent
banner** text ("Utilizamos cookies para analisar o tráfego do site, personalizar anúncios…") rather
than quiz content — contributing to `/quiz`'s LCP also landing in the "Needs Improvement" band (3.2s)
despite the quiz question itself likely painting much earlier.

**Impact:** This is a measurement-distorting UX pattern: fixed overlays (cookie consent, install
prompts) that mount late and are large relative to the viewport are actively working against LCP on
at least 2 of the 5 pages tested, independent of how fast the "real" content renders.

**Recommendations:**
- Mount the cookie-consent banner and any install/promo banners as early as possible (ideally
  synchronously in initial HTML/CSS, not after full hydration + delay) so they don't become
  late-arriving large paint candidates.
- Cap/constrain the visual size of these overlays on mobile (e.g., avoid full-width fixed
  banners with large padding) to reduce their odds of being selected as the LCP element at all.
- Consider adding `elementtiming` / excluding these elements from being LCP candidates isn't
  directly controllable via API, but reducing their rendered area and moving their mount earlier
  addresses the root cause either way.

### 3. Homepage: extremely high main-thread contention (TBT 1,380ms, Max-Potential-FID 638ms) — third-party scripts still compete with hydration despite `requestIdleCallback` deferral

The homepage's raw HTML head contains this comment:
```html
<!-- FIX P-7: GTM foi movido para src/lib/third-party.ts (carregado via
     requestIdleCallback), pois o snippet inline síncrono no topo do
     <head> bloqueava parsing/render e prejudicava LCP mobile. -->
...
<!-- GTM e AdSense são carregados via requestIdleCallback em src/lib/third-party.ts
     após React montar, respeitando o Consent Mode v2 — mantém fora do critical
     rendering path e evita duplicação de script. -->
```
**Verified: this correctly kept AdSense/GTM off the LCP critical path** — the homepage's LCP element
is the `<h1>` text, server-rendered, and its breakdown shows only TTFB (364ms) + element render
delay (814ms) before paint; no synchronous head-blocking third-party script was observed.

**However, it does NOT keep these scripts off the *interactivity* critical path**, which is the
opposite of what the "FIX P-7" framing implies is solved. Network trace timing on the homepage:

| Time (ms) | Event |
|---|---|
| 388 | Own JS bundles (`index-*.js`, `vendor-react-*.js`) start loading |
| 1,295 | `adsbygoogle.js` request fires (via `requestIdleCallback` — much earlier than expected "true idle") |
| 1,298 | PostHog `array.js` fires |
| 1,603 | AdSense `show_ads_impl_fy2021.js` fires (170KB) |
| 3,730 | Long task: `adsbygoogle.js` execution, 239ms |
| 4,168 | Long task: `vendor-react-*.js` (React hydration), **638ms** — the largest single task on the page |
| 5,616–5,711 | Long tasks: AdSense `show_ads_impl_fy2021.js` execution, 260ms + 95ms |

`mainthread-work-breakdown` shows 1,858ms of Script Evaluation and 1,460ms of Style & Layout —
`bootup-time` attributes 649ms total (555ms scripting) to `show_ads_impl_fy2021.js` alone, and
1,448ms total (559ms scripting) to `vendor-react`. These are firing in the same ~1.3s–5.7s window,
i.e. **AdSense's script execution and React's own hydration are directly competing for the main
thread**, which is exactly what produces the 638ms max-potential-FID and 1,380ms TBT. Because
`requestIdleCallback` only guarantees "idle" relative to currently *scheduled* work — and the
browser had an idle window available at ~1.3s before the heavier hydration work queued up — the
callback fires far earlier than the comment's intent ("after React mounts... keeps out of critical
rendering path"), and ends up stacking third-party execution directly on top of hydration instead
of after it.

Google/Doubleclick Ads total transfer: 227KB, ~109ms attributed main-thread time in the
`third-parties-insight` accounting (which under-counts vs. the `bootup-time`/`long-tasks` view above
— the two audits use different attribution windows, but both agree AdSense is a top-3 main-thread
cost on every page tested).

**Also checked — no duplicate/blocking GTM snippet:** confirmed no synchronous `<script>` GTM
snippet exists in `<head>` (only the `<noscript><iframe src="googletagmanager.com/ns.html...">`
fallback for no-JS clients, which is correct practice and doesn't execute for JS-enabled users).
**However**, across all 5 Lighthouse runs, **`googletagmanager.com/gtm.js` was never observed loading
at all** within the ~1.5–4.4s trace window on any page, even though AdSense and PostHog reliably
fire in that window. Given the cookie-consent banner is confirmed present (it became the LCP element
on `/quiz`), this is consistent with GTM being correctly gated behind Consent Mode v2 pending a
consent decision — i.e., likely not a bug. But it does mean the audit could not directly verify GTM's
own load-time cost, and more importantly it highlights an **inconsistency**: AdSense's script loads
and executes unconditionally within the same `requestIdleCallback` regardless of consent state in
these automated (no-consent-interaction) runs, while GTM apparently does not — worth confirming in
`src/lib/third-party.ts` that ad personalization/measurement requests are only firing pre-consent in
ways that are actually compliant, since the current lab evidence shows AdSense requests (including a
DoubleClick ad render, `googleads.g.doubleclick.net/pagead/ads?...`) firing well before any consent
banner interaction occurred.

**Recommendations:**
1. Delay third-party script injection until *after* the first long idle period following hydration
   completion specifically (e.g., gate on a "hydration complete" custom event or use
   `requestIdleCallback` with a `timeout` large enough to not preempt hydration, or explicitly
   `await` hydration completion before scheduling), rather than firing on the first available idle
   slot, which can land mid-hydration on real user devices.
2. Consider loading AdSense/PostHog only after the first user interaction or after a fixed delay
   (e.g., 3-5s post-load) rather than opportunistically, to guarantee they never compete with
   hydration on slower devices — this trades a small amount of ad-impression/analytics timeliness
   for materially better INP.
3. Re-verify the actual consent-gating logic for AdSense given the observed pre-consent ad network
   requests in this lab environment.
4. Consider `partytown` or a web-worker-based approach for GTM/analytics to remove main-thread
   contention entirely, given this is the top TBT contributor after React itself.

### 4. Blog hero image: unoptimized format and size (308KB PNG, no responsive variants)

`/blog/o-que-e-imigracao-guia-completo` loads its hero image as:
```html
<img src="/blog/o-que-e-imigracao-guia-completo.png" width="1200" height="630"
     loading="eager" decoding="async" ... />
```
Good practices already present: explicit `width`/`height` (prevents its own CLS), `loading="eager"`
(correct, since it's above-the-fold), self-hosted (not hotlinked). **However:**
- It is a **308,526-byte PNG** for a 1200×630 photo/illustration — this is the single largest
  network transfer on the blog page (`total-byte-weight` audit: 981 KiB total page weight, 31% of
  which is this one image).
- No AVIF/WebP variant and no `srcset`/`sizes` for responsive delivery — mobile clients download
  the full 1200px-wide asset even though the rendered width on a 412px viewport is far smaller.
- `image-delivery-insight` reported no "wasted bytes" purely because Lighthouse's heuristic compares
  rendered-vs-natural dimensions, not codec efficiency — it does not mean this image is well-optimized;
  it means Lighthouse isn't flagging over-sizing relative to the CSS box in this particular check.

**Recommendation:** Re-encode this (and presumably all blog feature images, given the same
generation pattern `/blog/{slug}.png`) as WebP or AVIF, generate 2-3 responsive widths via `srcset`,
and confirm compression quality settings — a well-optimized WebP/AVIF at these dimensions should be
in the 30-80KB range, an ~75-85% reduction. This is not currently the LCP element on this page (see
Finding 2), but fixing Finding 2 will likely make this image (or the article's H1/lead paragraph)
the LCP element, at which point its weight will matter directly.

### 5. Render-blocking CSS bundle on every page (150-300ms estimated savings)

Every page tested flags the same render-blocking resource:
```
https://immigracan.com.br/assets/index-DRBK-pWB.css (16.2KB transfer)
```
loaded via a plain `<link rel="stylesheet">` with no `media` gating or critical-CSS inlining.
`render-blocking-insight` estimates 150-300ms of savings per page. Given the app is a Vite/React SPA
with a single global bundled stylesheet, this is somewhat expected, but at minimum:

**Recommendations:**
- Inline critical above-the-fold CSS in `<head>` and defer the rest (`<link rel="preload" as="style"
  onload="this.rel='stylesheet'">` pattern — the same technique already correctly used for Google
  Fonts on this site).
- Consider CSS code-splitting per route (quiz/calculator/blog/draws likely don't need each other's
  component styles) to shrink the blocking payload further.

---

## MEDIUM findings

### 6. `images.unsplash.com` dns-prefetch hint appears to be dead weight — no Unsplash usage observed

The homepage `<head>` includes `<link rel="dns-prefetch" href="https://images.unsplash.com">`, and
the audit brief flagged this as worth checking for potential hero-image hotlinking. **Across all 5
pages tested, zero requests to `images.unsplash.com` were observed** in the Lighthouse network trace.
The blog post's hero image is self-hosted (`/blog/{slug}.png`, see Finding 4), and `/express-entry/draws`
uses no images at all (it renders a data table, confirmed via a lightweight client fetch to
`/api/db/draws`, ~2KB JSON — no evidence of the `/api/functions/draws-stats` endpoint mentioned in the
brief being used on this route in this run).

**Recommendation:** Either confirm Unsplash images are genuinely used on other untested routes (e.g.
specific blog posts, program pages) and this hint is legitimately needed there, or remove the unused
`dns-prefetch` hint — it's low-cost but is currently pure waste on every page that ships it without a
matching resource fetch.

### 7. Google Fonts: async loading pattern verified working, but still contributes network requests to every page

The preload → onload-swap-to-stylesheet pattern is implemented correctly and verified via the network
trace (`fonts.googleapis.com/css2?family=Inter...` loads non-blocking, with a working `<noscript>`
fallback). `font-display-insight` scored 1 (no savings available) on all pages — this part of the
site is in good shape. One remaining, minor optimization: both font files (Inter 48.6KB woff2, DM
Serif Display 18.4KB woff2) are fetched from `fonts.gstatic.com` on every page load; self-hosting
these two fixed font files (with long-lived `Cache-Control` and `font-display: swap` in an
`@font-face` rule) would remove the `fonts.googleapis.com`/`fonts.gstatic.com` DNS+TLS+redirect
hops entirely (currently mitigated somewhat by the two `rel=preconnect` hints already present, which
is good practice).

### 8. DOM size is reasonable but worth monitoring

`dom-size-insight` reports 775 total elements / max depth 16 / max 16 children on the homepage — well
under the ~1,500-element "excessive DOM" threshold. Not a current bottleneck, no action needed now,
but flagged since the footer/newsletter block (implicated in Finding 1) is a deeply-nested, wide
component (16 children, depth 16) that's being fully replaced on hydration — simplifying that
component's structure would also reduce the hydration reflow cost.

---

## LOW findings

### 9. TTFB is consistently good (163-364ms) — server response is not a bottleneck

`document-latency-insight` passed on all pages (server-response-time: 163-364ms observed, no
redirects, compression applied via `Content-Encoding: gzip`). No action needed here; this rules out
server/TTFB as a contributor to the LCP issues found above — all LCP problems are render-path /
client-side, not server-side.

### 10. Third-party byte weight is moderate but adds up across ads/analytics/fonts

Per-page third-party transfer (Google/Doubleclick Ads ~227KB, PostHog ~120KB, Google Fonts ~68KB,
adtrafficquality.google ~22KB) totals roughly 435KB of third-party payload repeated on every page
view (not cached across origins by default the same way first-party assets are). This is a
contributing but secondary factor behind Findings 3-5; no single extra action beyond what's already
recommended (delay/gate loading, consider self-hosting fonts).

---

## Priority-ordered action list

1. **(Critical)** Fix the SSR-fallback/hydration DOM-swap CLS on `/quiz` and `/calculadora-crs` —
   reserve layout height for the interactive widget before hydration completes. Expected impact:
   CLS 0.31-0.52 → near 0 on the two most important conversion pages.
2. **(High)** Stop late-mounting fixed overlays (cookie consent, PWA install promo) from becoming
   the LCP element — mount earlier / constrain size. Expected impact: blog LCP 4.9s → likely
   2-3s range once the actual article content is measured instead.
3. **(High)** Re-time third-party script injection (AdSense/PostHog) to not overlap React hydration's
   long tasks. Expected impact: homepage TBT 1,380ms → target <500ms, directly improves real-world INP.
4. **(High)** Re-encode blog feature images as WebP/AVIF with `srcset`. Expected impact: ~250KB
   savings per blog page, meaningful once Finding 2 is fixed and the image becomes the true LCP
   element.
5. **(Medium)** Inline/defer the render-blocking CSS bundle. Expected impact: 150-300ms LCP
   improvement per page, compounding with #2 and #3.
6. **(Medium)** Remove or justify the unused `images.unsplash.com` dns-prefetch hint.
7. **(Low)** Self-host the two Google Fonts files to remove the cross-origin font hop.
