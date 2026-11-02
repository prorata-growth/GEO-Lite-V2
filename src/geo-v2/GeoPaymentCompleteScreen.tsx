import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Input, InputHeading } from 'design-system'
import useIsMobile from '../useIsMobile'
import GistNav from './GistNav'
import HeroPattern from './HeroPattern'

/**
 * Payment complete — Figma node 2001:16215.
 * Booking confirmed — Figma node 2091:27219.
 *
 * One screen, two endings, because they're the same shape: a confirmation panel
 * on the photo and a "what happens next" column beside it.
 *
 *   'paid'    after checkout. The phone capture is the reviewer's note — the
 *             report takes minutes, so email alone isn't enough; someone who
 *             closes the tab needs a way back in.
 *   'scope'   after checkout on the upgrade path, where the brand and topic
 *             still have to be confirmed. Nothing is generating yet, so the
 *             wait, the phone capture and the "on the way" line would all be
 *             lies — the receipt stands on its own and hands over to the
 *             confirmation screen.
 *   'generating' after the upgrade path has confirmed its brand and topic.
 *             Same wait as 'paid', but the stamp no longer says "Payment
 *             complete" — that was two screens ago, and repeating it would
 *             report the same event twice.
 *   'booked'  after picking a slot. Nothing to wait for, so the phone block
 *             gives way to a single add-to-calendar action.
 */

const EASE = [0.16, 1, 0.3, 1] as const

const PAGE_BG = 'var(--background-surface-page)'

const PANEL_W = 428
const COL_W = 450
const MUTED = 'var(--content-secondary)'
const EMAIL = 'axlrose@gnr.com'

