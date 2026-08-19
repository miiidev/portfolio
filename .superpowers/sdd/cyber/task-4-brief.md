# Task 4: Mono chips and period labels

**Files:**
- Modify: `src/components/SkillsSection.tsx`
- Modify: `src/components/ExperienceSection.tsx`
- Modify: `src/components/EducationSection.tsx`
- Modify: `src/components/AchievementsSection.tsx`

**Interfaces:**
- Consumes: `font-mono` stack from Task 1.
- Produces: nothing consumed elsewhere.

## Step 1: Skills chips mono

In `src/components/SkillsSection.tsx`, change the chip span from:

```tsx
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${color}`}
```

to:

```tsx
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold ${color}`}
```

## Step 2: Experience period labels mono lowercase

In `src/components/ExperienceSection.tsx`, change the period paragraph from:

```tsx
            <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{item.period}</p>
```

to:

```tsx
            <p className="font-mono text-xs font-bold text-accent lowercase mb-2">{item.period}</p>
```

## Step 3: Education period labels mono lowercase

In `src/components/EducationSection.tsx`, change the period paragraph from:

```tsx
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-0.5">{item.period}</p>
```

to:

```tsx
                  <p className="font-mono text-xs font-bold text-accent lowercase mb-0.5">{item.period}</p>
```

## Step 4: Achievement year labels mono lowercase

In `src/components/AchievementsSection.tsx`, change the year paragraph from:

```tsx
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-0.5">{item.year}</p>
```

to:

```tsx
                  <p className="font-mono text-xs font-bold text-accent lowercase mb-0.5">{item.year}</p>
```

## Step 5: Verify

Run: `npm run build; npm run lint`
Expected: both exit 0.

Grep gate (should return exactly 1 match — the "Direct" label in ContactFooter.tsx is exempt and stays as-is):

```powershell
Get-ChildItem src\components -Filter "*.tsx" | Select-String -Pattern "uppercase tracking-wider"
```

Expected: exactly 1 match, and it must be `src\components\ContactFooter.tsx` line ~40.

## Step 6: Commit

```bash
git add src/components/SkillsSection.tsx src/components/ExperienceSection.tsx src/components/EducationSection.tsx src/components/AchievementsSection.tsx
git commit -m "feat: mono chips and lowercase period labels"
```
