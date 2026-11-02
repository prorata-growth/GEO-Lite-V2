import { motion } from 'framer-motion'
import { Button } from 'design-system'
import useIsMobile from '../useIsMobile'
import useTypeScale from './typeScale'
import GistNav from './GistNav'

/**
 * Where "Start 7 days free" lands — deliberately blank.
 *
 * The trial opens the platform's own in-product onboarding, which is a
 * different surface with its own design and isn't part of this prototype.
 * Routing the button at a real screen from this flow would have been a guess
 * dressed up as a design, and leaving it pointing back at the front door said
 * the trial does nothing. A marked placeholder says the true thing: the click
 * works, and what it opens lives elsewhere.
 *
 * Dashed so nobody reviewing the flow mistakes it for a screen anyone
 * designed — the border carries that, without a label saying it out loud.
 */

const EASE = [0.16, 1, 0.3, 1] as const

export default function GeoOnboardingScreen({ onBack }: { onBack?: () => void } = {}) {
  const mobile = useIsMobile()
  /** Sizes off the shared ramp — see `typeScale`. These were the design
   *  system's tokens read directly, which are one fixed size at every width. */
  const TYPE = useTypeScale()

  return (
    <div
      data-onboarding="frame"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: 'var(--background-surface-page)' }}
    >
      {/* the trial starts from inside an account, so the bar is signed in */}
      <GistNav action="signout" />

      <div className="flex min-h-0 w-full flex-1 items-center justify-center" style={{ padding: 24 }}>
        <motion.div
          data-onboarding="note"
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
          <p
            className="w-full"
            style={{
              color: 'var(--content-default)',
              fontSize: TYPE.title.fontSize,
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Product onboarding starts here
          </p>

          <p
            className="w-full"
            style={{
              color: 'var(--content-secondary)',
              fontSize: TYPE.section.fontSize,
              lineHeight: 1.6,
            }}
          >
            The trial is live from this point. Setting up daily tracking happens inside the product,
            which is its own surface and isn&rsquo;t part of this prototype.
          </p>

          {/* an exit, so the flow can be walked without reloading */}
          {onBack && (
            <Button type="secondary" size="large" data-onboarding="back" onClick={onBack}>
              Back to the report
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  )
}
