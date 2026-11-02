import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, ChoiceChip, Combobox, EmptyState, type ComboboxOption } from 'design-system'
import useIsMobile from '../useIsMobile'
import useTypeScale from './typeScale'
import GistNav from './GistNav'
import HeroPattern from './HeroPattern'
import { CheckCircle } from './Glyph'
import treadAvatar from '../assets/geo-v2/tread-avatar.png'

/**
 * Confirming what to scan, after payment, on the upgrade path only.
 *
 * Someone who ran the free scan has already answered both questions across
 * BrandTrackingScreen and TopicScreen, so walking them through those two
 * screens again would be asking twice. One page, mostly a read-back, with the
 * answers editable in place.
 *
 * Arriving cold from the pricing page is the other case, and it does not come
 * here: nothing has been answered yet, so that path runs the same two
 * half-split screens the free path uses — it is a first pass through the
 * funnel, not a confirmation of one.
 *
 * After payment rather than before it: the answers are already in hand, so
 * stopping to re-approve them on the way to checkout only adds a step.
 */

/**
 * Two screens, one shape.
 *
 * `upgrade` reads back what the free scan already answered, on the way to a
 * paid report, and both fields stay editable — they are the reader's own
 * answers, so changing them has to be possible.
 *
 * `sample` is for someone who picked a sample brand on the landing page and
 * has answered nothing. Both values came from us, so it states them rather
 * than asking: no topic list, no custom field, nothing to type. The brand can
 * still be swapped, but only across the other samples — anything wider would
 * let someone choose a brand there is no scan behind.
 */
const COPY = {
  upgrade: {
    title: 'Confirm brand and topic',
    blurb:
      'This is what we picked up from your Free Scan. Change either one if you want a different report.',
    cta: 'Generate my report',
  },
  sample: {
    title: 'Sample brand and topic',
    blurb:
      'A sample scan, so you can see the output before running your own.',
    cta: 'Run the sample scan',
  },
} as const

export type ScopeVariant = keyof typeof COPY

const EASE = [0.16, 1, 0.3, 1] as const
const PAGE_BG = 'var(--background-surface-page)'
const INK = 'var(--content-default)'
const MUTED = 'var(--content-secondary)'
const HAIRLINE = 'var(--border-default)'
const BORDER_INK = 'var(--border-strong)'
const SELECTED_BG = 'var(--background-interactive-selected)'
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

/** The same five the free topic screen offers, so both paths scan alike. */
const TOPICS = [
  { key: 'marathon-shoes', label: 'Marathon shoes' },
  { key: 'running-shoe-reviews', label: 'Running shoe reviews' },
  { key: 'trail-outdoor', label: 'Trail & outdoor' },
  { key: 'buying-guides', label: 'Buying guides' },
  { key: 'athletic-wear', label: 'Athletic wear' },
]

/** The free screen ends its list with a locked "Sign up to unlock custom
 *  topics" row. By here there is an account and a payment, so the same row is
 *  simply open — a sixth option you type into rather than pick. */
const CUSTOM = 'custom'

/** How long the topics take to come back for a brand. Long enough to read as
 *  work being done, short enough that nobody demoing this waits on it. */
const LOAD_MS = 900

/** Row metrics, shared by the real rows and their placeholders so the swap
 *  doesn't shift the column: 8 padding, a 28.8 line box (18px on 1.6), 1px
 *  border. */
const ROW_PAD = 8
const ROW_LINE = 28.8

/** Uneven on purpose — six identical bars read as a graphic, not as pending
 *  text. These are roughly the widths of the real labels. */
const SKELETON_WIDTHS = ['46%', '62%', '40%', '44%', '38%', '52%']

/** Rows arrive one after another rather than all at once, so the list reads as
 *  filling in — the same beat the skeleton was keeping. */
