import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GEO_ENGINES, GEO_QUERY, type GeoEngine } from './geoEngines'
import EngineIcon from './EngineIcon'
import typingDots from '../assets/geo-engines/typing-dots.svg'

/* ────────────────────────────────────────────────────────────────
   Motion tuning — everything timing-related lives here.
   ──────────────────────────────────────────────────────────────── */
const QUERY_START_MS = 260 // beat before the query starts typing
const QUERY_TYPE_MS = 21 // per character
const QUERY_SETTLE_MS = 300 // pause after the query lands, before the first answer
const GENERATE_MS = 620 // typing-dots beat: old answer clears, dots pulse, new answer lands
const DWELL_MS = 4600 // how long a finished answer is held before autoplay advances

const EASE = [0.16, 1, 0.3, 1] as const
const ANSWER_EXIT = 0.18
const HEADLINE_IN = 0.34
const CARD_IN = 0.42
const CARD_STAGGER = 0.075

/** Card is a fixed 582×640 in Figma — holding that size keeps it from
 *  resizing as answers of different lengths swap in and out. */
const CARD_W = 582
const CARD_H = 640
const DEFAULT_TILE_GAP = 8

/**
 * Figma renders Haffer's "auto" line-height at ~1.18×, while the browser's
 * `line-height: normal` for the same face lands nearer 1.5×. Pinning the
 * Figma value keeps every text block the height the design expects.
 */
const FIGMA_LEADING = 1.18

type Phase = 'query' | 'generating' | 'settled'

/* ────────────────────────────────────────────────────────────────
   Product tile
   ──────────────────────────────────────────────────────────────── */
function ProductTile({ engine, index }: { engine: GeoEngine; index: number }) {
  const product = engine.products[index]
  const labelOnly = engine.cardStyle === 'labelOnly'
  const { titleLeading, descLeading, tileGap = DEFAULT_TILE_GAP } = engine.metrics ?? {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: CARD_IN, delay: index * CARD_STAGGER, ease: EASE }}
      data-geo="tile"
      className="flex w-[162px] shrink-0 flex-col items-start"
      style={labelOnly ? undefined : { gap: tileGap }}
    >
      <div data-geo="tile-image" className="size-[162px] shrink-0 overflow-hidden rounded-[16px]">
        <img src={product.image} alt="" className="h-full w-full object-cover" />
      </div>

      {labelOnly ? (
        <p
          data-geo="tile-title"
          className="w-full pt-2 text-[16px] font-medium text-white"
          style={{ lineHeight: titleLeading ?? FIGMA_LEADING }}
        >
          {product.title}
        </p>
      ) : (
        <>
          <p
            data-geo="tile-title"
            className="w-full text-[16px] font-medium text-white"
            style={{ lineHeight: titleLeading ?? FIGMA_LEADING }}
          >
            {product.title}
          </p>
          {product.description && (
            <p
              data-geo="tile-desc"
              className="w-full text-[14px] text-[#8b8b8b]"
              style={{ lineHeight: descLeading ?? FIGMA_LEADING }}
            >
              {product.description}
            </p>
          )}
        </>
      )}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────
   Card
   ──────────────────────────────────────────────────────────────── */
