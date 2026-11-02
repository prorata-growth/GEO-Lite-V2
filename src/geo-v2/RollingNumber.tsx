import { useEffect, useId, useRef } from 'react'
import { motion, useSpring, useTransform, useVelocity } from 'framer-motion'

/**
 * An odometer number: each digit is a strip of 0–9 that rolls into place, with
 * motion blur scaled to how fast it's actually travelling.
 *
 * The blur is a real vertical-only Gaussian (an SVG filter with a zeroed x
 * deviation), not CSS `blur()`. An isotropic blur on a 24px glyph reads as
 * out-of-focus; smearing along the axis of travel is what reads as speed. It's
 * driven off the spring's own velocity rather than a fixed keyframe, so one
 * mechanism covers both cases for free: a full revolution on load smears hard,
 * a single-digit tick on the billing toggle barely blurs at all.
 *
 * The strip carries three copies of 0–9 so there's always a revolution of
 * runway on either side of the resting digit — that's what the load spin uses.
 */

/* ── the roll ───────────────────────────────────────────────── */
const REPEATS = 3
/** The resting digit lives in the middle copy, leaving a full turn each way. */
const BASE = 10
const SPRING = { stiffness: 90, damping: 20, mass: 1, restDelta: 0.0005 }

/* ── the blur ───────────────────────────────────────────────── */
/** Velocity is in cells/sec: ~25 on a load spin, ~2.5 on a one-digit tick. */
const BLUR_K = 0.2
const BLUR_MAX = 6

function Digit({ digit, height, delay }: { digit: number; height: number; delay: number }) {
  // useId gives colons, which are not valid in a url(#…) reference
  const filterId = `roll-${useId().replace(/:/g, '')}`
  const blurRef = useRef<SVGFEGaussianBlurElement>(null)

  // starts one full revolution short of the target, so mounting spins up
  const cell = useSpring(digit, SPRING)
  const y = useTransform(cell, (c) => -c * height)
  const velocity = useVelocity(cell)

  const first = useRef(true)
  useEffect(() => {
    // The ref is read, never written, before the timeout fires — so React's
    // double-invoked dev effect still gets the staggered entrance rather than
    // snapping straight to rest on the second pass.
    const wait = first.current ? delay * 1000 : 0
    const t = window.setTimeout(() => {
      cell.set(BASE + digit)
      first.current = false
    }, wait)
    return () => window.clearTimeout(t)
  }, [digit, delay, cell])

  useEffect(
    () =>
      velocity.on('change', (v) => {
        const sd = Math.min(Math.abs(v) * BLUR_K, BLUR_MAX)
        blurRef.current?.setAttribute('stdDeviation', `0 ${sd.toFixed(2)}`)
      }),
    [velocity],
  )

  return (
    <span
      aria-hidden
      style={{
        position: 'relative',
        display: 'inline-block',
        // clip-path, not overflow: overflow:hidden would move the inline-block's
        // baseline to its bottom edge and drop the digits off the line the "$"
        // and "once" sit on. The horizontal slack keeps a wide glyph from
        // catching the edge; the blur has no horizontal component to leak.
        clipPath: 'inset(0 -2px)',
      }}
    >
      {/* in-flow but unpainted: sets the column's width, height and baseline */}
      <span style={{ visibility: 'hidden' }}>0</span>

      <motion.span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          y,
          filter: `url(#${filterId})`,
        }}
      >
        {Array.from({ length: REPEATS * 10 }, (_, i) => (
          <span key={i} style={{ height, lineHeight: `${height}px` }}>
            {i % 10}
          </span>
        ))}
      </motion.span>

      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur ref={blurRef} stdDeviation="0 0" />
        </filter>
      </svg>
    </span>
  )
}

export default function RollingNumber({
  value,
  height,
  delay = 0,
}: {
  value: number
  /** One digit cell — the line box the number sits on. */
  height: number
  /** Seconds before the load spin starts. */
  delay?: number
}) {
  const digits = String(value).split('').map(Number)
  return (
    <>
      {/* the strips are aria-hidden, so give assistive tech the plain figure */}
      <span className="sr-only">{value}</span>
      {digits.map((d, i) => (
        <Digit key={i} digit={d} height={height} delay={delay + i * 0.06} />
      ))}
    </>
  )
}
