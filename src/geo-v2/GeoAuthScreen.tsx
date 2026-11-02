import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Input } from 'design-system'
import useIsMobile from '../useIsMobile'
import useTypeScale from './typeScale'
import GistNav from './GistNav'
import HeroPattern from './HeroPattern'
import googleMask from '../assets/geo-auth/google-mask.svg'
import googleGlyph from '../assets/geo-auth/google-glyph.svg'

/**
 * The two account screens — Figma 1859:22965 (demo) and 1859:22821 (login).
 *
 * One layout, two variants: they differ only in the copy and
 * whether the form asks for a name. Everything else — the ruled bar, the exact
 * half split, the 450px form, the OR divider, the Google button — is shared.
 *
 * The split is a plain 50/50 rather than a scaled stage: the panel has to bleed
 * to the window's edge, and the form is a fixed 450 centred in its half.
 */

const EASE = [0.16, 1, 0.3, 1] as const

/* ── revised chrome, shared with the rest of the flow ────────── */
const PAGE_BG = 'var(--background-surface-page)'
/** The form column, centred in its half. */
/**
 * The form column's measure.
 *
 * A width, so it was also a floor: once the half it sits in dropped below 450
 * the column simply became the half, and the copy ran from one edge of the
 * pane to the other with no margin at all — at 776 the heading and the
 * standfirst spanned the full 388 and the sentence broke to a one-word last
 * line. It reads as text with nowhere to sit rather than as a column.
 *
 * Paired with `COL_PAD_X` below it is a maximum instead: the column takes the
 * width it is given, stops at 450, and never touches the sides.
 */
const COL_W = 450
/** What the column keeps clear of its half's edges when it cannot have 450. */
const COL_PAD_X = 32
/** Floor between the bar and the content; the column is centred, not placed. */
const CONTENT_MIN_GAP = 48

type Variant = 'demo' | 'login'

const VARIANTS: Record<
  Variant,
  {
    heading: React.ReactNode
    sub: string
    fields: string[]
    /** Heading block → form. The login frame opens this up a little. */
    formGap: number
  }
> = {
  demo: {
    heading: (
      <>
        Can we partner to
        <br />
        improve your visibility?
      </>
    ),
    sub: 'Schedule a 20 minute conversation with us.',
    fields: ['First name', 'Last name', 'Enter your email'],
    formGap: 16,
  },
  login: {
    heading: 'Welcome to Gist GEO',
    sub: 'Sign in or create a new account. We’ll email you a link.',
    fields: ['Enter your email'],
    formGap: 21,
  },
}

function Field({
  placeholder,
  value: outer,
  onChange,
}: {
  placeholder: string
  value?: string
  onChange?: (v: string) => void
}) {
  const [inner, setInner] = useState('')
  // controlled when the screen needs the value, uncontrolled otherwise
  const value = outer ?? inner
  const setValue = (v: string) => (onChange ? onChange(v) : setInner(v))
  return (
    <Input
      // Primary and large per the system's Input rules: primary (outlined) is
      // the default for a standalone field on a plain surface, and large is
      // what it prescribes for a prominent standalone field — it names an auth
      // screen as the example. The Figma frame draws these at 40; the rules
      // win, and the frame is the thing to update.
      type="primary"
      size="large"
      className="max-w-[900px]"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
    />
  )
}

/** Figma exports this as a glyph behind an alpha mask, so it's kept that way —
 *  the glyph on its own carries a blur filter and doesn't read as the G. */
function GoogleMark() {
  return (
    <span className="relative size-6 shrink-0 overflow-clip">
      <span
        className="absolute inset-0 block"
        style={{
          maskImage: `url("${googleMask}")`,
          WebkitMaskImage: `url("${googleMask}")`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskSize: '24px 24px',
          WebkitMaskSize: '24px 24px',
        }}
      >
        <img src={googleGlyph} alt="" className="block size-full max-w-none" />
      </span>
    </span>
  )
}

