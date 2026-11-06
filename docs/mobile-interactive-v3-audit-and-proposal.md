# RapidNest V3: mobile-first audit and design proposal

> Stage A record: the owner subsequently approved this direction. Implementation and final QA are recorded in [the V3 review](mobile-interactive-v3-review.md).

Stage A only, 3 November 2026. Prepared for owner review before implementation. No application, business content, asset, integration or test assertions have changed.

## Verified baseline and Git protection

Fetched remote branches and read [PR #2](https://github.com/nikhilj2887/rapidnest-website/pull/2) metadata. It contains head `5b1ce5077774b2fcb0ea02881f03793d9939c8f3` and was merged at 22:35:17 IST on 3 November 2026. Current remote main is merge commit `9cbfa77f556ca9e225455aa2a4a20cf3463452a8`. Its file tree is identical to PR #2 head (`git diff 5b1ce50 origin/main` empty), and `5b1ce50` is its ancestor.

Created local `feature/rapidnest-mobile-interactive-v3` from verified `9cbfa77`, with no upstream pointing at main. The previous feature branch, PR #2 and main were not changed. There are no V3 implementation commits, pushes, merges or deployments. This resolves the brief's already-merged exception using the current merged PR #2 baseline, rather than the outdated pre-PR main.

Reviewed the PR application diff and [final QA evidence](final-qa-completion-report.md): targeted spacing, concise approach/technology headings, one-time technology reveals, contact service-title payload reduction and mouse/touch safeguards. All seven services and approval-gated relationships/case studies remain protected. Read installed Next.js 16 CSS and Server/Client Component guides before planning component boundaries.

## Audit method and measured baseline

Inspected source for Hero, InterfacePreview, Clients, Services, CaseStudies, Partnerships, WhyChooseUs, DeliveryMethodology, TechnologyExpertise, About, FounderSection, Contact, Navbar, Footer, WhatsAppButton, MotionEnhancements, global styles and `/work` composition. Reviewed fresh baseline screenshots at 390, 768 and 1440px, including hero, services, solutions, founder and contact. Additional screenshots cover clients, partnerships, approach, methodology, technology, company and footer.

The local production build is the unchanged PR #2 application tree. All 11 widths were measured at 900px viewport height. Fresh measurements found no horizontal overflow, broken images, runtime exceptions, or visible main/header links/buttons below 44px height. Seven service cards, six client logos and two partnerships render at every width. Footer/document gap is below one pixel (rounding). This is a design audit, not a rerun of final release QA; full interaction/accessibility/performance suites are reserved for each implemented stage and final Stage F.

[Machine-readable measurements](mobile-interactive-v3-baseline.json).

| Width | Homepage height | Width overflow | Broken images |
| --- | --- | --- | --- |
| 320px | 17,836px | None | 0 |
| 360px | 16,948px | None | 0 |
| 375px | 16,887px | None | 0 |
| 390px | 16,706px | None | 0 |
| 414px | 16,258px | None | 0 |
| 430px | 16,134px | None | 0 |
| 768px | 11,600px | None | 0 |
| 1024px | 9,981px | None | 0 |
| 1280px | 8,996px | None | 0 |
| 1440px | 9,062px | None | 0 |
| 1920px | 9,162px | None | 0 |

Section heights, rounded pixels:

| Section | Mobile 390px | Tablet 768px | Desktop 1440px |
| --- | --- | --- | --- |
| `.hero` | 1154 | 897 | 592 |
| `#clients` | 782 | 580 | 430 |
| `#services` | 3980 | 2459 | 1707 |
| `#work` | 1409 | 1067 | 985 |
| `#partnerships` | 1014 | 592 | 621 |
| `#why-us` | 824 | 582 | 581 |
| `#methodology` | 877 | 590 | 464 |
| `#technology` | 1554 | 1002 | 837 |
| `#about` | 601 | 518 | 390 |
| `#founder` | 1973 | 1457 | 1007 |
| `#contact` | 1766 | 1303 | 945 |
| `.site-footer` | 698 | 480 | 425 |

At 390px, both hero CTAs occupy y=471–579px and already fit the first 900px viewport. The illustration block is 505px high, starting at y=643px. The founder portrait is 300 × 375px, before its caption and full biography. The contact form begins 607px below its section start. Services occupy about 24% of the total page, largely because seven fully visible cards include two detailed illustrative interfaces. These measurements identify composition opportunities; page-height reduction alone is not a success metric.

## Proposed design direction

Use an engineering-workspace visual language: navy structural panels, white reading surfaces, orange accents at actions and process handoffs. Give credibility, capabilities, applications, philosophy, delivery, leadership and conversion distinct compositions. Keep current section order and all approved wording; no content merger or removal is proposed.

Retain readable typography: current 37px mobile headline at 390px as the starting point, 16px supporting copy and form inputs, current 15px body text. Adjust wrapping and composition before reducing type. Keep at least 44px touch targets and existing strong focus outlines. Use restrained 10–16px radii, fine borders and shadows primarily for interactive elevation. Do not apply a global spacing reduction; edit the relevant existing scoped rules rather than adding another broad override layer.

### Prioritized section proposals

| Priority / section | Current finding | Proposed mobile-first change | Desktop / tablet and trade-off |
| --- | --- | --- | --- |
| P1 — Hero | Readable headline and visible CTAs; illustration and separate annotations make the section 1,154px tall. The interface repeats detailed UI also used in services. | Preserve the exact headline and support text. Make the illustration a compact connected-workspace composition with the existing three pipeline stages, annotations and illustrative caption. Integrate annotations into its frame and reduce redundant decorative chrome/padding. Keep every primary element in normal flow; no fixed hero height or scaled-down text. | Retain two-column desktop balance; refine tablet illustration width instead of stretching it. Aim for a meaningful mobile reduction through composition (roughly 15–20% as a hypothesis, not an enforced height). Smaller illustration means less decorative detail, not less business content. |
| P2 — Navigation | Logo, opaque sticky header, menu, anchor state and Escape/focus return already work. | Keep structure, destinations and labels. Add only short opacity/transform feedback if opening/closing can retain correct focus, hidden-link behavior and content stability. No modal conversion or bottom CTA bar proposed. | Preserve desktop layout. Verify keyboard order and nested-page anchors after each header change; avoid changing a working control just to add motion. |
| P2 — Clients | Six original logos in a useful 2-column mobile grid; different inherent aspect ratios create uneven apparent weight. | Add consistent quiet framing and per-logo optical sizing within contained image boxes. Keep names, full logo proportions and authorized external links; Baseline remains unlinked. Reveal the grid once, rather than animate every logo. | Six columns on wide screens / three on tablet as appropriate. Preserve asset color and artwork; do not crop logos or imply new endorsements. |
| P1 — Services | Seven cards are fully readable, but two large interface previews dominate mobile scanning; icon/title/CTA rhythm varies. Desktop featured-card rows leave large blank areas in neighboring cards. | Keep seven services, exact order, descriptions, displayed capabilities and URLs. Use a more compact icon/title header, clear capability grouping, consistent CTA footer and restrained navy/orange edge accents. Recompose the two previews as compact, fully legible schematic panels using their existing labels and captions; do not crop or conceal approved content. | Refine current featured grid with content-driven row balance, avoiding unnecessary equal-height empty space. Fine-pointer hover: 2–3px lift, border emphasis, slight icon/arrow response. On touch, use focus/pressed color feedback without sticky hover; the CTA remains the interactive link rather than a nested card button. |
| P1 — Solution concepts | Three meaningful concepts and disclaimer are clear, but numbered text lists read similarly to the following delivery material. | Present each existing three-stage flow as connected nodes with small existing Lucide icons, visible labels and directional connectors. Preserve the illustrative disclaimer and service CTA; keep meaningful sequential numbers if used. | Desktop copy/flow split, mobile vertical flow, avoiding tiny three-column labels at 320px. An optional one-pass node highlight communicates handoff; it never implies live execution or customer results. Shared component also affects `/work`, which must be retested. |
| P2 — Partnerships | Correct WICCI/G100 logos and neutral badges; stacked equal-height cards reserve substantial unused space in G100. | Use compact stacked cards with a consistent contained logo area and a tighter name/relationship/link grouping. Preserve the WICCI expansion, professional-connection badge, existing intro and destinations. | Two balanced cards on tablet/desktop. Reduce unused internal clearance rather than add unsupported descriptors. Keep comparable card dimensions without arbitrary large minimum heights. |
| P2 — Approach | Four icon/text principles are clear but visually resemble a long list. | Use a compact 2×2 principle matrix where readable, and a connected icon-and-text list at narrow widths. Keep all four descriptions visible. Express related principles without numbered process styling. | A distinct light composition contrasts with the following dark chronological delivery section. Do not force two columns at 320–390px if text becomes narrow. |
| P2 — Delivery | The requested mobile vertical stepper already exists; desktop has five connected stages. | Refine existing connector and stage alignment; preserve all five stage names/descriptions and meaningful step numbers. Optional once-only connector emphasis on entry. | Keep horizontal five-stage desktop journey, with a deliberate tablet wrap. Avoid continuous scroll-progress logic or sticky storytelling. |
| P2 — Engineering capabilities | Six useful categories and 14 approved tools; repeated divider rows create a 1,554px mobile section. | Give categories compact bordered reading panels with aligned icon/title, full descriptions and grouped tool chips. No invented tools or empty technology badges for categories without named tools. | Two-column desktop/tablet grid, single-column narrow mobile. Reuse individual one-time reveals; no duplicate observer or moving logos. Full wording may limit height savings, which is acceptable. |
| P3 — Company | Concise two-paragraph identity plus badges and CTA; already compact relative to the page. | Preserve text and hierarchy, relate the background/border transition to founder leadership, and remove only demonstrably redundant spacing. | Keep current order and section ID; do not combine company achievements with the founder's individual experience. |
| P1 — Founder | Large portrait precedes all leadership context; highlights, credentials, quote and CTAs form many separate blocks. 1,973px mobile height. | Move section heading/context before the portrait in meaningful source order. Use a smaller, prominent original 4:5 portrait (about 200–240px wide as a starting range) with identity grouped nearby where width allows. Keep full biography open. Use horizontal icon/text highlight rows, three clearly separated credential rows and a compact quote/action group. | Retain desktop portrait/biography split. Tablet should avoid the current tall centered portrait followed by an unrelated full-width text block. No image edit, replacement, filter, crop change or face treatment; photograph asset and approved source crop remain intact. Credentials and LinkedIn remain visible. |
| P1 — Contact | Form is clear with 16px inputs and native labels, but starts 607px into the section on mobile. Intro, discovery list, alternatives and form intro compete for attention. | Group heading/description and compact discovery steps into a coherent introduction; keep alternatives easy to scan in 44px rows. Bring the form closer without hiding steps or links. Add quiet field-group boundaries using existing fields/order, stronger focus-within feedback and a clearly anchored submit row. Keep single-column fields at narrow widths. | Preserve two-column layout where it works. All eight non-honeypot fields remain available; no multistep form or collapsed optional fields. Keep EmailJS handler, spam/rate limits, validation, status messages and analytics unchanged. Test keyboard/validation scroll and rail overlap. |
| Preserve — Footer / WhatsApp | Footer ends cleanly and its compact spacing works. Fixed WhatsApp is visible and existing controls have safe scroll margins. | Preserve footer design/content and button appearance/behavior. Validate actual focused-field bounds before proposing any adjustment. | No footer redesign or floating-bar replacement. Preserve legal/navigation links and bottom background. |

## Proposed motion system

Reuse `MotionEnhancements` and CSS. No added dependency, second IntersectionObserver system or Framer Motion wrapper tree is needed.

- Headline: short stagger between semantic phrases (about 60–80ms), using transform/opacity; do not split accessible reading into separately announced characters. Keep exact headline text.
- Copy, buttons and illustration: 250–450ms entrances with the full primary composition usable immediately; no animation-dependent event handling or hidden-by-default content. Headline/copy/button sequence should settle in under one second.
- Hero and solution flow: finite one-pass emphasis, ending in a stable state. Avoid continuous large-area activity; shorten the current hero stage sequence (which can run about 8.1 seconds) rather than prolong it.
- Reveals: observe meaningful groups or individual technology cards once. Avoid an animation on every text line, logo or input.
- Hover/press/focus: 160–220ms restrained feedback; transforms only on hover-capable fine pointers. Equivalent visible focus and clear touch pressed states.
- Reduced motion: no entrance/connector animations and no smooth scrolling. No-JavaScript content remains present. Never use animation to alter layout dimensions.

## Preservation and implementation boundaries

All data in services, relationships, technologies and case studies remains unchanged. Keep six clients, WICCI/G100 relationship claims, approved founder biography/experience/qualifications/quote, original photograph, contact details and all CTA URLs. No project results, testimonials or credentials are added. Case-study inventory stays empty with approval gates intact. `/work` remains illustrative.

Server-rendered cards and diagrams should remain Server Components. Preserve the PR #2 contact optimization (only service-title strings cross the client boundary). Scope shared CSS deliberately so the seven service pages, metadata, IDs, legal pages and navigation do not change unintentionally. Expected implementation files are the relevant presentation components and scoped global styles; data, provider configuration, root metadata, footer and image assets should remain untouched. Exact changed-file list will follow implementation, not be claimed in advance.

## Controlled stages and acceptance gates

| Stage | Proposed work | Check before moving on |
| --- | --- | --- |
| A — current | Audit, measurements and proposal only | Owner reviews this concrete direction; implementation has not started |
| B | Hero composition / minimal menu feedback | 390/768/1440 screenshots, 320px fit, exact text/links, mouse/touch and Escape/focus, natural entrance and reduced motion |
| C | Seven service cards / three solution diagrams | Visible content/order, touch/focus targets, desktop hover, `/work`, no published case studies |
| D | Distinct approach / existing delivery journey / technology grouping | Four principles, five stages, six categories/14 tools, one-time reveals, tablet wrapping |
| E | Founder hierarchy / contact grouping | Original photo checksum/crop, approved biography and credentials, all form fields, mocked success/failure, autofill and validation-scroll review, WhatsApp clearance |
| F | Full release validation and comparisons | Lint, TypeScript, production build, all existing tests, HTTP, 11-width browser suite, accessibility, natural animation/real input tests, Lighthouse and before/after review |

At Stage F retain existing safety assertions. Only intentional presentation-specific geometry expectations may change, with equivalent or stronger checks; no removal of content, approval, accessibility, contact or routing assertions. Test all seven service pages and `/work` at all 11 widths.

Compare performance to the PR #2 measured reference: desktop 100/100/100/100 and mobile 92/100/100/100, mobile TBT approximately 330ms, CLS 0. Use comparable local production conditions and report every final run honestly. Check LCP and CLS; report lab interaction observations separately from field INP. Neither unchanged code nor a design proposal establishes new performance scores.

## Evidence and review status

Fresh large screenshots remain outside Git at `/tmp/rapidnest-v3-design-audit/`, with `hero`, `services`, `work`, `founder`, `contact`, other section names and `full` suffixed by `390`, `768`, or `1440`. These are baseline-only captures, not proposed after states. Section exports can include fixed header/WhatsApp overlays; normal viewport evidence in PR #2 shows the first-screen composition. No animation times were forced for this audit; captures waited for finite entrances. Geometry checks at all widths were separate from screenshots.

Durable equivalent baseline evidence is already in Git from PR #2: [mobile full page](final-qa-completion/comparison/after-full-390.png), [desktop full page](final-qa-completion/comparison/after-full-1440.png), [mobile normal viewport](final-qa-completion/comparison/after-viewport-390.png), [desktop normal viewport](final-qa-completion/comparison/after-viewport-1440.png), and [tablet section comparisons](premium-ux-polish-review.md). Fresh measurements are recorded in the small JSON beside this document. Do not add another set of large screenshot/Lighthouse files to Git for V3; keep final evidence local or use an owner-approved external artifact destination.

Only this proposal and its measurement JSON are new repository files. No lint/build/performance improvement is claimed for V3, because there is no implementation yet. Baseline QA results remain references, not fresh V3 release results. Before-and-after V3 comparisons, implementation commits and PR readiness remain pending Stage B–F.

**Review checkpoint:** approve the proposed compact hero/interface treatment, compact service/solution diagrams, smaller unchanged founder portrait with regrouped credentials, and contact hierarchy before implementation. This checkpoint is explicitly required by the attached brief: “Do not begin implementation until the audit and proposed changes are presented for review.” No merge, deployment or V3 push has occurred.
