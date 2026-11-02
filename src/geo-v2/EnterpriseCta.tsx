import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Info } from '@phosphor-icons/react'
import useLayoutMode from './useLayoutMode'
import EngineIcon from './EngineIcon'
import { GEO_ENGINES } from './geoEngines'

/**
 * Enterprise — the closing call to action: a two-tone headline and the
 * free-scan action on the left, and BrewLune's sentiment-by-engine panel
 * set flat on the right, running off the card's edge and fading at the foot.
 *
 * Light mode on purpose — the banner sits on the page's own surfaces rather
 * than inverting. The panel is live markup, the product's Sentiment by engine
 * card as BrewLune would see it.
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
} as const

/* ── sentiment by engine, the panel tilted into the card ────────────── */

type EngineKey = 'chatgpt' | 'perplexity' | 'ai-overviews'
const engine = (k: EngineKey) => GEO_ENGINES.find((e) => e.key === k)!

const COLUMNS: {
  label: string
  dot: string
  bar: string
  lead: { pct: number; engine: EngineKey }
  rows: { engine: EngineKey; pct: number }[]
}[] = [
  {
    label: 'Most positive',
    dot: 'var(--content-status-success)',
    bar: 'var(--content-status-success)',
    lead: { pct: 44, engine: 'perplexity' },
    rows: [
      { engine: 'perplexity', pct: 44 },
      { engine: 'chatgpt', pct: 42 },
      { engine: 'ai-overviews', pct: 40 },
    ],
  },
  {
    label: 'Most neutral',
    dot: 'var(--content-placeholder)',
    bar: 'var(--content-placeholder)',
    lead: { pct: 60, engine: 'ai-overviews' },
    rows: [
      { engine: 'ai-overviews', pct: 60 },
      { engine: 'chatgpt', pct: 58 },
      { engine: 'perplexity', pct: 50 },
    ],
  },
  {
    label: 'Most negative',
    dot: 'var(--content-status-error)',
    bar: 'var(--content-status-error)',
    lead: { pct: 6, engine: 'perplexity' },
    rows: [
      { engine: 'perplexity', pct: 6 },
      { engine: 'chatgpt', pct: 0 },
      { engine: 'ai-overviews', pct: 0 },
    ],
  },
]

function Sentiment() {
  return (
    <div
      style={{
        width: 860,
        borderRadius: 16,
        border: `1px solid ${T.line}`,
        backgroundColor: T.raised,
        boxShadow: '0 30px 60px rgba(2, 9, 18, 0.12)',
        overflow: 'hidden',
        color: T.ink,
      }}
    >
      <div
        className="flex items-center"
        style={{ gap: 6, padding: '16px 20px', borderBottom: `1px solid ${T.line}`, backgroundColor: T.page, fontSize: 15, fontWeight: 500 }}
      >
        Sentiment by engine <Info size={13} color="var(--content-secondary)" />
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '16px 20px 20px' }}>
        {COLUMNS.map((c) => {
          const lead = engine(c.lead.engine)
          return (
            <div key={c.label} className="flex flex-col" style={{ gap: 14 }}>
              <div style={{ padding: '16px 18px', border: `1px solid ${T.line}`, borderRadius: 12 }}>
                <span className="flex items-center" style={{ gap: 7, fontSize: 12.5, color: T.muted }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: c.dot }} />
                  {c.label}
                </span>
                <span className="flex items-center" style={{ gap: 9, marginTop: 8 }}>
                  <span className="tabular-nums" style={{ fontSize: 26, fontWeight: 500, lineHeight: 1 }}>{c.lead.pct}%</span>
                  <EngineIcon icon={lead.icon} iconFrame={lead.iconFrame} size={16} />
                  <span style={{ fontSize: 14, color: T.muted }}>{lead.name}</span>
                </span>
              </div>
              {c.rows.map((r) => {
                const e = engine(r.engine)
                return (
                  <span key={r.engine} className="grid items-center" style={{ gridTemplateColumns: '18px 1fr 38px', gap: 12 }}>
                    <EngineIcon icon={e.icon} iconFrame={e.iconFrame} size={18} />
                    <span style={{ height: 6, borderRadius: 3, backgroundColor: T.sunken }}>
                      <span style={{ display: 'block', width: `${r.pct}%`, minWidth: r.pct ? 8 : 0, height: '100%', borderRadius: 3, backgroundColor: c.bar }} />
                    </span>
                    <span className="text-right tabular-nums" style={{ fontSize: 13 }}>{r.pct}%</span>
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function EnterpriseCta({ onFreeScan }: { onFreeScan?: () => void }) {
  const mode = useLayoutMode()
  const still = useReducedMotion()
  const phone = mode === 'phone'

  return (
    <motion.section
      data-enterprise="cta"
      className="relative w-full overflow-hidden"
      style={{
        borderRadius: 24,
        border: `1px solid ${T.line}`,
        backgroundColor: T.raised,
        // a faint dot field, like the reference's texture, kept to the right
        backgroundImage: `radial-gradient(${T.line} 1px, transparent 1.2px)`,
        backgroundSize: '14px 14px',
        backgroundPosition: 'right top',
        minHeight: phone ? undefined : 400,
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* the dots stay out from behind the copy */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `linear-gradient(90deg, ${T.raised} 40%, transparent 48%)` }}
      />

      {!phone && (
        <div
          aria-hidden
          className="absolute"
          style={{
            left: mode === 'wide' ? '50%' : '56%',
            top: 56,
            maskImage: 'linear-gradient(to bottom, #000 72%, transparent 100%), linear-gradient(to right, #000, #000)',
            maskComposite: 'intersect',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 72%, transparent 100%), linear-gradient(to right, #000, #000)',
            WebkitMaskComposite: 'source-in',
          }}
        >
          <motion.div
            // flat, not tilted — it rises into place as the band arrives
            initial={{ y: still ? 0 : 24, opacity: still ? 1 : 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: still ? 0 : 1.2, ease: EASE }}
          >
            <Sentiment />
          </motion.div>
        </div>
      )}

      <div
        className="relative flex flex-col items-start"
        style={{
          padding: phone ? '40px 24px' : 'clamp(48px, 5vw, 72px)',
          paddingTop: phone ? 40 : 'clamp(64px, 7vw, 104px)',
          gap: 'clamp(28px, 3vw, 40px)',
          maxWidth: 720,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(36px, 4.6vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            fontWeight: 500,
            color: T.ink,
          }}
        >
          {/* each line kept whole above a phone, so no word drops onto a line alone */}
          <span style={{ display: 'block', whiteSpace: phone ? 'normal' : 'nowrap' }}>Know how AI sees</span>
          <span style={{ display: 'block', whiteSpace: phone ? 'normal' : 'nowrap' }}>your brand</span>
        </h2>
        <div className="flex flex-wrap items-center" style={{ gap: 12 }}>
          {/* One action, by request: the free scan, in the black primary
              style — the flow's own entry, the home screen. */}
          <button
            type="button"
            data-enterprise="cta-scan"
            onClick={onFreeScan ?? (() => (window.location.hash = '#v2-geoscreen'))}
            // colours live in the class (index.css), not inline, so :hover
            // can change them — inline styles always win over a hover rule
            className="ent-cta ent-cta-primary flex items-center"
            style={{
              gap: 10,
              height: 50,
              padding: '0 20px',
              borderRadius: 10,
              fontSize: 17,
              fontWeight: 500,
            }}
          >
            Free scan <ArrowRight size={16} className="ent-cta-arrow" />
          </button>
        </div>
      </div>
    </motion.section>
  )
}
