import GistNav from './GistNav'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../useIsMobile'
import FitBox from '../FitBox'
import EngineIcon from './EngineIcon'
import { GEO_ENGINES } from './geoEngines'
import { QUICK_SCAN_ENGINES } from './geoReportPageData'
import treadAvatar from '../assets/geo-v2/tread-avatar.png'

/**
 * The scan's loading sequence — Figma nodes 1587:17493 / 17692 / 17715 / 17739.
 *
 * Two layouts off the same sequence, so the animation has one source of truth:
 *   'stacked' — Figma 1591:17879. Content centred and stacked, reading order
 *               forced top-to-bottom. The default, and what the flow uses.
 *   'split'   — Figma 1587:17493 etc. Left column says what's happening, the card
 *               beside it shows it happening. Kept at #geoloadingsplit for
 *               reference; it survives shorter viewports better (422px of content
 *               vs 629px) if that ever becomes the deciding factor.
 *
 * Each stage's card content is its own block: the outgoing one fades and blurs
 * away, then the incoming one fades in. Deliberately not a shared-layout morph —
 * rows transforming into each other read as busier than simply changing subject.
 * Animation within a stage (the active bubble moving, responses being read, rank
 * bars resolving) still animates in place.
 *
 * The previous approach is kept intact at #geoloadingv1 (GeoLoadingScreenV1).
 */

const EASE = [0.16, 1, 0.3, 1] as const
/** Entrances can snap with EASE, but anything the eye is meant to *follow* —
 *  a bar sweeping out, a bubble becoming active — wants symmetric easing.
 *  EASE covers 85% of its travel in the first third, which reads as a jump. */
const CALM = 'easeInOut' as const

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/* ── stages ─────────────────────────────────────────────────── */
type Stage = 'asking' | 'repeating' | 'comparing'

const STAGE_COPY: Record<Stage, { word: string; sub: string | null }> = {
  // asking's sub-line names the engine currently running, so it's built inline
  //
  // Each word has to name the action its sub-line describes — that's the job
  // "Concocting" was doing before it got cut for being too fancy. Plain verbs
  // that still carry their weight: we're asking the engines, then asking again
  // to see how much the answer moves, then comparing what came back.
  asking: { word: 'Asking', sub: null },
  repeating: { word: 'Repeating', sub: 'Running same prompts multiple times for response variance' },
  comparing: { word: 'Comparing', sub: 'Analyzing results' },
}

/** The default set, for the scan this prototype's report is built on. A run
 *  for another brand passes its own — the header already names the topic, so
 *  shoe prompts under "related to Prebiotic soda" would read as a bug. */
const DEFAULT_PROMPTS = [
  'Best marathon racing shoes in 2026?',
  'Best carbon-plated shoes for a sub-3-hour marathon',
  'Nike vs Adidas marathon shoes',
  'Nike running shoes reviews',
]

/** Cycled in this order while the first stage runs. The free scan queries two
 *  engines, not all four — QUICK_SCAN_ENGINES is the single declaration of
 *  which, shared with the report's own filter. */
const ENGINES = QUICK_SCAN_ENGINES.map((key) => GEO_ENGINES.find((e) => e.key === key)!)

/* ── motion tuning ──────────────────────────────────────────────
   Paced so each stage is legible rather than glimpsed: the first stage runs
   4 prompts × 2 engines, then reading, then ranking. ~23s, then it hands
   off to the report screen. Engine count drives the first stage's length, so
   this shortened when the scan dropped from four engines to two.
   ──────────────────────────────────────────────────────────────── */
const INTRO_MS = 800 // card and first bubbles settling before anything moves
/** Deliberately longer than HIGHLIGHT_MS, so each question visibly *settles*
 *  before the next takes over instead of the highlight sliding continuously. */
const PROMPT_STEP_MS = 1000 // active bubble advancing one prompt
const RESPONSE_STEP_MS = 1700 // one response finishing being read
/** Beat on the fully-read state, so the last "Read" is actually seen before the
 *  card reorganises — without it, the third flip and the stage change collide. */
const READ_SETTLE_MS = 1200
const RANK_STEP_MS = 1300 // one rank bar resolving, with a beat before the next
/** A bar's own sweep — slightly shorter than its step, so each finishes before
 *  the next begins and the eye is led down the list one line at a time. */
const BAR_GROW_MS = 1100
const RANK_HOLD_MS = 1600 // beat on the finished ranking
/** Stage handover: the old content leaves before the new arrives, so the card
 *  reads as changing subject rather than rearranging itself. */
