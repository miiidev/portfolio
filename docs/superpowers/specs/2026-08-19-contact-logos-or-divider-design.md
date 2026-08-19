# Contact Logo Socials + "or" Divider — miii.dev Portfolio

Date: 2026-08-19
Status: Draft (user-approved design summary; pending spec review)

## Goal

Rework the Contact section's socials: brand logos instead of text pills, and restructure the layout to form → "or" divider → logo buttons. Single-component change (ContactFooter); ContactForm untouched.

## Design Decisions (user-validated)

- Layout: form card stays as-is; below it an **"or" divider** (hairline — `or` — hairline, mono lowercase, `text-dim`); below that a centered row of **icon-only circle buttons** (44px, logo only, `aria-label` for screen readers).
- The "Direct" block (uppercase label + big email address) is removed — the Email button in the socials row replaces it (`mailto:` unchanged).
- Three socials: GitHub, WhatsApp, Email. Icons are **inline SVG** (filled brand marks + filled envelope); no new dependencies.

## Anatomy

### "or" divider

- `flex items-center` row, `gap-4`, full width: two `h-px flex-1 bg-edge` hairlines with a centered `font-mono text-xs lowercase text-dim` "or" span.
- Placed below the form card (`mt-8`).

### Socials row

- `flex justify-center` with `gap-3`, below the divider (`mt-6`).
- Each button: `inline-flex items-center justify-center h-11 w-11 rounded-full bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-canvas hover:shadow-[0_0_16px_var(--color-glow-soft)]`.
- Icon: `w-5 h-5 fill-current` SVG — GitHub octocat mark (simple-icons path), WhatsApp glyph (simple-icons path), filled envelope.
- `target="_blank"` + `rel="noreferrer"` for GitHub/WhatsApp; plain `mailto:` link for Email (no target/rel).
- `aria-label` = "GitHub" / "WhatsApp" / "Email"; decorative svgs `aria-hidden="true"`.

## Interactions

- No behavior change: links point at the same `personalInfo.socials` values (github, whatsapp, email).

## Scope

- **Only** `src/components/ContactFooter.tsx` changes.
- `ContactForm`, `SectionHeading`, motion variants (`containerVariants`/`itemVariants`), section `id="contact"`, `py-12`, copyright line, and the form card stay.
- No CSS utilities needed (all classes are existing Tailwind utilities).
- The `socialLinks` array moves/stays local; keep the `label` field for `aria-label` and `key`.

## Accessibility & Motion

- `min-h-11` targets on all three buttons.
- Icon-only buttons need `aria-label` (no visible text).
- Hover transitions `duration-200`/`duration-300` as elsewhere; no animation changes.

## Out of scope

- About section's text-pill socials (unchanged).
- ContactForm styling and behavior.
- Email address value and mailto target.