function CheckCircle() {
  return (
    <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden>
      <circle cx="20" cy="20" r="17" fill="none" stroke="var(--content-status-success)" strokeWidth="2.5" />
      <path
        d="M12.5 20.5l5 5 10-11"
        fill="none"
        stroke="var(--content-status-success)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type Variant = 'paid' | 'scope' | 'generating' | 'booked'

const COPY: Record<Variant, { kicker: string; stamp: string; headline: string; nav: 'signout' | 'login' }> = {
  paid: {
    kicker: 'GEO Deep Analysis',
    stamp: 'Payment complete',
    headline: 'Your report is on the way!',
    // they've bought, so they're signed in
    nav: 'signout',
  },
  scope: {
    kicker: 'GEO Deep Analysis',
    stamp: 'Payment complete',
    headline: 'Next, check what we’ll run',
    nav: 'signout',
  },
  generating: {
    kicker: 'GEO Deep Analysis',
    stamp: 'Report generating',
    headline: 'Your report is on the way!',
    nav: 'signout',
  },
  booked: {
    kicker: '20 minute walkthrough',
    stamp: 'You’re booked',
    headline: 'Thursday 6 March, 10:30 am',
    // a sales booking happens before any account exists
    nav: 'login',
  },
}

/** How long the report "takes" before it's ready. Long enough that the wait is
 *  real, short enough that nobody demoing this has to sit through it. */
const GENERATE_MS = 6000

export default function GeoPaymentCompleteScreen({
  variant = 'paid',
  onViewReport,
  onConfirmScope,
  onHome,
}: {
  variant?: Variant
  onViewReport?: () => void
  /** Only the 'scope' variant: on to the brand and topic confirmation. */
  onConfirmScope?: () => void
  onHome?: () => void
}) {
  const mobile = useIsMobile()
  const [phone, setPhone] = useState('')
  const [ready, setReady] = useState(false)
  const [texting, setTexting] = useState(false)
  const copy = COPY[variant]
  const booked = variant === 'booked'
  /** Paid, but the run hasn't been scoped yet. */
  const scoped = variant === 'scope'

  // The screen promises a report in a few minutes, so it has to actually
  // deliver one — otherwise this is where the whole paid path stops.
  useEffect(() => {
    if (booked || scoped) return
    const t = window.setTimeout(() => setReady(true), GENERATE_MS)
    return () => window.clearTimeout(t)
  }, [booked, scoped])

  return (
    <div
      data-paid="frame"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: PAGE_BG }}
    >
      <GistNav action={copy.nav} />

      <div data-paid="body" className={`band-split flex min-h-0 w-full flex-1 ${mobile ? 'flex-col' : ''}`}>
        {/* ─── left: confirmation on the photo ───────────────── */}
        <div
          data-paid="confirm-half"
          className={`relative flex shrink-0 items-center justify-center overflow-hidden ${
            mobile ? 'w-full px-6 py-10' : 'w-1/2'
          }`}
          style={{ backgroundColor: 'var(--brand-mint)' }}
        >
          {/* behind the card, same placement as the bare halves */}
          {!mobile && <HeroPattern />}
                    <motion.div
            data-paid="panel"
            className="relative flex shrink-0 flex-col items-center rounded-[16px] px-6"
            style={{
              width: mobile ? '100%' : PANEL_W,
              paddingTop: 52,
              paddingBottom: 52,
              backgroundColor: 'var(--background-surface-raised)',
              border: '1px solid var(--border-default)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex flex-col items-center" style={{ gap: 10 }}>
              <CheckCircle />
              <p
                className="text-center text-[36px] font-semibold whitespace-nowrap text-[var(--content-default)]"
                style={{ lineHeight: 1.2 }}
              >
                {/* "Payment complete" stays true once it has happened, but
                    "Report generating" stops being true the moment the wait
                    ends — the headline already flips and the stamp was left
                    contradicting it. */}
                {variant === 'generating' && ready ? 'Report ready' : copy.stamp}
              </p>
            </div>
            {/* the label reads as a caption to the stamp, so it follows it */}
            <p
              className="mt-8 text-[16px] font-medium text-[var(--content-default)]"
              style={{ lineHeight: 1.15 }}
            >
              {copy.kicker}
            </p>
          </motion.div>
        </div>

        {/* ─── right: what happens next ──────────────────────── */}
        <div
          data-paid="next-half"
          className={`flex shrink-0 items-center justify-center overflow-y-auto ${
            mobile ? 'w-full px-6 py-10' : 'w-1/2'
          }`}
        >
          <motion.div
            data-paid="next"
            className="flex flex-col items-start"
            style={{ width: mobile ? '100%' : COL_W }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          >
            <p
              className="w-full text-[36px] font-medium text-[var(--content-default)]"
              style={{ lineHeight: 1.13, letterSpacing: '0.72px' }}
            >
              {!booked && !scoped && ready ? 'Your report is ready.' : copy.headline}
            </p>
            <p className="mt-[22px] w-full text-[18px] text-[var(--content-default)]" style={{ lineHeight: 1.6 }}>
              {booked ? (
                <>
                  We&rsquo;ve emailed a calendar invite to <span className="font-semibold">{EMAIL}</span>. You
                  can reschedule or cancel from that invite any time.
                </>
              ) : scoped ? (
                <>
                  We&rsquo;ll use the brand and topic from your Free Scan. You can change either one before
                  the run starts.
                </>
              ) : (
                <>
                  {ready ? (
                    <>
                      We&rsquo;ve mailed it to <span className="font-semibold">{EMAIL}</span> — or open it
                      here.
                    </>
                  ) : (
                    <>
                      Please allow a few minutes for your report to be generated. We will mail it to{' '}
                      <span className="font-semibold">{EMAIL}</span>.
                    </>
                  )}
                </>
              )}
            </p>

            {/* 18 on top of the 22 above gives a 40 break, so this reads as a
                separate optional step rather than a third paragraph */}
            <div className="flex w-full flex-col items-start" style={{ marginTop: 18, gap: 24 }}>
              {!booked && !scoped && !ready && (
                <div className="flex w-full flex-col items-start gap-2">
                  <InputHeading htmlFor="paid-phone">Phone number (optional)</InputHeading>
                  {/* Primary per the Input rules — a plain surface, not a
                      textured one. Medium stays: this is a standard form
                      field, not the screen's prominent control. */}
                  <Input
                    id="paid-phone"
                    type="primary"
                    size="medium"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              )}

              <div className="flex w-full flex-col items-start" style={{ gap: 12 }}>
                {/* secondary on purpose: they've already paid, nothing more is required */}
                {/* Once it's ready the primary action is the report itself;
                    until then it's the reminder, because there is nothing else
                    to do. Neither state leaves the screen without an exit. */}
                {scoped ? (
                  <Button
                    type="primary"
                    size="large"
                    data-paid="scope"
                    onClick={onConfirmScope}
                    style={{ width: '100%' }}
                  >
                    Continue
                  </Button>
                ) : !booked && ready ? (
                  <Button
                    type="primary"
                    size="large"
                    data-paid="view"
                    onClick={onViewReport}
                    style={{ width: '100%' }}
                  >
                    View your Deep Analysis
                  </Button>
                ) : (
                  <Button
                    type="secondary"
                    size="large"
                    data-paid="notify"
                    onClick={() => (booked ? undefined : setTexting(true))}
                    disabled={texting}
                    style={{ width: '100%' }}
                  >
                    {booked ? 'Add to calendar' : texting ? 'We’ll text you' : 'Text me when it’s ready'}
                  </Button>
                )}

                {/* only when there is in fact a report to go back to */}
                {booked && onHome && (
                  <Button
                    type="ghost"
                    size="large"
                    data-paid="home"
                    onClick={onHome}
                    style={{ width: '100%' }}
                  >
                    Back to your report
                  </Button>
                )}

                {!booked && !scoped && !ready && (
                  <p className="w-full text-[16px]" style={{ lineHeight: 1.4, color: MUTED }}>
                    You can close this window &mdash; we&rsquo;ll text you a link as soon as your report is
                    ready.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
