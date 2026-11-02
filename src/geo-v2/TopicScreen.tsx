import GistNav, { type NavAction } from './GistNav'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from 'design-system'
import useIsMobile from '../useIsMobile'
import useLayoutMode from './useLayoutMode'
import useTypeScale from './typeScale'
import FitBox from '../FitBox'
import TopicQueriesCard from './TopicQueriesCard'
import { CheckCircle } from './Glyph'
import StepEyebrow from './StepEyebrow'

/**
 * Topic selection — Figma node 2277:32982.
 *
 * No longer an accordion. Each topic is a flat row — label and check circle,
 * nothing to open — so the whole list reads at a glance and fits on one screen.
 *
 * The free-text row is paid-path only — `allowCustom` reveals it. The free
 * run used to carry a locked "Sign up to unlock custom
 * topics" block — the only thing to do there is upgrade, so a dead input under
 * it was just an invitation to click something that can't respond.
 *
 * `allowCustom` unlocks that row instead of removing it. The paid path runs
 * this same screen after sign-up, where the lock would be describing a limit
 * that no longer applies — so the block becomes the row it was advertising:
 * one you type into.
 *
 * The card on the right and its sequence are untouched — it already types out
 * "Marathon shoes", which is the topic selected here by default.
 */

const EASE = [0.16, 1, 0.3, 1] as const

/* ── palette ────────────────────────────────────────────────── */
/* Split screens read page on the left, raised on the right, so the two
   halves separate on surface rather than only on the hairline. */
const PAGE_BG = 'var(--background-surface-page)'
const PANEL_BG = 'var(--background-surface-raised)'
const PANEL_RULE = 'var(--border-default)'
const HAIRLINE = 'var(--border-default)'
const SELECTED_BG = 'var(--background-interactive-selected)'
const INK = 'var(--content-default)'

/**
 * What the scan is, said in the terms of whoever is running it.
 *
 * A publisher does not have a "brand" showing up in answers, they have work
 * being cited; an agency is not asking about itself at all. One line for all
 * four made the persona question on the screen before this one decorative.
 */
export type Audience = 'Brand' | 'Publisher' | 'Creator' | 'Agency'

const SUBCOPY: Record<Audience, string> = {
  Brand: 'We\u2019ll see how you\u2019re showing up in AI answers.',
  Publisher: 'We\u2019ll see how often AI cites your work.',
  Creator: 'We\u2019ll see how AI talks about you.',
  Agency: 'We\u2019ll see how your clients show up in AI answers.',
}
/** #0a0a0a again, but the border role — a focused field's edge is a
 *  border, not text, and the two tokens can diverge later. */
const BORDER_INK = 'var(--border-strong)'

/* ── layout, from the design ────────────────────────────────── */
/** Per layout — see the note on the same constant in BrandTrackingScreen. A
 *  flat 100 each side leaves a half-width column 184px of usable space at 768. */
const COL_PAD_X: Record<'wide' | 'compact' | 'phone', number> = {
  wide: 100,
  compact: 56,
  phone: 24,
}
const BLOCK_GAP = 32
const ROW_GAP = 16
/** Floor between the window edge and the column at any height. */
const COL_MIN_GAP = 40
/** The card's footprint: 472×498 of content inside an 11px outside border. */
/**
 * The artwork's inset from its pane.
 *
 * The pane had none, so `FitBox` scaled the card until it touched all four
 * edges the moment the pane became the limiting dimension — which is what made
 * it read as cramped against the window edge at tablet widths.
 *
 * Costs nothing on a wide screen: there the pane is 720 against a 494 card, so
 * the scale is already capped at 1 and the inset only eats slack the card was
 * never using. It bites exactly where the problem was.
 */
const PANEL_PAD: Record<'wide' | 'compact' | 'phone', { inline: number; block: number }> = {
  wide: { inline: 48, block: 48 },
  compact: { inline: 32, block: 32 },
  phone: { inline: 24, block: 24 },
}

/**
 * The artwork's own band on a phone, above the question.
 *
 * Stacked, the pane used to come second and take whatever the column left it,
 * which on a 844px screen was 81px — the card scaled to a fifth of its size
 * and then cropped by the pane's own clip. It read as a glitch rather than as
 * artwork.
 *
 * So it goes first and it gets a stated height. The desktop relationship is
 * unchanged, just turned through ninety degrees: the artwork keeps its own
 * surface and its own rule, and the question sits against it. 360 leaves the
 * card about 300 tall after the inset — large enough to read as the thing it
 * is — and the page scrolls for the rest rather than compressing to fit.
 */
