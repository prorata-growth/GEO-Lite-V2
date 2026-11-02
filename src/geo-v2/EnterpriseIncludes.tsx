import { motion } from 'framer-motion'
import useTypeScale from './typeScale'
import useLayoutMode from './useLayoutMode'
import { PLANS } from './GeoPlansScreen'

/**
 * Enterprise — "What's included", as a strip of overlapping cards: each a
 * blue icon over the plan's own feature label, read from the plans page like
 * the rest of this screen.
 */

const ENTERPRISE = PLANS.find((p) => p.key === 'enterprise')!

const EASE = [0.16, 1, 0.3, 1] as const

/** The cards this page shows, in order, by the plan's feature labels. Only
 *  these render — the plan's other features (onboarding, one brand, topics,
 *  recommendations) were taken off this grid by request; the pricing page
 *  still lists them. */
const ORDER = [
  '150 unique prompts, tracked weekly',
  '5,000 pages audited a month',
  'One Deep Analysis a month',
  'Detailed recommendations',
]

/** This page's wording where it differs from the plan's own label. */
const TITLES: Record<string, string> = {
  '5,000 pages audited a month': '5,000 pages audited every month',
  'One Deep Analysis a month': 'One Deep Analysis every month',
  // the plan's recommendations line, with its lightbulb, in this page's words
  'Detailed recommendations': 'Ongoing AI visibility insights and actions',
}

/** Card corner, set by request; also how far each card tucks under the next. */
const RADIUS = 16

const T = {
  raised: 'var(--background-surface-raised)',
  ink: 'var(--content-default)',
  muted: 'var(--content-secondary)',
  line: 'var(--border-default)',
} as const

/**
 * A feature icon in Gist GEO blue — the logo mark's own blue.
 *
 * These SVGs carry a 0.5 fill-opacity from their Figma export, so a single
 * mask paints any colour at half strength: a pale, greyish blue. The same
 * mask is stacked three times instead (mask layers composite additively), which
 * brings the shape to about 88% and the blue reads as the brand's.
 */
function BrandIcon({ src, size }: { src: string; size: number }) {
  const one = `url("${src}") center / contain no-repeat`
  const mask = [one, one, one].join(', ')
  return (
    <span
      aria-hidden
      style={{
        display: 'block',
        flex: 'none',
        width: size,
        height: size,
        backgroundColor: 'var(--chart-categorical-1)',
        mask,
        WebkitMask: mask,
      }}
    />
  )
}

export default function EnterpriseIncludes() {
  const mode = useLayoutMode()
  const TS = useTypeScale()
  const perRow = mode === 'wide' ? 4 : mode === 'compact' ? 2 : 1

  // Local to this page — the plans page keeps the plan's own order.
  const features = ORDER.map((label) => ENTERPRISE.features.find((f) => f.label === label)).filter(
    (f): f is (typeof ENTERPRISE.features)[number] => !!f,
  )
  const rows: (typeof features)[] = []
  for (let i = 0; i < features.length; i += perRow) rows.push(features.slice(i, i + perRow))

  return (
    <section data-enterprise="includes" className="flex w-full flex-col items-center" style={{ gap: 'var(--spacing-gap-800)' }}>
      <motion.header
        className="flex flex-col items-center text-center"
        style={{ gap: 'var(--spacing-gap-300)', maxWidth: 640 }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <h2 style={{ fontSize: TS.title.fontSize, lineHeight: 1.15, fontWeight: 500, color: T.ink }}>
          What&rsquo;s included
        </h2>
        <p style={{ fontSize: TS.section.fontSize, lineHeight: 1.5, color: T.muted }}>
          Everything in the Enterprise plan, in one workspace.
        </p>
      </motion.header>

      <div className="flex w-full flex-col" style={{ gap: 'var(--spacing-gap-600)' }}>
        {rows.map((row, r) => (
          <div key={r} className="flex w-full items-stretch">
            {row.map((f, i) => {
              return (
                <motion.article
                  key={f.label}
                  data-enterprise="include-card"
                  className="flex min-w-0 flex-1 flex-col items-start"
                  style={{
                    // overlapping: each card after the first slides left by
                    // the corner radius and sits above its neighbour, so its
                    // rounded edge is drawn over the previous card's. Works
                    // because the cards are opaque.
                    position: 'relative',
                    zIndex: i + 1,
                    marginLeft: i === 0 ? 0 : -RADIUS,
                    gap: 'var(--spacing-gap-800)', // icon to title, opened up by request
                    padding: 'var(--spacing-padding-800)',
                    paddingRight: `calc(var(--spacing-padding-800) + ${RADIUS / 2}px)`,
                    border: `1.5px solid ${T.line}`,
                    borderRadius: RADIUS,
                    backgroundColor: T.raised,
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                >
                  {/* The product's own icon for this feature — the same glyph the
                      plans page lists it with. */}
                  <BrandIcon src={f.icon} size={32} />
                  <div className="flex flex-col" style={{ gap: 'var(--spacing-gap-300)' }}>
                    {/* The plan's own feature line is the card's heading. */}
                    <h3 style={{ fontSize: TS.lead.fontSize, lineHeight: 1.2, fontWeight: 400, color: T.ink }}>
                      {TITLES[f.label] ?? f.label}
                    </h3>
                  </div>
                </motion.article>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
