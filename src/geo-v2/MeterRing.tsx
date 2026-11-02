import { type CSSProperties } from 'react'

/**
 * One score, 0–100, as a small ring.
 *
 * NOT a part-to-whole chart. It said so by pointing at the crawl donut, which
 * has since been deleted — the audit samples five pages, and there was no
 * population for a donut to divide. Nothing draws a part-to-whole in this
 * report now, and this is still not one: it is the "how good is this single
 * number" glyph from the reference app table, and it is the only primitive in
 * this screen that the design system has no
 * equivalent for: `COMPONENTS.md` lists no chart/data-viz components, and the
 * `chart/*` tokens cover colour but not shape. Built here as a proposal
 * (mirrored in Figma as `Meter / Ring`) rather than improvised inline, so it
 * can move into the system unchanged if it earns its place.
 *
 * Colour comes from the status tokens, with one deliberate substitution: the
 * middle band draws in `chart/status/warning` rather than
 * `content/status-warning`. The content token is a text ink, and at ring
 * weight it reads as brown beside the green above it; the chart token is the
 * step the design system publishes for marks, and it is the same yellow the
 * report's check pips use, so a page cannot show two different warnings.
 *
 * The cost is measured, not overlooked. `content/status-warning` (#b06d00)
 * carries 4.2:1 against the card and clears WCAG 1.4.11's 3:1 for a graphical
 * object; `chart/status/warning` (#fbbf24) is 1.7:1 and does not. The arc is
 * never the only carrier of its value — the number inside the ring states it,
 * and every pip sits beside a written count — so nothing is conveyed by that
 * colour alone. Worth revisiting if the ring is ever used without its readout.
 *
 * `content/status-error` (#c50202) is left alone: it fails AA as *text*, which
 * is why the report overrides it for labels, but a stroke only needs 3:1 and
 * it clears that comfortably.
 *
 * The arc's resting state is the real value and the keyframe only declares
 * where it animates *from*, so a skipped, disabled or frozen animation shows
 * the correct ring rather than an empty one.
 *
 * It sweeps on load by default. An earlier version gated itself on
 * `useInView`, which is a JS cue in front of an entrance — the same mistake
 * the report page documents at its own motion block. The observer can fire
 * late (it did, by seconds, in an embedded pane), and a late cue on a
 * `backwards` animation means the delay has already elapsed and the sweep is
 * simply skipped: the ring pops in finished.
 *
 * `play` is the escape hatch that note called for, and it is shaped so the
 * old failure cannot come back. The meter still owns no observer; a caller
 * that wants a scroll cue holds it and passes the answer down. And `false`
 * means *no animation at all* rather than a paused or delayed one, so a cue
 * that never arrives leaves the finished ring on screen instead of an empty
 * one. The animation is added when the answer turns true, which is the moment
 * it should start from zero.
 */

const LEVELS = [
  { min: 60, token: 'var(--content-status-success)' },
  { min: 30, token: 'var(--chart-status-warning)' },
  { min: -Infinity, token: 'var(--content-status-error)' },
] as const

/** Constant across sizes by default, so the inline glyph never reads as a
 *  different component wherever it appears. Overridable for exactly one case:
 *  at display size the ring stops being a glyph beside a number and becomes
 *  the frame around one, and a 2.5 hairline at 100px reads as a stray circle
 *  rather than a meter. See `thickness`. */
const STROKE = 2.5
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export default function MeterRing({
  value,
  size = 16,
  thickness = STROKE,
  duration = 0.7,
  delay = 0,
  label,
  play = true,
}: {
  /** 0–100. */
  value: number
  size?: number
  /**
   * Stroke width. Leave it alone for the inline glyph — it is constant across
   * sizes on purpose. Set it only when the ring is drawn at display size and
   * has to carry a number inside it, where the ratio to the diameter is what
   * makes it read as a meter.
   */
  thickness?: number
  /** Seconds. A bigger arc has further to travel and wants longer. */
  duration?: number
  /** Seconds. Lets the ring wait for the card it sits in to arrive first. */
  delay?: number
  /** Screen-reader text; the visible number lives beside or inside the ring. */
  label?: string
  /**
   * Whether the sweep may run. Default true — the ring animates on load, as
   * everything above the fold should.
   *
   * Pass a scroll cue for a ring far enough down that its sweep would be over
   * before anyone reached it. False draws the finished ring with no animation,
   * so this can only ever delay the movement, never hide the value.
   */
  play?: boolean
}) {
  const stroke = LEVELS.find((l) => value >= l.min)!.token
  const c = size / 2
  const r = c - thickness / 2
  const circumference = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value)) / 100
  const arc = circumference * pct

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label ?? `${value}%`}
      style={{ display: 'block', flex: 'none' }}
    >
      <circle
        cx={c}
        cy={c}
        r={r}
        fill="none"
        stroke="var(--chart-grid-crosshair)"
        strokeWidth={thickness}
      />
      <circle
        cx={c}
        cy={c}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={thickness}
        /* One dash the whole way round, with a gap the same length behind
           it, and the offset decides how much of that dash falls on the
           path. That is what makes the arc *grow*: the visible length is the
           thing being animated.

           Sizing the dash to the arc instead (`arc, circumference - arc`)
           looks identical at rest and is wrong in motion — the segment is
           already full length at the first frame, so animating the offset
           slides a finished arc around the circle into position rather than
           drawing it. */
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={circumference - arc}
        transform={`rotate(-90 ${c} ${c})`}
        data-gr-motion=""
        style={
          play
            ? ({
                // A full offset is an empty ring; the resting offset is the
                // real value, so the arc sweeps from nothing to the score.
                '--gr-arc-from': `${circumference}px`,
                animation: `gr-arc ${duration}s ${EASE} ${delay}s both`,
              } as CSSProperties)
            : undefined
        }
      />
    </svg>
  )
}