const ROW_RISE = {
  hidden: { opacity: 0, y: 6 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
}

/**
 * The topic list while it's still coming back.
 *
 * Same sweep as the report's own skeleton — a highlight travelling across each
 * bar, staggered per row — rather than a second shimmer of its own invention.
 * Unlike that one this is a real replacement rather than an overlay, so the
 * bars stay visible at rest: with animations off there is still a placeholder
 * here, because the content genuinely isn't there yet.
 */
function TopicSkeleton() {
  return (
    <div
      data-scope="topics-loading"
      aria-hidden
      className="flex w-full flex-col items-start"
      style={{ gap: 'var(--spacing-gap-200)' }}
    >
      {SKELETON_WIDTHS.map((w, i) => (
        <div
          key={i}
          className="flex w-full shrink-0 items-center justify-between rounded-lg"
          style={{ padding: ROW_PAD, border: `1px solid ${HAIRLINE}` }}
        >
          <span className="flex items-center" style={{ height: ROW_LINE, width: w }}>
            <span
              data-gr-motion=""
              className="w-full"
              style={{
                height: 12,
                borderRadius: 6,
                background:
                  'linear-gradient(90deg, var(--background-surface-sunken) 0%, transparent 45%, var(--background-surface-sunken) 90%)',
                backgroundSize: '220% 100%',
                animation: `gr-skeleton-sweep 1.1s linear ${i * 0.08}s infinite`,
              }}
            />
          </span>
          <span
            data-gr-motion=""
            className="shrink-0 rounded-full"
            style={{
              width: 24,
              height: 24,
              background:
                'linear-gradient(90deg, var(--background-surface-sunken) 0%, transparent 45%, var(--background-surface-sunken) 90%)',
              backgroundSize: '220% 100%',
              animation: `gr-skeleton-sweep 1.1s linear ${i * 0.08}s infinite`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

const KNOWN = [{ name: 'Tread', logo: treadAvatar }]
const BRAND_OPTIONS: ComboboxOption[] = KNOWN.map((k) => ({
  value: k.name,
  label: k.name,
  leadingIcon: <img src={k.logo} alt="" className="size-full rounded-full object-cover" />,
}))

export default function GeoScopeScreen({
  brand: initialBrand = '',
  topic: initialTopic,
  variant = 'upgrade',
  brandLogo,
  topics: TOPIC_LIST = TOPICS,
  samples,
  onContinue,
}: {
  /** Both come from the free scan; the screen is a read-back of them. */
  brand?: string
  topic?: string
  /** Which run this confirms — see COPY. */
  variant?: ScopeVariant
  /**
   * The brand's mark, for brands the lookup does not know.
   *
   * `KNOWN` holds Tread alone, so without this a sample brand fell through to
   * the Combobox — which cannot be opened with a value already in it (see the
   * note at the lookup below), leaving the field empty on a screen whose only
   * job is to read the brand back. Supplying a logo says "treat this as
   * found" and takes the read-back path instead.
   */
  brandLogo?: string
  /** The topics on offer. Defaults to the shoe set the free scan uses; a
   *  sample passes its own, since a soda brand has no opinion about trail
   *  running. */
  topics?: { key: string; label: string }[]
  /**
   * What a review may switch between.
   *
   * A sample's brand is changeable, but only across the other samples — a
   * free lookup would let someone type a brand there is no scan behind, which
   * is the one promise this screen must not make. Each option carries its own
   * topic, because changing the brand changes what we would run.
   */
  samples?: { name: string; topic: string; logo: string }[]
  onContinue?: (scope: { brand: string; topic: string }) => void
} = {}) {
  const copy = COPY[variant]
  /**
   * A sample is shown, not filled in.
   *
   * The upgrade path is confirming answers someone gave, so changing them has
   * to be possible. A sample is the opposite: both values came from us, and
   * the screen exists to say what is about to run before it runs. Offering a
   * brand lookup and six topics there invites an edit that only leads back to
   * a brand with no dataset behind it — the useful edit is "scan my own",
   * which is a different route, not a field on this one.
   */
  const review = variant === 'sample'
  const mobile = useIsMobile()
  /** Sizes off the shared ramp — see `typeScale`. Line heights stay put. */
  const TYPE = useTypeScale()
  const [brand, setBrand] = useState(initialBrand)
  const [matched, setMatched] = useState<(typeof KNOWN)[number] | null>(
    KNOWN.find((k) => k.name === initialBrand) ??
      (initialBrand && brandLogo ? { name: initialBrand, logo: brandLogo } : null),
  )
  /** Opens with the brand read back rather than sitting in a field: there is
   *  nothing to type, and an editable box invites an edit nobody came here to
   *  make. Change swaps it for the lookup — and only then can the brand be
   *  cleared, which is the one way the empty and loading states below are
   *  reachable. */
  const [editingBrand, setEditingBrand] = useState(!initialBrand)
  /** A topic carried in from the free scan is always one of the five today,
   *  but a custom one would arrive the same way — so anything unrecognised
   *  lands in the custom row rather than being silently swapped for the
   *  first preset. */
  const preset = TOPIC_LIST.find((t) => t.label === initialTopic)
  const [custom, setCustom] = useState(preset || !initialTopic ? '' : initialTopic)
  const [selected, setSelected] = useState<string>(
    preset ? preset.key : initialTopic ? CUSTOM : TOPIC_LIST[0].key,
  )
  /** In review the brand is whatever was handed in, whether or not the lookup
   *  recognises it — that is the whole point of the screen. */
  const shownBrand = matched ?? (brand ? { name: brand, logo: brandLogo ?? '' } : null)
  /** Open only while someone is choosing a different sample. */
  const [picking, setPicking] = useState(false)
  /** A review has no topic list: the topic is whatever the chosen sample
   *  carries, and it changes with the brand rather than being picked. */
  const [reviewTopic, setReviewTopic] = useState(initialTopic ?? '')
  const customRef = useRef<HTMLInputElement>(null)

  /** The brand the topics on screen belong to. Starts already resolved: these
   *  topics came back with the free scan, so re-fetching them in front of
   *  someone who has paid is theatre. A brand *changed* here does re-resolve,
   *  because then it genuinely is a different question. */
  const [loadedFor, setLoadedFor] = useState(initialBrand.trim())

  // Topics are fetched for a brand, so the list follows the field rather than
  // sitting there from the start. The cleanup makes this self-debouncing: each
  // keystroke cancels the pending load, so the run starts when typing stops
  // rather than once per character.
  const settled = brand.trim()
  useEffect(() => {
    if (!settled || settled === loadedFor) return
    const t = window.setTimeout(() => setLoadedFor(settled), LOAD_MS)
    return () => window.clearTimeout(t)
  }, [settled, loadedFor])

  const loading = settled.length > 0 && settled !== loadedFor

  const onCustom = selected === CUSTOM
  const topicLabel = onCustom ? custom.trim() : (TOPIC_LIST.find((t) => t.key === selected)?.label ?? '')
  // nothing to continue with while the list is still resolving
  const ready = settled.length > 0 && !loading && topicLabel.length > 0

  return (
    <div
      data-scope="frame"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: PAGE_BG }}
    >
      {/* `signout`: this screen only exists once there is an account. */}
      {/* The paid confirmation is reached from inside an account; a sample is
          reached from the landing page by someone with none, and a Sign out in
          the corner of it was offering to end a session nobody started. */}
      <GistNav action={variant === 'sample' ? 'login' : 'signout'} />

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
          <motion.div
            data-scope="form"
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
          >
            <p
              className="w-full"
              style={{
                color: INK,
                fontSize: TYPE.title.fontSize,
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              {copy.title}
            </p>
            <p
              className="w-full"
              style={{
                marginTop: 'var(--spacing-gap-400)',
                color: MUTED,
                fontSize: TYPE.section.fontSize,
                lineHeight: 1.6,
              }}
            >
              {copy.blurb}
            </p>

            <div
              className="flex w-full flex-col items-start"
              style={{ marginTop: 'var(--spacing-gap-800)', gap: 'var(--spacing-gap-300)' }}
            >
              <span
                style={{
                  color: INK,
                  fontSize: TYPE.body.fontSize,
                  fontWeight: 500,
                }}
              >
                Brand
              </span>
              {/* The design system's BrandEntry pattern, same as the free
                  path's lookup — the two enlarge the leading slot so the mark
                  reads as a logo rather than a dot. */}
              {(review ? shownBrand : !editingBrand && matched) ? (
                <div className="flex w-full flex-col items-start" style={{ gap: 'var(--spacing-gap-200)' }}>
                <div
                  data-scope="brand-readback"
                  className="flex w-full items-center justify-between rounded-lg"
                  style={{
                    padding: 8,
                    paddingInlineStart: 12,
                    border: `1px solid ${HAIRLINE}`,
                  }}
                >
                  <span className="flex min-w-0 items-center" style={{ gap: 'var(--spacing-gap-200)' }}>
                    <img
                      src={shownBrand!.logo}
                      alt=""
                      className="shrink-0 rounded-full object-cover"
                      style={{ width: 24, height: 24 }}
                    />
                    <span className="truncate" style={{ fontSize: TYPE.section.fontSize, color: INK, lineHeight: 1.6 }}>
                      {shownBrand!.name}
                    </span>
                  </span>
                  {/* On a review this opens the other samples rather than a
                      lookup — see the `samples` prop. */}
                  {review ? (
                    (samples?.length ?? 0) > 1 && (
                      <Button
                        type="secondary"
                        size="small"
                        data-scope="change-brand"
                        onClick={() => setPicking((v) => !v)}
                      >
                        {picking ? 'Done' : 'Change'}
                      </Button>
                    )
                  ) : (
                  <Button
                    type="secondary"
                    size="small"
                    data-scope="change-brand"
                    // Clears the brand as well as revealing the field. The
                    // Combobox can't be opened with a value in it, so leaving
                    // the state set would show an empty box above a topic list
                    // that still belonged to the old brand — the field and the
                    // list telling different stories. Change means change.
                    onClick={() => {
                      setEditingBrand(true)
                      setBrand('')
                      setMatched(null)
                    }}
                  >
                    Change
                  </Button>
                  )}
                </div>

                {/* The other samples, and only those. Picking one swaps the
                    topic with it, since the two travel together. */}
                {review && picking && (
                  <div
                    data-scope="sample-picker"
                    className="flex w-full flex-wrap items-center"
                    style={{ gap: 'var(--spacing-gap-200)' }}
                  >
                    {samples?.map((o) => (
                      <ChoiceChip
                        key={o.name}
                        label={o.name}
                        selected={o.name === brand}
                        onSelect={() => {
                          setBrand(o.name)
                          setMatched({ name: o.name, logo: o.logo })
                          setReviewTopic(o.topic)
                          setPicking(false)
                        }}
                      />
                    ))}
                  </div>
                )}
                </div>
              ) : (
              <div
                className="relative w-full"
                style={
                  {
                    '--combobox-leading-icon-size': '24px',
                    '--combobox-trigger-gap': 'var(--spacing-gap-200)',
                  } as CSSProperties
                }
              >
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
                    // editing past a match drops it — the avatar must not keep
                    // claiming a brand the text no longer says
                    if (matched && t !== matched.name) setMatched(null)
                  }}
                  placeholder="Enter brand"
                  aria-label="Brand"
                  // The caret is the Combobox's default trailing slot, and it
                  // promises a list that clicking never opens: with
                  // openOnTypeOnly the matches only appear once there is
                  // something to match. An empty slot leaves a field that
                  // looks like what it is — one you type into.
                  trailingAction={<span aria-hidden />}
                  triggerLeadingIcon={
                    matched ? (
                      <img
                        src={matched.logo}
                        alt=""
                        className="size-full rounded-full object-cover"
                      />
                    ) : (
                      // Same empty slot as the free path's brand entry, so the
                      // two lookups read as the same control.
                      <span
                        className="block size-full rounded-full"
                        style={{ border: `1px dashed ${HAIRLINE}`, boxSizing: 'border-box' }}
                      />
                    )
                  }
                />
              </div>
              )}
            </div>

            <div
              className="flex w-full flex-col items-start"
              style={{ marginTop: 'var(--spacing-gap-700)', gap: 'var(--spacing-gap-300)' }}
            >
              <span
                style={{
                  color: INK,
                  fontSize: TYPE.body.fontSize,
                  fontWeight: 500,
                }}
              >
                Topic
              </span>
              {/* The two answers are ordered, not parallel — a topic is what
                  we ask *about a brand*, so offering the list before there is
                  a brand invites an answer to half a question. */}
              {/* A review states the topic; it does not offer a choice of
                  them, and it offers no custom field. Both values came from
                  us, and the useful edit — scanning a brand of their own — is
                  a different route rather than a field on this screen. */}
              {review ? (
                <div className="flex w-full flex-col items-start" style={{ gap: 'var(--spacing-gap-200)' }}>
                <div
                  data-scope="topic-readback"
                  className="flex w-full items-center rounded-lg"
                  style={{
                    padding: 8,
                    paddingInlineStart: 12,
                    border: `1px solid ${HAIRLINE}`,
                  }}
                >
                  <span className="truncate" style={{ fontSize: TYPE.section.fontSize, color: INK, lineHeight: 1.6 }}>
                    {reviewTopic}
                  </span>
                </div>
                {/* The brand row has a Change and this one does not, and that
                    asymmetry reads as "topics are not something you pick" —
                    a claim about the product rather than about samples, and
                    the wrong one. One line answers it where the doubt forms,
                    rather than in the blurb four rows up. */}
                <p
                  data-scope="topic-note"
                  className="w-full"
                  style={{ color: MUTED, fontSize: 14, lineHeight: 1.5 }}
                >
                  Set for this sample. You pick your own when you scan your brand.
                </p>
                </div>
              ) : (
              <AnimatePresence mode="wait" initial={false}>
              {!settled ? (
                <motion.div
                  key="empty"
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <EmptyState
                    title="Choose a brand first"
                    description={`Topics appear once we know which brand we’re scanning.`}
                    className="w-full"
                  />
                </motion.div>
              ) : loading ? (
                <motion.div
                  key="loading"
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <TopicSkeleton />
                </motion.div>
              ) : (
              <motion.div
                key="list"
                initial="hidden"
                animate="shown"
                variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.05 } } }}
                className="flex w-full flex-col items-start"
                style={{ gap: 'var(--spacing-gap-200)' }}
              >
                {TOPIC_LIST.map((t) => {
                  const on = selected === t.key
                  return (
                    <motion.button
                      key={t.key}
                      variants={ROW_RISE}
                      type="button"
                      data-scope="topic"
                      data-topic={t.key}
                      data-selected={on}
                      aria-pressed={on}
                      onClick={() => setSelected(t.key)}
                      className="flex w-full shrink-0 items-center justify-between rounded-lg text-left transition-colors"
                      style={{
                        padding: 8,
                        backgroundColor: on ? SELECTED_BG : 'transparent',
                        border: `1px solid ${on ? BORDER_INK : HAIRLINE}`,
                      }}
                    >
                      <span className="min-w-0" style={{ fontSize: TYPE.section.fontSize, color: INK, lineHeight: 1.6 }}>
                        {t.label}
                      </span>
                      <CheckCircle on={on} size={24} style={{ color: INK }} />
                    </motion.button>
                  )
                })}

                {/* Same shell as the rows above, so the list reads as one set
                    of six — the only difference is that this one is typed
                    into. Clicking anywhere on it focuses the field, since a
                    row that looks selectable has to behave like one. */}
                <motion.div
                  variants={ROW_RISE}
                  data-scope="topic"
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
                </motion.div>
              </motion.div>
              )}
              </AnimatePresence>
              )}
            </div>

            {/* Disabled until there is a brand: the topic has a default, the
                brand cannot have one. */}
            <Button
              type="primary"
              size="large"
              data-scope="continue"
              disabled={!ready}
              onClick={() =>
                onContinue?.({ brand: brand.trim(), topic: review ? reviewTopic : topicLabel })
              }
              style={{ width: '100%', marginTop: 'var(--spacing-gap-800)' }}
            >
              {copy.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
