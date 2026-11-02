import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, animate, type MotionValue } from 'framer-motion'
import EngineIcon from './EngineIcon'
import { BRAND_RESPONSES, EXAMPLE_BRAND, type BrandResponse } from './brandCardResponses'

/**
 * #F4F2EA — the beige the design system uses for a committed selection
 * (`background/interactive-selected`), taken as a literal rather than the
 * token on purpose: this pill sits against fixed-colour artwork, so the value
 * must not flip with the theme the way the token does.
 */
const BEIGE = '#F4F2EA'

/* ────────────────────────────────────────────────────────────────
   Motion tuning — the whole sequence lives here.

   Beat order:  overlay pulses from frame one  →  brand types  →
                answers slide in from the right and then drift forever  →
                each brand mention highlights the moment the words come into view
   ──────────────────────────────────────────────────────────────── */
const BRAND_TYPE_START_MS = 320 // beat before the example brand starts typing
const BRAND_TYPE_MS = 34 // per character
const GLOW_PULSE_MS = 1400 // one breath of the "generating" overlay
const GLOW_HOLD_MS = 1100 // beat after the brand lands before the answers arrive
const GLOW_FADE_MS = 520 // overlay easing out as the answers slide in
const MARQUEE_INTRO_MS = 900 // first answers sliding in from the right
const HIGHLIGHT_ARM_MS = 260 // beat after the slide lands before anything highlights
const HIGHLIGHT_STAGGER_MS = 620 // gap between one answer highlighting and the next
const MARQUEE_SPEED_PX_S = 42 // ongoing drift speed
const HIGHLIGHT_SPRING = { stiffness: 200, damping: 30, restDelta: 0.001 }

const EASE = [0.16, 1, 0.3, 1] as const

/** Figma frame is 472×498 of *content*, with the 11px border/default frame drawn
 *  outside it — so the card's total footprint is 492×518. Hence content-box.
 *  The border radius is set on the border box, so it carries +10 to leave the
 *  content box (and therefore the photo and header) at the design's 16px. */
const CARD_W = 472
const CARD_H = 498
const CARD_BORDER = 11
const CARD_RADIUS = 16
const ROW_INSET = 32 // where the first answer rests, matching the frame

/** Top of the photo area = height of the white header block. The Figma overlay
 *  (node 1577:9163) sits at exactly this offset, 293px tall, full width. */
const PHOTO_TOP = 205

const BUBBLE_GAP = 40
const BUBBLE_W = 234
const BUBBLE_PITCH = BUBBLE_W + BUBBLE_GAP

/** The list is rendered twice; translating by exactly one copy's pitch makes
 *  the loop seamless, and makes every answer's position computable. */
const TRACK_W = BRAND_RESPONSES.length * BUBBLE_PITCH

/** Released once the answer is fully off the left edge, so the un-wipe is never seen. */
const LEAVE_X = -BUBBLE_W - 6

/** Figma renders Haffer's "auto" leading at ~1.18×; the browser's `normal` is ~1.5×. */
const FIGMA_LEADING = 1.18

const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

/* ────────────────────────────────────────────────────────────────
   One response bubble.

   The highlight is derived straight from the track's x position as a
   motion value — no React state, no timers. Positions are folded onto
   one cycle so an answer and its off-screen twin always agree, which is
   what keeps the marquee's loop seam from re-wiping a highlight that
   is already on screen.

   It fires as soon as the brand phrase itself is fully in view, which is
   measured per answer — "Counter Culture," sits at a different point in
   each paragraph, so a single bubble-level threshold would make some
   answers highlight long after the words were readable.
   ──────────────────────────────────────────────────────────────── */