export default function GeoAnswerCard({ autoplay = true }: { autoplay?: boolean } = {}) {
  const [engineIndex, setEngineIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('query')
  const [typed, setTyped] = useState('')
  const [autoplayStopped, setAutoplayStopped] = useState(!autoplay)

  const engine = GEO_ENGINES[engineIndex]

  // Type the query once, on first mount only. It stays put from then on.
  useEffect(() => {
    let i = 0
    let id: number
    function step() {
      i++
      setTyped(GEO_QUERY.slice(0, i))
      if (i < GEO_QUERY.length) id = window.setTimeout(step, QUERY_TYPE_MS)
      else id = window.setTimeout(() => setPhase('generating'), QUERY_SETTLE_MS)
    }
    id = window.setTimeout(step, QUERY_START_MS)
    return () => window.clearTimeout(id)
  }, [])

  // Hold the dots for a beat, then reveal the answer.
  useEffect(() => {
    if (phase !== 'generating') return
    const id = window.setTimeout(() => setPhase('settled'), GENERATE_MS)
    return () => window.clearTimeout(id)
  }, [phase, engineIndex])

  // Autoplay through the engines until the viewer takes over.
  useEffect(() => {
    if (phase !== 'settled' || autoplayStopped) return
    const id = window.setTimeout(() => {
      setEngineIndex((i) => (i + 1) % GEO_ENGINES.length)
      setPhase('generating')
    }, DWELL_MS)
    return () => window.clearTimeout(id)
  }, [phase, autoplayStopped, engineIndex])

  function selectEngine(index: number) {
    setAutoplayStopped(true) // first interaction hands control over for good
    if (index === engineIndex) return
    setEngineIndex(index)
    setPhase('generating')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ width: CARD_W, height: CARD_H }}
      className="flex flex-col items-end gap-8 overflow-clip rounded-[29.205px] bg-[#161616] p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.2)]"
    >
      {/* engine switcher */}
      <div className="flex w-full items-start">
        <div data-geo="pill" className="flex items-center gap-2 rounded-[16px] bg-white/5 p-2">
          {GEO_ENGINES.map((e, i) => {
            const active = i === engineIndex
            return (
              <button
                key={e.key}
                type="button"
                onClick={() => selectEngine(i)}
                aria-label={e.name}
                aria-pressed={active}
                className={`relative flex size-12 items-center justify-center rounded-[8px] p-1 transition-opacity duration-300 ${
                  active ? 'opacity-100' : 'opacity-25 hover:opacity-60'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="geoEngineHighlight"
                    className="absolute inset-0 rounded-[8px] bg-white/10"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <div className="relative z-10">
                  <EngineIcon icon={e.icon} iconFrame={e.iconFrame} size={40} />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* the query — types once, then holds */}
      <div
        data-geo="bubble"
        className="flex items-center justify-center rounded-[52px] bg-white/5 p-[19.47px]"
      >
        <p className="text-[19.47px] whitespace-nowrap text-white" style={{ lineHeight: FIGMA_LEADING }}>
          {typed}
        </p>
      </div>

      {/* the answer */}
      <div className="flex w-full flex-col items-start gap-4">
        <AnimatePresence>
          {phase !== 'query' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              data-geo="avatar-row"
              className="flex items-end"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={engine.key}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.82 }}
                  transition={{ duration: 0.24, ease: EASE }}
                >
                  <EngineIcon icon={engine.icon} iconFrame={engine.iconFrame} size={40} />
                </motion.div>
              </AnimatePresence>
              <motion.img
                src={typingDots}
                alt=""
                className="h-[4px] w-[20px]"
                animate={phase === 'generating' ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
                transition={
                  phase === 'generating'
                    ? { duration: 0.85, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.3, ease: EASE }
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase === 'settled' && (
            <motion.div
              key={engine.key}
              exit={{ opacity: 0, y: -6, transition: { duration: ANSWER_EXIT, ease: EASE } }}
              className="flex w-full flex-col items-start gap-4"
            >
              <motion.p
                initial={{ opacity: 0, y: 8, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: HEADLINE_IN, ease: EASE }}
                style={{ lineHeight: engine.metrics?.headlineLeading ?? FIGMA_LEADING }}
                data-geo="headline"
                className="w-full text-[19.47px] text-white"
              >
                {engine.headline}
              </motion.p>

              {/* Always top-aligned. The label-only style used to stretch its
                  tiles and push each caption to the bottom, so a two-line
                  title sat a line lower than the three-line ones beside it and
                  the row read as misaligned. Captions now all start directly
                  under the image, which is the same edge every tile shares. */}
              <div data-geo="cards" className="flex w-full items-start gap-4">
                {engine.products.map((p, i) => (
                  <ProductTile key={`${engine.key}-${i}-${p.title}`} engine={engine} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
