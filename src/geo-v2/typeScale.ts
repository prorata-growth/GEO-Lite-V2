import useLayoutMode, { type LayoutMode } from './useLayoutMode'

/**
 * One type ramp, three sizes — the S/M/L idea, with the relationships written
 * down rather than left to whoever edits a number next.
 *
 * The problem this replaces is not that the sizes were wrong. It is that each
 * one was decided on its own, at the place it was used, against the widest
 * viewport: the hero headline is 48 with a hard-coded 36 for phones, the
 * report's own ramp is 18/16/14 at every width, and nothing records what any
 * of them is a size *relative to*. So a step drops out of proportion the
 * moment someone tunes one number, and a viewport nobody checked gets whatever
 * falls out.
 *
 * ── how the steps move ────────────────────────────────────────
 *
 *   display  48 → 40 → 36   the hero headline, the only true display size
 *   title    36 → 32 → 28   the report masthead and the score readouts
 *   lead     24 → 20 → 18   a hero's standfirst
 *   section  18 → 18 → 17   a section's own heading
 *   body     16 → 16 → 15   descriptors and prose
 *   data     14 → 14 → 14   every table row, at every width
 *   eyebrow  12 → 12 → 12   block labels
 *
 * Two rules decide those numbers, and both matter more than the numbers:
 *
 * **The big steps move, the small ones hold.** Display loses a quarter of its
 * size between wide and phone; data loses none. That is deliberate rather than
 * uniform scaling: a 48/14 contrast reads as confident on a 1440 screen and as
 * shouting on a 375 one, so the ramp is *supposed* to compress as the viewport
 * narrows — from roughly 3.4:1 down to 2.6:1. Scaling every step by the same
 * factor would hold the ratio and lose the point.
 *
 * **14 is the floor and it is not negotiable.** Data is the thing the report
 * exists to show, and it is already the smallest thing on the page. Anything
 * that has to give, gives above it.
 *
 * Discrete stops rather than `clamp()`, for the same reason the spacing scale
 * has steps: fluid type lands on 17.3px and quietly leaves the system. Three
 * stops keep every size a value somebody chose.
 *
 * ── where the numbers come from ───────────────────────────────
 *
 * Every size that the design system has a token for **is** that token, read
 * as a CSS variable rather than copied as a number. The `wide` column is the
 * design system's own scale, so on a desktop this ramp renders exactly what
 * the tokens render, and a change to the system arrives here without anyone
 * editing this file.
 *
 * Five values have no token, and they are listed here rather than buried:
 *
 *   display wide    48   the system stops at 40 (accent-tight-900)
 *   title compact   32   between 28 and 36, which the system does not have
 *   lead compact    20   between 18 and 24, likewise
 *   section phone   17   a single step under 18
 *   body phone      15   a single step under 16
 *
 * The middle two exist because the system has no responsive stops at all —
 * its type is one fixed size per step — so the sizes a ramp needs *between*
 * the named steps are the ones it cannot supply. The last two are the
 * weakest: 17 and 15 are the only genuinely invented values in this file, and
 * snapping them to the 18 and 16 tokens would make the ramp fully
 * token-backed at the cost of one step of phone compression. Worth raising
 * upstream as one ask: responsive stops on the type scale.
 */

/** A design-system type token's size, by name. */
const token = (name: string) => `var(--text-${name}-font-size)`
export type TypeStep = 'display' | 'title' | 'lead' | 'section' | 'body' | 'data' | 'eyebrow'

/** Sizes are CSS lengths, not numbers: most of them are `var(--text-…)`. */
type Ramp = { size: Record<LayoutMode, string>; lh: Record<LayoutMode, number>; ls?: string }

/** Line height travels with size: what is comfortable at 48 is airless at 36,
 *  and a display line set at 0.94 needs to open up as it comes down. */
const RAMP: Record<TypeStep, Ramp> = {
  display: {
    size: { wide: '48px', compact: token('accent-tight-900'), phone: token('accent-tight-800') },
    lh: { wide: 0.94, compact: 1.0, phone: 1.05 },
  },
  title: {
    size: { wide: token('accent-tight-800'), compact: '32px', phone: token('accent-tight-700') },
    lh: { wide: 1.13, compact: 1.15, phone: 1.18 },
    ls: '0.72px',
  },
  lead: {
    size: { wide: token('accent-tight-600'), compact: '20px', phone: token('accent-tight-500') },
    lh: { wide: 1.3, compact: 1.35, phone: 1.4 },
    ls: '0.48px',
  },
  section: {
    size: { wide: token('accent-tight-500'), compact: token('accent-tight-500'), phone: '17px' },
    lh: { wide: 1.4, compact: 1.4, phone: 1.4 },
  },
  body: {
    size: { wide: token('default-comfy-400'), compact: token('default-comfy-400'), phone: '15px' },
    lh: { wide: 1.6, compact: 1.6, phone: 1.55 },
  },
  data: {
    size: {
      wide: token('default-tight-300'),
      compact: token('default-tight-300'),
      phone: token('default-tight-300'),
    },
    lh: { wide: 1.4, compact: 1.4, phone: 1.4 },
  },
  eyebrow: {
    size: {
      wide: token('accent-tight-200'),
      compact: token('accent-tight-200'),
      phone: token('accent-tight-200'),
    },
    lh: { wide: 1.4, compact: 1.4, phone: 1.4 },
    ls: '0.72px',
  },
}

export type TypeStyle = {
  /** A CSS length — usually `var(--text-…-font-size)`. Never a bare number,
   *  so it can carry a token; append no units to it. */
  fontSize: string
  lineHeight: number
  letterSpacing?: string
}

/** The resolved ramp for a mode — usable outside React, and what the hook
 *  returns. */
export function typeScale(mode: LayoutMode): Record<TypeStep, TypeStyle> {
  const out = {} as Record<TypeStep, TypeStyle>
  for (const step of Object.keys(RAMP) as TypeStep[]) {
    const r = RAMP[step]
    out[step] = { fontSize: r.size[mode], lineHeight: r.lh[mode], ...(r.ls ? { letterSpacing: r.ls } : null) }
  }
  return out
}

export default function useTypeScale(): Record<TypeStep, TypeStyle> {
  return typeScale(useLayoutMode())
}