const STAGE_FADE_OUT_MS = 620
const STAGE_FADE_IN_MS = 780
const STAGE_HANDOVER_MS = STAGE_FADE_OUT_MS + STAGE_FADE_IN_MS
/** How long a bubble takes to become (or stop being) the active one. This was
 *  a `style` background, so it snapped instantly — tweened it is far calmer. */
const HIGHLIGHT_MS = 560
/** Reserved width for the "Reading.../Read" slot. Fixed, because the two strings
 *  differ in width and a shrink-to-fit slot reflowed the whole row on each flip. */
const TRAILING_W = 88
/** Slight stagger on the incoming rows — enough to feel alive, not a reshuffle. */
const ROW_STAGGER = 0.09

/* ── revised chrome — Figma 1859:21814 ─────────────────────────
   Beige page and a logo-only bar, matching the rest of the flow. The gradient
   bar beside the stage word is gone from this design, and the sub-line is
   #605d5d rather than the old grey. */
const PAGE_BG = 'var(--background-surface-page)'

/* No top bar on this screen — it's a forward-only step in the funnel. A bar
   here would offer exits at the moment we're asking for an answer, and the
   landing page (which does have one) is the place to navigate from. */
const SUB_COLOR = 'var(--content-secondary)'
/** Stage word: 32px, 0.64 tracking, per the design. */
const HEAD_PX = 32
const HEAD_TRACKING = '0.64px'
/** The card sits 32 below the text block. */
const BLOCK_TO_CARD = 32

/* Figma stacks disc → word → sub-line 16 apart, twice over. */
const DISC_TO_STAGE = 16
const STAGE_TO_SUB = 16

/* ── card geometry, from the design ─────────────────────────── */
const CARD_W = 608
const CARD_H = 422
const CARD_RADIUS = 16

const BUBBLE_W = 297.143
const BUBBLE_PAD = 12.698
const BUBBLE_RADIUS = 20.317
const BUBBLE_TEXT = 17.778
const BUBBLE_GAP = 10
const AVATAR = 46.24
const AVATAR_OVERLAP = -3.449
const CLUSTER_GAP = 10.159

/** Rank bar widths from the design, against the bubble's inner width. */
const BUBBLE_INNER = BUBBLE_W - BUBBLE_PAD * 2
const RANK_BAR_W = [BUBBLE_INNER, 192, 72]

/* ── left column ────────────────────────────────────────────── */
/**
 * The brand the scan is running for.
 *
 * This was a hard-coded Nike swoosh, so every run — Tread's, or any sample —
 * watched somebody else's logo being scanned. It is the one mark on the
 * screen and it was always the wrong one.
 *
 * Same treatment the brand shows elsewhere in the flow: the avatar filling a
 * round disc, `object-contain` for the logos that need fitting rather than
 * filling (`SampleBrand.contain`).
 */
function BrandDisc({ logo, name, contain }: { logo: string; name: string; contain?: boolean }) {
  return (
    <div className="relative size-10 overflow-hidden rounded-full border-[0.255px] border-[rgba(2,9,18,0.1)] bg-black">
      <img
        src={logo}
        alt={name}
        className={`size-full rounded-full ${contain ? 'object-contain p-1' : 'object-cover'}`}
      />
    </div>
  )
}

/* ── one row in the card ────────────────────────────────────── */
type Row = {
  key: string
  active: boolean
  text: string
  /** "Read" / "Reading..." on the right, during the checking stage. */
  trailing?: string
  /** Rank bar width, during the ranking stage. 0 until it resolves. */
  barWidth?: number
}

