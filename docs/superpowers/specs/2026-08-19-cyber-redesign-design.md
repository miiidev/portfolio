# Cyber Redesign — miii.dev Portfolio

Date: 2026-08-19
Status: Draft (user-approved design summary; pending spec review)

## Goal

Restyle the shipped bento portfolio from **warm playful bento** to **refined dark dev-tool with neon texture** ("Linear x monitor glow", 60% loud cyber). Keep the entire structure: sections, order, carousel geometry, mobile-first behaviors, two themes, motion diet. This is a surface restyle, not a rebuild.

## Revision History

- Rev 1 (2026-08-19): initial design approval (direction + system + texture).

## Design Decisions (user-validated)

- Direction: **Linear x monitor glow** — cool near-black slate foundation, cyan/violet neon accents, Geist + Geist Mono typography, terminal texture (grid, cursor, mono labels) as accents only.
- Loudness: **60% loud**. Cyber energy in hero, carousel glow, nav, chips, and labels. Nothing structural, no scanlines, no CRT noise, no full terminal chrome (the old IDE theme stays cut).
- Fonts: **Geist** (headings + body, weight-driven hierarchy) + **Geist Mono** (all texture: dots, labels, chips, nav metadata). No other families. No Inter/Space Grotesk/IBM Plex lane.
- Keep: all sections and content; carousel geometry (spotlight 680px + edge peeks, MobileCardStack ≤768px); scroll-spy; ThemeToggle; BackToTop; motion diet (44px touch targets, no backdrop-blur, no em dashes/emojis, viewport-once reveals, `MotionConfig reducedMotion="user"`); `portfolio:project` event contract.
- Glow strength is a tuning knob: start at the values below, adjust later with the user if needed.

## Tokens (CSS variables in src/index.css)

Replace the warm bento token set. Keep the same variable names so components migrate without renaming. Add `--color-glow` for neon shadows.

| Token | Light | Dark |
|---|---|---|
| `--color-canvas` (page base) | `#F4F6FA` | `#0A0B0E` |
| `--color-surface` (card) | `#FFFFFF` | `#131519` |
| `--color-elevated` (hover/raised) | `#E9EDF4` | `#1C1F26` |
| `--color-copy` (ink) | `#14161C` | `#F2F4F8` |
| `--color-muted` | `#5A6270` | `#9AA3B2` |
| `--color-dim` | `#666E7B` | `#7A8291` |
| `--color-edge` (borders) | `#D7DCE5` | `#23262E` |
| `--color-edge-hover` | `#14161C` | `#F2F4F8` |
| `--color-accent` (cyan) | `#007A9E` | `#00D4FF` |
| `--color-accent-2` (violet) | `#5B4BD1` | `#7C6CFF` |
| `--color-accent-3` (terminal green) | `#0B7A52` | `#3DDB85` |
| `--color-accent-4` (magenta) | `#D6336C` | `#FF5C8A` |
| `--color-danger` | `#D6336C` | `#FF5C7A` |
| `--color-inverse` | `#14161C` | `#F2F4F8` |
| `--color-inverse-copy` | `#F4F6FA` | `#0A0B0E` |
| `--color-shadow-card` | `rgba(16, 24, 40, 0.08)` | `rgba(0, 10, 24, 0.5)` |
| `--color-glow` (new) | `rgba(0, 122, 158, 0.18)` | `rgba(0, 212, 255, 0.25)` |
| `--color-glow-soft` (new) | `rgba(0, 122, 158, 0.10)` | `rgba(0, 212, 255, 0.15)` |

Contrast commitments (verified against WCAG AA): `dim` ≥ 4.5:1 on canvas in both themes; accent-as-text (links, chips, labels) ≥ 4.5:1 on its surface in both themes — the light-theme accent set above is tuned for that (cyan `#007A9E`, green `#0B7A52`, dim `#666E7B`). Accent-filled buttons use `text-canvas` on the accent fill and pass the bold-≥14px 3:1 threshold. Values in this table are final; re-verify only if a value changes.

The `.light` class mechanism and `.dark` default stay unchanged.

## Typography

