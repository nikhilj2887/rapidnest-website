# Founder profile correction and portrait verification

## Scope and approval

The founder is **Nikhil Jogiparthy**, **Founder | RapidNest Software Solutions**. The three active “Nikhil Gupta” references were confined to `app/components/FounderSection.tsx` (portrait alt text, caption and biography) and have been corrected. No outdated name remains in app/public/test sources. Historical audit files and screenshots were preserved.

The owner supplied the four-paragraph biography and professional highlights in the brief. The owner subsequently answered “yes” to the question explicitly confirming verification and public-use approval of all three qualifications and attribution of the quotation, and supplied the founder LinkedIn URL. Approval includes:

- PRINCE2 Practitioner.
- Certified ScrumMaster (CSM).
- Senior Management Programme — Indian Institute of Management Visakhapatnam.
- “Understand the business first. Build with purpose. Deliver with accountability.” — Nikhil Jogiparthy.
- https://www.linkedin.com/in/nikhil-jogiparthy/

These facts are owner-confirmed; no certificate documents were independently inspected. The biography's “over 14 years” describes personal professional experience, not RapidNest operating history. No institutional logos, endorsements or certificate numbers were added. No reference image was attached to this brief; the existing design and detailed written portrait/layout requirements guided the implementation.

## Implementation

`app/components/FounderSection.tsx` now contains the exact four biography paragraphs, exact three highlights, qualifications, quotation and LinkedIn URL. The label is “Meet the Founder”; headline and supporting statement use the supplied text. The original photograph and corrected name/title occupy the left column, with the content on the right. Highlights have three columns on desktop and stack on mobile; the section stacks below 850px. The existing observer reveal, button styling, focus indicators and reduced-motion handling are reused. No dependencies were added.

The consultation CTA uses `/#contact`. LinkedIn opens in a new tab with `noopener noreferrer` and an accessible new-tab announcement. This verifies destination configuration, not availability or authentication on LinkedIn.

### Non-destructive portrait crop

The original `public/founder.png` is 784 × 1176 and remains byte-identical to the committed source. CSS displays an approximately **344 × 430** source region starting at **x=218, y=100** in a 4:5 frame, using uniform scale and overflow clipping. The image shows head, face, shoulders and upper/mid chest; the crop ends above the jacket button. No hands, waist, trousers or legs are visible. No face editing, image generation, replacement or cropped derivative was used.

Frame width is capped at 380px (320px on smaller desktop), with an 18px radius, white 4px inner border, neutral background and restrained shadow. `next/image` retains intrinsic proportions and delivers an optimized image. The larger requested source size accounts for the zoomed crop.

The first screenshot was inspected and the crop tightened further to meet the chest-up requirement. Final screenshots and checks below use the rebuilt result.

## Changed files

- `app/components/FounderSection.tsx`: identity, biography, highlights, qualifications, quote and CTAs.
- `app/globals.css`: scoped portrait crop, layout and responsive styling.
- `tests/browser-review.mjs`: optional output directory so this review preserves prior partnership evidence; wait for mocked contact completion instead of assuming a fixed response time.
- `docs/publication-inventory.md`: updated owner approval record.
- `docs/founder-review/`: final screenshots and browser evidence.

## Verification results

Results are completed after checking the final build. External EmailJS and Analytics network calls are blocked in browser tests; no live email is sent.

- Final production build: passed compilation, TypeScript and all 14 static-generation entries.
- Lint, all 10 automated tests and `git diff --check`: passed.
- HTTP regression: all nine public pages, intended 404 routes, canonical/social metadata, navigation, robots, sitemap and image responses passed.
- Focused browser checks: correct identity/alt text, all three highlights and qualifications, quote, verified LinkedIn destination, 4:5 proportions and no horizontal overflow at 320, 375, 768, 1024 and 1440px.
- Keyboard: Tab moves from the founder consultation link to LinkedIn, showing the existing solid 3px focus outline.
- Consultation CTA: reaches `#contact`, with the section top at approximately 96px below the sticky header.
- Reduced motion: founder portrait and copy report `animation-name: none`, with zero active document animations.
- Final 1440px, 768px and 375px founder screenshots and portrait close-ups were visually inspected. All display chest-up framing, original facial identity and no hands, waist, trousers or legs. Mobile stacks the portrait above the text; desktop uses two columns.
- Original image SHA-256 matches HEAD: `c2aae472c16bdb68247a37baf91f8a12f3f144db19df1fc46f1593b844b0cda1`.

### Screenshots

- [Founder section, 1440px](founder-review/founder-1440.png)
- [Founder section, 768px](founder-review/founder-768.png)
- [Founder section, 375px](founder-review/founder-375.png)
- [Portrait close-up, desktop](founder-review/portrait-1440.png)
- [Portrait close-up, mobile](founder-review/portrait-375.png)
- [Focused browser results](founder-review/focused-checks.json)

Founder section screenshots use a taller viewport to include the full biography and details. The regression suite separately checks standard viewport heights. The original full-length image is preserved on disk; only its presentation is cropped.

The exact biography was compared directly with the supplied attachment: all four paragraphs match. Repository search outside build/dependency and historical documentation folders found no remaining “Nikhil Gupta” references.

### Test timing correction

The first full regression run passed every viewport and all ten accessibility scans, then its mocked EmailJS success assertion read an empty status before the delayed mock response completed. The test used a fixed 900ms sleep. It now polls the form's busy state with a bounded timeout, then checks the actual success/error result. The temporary headless browser was restarted with background timer throttling disabled. No contact implementation or provider settings changed, and no real email was sent. The repeated suite results are recorded below.

### Final full-suite result

`REVIEW_OUTPUT_DIR=/docs/founder-review npm run test:browser` **passed** on the final production build:

- Homepage and all seven service pages plus Our Work at 320, 375, 390, 768, 1024, 1280, 1440 and 1920px; 56 service viewport checks, no overflow or broken images.
- All six approved clients and both WICCI/G100 cards remain visible and correctly placed; partnership URLs, badge text, logo containment, equal heights and touch targets pass.
- Ten axe WCAG A/AA scans: zero violations; no uncaught browser exceptions.
- Mobile navigation, sticky header, active links, anchor offsets, Escape/focus return and native form validation pass.
- Reduced-motion and JavaScript-disabled content checks pass.
- Mocked browser EmailJS success, failure, loading state and duplicate protection pass. Unit tests also verify the PII-free Analytics conversion event. WhatsApp and email destination checks pass. Live EmailJS delivery, Analytics ingestion and LinkedIn server availability are not asserted by local mocks.

[Full browser evidence](founder-review/results.json) accompanies the focused founder checks and screenshots above. No qualification or quotation approval remains outstanding for this update. No push, merge or deployment was performed.
