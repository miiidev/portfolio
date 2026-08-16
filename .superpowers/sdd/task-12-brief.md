### Task 12: SkillsSection restyle â€” domain-colored chips

**Files:**
- Modify: `src/components/SkillsSection.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 2), `personalInfo.skills`.
- Produces: `// Skills` heading; domain cards `rounded-md` with mono comment domain labels colored per index (`code-function`, `code-string`, `code-type`); chips inherit the domain color.

- [ ] **Step 1: Replace SkillsSection.tsx**

```tsx
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { containerVariants, itemVariants } from '../utils/animations';
import SectionHeading from './SectionHeading';

const domainColors = ['text-code-function', 'text-code-string', 'text-code-type'];

export default function SkillsSection() {
  return (
    <motion.section
      id="skills"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-100px' }}
      className="flex flex-col justify-center py-12"
    >
      <motion.div variants={itemVariants}>
        <SectionHeading file="skills.ts">Skills</SectionHeading>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {personalInfo.skills.map((group, gi) => {
          const color = domainColors[gi % domainColors.length];
          return (
            <motion.div
              key={group.domain}
              variants={itemVariants}
              className="bg-surface/50 border border-edge rounded-md p-6"
            >
              <h3 className={`font-mono text-sm mb-4 ${color}`}>
                <span className="text-code-comment">// </span>
                {group.domain}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-edge bg-canvas text-xs font-mono ${color}`}
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${skill.icon}/white`}
                      alt=""
                      className="w-4 h-4 skill-icon-base"
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
```

(Note: skill icons are kept â€” render `<img src={`https://cdn.simpleicons.org/${skill.icon}/white`} alt="" className="w-4 h-4 skill-icon-base" />` inside each chip before the name, exactly as the current SkillsSection does.)

- [ ] **Step 2: Verify**

Run: `npm run build; npm run lint` â€” expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/SkillsSection.tsx
git commit -m "feat: restyle skills with domain-colored syntax chips"
```

---