function ResponseBubble({
  response,
  trackX,
  armedCount,
  index,
  offset,
}: {
  response: BrandResponse
  trackX: MotionValue<number>
  /** How many answers are cleared to highlight so far. Ramps up one at a time
   *  so the first two — which land on screen together — still wipe in turn
   *  rather than simultaneously. */
  armedCount: MotionValue<number>
  /** Position in the list, shared with this answer's twin in the second copy. */
  index: number
  /** This answer's distance from the start of the track. */
  offset: number
}) {
  const bubbleRef = useRef<HTMLDivElement>(null)
  const phraseRef = useRef<HTMLSpanElement>(null)
  /** Right edge of the brand phrase, relative to the answer's left edge.
   *  Defaults to the full width until measured. */
  const phraseRight = useRef(BUBBLE_W)

  useLayoutEffect(() => {
    let cancelled = false
    function measure() {
      const bubble = bubbleRef.current
      const phrase = phraseRef.current
      if (cancelled || !bubble || !phrase) return
      phraseRight.current = phrase.getBoundingClientRect().right - bubble.getBoundingClientRect().left
    }
    measure()
    // text metrics shift once Haffer swaps in, so measure again after it loads
    document.fonts?.ready.then(measure)
    return () => {
      cancelled = true
    }
  }, [])

  const target = useTransform([trackX, armedCount], ([x, cleared]: number[]): number => {
    if (index >= cleared) return 0
    const raw = x + offset
    const wrapped = ((((raw - CARD_W) % TRACK_W) + TRACK_W) % TRACK_W) + CARD_W - TRACK_W
    const phraseInView = wrapped + phraseRight.current <= CARD_W
    return phraseInView && wrapped > LEAVE_X ? 1 : 0
  })
  const scaleX = useSpring(target, HIGHLIGHT_SPRING)

  return (
    <div
      ref={bubbleRef}
      data-brand="bubble"
      className="flex shrink-0 flex-col items-start gap-2 drop-shadow-[0px_8px_12px_rgba(0,0,0,0.25)]"
    >
      <EngineIcon icon={response.icon} iconFrame={response.iconFrame} size={38} insetRatio={28 / 38} />
      <div style={{ width: BUBBLE_W }} className="rounded-[16px] bg-white p-[10px]">
        <p className="text-[14px] text-[#6b6b6b]" style={{ lineHeight: 1.4 }}>
          {response.before}
          <span ref={phraseRef} className="relative inline-block whitespace-nowrap text-black">
            <motion.span
              aria-hidden
              data-brand="highlight"
              className="absolute inset-0 -mx-[2px] origin-left bg-[#bddec3]"
              style={{ scaleX }}
            />
            <span className="relative">{response.brand}</span>
          </span>
          {response.after}
        </p>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────
   Card
   ──────────────────────────────────────────────────────────────── */
export default function BrandLookupCard() {
  const [typed, setTyped] = useState('')
  // Pulsing from the very first frame — the card reads as "working" straight away.
  const [glowing, setGlowing] = useState(true)

  const trackX = useMotionValue(CARD_W)
  /** Nothing is cleared to highlight through the intro slide, so answers
   *  arrive as plain text. Then it ramps up one at a time, so the first two —
   *  which are both on screen once the slide lands — wipe in turn. */
  const armedCount = useMotionValue(0)

  // Runs once: type the brand, hold the pulse, then launch the marquee.
  useEffect(() => {
    let cancelled = false

    async function run() {
      await sleep(BRAND_TYPE_START_MS)
      for (let i = 1; i <= EXAMPLE_BRAND.length; i++) {
        if (cancelled) return
        setTyped(EXAMPLE_BRAND.slice(0, i))
        await sleep(BRAND_TYPE_MS)
      }

      if (cancelled) return
      await sleep(GLOW_HOLD_MS)
      if (cancelled) return

      setGlowing(false) // overlay eases out as the answers slide in
      animate(trackX, ROW_INSET, { duration: MARQUEE_INTRO_MS / 1000, ease: EASE })
      await sleep(MARQUEE_INTRO_MS)
      if (cancelled) return

      animate(trackX, ROW_INSET - TRACK_W, {
        duration: TRACK_W / MARQUEE_SPEED_PX_S,
        ease: 'linear',
        repeat: Infinity,
      })

      // now that the answers have settled, clear them to highlight one by one
      await sleep(HIGHLIGHT_ARM_MS)
      for (let i = 1; i <= BRAND_RESPONSES.length; i++) {
        if (cancelled) return
        armedCount.set(i)
        await sleep(HIGHLIGHT_STAGGER_MS)
      }
    }

    run()
    return () => {
      cancelled = true
      trackX.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** Two copies of the list, each answer told where it sits on the track. */
  const copies = [0, 1].map((copy) => (
    <div
      key={copy}
      className="flex shrink-0 items-start"
      style={{ gap: BUBBLE_GAP }}
      aria-hidden={copy === 1}
    >
      {BRAND_RESPONSES.map((r, i) => (
        <ResponseBubble
          key={r.engineKey}
          response={r}
          trackX={trackX}
          armedCount={armedCount}
          index={i}
          offset={copy * TRACK_W + i * BUBBLE_PITCH}
        />
      ))}
    </div>
  ))

  return (
    <div
      data-brand="card"
      style={{
        width: CARD_W,
        height: CARD_H,
        borderWidth: CARD_BORDER,
        boxSizing: 'content-box',
        // +border so the inner content lands on the design's 16px
        borderRadius: CARD_RADIUS + CARD_BORDER,
      }}
      className="relative flex flex-col items-center gap-10 overflow-hidden border-[var(--border-interactive-strong)] border-solid"
    >
      {/* The photo ground is out of the prototype for now. `brand/mint` — a decorative ground, which is
          brand-expression territory rather than functional UI. Rounded explicitly: the border sits outside the content box, so
          the card's own clip would otherwise leave it under-rounded. */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          borderRadius: CARD_RADIUS,
          backgroundColor: 'var(--brand-mint)',
        }}
      >
        {/* "generating" overlay — the gradient from Figma 1577:9163, breathing
            in place over the whole photo area rather than travelling */}
        <motion.div
          aria-hidden
          data-brand="glow"
          className="absolute left-0 w-full"
          style={{
            top: PHOTO_TOP,
            height: CARD_H - PHOTO_TOP,
            backgroundImage:
              'linear-gradient(135deg, rgba(255,255,255,0.8) 11.649%, rgba(255,255,255,0) 88.351%)',
          }}
          initial={{ opacity: 0.4 }}
          animate={glowing ? { opacity: [0.4, 1, 0.4] } : { opacity: 0 }}
          transition={
            glowing
              ? { duration: GLOW_PULSE_MS / 1000, repeat: Infinity, ease: 'easeInOut' }
              : { duration: GLOW_FADE_MS / 1000, ease: EASE }
          }
        />
      </div>

      {/* headline + example brand */}
      <div
        data-brand="head"
        className="relative flex w-full flex-col items-start gap-10 bg-white p-8"
        style={{ borderTopLeftRadius: CARD_RADIUS, borderTopRightRadius: CARD_RADIUS }}
      >
        <p
          className="w-full text-[24px] font-medium text-[#0a0a0a]"
          style={{ lineHeight: 'normal', letterSpacing: '0.48px' }}
        >
          We&rsquo;ll see how you&rsquo;re showing up
          <br />
          in AI answers
        </p>

        <div className="flex w-full flex-col items-start gap-[12.169px] rounded-[52px] px-2 pt-2">
          <p
            className="text-[14px] font-medium whitespace-nowrap text-[#9d9d9d]"
            style={{ lineHeight: FIGMA_LEADING }}
          >
            e.g. brand
          </p>
          <div data-brand="pill" className="flex items-center justify-center rounded-[33px] p-2" style={{ backgroundColor: BEIGE }}>
            <p className="text-[18px] whitespace-nowrap text-black" style={{ lineHeight: FIGMA_LEADING }}>
              {/* nbsp, not a plain space: a collapsible space gives the empty pill
                  no line box, so the header would jump a line once typing starts */}
              {typed || ' '}
            </p>
          </div>
        </div>
      </div>

      {/* the AI answers */}
      <div data-brand="marquee" className="relative w-full overflow-hidden pb-6">
        <motion.div className="flex items-start" style={{ gap: BUBBLE_GAP, x: trackX }}>
          {copies}
        </motion.div>
      </div>
    </div>
  )
}
