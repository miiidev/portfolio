# Education Collapsible List — miii.dev Portfolio

Date: 2026-08-19
Status: Draft (user-approved design summary; pending spec review)

## Goal

Replace the Education section's card accordion with a **HyTechster-style, card-free collapsible list** in the cyber system: typographic entries on the canvas, one open at a time, first entry open by default. Single-component change; data untouched.

## Revision History

- Rev 1 (2026-08-19): initial design approval (reference: hytechster.com education section, collapsible variant).

## Design Decisions (user-validated)

- Concept: **text-forward list, no cards**. Entries sit directly on the canvas — no `bg-surface`, no border box, no `card-shadow`, no rounded container. Structure comes from typography and spacing, per the HyTechster reference.
- Collapse model: **one open at a time** (accordion semantics), first entry open by default (matches current behavior).
- Layout: entries stacked vertically with generous spacing (`space-y-6` or equivalent); no dividers between entries.
- The horizontal milestone timeline idea from the earlier revision is dropped; this supersedes it.

## Anatomy (per entry)

### Header row (button)

- Full-width button, `min-h-11`, `text-left`, no background.
- Line 1: period in Geist Mono, lowercase, `text-accent` (`jul 2025 - jun 2026`).
- Line 2: degree title `font-extrabold text-copy` with org appended in muted (`title · org` pattern), wrapping allowed.
- Right side: chevron SVG (16px, `m9 18 6-6-6-6` path, same as existing accordions), `text-accent`, `rotate-90` when open via `transition-transform duration-300`.
- `aria-expanded` on the button, `aria-controls` pointing at the body id.

### Expanded body

- Rendered below the header inside the button's sibling region, `role="region"` + `aria-labelledby` header id.
- Description rendered verbatim from data (e.g., `• 4.00 CGPA`) in `text-muted`, leading-relaxed, indented to align with the title text.
- Expand/collapse uses the existing height animation pattern (framer-motion `AnimatePresence` + `height: 0 → auto`, 0.25s `easeOut`); `MotionConfig reducedMotion="user"` and the prefers-reduced-motion stylesheet already cover reduced motion.
- `overflow-hidden` on the animated wrapper (existing pattern from the current accordion).

## Interactions

- Tapping an open header closes it (same behavior as today).
- One open at a time: opening an entry closes the previous one (`useState<number | null>` with `openIndex`, same as current implementation).

## Scope

- **Only** `src/components/EducationSection.tsx` changes (rewrite of the section body).
- `src/data.ts` untouched (education items keep period/title/org/description).
- `SectionHeading`, section motion variants (`softContainerVariants`/`softItemVariants`), section `id="education"`, `py-12` layout, and the scroll-spy contract stay.
- No new CSS utilities expected; if a utility is needed, add it to `src/index.css` and note it in the plan.
- No copy changes (descriptions render verbatim).

## Accessibility & Motion

- Accordion pattern: button `aria-expanded` + `aria-controls`, body `role="region"` + `aria-labelledby`.
- `min-h-11` touch targets on headers; chevron is decorative (`aria-hidden`).
- Height animation 0.25s `easeOut`, reduced-motion covered by existing config.
- Contrast: period `text-accent` and body `text-muted` meet the committed AA values in both themes (existing tokens).

## Out of scope

- Other sections (Experience/Achievements keep their card accordions — not part of this change).
- Education data content and ordering.
- The horizontal timeline concept (dropped by user decision).