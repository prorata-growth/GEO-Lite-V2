import { motion } from 'framer-motion'
import { Button, SuggestionChip } from 'design-system'
import useIsMobile from '../useIsMobile'
import useLayoutMode from './useLayoutMode'
import useTypeScale from './typeScale'
import FitBox from '../FitBox'
import GistLogoWide from './GistLogoWide'
import { NavLinks, bandPad } from './GistNav'
import GeoAnswerCard from './GeoAnswerCard'
import panelBg from '../assets/geo-v2/home-panel-bg.jpg'
import { SAMPLE_BRANDS, type SampleBrand } from './sampleBrands'

/**
 * Revised landing — Figma node 1859:17554.
 *
 * The rework is chrome, not content: a beige page, a real top nav bar rather
 * than links floating over the photo, a smaller headline, and the sample-brand
 * row moved to a ruled strip at the foot of the column. The answer card is
 * unchanged — it already matched this design.
 *
 * On desktop the whole screen is sized to the viewport rather than to the
 * design's 1024: the pitch centres in whatever height is left after the bar and
 * the sample strip, and the card scales to fit its panel. So nothing scrolls and
 * nothing is cut off on a shorter window.
 */

const EASE = [0.16, 1, 0.3, 1] as const

/* ── palette ────────────────────────────────────────────────── */
/**
 * Deliberately raw. It's an exact palette step (`color/background/200`) but
 * no semantic role points at the warm ramp: `background/surface/page`
 * resolves to #fafafa and `surface/raised` to #ffffff, both cool. Binding
 * either would delete the warm ground. Not bound to
 * `background/interactive/selected` (which happens to equal #f4f2ea)
 * because that token means a "you are here" nav state.
 */
const PAGE_BG = 'var(--background-surface-page)'
/** border/default. Was #d5d1be, a step darker than the token — the role is
 *  a rule, so it follows the token rather than the other way round. */
const RULE = 'var(--border-default)'

/* ── layout, from the design ────────────────────────────────── */
/** Figma 1859:20348 — the bar is px-40 py-24, not a uniform 40. */
const NAV_PAD_X = 40
/** 12 + 40 link + 12 = 64. Was 24, which made a 90px bar — the heaviest thing
 *  on the page sat at the very top and read as chrome, not navigation. */
const NAV_PAD_Y = 12
/** Keeps the bar 65px whatever the action's own height is — the same pin
 *  GistNav uses, so the header doesn't change shape between home and the
 *  rest of the flow. */
const NAV_ACTION_H = 40
/**
 * The hero column's side padding, per layout.
 *
 * 100 each side is right against a 1440 viewport and absurd against a 930 one,
 * where it was taking 200 of the column's 425 and leaving the headline 225px
 * to wrap a 48px line in.
 */
const COL_PAD_X: Record<'wide' | 'compact' | 'phone', number> = {
  wide: 100,
  compact: 56,
  phone: 24,
}
const BLOCK_GAP = 48
/**
 * The hero's vertical rhythm on a phone.
 *
 * It ran on a single 28 between every block and the column read as packed.
 * What actually fixed that was the separation from the bar above — two
 * different surfaces meeting, which wants more room than two blocks of one
 * column do — plus a small lift to the blocks themselves.
 *
 * The blocks stay on one value. An extra step under the headline was tried, on
 * the theory that the largest type wants the largest gap beneath it; at this
 * size it just pulled the headline away from the sentence that finishes its
 * thought. The two belong together, and 32 is close enough to read as one
 * unit while still separating them.
 */
const PHONE_RHYTHM = {
  /** Under the bar, before the headline. */
  fromNav: 64,
  /** Between every block in the column. */
  block: 32,
}
/** The standfirst's comfortable measure — a *maximum*, never a width. As a
 *  fixed width it overran the left column by 211px at 930 and the right pane
 *  painted straight over the end of the sentence. */
const SUB_W = 536
/** The photo is blurred in the design rather than in the export. */
/** The card sat at 0.9 in the previous prototype and that scale was right, so
 *  it's the cap here too — FitBox only goes below it on a smaller panel. */
/**
 * The artwork's band on a phone, below the form.
 *
 * It had no stated height and the card inside it had no height either, so
 * `FitBox` measured a zero-high box and scaled the card by zero — the pane
 * rendered as an 80px strip of its own padding with nothing in it, and
 * `min-h-screen` padded the rest of the page out as empty black.
 *
 * Below the form here, not above it as on the brand and topic steps. There the
 * artwork explains what the step is about, so it leads; on a landing page the
 * headline and the CTA are the thing, and a band this tall above them would
 * push "Your competitors are in the answer" most of the way down the screen.
 */
