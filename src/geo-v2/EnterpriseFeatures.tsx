import type { CSSProperties, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check } from '@phosphor-icons/react'
import useTypeScale from './typeScale'
import useLayoutMode from './useLayoutMode'
import EngineIcon from './EngineIcon'
import FitBox from '../FitBox'
import { GEO_ENGINES } from './geoEngines'

/**
 * Enterprise — "Win new customers with Gist GEO": a heading beside its lede,
 * then three cards that walk the loop the product runs — see where you stand,
 * see why, act on it. Each card shows a slice of the product as live markup,
 * cropped by the card and faded at the foot.
 *
 * Illustrative data, in the same BrewLune workspace as the dashboard above —
 * same competitors, same share-of-voice figures.
 */

const EASE = [0.16, 1, 0.3, 1] as const

const T = {
  raised: 'var(--background-surface-raised)',
  page: 'var(--background-surface-page)',
  sunken: 'var(--background-surface-sunken)',
  ink: 'var(--content-default)',
  muted: 'var(--content-secondary)',
  faint: 'var(--content-placeholder)',
  line: 'var(--border-default)',
  accent: 'var(--chart-categorical-1)',
  you: 'var(--chart-categorical-1)',
  youTint: 'var(--brand-quaternary)',
  onDark: 'var(--background-action-primary-content)',
  dark: 'var(--background-action-primary-default)',
} as const

const UI = (size: number, color: string = T.ink, weight = 400): CSSProperties => ({ fontSize: size, lineHeight: 1.35, color, fontWeight: weight })

const panel: CSSProperties = {
  backgroundColor: T.raised,
  border: `1px solid ${T.line}`,
  borderRadius: 14,
}

/* ── 1 · share of brand mentions ─────────────────────────────────────── */

// colours match the dashboard's series for the same brands
const MENTIONS = [
  { name: 'Intelligentsia', pct: 34, color: 'var(--brand-primary)' },
  { name: 'Blue Bottle', pct: 27, color: 'var(--chart-categorical-5)' },
  { name: 'Counter Culture', pct: 12, color: 'var(--content-status-success)' },
  { name: 'Herkimer', pct: 11, color: 'var(--chart-categorical-2)' },
  { name: 'BrewLune', pct: 10, color: 'var(--chart-categorical-1)', you: true },
]
/** The bar scale's 100%: a little above the leader, so no bar runs full. */
const BAR_MAX = 40