const ARTWORK_H_PHONE = 360
const CARD_W = 472 + 11 * 2
const CARD_H = 498 + 11 * 2

const CUSTOM = 'custom'

const TOPICS = [
  { key: 'marathon-shoes', label: 'Marathon shoes' },
  { key: 'running-shoe-reviews', label: 'Running shoe reviews' },
  { key: 'trail-outdoor', label: 'Trail & outdoor' },
  { key: 'buying-guides', label: 'Buying guides' },
  { key: 'athletic-wear', label: 'Athletic wear' },
]

export default function TopicScreen({
  onContinue,
  allowCustom = false,
  continueLabel = 'Continue',
  step,
  audience = 'Brand',
  navAction = 'login',
}: {
  /** Passes the chosen topic up so the scan can name it back. */
  onContinue?: (topic: string) => void
  /** The bar's right-hand action: Log in on the free path, Log out once signed in. */
  navAction?: NavAction
  /** Set once there is an account: the locked row becomes a typable one. */
  allowCustom?: boolean
  /** Who the previous screen said they are. The question was being asked and
   *  then thrown away: whichever of Brand, Publisher, Creator or Agency you
   *  picked, this screen said "your brand" back at you — which is wrong for
   *  three of the four, and makes the picker look like a formality. */
  audience?: Audience
  /** The paid path pays next, and says so rather than leaving checkout to
   *  arrive unannounced. */
  continueLabel?: string
  /** Only the paid path counts steps — see StepEyebrow. */
  step?: { n: number; of: number }
}) {
  const mobile = useIsMobile()
  /** Sizes off the shared ramp — see `typeScale`. Line heights stay put. */
  const TYPE = useTypeScale()
  const mode = useLayoutMode()
  const [selected, setSelected] = useState<string>(TOPICS[0].key)
  const [custom, setCustom] = useState('')
  const customRef = useRef<HTMLInputElement>(null)
  const onCustom = selected === CUSTOM
  const topicLabel = onCustom ? custom.trim() : (TOPICS.find((t) => t.key === selected)?.label ?? '')

  return (
    <div
      data-topic-screen="page"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: PAGE_BG }}
    >
      {/* the same bar as every other screen, so it never drops out mid-flow */}
      <GistNav action={navAction} />
      <div
        data-topic-screen="frame"
        className={`band-split flex w-full ${mobile ? 'flex-col' : 'min-h-0 flex-1'}`}
      >
        {/* ─── left: the picker ──────────────────────────────────── */}
        {/* The column itself never scrolls — only the list does. Scrolling the
            whole column would carry Continue off the bottom on a short window,
            and clipping would hide it outright. */}
        <div
          className={`flex shrink-0 flex-col justify-center ${mobile ? 'w-full' : 'w-1/2'}`}
          style={{ paddingInline: COL_PAD_X[mode], paddingBlock: mobile ? 48 : 0 }}
        >
          <motion.div
            data-topic-screen="col"
            className="flex w-full flex-col items-start overflow-hidden"
            style={{
              gap: BLOCK_GAP,
              paddingBlock: mobile ? 0 : COL_MIN_GAP,
              // the list is the only child allowed to shrink, so headline,
              // description and Continue always keep their full height
              maxHeight: mobile ? undefined : '100vh',
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 12 }}>
              {step && <StepEyebrow n={step.n} of={step.of} />}
              <h1
                data-topic-screen="headline"
                // Matches the brand step this one follows. It was 56/0.94 from
                // its own Figma frame, which read as a size jump between two
                // consecutive steps carrying the same eyebrow.
                className="w-full font-medium"
                style={{ fontSize: TYPE.display.fontSize, color: INK, lineHeight: 1 }}
              >
                Pick a topic to track
              </h1>
            </div>

            <p
              data-topic-screen="subcopy"
              className="w-full shrink-0"
              style={{ fontSize: TYPE.section.fontSize, color: INK, lineHeight: 1.18, letterSpacing: '0.36px' }}
            >
              {SUBCOPY[audience] ?? SUBCOPY.Brand}
            </p>

            {/* ─── the list ──────────────────────────────────────── */}
            <div
              data-topic-screen="list"
              className={`flex w-full min-h-0 flex-col items-start ${mobile ? '' : 'overflow-y-auto'}`}
              style={{ gap: ROW_GAP }}
            >
              {TOPICS.map((topic) => {
                const on = selected === topic.key
                return (
                  <button
                    key={topic.key}
                    type="button"
                    data-topic-screen="row"
                    data-topic={topic.key}
                    data-selected={on}
                    aria-pressed={on}
                    onClick={() => setSelected(topic.key)}
                    className="flex w-full shrink-0 items-center justify-between rounded-lg text-left transition-colors"
                    style={{
                      padding: 8,
                      backgroundColor: on ? SELECTED_BG : 'transparent',
                      border: `1px solid ${on ? BORDER_INK : HAIRLINE}`,
                    }}
                  >
                    <span
                      data-topic-screen="label"
                      className="min-w-0"
                      style={{ fontSize: TYPE.section.fontSize, color: INK, lineHeight: 1.6 }}
                    >
                      {topic.label}
                    </span>

                    <CheckCircle on={on} size={24} style={{ color: INK }} />
                  </button>
                )
              })}

              {/* ─── type your own: locked, or not ───────────────── */}
              {allowCustom ? (
                <div
                  data-topic-screen="row"
                  data-topic={CUSTOM}
                  data-selected={onCustom}
                  onClick={() => {
                    setSelected(CUSTOM)
                    customRef.current?.focus()
                  }}
                  className="flex w-full shrink-0 cursor-text items-center justify-between rounded-lg transition-colors"
                  style={{
                    padding: 8,
                    backgroundColor: onCustom ? SELECTED_BG : 'transparent',
                    border: `1px solid ${onCustom ? BORDER_INK : HAIRLINE}`,
                  }}
                >
                  <input
                    ref={customRef}
                    type="text"
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value)
                      setSelected(CUSTOM)
                    }}
                    onFocus={() => setSelected(CUSTOM)}
                    placeholder="Type your own topic"
                    aria-label="Your own topic"
                    className="min-w-0 flex-1 bg-transparent outline-none"
                    style={{ fontSize: TYPE.section.fontSize, color: INK, lineHeight: 1.6 }}
                  />
                  <CheckCircle on={onCustom && custom.trim().length > 0} size={24} style={{ color: INK }} />
                </div>
              ) : null}
            </div>

            <Button
              type="primary"
              size="large"
              data-topic-screen="continue"
              // a typed-but-empty custom row has nothing to scan
              disabled={topicLabel.length === 0}
              onClick={() => onContinue?.(topicLabel)}
              style={{ width: '100%' }}
            >
              {continueLabel}
            </Button>
          </motion.div>
        </div>

        {/* ─── right: the card, unchanged ────────────────────────── */}
        <div
          data-topic-screen="panel"
          className={`relative flex shrink-0 items-center justify-center overflow-hidden ${
            mobile ? 'w-full' : 'w-1/2'
          }`}
          style={{
            paddingInline: PANEL_PAD[mode].inline,
            paddingBlock: PANEL_PAD[mode].block,
            backgroundColor: PANEL_BG,
            // First on a phone, and a stated height rather than the remainder.
            // See ARTWORK_H_PHONE.
            ...(mobile ? { order: -1, height: ARTWORK_H_PHONE } : null),
            // The rule follows the artwork: under it when it is on top, beside it
            // when it is alongside.
            ...(mobile
              ? { borderBottom: `1px solid ${PANEL_RULE}` }
              : { borderLeft: `1px solid ${PANEL_RULE}` }),
          }}
        >
          {/* `size-full` on a phone too, not just `w-full`. FitBox measures its
              own container and scales to fit both axes; with the height left to
              `auto` there was nothing to measure, so the card came out 98px wide
              inside a 360px band. The band now states its height, so the card
              can fill it. */}
          <div data-topic-screen="card" className="size-full">
            <FitBox width={CARD_W} height={CARD_H}>
              <TopicQueriesCard />
            </FitBox>
          </div>
        </div>
      </div>
    </div>
  )
}
