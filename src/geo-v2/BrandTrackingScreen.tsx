import GistNav, { type NavAction } from './GistNav'
import { useEffect, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, ChoiceChip, Combobox, type ComboboxOption } from 'design-system'
import useIsMobile from '../useIsMobile'
import useLayoutMode from './useLayoutMode'
import useTypeScale from './typeScale'
import FitBox from '../FitBox'
import BrandLookupCard from './BrandLookupCard'
import StepEyebrow from './StepEyebrow'
import WelcomeModal from './WelcomeModal'
import type { Audience } from './TopicScreen'
import treadAvatar from '../assets/geo-v2/tread-avatar.png'

/**
 * Brand entry — Figma nodes 2178:37144 (screen) and 2277:32188 (input states).
 *
 * The field is a brand lookup, not a text box: an avatar slot on the left that
 * fills once a brand is matched, and Continue living inside the bar rather than
 * below it. Three states, all from the mock —
 *
 *   empty     hairline border, dashed avatar ring, Continue disabled
 *   typing    border goes to ink, matches drop below, Continue live
 *   matched   the brand's mark lands in the avatar slot
 *
 * Continue is disabled while empty because the bar is the only control here — a
 * live button with nothing to submit is the one thing that would read as broken.
 *
 * The card on the right and its sequence are untouched.
 */

const EASE = [0.16, 1, 0.3, 1] as const

/* ── palette ────────────────────────────────────────────────── */
/* Split screens read page on the left, raised on the right, so the two
   halves separate on surface rather than only on the hairline. */
const PAGE_BG = 'var(--background-surface-page)'
const PANEL_BG = 'var(--background-surface-raised)'
const PANEL_RULE = 'var(--border-default)'
const INK = 'var(--content-default)'
/** #0a0a0a again, but the border role — a focused field's edge is a
 *  border, not text, and the two tokens can diverge later. */
/** The empty avatar slot: a dashed ring, per the mock. Reads as "something
 *  goes here" in a way a filled grey disc doesn't. */
const DASHED_RING = 'var(--border-default)'

/* ── layout, from the design ────────────────────────────────── */
/**
 * The column's side padding, per layout.
 *
 * A flat 100 each side is right against a wide viewport and ruinous against a
 * narrow one: this column is half the screen, so at 768 it was spending 200 of
 * its 384 on padding and leaving 184px for four chips and a lookup field.
 */
const COL_PAD_X: Record<'wide' | 'compact' | 'phone', number> = {
  wide: 100,
  compact: 56,
  phone: 24,
}
const BLOCK_GAP = 32
/** Deep enough to pass AA on the cream, quiet enough not to shout. */
const MISS = 'var(--content-status-error)'
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

const AUDIENCES = ['Brand', 'Publisher', 'Creator', 'Agency']

/** An agency is scanning somebody else, so "Enter your agency" asks the wrong
 *  thing. Picking Agency opens a follow-up for whose report this is. */
const AGENCY = 'Agency'

/** The client-type row's open/close duration, in ms — the same 0.42s its
 *  transition uses, kept as a number so the clip timer can match it. */
const CLIENT_ROW_MS = 420
const CLIENT_TYPES = ['Brand', 'Publisher', 'Creator']

/** The only brand with a real mark, so the only one offered — a list of
 *  invented names with blank avatars would look like a bug. */
const KNOWN = [{ name: 'Tread', logo: treadAvatar }]

function placeholderFor(audience: string, clientType: string | null) {
  if (audience !== AGENCY) return `Enter ${audience.toLowerCase()}`
  if (!clientType) return 'Enter client'
  return `Enter client's ${clientType.toLowerCase()}`
}