export default function GeoAuthScreen({
  variant,
  onContinue,
}: {
  variant: Variant
  /** Carries the address forward — the next screen has to name it. */
  onContinue?: (email: string) => void
}) {
  const v = VARIANTS[variant]
  const mobile = useIsMobile()
  /** Sizes off the shared ramp — see `typeScale`. The two branches below each
   *  render in one mode only, so a single step resolves correctly in both. */
  const TYPE = useTypeScale()
  const [email, setEmail] = useState('')
  const isEmail = (f: string) => f.toLowerCase().includes('email')

  /* ── phones: one column, the panel above the form ──────────── */
  if (mobile) {
    return (
      <div
        data-auth="frame"
        data-auth-mobile="true"
        className="relative flex min-h-screen w-full flex-col"
        style={{ backgroundColor: PAGE_BG }}
      >
        {/* The bar, not a bare logo floated over the corner. Same component and
            the same action rule as the desktop branch, so the two layouts do
            not disagree about whether this screen offers a way to log in. */}
        <GistNav action="login" />

        {/* Full bleed, and carrying the artwork. It was an inset rounded block
            of flat mint with nothing in it — the pattern was desktop-only, so
            the phone got the placeholder and none of the thing it stood for. */}
        <motion.div
          data-auth="photo"
          className="relative h-[260px] w-full shrink-0 overflow-hidden"
          style={{ backgroundColor: 'var(--brand-mint)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Two knobs, both tuned by eye against the Figma reference. 560
              keeps the dense green middle of the artwork in the band; the lift
              brings the void down into it. Larger sizes, or the desktop
              offsets scaled down, land on the pale outer disc instead. */}
          <HeroPattern size={560} offsetY={90} />
        </motion.div>

        <motion.div
          data-auth="heading"
          className="mt-10 flex shrink-0 flex-col items-center px-6 text-center text-[var(--content-default)]"
          style={{ gap: 12 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <p
            className="font-medium"
            style={{ fontSize: TYPE.title.fontSize, lineHeight: 1.2, letterSpacing: '0.56px' }}
          >
            {v.heading}
          </p>
          {/* `section`, not `body`. Every other screen in the flow sets its
              standfirst at this step — check-email, scan-email, scope, qualify,
              sales, plans, onboarding, sample — and this phone branch was the
              one built at a smaller size before there was a ramp to be
              consistent with. Read back to back, the sign-in line looked
              quieter than the "we sent you a link" line that follows it. */}
          <p style={{ fontSize: TYPE.section.fontSize, lineHeight: 1.5 }}>
            {v.sub}
          </p>
        </motion.div>

        <motion.div
          data-auth="form"
          className="mt-8 flex w-full flex-col items-start px-6 pb-12"
          style={{ gap: 28 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
        >
          <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 16 }}>
            {/* Same wiring as the desktop branch below: without it the email
                field is uncontrolled here, Continue fires with an empty
                string, and the check-your-email screen has no address to name. */}
            {v.fields.map((f) => (
              <Field
                key={f}
                placeholder={f}
                {...(isEmail(f) ? { value: email, onChange: setEmail } : {})}
              />
            ))}
            <Button
              type="primary"
              size="large"
              data-auth="continue"
              onClick={() => onContinue?.(email)}
              style={{ width: '100%' }}
            >
              Continue
            </Button>
          </div>

          <div className="flex w-full shrink-0 items-center" style={{ gap: 16 }}>
            <span className="h-px min-w-px flex-1 bg-[var(--border-default)]" />
            <p
              className="shrink-0 text-[var(--content-secondary)]"
              style={{ fontSize: TYPE.body.fontSize }}
            >
              OR
            </p>
            <span className="h-px min-w-px flex-1 bg-[var(--border-default)]" />
          </div>

          <Button
            type="tertiary"
            size="large"
            data-auth="google"
            leadingIcon={<GoogleMark />}
            style={{ width: '100%' }}
          >
            Sign up with Google
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      data-auth="frame"
      className="flex h-screen w-full flex-col overflow-hidden"
      style={{ backgroundColor: PAGE_BG }}
    >
      <GistNav action="login" />

      <div data-auth="body" className="band-split flex min-h-0 w-full flex-1">
        {/* Explicit halves, not flex-1: the form's fixed 450 gave the right side
            a floor the left couldn't push back against, so the split drifted. */}
        {/* Photo grounds are out of the prototype for now; `surface/sunken` is
            the role for a panel that sits beneath raised content. */}
        <div
          data-auth="photo-half"
          className="relative w-1/2 shrink-0 overflow-hidden"
          style={{ backgroundColor: 'var(--brand-mint)' }}
        >
          <HeroPattern />
        </div>

        <div
          data-auth="form-half"
          className="flex w-1/2 shrink-0 justify-center overflow-y-auto"
          style={{ paddingInline: COL_PAD_X }}
        >
          {/* my-auto rather than items-center on the parent: this half scrolls,
              and centring via the parent clips the top of anything taller than
              the viewport. The padding is a floor so it never meets the bar. */}
          <div
            className="my-auto flex flex-col items-start"
            style={{
              width: '100%',
              maxWidth: COL_W,
              paddingTop: CONTENT_MIN_GAP,
              paddingBottom: CONTENT_MIN_GAP,
            }}
          >
            <motion.div
              data-auth="heading"
              className="flex w-full shrink-0 flex-col items-start text-[var(--content-default)]"
              style={{ gap: 16 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <p
                className="w-full shrink-0 font-medium"
                // H2 desktop is 1.13; 1.4 was leaving 50px between two lines
                style={{ fontSize: TYPE.title.fontSize, lineHeight: 1.13, letterSpacing: '0.72px' }}
              >
                {v.heading}
              </p>
              <p className="w-full shrink-0" style={{ fontSize: TYPE.section.fontSize, lineHeight: 1.6 }}>
                {v.sub}
              </p>
            </motion.div>

            <motion.div
              data-auth="form"
              className="flex w-full flex-col items-start"
              style={{ marginTop: v.formGap, gap: 43 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            >
              <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 24 }}>
                {v.fields.map((f) => (
                  <div key={f} className="flex w-full shrink-0 flex-col items-start gap-2">
                    <Field placeholder={f} {...(isEmail(f) ? { value: email, onChange: setEmail } : {})} />
                  </div>
                ))}

                <Button
                  type="primary"
                  size="large"
                  data-auth="continue"
                  onClick={() => onContinue?.(email)}
                  style={{ width: '100%' }}
                >
                  Continue
                </Button>
              </div>

              <div className="flex w-full shrink-0 items-center justify-center" style={{ gap: 16 }}>
                <span className="h-px min-w-px flex-1 bg-[var(--border-default)]" />
                <p
                  className="shrink-0 text-center whitespace-nowrap text-[var(--content-secondary)]"
                  style={{ fontSize: TYPE.body.fontSize, lineHeight: 1.6 }}
                >
                  OR
                </p>
                <span className="h-px min-w-px flex-1 bg-[var(--border-default)]" />
              </div>

              <Button
                type="tertiary"
                size="large"
                data-auth="google"
                leadingIcon={<GoogleMark />}
                style={{ width: '100%' }}
              >
                Sign up with Google
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
