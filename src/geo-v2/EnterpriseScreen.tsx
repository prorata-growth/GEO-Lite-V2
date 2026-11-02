import { motion } from 'framer-motion'
import { Button } from 'design-system'
import useIsMobile from '../useIsMobile'
import useTypeScale from './typeScale'
import GistNav, { PAGE_MAX_W } from './GistNav'
import GistFooter from './GistFooter'
import EnterpriseQuote from './EnterpriseQuote'
import GistDashboard, { DASH_W, DASH_H } from './GistDashboard'
import FitBox from '../FitBox'
import EnterpriseEngines from './EnterpriseEngines'
import EnterpriseFeatures from './EnterpriseFeatures'
import EnterpriseCta from './EnterpriseCta'
import { PLANS } from './GeoPlansScreen'

/**
 * Enterprise — where the nav's "Enterprise" link lands.
 *
 * Every claim on this page already existed somewhere in the flow, and is read
 * from there rather than restated: the feature list is the Enterprise tier's
 * own `features` from the plans page, the positioning line is the report
 * rail's Enterprise blurb, and the pricing note is the qualify screen's. The
 * page assembles what the product already says about this tier; it does not
 * invent a new pitch for it.
 *
 * Type and spacing are design-system tokens throughout — this screen has no
 * Figma source, so there is nothing to match pixel-for-pixel, which makes
 * inventing values even less defensible than usual.
 */

const EASE = [0.16, 1, 0.3, 1] as const

const T = {
  page: 'var(--background-surface-page)',
  raised: 'var(--background-surface-raised)',
  ink: 'var(--content-default)',
  muted: 'var(--content-secondary)',
  line: 'var(--border-default)',
  r_md: 'var(--border-radius-md)',
} as const

/**
 * This screen's names for the shared ramp's steps.
 *
 * Each entry was the design system's type token directly — `36px`, `24px`,
 * `18px`, fixed at every width, because the system's type has no responsive
 * stops. `typeScale` resolves to those same tokens at `wide` and adds the
 * stops below it, so desktop is unchanged and a phone stops being sent
 * desktop type. Line heights and weights stay as this screen set them.
 */
function useScreenType() {
  const T = useTypeScale()
  return {
    // a step up from the ramp's eyebrow (12): the hero's label sits over an
    // 84px headline, where 12 read as a footnote
    eyebrow: { ...T.eyebrow, fontSize: 'var(--text-accent-tight-300-font-size)', fontWeight: 500, letterSpacing: '0.08em' },
    lede: { fontSize: T.section.fontSize, fontWeight: 400, lineHeight: 1.6 },
  } as const
}

/** The tier this page is about, read from the plans page's own declaration. */
const ENTERPRISE = PLANS.find((p) => p.key === 'enterprise')!


/** The plans page's own left inset, so the two pages start on the same line
 *  rather than one being centred and the other indented. */
const COL_PAD_X = 100

/**
 * Page-level rhythm, doubled off the spacing scale rather than picked by eye.
 *
 * The scale tops out at 40 (`spacing-*-800`), which is sized for the inside of
 * a component — between sections of a full page it reads cramped. Doubling the
 * top stop keeps these derived from the scale instead of introducing loose
 * numbers next to it.
 */
/** 80 + 24 = 104: the doubled top stop plus one more step, for a little
 *  more air between sections. */
const SECTION_GAP = 'calc(var(--spacing-gap-800) * 2 + var(--spacing-gap-600))'
const PAGE_PAD_Y = 'calc(var(--spacing-padding-800) * 2)'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
})

