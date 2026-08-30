# QA Checklist — BUPEXSA USA

Generated: 2026-08-19
Source: Lighthouse audit (./lighthouse-report.html) and manual accessibility pass

Priority 1 — Launch blockers
- [ ] Add captions (`<track kind="captions">`) or transcripts for all `<video>` elements (GalleryStripSection and any other video players).
- [ ] Ensure no canonical redirects occur on dev/staging (middleware already guarded; verify in production).
- [ ] Fix critical color contrast failures (identify specific components from report and adjust CSS variables).
- [ ] Ensure transactional email templates are fully configured and tested (SendGrid key, templates, retry handling).

Priority 2 — Performance
- [ ] Reduce unused CSS: audit Tailwind usage and purge unused classes; split critical CSS where possible.
- [ ] Minify and tree-shake JS; split large bundles and defer non-critical scripts.
- [ ] Improve image delivery: enable AVIF/WEBP where appropriate, add responsive `sizes`/`srcset` and ensure images are optimized.
- [ ] Serve fonts with `font-display: swap` and preload key fonts.
- [ ] Optimize Largest Contentful Paint (LCP) resources (preload hero image, critical fonts).

Priority 3 — Accessibility & UX
- [ ] Keyboard focus: ensure all interactive elements are keyboard reachable and visible (focus-ring styles).
- [ ] Skip links and landmarks: `#content` added and skip link added; verify on all pages.
- [ ] Ensure interactive controls have ARIA names and correct `aria-expanded`/`aria-haspopup` states.
- [ ] Add `alt` attributes to any remaining non-decorative images.
- [ ] Ensure form fields have associated `<label>`s.
- [ ] Ensure link text is descriptive and not color-only.

Priority 4 — SEO & Best Practices
- [ ] Confirm `rel=canonical` and hreflang entries where needed.
- [ ] Add structured data for events and organization where applicable.
- [ ] Validate robots.txt and sitemap.xml for production.

Testing & Verification
- [ ] Run Lighthouse from CI (Docker or headless Chrome) and fail PRs on regressions.
- [ ] Run axe-core checks (axe CLI or Pa11y) as part of CI.
- [ ] Manual accessibility validation with keyboard and screen reader (NVDA/VoiceOver).

Notes and next steps
- The Lighthouse report is saved at `./lighthouse-report.html` relative to the repo root.
- I added keyboard and focus handling for the gallery lightboxes and some ARIA improvements in the navbar.

If you want, I can start executing the high-priority items now (captions, contrast fixes, fonts preloading). Which one should I pick first?
