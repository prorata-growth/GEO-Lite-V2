import { motion, useReducedMotion } from 'framer-motion'
import { Tooltip } from 'design-system'
import { ArrowRight, Check } from '@phosphor-icons/react'
import useIsMobile from '../useIsMobile'
import useTypeScale from './typeScale'
import GistNav, { PAGE_MAX_W } from './GistNav'
import GistFooter from './GistFooter'
import EngineIcon from './EngineIcon'
import { GEO_ENGINES, type EngineIconFrame } from './geoEngines'
import geminiStar from '../assets/geo-v2/gemini-star-rainbow.svg'
import iconNumberOne from '../assets/geo-v2/number-circle-one.svg'
import iconHeartbeat from '../assets/geo-v2/heartbeat.svg'
import iconHeartHalf from '../assets/geo-v2/heart-half.svg'
import iconQuotes from '../assets/geo-v2/quotes.svg'
import iconTimer from '../assets/geo-v2/timer.svg'
import iconListPlus from '../assets/geo-v2/list-plus.svg'
import iconCircuitry from '../assets/geo-v2/circuitry.svg'
import iconLightbulb from '../assets/geo-v2/lightbulb.svg'
import iconStack from '../assets/geo-v2/stack.svg'
import iconUsersThree from '../assets/geo-v2/users-three.svg'
import iconMicroscope from '../assets/geo-v2/microscope.svg'
import iconEnvelope from '../assets/geo-v2/envelope-simple.svg'

/**
 * The plans interstitial.
 *
 * Three pricing cards — Free Deep Scan, Deep Analysis, Enterprise — each with
 * its price set large, the engines it covers as overlapping marks, a short
 * checklist and its own CTA on the card's foot, so nothing is preselected and
 * the three buttons line up. Deep Analysis is the featured tier, drawn on the
 * inverse surface with a "Most popular" tag.
 */

const EASE = [0.16, 1, 0.3, 1] as const

/* ── palette ────────────────────────────────────────────────── */
const PAGE_BG = 'var(--background-surface-page)'
const INK = 'var(--content-default)'
const CARD_EDGE = 'var(--border-default)'

/* ── layout, from the design ────────────────────────────────── */
/**
 * Flat at every width above a phone, unlike the hero's, which steps down to 56
 * in `compact`.
 *
 * Narrowing it here was tried and measured worse. The hero's column holds one
 * headline, so more width is more headline; this page's holds a row of cards,
 * so more width is a *third card* — and at 768 that made the two on the first
 * row 316px each, cramming their feature lines to 34 characters and orphaning
 * the third on a row of its own. At 100 the same viewport fits one 568px card
 * reading at 70 characters. The wide padding is what keeps the measure.
 */
const COL_PAD_X = 100

/** Desktop draws everything under the bar at 80%, by request. */
const ZOOM = 0.8
/** 160 at full height, but it gives way on a shorter window — a laptop that
 *  isn't full screen was spending a fifth of the viewport on empty space above
 *  a headline and pushing the cards past the fold. */
/** The same 80 the Enterprise page uses — doubled off the spacing scale,
 *  which tops out at 40. Was a clamp that floated the column with the
 *  viewport; with a header above it, a fixed gap from the bar reads more
 *  deliberately and matches the other page. */
const PAGE_PAD_Y = 'calc(var(--spacing-padding-800) * 2)'
const HEAD_TO_CARDS = 48
const CARD_GAP = 24
/**
 * The narrowest a plan card may get before the row drops a column.
 *
 * Measured against the longest thing a card has to set: the feature lines run
 * to about 60 characters, and at 14px that wants ~420 to read at a comfortable
 * measure and stays acceptable down to about 300. Below that the card is
 * setting four-word lines, which is what 768 was doing at 230px across.
 */
const CARD_MIN = 300

/** Every icon is an SVG exported from the same Phosphor set in Figma and
 *  painted through a mask, so they all take the row's colour. The export
 *  carries its own 0.5 opacity, which the mask multiplies into that colour —
 *  an icon sourced any other way lands at twice the ink and reads as a
 *  different grey beside the rest. */
export type Feature = { icon: string; label: string }

/** Split into parts so the figure can be rolled on its own and the unit can
 *  drop to 18px beside it. */
/** Either a figure that rolls up, or a line of text where there is no public
 *  number to show. Enterprise is priced on the call, so it takes the second
 *  form rather than a made-up floor. */