function MentionsVisual() {
  const still = useReducedMotion()
  const engines = ['chatgpt', 'ai-overviews', 'perplexity'].map((k) => GEO_ENGINES.find((e) => e.key === k)!)
  return (
    // no bottom edge, by request: the panel runs open under the BrewLune row
    <div style={{ ...panel, overflow: 'hidden', borderBottom: 'none', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
      <div className="flex items-center justify-between" style={{ padding: '16px 20px', borderBottom: `1px solid ${T.line}` }}>
        <span style={UI(14, T.ink, 500)}>Share of brand mentions</span>
        <span className="flex items-center" style={{ gap: 6 }}>
          {engines.map((e) => (
            <EngineIcon key={e.key} icon={e.icon} iconFrame={e.iconFrame} size={18} />
          ))}
          <span style={{ ...UI(12.5, T.muted), marginLeft: 4 }}>40 questions</span>
        </span>
      </div>
      <div className="flex flex-col" style={{ padding: '12px 10px 16px', gap: 2 }}>
        {MENTIONS.map((m, i) => (
          <div
            key={m.name}
            className="grid items-center"
            style={{
              gridTemplateColumns: '150px 1fr 48px',
              gap: 16,
              height: 38,
              padding: '0 10px',
              borderRadius: 8,
              backgroundColor: m.you ? T.youTint : 'transparent',
            }}
          >
            <span className="flex items-center" style={{ ...UI(14, m.you ? T.you : T.ink, m.you ? 500 : 400), gap: 8 }}>
              {m.name}
              {m.you && (
                <span style={{ ...UI(10.5, T.onDark, 500), padding: '2px 7px', borderRadius: 999, backgroundColor: T.you }}>You</span>
              )}
            </span>
            <span style={{ height: 7, borderRadius: 4, backgroundColor: T.sunken, overflow: 'hidden' }}>
              <motion.span
                style={{ display: 'block', height: '100%', borderRadius: 4, backgroundColor: m.color, originX: 0 }}
                initial={{ width: still ? `${(m.pct / BAR_MAX) * 100}%` : 0 }}
                whileInView={{ width: `${(m.pct / BAR_MAX) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: EASE }}
              />
            </span>
            <span className="text-right tabular-nums" style={UI(14, T.muted)}>{m.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 2 · the evidence ────────────────────────────────────────────────── */

const G_W = 260
const G_H = 210
const CENTER = { x: 130, y: 104 }

const SOURCES = [
  { label: 'coffeereview.com', pct: '38%', x: 80, y: 50 },
  { label: 'reddit.com', pct: '27%', x: 198, y: 20 },
  { label: 'seriouseats.com', pct: '11%', x: 78, y: 184 },
  { label: 'brewlune.com', pct: '14%', x: 196, y: 160, you: true },
]

/** Faint, unlabelled sources — the long tail an answer also draws on. */
const TAIL = [
  { x: 22, y: 106 },
  { x: 108, y: 12 },
  { x: 214, y: 100 },
  { x: 150, y: 186 },
  { x: 246, y: 64 },
]

function EvidenceVisual() {
  const still = useReducedMotion()
  const you = SOURCES.find((s) => s.you)!
  return (
    <div className="relative w-full" style={{ aspectRatio: `${G_W} / ${G_H}` }}>
      <FitBox width={G_W} height={G_H} maxScale={1.15}>
        <div
          className="relative"
          style={{
            width: G_W,
            height: G_H,
            backgroundImage: `radial-gradient(${T.line} 1px, transparent 1.2px)`,
            backgroundSize: '12px 12px',
          }}
        >
          <svg className="absolute inset-0" width={G_W} height={G_H} aria-hidden>
            {[...SOURCES.filter((s) => !s.you), ...TAIL].map((p, i) => (
              <line
                key={i}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={p.x}
                y2={p.y}
                stroke={T.faint}
                strokeWidth={0.8}
                strokeDasharray="2 3"
                opacity={0.7}
              />
            ))}
            {TAIL.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={2.4} fill={T.faint} opacity={0.7} />
            ))}
            {/* your own page, the one source that leads back to you */}
            <motion.path
              d={`M${CENTER.x},${CENTER.y} C${CENTER.x + 20},${CENTER.y + 40} ${you.x - 50},${you.y} ${you.x - 34},${you.y}`}
              fill="none"
              stroke={T.accent}
              strokeWidth={1.6}
              initial={{ pathLength: still ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
            />
          </svg>

          {/* the answer */}
          <span
            className="absolute flex items-center"
            style={{
              left: CENTER.x,
              top: CENTER.y,
              translate: '-50% -50%',
              gap: 7,
              padding: '7px 13px',
              borderRadius: 999,
              backgroundColor: T.dark,
              boxShadow: `0 0 0 7px var(--brand-quaternary), 0 8px 18px rgba(2, 9, 18, 0.2)`,
              ...UI(12.5, T.onDark, 500),
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: 10,
                height: 12,
                borderRadius: 2,
                background: 'linear-gradient(160deg, var(--brand-primary), var(--chart-categorical-1) 55%, var(--brand-mint))',
              }}
            />
            AI answer
          </span>

          {SOURCES.map((s) => (
            <span
              key={s.label}
              className="absolute flex items-center"
              style={{
                left: s.x,
                top: s.y,
                translate: '-50% -50%',
                gap: 6,
                padding: '5px 10px',
                borderRadius: 999,
                backgroundColor: T.raised,
                border: `1px solid ${s.you ? T.accent : T.line}`,
                boxShadow: s.you ? `0 0 0 3px var(--brand-quaternary)` : '0 2px 6px rgba(2, 9, 18, 0.06)',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={UI(11, s.you ? T.accent : T.ink, s.you ? 500 : 400)}>{s.label}</span>
              <span style={UI(10.5, s.you ? T.accent : T.muted, s.you ? 500 : 400)}>{s.pct}</span>
            </span>
          ))}
        </div>
      </FitBox>
    </div>
  )
}

/* ── 3 · a recommendation ────────────────────────────────────────────── */

function RecommendationVisual() {
  return (
    // no bottom edge, by request: the panel runs open under step 3 rather
    // than closing in a line just below it
    <div
      className="flex flex-col"
      style={{
        ...panel,
        borderBottom: 'none',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        padding: '18px 22px 6px',
        gap: 12,
      }}
    >
      <span className="flex items-center" style={{ gap: 8 }}>
        <span style={UI(12.5, T.muted)}>Recommendation</span>
        <span style={{ ...UI(11, T.onDark, 500), padding: '3px 9px', borderRadius: 999, backgroundColor: T.dark }}>High impact</span>
      </span>
      <span style={UI(17, T.ink, 500)}>Make your reviews visible to AI.</span>
      <div className="flex flex-col" style={{ marginTop: 2 }}>
        {[
          { n: 1, text: 'Include ratings in the page HTML.', done: true },
          { n: 2, text: 'Check that AI can read them.' },
          { n: 3, text: 'Re-scan to confirm the change.' },
        ].map((s) => (
          <span
            key={s.n}
            className="flex items-center"
            style={{ gap: 12, padding: '11px 0', borderTop: `1px solid ${T.line}`, opacity: s.done ? 1 : 0.6 }}
          >
            <span
              className="flex shrink-0 items-center justify-center"
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                backgroundColor: s.done ? T.accent : T.sunken,
                color: s.done ? '#fff' : T.muted,
                ...UI(11, s.done ? '#fff' : T.muted),
              }}
            >
              {s.done ? <Check size={12} weight="bold" /> : s.n}
            </span>
            <span style={UI(13.5, T.ink)}>{s.text}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── the section ─────────────────────────────────────────────────────── */

const CARDS: { key: string; title: string; body: string; visual: ReactNode }[] = [
  {
    key: 'visibility',
    title: 'Monitor your AI presence',
    body: 'Find out which AI answers include you and which ones send people to your competitors.',
    visual: <MentionsVisual />,
  },
  {
    key: 'evidence',
    title: 'Know what to fix first',
    body: 'Trace each AI answer to its sources and get a clear list of what to change.',
    visual: <EvidenceVisual />,
  },
  {
    key: 'act',
    title: 'Get expert next steps',
    body: 'Clear, data-backed actions to help you appear in more AI answers.',
    visual: <RecommendationVisual />,
  },
]

export default function EnterpriseFeatures() {
  const mode = useLayoutMode()
  const TS = useTypeScale()
  const wide = mode === 'wide'
  const phone = mode === 'phone'

  return (
    <section data-enterprise="features" className="flex w-full flex-col" style={{ gap: 'calc(var(--spacing-gap-800) * 1.5)' }}>
      <motion.header
        className={`grid w-full ${phone ? '' : 'items-center'}`}
        style={{
          gridTemplateColumns: phone ? '1fr' : '1fr 1px 1fr',
          gap: phone ? 'var(--spacing-gap-500)' : 'var(--spacing-gap-800)',
        }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <h2 style={{ fontSize: TS.display.fontSize, lineHeight: 1.02, letterSpacing: '-0.02em', fontWeight: 500, color: T.ink, textWrap: 'balance' }}>
          Win new customers with{' '}
          <span style={{ color: 'var(--chart-categorical-1)' }}>Gist&nbsp;GEO&nbsp;Enterprise</span>
        </h2>
        {!phone && <span className="self-stretch" style={{ backgroundColor: T.line }} />}
        <p style={{ fontSize: TS.lead.fontSize, lineHeight: 1.35, color: T.faint }}>
          See where you rank in AI searches and beat competitors to it with personalized steps for your brand inside{' '}
          <span style={{ color: T.ink }}>your dashboard</span>.
        </p>
      </motion.header>

      <div
        className="grid w-full"
        style={{ gridTemplateColumns: wide ? '1.45fr 1fr 1fr' : '1fr', gap: 'var(--spacing-gap-400)' }}
      >
        {CARDS.map((c, i) => (
          <motion.article
            key={c.key}
            data-enterprise={`feature-${c.key}`}
            className="flex min-w-0 flex-col overflow-hidden"
            style={{ backgroundColor: T.raised, border: `1px solid ${T.line}`, borderRadius: 20 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
          >
            <div className="flex flex-col" style={{ gap: 'var(--spacing-gap-300)', padding: 'var(--spacing-padding-800)', paddingBottom: 'var(--spacing-padding-600)' }}>
              <h3 style={{ fontSize: TS.lead.fontSize, lineHeight: 1.2, fontWeight: 500, color: T.ink }}>{c.title}</h3>
              <p style={{ fontSize: TS.body.fontSize, lineHeight: 1.55, color: T.muted }}>{c.body}</p>
            </div>
            {/* the glimpse: cropped at a fixed height, faded at the foot */}
            <div
              aria-hidden
              className="relative mt-auto overflow-hidden"
              style={{
                height: 290,
                padding: '0 var(--spacing-padding-800)',
                maskImage: 'linear-gradient(to bottom, #000 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, #000 90%, transparent)',
              }}
            >
              {c.visual}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
