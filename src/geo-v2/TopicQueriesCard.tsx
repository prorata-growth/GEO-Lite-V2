import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EngineIcon from './EngineIcon'
import { GEO_ENGINES } from './geoEngines'
import spinnerTrack from '../assets/topic-card/spinner-track.svg'
import spinnerHead from '../assets/topic-card/spinner-head.svg'

/**
 * #F4F2EA — the beige the design system uses for a committed selection
 * (`background/interactive-selected`), taken as a literal rather than the
 * token on purpose: this pill sits against fixed-colour artwork, so the value
 * must not flip with the theme the way the token does.
 */
const BEIGE = '#F4F2EA'

/**
 * "Your topic shapes the queries we run" — Figma node 1859:21683.
 *
 * Same shell as the brand-lookup card: a 472×498 frame with an 11px border/default
 * border drawn *outside* it, so the footprint is 492×518 (hence content-box) and
 * the border radius carries +10 to leave the content at the design's 16px.
 *
 * Figma's pb-16 on the frame is omitted: with content-box it would add to the
 * 498 rather than sit inside it, and the content stops short of the bottom edge
 * regardless.
 *
 * Beat order:  overlay pulses from frame one  →  topic types  →  the pulse eases
 *              out as "Running queries..." and the bouncing engine wave arrive
 *              →  the three-slot query stack rotates forever
 */

/* ── card shell ─────────────────────────────────────────────── */
const CARD_W = 472
const CARD_H = 498
const CARD_BORDER = 11
const CARD_RADIUS = 16

/** Top of the photo area = height of the white header block, same as the
 *  brand card's. The gradient overlay covers everything below it. */
const PHOTO_TOP = 205

/** Figma renders Haffer's "auto" leading at ~1.18×; the browser's `normal` is ~1.5×. */
const FIGMA_LEADING = 1.18

/* ── motion tuning ──────────────────────────────────────────── */
const TOPIC_TYPE_START_MS = 320 // beat before the topic starts typing
const TOPIC_TYPE_MS = 34 // per character
const GLOW_PULSE_MS = 1400 // one breath of the "generating" overlay
const GLOW_HOLD_MS = 1100 // beat after the topic lands
const GLOW_FADE_MS = 520 // overlay easing out as the queries arrive
const WAVE_SETTLE_MS = 900 // the logo wave finding its rhythm before the stack
const ROTATE_MS = 2000 // how long a query spins in the active slot
/** The active row is checked off where it stands, and holds there before it
 *  climbs — so completion reads as a result, not as a side effect of moving. */
const CHECK_HOLD_MS = 520

const EASE = [0.16, 1, 0.3, 1] as const

const TOPIC = 'Marathon shoes'

/** Cycled indefinitely — the card never "finishes", it just keeps scanning. */
const QUERIES = [
  'Best marathon racing shoes in 2026?',
  'Carbon-plated shoes for a marathon?',
  'Nike vs. Adidas marathon shoes',
  'Fastest shoes for a sub-3 marathon',
  'Best racing flats for race day',
  'Are super shoes worth the price?',
  'Top marathon shoes for wide feet',
]

/* ── engine cluster ─────────────────────────────────────────────
   Uses this flow's own engine marks (same as the answer and brand cards)
   rather than the older snapshot avatars — those carry a 2px white ring, a
   different Perplexity mark, and an AI Overviews file with transparent
   padding that leaves a gap inside the circle.

   Figma's four avatars sit at y 0 / -7.45 / -3.5 / 0, which is a frozen
   frame of this same relay bounce — so the offsets come from the animation,
   not from static positions.
   ──────────────────────────────────────────────────────────────── */
const CLUSTER = ['chatgpt', 'perplexity', 'claude', 'ai-overviews'].map((key) =>
  GEO_ENGINES.find((e) => e.key === key)!,
)
const AVATAR = 29.692
const AVATAR_GAP = 2
/** Scaled from the relay wave's -11 at 38px. */
const BOUNCE_Y = -9
const BOUNCE_DURATION = 0.8
const BOUNCE_GAP = 0.45
const BOUNCE_STEP = 0.15
const POP_START = 0.2
const POP_STEP = 0.18

/** Gap between the white header and the queries. 24 rather than the 40 it was:
 *  the stack is ~206 tall once all three rows are in, so 40 pushed the last row
 *  to within 14px of the card's bottom edge while leaving a bare band of photo
 *  under the header. */
