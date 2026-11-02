import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from 'design-system'
import useIsMobile from '../useIsMobile'
import useTypeScale from './typeScale'
import GistNav from './GistNav'
import HeroPattern from './HeroPattern'

/**
 * "Check your email" — the second half of passwordless sign-in.
 *
 * There is no password, so there is nothing to forget and no reset flow to
 * design; this one screen covers first sign-up, returning sign-in and every
 * "I'm locked out" case, which is the whole reason for choosing magic links.
 *
 * Resend is rate-limited on purpose. A button that can be hammered is a button
 * that looks broken when the first mail is merely slow, so it disables itself
 * and counts back — the wait is the feedback.
 *
 * `onOpenLink` stands in for clicking the link in the mail. It exists so the
 * prototype is walkable end to end; a real build would land on a callback URL.
 */

const EASE = [0.16, 1, 0.3, 1] as const
const PAGE_BG = 'var(--background-surface-page)'
/**
 * The form column's measure, and what it keeps clear of its half's edges.
 *
 * `COL_W` was a width, so it was also a floor: once the half it sits in
 * dropped below 450 the column simply became the half, and the copy ran from
 * one edge of the pane to the other with no margin. As a maximum with padding
 * it takes the width it is given, stops at 450, and never touches the sides.
 */
const COL_W = 450
const COL_PAD_X = 32
/**
 * The column's outer cap: its measure plus the gutter, not its measure.
 *
 * `maxWidth: COL_W` with padding inside it was subtracting the gutter from
 * the text — 450 became 386, and on the sample screen that put the headline
 * 3px over and broke "Sample brand and topic" onto two lines. The gutter is
 * there to keep the column off the pane's edges when the half is narrow; it
 * was never meant to cost the copy 64px at every width.
 */
const COL_MAX = COL_W + COL_PAD_X * 2
const CONTENT_MIN_GAP = 48
const MUTED = 'var(--content-secondary)'
const RESEND_LOCK_S = 30

/**
 * Sizes come off the shared ramp — see `typeScale`, whose `wide` column is the
 * design system's own type tokens. Only the size is taken: each call site
 * keeps the line height it already had, because those were set against this
 * screen's copy and the point here is to add the stops the ramp has and this
 * screen did not, not to restyle it.
 */
export default function GeoCheckEmailScreen({
  email,
  onOpenLink,
  onChangeEmail,
}: {
  email?: string
  onOpenLink?: () => void
  onChangeEmail?: () => void
}) {
  const mobile = useIsMobile()
  const TYPE = useTypeScale()
  const [left, setLeft] = useState(RESEND_LOCK_S)
  const [sent, setSent] = useState(1)

  useEffect(() => {
    if (left <= 0) return
    const t = window.setTimeout(() => setLeft((n) => n - 1), 1000)
    return () => window.clearTimeout(t)
  }, [left])

  const address = email?.trim() || 'your inbox'

  const body = (
    <div
      className="flex w-full flex-col items-start"
      style={{
        width: '100%',
        maxWidth: mobile ? 'none' : COL_MAX,
        paddingInline: mobile ? 0 : COL_PAD_X,
        paddingBlock: CONTENT_MIN_GAP,
      }}
    >
      <motion.div
        data-checkemail="heading"
        className="flex w-full flex-col items-start text-[var(--content-default)]"
        style={{ gap: 16 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        <p className="w-full font-medium" style={{ ...TYPE.title, lineHeight: 1.2 }}>
          Check your email
        </p>
        <p className="w-full" style={{ fontSize: TYPE.section.fontSize, lineHeight: 1.6 }}>
          We sent a sign-in link to <span className="font-medium">{address}</span>. It expires in 15 minutes.
        </p>
      </motion.div>

      <motion.div
        className="flex w-full flex-col items-stretch"
        style={{ marginTop: 32, gap: 12 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
      >
        {/* stands in for the link in the mail, so the prototype stays walkable */}
        <Button
          type="primary"
          size="large"
          data-checkemail="open"
          onClick={onOpenLink}
          style={{ width: '100%' }}
        >
          Open the link
        </Button>

        <Button
          type="secondary"
          size="large"
          data-checkemail="resend"
          disabled={left > 0}
          onClick={() => {
            setSent((n) => n + 1)
            setLeft(RESEND_LOCK_S)
          }}
          style={{ width: '100%' }}
        >
          {left > 0 ? `Resend in ${left}s` : 'Resend the link'}
        </Button>

        <p className="w-full" style={{ fontSize: TYPE.data.fontSize, color: MUTED, lineHeight: 1.5, marginTop: 4 }}>
          {sent > 1 && `Sent ${sent} times. `}
          Not seeing it? Check spam, or{' '}
          <button
            type="button"
            data-checkemail="change"
            onClick={onChangeEmail}
            className="font-medium"
            style={{ color: 'var(--content-default)', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            use a different address
          </button>
          .
        </p>
      </motion.div>
    </div>
  )

  if (mobile) {
    return (
      <div
        data-checkemail="frame"
        className="flex min-h-screen w-full flex-col"
        style={{ backgroundColor: PAGE_BG }}
      >
        <GistNav action="none" />
        {/* The same band as the login screen's, deliberately identical.
            This was a bare 180px block of flat mint — the pattern was
            desktop-only here, so the phone got the placeholder and none of
            the thing it stood for. That was fixed on the login screen and
            missed on this one, which is the screen directly after it in the
            same flow; the two arriving in different shapes was the bug.

            The height and both artwork knobs are copied rather than re-tuned:
            they were set by eye against the Figma reference, and a second set
            of eyeballed numbers for a band 80px shorter would be a new guess
            and a second thing to keep in sync. `brand/mint` because this
            ground is decoration, not functional UI. */}
        <motion.div
          data-checkemail="photo"
          className="relative h-[260px] w-full shrink-0 overflow-hidden"
          style={{ backgroundColor: 'var(--brand-mint)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <HeroPattern size={560} offsetY={90} />
        </motion.div>
        <div className="flex w-full flex-1 justify-center px-6">{body}</div>
      </div>
    )
  }

  return (
    <div
      data-checkemail="frame"
      className="flex h-screen w-full flex-col overflow-hidden"
      style={{ backgroundColor: PAGE_BG }}
    >
      <GistNav action="none" />
      <div className="band-split flex min-h-0 w-full flex-1">
        <div
          data-checkemail="photo-half"
          className="relative w-1/2 shrink-0 overflow-hidden"
          style={{ backgroundColor: 'var(--brand-mint)' }}
        >
          <HeroPattern />
        </div>
        <div className="flex w-1/2 shrink-0 justify-center overflow-y-auto">
          <div className="my-auto">{body}</div>
        </div>
      </div>
    </div>
  )
}
