# Working in this codebase

Read this before writing any UI. It is short on purpose.

## The one rule that matters

**This product is built on the Gist Foundations design system. Everything
visual comes from it — components, colours, spacing, type, radii, shadows.**

Before you write a single style, in this order:

1. **`COMPONENTS.md`** — what each component is for, when to use it rather
   than a near-duplicate, and its key props. Check here first, always.
2. **`PATTERNS.md`** — how components combine into a real piece of UI (a
   toolbar, a settings panel). Thin today; extend it as screens get built,
   from real screens rather than from imagination.
3. **`DESIGN_SYSTEM.md`** — the rules, the token guide, and the reasoning
   behind every component. Go here when something is unclear or contested.

### Do not invent

Do not introduce a new colour, spacing value, type size, radius or shadow.
They all exist as tokens. If you are writing a hex code, a `px` font size or
a magic number for spacing, **stop** — the value you want is already a token,
and if it genuinely is not, that is a design-system conversation, not a local
workaround.

```tsx
// NO — invents values the system already owns
<div style={{ background: '#111827', padding: 18, borderRadius: 6, fontSize: 15 }} />

// YES — reads them from the system
<div style={{
  background: 'var(--background-surface-raised)',
  padding: 'var(--spacing-padding-400)',
  borderRadius: 'var(--border-radius-md)',
  fontSize: 'var(--text-default-comfy-400-font-size)',
}} />
```

Tokens live in the design system: `src/styles/tokens.css`, `typography.css`,
`effects.css`. A browsable reference runs with `npm run storybook` from the
design-system repo.

### If the component you need does not exist

Say so, out loud, and stop. **Do not improvise a one-off substitute inline.**
A hand-rolled dropdown that looks close is worse than no dropdown: it looks
correct, so nobody fixes it, and it drifts from the system on every change.

The right move is to build it properly in the design system, following the
Figma-first workflow logged in `DESIGN_SYSTEM.md`. That is a real piece of
work with a real process, and skipping it is how a design system dies.

**There are already three known gaps, recorded so nobody rediscovers them:**

- `Modal` has fixed pixel sizes (small 400 / medium 560 / large 720) and no
  responsive step, so every modal overflows a phone. `src/index.css` caps
  `[role="dialog"]` as a workaround — that is a patch, not a fix.
- `Modal` forwards neither `className` nor arbitrary attributes to the element
  that carries its width, which is why that workaround has to key off an ARIA
  role.
- `Modal` has no `onOpenAutoFocus` escape, so opening one scrolls the page to
  its first control. `holdPageScroll()` in `ShareSnapshotModal.tsx` fights
  that from the call site.

Raise these upstream rather than copying the workarounds to new screens.

### Where local styling is fine

Tailwind handles this app's own layout and utilities — flex, grid, sizing,
positioning. The design system's components use CSS Modules internally, so
the two never collide and you can put Tailwind classes on a system component.

Layout is yours. **Appearance is the system's.**

## Responsive work

There is a skill at `.claude/skills/responsive-audit/` carrying the
measurement method, the bug families this codebase has actually produced, and
the false positives that waste a pass. **Load it before any responsive work**
— it will save you a day. Its headline lesson: measure with
`getBoundingClientRect`, do not judge by eye, and reload at every width.

Type sizes come from `src/geo-v2/typeScale.ts`, which resolves to the design
system's own tokens at desktop and adds the responsive stops the system does
not have. Use it rather than writing sizes: `const TYPE = useTypeScale()`.

## What this prototype is

A design prototype, not an application. All data is mock data. See
`HANDOFF.md` for what is real, what is illustrative, and what is still an
open question.