export default function EnterpriseScreen({
  onContactSales,
}: {
  onContactSales?: () => void
  /** No longer used here: the hero's secondary button now starts the free
   *  scan, by request. Kept so the route's call site stays valid. */
  onDemo?: () => void
}) {
  const mobile = useIsMobile()
  const TYPE = useScreenType()

  return (
    <div
      data-enterprise="frame"
      className="flex min-h-screen w-full flex-col"
      // clip, not hidden: trims the quote's full-width dot field without
      // turning the frame into a scroll container
      style={{ backgroundColor: T.page, overflowX: 'clip', isolation: 'isolate' }}
    >
      <GistNav action="login" maxWidth={PAGE_MAX_W} />

      <div
        data-enterprise="body"
        className="mx-auto flex w-full flex-1 flex-col items-start"
        style={{
          // capped and centred: wider screens get the extra as side margin
          maxWidth: PAGE_MAX_W,
          paddingInline: mobile ? 24 : COL_PAD_X,
          paddingTop: PAGE_PAD_Y,
          // the same 176 the Pricing page shows above its footer (its 2.75 × 80,
          // drawn at that page's 80% zoom), so the two pages end alike
          paddingBottom: `calc(${PAGE_PAD_Y} * 2.75 * 0.8)`,
          gap: SECTION_GAP,
        }}
      >
        {/* ─── the pitch ─────────────────────────────────────── */}
        <div
          data-enterprise="hero-row"
          // The pitch alone, centred; the product is shown in its own section below.
          className="flex w-full justify-center"
          style={{ gap: 'var(--spacing-gap-700)' }}
        >
        <motion.section
          data-enterprise="hero"
          className="flex flex-col items-center text-center"
          /**
           * Wide enough for the headline to run on two lines at its size;
           * the lede keeps its own 640 ceiling, about 71 characters a line.
           */
          style={{
            gap: 'var(--spacing-gap-600)',
            width: '100%',
            maxWidth: 1080, // room for the h1 on one line at its 67px cap
          }}
          {...rise(0.04)}
        >
          <span style={{ ...TYPE.eyebrow, color: T.muted }}>ENTERPRISE</span>
          {/* The page's one display line, so it outranks every section
              heading below it (the largest of those is 48). Fluid between
              phone and desktop; above the system's type scale, which
              stops at 40, by request. */}
          <h1
            className="w-full"
            style={{
              fontSize: 'clamp(36px, 5.6vw, 76px)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              fontWeight: 500,
              color: T.ink,
              textWrap: 'balance',
            }}
          >
            {/* two lines by request: the blue phrase gets a line of its own */}
            Track and improve <span style={{ display: 'block', color: 'var(--chart-categorical-1)' }}>your AI visibility</span>
          </h1>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: 'var(--spacing-gap-300)' }}>
            {/* Free scan in black, Contact sales in white, by request. */}
            {/* the free path, by request — the flow's own entry, the home screen */}
            <Button
              type="primary"
              size="large"
              data-enterprise="demo"
              onClick={() => (window.location.hash = '#v2-geoscreen')}
            >
              Get free scan
            </Button>
            <Button type="secondary" size="large" data-enterprise="sales" onClick={onContactSales}>
              {ENTERPRISE.cta}
            </Button>
          </div>
        </motion.section>

        </div>

        {/* ─── the engines it reads — above the dashboard, by request ─ */}
        <EnterpriseEngines />

        {/* ─── the workspace itself ──────────────────────────── */}
        {/* BrewLune's Insights screen, built at the column's full width and
            scaled whole: 1:1 on a desktop, down to the column on a phone.
            DOM, not a raster, so it stays sharp at any scale. */}
        <motion.figure
          data-enterprise="dashboard"
          className="m-0 flex w-full flex-col items-center"
          style={{
            gap: 'var(--spacing-gap-500)',
            marginTop: -10, // nudged 10px closer to the hero, by request
            marginBottom: 'calc(var(--spacing-gap-600) + 10px)', // more room below, by request
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="w-full" style={{ maxWidth: DASH_W, aspectRatio: `${DASH_W} / ${DASH_H}` }}>
            <FitBox width={DASH_W} height={DASH_H}>
              <GistDashboard />
            </FitBox>
          </div>
        </motion.figure>

        {/* ─── how it works ──────────────────────────────────── */}
        <EnterpriseFeatures />

        {/* ─── what the tier is ──────────────────────────────── */}
        <EnterpriseQuote />

        {/* ─── the close ─────────────────────────────────────── */}
        <EnterpriseCta />

      </div>

      <GistFooter />
    </div>
  )
}