const ARTWORK_H_PHONE = 360
const CARD_W = 582
const CARD_H = 640
const CARD_SCALE = 0.9


/** Staggered so the column arrives as one movement rather than four. */
const COLUMN = { hidden: {}, shown: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
const RISE = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/** One half of the hover swap: the resting arrow leaves to the right, the
 *  incoming one waits off to the left and takes its place. Ported from the
 *  previous prototype's CTA. */
function ArrowSwap({ incoming = false }: { incoming?: boolean }) {
  return (
    // inlined so the stroke is `currentColor` — the primary button's content
    // colour inverts with the theme, and a baked-in white arrow vanished on it
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`absolute inset-0 size-full transition-transform duration-300 ease-out ${
        incoming ? '-translate-x-[150%] group-hover:translate-x-0' : 'group-hover:translate-x-[150%]'
      }`}
    >
      <path
        d="M4 12H20M12 20L20 12L12 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * The width the sample pills need to sit on one line.
 *
 * Measured, not guessed: the three chips are 99 + 66 + 88 with two 16px gaps.
 * It is the point at which the group stops fitting beside its label and has
 * to go under it — as a group. Left to shrink, the pills wrapped *in place*
 * and the label ended up vertically centred against a two-row block, which
 * reads as a mistake rather than as a layout.
 *
 * A brand with a longer name moves this number. If the set changes and the
 * pills start wrapping beside the label again, re-measure rather than nudge.
 */
const SAMPLE_PILLS_MIN = 285

function SampleRow({
  mobile,
  padX,
  onSample,
}: {
  mobile: boolean
  /** Matches the column above it, so the rule and the headline share an edge. */
  padX: number
  onSample?: (b: SampleBrand) => void
}) {
  return (
    <motion.div
      variants={RISE}
      data-geo-screen="sample"
      className={`flex flex-wrap items-center border-t border-b ${mobile ? 'py-4' : 'py-6'}`}
      style={{
        borderColor: RULE,
        paddingInline: padX,
        // On windows past 1440 the half has a gutter (see .band-split): the
        // rules run out through it to the window edge, the pills stay put.
        marginLeft: 'calc(-1 * var(--band-gutter, 0px))',
        paddingLeft: `calc(${padX}px + var(--band-gutter, 0px))`,
        width: 'calc(100% + var(--band-gutter, 0px))',
        columnGap: 8,
        // Only paid when the pills drop below the label, and then they should
        // not sit tight under it.
        rowGap: 12,
      }}
    >
      <p
        data-geo-screen="sample-label"
        className="shrink-0 text-[14px] font-medium text-[var(--content-default)]"
        style={{ lineHeight: 1.4 }}
      >
        Try a sample brand
      </p>
      {/* Wraps as a unit: `flex-1` with a floor of its one-line width, so the
          row either seats it beside the label or sends the whole group to the
          next line, where it gets the full width and may wrap internally. */}
      <div
        data-geo-screen="sample-pills"
        className="flex flex-wrap items-start gap-4"
        style={{ flex: `1 1 ${SAMPLE_PILLS_MIN}px`, minWidth: `min(${SAMPLE_PILLS_MIN}px, 100%)` }}
      >
        {SAMPLE_BRANDS.map((b) => (
          // `showSwap={false}`: the swap icon cycles one slot through
          // alternatives, and all three are already on screen — there is
          // nothing for it to swap to. The component exposes the boolean for
          // exactly this case.
          <SuggestionChip
            key={b.name}
            label={b.name}
            showSwap={false}
            onSelect={() => onSample?.(b)}
            leading={
              <img
                src={b.logo}
                alt=""
                className={`rounded-full ${b.contain ? 'object-contain' : 'object-cover'}`}
              />
            }
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function GeoSearchScreen({
  onContinue,
  onSample,
}: {
  onContinue?: () => void
  /** Straight into a confirmation of the run — the chip answers the brand,
   *  we answer the topic, and the next screen says so. */
  onSample?: (sample: SampleBrand) => void
}) {
  const mobile = useIsMobile()
  const mode = useLayoutMode()
  const type = useTypeScale()

  return (
    <div
      data-geo-screen="frame"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: PAGE_BG }}
    >
      {/* ─── top bar ─────────────────────────────────────────── */}
      <header
        data-geo-screen="nav"
        // pinned like GistNav, so the bar never scrolls away
        className="sticky top-0 z-40 flex w-full shrink-0 items-center justify-between border-b"
        style={{
          backgroundColor: 'var(--background-surface-page)',
          borderColor: RULE,
          // the same band GistNav holds to, so the bar doesn't jump between pages
          paddingInline: mobile ? 20 : bandPad(NAV_PAD_X),
          paddingBlock: mobile ? 16 : NAV_PAD_Y,
        }}
      >
        <GistLogoWide />

        <div
          className="flex items-center"
          style={{ gap: mobile ? 4 : 20, minHeight: mobile ? undefined : NAV_ACTION_H }}
        >
          {/* the dropdown links have nowhere to go at phone width */}
          {/* At every width — see the note in GistNav. */}
          <NavLinks mobile={mobile} />
          <Button
            type="primary"
            size="small"
            data-geo-screen="login"
            onClick={() => (window.location.hash = '#v2-geologin')}
          >
            Log in
          </Button>
        </div>
      </header>

      {/* ─── body ────────────────────────────────────────────── */}
      <div data-geo-screen="body" className={`band-split flex w-full flex-1 ${mobile ? 'flex-col' : 'items-stretch'}`}>
        {/* left: the pitch, with the sample strip pinned to its foot */}
        <motion.div
          data-geo-screen="content"
          className={`flex min-w-px flex-col ${mobile ? 'w-full' : 'min-h-0 flex-1'}`}
          style={mobile ? { paddingTop: PHONE_RHYTHM.fromNav } : undefined}
          variants={COLUMN}
          initial="hidden"
          animate="shown"
        >
          <div
            className={`flex w-full flex-col items-start ${
              mobile ? 'px-6' : 'min-h-0 flex-1 justify-center'
            }`}
            style={{
              gap: mobile ? PHONE_RHYTHM.block : BLOCK_GAP,
              paddingInline: COL_PAD_X[mode],
            }}
          >
            <motion.h1
              variants={RISE}
              data-geo-screen="headline"
              className="w-full font-medium text-[var(--content-default)]"
              style={{ fontSize: type.display.fontSize, lineHeight: type.display.lineHeight }}
            >
              Your competitors are in the answer. Are you?
            </motion.h1>

            <motion.p
              variants={RISE}
              data-geo-screen="subcopy"
              className="w-full text-[var(--content-default)]"
              style={{
                // Max, not width. See SUB_W.
                maxWidth: SUB_W,
                fontSize: type.lead.fontSize,
                lineHeight: type.lead.lineHeight,
                letterSpacing: type.lead.letterSpacing,
              }}
            >
              AI recommends a brand every time someone asks. See whether it&rsquo;s yours, in 60 seconds,
              free.
            </motion.p>

            <motion.div
              variants={RISE}
              data-geo-screen="actions"
              // One action now. "Get a demo" sat beside it as a second large
              // button, and this page is a self-serve entry point: two equal
              // CTAs at the top of a funnel ask the reader to choose before
              // they have anything to choose with. The demo is still reachable
              // from Enterprise and Pricing, where someone is already asking a
              // sales-shaped question.
              className="flex items-center"
            >
              <Button
                type="primary"
                size="large"
                className="group"
                data-geo-screen="start"
                onClick={onContinue}
                trailingIcon={
                  <span className="relative size-full shrink-0 overflow-hidden">
                    <ArrowSwap />
                    <ArrowSwap incoming />
                  </span>
                }
              >
                Get started
              </Button>
            </motion.div>
          </div>

          <div className={mobile ? 'mt-10' : 'shrink-0'}>
            <SampleRow mobile={mobile} padX={COL_PAD_X[mode]} onSample={onSample} />
          </div>
        </motion.div>

        {/* right: gradient ground with the answer card over it */}
        <div
          data-geo-screen="panel"
          className={`relative flex min-w-px items-center justify-center overflow-hidden ${
            mobile ? 'w-full px-6 py-6' : 'min-h-0 flex-1 p-10'
          }`}
          // A stated height on a phone, so the card inside has something to
          // scale against. See ARTWORK_H_PHONE.
          // The gradient is the panel's own background rather than an <img>,
          // so on windows past 1440 it also fills the gutter out to the
          // window's edge (see .band-split) while the card stays in the column.
          style={{
            backgroundImage: `url(${panelBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            ...(mobile ? { height: ARTWORK_H_PHONE } : null),
          }}
        >

          <motion.div
            data-geo-screen="card"
            // bled off the right: cropping is what makes it read as a live
            // screen rather than an object placed on a background
            // `size-full` on a phone too. With only `w-full` the height was
            // `auto`, FitBox measured zero and scaled the card out of
            // existence — see ARTWORK_H_PHONE.
            className="relative size-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          >
            <FitBox width={CARD_W} height={CARD_H} maxScale={CARD_SCALE}>
              <GeoAnswerCard />
            </FitBox>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
