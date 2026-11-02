import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Input, InputHeading } from 'design-system'
import useIsMobile from '../useIsMobile'
import useTypeScale from './typeScale'
import GistNav from './GistNav'
import HeroPattern from './HeroPattern'
import { looksLikeEmail } from './email'

/**
 * Where to send the free scan — the last step before it is revealed.
 *
 * The free path used to end at a report nobody had a way of reaching again:
 * no account, no address, so a scan someone closed was a scan lost, and there
 * was no way to follow up with anyone who ran one.
 *
 * It asks rather than signs up: an address to send a link to, not an account
 * to create. It says so by what it does not ask for — one field, no password,
 * no card — rather than by protesting that the scan is still free, which
 * raises the doubt it is trying to settle.
 *
 * It leads with the reveal rather than the logistics. The earlier copy — "so
 * you can come back to it" — sold a filing convenience at the one moment the
 * reader cares about something else entirely: what the scan found. Naming the
 * result first makes the field the last step to seeing it, not a detour.
 *
 * Placed after the scan has run rather than before it. Asked earlier, the
 * address bought nothing anyone could see yet; asked here it gates the reveal
 * of something already finished, which is the cheapest moment to ask.
 *
 * Mint left, form right. The side is not about where a screen sits in the
 * run: it tracks whether the other pane is alive. Brand and topic put the
 * form on the left because a card on the right answers what you type, and
 * left-to-right is the order cause and effect should read in. Nothing here
 * responds, so there is no order to respect and the screen follows the
 * static-artwork half of the flow — auth, check email, confirm scope, demo,
 * checkout. Flipped this to form-left once on the "it is inside the run"
 * argument; that rule is not what the screens encode, and it was reverted.
 */

const EASE = [0.16, 1, 0.3, 1] as const
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

export default function GeoScanEmailScreen({
  onContinue,
}: {
  onContinue?: (email: string) => void
} = {}) {
  const mobile = useIsMobile()
  /** Sizes off the shared ramp — see `typeScale`. These were the design
   *  system's tokens read directly, which are fixed at every width; the ramp
   *  resolves to the same tokens on a desktop and adds the stops below. */
  const TYPE = useTypeScale()
  const [email, setEmail] = useState('')
  const ready = looksLikeEmail(email)

  const submit = () => {
    if (ready) onContinue?.(email.trim())
  }

  return (
    <div
      data-scanemail="frame"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: 'var(--background-surface-page)' }}
    >
      <GistNav action="login" />

      <div className={`band-split flex min-h-0 w-full flex-1 ${mobile ? 'flex-col' : ''}`}>
        {/* Not on a phone at all.
            The pattern inside was already desktop-only, so what stacked above
            the form was an 80px band of mint with nothing in it — the padding
            and no content. A decorative half that cannot show its decoration
            is not a half, it is a strip of colour in the way of the form. */}
        {!mobile && (
          <div
            className="relative flex w-1/2 shrink-0 items-center justify-center overflow-hidden"
            style={{ backgroundColor: 'var(--brand-mint)' }}
          >
            <HeroPattern />
          </div>
        )}

        <div
          className={`flex shrink-0 justify-center overflow-y-auto ${mobile ? 'w-full px-6' : 'w-1/2'}`}
        >
          <motion.form
            data-scanemail="form"
            className="my-auto flex flex-col items-start self-start"
            style={{
              width: '100%',
              maxWidth: mobile ? 'none' : COL_MAX,
              paddingInline: mobile ? 0 : COL_PAD_X,
              paddingBlock: 48,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
          >
            {/* 36, not the 48 the brand and topic steps run at. Tried to
                match and it read as shouting: those two ask a question with a
                choice under it, this one is a short aside before a single
                field, and at 48 the headline outweighed everything below it. */}
            <p
              className="w-full"
              style={{
                color: 'var(--content-default)',
                fontSize: TYPE.title.fontSize,
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              Your results are ready
            </p>
            <p
              className="w-full"
              style={{
                marginTop: 'var(--spacing-gap-400)',
                color: 'var(--content-secondary)',
                fontSize: TYPE.section.fontSize,
                lineHeight: 1.6,
              }}
            >
              Enter your email and see them now. We&rsquo;ll also send a copy to your inbox.
            </p>

            {/* Labelled like the brand and topic steps. Without it the 40 above
                lands straight on a filled field and reads as a hole — the gap
                is the same one those screens use, but there it introduces a
                label rather than abutting an input. */}
            <div
              className="flex w-full flex-col items-start"
              style={{ marginTop: 'var(--spacing-gap-800)', gap: 'var(--spacing-gap-300)' }}
            >
              {/* InputHeading rather than a hand-rolled label: it is the
                  system's paired label for a field, and `medium` is the size
                  whose type matches what this screen was already drawing. */}
              {/* Not "Work email". The flow opens by asking whether you are a
                  brand, publisher, creator or agency, and then a corporate
                  address is the only kind the field admits — the door
                  contradicts the persona picker two screens earlier. */}
              <InputHeading htmlFor="scan-email" size="medium">
                Email
              </InputHeading>
              {/* Primary (outlined): the system's default for a standalone
                  field on a plain surface. Secondary is for a busy or textured
                  one, which this column is not. Large because the field is the
                  screen's single prominent control, and it matches the 48 of
                  the button under it. */}
              <Input
                id="scan-email"
                data-scanemail="email"
                type="primary"
                size="large"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              data-scanemail="continue"
              disabled={!ready}
              // 24, matching the auth screen — the other place in this flow
              // that is one field and one primary button. At 16 the two read
              // as a single welded control rather than "fill this in, then go".
              style={{ width: '100%', marginTop: 'var(--spacing-gap-600)' }}
            >
              Show my results
            </Button>
          </motion.form>
        </div>

      </div>
    </div>
  )
}
