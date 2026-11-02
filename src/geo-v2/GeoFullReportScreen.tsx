import { motion, useReducedMotion } from 'framer-motion'
import { Button } from 'design-system'
import useIsMobile from '../useIsMobile'
import GistNav, { bandPad } from './GistNav'
import { FULL_REPORT_UPSELL } from './geoReportPageData'

/**
 * The paid Deep Analysis — the real Tread document, served from `public/`.
 *
 * This used to be a deliberate placeholder ("not designed yet, and
 * deliberately not faked"). The document now exists as its own Vite app at
 * ~/tread-report: ten A4 sheets with their own viewer chrome, print
 * stylesheet and data file.
 *
 * It is embedded as a built artifact rather than imported as source because
 * that app ships global CSS — its own Tailwind base, `index.css` and
 * `print.css` — and CSS imports are global in Vite no matter which route
 * pulls them in. Importing it would leak the document's base styles across
 * every other screen in this prototype. The frame keeps the two style worlds
 * apart, and the report's own print path keeps working inside it.
 *
 * Refresh the embedded copy with `npm run sync:tread-report` after any change
 * to that project — the build here is a snapshot, not a live link.
 */

const REPORT_SRC = 'tread-report/index.html'

/**
 * The next step, once the document has been read.
 *
 * It overlays the document rather than sitting in the flow below it. Reserving
 * a strip would mean an empty band sitting there before it arrives, which is
 * the one thing this is not supposed to be — overlaid, the report is whole
 * until the band rises over it. (A section *after* the report is not an option
 * either: the viewer is a scroll container of its own, so anything below it
 * takes two scrolls to reach.)
 *
 * The cost is that the last strip of the document stays covered once it lands.
 * Affordable here because the viewer scrolls: anything under the band can be
 * scrolled clear of it.
 */

/** Long enough for the document to be on screen first, short enough that the
 *  band still reads as a response to it. */
const BAND_DELAY = 0.9
function UpsellBand({ onStartTrial }: { onStartTrial?: () => void }) {
  const still = useReducedMotion()
  /**
   * The band overlays the document, so every pixel of it is document the
   * reader cannot see.
   *
   * At desktop padding it wrapped to two rows on a phone and stood 213px
   * tall — 27% of the frame, permanently over the sheet someone is trying to
   * read. It still wraps, because the copy and the button cannot share a
   * 390px line, but it no longer pays desktop padding to do it, and the
   * button takes the row it is given rather than sitting stranded at one end
   * of it.
   */
  const mobile = useIsMobile()
  return (
    <motion.div
      data-full="upsell"
      className="absolute right-0 bottom-0 left-0 flex flex-wrap items-center justify-between"
      style={{
        backgroundColor: 'var(--background-surface-raised)',
        borderTop: '1px solid var(--border-default)',
        gap: mobile ? 'var(--spacing-gap-400)' : 'var(--spacing-gap-600)',
        // the bar's colour runs edge to edge; its text and button hold to the
        // centred 1440 column on wider windows
        paddingInline: mobile ? 24 : bandPad(40),
        paddingBlock: mobile ? 'var(--spacing-padding-400)' : 'var(--spacing-padding-600)',
        // Clears the home indicator on a notched phone, and costs nothing
        // anywhere else — `env()` is 0 when there is no inset.
        paddingBottom: mobile
          ? 'max(var(--spacing-padding-400), env(safe-area-inset-bottom))'
          : 'var(--spacing-padding-600)',
      }}
      initial={still ? false : { y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, delay: BAND_DELAY, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex min-w-0 flex-col items-start" style={{ gap: 'var(--spacing-gap-100)' }}>
        <span
          style={{
            color: 'var(--content-default)',
            fontSize: 'var(--text-accent-tight-500-font-size)',
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {FULL_REPORT_UPSELL.title}
        </span>
        <span
          style={{
            color: 'var(--content-secondary)',
            fontSize: 'var(--text-default-tight-300-font-size)',
            lineHeight: 1.5,
          }}
        >
          {FULL_REPORT_UPSELL.blurb}
        </span>
      </div>

      {/* No promo code to carry away: they are signed in and this report is
          already paid for, so the trial starts on the click rather than at a
          checkout that needs a code typed into it. */}
      <Button
        type="primary"
        size="large"
        data-full="trial"
        onClick={onStartTrial}
        style={mobile ? { width: '100%' } : undefined}
      >
        {FULL_REPORT_UPSELL.cta}
      </Button>
    </motion.div>
  )
}

export default function GeoFullReportScreen({
  onStartTrial,
}: {
  /** Into the platform's own onboarding — a surface outside this prototype. */
  onStartTrial?: () => void
} = {}) {
  return (
    <div
      data-full="frame"
      // `dvh`, not `vh`. A mobile browser's `100vh` is the viewport *without*
      // its own chrome, so a frame that tall puts its `bottom: 0` band
      // underneath the address bar — on iOS Safari the "Start 7 days free"
      // button was half behind the toolbar, which is the one control this
      // screen exists to offer. `dvh` tracks the chrome as it shows and hides.
      className="relative flex h-[100dvh] w-full flex-col overflow-hidden"
      style={{ backgroundColor: 'var(--background-surface-page)' }}
    >
      {/* The flow's own bar, unchanged — `signout` because this screen is only
          reachable after paying.

          The app's chrome gets its own strip rather than floating over the
          sheet: the document is a printed artifact and stays light in both
          themes, so a themed control on top of it reads as white-on-white the
          moment the app is dark — and the design system declares its light
          values on `:root` only, so there is no honest way to pin one subtree
          light without restating them. */}
      <GistNav action="signout" />

      <iframe
        data-full="report"
        src={REPORT_SRC}
        title="Tread — GEO Deep Analysis"
        className="block min-h-0 w-full flex-1 border-0"
      />

      <UpsellBand onStartTrial={onStartTrial} />
    </div>
  )
}
