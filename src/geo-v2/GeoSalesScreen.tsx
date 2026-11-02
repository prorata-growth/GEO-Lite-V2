import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button, ChoiceChip, DateChip, IconButton, Input, InputHeading } from 'design-system'
import useIsMobile from '../useIsMobile'
import useLayoutMode from './useLayoutMode'
import useTypeScale from './typeScale'
import GistNav from './GistNav'
import HeroPattern from './HeroPattern'
import { looksLikeEmail } from './email'

/**
 * Talk to sales / book a walkthrough — Figma node 2086:15856.
 *
 * Same split as the auth screens: blurred photo left with a translucent panel
 * over it, a 450 column right. The right column is a slot picker rather than a
 * form, so the day chips and time slots borrow the brand screen's pill
 * treatment — mint fill, 2px page-coloured stroke sitting outside, and a mint
 * ring beyond that. Copying only the mint fill loses the lift.
 *
 * Days and slots are static, matching the mock. The chevrons move a week at a
 * time; prev is inert on the first week because you can't book backwards.
 *
 * The photo already carries Figma's LAYER_BLUR 12 in the export, so no CSS blur
 * is applied here — adding one would blur it twice.
 */

const EASE = [0.16, 1, 0.3, 1] as const

const PAGE_BG = 'var(--background-surface-page)'
const MUTED = 'var(--content-secondary)'
/** Floor between the bar and the column; the column is centred, not placed. */
const CONTENT_MIN_GAP = 48

/* ── from the design ────────────────────────────────────────── */
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
/**
 * What the panel half keeps between its card and its own edges, and what the
 * card keeps inside itself.
 *
 * The gutter exists because centring gives a card no margin of its own: what
 * sits beside it is whatever is left over — 105px at 1440, 6px at 1024, and
 * negative below that, where the half's `overflow-hidden` starts cutting the
 * card off at the page edge.
 *
 * Both step down in `compact`, because a flat 40 + 48 spends 176px of a 384px
 * half on chrome and leaves the card's own prose running at 26 characters to
 * the line. The gutter is there to stop the card touching the edge, and 24
 * does that as well as 40 does.
 */
const PANEL_GUTTER = { wide: 40, compact: 24 } as const
const PANEL_PAD = { wide: 48, compact: 32 } as const
const PANEL_W = 405 + 48 * 2

const WEEKS = [
  {
    label: 'This week',
    days: [
      { d: 'Tue', n: '4' },
      { d: 'Wed', n: '5' },
      { d: 'Thu', n: '6' },
      { d: 'Fri', n: '7' },
      { d: 'Mon', n: '10' },
    ],
  },
  {
    label: 'Next week',
    days: [
      { d: 'Tue', n: '11' },
      { d: 'Wed', n: '12' },
      { d: 'Thu', n: '13' },
      { d: 'Fri', n: '14' },
      { d: 'Mon', n: '17' },
    ],
  },
]

const SLOTS = ['9:00 am', '9:30 am', '10:00 am', '10:30 am', '2:00 pm', '2:30 pm']

/** The chips are abbreviated; the confirm button spells the day out. */
const FULL_DAY: Record<string, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
}

const SESSION = [
  'Live walkthrough of our product and its features',
  'Guidance on using our reports and recommendations',
]