const COLUMN = { hidden: {}, shown: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
const RISE = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/** Same source as the Continue gate, so the list and the check can't drift. */
const BRAND_OPTIONS: ComboboxOption[] = KNOWN.map((k) => ({
  value: k.name,
  label: k.name,
  leadingIcon: (
    <img src={k.logo} alt="" className="size-full rounded-full" style={{ objectFit: 'cover' }} />
  ),
}))

export default function BrandTrackingScreen({
  onContinue,
  step,
  signedInAs,
  welcome,
  navAction = 'login',
}: {
  onContinue?: (audience: Audience) => void
  /** The bar's right-hand action: Log in on the free path, Log out once signed in. */
  navAction?: NavAction
  /** Only the paid path counts steps — see StepEyebrow. */
  step?: { n: number; of: number }
  /** The paid path arrives here by clicking a link in an email, which is a
   *  context break: a different tab, maybe a different device, minutes later.
   *  Naming the account answers the only question anyone has at that moment —
   *  did the link work — before the screen asks one of its own. The free path
   *  arrives with its own momentum from the landing page and has no account,
   *  so it passes nothing.
   *
   *  `welcome` puts the same confirmation in a dialog over the screen instead
   *  of a line inside it. Both are wired so the two can be compared; pass one
   *  or the other, not both. */
  signedInAs?: string
  welcome?: string
}) {
  const mobile = useIsMobile()
  /** Sizes off the shared ramp — see `typeScale`. Line heights stay put. */
  const TYPE = useTypeScale()
  const mode = useLayoutMode()
  const [audience, setAudience] = useState('Brand')
  const [clientType, setClientType] = useState<string | null>(null)
  const [brand, setBrand] = useState('')
  const [matched, setMatched] = useState<(typeof KNOWN)[number] | null>(null)

  /** The client-type block animates its height open, which needs
   *  `overflow: hidden` — and a ChoiceChip's selected state is a double ring
   *  drawn 4px *outside* its box, so a wrapper that clips forever shaves that
   *  ring off. Clipping is therefore only on while the height is moving.
   *
   *  Released on a timer rather than framer's `onAnimationComplete`: that
   *  callback never fires if the animation never runs — reduced motion, a
   *  backgrounded tab, a frozen rAF — and the failure mode there is the clip
   *  staying on permanently, which is the bug this exists to fix. */
  const [clipClientType, setClipClientType] = useState(true)

  useEffect(() => {
    if (!clipClientType) return
    const t = window.setTimeout(() => setClipClientType(false), CLIENT_ROW_MS + 60)
    return () => window.clearTimeout(t)
  }, [clipClientType])

  const pickAudience = (label: string) => {
    setAudience(label)
    setClipClientType(true)
    if (label !== AGENCY) setClientType(null)
  }

  const query = brand.trim().toLowerCase()
  // hide the list once the typed value already is the match, or it lingers
  // under a field that's finished
  const suggestions = query && !matched ? KNOWN.filter((k) => k.name.toLowerCase().startsWith(query)) : []
  /** Typed something real, but nothing in the index matches it. Continue used
   *  to fire on any text at all, so "asdfgh" produced a full Tread report —
   *  the one failure a live demo trips over by accident. */
  const notFound = query.length >= 2 && !matched && suggestions.length === 0
  /** Typing the name in full counts — requiring a click on the dropdown would
   *  block anyone who just knows how to spell their own brand. */
  const exact = KNOWN.find((k) => k.name.toLowerCase() === query) ?? null
  const ready = (matched ?? exact) !== null


  return (
    <div
      data-brand-screen="page"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: PAGE_BG }}
    >
      {welcome && <WelcomeModal email={welcome} />}
      {/* the same bar as every other screen, so it never drops out mid-flow */}
      <GistNav action={navAction} />
      <div
        data-brand-screen="frame"
        className={`band-split flex w-full ${mobile ? 'flex-col' : 'min-h-0 flex-1'}`}
      >
        {/* ─── left: the question ────────────────────────────────── */}
        <div
          className={`flex shrink-0 flex-col justify-center ${mobile ? 'w-full' : 'w-1/2'}`}
          style={{ paddingInline: COL_PAD_X[mode], paddingBlock: mobile ? 48 : 0 }}
        >
          <motion.div
            data-brand-screen="col"
            className="flex w-full flex-col items-start"
            style={{ gap: mobile ? 28 : BLOCK_GAP }}
            variants={COLUMN}
            initial="hidden"
            animate="shown"
          >
            <motion.div
              variants={RISE}
              className="flex w-full flex-col items-start"
              style={{ gap: 12 }}
            >
              {step && <StepEyebrow n={step.n} of={step.of} />}
              <h1
                data-brand-screen="headline"
                className="w-full font-medium"
                style={{ fontSize: TYPE.display.fontSize, color: 'var(--content-default)', lineHeight: 1 }}
              >
                Which best describes you?
              </h1>
              {signedInAs && (
                <p
                  data-brand-screen="signed-in"
                  className="w-full"
                  style={{ fontSize: TYPE.body.fontSize, color: 'var(--content-secondary)', lineHeight: 1.4 }}
                >
                  You&rsquo;re signed in as <span className="font-medium">{signedInAs}</span>.
                </p>
              )}
            </motion.div>

            {/* ─── audience ────────────────────────────────────── */}
            <motion.div
              variants={RISE}
              data-brand-screen="tabs"
              // A grid of uniform tracks, not a flex row.
              //
              // As a single flex line with `min-w-0 flex-1` the chips could
              // shrink below their own labels, and under about 500px of column
              // they did — the boxes kept shrinking, the words did not, and
              // "Brand Publisher Creator Agency" ran together into each other's
              // chips. Letting them wrap fixed that and bought a second problem:
              // with `grow`, a row holding one leftover chip gave the whole row
              // to it, so "Agency" sat alone and full width under the other
              // three.
              //
              // `auto-fit` decides how many tracks fit and every track is the
              // same width, so a chip on a short row is the width of one column
              // rather than the width of the row. 112 is the floor because it is
              // what "Publisher" needs; four tracks at the wide column's 520
              // still come out at the 118 they have always been.
              className="w-full"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(112px, 1fr))',
                gap: 16,
              }}
            >
              {AUDIENCES.map((label) => (
                <ChoiceChip
                  key={label}
                  label={label}
                  selected={label === audience}
                  onSelect={() => pickAudience(label)}
                />
              ))}
            </motion.div>

            {/* Explicit initial/animate, not the column's variants: this mounts
                after the entrance stagger and would otherwise appear with no
                transition at all. */}
            <AnimatePresence initial={false}>
              {audience === AGENCY && (
                <motion.div
                  key="client-type"
                  data-brand-screen="client-type"
                  className="flex w-full flex-col items-start"
                  style={{ overflow: clipClientType ? 'hidden' : 'visible' }}
                  initial={{ opacity: 0, height: 0, y: -6 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -6 }}
                  transition={{ duration: CLIENT_ROW_MS / 1000, ease: EASE }}
                >
                  <p
                    className="font-medium"
                    style={{ fontSize: TYPE.body.fontSize, color: INK, lineHeight: 1.4, marginBottom: 12 }}
                  >
                    Who is this report for?
                  </p>
                  {/* Same grid as the audience row above — see the note there. */}
                  <div
                    className="w-full"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(112px, 1fr))',
                      gap: 16,
                    }}
                  >
                    {CLIENT_TYPES.map((label) => (
                      <ChoiceChip
                        key={label}
                        label={label}
                        selected={label === clientType}
                        onSelect={() => setClientType(label)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── the lookup ──────────────────────────────────── */}
            <motion.div
              variants={RISE}
              data-brand-screen="lookup"
              className="relative w-full"
              // The Combobox exposes these two as escape hatches, defaulting to
              // 20px / 4px. The BrandEntry pattern enlarges the leading slot so
              // the brand mark reads as a logo rather than a dot, and widens the
              // gap to match — a 4px gap beside a 24px circle looks pinched.
              style={
                {
                  '--combobox-leading-icon-size': '24px',
                  '--combobox-trigger-gap': 'var(--spacing-gap-200)',
                } as CSSProperties
              }
            >
              {/* The design system's BrandEntry pattern: Combobox in editable
                  mode with a placeholder avatar leading and Continue as its
                  trailing action. Replaces a hand-built bar, dropdown and
                  blur-timing dance that did the same job. */}
              <Combobox
                // the wording this screen shipped with (the library's default is "No results found")
                emptyMessage="No results"
                options={BRAND_OPTIONS}
                editable
                openOnTypeOnly
                value={matched?.name}
                onChange={(v) => {
                  const k = KNOWN.find((b) => b.name === v) ?? null
                  setMatched(k)
                  setBrand(k ? k.name : v)
                }}
                onInputChange={(t) => {
                  setBrand(t)
                  // editing after a match drops it — the avatar must not keep
                  // claiming a brand the text no longer says
                  if (matched && t !== matched.name) setMatched(null)
                }}
                placeholder={placeholderFor(audience, clientType)}
                aria-label={placeholderFor(audience, clientType)}
                triggerLeadingIcon={
                  matched ? (
                    <img
                      src={matched.logo}
                      alt=""
                      className="size-full rounded-full"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <span
                      className="block size-full rounded-full"
                      style={{ border: `1px dashed ${DASHED_RING}`, boxSizing: 'border-box' }}
                    />
                  )
                }
                trailingAction={
                  <Button
                    type="primary"
                    size="small"
                    data-brand-screen="continue"
                    disabled={!ready}
                    onClick={() => onContinue?.(audience as Audience)}
                  >
                    Continue
                  </Button>
                }
              />

              <AnimatePresence>
                {notFound && (
                  <motion.p
                    key="notfound"
                    data-brand-screen="not-found"
                    className="absolute top-full left-0 w-full"
                    style={{ marginTop: 8, color: MISS, fontSize: 14, lineHeight: 1.45 }}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: EASE }}
                  >
                    We don&rsquo;t have <span className="font-medium">{brand.trim()}</span> indexed yet. Check
                    the spelling, or try the brand&rsquo;s exact name.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* ─── right: the card, unchanged ────────────────────────── */}
        <div
          data-brand-screen="panel"
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
          <div data-brand-screen="card" className="size-full">
            <FitBox width={CARD_W} height={CARD_H}>
              <BrandLookupCard />
            </FitBox>
          </div>
        </div>
      </div>
    </div>
  )
}
