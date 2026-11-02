import { motion } from 'framer-motion'
import useIsMobile from '../useIsMobile'
import useTypeScale from './typeScale'
import GistNav from './GistNav'

/**
 * Where a sample scan lands when the brand has no dataset behind it.
 *
 * The prototype holds exactly one finished scan — Tread's. Every number in
 * the report is built on it, down to the summary sentence, so pointing
 * Sephora, REI or Olipop at that page would show somebody else's competitors
 * and somebody else's rank under their own name.
 *
 * So the flow runs in full and stops here instead: the chip, the confirmation
 * and the scan are all real, and this says plainly what the last screen would
 * be. A marked placeholder is the honest version of "not built yet" — the
 * dashed border carries that without a label spelling it out, the same way
 * the onboarding placeholder does.
 *
 * No action of its own. The description already says the real report's rail
 * will carry the "run your own scan" CTA, so a button here was the same offer
 * twice — one of them real and one of them described. The bar above still
 * holds the logo, Pricing and Log in, so the screen is not a dead end.
 */

const EASE = [0.16, 1, 0.3, 1] as const

export default function GeoSampleReportScreen({
  brand,
}: {
  brand: string
}) {
  const mobile = useIsMobile()
  /** Sizes off the shared ramp — see `typeScale`. These were the design
   *  system's tokens read directly, which are one fixed size at every width. */
  const TYPE = useTypeScale()

  return (
    <div
      data-sample-report="frame"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: 'var(--background-surface-page)' }}
    >
      <GistNav action="login" />

      <div
        className="flex min-h-0 w-full flex-1 items-center justify-center"
        style={{ padding: mobile ? 24 : 40 }}
      >
        <motion.div
          data-sample-report="note"
          className="flex w-full flex-col items-start"
          style={{
            maxWidth: 560,
            gap: 'var(--spacing-gap-400)',
            padding: 'var(--spacing-padding-800)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px dashed var(--border-default)',
            backgroundColor: 'var(--background-surface-raised)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span
            style={{
              color: 'var(--content-secondary)',
              fontSize: TYPE.data.fontSize,
              fontWeight: 500,
              letterSpacing: '0.5px',
              lineHeight: 1.4,
              textTransform: 'uppercase',
            }}
          >
            Placeholder for sample scan
          </span>

          <p
            className="w-full"
            style={{
              color: 'var(--content-default)',
              fontSize: TYPE.title.fontSize,
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            {brand}&rsquo;s report will appear here
          </p>

          <p
            className="w-full"
            style={{
              color: 'var(--content-secondary)',
              fontSize: TYPE.section.fontSize,
              lineHeight: 1.6,
            }}
          >
            It will be similar to our free scan report in layout and structure, and the right rail
            will have a CTA for users to now run their own scan.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