type Price =
  | { text: string }
  | {
      lead: string
      amount: number
      tail?: string
      unit?: string
      /** Struck-through list price, shown after the unit as "usually $99". */
      typical?: number
    }



export type Plan = {
  key: string
  title: string
  price: Price
  cta: string
  /** The free tier gets the ink edge and the filled button. */
  primary?: boolean
  tag?: string
  features: Feature[]
}

/** How Enterprise is described wherever it's sold — the page, the report
 *  rail and the qualification panel. One declaration because three copies of
 *  it had already drifted apart once.
 *
 *  Both lines describe the Pro sheet, since that is the only plan with defined
 *  specs today. They get rewritten when sales returns Enterprise's own
 *  numbers — at which point the feature list below changes with them. */
/** Leads with what the buyer gets, not what they are capped at. It used to
 *  open "One brand and up to 50 topics" — a ceiling stated before a reason,
 *  to someone about to ask for a custom quote. The numbers did not go missing:
 *  "Up to 50 topics" and the weekly cadence are both in the feature list right
 *  below, which is where a spec belongs. */
export const ENTERPRISE_POSITIONING =
  'Know where you stand across your whole category, tracked every week.'
export const ENTERPRISE_SCOPE =
  '150 prompts across ChatGPT, Perplexity and Google AI Overviews, refreshed weekly, with one Deep Analysis a month. Priced to the shape of what you run.'

/** Exported so the Enterprise page reads the same tier this page sells,
 *  rather than keeping a second copy of the feature list to drift from. */
export const PLANS: Plan[] = [
  {
    key: 'snapshot',
    title: 'Free Scan',
    price: { lead: '$', amount: 0 },
    cta: 'Start scan',
    primary: true,
    features: [
      { icon: iconNumberOne, label: 'One topic, with real questions asked' },
      { icon: iconHeartbeat, label: 'Site Health' },
      { icon: iconHeartHalf, label: 'Sentiment Audit' },
      { icon: iconQuotes, label: 'Citation Audit' },
      { icon: iconTimer, label: 'Two to three minutes, no card required' },
    ],
  },
  {
    key: 'full',
    title: 'Deep Analysis',
    // 20% off the $99 anchor. The three numbers on this card have to agree:
    // the badge's percentage, the price, and the struck-through typical.
    price: { lead: '$', amount: 79, tail: ' ', unit: 'one-time · ', typical: 99 },
    cta: 'Run Deep Analysis',
    tag: 'Special 20% off',
    // The same spec the report's rail and the example modal sell, so the
    // three places a Deep Analysis is described cannot promise different
    // things. Icons are this page's own — the rail has no room for them.
    features: [
      { icon: iconCircuitry, label: 'Additional prompts and models' },
      { icon: iconHeartbeat, label: '20-page site audit' },
      { icon: iconQuotes, label: 'Full suite of visibility and performance metrics' },
      { icon: iconLightbulb, label: 'Insights to help you understand your results' },
      { icon: iconListPlus, label: 'What you can do to improve your standing' },
    ],
  },
  {
    key: 'enterprise',
    title: 'Enterprise',
    // No figure: GEO Pro's $329 is a different plan, and enterprise is scoped
    // on the call. The specs below are still the old set — sales is writing
    // the real ones.
    price: { text: 'Custom pricing' },
    cta: 'Contact sales',
    // Straight off the Pro pricing sheet, which is the one plan with defined
    // specs today. Its engine line is left out: the card already shows the
    // engine marks above the price.
    features: [
      { icon: iconQuotes, label: '150 unique prompts, tracked weekly' },
      { icon: iconMicroscope, label: 'One Deep Analysis a month' },
      { icon: iconLightbulb, label: 'Detailed recommendations' },
      { icon: iconNumberOne, label: 'One brand or project' },
      { icon: iconListPlus, label: 'Up to 50 topics' },
      { icon: iconStack, label: '5,000 pages audited a month' },
      { icon: iconUsersThree, label: 'One onboarding session' },
      { icon: iconEnvelope, label: 'Customer support by email' },
    ],
  },
]

