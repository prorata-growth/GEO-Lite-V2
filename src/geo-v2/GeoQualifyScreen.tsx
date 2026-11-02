import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, ChoiceChip } from 'design-system'
import useIsMobile from '../useIsMobile'
import useLayoutMode from './useLayoutMode'
import useTypeScale from './typeScale'
import GistNav from './GistNav'
import HeroPattern from './HeroPattern'
import { ENTERPRISE_SCOPE } from './GeoPlansScreen'

/**
 * Enterprise qualification — the step before the slot picker.
 *
 * "Contact sales" and "Get a demo" used to land on the identical 20-minute
 * booking screen, which quietly said the two conversations are the same one.
 * They aren't: a demo is a walkthrough, enterprise is a scoping call, and the
 * difference is the three answers below. Asking for them is also what makes
 * the price legible — enterprise is quoted off the shape of what you run,
 * which is what these three answers establish.
 *
 * Every question is a choice rather than a text field: three taps is a form
 * someone finishes on the way to booking, and it gives sales something
 * structured instead of prose.
 */

const EASE = [0.16, 1, 0.3, 1] as const
const PAGE_BG = 'var(--background-surface-page)'
const INK = 'var(--content-default)'
const MUTED = 'var(--content-secondary)'
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
const CONTENT_MIN_GAP = 48

const QUESTIONS = [
  { key: 'brands', label: 'How many brands are you tracking?', options: ['One', '2–5', '6–20', '20+'] },
  { key: 'topics', label: 'How many topics?', options: ['One', 'A handful', 'Dozens', 'Not sure yet'] },
  {
    key: 'team',
    label: 'Who needs access?',
    options: ['Just me', 'A team', 'Multiple teams', 'Clients too'],
  },
] as const

export default function GeoQualifyScreen({ onContinue }: { onContinue?: () => void }) {
  const mobile = useIsMobile()
  /** Sizes off the shared ramp — see `typeScale`, whose `wide` column is the
   *  design system's own type tokens. Line heights stay as they were: they
   *  were set against this screen's copy, and what was missing here was the
   *  middle stop, not a restyle. */
  const TYPE = useTypeScale()
  /** `compact` tightens the panel's gutter and padding — see PANEL_GUTTER. */
  const mode = useLayoutMode() === 'wide' ? 'wide' : 'compact'
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const answered = QUESTIONS.filter((q) => answers[q.key]).length
  const ready = answered === QUESTIONS.length

  const form = (
    <motion.div
      className="flex flex-col items-start"
      style={{
        width: '100%',
        maxWidth: mobile ? 'none' : COL_MAX,
        paddingInline: mobile ? 0 : COL_PAD_X,
        paddingTop: mobile ? 32 : CONTENT_MIN_GAP,
        paddingBottom: CONTENT_MIN_GAP,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
    >
      {/* Phone only. On desktop the panel sits beside the form and names the
          plan before anything is read; stacked, it moves below the form, so
          the eyebrow carries that orientation at twenty pixels instead of
          four hundred. Above the fold you still know which flow you are in. */}
      {mobile && (
        <p
          data-qualify="eyebrow"
          className="w-full font-medium uppercase"
          style={{
            color: 'var(--content-secondary)',
            fontSize: 12,
            lineHeight: 1.4,
            letterSpacing: '0.72px',
            marginBottom: 12,
          }}
        >
          Enterprise
        </p>
      )}

      <p
        data-qualify="headline"
        className="w-full font-medium"
        style={{ ...TYPE.title, color: INK }}
      >
        Tell us what to scope
      </p>
      <p className="mt-4 w-full" style={{ fontSize: TYPE.section.fontSize, color: INK, lineHeight: 1.6 }}>
        Three questions, then pick a time. It means the call starts with your numbers rather than ours.
      </p>

      <div className="mt-10 flex w-full flex-col items-start" style={{ gap: 28 }}>
        {QUESTIONS.map((q) => (
          <div
            key={q.key}
            data-qualify="question"
            className="flex w-full flex-col items-start"
            style={{ gap: 12 }}
          >
            <p
              className="w-full font-medium"
              style={{ fontSize: TYPE.body.fontSize, color: INK, lineHeight: 1.4 }}
            >
              {q.label}
            </p>
            <div className="flex w-full flex-wrap items-stretch" style={{ gap: 8 }}>
              {q.options.map((o) => (
                <ChoiceChip
                  key={o}
                  label={o}
                  selected={answers[q.key] === o}
                  onSelect={() => setAnswers((a) => ({ ...a, [q.key]: o }))}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button
        type="primary"
        size="large"
        data-qualify="continue"
        disabled={!ready}
        onClick={onContinue}
        className="mt-10"
        style={{ width: '100%' }}
      >
        {ready ? 'Pick a time' : `Pick a time (${answered}/${QUESTIONS.length})`}
      </Button>
    </motion.div>
  )

  return (
    <div
      data-qualify="frame"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: PAGE_BG }}
    >
      <GistNav action="login" />

      <div className={`band-split flex min-h-0 w-full flex-1 ${mobile ? 'flex-col' : ''}`}>
        {/* Not rendered on a phone at all.
            It was moved below the form first, on the principle that the pitch
            and the pricing expectation should be reordered rather than
            removed. Called on the actual behaviour instead: nobody reaches it,
            because the page's job is finished at the bottom of the form and
            that is where a phone reader stops. The ENTERPRISE eyebrow above
            the headline carries the orientation, and the panel's own content
            is on the plans page. Desktop keeps it — there it is beside the
            form, not a scroll past the end of it. */}
        {!mobile && (
        <div
          className="relative flex w-1/2 shrink-0 items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--brand-mint)', paddingInline: PANEL_GUTTER[mode] }}
        >
          {/* behind the card, same placement as the bare halves */}
          <HeroPattern />
                    <motion.div
            data-qualify="panel"
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
            <p className="w-full font-semibold" style={{ fontSize: TYPE.title.fontSize, color: INK, lineHeight: 1.2 }}>
              Enterprise
            </p>
            <p className="mt-4 w-full" style={{ fontSize: TYPE.body.fontSize, color: INK, lineHeight: 1.4 }}>
              {ENTERPRISE_SCOPE}
            </p>
            <p className="mt-8 w-full font-medium" style={{ fontSize: TYPE.body.fontSize, color: INK, lineHeight: 1.4 }}>
              Custom pricing
            </p>
            <p className="mt-2 w-full" style={{ fontSize: TYPE.data.fontSize, color: MUTED, lineHeight: 1.4 }}>
              Final pricing comes out of the call, not a calculator.
            </p>
          </motion.div>
        </div>
        )}

        <div className={`flex shrink-0 justify-center overflow-y-auto ${mobile ? 'w-full px-6' : 'w-1/2'}`}>
          <div className="my-auto w-full flex justify-center">{form}</div>
        </div>
      </div>
    </div>
  )
}