function Chevron({ dir, muted }: { dir: 'left' | 'right'; muted?: boolean }) {
  return (
    <svg viewBox="0 0 8 13" className="size-3 shrink-0" aria-hidden>
      <path
        d={dir === 'left' ? 'M6.5 1 1 6.5 6.5 12' : 'M1.5 1 7 6.5 1.5 12'}
        fill="none"
        stroke={muted ? MUTED : 'var(--content-default)'}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function GeoSalesScreen({ onConfirm }: { onConfirm?: (email: string) => void }) {
  const mobile = useIsMobile()
  /** Sizes off the shared ramp — see `typeScale`. Line heights stay put. */
  const TYPE = useTypeScale()
  /** `compact` tightens the panel's gutter and padding — see PANEL_GUTTER. */
  const mode = useLayoutMode() === 'wide' ? 'wide' : 'compact'
  const [week, setWeek] = useState(0)
  const [day, setDay] = useState('6')
  const [slot, setSlot] = useState<string | null>('10:30 am')
  const [email, setEmail] = useState('')
  /** +1 stepping forward, -1 back. The row has to enter from the side the new
   *  week came from, or the motion argues with the arrow that caused it. */
  const [dir, setDir] = useState(1)
  const still = useReducedMotion()
  const emailOk = looksLikeEmail(email)

  const days = WEEKS[week].days
  const chosenDay = days.find((d) => d.n === day) ?? days[0]

  const stepWeek = (delta: number) => {
    const next = week + delta
    if (next < 0 || next >= WEEKS.length) return
    setDir(delta)
    setWeek(next)
    // the previous day number doesn't exist in the new week
    setDay(WEEKS[next].days[2].n)
  }

  return (
    <div
      data-sales="frame"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: PAGE_BG }}
    >
      <GistNav action="login" />

      <div data-sales="body" className={`band-split flex min-h-0 w-full flex-1 ${mobile ? 'flex-col' : ''}`}>
        {/* ─── left: what the session is ─────────────────────── */}
        {/* Off on a phone, the same call as the qualify screen's panel.
            It stacked above the picker and made the page 1276px on an 812px
            viewport, so choosing a time — the only thing this screen is for —
            started below the fold. Almost nothing is lost: the picker's own
            headline and standfirst already say what the session is and how
            long it runs, and the session details repeat it. Desktop keeps it,
            beside the picker rather than above it. */}
        {!mobile && (
        <div
          data-sales="pitch-half"
          className="relative flex w-1/2 shrink-0 items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--brand-mint)', paddingInline: PANEL_GUTTER[mode] }}
        >
          {/* behind the card, same placement as the bare halves */}
          <HeroPattern />
                    <motion.div
            data-sales="pitch"
            className="relative flex flex-col items-center rounded-[16px] text-center"
            style={{
              width: '100%',
              maxWidth: PANEL_W,
              padding: PANEL_PAD[mode],
              backgroundColor: 'var(--background-surface-raised)',
              border: '1px solid var(--border-default)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p
              className="w-full font-semibold text-[var(--content-default)]"
              style={{ fontSize: TYPE.title.fontSize, lineHeight: 1.2 }}
            >
              Talk to our sales team.
            </p>
            <p
              className="mt-4 w-full text-[var(--content-default)]"
              style={{ fontSize: TYPE.body.fontSize, lineHeight: 1.4 }}
            >
              Connect with an expert to plan your GEO journey, learn about our offerings and features.
            </p>

            <p
              className="mt-8 w-full font-medium text-[var(--content-default)]"
              style={{ fontSize: TYPE.body.fontSize, lineHeight: 1.4 }}
            >
              Session details:
            </p>
            {SESSION.map((line) => (
              <p
                key={line}
                className="mt-3 w-full text-[var(--content-default)]"
                style={{ fontSize: TYPE.data.fontSize, lineHeight: 1.4 }}
              >
                {line}
              </p>
            ))}
          </motion.div>
        </div>
        )}

        {/* ─── right: the picker ─────────────────────────────── */}
        <div
          data-sales="picker-half"
          className={`flex shrink-0 justify-center overflow-y-auto ${mobile ? 'w-full px-6' : 'w-1/2'}`}
        >
          {/* my-auto, not items-center on the parent: this half scrolls, and
              parent-centring clips the top of anything taller than the viewport */}
          <motion.div
            className="my-auto flex flex-col items-start"
            style={{
              width: '100%',
              maxWidth: mobile ? 'none' : COL_MAX,
              paddingInline: mobile ? 0 : COL_PAD_X,
              paddingTop: mobile ? 40 : CONTENT_MIN_GAP,
              paddingBottom: CONTENT_MIN_GAP,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          >
            {/* Phone only, and for the same reason it is on the qualify
                screen: with the pitch panel gone, this is the orientation the
                panel was providing — which conversation you are booking. */}
            {mobile && (
              <p
                data-sales="eyebrow"
                className="w-full font-medium uppercase"
                style={{
                  color: 'var(--content-secondary)',
                  fontSize: 12,
                  lineHeight: 1.4,
                  letterSpacing: '0.72px',
                  marginBottom: 12,
                }}
              >
                Talk to sales
              </p>
            )}

            <p
              data-sales="headline"
              className="w-full font-medium text-[var(--content-default)]"
              style={{ fontSize: TYPE.title.fontSize, lineHeight: 1.2 }}
            >
              Pick a time
            </p>
            <p
              className="mt-4 w-full text-[var(--content-default)]"
              style={{ fontSize: TYPE.section.fontSize, lineHeight: 1.6 }}
            >
              20 minutes with the Gist GEO team. Times are shown in your timezone.
            </p>

            {/* week nav */}
            <div data-sales="week-nav" className="mt-10 flex w-full items-center justify-between">
              <p
                className="font-medium text-[var(--content-default)]"
                style={{ fontSize: TYPE.body.fontSize, lineHeight: 1.4 }}
              >
                {WEEKS[week].label}
              </p>
              <div className="flex items-center gap-1">
                <IconButton
                  type="tertiary"
                  size="small"
                  shape="square"
                  aria-label="Previous week"
                  disabled={week === 0}
                  onClick={() => stepWeek(-1)}
                  icon={<Chevron dir="left" muted={week === 0} />}
                />
                <IconButton
                  type="tertiary"
                  size="small"
                  shape="square"
                  aria-label="Next week"
                  disabled={week === WEEKS.length - 1}
                  onClick={() => stepWeek(1)}
                  icon={<Chevron dir="right" muted={week === WEEKS.length - 1} />}
                />
              </div>
            </div>

            {/* days */}
            {/*
              A spring rather than a tween, because the overshoot is the point:
              an eased slide that stops dead at its mark reads as a swap, and
              the same slide carried a few pixels past and drawn back reads as
              something with weight that was pushed. Tuned to a damping ratio
              of about 0.75 — one visible overshoot of roughly 5%, no second
              bounce. Anything under ~0.6 starts to wobble and looks like a toy.

              Keyed on the week so React remounts the row and `initial` runs
              again on every step. No exit animation: the outgoing week would
              have to be absolutely positioned to avoid collapsing the row's
              height mid-flight, and a crossfade of two near-identical rows of
              numbers reads as a smear rather than a transition.

              Opacity is deliberately quicker than the travel. Matching them
              makes the tiles appear to fade *into* position, which competes
              with the slide instead of supporting it.
            */}
            <motion.div
              key={week}
              data-sales="days"
              className="mt-6 flex w-full items-stretch gap-2"
              initial={still ? false : { x: dir * 36, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 29,
                mass: 0.9,
                opacity: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {days.map((d) => (
                <DateChip
                  key={d.n}
                  day={d.d}
                  date={String(d.n)}
                  selected={d.n === day}
                  onSelect={() => setDay(d.n)}
                  className="min-w-0 flex-1"
                />
              ))}
            </motion.div>

            {/* slots */}
            <div data-sales="slots" className="mt-6 grid w-full grid-cols-2 gap-2">
              {SLOTS.map((s) => (
                <ChoiceChip
                  key={s}
                  label={s}
                  selected={s === slot}
                  onSelect={() => setSlot(s)}
                  className="w-full"
                />
              ))}
            </div>

            {/* The booking had nowhere to send an invitation to. It sits after
                the time rather than before it: this screen's job is picking a
                slot, and an address asked first is friction in front of the
                thing someone came to do. Asked here it reads as "where does
                this go", which is the only reason it exists.

                Medium, not the large the free scan's step uses — the system
                sizes large for a screen's single prominent field, and this one
                is the fourth control on a busy column. */}
            <div
              className="mt-6 flex w-full flex-col items-start"
              style={{ gap: 'var(--spacing-gap-300)' }}
            >
              {/* Not "Work email" — the flow sells to creators and agencies
                  too, so the door should not assume a company domain. */}
              <InputHeading htmlFor="sales-email" size="medium">
                Email
              </InputHeading>
              <Input
                id="sales-email"
                data-sales="email"
                type="primary"
                size="medium"
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
              data-sales="confirm"
              disabled={!slot || !emailOk}
              onClick={() => onConfirm?.(email.trim())}
              className="mt-8"
              style={{ width: '100%' }}
            >
              {slot ? `Confirm ${FULL_DAY[chosenDay.d]}, ${slot}` : 'Pick a time'}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