function BubbleRow({ row }: { row: Row }) {
  return (
    <motion.div
      data-card="row"
      data-active={row.active}
      variants={{
        hidden: { opacity: 0, y: 10, backgroundColor: row.active ? '#ffffff' : '#000000' },
        shown: {
          opacity: row.active ? 1 : 0.75,
          y: 0,
          backgroundColor: row.active ? '#ffffff' : '#000000',
        },
      }}
      transition={{ duration: HIGHLIGHT_MS / 1000, ease: CALM }}
      className="flex shrink-0 flex-col justify-center gap-1"
      style={{ width: BUBBLE_W, padding: BUBBLE_PAD, borderRadius: BUBBLE_RADIUS }}
    >
      <div className="flex w-full items-center" style={{ gap: BUBBLE_PAD }}>
        <motion.p
          className={`min-w-px flex-1 ${row.trailing || row.barWidth !== undefined ? 'italic' : ''}`}
          animate={{ color: row.active ? '#000000' : '#ffffff' }}
          transition={{ duration: HIGHLIGHT_MS / 1000, ease: CALM }}
          // also in `style` so the row is legible before framer's first tick —
          // the bubbles are fixed-colour artwork, they don't follow the theme
          style={{ color: row.active ? '#000000' : '#ffffff', fontSize: BUBBLE_TEXT, lineHeight: 1.4 }}
        >
          {row.text}
        </motion.p>

        {row.trailing && (
          // fixed-width slot: the text beside it keeps its measured width, so
          // "Reading..." → "Read" no longer nudges the row
          <div className="relative shrink-0" style={{ width: TRAILING_W, height: BUBBLE_TEXT * 1.4 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={row.trailing}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0 text-right whitespace-nowrap text-white italic"
                style={{ fontSize: BUBBLE_TEXT, lineHeight: 1.4 }}
              >
                {row.trailing}
              </motion.p>
            </AnimatePresence>
          </div>
        )}
      </div>

      {row.barWidth !== undefined && (
        <motion.div
          data-card="rank-bar"
          className="h-[2px] bg-[#d9d9d9]"
          initial={{ width: 0 }}
          animate={{ width: row.barWidth }}
          transition={{ duration: BAR_GROW_MS / 1000, ease: CALM }}
        />
      )}
    </motion.div>
  )
}

/* ── the card ───────────────────────────────────────────────── */
function ScanCard({ stage, engineIndex, rows }: { stage: Stage; engineIndex: number; rows: Row[] }) {
  const clustered = stage === 'comparing'

  return (
    <div
      data-card="frame"
      className="relative flex shrink-0 items-center justify-center overflow-hidden"
      style={{ width: CARD_W, height: CARD_H, borderRadius: CARD_RADIUS, backgroundColor: 'var(--brand-mint)' }}
    >
      {/* mode="wait": the outgoing stage clears out before the next arrives */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          data-card="content"
          className={`relative flex drop-shadow-[0px_10.159px_15.238px_rgba(0,0,0,0.25)] ${
            clustered ? 'flex-col items-start' : 'items-start'
          }`}
          style={{ gap: CLUSTER_GAP }}
          initial="hidden"
          animate="shown"
          exit="gone"
          variants={{
            hidden: { opacity: 0, filter: 'blur(6px)' },
            shown: {
              opacity: 1,
              filter: 'blur(0px)',
              transition: {
                duration: STAGE_FADE_IN_MS / 1000,
                ease: EASE,
                staggerChildren: ROW_STAGGER,
                delayChildren: 0.08,
              },
            },
            gone: {
              opacity: 0,
              filter: 'blur(6px)',
              transition: { duration: STAGE_FADE_OUT_MS / 1000, ease: EASE },
            },
          }}
        >
          <motion.div
            data-card="avatars"
            className="flex shrink-0 items-center"
            variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {(clustered ? ENGINES : [ENGINES[engineIndex]]).map((engine, i) => (
              <div
                key={engine.key}
                style={{ marginRight: clustered && i < ENGINES.length - 1 ? AVATAR_OVERLAP : 0 }}
              >
                <EngineIcon
                  icon={engine.icon}
                  iconFrame={engine.iconFrame}
                  size={AVATAR}
                  insetRatio={34.072 / AVATAR}
                />
              </div>
            ))}
          </motion.div>

          <div
            data-card="rows"
            className="flex flex-col items-start justify-center"
            style={{ gap: BUBBLE_GAP }}
          >
            {rows.map((row) => (
              <BubbleRow key={row.key} row={row} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ── screen ─────────────────────────────────────────────────── */
export default function GeoLoadingScreen({
  onDone,
  /** The topic they picked, named back during the asking stage — "across
   *  Marathon shoes" reads as their scan in a way "your topic" never did.
   *  Defaults to the one the report's own data is built on, so opening this
   *  screen directly still reads correctly. */
  topic = 'Marathon shoes',
  prompts: PROMPTS = DEFAULT_PROMPTS,
  /** The brand being scanned. Defaults to Tread, the brand this prototype's
   *  own report is built on, so opening the screen directly still reads as a
   *  real run rather than as somebody else's. */
  brandName = 'Tread',
  brandLogo = treadAvatar,
  brandContain = false,
}: {
  onDone?: () => void
  topic?: string
  prompts?: string[]
  brandName?: string
  brandLogo?: string
  brandContain?: boolean
} = {}) {
  const mobile = useIsMobile()
  const [stage, setStage] = useState<Stage>('asking')
  const [engineIndex, setEngineIndex] = useState(0)
  const [activePrompt, setActivePrompt] = useState(0)
  /** How many responses have finished being read, during the checking stage. */
  const [readCount, setReadCount] = useState(0)
  /** How many rank bars have resolved, during the ranking stage. */
  const [rankCount, setRankCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function run() {
      await sleep(INTRO_MS)

      // ── asking: the active prompt travels down, once per engine
      for (let e = 0; e < ENGINES.length; e++) {
        if (cancelled) return
        setEngineIndex(e)
        for (let p = 0; p < PROMPTS.length; p++) {
          if (cancelled) return
          setActivePrompt(p)
          await sleep(PROMPT_STEP_MS)
        }
      }

      // ── repeating: the same prompt, re-run and read
      if (cancelled) return
      setStage('repeating')
      await sleep(STAGE_HANDOVER_MS)
      for (let i = 1; i <= 3; i++) {
        if (cancelled) return
        await sleep(RESPONSE_STEP_MS)
        setReadCount(i)
      }
      await sleep(READ_SETTLE_MS)

      // ── comparing: the marks gather and the ranking resolves
      if (cancelled) return
      setStage('comparing')
      await sleep(STAGE_HANDOVER_MS)
      for (let i = 1; i <= 3; i++) {
        if (cancelled) return
        setRankCount(i)
        await sleep(RANK_STEP_MS)
      }
      await sleep(RANK_HOLD_MS)

      if (cancelled) return
      onDone?.()
    }

    run()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** The rows the card shows, keyed so they persist across stages. */
  const rows: Row[] =
    stage === 'asking'
      ? PROMPTS.map((text, i) => ({ key: `row${i}`, active: i === activePrompt, text }))
      : stage === 'repeating'
        ? [
            { key: 'row0', active: true, text: PROMPTS[0] },
            ...[1, 2, 3].map((i) => ({
              key: `row${i}`,
              active: false,
              text: `Response ${i}`,
              trailing: readCount >= i ? 'Read' : 'Reading...',
            })),
          ]
        : [1, 2, 3].map((i) => ({
            key: `row${i}`,
            active: false,
            text: `Rank ${i}`,
            barWidth: rankCount >= i ? RANK_BAR_W[i - 1] : 0,
          }))

  const copy = STAGE_COPY[stage]

  return (
    <div
      data-loading-screen="frame"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: PAGE_BG }}
    >
      {/* the same bar as every other screen, so it never drops out mid-flow */}
      <GistNav action="login" />
      <div
        data-loading-screen="row"
        className={`flex w-full flex-1 flex-col items-center justify-center ${
          mobile ? 'px-6 py-10' : 'min-h-0 px-[64px] py-10'
        }`}
        style={{ gap: BLOCK_TO_CARD }}
      >
        <div data-loading-screen="left" className="flex shrink-0 flex-col items-center text-center">
          <BrandDisc logo={brandLogo} name={brandName} contain={brandContain} />

          <div data-loading-screen="stage" className="flex items-center" style={{ marginTop: DISC_TO_STAGE }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={copy.word}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="font-medium whitespace-nowrap text-[var(--content-default)]"
                style={{
                  fontSize: mobile ? 24 : HEAD_PX,
                  letterSpacing: HEAD_TRACKING,
                  lineHeight: 1.4,
                }}
              >
                {copy.word}
              </motion.p>
            </AnimatePresence>
          </div>

          <div
            data-loading-screen="sub"
            className="mx-auto max-w-[520px]"
            style={{ marginTop: STAGE_TO_SUB }}
          >
            {stage === 'asking' ? (
              <p style={{ color: SUB_COLOR, fontSize: 18, lineHeight: 1.17 }}>
                <span>Running prompts in</span>{' '}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ENGINES[engineIndex].key}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="inline-block text-[var(--content-default)]"
                  >
                    {ENGINES[engineIndex].name}
                  </motion.span>
                </AnimatePresence>{' '}
                <span>related to {topic}</span>
              </p>
            ) : (
              <AnimatePresence mode="wait">
                <motion.p
                  key={copy.sub}
                  initial={{ opacity: 0, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ color: SUB_COLOR, fontSize: 18, lineHeight: 1.17 }}
                >
                  {copy.sub}
                </motion.p>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Scaled as a unit so the stage animations stay intact at any height.
            Sized to the card rather than flex-1: growing it would push the card
            to the bottom of the window and open a gap under the text block.
            It still shrinks — FitBox scales the card down — when space runs out. */}
        <div
          data-loading-screen="card"
          className="flex w-full min-h-0 shrink justify-center"
          style={{ height: CARD_H }}
        >
          <FitBox width={CARD_W} height={CARD_H}>
            <ScanCard stage={stage} engineIndex={engineIndex} rows={rows} />
          </FitBox>
        </div>
      </div>
    </div>
  )
}
