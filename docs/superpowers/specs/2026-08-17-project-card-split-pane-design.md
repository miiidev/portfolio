# Project Card Split-Pane Redesign — miii.dev Portfolio

Date: 2026-08-17
Status: Approved (user approved layout mockup, active state, and remaining sections)

## Revision History

- Rev 1 (initial approval): balanced split panes, 3-up carousel at 480px center card.
- Rev 2 (2026-08-17, user-directed): cards too small → **big center + edge peeks** on desktop/tablet (center card `min(100%, 680px)`, neighbors become subtle edge slivers); mobile keeps the existing MobileCardStack (panes already stack vertically below 640px).
- Rev 3 (2026-08-18, user-directed): whitespace around the spotlight + landscape screenshots → **stacked card inside an editor frame**. The card body becomes a vertical stack: full-width 16:9 screenshot on top, README content below (no more portrait Preview pane — screenshots are landscape, the split pane cropped them). The desktop carousel gains editor chrome: breadcrumb bar, line-number gutter, bottom status line. The Preview mini-tab and decorative URL bar are removed.

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

## Carousel Geometry (Rev 2)

- Center card width: `min(100%, 680px)`.
- `offset` 100 desktop (60 mobile unchanged); `farOffset` 300 desktop (100 mobile unchanged).
- Container `min-h-[560px]`; scales: center 1, peek 0.9, far 0.78; opacity: center 1, peek 0.4, far 0.
- Peeks: neighbor centers at ±`offset`, partially behind the center card — only a ~60px sliver of each is visible. `pointer-events: none` on all non-center cards (peeks are not clickable; arrows + swipe navigate).
- Far cards (|pos| ≥ 2): opacity 0, still rendered for spring transitions.
- Click-to-center removed (no clickable side cards anymore).
- At 769–1023px viewports the peeks are partially clipped by the container's `overflow-clip` — intended.
- Drag/swipe, spring config, `portfolio:project` dispatch: unchanged.
- Mobile (≤768px): MobileCardStack unchanged — panes stack vertically below 640px viewport width; `isCenter={isTop}` accent border on the top card.

## Rev 3 — Stacked Card + Editor Frame (2026-08-18)

Overrides Rev 1/2 card anatomy and adds carousel chrome. Carousel geometry (width, offsets, scales, opacities, pointer-events, mobile stack) is unchanged from Rev 2.

### Card Anatomy (Rev 3)

- Root + tab bar: unchanged from Rev 1 (tab `projects/{title}.tsx`, decorative `&#10005;`, accent border on center via `isCenter`).
- Body: single vertical stack — no more side-by-side grid.
  - Screenshot: full card width, `aspect-video` (16:9), `object-cover`, `border-b border-edge` divider to the content below. Missing image → existing fallback placeholder, also `aspect-video`.
  - Content block (below shot): `// {title}` comment, description comment (`leading-relaxed`), tag chips (4-color cycle), Code/Demo links pinned bottom (`mt-auto`). Same styles as the Rev 1 README pane.
- Removed: Preview mini-tab, decorative URL bar (`localhost:5173/...`), pane divider borders, `sm:grid-cols-2` split.

### Editor Frame (ProjectsSection, desktop carousel only)

- The carousel container gets `border border-edge rounded-md overflow-hidden` + a `bg-canvas/40` backdrop, visible **md+ only** (≥768px). Below md, MobileCardStack renders as today, frame absent.
- Breadcrumb bar (top): `work` (text-dim) `/` `projects.tsx` (text-muted), right side `● main` (text-dim). font-mono text-[10px], `border-b border-edge`, `bg-elevated/40`.
- Line-number gutter (left): static numbers `1..12`, `border-r border-edge`, `bg-canvas`, text `text-edge`, font-mono text-[10px], `aria-hidden`, width ~28px. Content column offset to the right of the gutter (carousel `left` shifts accordingly).
- Status line (bottom): `Ln 1, Col 7` (left), `3 projects` (center), `utf-8` (right). font-mono text-[10px], `border-t border-edge`, `bg-elevated/40`.
- Arrows: left arrow moves right of the gutter (`left: 44px`); right arrow unchanged (`right: 10px`).
- All frame chrome is decorative: `aria-hidden="true"` on gutter numbers and breadcrumb dots; no interactive elements added.
- Card height: shot 680px wide → ~383px tall at 16:9; total card ≈ 600px, so the card fills the `min-h-[560px]` container naturally (container grows with content; `min-h` stays a floor).

### Rev 3 Acceptance Criteria (overrides Rev 1/2 where they conflict)

1. Desktop (≥769px): stacked card — full-width 16:9 screenshot, README content below, accent border on center; editor frame chrome (breadcrumb, gutter, status line) visible around the carousel; arrows clear the gutter.
2. ≤768px: MobileCardStack unchanged (stacked card layout is inherently compatible — single column).
3. No Preview tab / URL bar anywhere; no side-by-side panes at any width.
4. Decorative chrome is `aria-hidden`; no new interactive elements.
5. Screenshots never crop to a portrait strip (16:9 aspect preserved).
6. `npm run build` and `npm run lint` both exit 0.

## Out of Scope

- No data changes (`projects` shape untouched).
- No new dependencies.
- No changes to MiniTerminal commands / events contract (`portfolio:project` zero-based stays).

## Acceptance Criteria

1. Desktop (≥769px): center card `min(100%, 680px)` with split panes + accent border; two dim edge slivers (~60px) at scale 0.9 / opacity 0.4; far cards invisible; arrows + swipe navigate.
2. ≤768px: MobileCardStack unchanged — panes stack below 640px, stack drag works, top card accent border.
3. URL bar renders but is not interactive (no link, no cursor-pointer).
4. Code/Demo links open in new tabs; images lazy-load; fallback placeholder shows for missing images.
5. `npm run build` and `npm run lint` both exit 0.