const COLUMN = { hidden: {}, shown: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
const RISE = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

/* ── the pricing cards ─────────────────────────────────────────────── */

/**
 * What each pricing card shows. Kept apart from PLANS on purpose: PLANS is
 * also read by the Enterprise page (its feature list and CTA), and these
 * cards sell the tiers in their own words — a subtitle, the engines as overlapping
 * marks, and a short checklist.
 */
type PricingCard = {
  key: 'snapshot' | 'full' | 'enterprise'
  title: string
  price: string
  sub: string
  tag?: string
  /** The emphasised tier: drawn inverted, on the system's inverse surface. */
  featured?: boolean
  engines: string[]
  points: string[]
  cta: string
}

const CARDS: PricingCard[] = [
  {
    key: 'snapshot',
    title: 'Free Deep Scan',
    price: '$0',
    sub: 'No account. No credit card.',
    engines: ['chatgpt', 'ai-overviews'],
    points: [
      'One brand. One topic. Two minutes.',
      'Your AI visibility & competitors',
      '5-page site audit with cited sources',
    ],
    cta: 'Get free Deep Scan',
  },
  {
    key: 'full',
    title: 'Deep Analysis',
    price: '$79',
    sub: 'Single-time report.',
    tag: 'Most popular',
    featured: true,
    engines: ['chatgpt', 'ai-overviews', 'perplexity'],
    points: [
      'Additional prompts and AI models',
      '20-page deep dive into how AI sees your site',
      'Expert recommendations to boost your AI visibility, backed by real data',
      'Full suite of visibility and performance metrics',
    ],
    cta: 'Explore Deep Analysis',
  },
  {
    key: 'enterprise',
    title: 'Enterprise',
    price: 'Custom',
    sub: 'For teams & agencies.',
    // the add-ons trail the stack, after a "+"
    engines: ['chatgpt', 'ai-overviews', 'perplexity', 'claude', 'gemini'],
    points: [
      'Ongoing AI visibility insights and actions to take',
      'Custom prompt volume and cadence',
      'Support for as many orgs and pitch workspaces as you need',
      'Ability to add Claude and Gemini',
      'Custom credit allowance to run loops and exceed your plan’s established limits',
    ],
    cta: 'Contact sales',
  },
]

/** The marks the cards draw: the flow's engines plus Gemini, which the flow
 *  has no entry for. */
const MARKS: { key: string; name: string; icon: string; iconFrame: EngineIconFrame }[] = [
  ...GEO_ENGINES,
  // Gemini's own multicolour star, so it reads apart from AI Overviews' blue one
  { key: 'gemini', name: 'Gemini', icon: geminiStar, iconFrame: 'insetWhite' },
]

/** Engines a plan adds on rather than includes — named so on hover. */
const ADD_ONS = ['claude', 'gemini']

/** The engine marks: 36 across, each tucked 10 under the one before. */
const ENGINE_SIZE = 36
const ENGINE_OVERLAP = 10

/** Colours per card: the featured one swaps to the inverse pair. */
function tone(featured?: boolean) {
  return featured
    ? {
        bg: 'var(--background-surface-inverse)',
        ink: 'var(--content-inverse)',
        muted: 'color-mix(in srgb, var(--content-inverse) 62%, transparent)',
        line: 'color-mix(in srgb, var(--content-inverse) 16%, transparent)',
        check: 'var(--brand-mint)',
      }
    : {
        bg: 'var(--background-surface-raised)',
        ink: INK,
        muted: 'var(--content-secondary)',
        line: CARD_EDGE,
        check: 'var(--chart-categorical-1)',
      }
}

function PricingCardView({ card, onPick }: { card: PricingCard; onPick: () => void }) {
  const TYPE = useTypeScale()
  const c = tone(card.featured)
  const still = useReducedMotion()
  const rest = card.featured ? '0 28px 60px rgba(2, 9, 18, 0.22)' : '0 1px 2px rgba(2, 9, 18, 0.04)'
  const lifted = card.featured ? '0 36px 72px rgba(2, 9, 18, 0.3)' : '0 18px 40px rgba(2, 9, 18, 0.1)'
  return (
    /* Hover lifts the card a few pixels and deepens its shadow; a light
       card's edge also firms up. No lift under reduced motion — the shadow
       and edge still answer the pointer. */
    <motion.div
      variants={RISE}
      data-plans="card"
      data-plan={card.key}
      className="group flex min-w-0 flex-col"
      initial={false}
      whileHover={{ y: still ? 0 : -6, boxShadow: lifted, borderColor: card.featured ? 'transparent' : 'var(--border-interactive-strong)' }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      style={{
        padding: 'clamp(28px, 3vw, 44px)',
        borderRadius: 24,
        backgroundColor: c.bg,
        border: `1px solid ${card.featured ? 'transparent' : c.line}`,
        boxShadow: rest,
        color: c.ink,
      }}
    >
      <div className="flex items-center justify-between" style={{ gap: 12, minHeight: 30 }}>
        <p style={{ fontSize: TYPE.lead.fontSize, fontWeight: 500, lineHeight: 1.2 }}>{card.title}</p>
        {card.tag && (
          <span
            className="shrink-0 whitespace-nowrap"
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              backgroundColor: 'var(--brand-mint)',
              color: '#0a0a0a',
              fontSize: TYPE.data.fontSize,
              fontWeight: 500,
              lineHeight: 1.3,
            }}
          >
            {card.tag}
          </span>
        )}
      </div>

      {/* the price is the card's headline — set at display size, above the
          type scale on purpose, as the design draws it */}
      <p
        data-plans="price"
        style={{ fontSize: 'clamp(52px, 5vw, 72px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.035em', marginTop: 28 }}
      >
        {card.price}
      </p>
      <p style={{ fontSize: TYPE.section.fontSize, color: c.muted, lineHeight: 1.4, marginTop: 14 }}>{card.sub}</p>

      {/* the engines, as overlapping marks — each ringed in the card's own
          colour so the overlap reads as a stack, and named on hover. Add-ons
          form a second stack, set off from the included engines by a "+". */}
      <div className="flex items-center" style={{ marginTop: 24 }}>
        {[card.engines.filter((k) => !ADD_ONS.includes(k)), card.engines.filter((k) => ADD_ONS.includes(k))].map(
          (group, g) =>
            group.length > 0 && (
              <span key={g} className="flex items-center">
                {g > 0 && (
                  <span aria-hidden style={{ margin: '0 10px', fontSize: 20, lineHeight: 1, color: c.muted }}>
                    +
                  </span>
                )}
                {group.map((k, i) => {
                  const e = MARKS.find((m) => m.key === k)!
                  const name = g > 0 ? `${e.name} (add-on)` : e.name
                  return (
                    <Tooltip key={k} content={name} side="bottom">
                      <span
                        role="img"
                        aria-label={name}
                        className="relative flex shrink-0 rounded-full"
                        style={{ marginLeft: i ? -ENGINE_OVERLAP : 0, zIndex: i, boxShadow: `0 0 0 2px ${c.bg}` }}
                      >
                        <EngineIcon icon={e.icon} iconFrame={e.iconFrame} size={ENGINE_SIZE} insetRatio={0.6} />
                      </span>
                    </Tooltip>
                  )
                })}
              </span>
            ),
        )}
      </div>

      <div style={{ height: 1, backgroundColor: c.line, margin: '28px 0' }} />

      <ul className="m-0 flex list-none flex-col p-0" style={{ gap: 14, marginBottom: 36 }}>
        {card.points.map((pt) => (
          <li key={pt} className="flex items-start" style={{ gap: 12, fontSize: TYPE.body.fontSize, lineHeight: 1.45 }}>
            <Check size={16} weight="bold" color={c.check} style={{ flexShrink: 0, marginTop: 3 }} />
            {pt}
          </li>
        ))}
      </ul>

      {/* the CTA sits on the card's foot, so the three line up across the row */}
      <button
        type="button"
        data-plans="cta"
        onClick={onPick}
        className="flex w-full items-center justify-center transition-[filter] duration-200 group-hover:brightness-110"
        style={{
          marginTop: 'auto',
          height: 52,
          gap: 10,
          borderRadius: 10,
          border: 'none',
          background: 'linear-gradient(180deg, var(--chart-categorical-1), var(--brand-primary))',
          color: '#fff',
          fontSize: TYPE.body.fontSize,
          fontWeight: 500,
          // the top-edge highlight only — no drop shadow under the button
          boxShadow: '0 1px 0 rgba(255,255,255,0.18) inset',
        }}
      >
        {card.cta}
        <ArrowRight size={16} weight="bold" />
      </button>
    </motion.div>
  )
}