- Load **Geist** (400/500/600/700/800) and **Geist Mono** (400/700) via Google Fonts in `index.html`; font stacks in Tailwind theme: `font-sans` = Geist, `font-mono` = Geist Mono. No other families.
- Headings: `font-extrabold`, `tracking-tight` (`-0.03em` cap), modular scale ratio ≥ 1.25.
- Hero name: `clamp(2.5rem, 6vw, 4.5rem)` extrabold.
- Body: Geist 400/500, `leading-relaxed`.
- Mono usage (texture): nav labels, carousel dots, skill chips, experience period labels, hero status line, footer metadata. Mono is never used for body prose or headings.

## Texture by surface

### Hero

- Background: faint 1px grid (CSS `linear-gradient` lines at `rgba(0, 212, 255, 0.05)` dark / `rgba(0, 122, 158, 0.07)` light, RGB matching the tuned light accent `#007A9E`), confined to the hero section via a positioned pseudo-element or absolutely-positioned div (no backdrop-blur).
- Above the name: mono status line `~/miiidev $` with a blinking block cursor (existing `cursor-block` keyframes resurrected, `@media (prefers-reduced-motion: reduce)` disables blink).
- Status chip: `● all systems go` — mono, small pill, green accent, soft pulse on the dot (reduced-motion safe).
- Layout and photo untouched.

### Carousel

- Active card: add neon glow — a second box-shadow `0 0 48px var(--color-glow)` layered with the card shadow (applied to the card wrapper in the desktop branch only; mobile stack gets a fainter variant, `0 0 32px` at 60% opacity of the glow).
- Dots stay `[ ]` / `[_]` mono (shipped).
- Arrow buttons: hover switches border+text to accent AND adds the glow shadow (replaces the current border-only hover).

### Navigation

- Both bars: labels in Geist Mono (bold).
- Active item: accent text + accent tint + soft glow shadow (`0 0 16px var(--color-glow)`), replacing the tint-only state.
- Safe-area bottom offset and z-50 stay (shipped).

### Chips and labels

- Skill chips: mono text, neon accent cycle (accent/accent-2/accent-3/accent-4 tints at 10%, text at full accent color).
- Experience period labels: mono lowercase (`jan 2025 - now`), accent color. Same for education/achievement period labels (consistency across accordion cards).
- Social chips in About and Contact: keep tinted pills, now in neon cycle (About uses accent; Contact keeps its current treatment, tokens migrate automatically).

### Buttons

- Primary "Talk" button: accent fill with glow shadow on hover (`0 0 24px var(--color-glow)`), `text-canvas` on fill.
- Secondary/ghost buttons: border-edge + copy text; hover accent border + glow.

### Details

- `selection:bg-accent/30` on the app shell.
- `.card-shadow` token goes cool (values above); all cards inherit automatically.
- BackToTop: keep chevron; hover glow.
- Footer: keep as shipped (tokens migrate automatically). No mono echo line — it would repeat the hero line.

## Light theme

Same moves, fainter: grid at reduced opacity, glow at the light-theme `--color-glow` value, cursor black. Both themes remain full citizens (toggle kept, neither is a fallback).

## Copy

- Only addition: hero mono line `~/miiidev $`. Everything else stays as shipped (hero hook, about bio, projects, contact).

## Accessibility & Motion

- All prior commitments hold: WCAG AA contrast (incl. new accent-on-surface pairs), 44px targets, reduced-motion fallbacks for cursor blink and dot pulse, viewport-once reveals with `MotionConfig reducedMotion="user"`, semantic landmarks, aria-current nav, labels on icon buttons.
- No backdrop-blur anywhere (motion diet). Glow is shadow-only.

## Out of scope

- No section reorder, no new sections, no carousel geometry change, no nav structure change, no new imagery, no copy rewrites beyond the hero mono line.
- No scanlines, CRT flicker, glitch text, or full-screen terminal chrome.

## Implementation notes

- Google Fonts `<link>` in `index.html` head (two families, one request each with `display=swap`).
- Add `--color-glow` token and the hero grid/cursor/blink CSS in `src/index.css`.
- All component changes are class/token swaps except: HeroSection (grid bg + status line + chip), ProjectsSection (glow shadows on card wrapper + arrows), NavBar (mono labels + active glow), SkillsSection (mono chips), accordion sections (period label styling).