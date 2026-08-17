# Project Card Split-Pane Redesign — miii.dev Portfolio

Date: 2026-08-17
Status: Approved (user approved layout mockup, active state, and remaining sections)

## Goal

Replace the current project card (tab header + screenshot + text block) with a **split-pane editor card** so the work section reads like an open IDE editor with the project file on one side and its preview on the other — the natural continuation of the IDE theme.

## Decisions (user-validated)

- Layout: **balanced split panes** (Approach A) — Preview pane left (~55%), README pane right (~45%).
- Active card cue: **accent card border** (like the existing center hover). No blinking cursor, no accent tab underline.
- URL bar in the Preview pane: **decorative** (aria-hidden). Code/Demo links in the README pane remain the clickable actions.
- Side cards: unchanged treatment — dimmed (opacity 0.7), scaled 0.9/0.78, hover accent border.
- Mobile: panes **stack vertically** below viewport 640px; split side-by-side at ≥640px.

## Card Anatomy

### Chrome (unchanged)

- Root: `bg-surface border border-edge rounded-md overflow-hidden group h-full w-full flex flex-col`.
- Tab bar: `projects/{title}.tsx` (font-mono, text-muted) + decorative `&#10005;` (aria-hidden, opacity-0 group-hover:opacity-100).

### Preview pane (left, flex-1.25 of body)

- Mini tab: `Preview` (font-mono 10px, border-b border-edge, bg darker).
- URL bar: `localhost:5173/{project.title}` (title verbatim, same as the tab bar) in `text-code-string` on `bg-canvas`, `border border-edge rounded`, margin 6px/8px, ellipsis overflow. **Decorative** — `aria-hidden="true"`, not a link.
- Screenshot: existing LazyImage `w-full aspect-video` (or the existing fallback placeholder div) fills the remaining pane space, `border-b border-edge` divider removed (pane has its own right border).

### README pane (right, flex-1 of body)

- Mini tab: `README.md` (same style as Preview tab).
- Body: `// {title}` (text-code-comment) + description as a single `// {description}` comment line that may wrap, `leading-relaxed`.
- Tags: `// deps:` label row — existing tag chips (font-mono text-xs, `bg-canvas text-muted px-3 py-1.5 rounded-full border border-edge`) with per-index domain colors cycling `['text-code-function','text-code-string','text-code-type','text-code-const']` (same pattern as SkillsSection).
- Actions: Code / Demo links (existing icons + labels) pinned to pane bottom (`mt-auto`), `hover:text-accent`.

### Center card

- `isCenter` → root border `border-accent/60` (always on the center card).
- Side cards: `border-edge` + `hover:border-accent/60` on hover (current behavior).

## Pane Layout Mechanics

- Body: `grid grid-cols-1 sm:grid-cols-2 flex-1 min-h-0` — panes stack below sm, split at sm+.
- Divider between panes: `border-t sm:border-t-0 sm:border-l border-edge`.
- Panes themselves: `flex flex-col min-h-0 overflow-hidden`.

## Carousel Geometry

- Center card width: `min(100%, 420px)` → `min(100%, 480px)`.
- `offset` 260 → 280; `farOffset` 420 → 470 (desktop values; mobile values 60/100 unchanged).
- Container `min-h-[550px]` → `min-h-[560px]`.
- Scales, drag/swipe, spring config, click-to-center, `portfolio:project` dispatch: unchanged.

## Mobile Stack (MobileCardStack)

- Same ProjectCard component (already shared) — panes stack vertically at phone width.
- Card container height unchanged (`h-[450px]`).
- `isCenter={isTop}` accent border applies on the top card.

## Out of Scope

- No data changes (`projects` shape untouched).
- No new dependencies.
- No changes to MiniTerminal commands / events contract (`portfolio:project` zero-based stays).

## Acceptance Criteria

1. Desktop carousel: center card shows split panes (Preview + README), accent border; side cards dimmed/scaled with hover accent.
2. `< 640px`: panes stack (Preview above README), stack drag still works, top card accent border.
3. URL bar renders but is not interactive (no link, no cursor-pointer).
4. Code/Demo links open in new tabs; images lazy-load; fallback placeholder shows for missing images.
5. `npm run build` and `npm run lint` both exit 0.