export default function GeoPlansScreen({
  onSnapshot,
  onFullReport,
  onSales,
  onEnterprise,
}: {
  onSnapshot?: () => void
  onFullReport?: () => void
  onSales?: () => void
  /** Enterprise scopes before it books; a demo goes straight to the slots. */
  onEnterprise?: () => void
}) {
  const mobile = useIsMobile()
  /** Sizes off the shared ramp — see `typeScale`. The price line is exempt;
   *  see PRICE_PX. */
  const TYPE = useTypeScale()

  const pick = (key: string) => () => {
    if (key === 'snapshot') onSnapshot?.()
    else if (key === 'full') onFullReport?.()
    else (onEnterprise ?? onSales)?.()
  }

  return (
    <div
      data-plans="frame"
      // the window scrolls, as on Enterprise — an inner scroller here left the
      // window without a scrollbar, so the bar widened and shifted between pages
      className="flex min-h-screen w-full flex-col"
      style={{ backgroundColor: PAGE_BG }}
    >
      {/* `login`: pricing is a page you read before signing in. */}
      <GistNav action="login" maxWidth={PAGE_MAX_W} />

      {/* Fills the height under the bar, so `m-auto` below still centres the
          column in whatever height is left. */}
      <div
        data-plans="scroll"
        className="flex w-full flex-1 flex-col"
      >
      {/* Everything under the bar drawn at 80% on desktop, by request, so the
          three cards land above the fold. */}
      <div className="flex w-full flex-col" style={{ zoom: mobile ? undefined : ZOOM }}>
      <motion.div
        data-plans="col"
        className="mx-auto flex w-full flex-col items-start"
        style={{
          // PAGE_MAX_W on screen: the column sits inside the 80% zoom, so its
          // own pixels are divided back out
          maxWidth: mobile ? undefined : PAGE_MAX_W / ZOOM,
          gap: mobile ? 32 : HEAD_TO_CARDS,
          paddingTop: PAGE_PAD_Y,
          // more room before the footer, by request
          paddingBottom: `calc(${PAGE_PAD_Y} * 2.75)`,
          paddingInline: mobile ? 24 : COL_PAD_X,
        }}
        variants={COLUMN}
        initial="hidden"
        animate="shown"
      >
        {/* The Enterprise hero's treatment, so the two pages open alike:
            a centred eyebrow, the page's one display line, and a muted lede
            capped at 640 for its measure. */}
        <motion.div
          variants={RISE}
          data-plans="head"
          className="flex w-full flex-col items-center text-center"
          style={{ gap: 'var(--spacing-gap-600)' }}
        >
          <span
            style={{
              ...TYPE.eyebrow,
              // the Enterprise hero's size, so the two labels match — divided
              // by the zoom on desktop so it still renders at that size
              fontSize: mobile
                ? 'var(--text-accent-tight-300-font-size)'
                : `calc(var(--text-accent-tight-300-font-size) / ${ZOOM})`,
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: 'var(--content-secondary)',
            }}
          >
            PRICING
          </span>
          <h1
            className="w-full"
            style={{
              color: INK,
              // one line above a phone, by request: no measure cap, and the
              // fluid size tuned so the line fits the column at any width
              whiteSpace: mobile ? undefined : 'nowrap',
              fontSize: 'clamp(40px, 5.6vw, 84px)',
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              textWrap: 'balance',
            }}
          >
            Find out <span style={{ color: 'var(--chart-categorical-1)' }}>before your competitor</span> does.
          </h1>
          <p
            className="w-full"
            style={{
              maxWidth: 640,
              color: 'var(--content-secondary)',
              fontSize: TYPE.section.fontSize,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Start with a Free Scan. Go deeper when you’re ready.
          </p>
        </motion.div>

        {/* ─── the cards ─────────────────────────────────────── */}
        {/* A grid rather than a flex row, for the reason the chips are one:
            `min-w-0 flex-1` has no floor, so at 768 the three cards were 230px
            each and every line in them ran 14 characters. Uniform tracks let
            the row become two columns and then one as the space runs out, and
            a card that wraps onto its own line stays one column wide instead
            of stretching the full width on its own. */}
        <div
          data-plans="cards"
          className="grid w-full items-stretch"
          style={{
            gap: CARD_GAP,
            gridTemplateColumns: mobile ? '1fr' : `repeat(auto-fit, minmax(${CARD_MIN}px, 1fr))`,
          }}
        >
          {CARDS.map((card) => (
            <PricingCardView key={card.key} card={card} onPick={pick(card.key)} />
          ))}
        </div>
      </motion.div>
      {/* inside the scroll, so the footer arrives after the plans rather
          than pinning to the window */}
      <GistFooter maxWidth={PAGE_MAX_W / ZOOM} />
      </div>
      </div>
    </div>
  )
}