const STACK_GAP = 24

/** Three slots visible at once: done on top, active in the middle, queued below.
 *  Fixed row geometry keeps the stack from reflowing as rows swap. */
const ROW_H = 40
const ROW_GAP = 16
const STACK_H = ROW_H * 3 + ROW_GAP * 2

const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

/** The relay bounce: each mark pops in, then rides a looping wave one step
 *  behind the one before it. */
function EngineWave() {
  return (
    <div
      className="flex items-end drop-shadow-[0px_8.348px_7.898px_rgba(0,0,0,0.15)]"
      style={{ gap: AVATAR_GAP, height: AVATAR - BOUNCE_Y }}
    >
      {CLUSTER.map((engine, i) => (
        <motion.div
          key={engine.key}
          initial={{ opacity: 0, scale: 0.4, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, BOUNCE_Y, 0] }}
          transition={{
            opacity: { duration: 0.3, delay: POP_START + i * POP_STEP },
            scale: { type: 'spring', stiffness: 300, damping: 15, delay: POP_START + i * POP_STEP },
            y: {
              duration: BOUNCE_DURATION,
              repeat: Infinity,
              repeatDelay: BOUNCE_GAP,
              ease: 'easeInOut',
              delay: POP_START + CLUSTER.length * POP_STEP + i * BOUNCE_STEP,
            },
          }}
        >
          <EngineIcon
            icon={engine.icon}
            iconFrame={engine.iconFrame}
            size={AVATAR}
            insetRatio={21.878 / AVATAR}
          />
        </motion.div>
      ))}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────
   Row status marks. All three occupy the same 24px box so the query
   text starts on the same x in every slot.
   ──────────────────────────────────────────────────────────────── */
function Spinner() {
  return (
    <div className="relative size-6 shrink-0 animate-[spin_0.9s_linear_infinite]">
      <img src={spinnerTrack} alt="" className="absolute inset-0 size-full max-w-none" />
      <div className="absolute top-1/2 right-[0.23%] bottom-[0.23%] left-1/2">
        <img src={spinnerHead} alt="" className="block size-full max-w-none" />
      </div>
    </div>
  )
}

/** Queued: the spinner's ring, held still and dimmed. */
function QueuedDot() {
  return (
    <div className="relative size-6 shrink-0">
      <img src={spinnerTrack} alt="" className="absolute inset-0 size-full max-w-none opacity-40" />
    </div>
  )
}

/** Drawn inline rather than using Figma's export: as vector it crossfades with
 *  the spinner cleanly, with no image decode and no colour baked in. */
function CheckMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#0a0a0a" />
      <path
        d="M7 12.4L10.4 15.8L17 9"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StatusMark({ slot, checked }: { slot: 0 | 1 | 2; checked: boolean }) {
  if (slot === 2) return <QueuedDot />
  // The top row is always done. The active row flips to done in place, and the
  // spinner hands over to the check with a small pop so the moment registers.
  const done = slot === 0 || checked
  return (
    <div className="relative size-6 shrink-0">
      {/* no mode="wait" — the two overlap, so it reads as one mark resolving
          into another rather than a swap */}
      <AnimatePresence initial={false}>
        {done ? (
          <motion.div
            key="check"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <CheckMark />
          </motion.div>
        ) : (
          <motion.div
            key="spin"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────
   Card
   ──────────────────────────────────────────────────────────────── */
export default function TopicQueriesCard() {
  const [typed, setTyped] = useState('')
  // Pulsing from the very first frame — the card reads as "working" straight away.
  const [glowing, setGlowing] = useState(true)
  const [showWave, setShowWave] = useState(false)
  const [showStack, setShowStack] = useState(false)
  /** Sequence number of the row currently in the top (done) slot. Monotonic, so
   *  React keys stay unique however long the loop runs. */
  const [head, setHead] = useState(0)
  /** True while the active row has been checked off but hasn't climbed yet. */
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function run() {
      await sleep(TOPIC_TYPE_START_MS)
      for (let i = 1; i <= TOPIC.length; i++) {
        if (cancelled) return
        setTyped(TOPIC.slice(0, i))
        await sleep(TOPIC_TYPE_MS)
      }

      if (cancelled) return
      await sleep(GLOW_HOLD_MS)
      if (cancelled) return

      setGlowing(false) // overlay eases out as the queries arrive
      setShowWave(true)
      await sleep(WAVE_SETTLE_MS)
      if (cancelled) return

      setShowStack(true)

      // forever: spin → check in place → hold → climb
      for (;;) {
        await sleep(ROTATE_MS)
        if (cancelled) return
        setChecked(true)
        await sleep(CHECK_HOLD_MS)
        if (cancelled) return
        setHead((h) => h + 1)
        setChecked(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      data-topic="card"
      style={{
        width: CARD_W,
        height: CARD_H,
        borderWidth: CARD_BORDER,
        boxSizing: 'content-box',
        gap: STACK_GAP,
        // +border so the inner content lands on the design's 16px
        borderRadius: CARD_RADIUS + CARD_BORDER,
      }}
      className="relative flex flex-col items-center overflow-hidden border-solid border-[var(--border-interactive-strong)]"
    >
      {/* Rounded explicitly: the border sits outside the content box, so the
          card's own clip would otherwise leave the photo under-rounded. */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ borderRadius: CARD_RADIUS, backgroundColor: 'var(--brand-mint)' }}
      >
        {/* "generating" overlay — breathing in place over the photo area */}
        <motion.div
          aria-hidden
          data-topic="glow"
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

      {/* header — the topic being typed in */}
      <div
        data-topic="head"
        className="relative flex w-full flex-col items-start gap-10 bg-white p-8"
        style={{ borderTopLeftRadius: CARD_RADIUS, borderTopRightRadius: CARD_RADIUS }}
      >
        <p
          className="w-full text-[24px] font-medium text-[#0a0a0a]"
          style={{ lineHeight: 'normal', letterSpacing: '0.48px' }}
        >
          Your topic shapes the queries
          <br />
          we run
        </p>

        <div className="flex w-full flex-col items-start gap-[12.169px] rounded-[52px] px-2 pt-2">
          <p
            className="text-[14px] font-medium whitespace-nowrap text-[#0a0a0a]"
            style={{ lineHeight: FIGMA_LEADING }}
          >
            e.g. topic
          </p>
          <div
            data-topic="pill"
            className="flex items-center justify-center rounded-[33px] py-2 pr-2 pl-[10px]"
            style={{ backgroundColor: BEIGE }}
          >
            <p className="text-[19.47px] whitespace-nowrap text-black" style={{ lineHeight: FIGMA_LEADING }}>
              {/* nbsp, not a plain space: a collapsible space gives the empty pill
                  no line box, so the header would jump a line once typing starts */}
              {typed || ' '}
            </p>
          </div>
        </div>
      </div>

      {/* the queries being run */}
      <div data-topic="body" className="relative flex w-full flex-col items-start gap-6">
        <AnimatePresence>
          {showWave && (
            <motion.div
              data-topic="wave-row"
              className="flex w-full items-end justify-between px-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <p
                className="text-[16px] font-medium whitespace-nowrap text-black italic"
                style={{ lineHeight: FIGMA_LEADING }}
              >
                Running queries...
              </p>

              <div data-topic="cluster">
                <EngineWave />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Three slots. Each row keeps its identity as it climbs, so the shift up
            is a layout animation rather than a re-render — the done row exits off
            the top while a fresh query enters at the bottom. */}
        <div
          data-topic="queries"
          className="relative w-full overflow-hidden px-8"
          style={{ height: STACK_H }}
        >
          <AnimatePresence initial={false}>
            {showStack &&
              ([0, 1, 2] as const).map((slot) => {
                const seq = head + slot
                const text = QUERIES[seq % QUERIES.length]
                const active = slot === 1
                return (
                  <motion.div
                    key={seq}
                    data-topic="query"
                    data-slot={slot}
                    className="absolute right-8 left-8"
                    style={{ height: ROW_H }}
                    initial={{ opacity: 0, y: STACK_H - ROW_H + 12 }}
                    animate={{
                      opacity: active ? 1 : 0.5,
                      y: slot * (ROW_H + ROW_GAP),
                    }}
                    exit={{ opacity: 0, y: -ROW_H - 8 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <div
                      className={`flex h-full items-center gap-[10px] rounded-[33px] px-4 ${
                        active ? 'bg-white' : 'bg-[#f4f4f4]'
                      }`}
                    >
                      <StatusMark slot={slot} checked={checked} />
                      <p
                        className="min-w-px flex-1 truncate text-[19.47px] text-black"
                        style={{ lineHeight: FIGMA_LEADING }}
                      >
                        {text}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
