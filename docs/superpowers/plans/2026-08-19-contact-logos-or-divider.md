# Contact Logo Socials + "or" Divider Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the Contact section: replace the text-pill socials + "Direct" email block with an "or" divider and three icon-only logo buttons (GitHub, WhatsApp, Email).

**Architecture:** Single-component change to `src/components/ContactFooter.tsx`. The section shell (heading, `containerVariants`/`itemVariants` motion, `id="contact"`, `py-12`, form card, copyright) stays; the "Direct" block and pill row are replaced by the divider + logo buttons. All icons are inline SVG — no dependencies.

**Tech Stack:** React 19 + Vite 8 + Tailwind CSS v4. Verification gate is `npm run build` + `npm run lint` (no test framework) plus grep gates.

## Global Constraints

- No test framework: verify with `npm run build; npm run lint` (both exit 0) plus the task's grep gates.
- Only `src/components/ContactFooter.tsx` changes.
- Buttons: `inline-flex items-center justify-center h-11 w-11 rounded-full bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-canvas hover:shadow-[0_0_16px_var(--color-glow-soft)]`, icon `w-5 h-5 fill-current`.
- GitHub/WhatsApp links: `target="_blank" rel="noreferrer"`. Email: `mailto:` link, no target/rel.
- `aria-label` on every button ("GitHub" / "WhatsApp" / "Email"); svgs `aria-hidden="true"`.
- Divider: `flex items-center gap-4` with two `h-px flex-1 bg-edge` hairlines + `font-mono text-xs lowercase text-dim` "or"; `mt-8` below the form card; socials row `mt-6` below it, `flex justify-center gap-3`.
- The "Direct" block (uppercase label + email address) is removed; email address still lives in the data and the Email button.
- No CSS changes, no data changes, no other components.
- Commit message: `feat: contact logo socials with or divider`.
- Windows PowerShell (no `rg`): use `Select-String` for grep gates.

---

### Task 1: Replace Direct block and pills with "or" divider and logo buttons

**Files:**
- Modify: `src/components/ContactFooter.tsx`

**Interfaces:**
- Consumes: `personalInfo.socials` (github/email/whatsapp — unchanged).
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Update the socialLinks array**

Change the `socialLinks` array (top of file) to:

```tsx
const socialLinks = [
  { label: 'GitHub', href: personalInfo.socials.github },
  { label: 'WhatsApp', href: personalInfo.socials.whatsapp ?? '#' },
  { label: 'Email', href: `mailto:${personalInfo.socials.email}` },
];
```

(No change — the array already exists with exactly these entries; only the rendering changes.)

- [ ] **Step 2: Replace the Direct block + pill row with divider + logo buttons**

Replace the entire "Direct"/socials block (the `<motion.div ... className="mt-10 flex flex-col sm:flex-row ... border-t border-edge pt-6">` element containing the "Direct" label, the email `<a>`, and the pill buttons) with:

```tsx
        <motion.div variants={itemVariants} className="mt-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-edge" aria-hidden="true" />
          <span className="font-mono text-xs lowercase text-dim">or</span>
          <span className="h-px flex-1 bg-edge" aria-hidden="true" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 flex justify-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              aria-label={social.label}
              className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-canvas hover:shadow-[0_0_16px_var(--color-glow-soft)]"
            >
              {social.label === 'GitHub' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              )}
              {social.label === 'WhatsApp' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              )}
              {social.label === 'Email' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm20 0-10 6.5L2 5.5v13a.5.5 0 0 0 .5.5h19a.5.5 0 0 0 .5-.5v-13Z" />
                </svg>
              )}
            </a>
          ))}
        </motion.div>
```

Notes:
- The `aria-hidden="true"` svgs are decorative; the `aria-label` on the anchor carries the name.
- The svg `width`/`height` is 20, matching the `w-5 h-5` intent (class `fill-current` not needed since `fill="currentColor"` on the svg; do not add `fill-current` to the className).

- [ ] **Step 3: Verify build and lint**

Run: `npm run build; npm run lint`
Expected: both exit 0.

- [ ] **Step 4: Grep gates**

PowerShell, from repo root:

```powershell
Select-String -Path src\components\ContactFooter.tsx -Pattern ">Direct<|tracking-wider"
```

Expected: 0 matches (Direct block and its uppercase label removed).

```powershell
Select-String -Path src\components\ContactFooter.tsx -Pattern "aria-label=|>or<|h-px flex-1 bg-edge|fill=`"currentColor`""
```

Expected: matches present (logo buttons, divider, filled icons).

```powershell
Select-String -Path src\components\ContactFooter.tsx -Pattern "min-h-11 px-4|text-sm font-bold"
```

Expected: 0 matches — the old text pills used `inline-flex items-center min-h-11 px-4 rounded-full bg-accent/10 text-accent text-sm font-bold`; the new buttons use `h-11 w-11` circles. If the old pill marker classes still appear, the replacement failed.

- [ ] **Step 5: Commit**

```bash
git add src/components/ContactFooter.tsx
git commit -m "feat: contact logo socials with or divider"
```

---

## Post-Tasks (after review passes)

1. Full verification: `npm run build; npm run lint` both exit 0.
2. Commit any remaining artifact files (ledger, briefs) as `chore: ...`.
3. `git push origin main`, then `npm run deploy`, then smoke `Invoke-WebRequest -Uri "https://miiidev.github.io/portfolio/" -UseBasicParsing -Method Head` expecting 200.
4. Report to the user: what changed and where, and note the icons are inline SVG brand marks (no new dependencies).