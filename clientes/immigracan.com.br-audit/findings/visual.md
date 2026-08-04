# Visual / Mobile-Rendering Audit — immigracan.com.br

Audited: Homepage (`/`), Quiz (`/quiz`), Calculadora CRS (`/calculadora-crs`), Blog post (`/blog/o-que-e-imigracao-guia-completo`), Preços (`/precos`).
Tool: Playwright (Chromium), viewports 1440×900 (desktop) and 390×844 (mobile, iPhone-class). Screenshots saved to `C:\Users\pc\immigracan.com.br-audit\screenshots\`. Raw evaluate() metrics saved to `screenshots\audit_data.json`.

For every URL the following were captured: `<page>_<viewport>.png` (steady-state above-the-fold), `<page>_<viewport>_full.png` (full scrollable page), and `<page>_<viewport>_early.png` (screenshot taken immediately at `domcontentloaded`, before `networkidle`/hydration settle, to check for flash-of-unstyled/mismatched content). Additional diagnostic captures: `home_mobile_nojs_fallback.png` (JS disabled, to inspect the true static SSR fallback), `bloglist_desktop_check.png` (blog index page), `home_mobile_adcheck.png` (AdSense slot inspection).

---

## Critical

### 1. The specific blog post URL in scope (`/blog/o-que-e-imigracao-guia-completo`) renders a full error page, not content
Evidence: `blog_desktop.png`, `blog_mobile.png`.

Both desktop and mobile screenshots show an error state as the *entire* above-the-fold content: a warning icon, the H1 text **"Erro ao carregar artigo"** ("Error loading article"), body copy "Verifique sua conexão e tente novamente," and a single "Voltar ao Blog" button. There is no title, no author, no body text — nothing indexable or useful to a visitor who lands here from search or a shared link.

Root cause confirmed via network inspection: the client fetches `GET /api/blog/o-que-e-imigracao-guia-completo`, which returns **404** (verified twice). Further, `GET /api/blog` (the listing endpoint) returns `[]` — an empty array — and the rendered `/blog` index page (`bloglist_desktop_check.png`) literally displays **"Nenhum artigo encontrado"** ("No article found"). This is not a one-off broken slug: the blog backend currently has **zero published posts**, despite the main nav, footer, and homepage all linking to "Blog" as a live content section.

Impact: this is the worst possible above-the-fold experience — a real user, and any bot/crawler, hits a dead end. It also invalidates any SEO/content strategy for the site as long as the blog has no articles behind it.

**Recommendation:** Publish at least the seed article referenced by the audit scope, or remove/hide the Blog nav link and `/blog/*` routes until content exists. At minimum, the error page should distinguish "article doesn't exist" (410/redirect to `/blog`) from a generic network-error message, since the current copy ("verifique sua conexão") is misleading — the failure is server-side, not the user's connection.

---

## High

### 2. Cookie/LGPD consent banner consumes 35–45% of the mobile viewport and covers primary CTAs on first load
Evidence: `home_mobile.png`, `quiz_mobile.png`, `calc-crs_mobile.png`, `precos_mobile.png`.

On every mobile page tested, a bottom-anchored "Sua Privacidade e LGPD" card appears with `Rejeitar` / `Aceitar Todos` buttons. It is not a subtle bar — it occupies roughly the bottom third to bottom half of the 390×844 viewport:
- On `/calculadora-crs` mobile, the banner sits directly beneath the "Calcular minha pontuação CRS" button and completely hides the "O que é a pontuação CRS?" heading and all content below it.
- On `/quiz` mobile, the banner covers the bottom of the answer-option list (though the visible options themselves are not clipped).
- On `/precos` mobile, the banner overlaps the **"Plano Free"** card's body copy directly.
- On `/precos` **desktop** (1440×900), the banner overlaps and hides the **"Assinar Premium"** button (the highest-value/"Mais Popular" plan CTA) — see `precos_desktop.png`. A user who wants the premium plan must dismiss the cookie banner before that CTA becomes clickable, on desktop, without scrolling.

Impact: this materially eats into "real above-the-fold content" on the very pages that are supposed to funnel users toward the core conversion action (quiz → report/subscription). Even though this is a legally-required consent mechanism, its current implementation (large card, no fully-dimmed background, placed on top of a primary conversion button on the highest-intent page in the funnel) is a self-inflicted conversion/UX cost.

**Recommendation:** Shrink the banner to a slim single-line bottom bar on mobile (common LGPD/GDPR pattern: "We use cookies. [Reject] [Accept]" in one row, ~56–72px tall) and ensure it is positioned so it never geometrically overlaps a primary button element (especially `Assinar Premium` / `Assinar Básico` on `/precos`, and `Calcular minha pontuação CRS` / quiz answers). Test z-index/positioning specifically at 1440×900 where the current implementation already clips the Premium plan.

### 3. Interactive quiz page has no `<h1>` and near-zero DOM text on first render
Evidence: `quiz_desktop.png`, `quiz_mobile.png`; `audit_data.json` → `quiz_desktop.cta_info.h1 = null`, `early_body_text_len`/`late_body_text_len` = 1441/1332 chars (vs. 5000–8000 on other pages).

The quiz page shows only a small breadcrumb ("ImmigraCan"), a progress indicator ("Pergunta 1 de 13 — Avaliação gratuita"), a plain `<h3>`-weight question, and 5 answer options — there is no page-level H1 anywhere in the DOM. This is a core conversion page (the free entry point to the whole funnel) and is thin on both semantic structure and body copy, which is suboptimal both for accessibility (screen-reader users landing directly on `/quiz` have no page-level heading) and for SEO (no canonical single H1 tells search engines what the page is about; the raw HTML's static fallback title only exists on `/`, not on `/quiz`).

**Recommendation:** Add a visually-hidden or small `<h1>` such as "Quiz de Elegibilidade para Imigrar ao Canadá" above/around the "Pergunta 1 de 13" breadcrumb.

---

## Medium

### 4. Small tap targets on toggle/checkbox controls and footer links (mobile)
Evidence: `audit_data.json` tap_targets sections; visible in `_full.png` captures (newsletter interest checkboxes, footer links).

Across every page, `eval_on_selector_all` measurements show 35–51 interactive elements below the 44×44px recommended minimum touch-target size out of ~50–92 total interactive elements per page. The most consequential repeat offenders:
- Newsletter-signup topic checkboxes/toggle inputs: **16×16px** (e.g. "Notícias & mudanças" toggle at various `top` offsets on every page that has the newsletter block, which is nearly all of them since it's in a shared footer/section).
- Footer "Entrar" link: **34×15px** (home page footer, `top: 4357` on mobile) — one of the smallest targets found.
- "Política de Privacidade" footer link: 222×35px on mobile — height is under the 44px guideline.
- Top-nav links on desktop (Início, Programas, Blog, FAQ, etc.): 36px tall — acceptable for a mouse-driven desktop nav but flagged since the same markup/height carries over conceptually to any touch-capable laptop/tablet.

These are secondary elements (not the primary quiz/calculator CTAs, which are comfortably sized: e.g. "Calcular minha pontuação CRS" is 358×44 on mobile, "Descobrir minha elegibilidade" renders large and easily tappable). But the newsletter checkboxes appear on nearly every page template, so the cumulative UX cost (mis-taps, frustration) is broad even if individually low-stakes.

**Recommendation:** Increase the hit area (via padding, not necessarily the visual glyph size) of the newsletter checkboxes and the footer "Entrar" link to ≥44×44px. Visual size can stay compact if desired — only the clickable/tappable bounding box needs to grow.

### 5. AdSense presence is real but could not be visually verified as "unfilled" in this test — recommend manual/live re-check
Evidence: `audit_data.json` ad_info (all pages: `adCount: 0`, `adRatio: 0`); supplementary check: exactly **one** `<ins class="adsbygoogle">` slot per page, `data-ad-status="unfilled"`, rendered at `0×0px` with `display:none !important` on every page tested (home, quiz, calc-crs, blog, precos).

Google's ad server responded to the automated/headless request but did not return a fill (`unfilled`), which is expected behavior for AdSense when it detects non-organic/datacenter/headless traffic — it does **not** mean the site has no ads in production for real users. Because of this, the "ads above the fold" quality-signal question posed by the brief **cannot be conclusively answered from this automated run**: I can confirm there is only **one ad slot per page** in the DOM (not multiple stacked units), which is a good sign structurally (low ad density by count), but I cannot confirm the rendered size/position a real filled ad unit would take, nor whether it would push content down or sit within the first viewport.

**Recommendation:** Re-verify with a real residential-IP mobile device (or a logged-out session from a real browser, not automation) on each of the 5 URLs, specifically checking: (a) does an ad render inside the first 844px of the mobile viewport before the H1/CTA, and (b) total ad pixel area vs. content pixel area in the first viewport. Given only one ad slot exists per page at the DOM level, the structural risk is low, but placement (e.g., whether that single slot is anchored above the H1) is the variable that actually determines compliance with Google's "ads above the fold" quality guidance and should be confirmed live.

### 6. `/precos` shows solid trust signals for its price point, but no company/legal identity anywhere
Evidence: `precos_desktop.png`, `precos_mobile.png`; `audit_data.json` trust_info for `precos_desktop`/`precos_mobile`.

Positive: the pricing page body copy does contain "garantia" (guarantee), "reembolso" (refund), "seguro" (secure), and payment-method mentions for Pix and Mercado Pago — these were detected as `true` in the text scan and are reasonable trust signals for a R$19,90–29,90 (sic: R$19.90 report / R$29.90-per-month-range subscription per the brief) purchase. A shield/lock icon is present site-wide (it's actually the LGPD banner icon, reused).

Gap: no mentions of "CNPJ," "sobre nós," "quem somos," or "suporte" were found anywhere on the pricing page, consistent with the brief's note that there is no About page or author bios site-wide. Visually, the pricing cards (`precos_desktop.png`/`precos_mobile.png`) contain no payment-brand logos (Visa/Mastercard/Pix wordmark/lock badge), no "compra segura" badge near the buy button, and no company/CNPJ footer line specific to the checkout context — the only footer disclaimer visible is the generic "Ferramenta para fins de orientação. Em caso de discrepância, prevalecem os sistemas e regras oficiais" and copyright line, which is a legal/liability disclaimer, not a purchase-trust signal.

**Recommendation:** Add a small trust strip directly under/beside each "Assinar" button (e.g., "Pagamento seguro via Pix/Mercado Pago," a lock icon, "Cancele quando quiser") and surface CNPJ + support contact in the footer specifically on `/precos` and at checkout, since that's the one page where a first-time visitor is deciding whether to hand over payment details.

---

## Low / Informational

### 7. Static SSR fallback exists and is well-written, but is invisible to 99%+ of real users (informational, not a bug)
Evidence: raw HTML fetch of `/` (curl) vs. `home_mobile_nojs_fallback.png` (JS disabled) vs. `home_mobile.png`/`home_mobile_early.png` (JS enabled).

The raw server HTML does contain a real, keyword-rich intro paragraph, an "Iniciar Quiz de Elegibilidade Gratuito" link, and links to `/calculadora-crs`, `/programas`, `/blog`, `/precos`, exactly as described in the brief — this is good for crawlers/no-JS clients and for perceived SEO safety net. However, when actually rendered with JavaScript disabled, this fallback is **completely unstyled** (default browser typography, no CSS applied) — see `home_mobile_nojs_fallback.png`. In practice this is a non-issue for real users because JavaScript is enabled for the overwhelming majority of traffic, and in this test, the "early" screenshot (captured at `domcontentloaded`, before `networkidle`) already showed the fully-hydrated, fully-styled React app with **identical body text length** to the final "late" screenshot on the homepage (7894 chars both times) — i.e., **no visible flash-of-unstyled-content or content-swap was observed** between the static fallback and the hydrated app in this test environment. This is a good outcome; flag only as something to spot-check on a throttled/slow-3G real device, since a fast local/headless test may mask a brief flash that a real user on slower hardware/network could perceive.

### 8. Blog page's own hydration reveals a content-length change between early/late capture — but it's the error state settling in, not a real article swap
Evidence: `audit_data.json` — `blog_desktop.early_body_text_len: 1230` → `late_body_text_len: 1312`; `blog_mobile`: 1121 → 1203.

This text-length delta is the loading-skeleton being replaced by the "Erro ao carregar artigo" error UI (see Critical #1) — not a legitimate content hydration. Once #1 is fixed (real article renders), this should be re-tested to confirm no flash-of-different-content between a loading skeleton and the final article body.

### 9. No horizontal scroll / overflow detected on any page or viewport
Evidence: `audit_data.json` `overflow_info` for all 10 captures — `hasHorizontalScroll: false` in every case (`scrollWidth === clientWidth` at both 1440px and 390px). This is a clean pass; no action needed.

### 10. Desktop homepage above-the-fold is well-composed
Evidence: `home_desktop.png`. H1 ("Descubra qual é o melhor caminho para você imigrar para o Canadá"), a one-line value-prop paragraph, two clear CTAs ("Descobrir minha elegibilidade" primary + "Explorar Programas" secondary), and three trust micro-labels ("Dados não compartilhados com o governo," "Baseado em dados oficiais do IRCC," "Resultado instantâneo") are all visible without scrolling on a 1440×900 viewport (aside from the cookie banner, see High #2). This is the strongest above-the-fold experience of the five pages tested and can be used as the template/reference for tightening up `/quiz` (missing H1, see High #3) and fixing `/blog` (see Critical #1).

---

## Summary Table

| # | Severity | Finding | Pages affected |
|---|----------|---------|-----------------|
| 1 | Critical | Blog post URL renders "Erro ao carregar artigo"; blog backend has 0 published posts (`/api/blog` → `[]`) | `/blog/o-que-e-imigracao-guia-completo`, `/blog` |
| 2 | High | LGPD cookie banner covers 35–45% of mobile viewport; hides Premium plan CTA on desktop `/precos` without scrolling | All 5 pages (mobile); `/precos` (desktop) |
| 3 | High | `/quiz` has no `<h1>`, thin DOM text on core conversion page | `/quiz` |
| 4 | Medium | Newsletter checkboxes (16×16px) and footer links (as small as 34×15px) below 44×44 tap-target guideline | All pages (shared newsletter/footer component) |
| 5 | Medium | AdSense slot present (1 per page) but "unfilled" in automated test — real ad placement/size vs. fold unverified | All 5 pages |
| 6 | Medium | `/precos` has some trust copy (garantia, reembolso, Pix, Mercado Pago) but no payment logos, CNPJ, or support contact near checkout | `/precos` |
| 7 | Low | Static SSR fallback is unstyled if JS disabled, but no visible flash observed with JS enabled | `/` (informational) |
| 8 | Low | Blog early/late text-length delta is the error-state settling in, re-test after #1 is fixed | `/blog/...` |
| 9 | Low (pass) | No horizontal scroll on any page/viewport | All |
| 10 | Low (pass) | Desktop homepage above-the-fold composition is strong and can serve as reference | `/` |

## Screenshot Index (all under `C:\Users\pc\immigracan.com.br-audit\screenshots\`)

- `home_desktop.png` / `home_mobile.png` — steady-state above-the-fold
- `home_desktop_full.png` / `home_mobile_full.png` — full scroll
- `home_desktop_early.png` / `home_mobile_early.png` — pre-hydration-settle capture
- `home_mobile_nojs_fallback.png` — JS-disabled static fallback (unstyled)
- `home_mobile_adcheck.png` — full page with AdSense slot inspection annotations context
- `quiz_desktop.png` / `quiz_mobile.png` (+ `_early`, `_full`)
- `calc-crs_desktop.png` / `calc-crs_mobile.png` (+ `_early`, `_full`)
- `blog_desktop.png` / `blog_mobile.png` (+ `_early`, `_full`) — shows error state
- `bloglist_desktop_check.png` — `/blog` index showing "Nenhum artigo encontrado"
- `precos_desktop.png` / `precos_mobile.png` (+ `_early`, `_full`)
- `audit_data.json` — raw structured metrics (ad rects, CTA visibility, tap-target sizes, overflow, trust-keyword scan) for all 10 page/viewport combinations
