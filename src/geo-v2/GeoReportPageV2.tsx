import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { Button, Modal, Tag, Tooltip } from 'design-system'
import ExampleReportModal, { PAGE_COUNT, pageSrc } from './ExampleReportModal'
import ShareSnapshotModal, { holdPageScroll } from './ShareSnapshotModal'
import GistNav, { NAV_H } from './GistNav'
import EngineIcon from './EngineIcon'
import { GEO_ENGINES, enginesForTier } from './geoEngines'
import useIsMobile from '../useIsMobile'
import useLayoutMode from './useLayoutMode'
import useTypeScale from './typeScale'
import {
  BRANDS,
  TAIL_BRAND_NAMES,
  type Matchup,
  ANSWERS_BY_ENGINE,
  AUDIT_SLOTS,
  AUDIT_SUMMARY,
  SITE_CHECKS,
  type PageCheck,
  type CheckState,
  MATCHUPS,
  QUICK_SCAN_ENGINES,
  SHARE_BY_ENGINE,
  CITATIONS,
  ANSWERS,
  THE_GIST,
  DEEP_ANALYSIS_PITCH,
  DEEP_ANALYSIS_OFFER,
  GEO_SCORE,
  GEO_SCORE_DESCRIPTOR,
  RAIL_INCLUDES,
  answersFor,
  type Brand,
  type EngineKey,
} from './geoReportPageData'
import TreadMark from './TreadMark'
import MeterRing from './MeterRing'
import { ArrowUpRight, ChevronDown, Close } from './Glyph'


/**
 * The light palette, read out of the stylesheet rather than off the page.
 *
 * The design system declares its light values in a top-level `:root` block and
 * its dark ones inside `@media (prefers-color-scheme: dark)` and
 * `:root[data-theme='dark']`. Only top-level rules whose selector is exactly
 * `:root` are collected, so the dark blocks are skipped by construction —
 * media-query children are not CSSStyleRule at this level, and the attribute
 * selector does not match.
 *
 * Reading them here rather than pinning `data-theme` on the document means
 * nothing the reader is looking at has to be repainted to find out what light
 * looks like. Cross-origin sheets throw on `cssRules` and are skipped; they
 * hold fonts, not tokens.
 */
function lightTokens(): [string, string][] {
  const out: [string, string][] = []
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList
    try {
      rules = sheet.cssRules
    } catch {
      continue
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule) || rule.selectorText !== ':root') continue
      for (let i = 0; i < rule.style.length; i++) {
        const prop = rule.style.item(i)
        if (prop.startsWith('--')) out.push([prop, rule.style.getPropertyValue(prop)])
      }
    }
  }
  return out
}

/**
 * The report, rebuilt table-first — GEO-Lite 73:1062.
 *
 * Replaces three bespoke section layouts with one row idiom and fixed columns.
 * The old page invented a different row anatomy per section (ranked list, dot
 * legend, stacked matchup bars), drew the same "share of a whole" idea three
 * ways, and changed what colour *meant* between sections — ink, then category,
 * then good/bad. Here colour encodes exactly two things: the crawl donut's
 * categories, and a score's level on a `MeterRing`. Tables are black and grey.
 *
 * ── design system ──────────────────────────────────────────────
 * `Button`, `Tag` and `FilterDropdown` come from the real package; every
 * colour, gap, padding and radius is a semantic token.
 *
 * Deliberately NOT using the DS `Table`/`Row`/`Cell`: those render a bordered
 * grid — `Cell` puts `border-right` on every cell and `Table` adds its own
 * border and radius. This design is borderless with hairline row dividers,
 * inside an already-bordered section, so adopting them would mean overriding
 * their border, radius, min-height and padding. That's a real gap worth a
 * `variant="plain"` on Cell/Table rather than a local fork — flagged, not
 * silently forked, and the primitives below are deliberately thin so they can
 * be deleted when it lands.
 *
 * ── motion ─────────────────────────────────────────────────────
 * CSS animations on the document timeline, not a JS tween. Every keyframe
 * declares only a `from`, so the resting style is the finished state and the
 * failure mode is "no animation", never "invisible content". The previous page
 * gated *mounting* on a rAF-driven cue sheet, which rendered an empty left
 * column in a backgrounded tab; a first pass here repeated the mistake with
 * `initial={{ opacity: 0 }}`. Charts animate when they reach the viewport via
 * IntersectionObserver, which resolves in a hidden tab where rAF does not.
 * `prefers-reduced-motion` is handled by one rule in index.css.
 */

/* ── tokens ─────────────────────────────────────────────────── */
const T = {
  page: 'var(--background-surface-page)',
  raised: 'var(--background-surface-raised)',
  sunken: 'var(--background-surface-sunken)',
  ink: 'var(--content-default)',
  muted: 'var(--content-secondary)',
  faint: 'var(--content-disabled)',
  edge: 'var(--border-default)',
  discEdge: 'var(--border-interactive-strong)',
  r_md: 'var(--border-radius-md)',
  g100: 'var(--spacing-gap-100)',
  g200: 'var(--spacing-gap-200)',
  g300: 'var(--spacing-gap-300)',
  g400: 'var(--spacing-gap-400)',
  g600: 'var(--spacing-gap-600)',
  g700: 'var(--spacing-gap-700)',
  g800: 'var(--spacing-gap-800)',
  p200: 'var(--spacing-padding-200)',
  p300: 'var(--spacing-padding-300)',
  p400: 'var(--spacing-padding-400)',
  p600: 'var(--spacing-padding-600)',
  p700: 'var(--spacing-padding-700)',
} as const

/** Off the spacing scale (it stops at 40) — see the notes in Figma. */
const PAGE_PAD = 64
/**
 * The card's top padding, which is not what the other three sides get.
 *
 * Metric-equal padding reads optically unequal here. The masthead's title sits
 * in a 1.13 line box, so leading sits above its cap and the visible gap at the
 * top comes out smaller than the identical padding at the bottom — the title
 * looked pressed against the border while nothing else did.
 *
 * Both values are more than a leading correction would need. Matching the
 * leading alone would make it *measure* even and still read tight, because the
 * title is the largest thing on the page and wants more room than a body-size
 * block. On a phone the effect is worse, not better: the sides drop to 16 and
 * the title only to 28, so the leading is a larger share of a smaller gap, and
 * the title started 18px from the border.
 */
const PAGE_PAD_TOP = { roomy: 88, phone: 32 }
/** The rail's own breathing room against the viewport, deliberately tighter
 *  than the page's 64. The rail is the one element competing with the fold, so
 *  the 80px this frees goes straight into findings rows. */
const RAIL_GAP = 24
const CARD_RADIUS = 16
/** The rail's own width once it is no longer sharing a card. */
/**
 * The rail's own width once it is no longer sharing a card.
 *
 * The pair is centred here, not the report alone — a centred report with the
 * rail beside it needs the rail to fit in (viewport/2 − report/2), which
 * shrinks twice as fast as the viewport and collides below ~1400.
 */
const RAIL_FLOATING_W = 380
/**
 * How wide the report column is allowed to get when it is free to grow.
 *
 * Capped rather than unbounded, and deliberately on the tight side: past
 * roughly this the brand table's four columns start drifting apart — a wide
 * gulf between a brand's name and its mention count is harder to read across,
 * not easier — and the descriptor lines run past a comfortable measure. It is
 * ~90px more than the shared-card layout gives, which is enough for the head
 * to head fixture row to breathe without the page sprawling.
 */
const CONTENT_MAX = 780
/** One "more findings" row: 8px padding, a 22px title, 2px, a 20px blurb, 8px
 *  padding. Tighter than the left column's rows because these carry no
 *  dividers — the 16px they used to have existed to keep text off a rule that
 *  is no longer there, and stacking them closer means more of the list clears
 *  the fade. The list's floor is one of these. */
/**
 * 24 padding + 226 page + 16 + 32 button + 24 padding.
 *
 * The header row went: its label restated what the panel plainly is, and the
 * close moved to an absolute corner, which buys back the row *and* its gap —
 * 48px off a panel that has to share a sticky rail.
 */
const PANEL_H = 322
/** Matches the wrapper's height transition, so the panel is only unmounted
 *  once it has finished rolling up. */
/**
 * The floating preview panel — parked, not deleted.
 *
 * It sat between the two CTAs as a rolled-up page of the paid report, and it
 * worked: it was the most eye-catching thing in the rail. That turned out to
 * be the problem. Reading as the primary action, it pulled attention off
 * "Unlock Deep Analysis", which is the thing the column is actually for.
 *
 * Flip this back to true to bring it back — FullReportPanel and all its motion
 * are still here and still wired, and the plain "See an example" button folds
 * itself away again when the panel takes the space.
 */
const SHOW_FLOATING_PREVIEW = false

/**
 * The composite score, and the rail copy that keys off it. Both halves of one
 * proposal, so one flag turns the whole thing off and the page returns exactly
 * to what it was: the score block unmounts and the offer goes back to the
 * single unconditional pitch and CTA.
 *
 * What it adds: one number at the top of the report, derived from the two
 * sections under it (see GEO_SCORE), and an offer that speaks differently
 * depending on whether that number came back low.
 *
 * The argument against it, kept here because it is the one worth having: the
 * report's three sections each answer a question someone asked for, and a
 * composite answers none of them. It buys a headline at the cost of putting a
 * single number in front of the work, and the number's meaning depends
 * entirely on the choice of visibility measure (see GEO_SCORE's caveat).
 */
const SHOW_GEO_SCORE = true

/**
 * Head to head, off.
 *
 * The free scan cannot afford it. A matchup is not a query — it is an answer
 * that happened to name both brands — so the row's *count* comes free, but its
 * "wins" and its verdict do not: both need a pass over the answer text to judge
 * who was recommended and why, and that is what the free tier has no budget
 * for. A card showing co-occurrence alone would say "you appeared beside these
 * four brands", which is not a finding.
 *
 * Its slot is taken by citations. The section, its data and the answer
 * drill-down are left in place behind this flag rather than deleted, in case
 * it returns in the paid Deep Analysis, where the extraction is affordable.
 */
const SHOW_HEAD_TO_HEAD = false

const PANEL_COLLAPSE_MS = 600
/** One duration shared by the panel's roll and the button's reveal, so the two
 *  read as a single movement rather than one chasing the other. */
const PANEL_ROLL = '0.55s cubic-bezier(0.16, 1, 0.3, 1)'
/** Starts past the cover: a title page proves a document exists, it does not
 *  show what is in it. */
const TEASE_FIRST = 2

/**
 * The report's ramp, with its three display sizes driven by the type scale.
 *
 * Sizes come through custom properties rather than a hook so this stays a
 * module constant: fifteen components read `TYPE`, and threading a hook
 * through all of them to change three numbers would be a worse trade than one
 * declaration the report's root sets per layout. `useTypeScale` is still the
 * source of the values — see the effect in GeoReportPageV2.
 *
 * Only `fontSize` varies. Line heights here are unitless multipliers, so they
 * scale with the size on their own; and the report keeps its own two (1.4 for
 * body, 1.6 for a descriptor) which the scale has no business overriding.
 *
 * `dense` and `eyebrow` are absent from this list on purpose. 14 is the floor
 * the scale sets for data and 12 is its label size, and neither moves at any
 * width — the ramp compresses from the top, never from the bottom.
 *
 * Each `var()` carries its wide value as a fallback, so anything rendering
 * outside the report's subtree — a modal in a portal — gets the desktop size
 * rather than nothing.
 */
const TYPE = {
  h1: {
    fontSize: 'var(--gr-fs-title, 36px)',
    fontWeight: 500,
    lineHeight: 1.13,
    letterSpacing: '0.72px',
  },
  section: { fontSize: 'var(--gr-fs-section, 18px)', fontWeight: 500, lineHeight: 1.4 },
  /** The rail's headline. Two steps down from the 24 it used to be: the offer
   *  card now sits under it, and at 24 the two competed instead of reading as
   *  a finding and then an offer. */
  gist: {
    fontSize: 'var(--gr-fs-section, 18px)',
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0',
  },
  body: { fontSize: 'var(--gr-fs-body, 16px)', fontWeight: 400, lineHeight: 1.4 },
  bodyMed: { fontSize: 'var(--gr-fs-body, 16px)', fontWeight: 500, lineHeight: 1.4 },
  dense: { fontSize: 14, fontWeight: 400, lineHeight: 1.4 },
  /** 14/1.6. Figma 79:2213 sets the Enterprise blurb looser than `dense`. */
  denseLoose: { fontSize: 14, fontWeight: 400, lineHeight: 1.6 },
  /** Every section's sub-line. 16/1.6, not the 14/1.4 an earlier pass used. */
  descriptor: { fontSize: 'var(--gr-fs-body, 16px)', fontWeight: 400, lineHeight: 1.6 },
  denseMed: { fontSize: 14, fontWeight: 500, lineHeight: 1.4 },
  /** 12, sentence case, no tracking. The `eyebrow` below it is a label that
   *  announces a block; this is a footnote under a line it belongs to, and
   *  borrowing the uppercase treatment for it is what made provenance outrank
   *  the page it described. */
  eyebrowQuiet: { fontSize: 12, fontWeight: 400, lineHeight: 1.4 },
  eyebrow: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.72px',
    textTransform: 'uppercase' as const,
  },
} as const

/* ── motion ───────────────────────────────────────────────────
   CSS animations, not a JS tween. The document timeline advances in a
   backgrounded tab where `requestAnimationFrame` does not, and every keyframe
   declares only a `from` — so the resting style is the finished state and a
   frozen or disabled animation can never leave content invisible. See the
   `gr-*` keyframes in index.css. */
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

/* The reveal, in two acts. All three section headers land first, one after
   another — so the reader reads "Brand visibility / Site health / Head to
   intelligence" and knows three metrics exist — and only then do the bodies
   unfurl. No loaders, no checkmarks: the sequence itself is what says "there's
   more below". */
const HEADER_STEP = 0.1
const HEADER_FROM = 0.08
/** Deliberately well after the third header has settled — the pause is the
 *  point, it's what gives the reader time to register that there are three
 *  sections before any of them fills in. */
const BODY_FROM = 1.05
const BODY_STEP = 0.12
const ROW_STEP = 0.03
/** The rail's summary waits for the sections it summarises, then holds a beat
 *  longer — the skeleton is doing useful work in that pause, and the summary
 *  landing last is what makes it read as a conclusion. */
const GIST_AT = 2.35
/** Skeleton starts almost immediately and hands over as the summary lands, so
 *  the two can't drift apart when GIST_AT is retuned. */
const SKELETON_FROM = 0.15
const SKELETON_FOR = GIST_AT - SKELETON_FROM + 0.3
/**
 * The rail's rows arrive with its summary, not after it. Trailing the gist by
 * 100ms plus a 50ms-per-row stagger left the panel showing a heading over
 * ~100px of nothing for a beat — long enough to read as "there are only two
 * findings", which is exactly how it looked.
 */
/** Marks the node for the reduced-motion kill switch in index.css. */
const MOTION_ATTR = { 'data-gr-motion': '' } as const

/** A section's shell + header. */
function settle(index: number) {
  return {
    ...MOTION_ATTR,
    style: {
      animation: `gr-settle 0.5s ${EASE} ${HEADER_FROM + index * HEADER_STEP}s backwards`,
    } as const,
  }
}

/** The body beneath a header, opening to its real height. */
function unfurl(index: number) {
  return {
    ...MOTION_ATTR,
    style: {
      display: 'grid',
      gridTemplateRows: '1fr',
      width: '100%',
      animation: `gr-unfurl 0.6s ${EASE} ${BODY_FROM + index * BODY_STEP}s backwards`,
    } as const,
  }
}

function rowSettle(sectionIndex: number, rowIndex: number) {
  const delay = BODY_FROM + sectionIndex * BODY_STEP + 0.12 + rowIndex * ROW_STEP
  return {
    ...MOTION_ATTR,
    style: { animation: `gr-fade 0.3s ${EASE} ${delay}s backwards` } as const,
  }
}

/* ── table primitives (see the note above about the DS gap) ─── */
function TableEl({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div role="table" aria-label={label} className="flex w-full flex-col items-start">
      {children}
    </div>
  )
}

function Hairline() {
  return <div className="h-px w-full shrink-0" style={{ backgroundColor: T.edge }} />
}

type Col = { w?: number; align?: 'left' | 'right' }

function HeadRow({ cols, labels }: { cols: Col[]; labels: React.ReactNode[] }) {
  return (
    <>
      <div role="row" className="flex w-full items-center" style={{ height: 32 }}>
        {cols.map((c, i) => (
          <Cell key={i} col={c} header>
            {labels[i]}
          </Cell>
        ))}
      </div>
      <Hairline />
    </>
  )
}

function Cell({
  col,
  header,
  children,
}: {
  col: Col
  header?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      role={header ? 'columnheader' : 'cell'}
      className="flex h-full min-w-0 items-center"
      style={{
        width: col.w,
        flex: col.w ? 'none' : '1 1 0',
        justifyContent: col.align === 'right' ? 'flex-end' : 'flex-start',
        gap: T.g300,
        ...(header ? { ...TYPE.denseMed, color: T.muted } : null),
      }}
    >
      {children}
    </div>
  )
}


/** Stands in where there is no sourced mark — the tail brands. Same disc
 *  geometry as BrandDisc so the column of logos stays on one line. */
function InitialDisc({ name, size = 24 }: { name: string; size?: number }) {
  return (
    <span
      aria-hidden
      className="relative flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: T.sunken,
        border: `1px solid ${T.discEdge}`,
        ...TYPE.dense,
        color: T.muted,
      }}
    >
      {name.slice(0, 1)}
    </span>
  )
}

function BrandDisc({ brand, size = 24 }: { brand: Brand; size?: number }) {
  return (
    <span
      className="relative shrink-0 overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: brand.dark ? '#000000' : '#ffffff',
        border: `1px solid ${T.discEdge}`,
      }}
    >
      <img
        src={brand.logo}
        alt=""
        className="absolute left-1/2 top-1/2"
        style={{
          width: `${brand.fit * 100}%`,
          height: `${brand.fit * 100}%`,
          objectFit: 'contain',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </span>
  )
}

function Section({
  title,
  descriptor,
  index,
  aside,
  children,
}: {
  title: string
  /** Optional: a section that captions something further down its body — see
   *  Site health, where the line belongs to the card grid rather than to the
   *  section — renders its own and leaves this out. */
  descriptor?: string
  index: number
  aside?: React.ReactNode
  children: React.ReactNode
}) {
  const mobile = useIsMobile()
  return (
    <section
      {...MOTION_ATTR}
      className="flex w-full flex-col items-start"
      style={{
        ...settle(index).style,
        gap: T.g600,
        padding: T.p400,
        border: `1px solid ${T.edge}`,
        borderRadius: T.r_md,
      }}
    >
      {/* The aside sits on the descriptor's baseline, which works while the
          two are side by side and misreads the moment they are not: at phone
          width the figure landed at the end of the last wrapped line, so
          "what it can do with them. 64" read as one sentence. Stacked, it is
          plainly a separate number. */}
      <div
        className={`flex w-full ${mobile ? 'flex-col items-start' : 'items-end'}`}
        style={{ gap: mobile ? T.g300 : T.g600 }}
      >
        <div className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: T.g200 }}>
          <h2 className="w-full" style={{ ...TYPE.section, color: T.ink }}>
            {title}
          </h2>
          {descriptor && (
            <p className="w-full" style={{ ...TYPE.descriptor, color: T.muted }}>
              {descriptor}
            </p>
          )}
        </div>
        {aside}
      </div>
      {/* Grid wrapper so the body can animate to its real height. The inner
          div carries the overflow clip that makes 0fr actually hide it. */}
      <div {...unfurl(index)}>
        <div
          className="flex flex-col items-start"
          style={{
            gap: T.g600,
            // Vertical clip is what makes the 0fr unfurl hide anything; the
            // horizontal clip was collateral, and it was quietly shaving the
            // highlighted row's bleed off at the card's content edge. Widening
            // the clip box out to the card's padding lets that fill through
            // while the unfurl still works, and the matching padding keeps
            // every column exactly where it was.
            width: `calc(100% + 2 * ${T.p400})`,
            paddingInline: T.p400,
            marginInline: `calc(-1 * ${T.p400})`,
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

/* ── 0. GEO score ───────────────────────────────── */
/**
 * One number for the scan, above the three sections it is made of.
 *
 * Not a Section: it has no table to unfurl and nothing to expand into, and
 * giving it a section index would have pushed every other section's timing
 * along by a step. It lands just ahead of the first section header instead,
 * so it is read first and the sections arrive underneath it as the working.
 *
 * The descriptor is the formula in words, with both inputs and their values.
 * A composite that will not say how it was made is a number to argue with,
 * and these two are checkable against the sections directly below.
 */
/**
 * Sized to carry the number rather than sit beside it. At 100 across with an
 * 8px band the ring reads as a dial; the 32 it was first drawn at, with the
 * figure alongside, read as a bullet with a number after it.
 */
const SCORE_RING = 100
const SCORE_RING_STROKE = 8
/** Long enough to be a movement and not a flicker, short enough that the
 *  reader is not waiting on it to finish before reading the line beside it. */
const SCORE_SPIN = 1.1
/** Both the arc and the number wait for the card to land, then move together
 *  — one gesture, not a card arriving and something happening inside it. */
const SCORE_AT = 0.02
const SCORE_MOVE_AT = SCORE_AT + 0.3

/**
 * Which side of the band the dial sits on.
 *
 * Right keeps one left margin down the whole report: this title, its
 * descriptor and every section heading under it start at the same x, so the
 * band reads as part of the same document as the tables.
 *
 * Left makes the number the first thing read rather than the last, and lines
 * the dial up with the Tread mark in the masthead above it. The cost is that
 * the band's text starts 124px in from everything below it, so the band stops
 * sharing the page's spine.
 */
const SCORE_RING_SIDE: 'left' | 'right' = 'right'

function GeoScore() {
  const { score } = GEO_SCORE
  const phone = useLayoutMode() === 'phone'
  /**
   * The dial keeps its 100px at every width, so on a phone it was taking a
   * third of the band and leaving the descriptor a 166px column — 22
   * characters to a line, which is a word and a half. Stacked, the prose gets
   * the full width.
   *
   * It sits *between* the heading and the descriptor rather than above both,
   * matching the site-health meter: the heading names the measure, the dial
   * is the measure, and the sentence underneath is the working. Putting the
   * dial first instead left the heading stranded between a number and the
   * explanation of that number.
   */
  const stack = phone

  /* The number sits inside the ring, so the ring is the frame around the
     figure rather than a glyph in front of it — and there is no /100 to
     print, because a dial that fills the whole way round says the scale by
     its shape. The ring's aria-label carries it in words. */
  const ring = (
    <div className="relative shrink-0" style={{ width: SCORE_RING, height: SCORE_RING }}>
      <MeterRing
        value={score}
        size={SCORE_RING}
        thickness={SCORE_RING_STROKE}
        duration={SCORE_SPIN}
        delay={SCORE_MOVE_AT}
        label={`GEO score ${score} out of 100`}
      />
      {/* Counts up on the same curve the arc sweeps on. It prints from a
          counter rather than a text node because that is the only way to
          tick a number on the document timeline — see --gr-score in
          index.css. Hidden from assistive tech, which reads the ring. */}
      <span
        aria-hidden
        data-gr-score=""
        {...MOTION_ATTR}
        className="absolute inset-0 flex items-center justify-center"
        style={
          {
            '--gr-score': score,
            counterReset: 'gr-score-n var(--gr-score)',
            animation: `gr-score ${SCORE_SPIN}s ${EASE} ${SCORE_MOVE_AT}s both`,
            ...TYPE.h1,
            color: T.ink,
          } as CSSProperties
        }
      />
    </div>
  )

  const heading = (
    <h2 className="w-full" style={{ ...TYPE.section, color: T.ink }}>
      Overall GEO score
    </h2>
  )
  const descriptor = (
    <p className="w-full" style={{ ...TYPE.descriptor, color: T.muted }}>
      {GEO_SCORE_DESCRIPTOR}
    </p>
  )

  const band = {
    animation: `gr-settle 0.5s ${EASE} ${SCORE_AT}s backwards`,
    padding: T.p400,
    border: `1px solid ${T.edge}`,
    borderRadius: T.r_md,
  } as const

  if (stack) {
    return (
      <section
        data-report="score"
        {...MOTION_ATTR}
        className="flex w-full flex-col items-start"
        style={{ ...band, gap: T.g400 }}
      >
        {heading}
        {ring}
        {descriptor}
      </section>
    )
  }

  return (
    <section
      data-report="score"
      {...MOTION_ATTR}
      className={`flex w-full items-center ${SCORE_RING_SIDE === 'left' ? 'flex-row-reverse' : ''}`}
      style={{ ...band, gap: T.g600 }}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: T.g200 }}>
        {heading}
        {descriptor}
      </div>
      {ring}
    </section>
  )
}

/* ── 1. brand visibility ────────────────────────────────────── */
/** `#`, Brand, then one column per engine the scan ran, then the totals.
 *  Both engines are on screen at once rather than behind a switcher: comparing
 *  where you stand in one model versus the other is the read this table is
 *  for, and a filter made that a thing you had to remember to do. */
/**
 * Rank, brand, then one share per model.
 *
 * Total and Share came off: with two engines on screen, a raw mention count
 * per model plus a combined total plus a combined share was four numbers
 * saying one thing, and the two that mattered — how visible you are in each
 * model — were the two drawn quietest. A share per model is the measure the
 * section is named for.
 *
 * The pair is sized alike, as before, so they read as one measurement taken
 * twice rather than two different columns.
 */
/**
 * One row grammar, shared by all three tables.
 *
 *   rank / index      14/400 muted
 *   row label         14/500 ink      — brand, crawl band, cited domain
 *   supporting count  14/400 muted
 *   headline figure   14/500 ink
 *
 * Rows used to run at 16, which is also the descriptor's size — so data and
 * prose carried the same weight and the sections read flat. At 14 the ladder
 * is 18 title / 16 descriptor / 14 data, and a row looks like a row.
 */
const SHARE_COLS: Col[] = [{ w: 40 }, {}, { w: 88, align: 'right' }, { w: 88, align: 'right' }]
/**
 * The same four columns, on a phone.
 *
 * The fixed ones are set for a 690px column, and at 358 they stop being a
 * ratio and start being a claim: rank 40 plus two engines at 88 is 216 of the
 * 326 available, and the brand — the one thing every row is about — was left
 * 38px to fit "New Balance" in. Every name in the table's tail truncated.
 *
 * So the fixed columns give way first, because they are the ones holding a
 * number three characters long in space built for a header. The flexible
 * column takes what they release.
 */
const SHARE_COLS_PHONE: Col[] = [{ w: 26 }, {}, { w: 50, align: 'right' }, { w: 50, align: 'right' }]

/** The engines the free scan queries, in the order their columns appear. */
const SCAN_ENGINES = QUICK_SCAN_ENGINES.map((key) => GEO_ENGINES.find((e) => e.key === key)!)
/** Brand rows carry no dividers, so they don't need the height a rule wanted
 *  either — six brands read as one block rather than six banded strips. */
const BRAND_ROW_H = 40
/** Long enough to read as the list opening, short enough that nobody clicking
 *  it twice is kept waiting. */
const TAIL_MS = 380

function BrandVisibility() {
  const phone = useLayoutMode() === 'phone'
  const cols = phone ? SHARE_COLS_PHONE : SHARE_COLS
  const rows = SHARE_BY_ENGINE.all
  const answers = ANSWERS_BY_ENGINE.all

  /** A brand's share of voice within one model, read from that model's own
   *  rows. Nothing is derived here, so a column can't disagree with the data. */
  const byEngine = (brandName: string, key: EngineKey) =>
    SHARE_BY_ENGINE[key].find((r) => r.brand.name === brandName)?.pct ?? 0
  const you = rows.find((r) => r.you)
  /** Derived, so it disappears on an engine where there is no gap. */
  const gap = you ? you.rank - 1 - rows.filter((r) => !r.you).length : 0

  const ordered = rows.filter((r) => !r.you)
  const [showTail, setShowTail] = useState(false)

  /**
   * The ranks between the last visible brand and Tread, derived rather than
   * stored — the scan holds real figures for five brands only.
   *
   * Every count interpolates from the last real row down to Tread's, so the
   * columns stay monotonic and land exactly on Tread's numbers rather than
   * contradicting the row beneath them. That only adds up because the run is
   * ~400 mentions and the gap is ten brands: an earlier pass ran the same
   * interpolation across thirty brands in a 240-mention run, where each one
   * needed at least Tread's count and collectively they could not fit — the
   * Share column summed past 300% once expanded.
   */
  const tail = (() => {
    if (!you || gap <= 0) return []
    const from = ordered[ordered.length - 1]
    const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t)
    return Array.from({ length: gap }, (_, i) => {
      const t = (i + 1) / (gap + 1)
      return {
        rank: from.rank + 1 + i,
        name: TAIL_BRAND_NAMES[i % TAIL_BRAND_NAMES.length],
        // Each model's column steps from the last real row down to yours, so
        // both columns stay monotonic and land exactly on your figures rather
        // than contradicting the row beneath them.
        shares: SCAN_ENGINES.map((e) =>
          lerp(byEngine(from.brand.name, e.key as EngineKey), byEngine(you.brand.name, e.key as EngineKey), t),
        ),
      }
    })
  })()

  return (
    <Section
      index={0}
      title="Brand visibility"
      descriptor={`Share of voice in each model, across ${answers} AI answers.`}
    >
      <TableEl label="Share of brand mentions">
        <HeadRow
          cols={cols}
          labels={[
            '#',
            'Brand',
            // The mark alone, with the name on hover. Tried the names inline
            // once the Total and Share columns freed the room; the marks are
            // what anyone recognises, and two spelled-out engine names put more
            // weight in the head than in the rows under it.
            //
            // The name lives on the wrapper rather than inside EngineIcon —
            // that component takes a fixed set of props and would have dropped
            // it — so the column is still named for a screen reader, which a
            // tooltip alone would not do.
            //
            // 20, not the 16 this mark uses elsewhere: everywhere else it sits
            // beside a word and only has to identify it, while here it is the
            // column's entire label.
            ...SCAN_ENGINES.map((e) => (
              <Tooltip key={e.key} content={e.name} side="top">
                <span role="img" aria-label={e.name} className="inline-flex items-center align-middle">
                  <EngineIconFor engineKey={e.key} size={20} />
                </span>
              </Tooltip>
            )),
          ]}
        />
        {ordered.map((r, i) => (
          <div key={r.brand.name} {...rowSettle(0, i)} className="w-full">
            <div role="row" className="flex w-full items-center" style={{ height: BRAND_ROW_H }}>
              <Cell col={cols[0]}>
                <span style={{ ...TYPE.dense, color: T.muted }}>{r.rank}</span>
              </Cell>
              <Cell col={cols[1]}>
                <BrandDisc brand={r.brand} />
                <span className="truncate" style={{ ...TYPE.denseMed, color: T.ink }}>
                  {r.brand.name}
                </span>
              </Cell>
              {SCAN_ENGINES.map((e, c) => (
                <Cell key={e.key} col={cols[2 + c]}>
                  <span className="tabular-nums" style={{ ...TYPE.denseMed, color: T.ink }}>
                    {byEngine(r.brand.name, e.key as EngineKey)}%
                  </span>
                </Cell>
              ))}
            </div>
          </div>
        ))}

        {/* The rank jump, now openable. Someone sitting at #44 cares far more
            about the brands immediately above them than about the leader, and
            as a row of dashes this read as missing data rather than as the
            distance it actually represents. */}
        {gap > 0 && (
          <div {...rowSettle(0, ordered.length)} className="w-full">
            <button
              type="button"
              onClick={() => setShowTail((v) => !v)}
              aria-expanded={showTail}
              data-report="more-brands"
              className="flex w-full items-center"
              style={{ height: BRAND_ROW_H - 4 }}
            >
              <Cell col={cols[0]}>
                <span style={{ ...TYPE.dense, color: T.faint }}>⋯</span>
              </Cell>
              <Cell col={cols[1]}>
                <span className="flex items-center" style={{ gap: T.g200 }}>
                  <span style={{ ...TYPE.dense, color: T.faint }}>
                    {showTail ? 'Hide' : 'Show'} {gap} more brands
                  </span>
                  <ChevronDown
                    size={16}
                    className="transition-transform"
                    style={{ color: T.faint, transform: showTail ? 'rotate(180deg)' : 'none' }}
                  />
                </span>
              </Cell>
              {/* No dashes: this row is a distance, not a brand with missing
                  figures, and a line of em-dashes read as data that failed to
                  load. The rank and the count in the label carry it. */}
              {cols.slice(2).map((col, c) => (
                <Cell key={c} col={col}>
                  {null}
                </Cell>
              ))}
            </button>
          </div>
        )}

        {/* Opens and closes on a height transition rather than appearing and
            vanishing. Same technique the sections' own unfurl uses — a grid
            whose single row goes 0fr → 1fr, with the inner box clipping — but
            as a `transition` rather than an animation, because this one has to
            run in both directions.

            The rows stay mounted either way; gating them on `showTail` meant
            there was nothing left to animate on the way out. */}
        {/* The plain wrapper matters: TableEl is a flex column, and as a
            direct flex item the grid's `1fr` had no height to resolve against
            — it computed to 0px and the list never opened. Inside a block box
            the track sizes to its content the way the technique expects. */}
        <div className="w-full">
        <div
          style={{
            display: 'grid',
            gridTemplateRows: showTail ? '1fr' : '0fr',
            transition: `grid-template-rows ${TAIL_MS}ms ${EASE}`,
          }}
        >
          <div
            style={{
              overflow: 'hidden',
              minHeight: 0,
              // Trails the height slightly on the way in so the rows read as
              // arriving into space that has already opened, rather than
              // being pushed out of a closed box.
              opacity: showTail ? 1 : 0,
              transition: `opacity ${TAIL_MS * 0.6}ms ${EASE} ${showTail ? TAIL_MS * 0.3 : 0}ms`,
            }}
          >
          {tail.map((t) => (
            <div key={t.rank} className="w-full">
              <div role="row" className="flex w-full items-center" style={{ height: BRAND_ROW_H }}>
                <Cell col={cols[0]}>
                  <span style={{ ...TYPE.dense, color: T.muted }}>{t.rank}</span>
                </Cell>
                <Cell col={cols[1]}>
                  <InitialDisc name={t.name} />
                  <span className="truncate" style={{ ...TYPE.dense, color: T.muted }}>{t.name}</span>
                </Cell>
                {t.shares.map((v, c) => (
                  <Cell key={c} col={cols[2 + c]}>
                    <span className="tabular-nums" style={{ ...TYPE.dense, color: T.muted }}>
                      {v}%
                    </span>
                  </Cell>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
        </div>

        {you && (
          <div {...rowSettle(0, ordered.length + 1)} className="w-full">
            {/* Tinted, not just tagged: every brand mark here is black-and-white,
                so "which one is me" was work. `interactive/selected` is the
                system's own "you are here" role, and the negative margin lets
                the band bleed past the columns without shifting them. */}
            <div
              role="row"
              className="flex items-center"
              style={{
                height: BRAND_ROW_H,
                backgroundColor: T.sunken,
                // An outline, not a border: a border is part of the box under
                // `box-sizing: border-box`, so it stole a pixel from each side
                // and knocked this row's columns out of line with the others.
                // The negative offset draws it inside the rounded rect.
                outline: `1px solid ${T.edge}`,
                outlineOffset: -1,
                borderRadius: T.r_md,
                // The band bleeds 12 past the columns on each side. The width
                // has to grow by that same 24 as well: `box-sizing: border-box`
                // means padding eats into the box, so margin + padding alone
                // left this row's content 24 narrower than every other row and
                // knocked the columns out of alignment.
                // Bleeds halfway out into the card's 16 padding: far enough
                // that the numbers aren't sitting at the fill's edge, short
                // enough that the band still reads as a row inside the card
                // rather than a stripe across it. The matching width keeps the
                // content box at exactly 100%, so the columns never move.
                width: `calc(100% + 2 * ${T.p200})`,
                paddingInline: T.p200,
                marginInline: `calc(-1 * ${T.p200})`,
              }}
            >
              <Cell col={cols[0]}>
                <span style={{ ...TYPE.dense, color: T.muted }}>{you.rank}</span>
              </Cell>
              <Cell col={cols[1]}>
                <BrandDisc brand={you.brand} />
                <span style={{ ...TYPE.denseMed, color: T.ink }}>{you.brand.name}</span>
                <Tag size="medium">You</Tag>
              </Cell>
              {SCAN_ENGINES.map((e, c) => (
                <Cell key={e.key} col={cols[2 + c]}>
                  <span className="tabular-nums" style={{ ...TYPE.denseMed, color: T.ink }}>
                    {byEngine(you.brand.name, e.key as EngineKey)}%
                  </span>
                </Cell>
              ))}
            </div>
          </div>
        )}
      </TableEl>
    </Section>
  )
}

function EngineIconFor({ engineKey, size = 16 }: { engineKey: string; size?: number }) {
  const eng = GEO_ENGINES.find((e) => e.key === engineKey)
  if (!eng) return null
  return <EngineIcon icon={eng.icon} iconFrame={eng.iconFrame} size={size} />
}

/* ── 2. site health ─────────────────────────────────────────── */
/**
 * The sample, drawn as a sample.
 *
 * This section used to open with a ring over 4,182 crawled pages split into
 * four bands. The engine does not crawl a site. It picks a handful of pages by
 * the role each one plays for the topic and inspects those — five on the free
 * scan — so there was never a population for a ring to divide, and every slice
 * one could draw over five pages lands on a multiple of twenty per cent: more
 * precision in the shape than in the data behind it.
 *
 * What is here now is a meter and six cards. The meter is not the donut coming
 * back: a donut claims a part-to-whole, and a 0–100 score is a magnitude, which
 * is what a meter draws. Beside it sits the arithmetic that produces the
 * number, because a composite nobody can check is a number to argue with.
 *
 * The cards are one per slot, and everything about a slot is on its own card —
 * which role, which URL, how we found it, how it scored. Two earlier passes
 * pooled the checks into a strip or a bar at the top of the card and repeated
 * the counts in rows underneath; both left the reader matching group four to
 * row four by position, for a picture that showed nothing the rows did not.
 *
 * Site-wide is a card because it is four checks the score already counts, and
 * a card that leaves them out cannot be added up: the four page cards come to
 * 18 of 23 against a meter reading 21 of 33. With this card and the line beside
 * the meter, every number on the section reconciles.
 */
const CARD_GAP = 12
const PIP_W = 10
const PIP_H = 16

/** One check. A bar rather than a dot: at this size a row of them reads as a
 *  tally, which is what it is. */
function Pip({ state }: { state: CheckState }) {
  return (
    <span
      className="shrink-0"
      style={{
        width: PIP_W,
        height: PIP_H,
        borderRadius: 3,
        backgroundColor:
          state === 'pass'
            ? 'var(--content-status-success)'
            : // The brighter tokenised yellow. `content/status-warning` is a
              // text ink and goes muddy beside the green at this size.
              'var(--chart-status-warning)',
      }}
    />
  )
}

/**
 * The section's meter borrows the GEO score's dial outright rather than
 * carrying its own geometry.
 *
 * It was drawn at 101/13, which put a noticeably heavier ring on a supporting
 * figure than the page's headline one wears at 100/8 — two dials in one
 * document that disagree about how thick a dial is. Bound to the same
 * constants, they cannot drift apart again, and if the GEO score's dial is
 * ever retuned this follows it.
 */
const METER = SCORE_RING
const METER_STROKE = SCORE_RING_STROKE
const METER_SPIN = SCORE_SPIN

/**
 * True once the node has been on screen, and never false again.
 *
 * Deliberately optimistic in every direction it can fail: no
 * IntersectionObserver, no ref, or an observer that throws all resolve to
 * true immediately. The only thing this gate is allowed to do is postpone a
 * movement — if it cannot tell whether the element is visible, the answer is
 * yes, and the caller draws its finished state.
 */
function useSeen(ref: React.RefObject<HTMLElement | null>, threshold = 0.6) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    let io: IntersectionObserver
    try {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setSeen(true)
            io.disconnect()
          }
        },
        { threshold },
      )
      io.observe(el)
    } catch {
      setSeen(true)
      return
    }
    return () => io.disconnect()
  }, [ref, threshold])
  return seen
}

function HealthMeter() {
  const ref = useRef<HTMLDivElement>(null)
  // This card sits below the fold on every viewport the report is read at, so
  // on load its sweep was finished before anyone scrolled to it. The cue is
  // held here rather than inside the meter — see the note on `play`.
  const play = useSeen(ref)

  return (
    <div ref={ref} className="relative shrink-0" style={{ width: METER, height: METER }}>
      <MeterRing
        value={GEO_SCORE.health}
        size={METER}
        thickness={METER_STROKE}
        duration={METER_SPIN}
        // No delay on a scroll cue: the card is already on screen by the time
        // this fires, so the wait the load path used to let the card land
        // first would just be dead air.
        delay={0}
        play={play}
        label={`Site health, ${GEO_SCORE.health} out of 100`}
      />
      {/* Counts up on the same curve and the same clock as the arc, the way
          the GEO score at the top of the page does. It was a plain text node,
          so the ring swept in around a number that was already sitting there —
          which reads as the meter not animating at all.

          Printed from a counter rather than written as text because that is
          the only way to tick a number on the document timeline; see
          --gr-score in index.css. Hidden from assistive tech, which reads the
          ring's own label. */}
      <span
        aria-hidden
        data-gr-score=""
        {...MOTION_ATTR}
        className="absolute inset-0 flex items-center justify-center"
        style={
          {
            '--gr-score': GEO_SCORE.health,
            counterReset: 'gr-score-n var(--gr-score)',
            // Same gate as the arc, so the two stay one gesture. Without the
            // animation the counter still prints the real value.
            ...(play ? { animation: `gr-score ${METER_SPIN}s ${EASE} 0s both` } : null),
            ...TYPE.h1,
            color: T.ink,
          } as CSSProperties
        }
      />
    </div>
  )
}

type AuditCardData = {
  role: string
  /** The line under the role: a path, or why there is no path. */
  detail: string
  /** The quiet third line: how the URL was found, or how the row was run. */
  meta?: string
  url?: string
  checks: PageCheck[]
  missing?: boolean
}

/** Strips the domain. It is the reader's own site and repeating it on four
 *  cards is four lines of noise; the path is what distinguishes them. */
const pathOf = (url: string) => url.replace(/^[^/]+/, '') || '/'

/**
 * Card order: what we audited, then the host, then what was not there.
 *
 * The empty slot is last rather than in source order, so the grid ends on the
 * gap instead of putting it mid-row with a filled card beside it. It also
 * keeps every card that carries pips together, which is what makes the column
 * of counts scannable.
 */
function auditCards(): AuditCardData[] {
  const audited: AuditCardData[] = AUDIT_SLOTS.filter((s) => s.status === 'audited').map((s) => ({
    role: s.role,
    detail: pathOf(s.url ?? ''),
    meta: s.via,
    url: s.url,
    checks: s.checks,
  }))

  const unfilled: AuditCardData[] = AUDIT_SLOTS.filter((s) => s.status !== 'audited').map((s) => ({
    role: s.role,
    // Explanation before consequence: the card read "Help or FAQ page / 6
    // checks could not run / No page on the site fills this role", which
    // announced the cost before the cause.
    detail: 'No page on the site fills this role',
    meta: `${s.expected ?? 0} checks could not run`,
    checks: [],
    missing: true,
  }))

  return [
    ...audited,
    {
      role: 'Site-wide',
      detail: 'robots.txt, sitemap, llms.txt, host',
      meta: 'Checked once, not per page',
      checks: SITE_CHECKS,
    },
    ...unfilled,
  ]
}

function AuditCard({ card, index }: { card: AuditCardData; index: number }) {
  const shown = card.checks.filter((c) => c.state !== 'na')
  const passed = shown.filter((c) => c.state === 'pass').length

  return (
    <div
      {...rowSettle(1, index)}
      data-report="audit-card"
      className="flex min-w-0 flex-col"
      style={{
        gap: T.g200,
        padding: T.p300,
        borderRadius: T.r_md,
        // Dashed and unfilled: a slot we could not fill should read as an
        // outline waiting for content rather than as a card with content in it.
        border: `1px ${card.missing ? 'dashed' : 'solid'} ${T.edge}`,
        backgroundColor: card.missing ? 'transparent' : T.sunken,
      }}
    >
      <span className="truncate" style={{ ...TYPE.denseMed, color: card.missing ? T.muted : T.ink }}>
        {card.role}
      </span>

      <span className="truncate" style={{ ...TYPE.dense, color: T.muted }}>
        {card.url ? (
          <a
            href={`https://${card.url}`}
            target="_blank"
            rel="noreferrer noopener"
            data-report="audit-link"
            className="hover:underline"
            style={{ color: 'inherit', textUnderlineOffset: 3 }}
          >
            {card.detail}
          </a>
        ) : (
          card.detail
        )}
      </span>

      {/* 12, under a 14. Provenance led these cards as an uppercase,
          letterspaced eyebrow above the role, which put the least important of
          the three lines at the top and sent the eye to SITEMAP before
          "Product page". */}
      {card.meta && (
        <span className="truncate" style={{ ...TYPE.eyebrowQuiet, color: T.muted }}>
          {card.meta}
        </span>
      )}

      {shown.length > 0 && (
        <div className="flex items-center justify-between" style={{ gap: T.g300, marginTop: T.g100 }}>
          <span className="flex items-center" style={{ gap: 4 }} aria-hidden>
            {shown.map((c, i) => (
              <Pip key={`${c.label}-${i}`} state={c.state} />
            ))}
          </span>
          <span className="shrink-0" style={{ ...TYPE.denseMed, color: T.ink }}>
            {passed} of {shown.length}
          </span>
        </div>
      )}
    </div>
  )
}

function SiteHealth() {
  const mobile = useIsMobile()
  const cards = auditCards()

  return (
    <Section index={1} title="Site health">
      {/* The working, then the meter it produces. The summary used to be split
          between a line here and a footer under the grid, which said the same
          thing twice and left the ring alone on a band two thirds empty.

          Dial on the right, matching the GEO score band at the top of the
          page. Two reasons beyond the two dials lining up: the card reads
          working-then-result the way that one does, rather than announcing the
          answer and explaining it afterwards; and the title, the caption and
          all six cards start at the card's left edge, so a meter on the left
          was indenting the one paragraph that should share that margin.

          On a phone the meter goes first. Stacked, "right" means "underneath",
          and a number arriving after three lines of arithmetic reads as a
          footnote rather than the figure the section is about. */}
      <div
        className={`flex w-full ${mobile ? 'flex-col items-start' : 'flex-row-reverse items-center'}`}
        style={{ gap: mobile ? T.g400 : T.g700 }}
      >
        <HealthMeter />
        <p className="min-w-0 flex-1" style={{ ...TYPE.denseLoose, color: T.muted }}>
          {AUDIT_SUMMARY}
        </p>
      </div>

      {/* Caption and grid as one block, on a tighter gap than the section's
          own, so the line reads as a label on the cards rather than as a
          second paragraph floating between them and the meter.

          An eyebrow, not a descriptor. At 16 it was the same size as a
          section's own sub-line, so sitting between the working text and the
          grid it read as a second paragraph rather than as a label on
          something — this is the treatment the report already uses to head a
          block, in Brand visibility and Citations.

          "Where we looked" rather than "The 5 pages AI reaches for on this
          topic": the grid holds six cards now, one of them the host rather
          than a page, and one of them a page we looked for and did not find.
          No hairline under it — the cards carry their own borders, and a rule
          would be a third horizontal line in 20px. */}
      <div className="flex w-full flex-col items-start" style={{ gap: T.g300 }}>
        <span style={{ ...TYPE.eyebrow, color: T.muted }}>Where we looked</span>
        <div
          className="w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
            gap: CARD_GAP,
            alignItems: 'stretch',
          }}
        >
          {cards.map((c, i) => (
            <AuditCard key={c.role} card={c} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}


/* ── 3. citations ───────────────────────────────────────────── */
/**
 * Built from this page's own table idiom rather than the Figma card, which
 * predates the rest of the report: it drew a translucent white panel at radius
 * 16 with 18px rows, 38px logos and a blue pill per row. Next to Brand
 * visibility — 12px heads, 14px rows, 24px discs, hairline dividers, borderless
 * inside a bordered section — it read as a component from another product.
 *
 * The blue pill is the one thing dropped outright rather than restyled. It was
 * a link affordance, and no row anywhere else in this report is a link; it also
 * bound `color/blue/25`, a raw ramp step rather than a semantic role, which
 * would have made it the only blue in a document where colour means exactly
 * two things. Worth adding back as a real link treatment if the sources should
 * be clickable, but not as the only one of its kind.
 *
 * Columns mirror Brand visibility exactly — rank, who, count, share — so the
 * two tables read as the same measurement taken twice.
 */
const CITATION_COLS: Col[] = [{ w: 40 }, {}, { w: 88, align: 'right' }, { w: 72, align: 'right' }]
/**
 * Three columns on a phone, not four.
 *
 * Same starting problem as SHARE_COLS_PHONE and worse: the source column had
 * 36px for domains needing up to 143, and the "you" row's own domain was down
 * to nothing at all. Narrowing the fixed columns was not enough on its own —
 * a domain like roadrunnersports.com wants 143px and even a stripped-back
 * four-column row could only find about 136.
 *
 * So Answers goes, and Share stays. They are the same measurement twice, one
 * raw and one as a proportion; the section's own descriptor already prints the
 * denominator ("across 80 answers"), which is what makes the count
 * reconstructable and the percentage the one worth keeping. Dropping the
 * percentage instead would have left a column of small integers with nothing
 * to read them against.
 */
const CITATION_COLS_PHONE: Col[] = [{ w: 26 }, {}, { w: 52, align: 'right' }]

function Citations() {
  const phone = useLayoutMode() === 'phone'
  const citeCols = phone ? CITATION_COLS_PHONE : CITATION_COLS
  const rows = CITATIONS
  return (
    <Section
      index={2}
      title="Citations"
      descriptor={`Sources the engines drew on across ${ANSWERS} answers.`}
    >
      <TableEl label="Sources cited">
        {/* HeadRow draws its own rule — a second one here stacked two
            hairlines and read heavier than every other table. */}
        <HeadRow
          cols={citeCols}
          labels={phone ? ['#', 'Source', 'Share'] : ['#', 'Source', 'Answers', 'Share']}
        />
        {rows.map((r, i) => (
          <div
            key={r.domain}
            role="row"
            {...rowSettle(2, i)}
            className="flex items-center"
            style={{
              height: BRAND_ROW_H,
              width: '100%',
              // Identical to the "you" row in Brand visibility — fill, outline
              // drawn inside the rounded rect, and the same half-bleed into the
              // card's padding with a matching width so the columns never move.
              ...(r.you
                ? {
                    backgroundColor: T.sunken,
                    outline: `1px solid ${T.edge}`,
                    outlineOffset: -1,
                    borderRadius: T.r_md,
                    width: `calc(100% + 2 * ${T.p200})`,
                    paddingInline: T.p200,
                    marginInline: `calc(-1 * ${T.p200})`,
                  }
                : null),
            }}
          >
            <Cell col={citeCols[0]}>
              <span style={{ ...TYPE.dense, color: T.muted }}>{r.rank}</span>
            </Cell>
            <Cell col={citeCols[1]}>
              <span className="flex min-w-0 items-center" style={{ gap: T.g300 }}>
                {r.brand ? (
                  <BrandDisc brand={r.brand} />
                ) : (
                  <span
                    className="relative shrink-0 overflow-hidden rounded-full"
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: '#ffffff',
                      border: `1px solid ${T.discEdge}`,
                    }}
                  >
                    <img
                      src={r.logo}
                      alt=""
                      className="absolute inset-0 size-full"
                      style={{ objectFit: 'cover' }}
                    />
                  </span>
                )}
                {/* The source is the one thing on this page worth leaving for:
                    it is where the answer came from. A link on the name rather
                    than a button in its own column — the row has four columns
                    already, and the mark belongs to the name it opens.

                    The Figma drew this as a blue pill per row. Dropped: it
                    bound a raw ramp step rather than a semantic role, and would
                    have been the only blue in a report where colour means two
                    things. The arrow says "leaves the page" without one. */}
                <a
                  href={`https://${r.domain}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-report="citation-link"
                  className="group/cite flex min-w-0 items-center"
                  style={{ gap: T.g100 }}
                >
                  <span
                    className="truncate group-hover/cite:underline"
                    style={{ ...TYPE.denseMed, color: T.ink, textUnderlineOffset: 3 }}
                  >
                    {r.domain}
                  </span>
                  <ArrowUpRight size={14} style={{ color: T.faint }} />
                </a>
                {/* Not on a phone. The row already says it is yours — sunken
                    fill, outline, its own radius — and the tag was the last
                    thing standing between treadrunning.com and fitting on the
                    line. A label that repeats what the row's own treatment
                    already carries is the right thing to drop first. */}
                {r.you && !phone && <Tag size="medium">You</Tag>}
              </span>
            </Cell>
            {!phone && (
              <Cell col={citeCols[2]}>
                <span className="tabular-nums" style={{ ...TYPE.dense, color: T.muted }}>
                  {r.answers}
                </span>
              </Cell>
            )}
            <Cell col={citeCols[phone ? 2 : 3]}>
              <span className="tabular-nums" style={{ ...TYPE.denseMed, color: T.ink }}>
                {r.pct}%
              </span>
            </Cell>
          </div>
        ))}
      </TableEl>
    </Section>
  )
}

/* ── 4. competitive intelligence ────────────────────────────── */
/** Tread — the fixed side of every matchup, so a row can show both sides. */
/** Tread — the fixed side of every matchup, so a row can show both sides. */
const YOU = BRANDS.tread

/** Sorted so the matchups being won sit together at the top. */
const byMargin = (a: Matchup, b: Matchup) =>
  b.wins - (b.comparisons - b.wins) - (a.wins - (a.comparisons - a.wins))

/* ── head to head ───────────────────────────────────────────── */
/**
 * Tread on the left, the rival on the right, the score between them — the
 * layout of a fixture, which is what makes it read as a contest without any
 * label saying so. Earlier passes put both brands on the left and the row
 * scanned as a profile of the rival.
 *
 * The bar underneath is one two-sided split, not a progress meter: the fill is
 * Tread's share of the comparisons, so the unpainted remainder is exactly the
 * rival's. The tick at the halfway mark is what makes that legible — without
 * it, "is 5–3 comfortable or narrow" is arithmetic.
 *
 * Sorted by margin, so the matchups being won group at the top.
 */
/**
 * The answers behind one score.
 *
 * Opened from the count under a matchup, which used to read as a link to a
 * list that did not exist. Now it is one: every answer that named both brands,
 * and which way each went. Wins first, because the question the score provokes
 * is "which ones did I win".
 */
function MatchupAnswers({ matchup, onClose }: { matchup: Matchup | null; onClose: () => void }) {
  const answers = matchup ? answersFor(matchup) : []
  const losses = matchup ? matchup.comparisons - matchup.wins : 0
  return (
    <Modal
      open={!!matchup}
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
      size="medium"
      title={matchup ? `Tread vs ${matchup.brand.name}` : ''}
      description={
        matchup
          ? `${matchup.comparisons} answers name both. Tread is picked in ${matchup.wins}, ${matchup.brand.name} in ${losses}.`
          : undefined
      }
    >
      <ul className="m-0 flex w-full list-none flex-col p-0">
        {answers.map((a, i) => (
          <li key={`${a.question}-${i}`} className="w-full">
            {i > 0 && <Hairline />}
            <div
              className="flex w-full items-center"
              style={{ gap: T.g300, paddingBlock: T.p300 }}
            >
              <EngineIconFor engineKey={a.engine} />
              <span className="min-w-0 flex-1" style={{ ...TYPE.body, color: T.ink }}>
                {a.question}
              </span>
              {/* The outcome, not a score: each answer went one way or the
                  other, and the tally above already carries the arithmetic. */}
              <Tag type={a.won ? 'success' : 'default'} size="small">
                {a.won ? 'Tread' : matchup?.brand.name}
              </Tag>
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

function HeadToHead() {
  const rows = [...MATCHUPS].sort(byMargin)
  const [open, setOpen] = useState<Matchup | null>(null)
  return (
    <Section index={2} title="Head to head" descriptor="Answers that name Tread and a rival together.">
      <div className="flex w-full flex-col">
        {rows.map((m, i) => {
          const losses = m.comparisons - m.wins
          const leading = m.wins > losses
          // straight from the data, so a bar cannot disagree with its score
          const pct = (m.wins / m.comparisons) * 100
          return (
            <div key={m.brand.name} {...rowSettle(2, i)} className="w-full">
              <div
                className="flex w-full flex-col items-start"
                style={{ gap: T.g200, paddingBlock: T.p300 }}
              >
                {/* three tracks, so the score sits centred however long the
                    rival's name runs */}
                <div className="flex w-full items-center" style={{ gap: T.g300 }}>
                  <span className="flex min-w-0 flex-1 items-center" style={{ gap: T.g200 }}>
                    <BrandDisc brand={YOU} size={24} />
                    <span style={{ ...TYPE.bodyMed, color: T.ink }}>Tread</span>
                  </span>
                  <span className="shrink-0 tabular-nums" style={{ ...TYPE.section, color: T.ink }}>
                    {m.wins} <span style={{ color: T.muted }}>&mdash;</span> {losses}
                  </span>
                  <span className="flex min-w-0 flex-1 items-center justify-end" style={{ gap: T.g200 }}>
                    <span className="truncate" style={{ ...TYPE.bodyMed, color: T.ink }}>
                      {m.brand.name}
                    </span>
                    <BrandDisc brand={m.brand} size={24} />
                  </span>
                </div>

                <span
                  className="relative block w-full"
                  style={{ height: 4, borderRadius: 999, backgroundColor: T.sunken }}
                >
                  <span
                    className="absolute top-0 left-0 block"
                    style={{
                      height: 4,
                      width: `${pct}%`,
                      borderRadius: 999,
                      backgroundColor: leading
                        ? 'var(--content-status-success)'
                        : 'var(--chart-status-warning)',
                    }}
                  />
                  {/* stands proud of a 4px bar, and dark enough to read on the
                      fill and the track alike — a grey tick disappeared on both */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 block -translate-x-1/2"
                    style={{ top: -3, width: 1, height: 10, backgroundColor: T.ink }}
                  />
                </span>

                <div className="flex w-full items-baseline justify-between" style={{ gap: T.g300 }}>
                  <p className="min-w-0" style={{ ...TYPE.dense, color: T.muted }}>{m.verdict}</p>
                  {/* It reads as a link because it is one now — the answers
                      behind the score, which is the question the number was
                      provoking anyway. */}
                  <button
                    type="button"
                    data-report="matchup-answers"
                    onClick={() => setOpen(m)}
                    className="shrink-0 underline decoration-dotted underline-offset-4"
                    style={{ ...TYPE.dense, color: T.muted }}
                  >
                    from {m.comparisons} answers
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <MatchupAnswers matchup={open} onClose={() => setOpen(null)} />
    </Section>
  )
}

/* ── right rail ─────────────────────────────────────────────── */

/**
 * True once the findings list has more rows than its box can show, so the
 * fade is only applied when something is actually cut off — a permanent
 * gradient over a list that fits just looks like a rendering bug.
 */
/**
 * Fits the rail to the viewport by sizing the ONE part that may give up
 * height — the findings list — rather than capping the whole rail.
 *
 * Capping the rail didn't work: with the list holding a min-height and the CTA
 * blocks refusing to shrink, the column couldn't satisfy everyone and the list
 * overflowed its parent, drawing straight under the Unlock button. Sizing the
 * list means the rail is always exactly the sum of its parts, so nothing can
 * overlap.
 *
 * Fitting the viewport wins over showing every finding: below the height that
 * fits them all, the list gives up rows rather than let the panel run past the
 * fold. One row is the hard floor.
 */
/**
 * Stands in for the summary until it arrives, so the panel reads as loading
 * rather than empty. Bars are sized to the lines they replace and carry a
 * travelling highlight.
 *
 * Overlaid rather than swapped: resting opacity is 0, so with animations off
 * (or reduced motion) there is no placeholder at all — just the real content,
 * which is already in the DOM underneath.
 */
/** What a Deep Analysis covers — the Free Scan sees two of these three. Drawn
 *  from the tier list, so these marks and the "N Engines" label beside them
 *  come from one source. */
const RAIL_ENGINES = enginesForTier('full')

const OFFER_ENGINE_SIZE = 22

/**
 * The offer head's gradient. A literal, and deliberately the same in both
 * themes: it is brand artwork rather than a surface, the way `--brand-mint`
 * is. The sunken wash underneath it is what the design layers it over, so it
 * stays too — visible only where the gradient is transparent.
 */
const OFFER_GRADIENT =
  'linear-gradient(114.5deg, rgb(14, 59, 126) 2.2%, rgb(23, 96, 204) 50.17%, rgb(189, 222, 195) 98.13%)'

/**
 * Pinned white. Figma binds this to `content/inverse`, which is correct in
 * light mode and inverts to near-black in dark — where it would disappear into
 * the blue end of the gradient. Anything sitting on fixed brand artwork has to
 * be a literal for the same reason `--brand-mint` does.
 */
const ON_GRADIENT = '#ffffff'

/**
 * The offer: what a Deep Analysis is, what it returns, and the two ways of
 * acting on it.
 *
 * An inset card rather than a full-bleed band — it sits inside the rail's own
 * padding, so it reads as a panel the column contains rather than a second
 * surface running through it. The gradient head carries the claim, the body
 * carries the evidence and the actions.
 */
function OfferCard({ children }: { children?: ReactNode }) {
  return (
    <div
      data-report="offer"
      className="w-full shrink-0 overflow-hidden"
      style={{ border: `1px solid ${T.edge}`, borderRadius: 12 }}
    >
      <div
        style={{
          padding: T.p400,
          backgroundImage: OFFER_GRADIENT,
          backgroundColor: T.sunken,
        }}
      >
        <p className="w-full" style={{ ...TYPE.denseMed, color: ON_GRADIENT }}>
          {SHOW_GEO_SCORE ? DEEP_ANALYSIS_OFFER : DEEP_ANALYSIS_PITCH}
        </p>
      </div>

      {/* Top padding matches the gap below the bullets, so the first line sits
          off the gradient by the same distance the button sits off the last
          line. At p200 the list started 8 from the head and ended 24 from the
          button, which read as the bullets being crowded upward. */}
      <div
        className="flex w-full flex-col items-start"
        style={{ padding: T.p200, paddingTop: T.p600, gap: T.g600 }}
      >
        <ul
          data-report="includes"
          className="m-0 flex w-full list-none flex-col items-start p-0"
          style={{ gap: T.g200 }}
        >
          {RAIL_INCLUDES.map((item) => (
            <li key={item.label} className="flex w-full items-start" style={{ gap: T.g200 }}>
              <span
                aria-hidden
                className="shrink-0 rounded-full"
                style={{ width: 4, height: 4, marginTop: 9, backgroundColor: T.muted }}
              />
              <span
                className="flex min-w-0 flex-1 flex-wrap items-center"
                style={{ gap: T.g200, ...TYPE.denseLoose, color: T.muted }}
              >
                {item.label}
                {/* The marks say which four better than four names would, and
                    they are the same marks the plans page uses. */}
                {item.engines && (
                  <span className="flex shrink-0 items-center" style={{ gap: T.g100 }}>
                    {RAIL_ENGINES.map((engine) => (
                      <EngineIcon
                        key={engine.key}
                        icon={engine.icon}
                        iconFrame={engine.iconFrame}
                        size={OFFER_ENGINE_SIZE}
                      />
                    ))}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        {children && (
          <div
            data-report="offer-actions"
            className="flex w-full flex-col items-stretch"
            style={{ gap: T.g200 }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

function SkeletonLines({ widths, height }: { widths: string[]; height: number }) {
  return (
    <span
      data-gr-motion=""
      aria-hidden
      className="pointer-events-none absolute inset-0 flex flex-col justify-start"
      style={{
        opacity: 0,
        gap: 10,
        animation: `gr-skeleton ${SKELETON_FOR}s linear ${SKELETON_FROM}s 1`,
      }}
    >
      {widths.map((w, i) => (
        <span
          key={i}
          style={{
            width: w,
            height,
            borderRadius: 6,
            background:
              'linear-gradient(90deg, var(--background-surface-sunken) 0%, transparent 45%, var(--background-surface-sunken) 90%)',
            backgroundSize: '220% 100%',
            animation: `gr-skeleton-sweep 1.1s linear ${i * 0.08}s infinite`,
          }}
        />
      ))}
    </span>
  )
}


/**
 * The one piece of motion CSS can't opt out of on its own.
 *
 * index.css kills `animation` and `transition` under reduced motion, but the
 * panel also *turns pages on a timer* — movement no stylesheet can reach. So
 * it has to ask, and hold on one page instead.
 */
function usePrefersReducedMotion() {
  const [still, setStill] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setStill(q.matches)
    sync()
    q.addEventListener('change', sync)
    return () => q.removeEventListener('change', sync)
  }, [])
  return still
}

/* ── full-report panel ──────────────────────────────────────── */
/** Figma 168:2458. A4 proportions, so the thumbnail is a page not a box. */
const PANEL_PAGE_W = 160
const PANEL_PAGE_H = 226
/** Slow on purpose — this loops indefinitely beside something someone is
 *  reading, and a brisk flip would pull the eye off the report itself. */
const PANEL_PAGE_MS = 3200
/**
 * How far down the page someone has to be before the preview appears.
 *
 * A scroll is a better cue than a timer: it means they are reading rather than
 * still waiting for the page to assemble, and it puts the offer after the
 * first section instead of on top of it.
 */
const PANEL_SCROLL_TRIGGER = 220
/** Clear of the viewport edge, and of the rail. */
const PANEL_INSET = 24
/** Narrower than the rail's 453 — it floats over content, so it should read as
 *  a card sitting on the page rather than a second column. */
const PANEL_W = 300

/**
 * The floating full-report panel — Figma 168:2452 / 168:2458.
 *
 * Replaces "More findings from this run", which is what freed the room: that
 * list restated counts the page already showed and gave a reader nothing to
 * do with them.
 *
 * Loops forever rather than collapsing on a timer. It is dismissible two ways
 * — the cross, or opening the example and closing it — and once dismissed the
 * ordinary "See an example" button stands in its place, so the
 * route is never actually taken away.
 *
 * Under reduced motion it opens without animating and holds one page, since
 * page-turning on a timer is movement no stylesheet can switch off.
 */
function FullReportPanel({
  open,
  onOpenChange,
  onExample,
  onDismiss,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onExample: () => void
  onDismiss: () => void
}) {
  const still = usePrefersReducedMotion()
  /**
   * Every page laid out in a row, with the first repeated at the end.
   *
   * The pages used to cross-fade, which at this size read as a flicker rather
   * than a turn. A track that slides is one transform on one element — and the
   * trailing clone is what makes the wrap seamless: sliding onto it looks like
   * the next page, and the jump back to the real first happens with the
   * transition switched off, so nobody sees the rewind.
   */
  const pages = useMemo(() => {
    const list: number[] = []
    for (let n = TEASE_FIRST; n <= PAGE_COUNT; n += 1) list.push(n)
    list.push(TEASE_FIRST)
    return list
  }, [])
  const [i, setI] = useState(0)
  const [sliding, setSliding] = useState(true)

  /** Flush with the rail's right edge, so the floating card and the column
   *  above it share one line rather than the card sitting at some arbitrary
   *  offset. Re-measured on resize, since the columns are fluid. */
  const [rightInset, setRightInset] = useState(PANEL_INSET)
  useEffect(() => {
    const measure = () => {
      const rail = document.querySelector('aside')
      if (!rail) return
      setRightInset(Math.max(PANEL_INSET, window.innerWidth - rail.getBoundingClientRect().right))
    }
    measure()
    // A one-shot measure caught the rail before the page had finished laying
    // out and stuck at a stale inset; observing it keeps the two edges flush
    // through entrance animations and column reflow alike.
    const rail = document.querySelector('aside')
    const ro = rail ? new ResizeObserver(measure) : null
    if (rail && ro) ro.observe(rail)
    window.addEventListener('resize', measure)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > PANEL_SCROLL_TRIGGER) {
        onOpenChange(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [onOpenChange])

  useEffect(() => {
    if (!open || still) return
    const tick = window.setInterval(() => {
      setSliding(true)
      setI((v) => v + 1)
    }, PANEL_PAGE_MS)
    return () => window.clearInterval(tick)
  }, [open, still])

  return (
    <div
      data-report="panel-float"
      className="fixed"
      style={{
        // Fixed, so it costs the rail no height and the tables no width — the
        // constraint that made a third column tempting simply stops existing.
        // Right edge flush with the rail's, so the card lines up with the
        // column it belongs to instead of floating at an arbitrary offset.
        bottom: PANEL_INSET,
        right: rightInset,
        width: PANEL_W,
        zIndex: 40,
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: open ? undefined : 'none',
        transition: still ? undefined : `opacity 0.4s ${EASE}, transform 0.45s ${EASE}`,
      }}
    >
      <div
        data-report="panel"
        className="relative flex w-full flex-col items-center justify-end"
        style={{
          height: PANEL_H,
          boxSizing: 'border-box',
          gap: T.g400,
          padding: T.p600,
          backgroundColor: T.raised,
          border: `1px solid ${T.edge}`,
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: '0px 8px 22px 0px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Floats in the corner rather than sitting in a row of its own. */}
        <button
          type="button"
          data-report="panel-close"
          aria-label="Dismiss the Deep Analysis preview"
          onClick={onDismiss}
          className="absolute flex items-center justify-center rounded-full"
          style={{ top: 23, right: 23, width: 32, height: 32, color: T.ink }}
        >
          <Close size={16} />
        </button>

        <button
          type="button"
          data-report="panel-page"
          onClick={onExample}
          aria-label="See an example Deep Analysis"
          className="relative block shrink-0 overflow-hidden"
          style={{
            width: PANEL_PAGE_W,
            height: PANEL_PAGE_H,
            borderRadius: 2,
            border: `1px solid ${T.edge}`,
            backgroundColor: T.sunken,
          }}
        >
          <div
            className="flex h-full"
            style={{
              width: `${pages.length * 100}%`,
              transform: `translateX(-${(i * 100) / pages.length}%)`,
              transition: sliding && !still ? `transform 0.65s ${EASE}` : 'none',
            }}
            onTransitionEnd={() => {
              // Landed on the trailing clone: snap back to the real first with
              // the transition off, so the loop has no visible rewind.
              if (i === pages.length - 1) {
                setSliding(false)
                setI(0)
              }
            }}
          >
            {pages.map((n, idx) => (
              <img
                key={`${n}-${idx}`}
                src={pageSrc(n)}
                alt=""
                aria-hidden
                className="block h-full shrink-0"
                style={{ width: `${100 / pages.length}%`, objectFit: 'cover', objectPosition: 'top' }}
              />
            ))}
          </div>
        </button>

        <Button type="ghost" size="small" data-report="panel-example" onClick={onExample}>
          See an example
        </Button>
      </div>
    </div>
  )
}

function Rail({
  onUnlock,
  onRunOwn,
  shared = false,
  floating = false,
}: {
  onUnlock?: () => void
  onRunOwn?: () => void
  shared?: boolean
  /** Draws the rail as its own detached card beside a centred report. */
  floating?: boolean
}) {
  const asideRef = useRef<HTMLElement>(null)
  const [example, setExample] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  /** Once dismissed the panel does not come back this session, and the plain
   *  button takes its place — the route stays, the interruption does not. */
  const [panelGone, setPanelGone] = useState(false)
  /** The panel is holding the space — so the plain button stays folded. */
  const panelShowing = SHOW_FLOATING_PREVIEW && !shared && !panelGone && panelOpen

  /**
   * Rolls the panel up, then unmounts it.
   *
   * Unmounting on the click meant the collapse transition never got to run and
   * the panel simply vanished. The delay is the height transition's own
   * duration, so the space closes smoothly and the plain button only appears
   * once there is room for it.
   */
  const dismissPanel = useCallback(() => {
    setPanelOpen(false)
    window.setTimeout(() => setPanelGone(true), PANEL_COLLAPSE_MS)
  }, [])
  return (
    <aside
      ref={asideRef}
      {...MOTION_ATTR}
      className="flex min-w-0 flex-1 flex-col items-start self-start"
      style={{
        ...settle(3).style,
        gap: T.g600,
        padding: T.p700,
        // Inside the shared card the rail takes whatever the report leaves it.
        // Detached, nothing bounds it, so it has to bound itself — otherwise
        // it stretches to the viewport and stops reading as a companion card.
        ...(floating ? { flex: 'none', width: RAIL_FLOATING_W } : null),
        backgroundColor: T.raised,
        border: `1px solid ${T.edge}`,
        borderRadius: CARD_RADIUS,
        // Sticky only when it is beside the report. Stacked underneath it,
        // sticking means the rail tries to follow a scroll it is already at the
        // bottom of.
        // clears the pinned nav bar, then keeps its usual gap
        ...(floating ? { position: 'sticky' as const, top: NAV_H + RAIL_GAP } : null),
        // Detached from the report's own surface, so it needs the lift to read
        // as sitting above the page rather than as a panel inset into it.
        // Nested inside the shared card it would just look like card-on-card.
        ...(floating ? { boxShadow: '0px 8px 22px 0px rgba(0, 0, 0, 0.15)' } : null),
        // Anything that doesn't fit is clipped deliberately — no scrolling
        // inside the rail. With the panel open on a short viewport that means
        // the Enterprise block gets pushed down and cropped, which is accepted.
        overflow: 'hidden',
      }}
    >
      {/* Lands after the three sections have opened. It's a summary of them —
          arriving first would be the conclusion before the evidence, and the
          shimmer above covers the wait. */}
      <div className="relative w-full shrink-0">
        <div
          {...MOTION_ATTR}
          className="flex w-full flex-col items-start"
          style={{ gap: T.g300, animation: `gr-fade 0.45s ${EASE} ${GIST_AT}s backwards` }}
        >
          <span style={{ ...TYPE.eyebrow, color: T.muted }}>The gist</span>
          <p className="w-full" style={{ ...TYPE.gist, color: T.ink }}>
            {THE_GIST}
          </p>
        </div>
        {/* Three bars for the eyebrow and the two-to-three line summary. */}
        <SkeletonLines widths={['38%', '100%', '100%', '62%']} height={18} />
      </div>

      {/* A recipient is being sold their own scan, not this one's upgrade —
          so they get the one button and none of the offer around it. */}
      {shared ? (
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: T.g300 }}>
          {/* Beside the report, this is where a recipient is oriented: the
              line that used to head the page sits with the button it was
              already pointing at, and the report gets to start at its own
              title instead of behind a band.

              Only when the rail is beside the report, though. Stacked, the
              rail is below everything, and "this is somebody else's scan" read
              after the whole scan is not orientation — so the banner stays at
              the top there instead. See `shared-banner`. */}
          {floating && (
            <span style={{ ...TYPE.dense, color: T.muted }}>
              You&rsquo;re viewing a Free Scan shared with you.
            </span>
          )}
          {/* Names what it runs, like every other CTA in the flow — "Show my
              results", "View your Deep Analysis", "Unlock Deep Analysis". Bare
              "Run your own" was the only one leaving its object to context,
              and the line above it has just said what that object is. */}
          <Button type="primary" size="large" onClick={onRunOwn} style={{ width: '100%' }}>
            Run your own Free Scan
          </Button>
        </div>
      ) : (
      <OfferCard>
        {/* Medium, matching the secondary below it: inside the band the pair
            reads as one control group rather than a lead and a follower. */}
        <Button type="primary" size="medium" onClick={onUnlock} style={{ width: '100%' }}>
          Unlock Deep Analysis
        </Button>

        {/* Sits between the two CTAs on purpose: it is the evidence for the
            one above it and the shortcut to the one below. Parked for now —
            see SHOW_FLOATING_PREVIEW. */}
        {SHOW_FLOATING_PREVIEW && !panelGone && (
          <FullReportPanel
            open={panelOpen}
            onOpenChange={setPanelOpen}
            onExample={() => setExample(true)}
            onDismiss={dismissPanel}
          />
        )}
        {/* Always mounted, and it grows back in over exactly the same
            duration the panel takes to roll up — one continuous change in the
            rail's height. Mounting it *after* the roll-up was the stutter: a
            second motion chasing the first. */}
        <div
          className="w-full shrink-0 overflow-hidden"
          style={{
            height: panelShowing ? 0 : 40,
            opacity: panelShowing ? 0 : 1,
            pointerEvents: panelShowing ? 'none' : undefined,
            transition: `height ${PANEL_ROLL}, opacity 0.35s ${EASE}`,
          }}
        >
          {/* Ghost: it sits directly under the primary CTA, and as a filled,
              bordered button it read as a second competing action rather than
              the aside it is. */}
          <Button
            type="ghost"
            size="medium"
            data-report="example"
            onClick={() => setExample(true)}
            style={{ width: '100%' }}
          >
            See an example
          </Button>
        </div>
      </OfferCard>
      )}

      <ExampleReportModal
        open={example}
        onClose={() => {
          setExample(false)
          // They have been through the real thing; the tease has done its job.
          if (!panelGone) dismissPanel()
        }}
        onUnlock={onUnlock}
      />

      {/* Enterprise sat here once, then a Gist GEO Pro sign-up replaced it.
          Both are gone now. The column's job is the Deep Analysis, and a third
          call to action under it was competing with the two that matter — the
          route into the product is the header's Log in, which signs up as well
          as signs in. One control, said once. */}
    </aside>
  )
}


/* ── page ───────────────────────────────────────────────────── */
/**
 * What the recipient sees, rendered live rather than mocked — a real
 * <GeoReportPageV2 shared /> at desktop width, scaled down to the dialog's
 * preview slot. Live because a mock of your own screen drifts the moment the
 * report changes, and the whole point of the preview is that it is accurate.
 *
 * Inert: aria-hidden and pointer-events-none, so it is a picture, not a
 * second copy of the page to tab through.
 */
/**
 * The canvas the preview draws the report on.
 *
 * It has to match the layout the report is actually rendering, not just be
 * "big". The report's own breakpoint hooks read the *window*, so on a phone
 * the copy inside the preview is already in phone layout — and drawing that
 * onto a 1280 canvas gave a phone-shaped report stretched across a
 * desktop-width sheet, then scaled to a quarter size. It read as the desktop
 * view, which is the one thing the preview is not.
 *
 * So: the desktop canvas on a desktop, and the window's own width on a phone,
 * where the scale comes out near 1:1 and the preview shows what a phone
 * recipient actually gets.
 */
const PREVIEW_VIEWPORT_W = 1280

function SharedPreview({ onRunOwn }: { onRunOwn?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const mobile = useIsMobile()
  const [scale, setScale] = useState(0.4)
  /** See PREVIEW_VIEWPORT_W — the canvas follows the layout being drawn. */
  const [canvasW, setCanvasW] = useState(PREVIEW_VIEWPORT_W)
  /**
   * The scaled report's real height, which is what the frame around it has to
   * be — not a viewport's worth of it.
   *
   * This box used to be `height: vh` with `overflow-hidden`, on the reasoning
   * that "the page inside is `h-screen`, so its height is the real viewport's".
   * The page root is `min-h-screen`, so it has always laid out at its full
   * content height — several times a viewport. The frame was therefore a fixed
   * window onto the first screenful, and every section below it was clipped
   * away rather than scrolled past: the preview could not reach its own last
   * metric at any width, because the pixels were never drawn.
   *
   * Measuring the content instead makes the frame as tall as what is in it,
   * and the dialog's preview slot — which scrolls on its own — then scrolls
   * the whole report.
   */
  const [contentH, setContentH] = useState(0)

  /**
   * A layout effect with no dependency array, for the reason `FitBox` has one:
   * the observer alone is not enough when the thing being measured changes
   * size as a result of a re-render rather than a resize. React bails out of
   * the update when neither number has moved, so re-measuring every render is
   * cheap.
   */
  useLayoutEffect(() => {
    const el = ref.current
    const inner = innerRef.current
    if (!el || !inner) return
    const measure = () => {
      const canvas = mobile ? document.documentElement.clientWidth : PREVIEW_VIEWPORT_W
      setCanvasW(canvas)
      setScale(el.clientWidth / canvas)
      setContentH(inner.offsetHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    ro.observe(inner)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  })

  return (
    <div
      ref={ref}
      aria-hidden
      data-report="share-preview"
      className="relative w-full overflow-hidden"
      // `undefined` until the first measurement, so the box is never laid out
      // at a height of zero and measured against itself.
      style={{ height: contentH ? contentH * scale : undefined }}
    >
      {/* Absolute, so its own height is its content's and the scale transform
          does not have to fight a declared one. */}
      <div
        ref={innerRef}
        className="pointer-events-none absolute top-0 left-0 origin-top-left"
        style={{ width: canvasW, transform: `scale(${scale})` }}
      >
        <GeoReportPageV2 shared preview onRunOwn={onRunOwn} />
      </div>
    </div>
  )
}

export default function GeoReportPageV2({
  onUnlock,
  onPlatform,
  onDownload,
  onShare,
  onRunOwn,
  shared = false,
  floating = false,
  preview = false,
}: {
  /**
   * Draws the report alone, for the share dialog's thumbnail: no top bar and
   * no rail.
   *
   * Both were fighting the dialog they sit in. The bar's Enterprise/Pricing
   * links read as controls inside a preview that is not interactive, and the
   * rail's black "Unlock Deep Analysis" was the heaviest thing in a dialog
   * whose one job is Copy link. What is being shared is the report, so the
   * preview shows the report.
   */
  preview?: boolean
  onUnlock?: () => void
  /** Into the product itself — the route the free report used to lack. */
  onPlatform?: () => void
  onDownload?: () => void
  /** Overrides the built-in share dialog, if a route wants its own. */
  onShare?: () => void
  onRunOwn?: () => void
  /** Somebody else's report, opened from a shared link. */
  shared?: boolean
  /**
   * Layout exploration: centres the report column and lets the rail float
   * beside it as its own card, rather than the two sharing one bordered
   * surface. Off by default, so the shipped page is untouched.
   */
  floating?: boolean
} = {}) {
  const mode = useLayoutMode()
  const mobile = mode === 'phone'
  const type = useTypeScale()

  /**
   * Publishes the three sizes `TYPE` reads.
   *
   * On the document root rather than the report's own wrapper, so a modal
   * rendered through a portal — the share sheet, the example report — resolves
   * them too instead of silently falling back to the desktop size.
   *
   * A layout effect, so the values are in place before the first paint and the
   * report never shows one size and then another.
   */
  useLayoutEffect(() => {
    const root = document.documentElement
    // Passed through as-is. These are CSS lengths already — mostly
    // `var(--text-…-font-size)` off the design system — so appending `px`
    // would produce `var(…)px` and the declaration would be dropped.
    const vars: [string, string][] = [
      ['--gr-fs-title', type.title.fontSize],
      ['--gr-fs-section', type.section.fontSize],
      ['--gr-fs-body', type.body.fontSize],
    ]
    for (const [k, v] of vars) root.style.setProperty(k, v)
    return () => {
      for (const [k] of vars) root.style.removeProperty(k)
    }
  }, [type])
  /**
   * Whether the rail sits beside the report or under it.
   *
   * `floating` says the two are separate surfaces; this says there is room to
   * put them side by side. Below `wide` there is not — the rail's width is
   * fixed, so everything it takes comes straight out of the report, and at 768
   * that left the report 220px. Stacked, the report gets the full width and
   * the rail reads as what it is at that size: the next thing down the page.
   */
  const sideBySide = floating && mode === 'wide'
  const [printing, setPrinting] = useState(false)
  const [share, setShare] = useState(false)
  /**
   * What gets captured: the report column, not the card around it.
   *
   * The card holds the rail as a sibling, so capturing it only kept the rail
   * out while the rail was floating — at any width where it sits inside the
   * card instead, it printed. Capturing the column cannot include the rail at
   * any width, which is the guarantee the filter could not make.
   */
  const contentRef = useRef<HTMLDivElement>(null)

  /**
   * Writes an actual PDF rather than opening the print dialog.
   *
   * `window.print()` only ever offered "Save as PDF" as something the reader
   * had to find and choose, which is a different thing from a Download button
   * producing a file. Browsers will not let a page save a PDF silently, so the
   * report is rasterised and placed into a real document instead.
   *
   * Captured from the DOM, so what lands in the file is what is on screen —
   * locked rows included, which is the honest thing to hand someone.
   *
   * html-to-image rather than html2canvas: it renders through an SVG
   * foreignObject and so keeps the CSS masks this page relies on (the Tread
   * wordmark and the feature icons are masks, not images, so they would have
   * come out blank).
   */
  const download = async () => {
    if (onDownload) return onDownload()
    const content = contentRef.current
    if (!content) return
    setPrinting(true)
    /**
     * Printed light, whatever the reader is browsing in.
     *
     * The capture inherits the live page's colours, so a reader in dark mode
     * got a report of black sheets — which is not a thing anyone prints, and
     * is the first thing that stops a PDF feeling like a document. The design
     * system's dark block is `:root:not([data-theme='light'])`, so pinning the
     * attribute for the duration of the capture is enough to force it, and the
     * previous value goes back on in `finally` so a failure cannot leave the
     * reader's own page stuck in the wrong theme.
     */
    /**
     * Motion off for the duration of the capture.
     *
     * html-to-image clones the subtree, and a clone restarts every CSS
     * animation on it from zero — so an animation still inside its delay
     * renders its `from` frame, and `from` here is "not arrived yet". The GEO
     * score card came out as blank space at the top of page one for exactly
     * that reason: its settle keyframe starts at opacity 0.
     *
     * Safe because of the invariant every `gr-*` keyframe in index.css is
     * built on: each one declares only a `from`, so the resting style is the
     * finished state. Removing the animation cannot lose a value, it can only
     * skip the movement — which is what a still image wants anyway.
     */
    const freeze = document.createElement('style')
    freeze.textContent = '[data-gr-motion]{animation:none !important}'
    document.head.appendChild(freeze)

    /**
     * Rendered light on a stage of its own, leaving the reader's page alone.
     *
     * A report of black sheets is not a report, so the capture has to be
     * light whatever the reader is browsing in — but the design system scopes
     * both theme blocks to `:root`, so the obvious way to force it is to
     * mutate the document root, and that repaints the page under the reader
     * for as long as the capture runs. Two earlier attempts at hiding that
     * were both worse than the flash: a full-screen "Preparing your PDF…"
     * announced a modal state for a two-second wait, and a blank cover made
     * the page look broken.
     *
     * So nothing on screen moves. The light values are read out of the
     * stylesheet rather than off the page, written onto an offscreen container
     * as custom properties, and a clone of the report column is laid out
     * inside it — custom properties inherit, so the clone resolves light while
     * `:root` stays exactly as the reader left it.
     */
    const stage = document.createElement('div')
    stage.dataset.report = 'pdf-stage'
    stage.style.cssText = 'position:fixed;top:0;left:-20000px;pointer-events:none'
    for (const [prop, value] of lightTokens()) stage.style.setProperty(prop, value)

    const clone = content.cloneNode(true) as HTMLElement
    // The column is a flex child on the page and a plain block here, so its
    // width has to be stated or the clone lays out at a different measure and
    // the capture stops matching what is on screen.
    clone.style.flex = 'none'
    clone.style.maxWidth = 'none'
    clone.style.width = `${content.offsetWidth}px`
    stage.appendChild(clone)
    document.body.appendChild(stage)

    void stage.offsetHeight
    // Not `requestAnimationFrame`: it does not fire in a hidden or
    // backgrounded tab, so a Download pressed on a tab the reader has switched
    // away from would wait on a frame that never arrives and the button would
    // sit on "Preparing…" for ever. `setTimeout` is throttled there, not
    // stopped.
    await new Promise((r) => setTimeout(r, 32))

    try {
      const { toPng } = await import('html-to-image')
      const { jsPDF } = await import('jspdf')

      /** Furniture that cannot survive the trip to paper. */
      const keep = (el: HTMLElement | Element) =>
        !(
          el instanceof HTMLElement &&
          (el.dataset.report === 'panel-float' ||
            // A PDF cannot be clicked, so the offer's buttons printed as two
            // dead controls. The pitch and the list above them stay, which is
            // the part that still reads on paper.
            el.dataset.report === 'offer-actions' ||
            // Same for the masthead's own two, which are utilities on a report
            // the reader is by then holding.
            el.dataset.report === 'download' ||
            el.dataset.report === 'share')
        )

      // The card's surface, not the page's: without this the sheet comes out
      // grey and does not read as paper. Read off the stage, which is where
      // the light values live now.
      const backgroundColor = getComputedStyle(stage)
        .getPropertyValue('--background-surface-raised')
        .trim()

      /**
       * Captured a block at a time — the masthead, then one per section —
       * rather than as a single tall strip.
       *
       * The strip was sliced blindly at whatever height an A4 sheet ran out,
       * so a seam fell wherever it fell: through a row of the brand table,
       * through a card in the audit grid, once through the middle of the score
       * ring. Nothing about that reads as a report. Measured per block, a
       * break can be put between two of them instead, and a section that will
       * not fit in what is left of a sheet starts the next one.
       */
      const header = clone.querySelector('header')
      const blocks: HTMLElement[] = [
        header,
        // Sections that are not already inside the masthead. The GEO score is
        // a <section> nested in <header> — it is the masthead's own summary,
        // not a peer of the three below it — so a flat query over the column
        // returns it twice and it printed twice: once in the header block and
        // again as a page of its own.
        ...[...clone.querySelectorAll('section')].filter((el) => !header?.contains(el)),
      ].filter((el): el is HTMLElement => el instanceof HTMLElement)

      const shots: { png: string; ratio: number; width: number }[] = []
      for (const block of blocks) {
        shots.push({
          png: await toPng(block, { pixelRatio: 2, backgroundColor, filter: keep }),
          ratio: block.offsetHeight / block.offsetWidth,
          width: block.offsetWidth,
        })
      }

      const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
      const pageW = pdf.internal.pageSize.getWidth()
      const pageH = pdf.internal.pageSize.getHeight()
      const M = 40
      /** Reserved for the running foot, so a block never sits on it. */
      const FOOT = 26
      /** The widest a block may be drawn. Blocks narrower than this are drawn
       *  at their own size, not stretched to it. */
      const maxW = pageW - M * 2
      const floor = pageH - M - FOOT
      /** CSS pixels are 96 to the inch, PDF points are 72, so a block drawn at
       *  this factor comes out the size it is on screen. */
      const PX_TO_PT = 72 / 96
      /** Between two blocks on the same sheet. Wider than the 24 they sit on
       *  in the page, because on paper they are the only separation there is. */
      const GAP = 20

      let y = M
      for (const shot of shots) {
        /**
         * Drawn at its own size and centred, rather than stretched to the
         * margins.
         *
         * Filling the width scaled a 602px card up to 515pt — a fifth bigger
         * than it is on screen — so the report read as a set of enlarged
         * screenshots rather than a document, and the type no longer sat at
         * the sizes it was chosen at. `min` because a block wider than the
         * sheet still has to come down to fit; nothing is ever scaled up.
         */
        const w = Math.min(shot.width * PX_TO_PT, maxW)
        const x = (pageW - w) / 2
        const h = shot.ratio * w

        /**
         * A block is kept whole. If it will not fit in what is left of the
         * sheet it starts the next one, even when that leaves space behind.
         *
         * Tried letting them flow across the break instead, to use that space
         * up — it packs tighter and it reads worse: a seam through the middle
         * of a card is the thing that stops a PDF looking like a document,
         * which is the whole point of this pass. The gap is the cheaper cost.
         */
        if (h > floor - M) {
          // Taller than a whole sheet on its own, so it has no choice: give it
          // sheets of its own and place it once per sheet at a negative
          // offset, letting the page clip rather than duplicating a row.
          if (y > M) {
            pdf.addPage()
            y = M
          }
          let remaining = h
          let top = y
          while (remaining > 0) {
            pdf.addImage(shot.png, 'PNG', x, top, w, h, undefined, 'FAST')
            remaining -= floor - M
            if (remaining > 0) {
              pdf.addPage()
              top -= floor - M
            }
          }
          y = floor
          continue
        }
        if (y + h > floor) {
          pdf.addPage()
          y = M
        }
        pdf.addImage(shot.png, 'PNG', x, y, w, h, undefined, 'FAST')
        y += h + GAP
      }

      // The running foot, in the PDF's own type rather than a rasterised strip
      // — it is printer furniture, and it is the one thing on the sheet that
      // should stay crisp and selectable at any zoom.
      const stamp = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      const pages = pdf.getNumberOfPages()
      for (let i = 1; i <= pages; i++) {
        pdf.setPage(i)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(8)
        pdf.setTextColor(150)
        pdf.text(`Tread's GEO scan · ${stamp}`, M, pageH - 24)
        pdf.text(`${i} of ${pages}`, pageW - M, pageH - 24, { align: 'right' })
      }

      pdf.save('tread-geo-scan.pdf')
    } finally {
      stage.remove()
      freeze.remove()
      setPrinting(false)
    }
  }

  return (
    <div
      className="flex min-h-screen w-full flex-col items-start"
      style={{ backgroundColor: T.page }}
    >
      {/* The flow's own bar, here and not on the steps before it. Brand, topic
          and the email ask are a focused run with no exit on purpose; this is
          where that run ends, so it is where the rest of the product should
          become reachable again.

          Log in is back. It came off while the rail carried a Gist GEO Pro
          sign-up, because the two went to the same place; with that block gone
          this is the only way into the product from here, and the bar is where
          the rest of the flow already puts it. */}
      {!preview && <GistNav action="login" onLogin={onPlatform} />}

      <div
        className="flex w-full flex-col items-start"
        style={{ padding: mobile ? T.p400 : PAGE_PAD }}
      >
      {/* Two shapes from one structure. Normally the report and the rail share
          a single bordered card, the header sitting above the left column.
          `floating` splits them: the report keeps the card and centres itself,
          and the rail becomes its own surface beside it — which is why the
          padding, fill and border here are all conditional rather than a
          second copy of this layout living somewhere else. */}
      <div
        className={sideBySide ? 'flex w-full items-start' : 'flex w-full flex-col items-start'}
        style={{
          gap: T.g800,
          ...(sideBySide
            ? { justifyContent: 'center', width: '100%' }
            : {
                // No card around the pair when they are stacked and separate
                // surfaces of their own — that would be a card holding two
                // cards. The shared-card treatment is only for the layout that
                // actually shares one.
                ...(floating
                  ? null
                  : {
                      padding: mobile ? T.p400 : PAGE_PAD,
                      backgroundColor: T.raised,
                      border: `1px solid ${T.edge}`,
                      borderRadius: CARD_RADIUS,
                    }),
              }),
        }}
      >
      <div
        ref={contentRef}
        data-report="content"
        className="flex min-w-0 flex-col items-start"
        style={{
          ...(sideBySide
            ? { flex: '1 1 auto', maxWidth: CONTENT_MAX, minWidth: 0 }
            : preview
              ? { width: '100%', flex: 'none' }
              : // Stacked, the column takes the width it is given and stops at
                // the measure the report is designed to read at. `LEFT_W` was
                // a fixed width here, which is the same mistake the rail was
                // making: a number that ignores the viewport.
                { width: '100%', maxWidth: mobile ? 'none' : CONTENT_MAX, flex: 'none' }),
          gap: T.g700,
          ...(floating
            ? {
                padding: mobile ? T.p400 : PAGE_PAD,
                // The top alone is taller — see PAGE_PAD_TOP.
                paddingTop: mobile ? PAGE_PAD_TOP.phone : PAGE_PAD_TOP.roomy,
                backgroundColor: T.raised,
                border: `1px solid ${T.edge}`,
                borderRadius: CARD_RADIUS,
              }
            : null),
        }}
      >
        <header className="flex w-full flex-col items-start" style={{ gap: T.g700 }}>
          {/* Names the report as somebody else's before anything is read, and
              carries the loop: the fastest thing a recipient can do is run one.
              Only when the rail is stacked under the report — beside it, the
              rail says both and says them next to the button. */}
          {shared && !sideBySide && (
            <div
              data-report="shared-banner"
              className="flex w-full items-center justify-between"
              style={{
                paddingInline: T.p400,
                paddingBlock: T.p300,
                borderRadius: T.r_md,
                backgroundColor: T.sunken,
              }}
            >
              <span style={{ ...TYPE.dense, color: T.ink }}>
                You&rsquo;re viewing a Free Scan shared with you.
              </span>
              <button
                type="button"
                data-report="run-own"
                onClick={onRunOwn}
                style={{
                  ...TYPE.denseMed,
                  color: T.ink,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                }}
              >
                Run your own Free Scan &rarr;
              </button>
            </div>
          )}

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center" style={{ gap: T.g400 }}>
              <TreadMark />
              <h1 style={{ ...TYPE.h1, color: T.ink }}>Tread&rsquo;s GEO scan</h1>
            </div>
          </div>

          {/* Topic and the two utilities share a line on a wide screen and
              stack on a phone.

              Side by side at 390 the topic had roughly half the card and the
              chip broke onto two lines inside its own fill, which reads as
              something gone wrong rather than as a label. Dropping to an
              eyebrow fixes it twice over: it is a label, which is what an
              eyebrow is for, and unstyled text wraps without a box around it
              to look broken in. */}
          <div
            className={`flex w-full ${mobile ? 'flex-col items-start' : 'items-center justify-between'}`}
            style={mobile ? { gap: T.g300 } : undefined}
          >
            <span
              className="flex items-center"
              style={
                mobile
                  ? { ...TYPE.eyebrow, color: T.muted }
                  : {
                      backgroundColor: T.sunken,
                      paddingInline: T.p400,
                      paddingBlock: T.p200,
                      borderRadius: T.r_md,
                      ...TYPE.bodyMed,
                      color: T.ink,
                    }
              }
            >
              Topic: Marathon shoes
            </span>
            {/* Ghost: transparent until hovered, which is the system's
                link-weight action. These are utilities on a report you already
                have, and as filled buttons they pulled weight away from the
                one thing the page is actually asking for. Ghost rather than a
                bare anchor so the focus ring, hit area and keyboard behaviour
                stay the system's — `tertiary` is not it, that one still paints
                a fill and a border. */}
            {/* No gap between them. Each ghost button still carries the 16px
                horizontal padding of a real button, and transparent at rest
                that padding reads as empty space — 12 between the boxes put
                44 between the two words. Flush, the visible gap is the
                padding itself, which is what a pair of text actions wants. */}
            {/* Pulled left by the ghost buttons' own padding, so the first
                label lines up with the eyebrow above it rather than sitting
                16px in from a column edge nothing else respects. */}
            <div
              className="flex items-start"
              style={mobile ? { marginInlineStart: `calc(-1 * ${T.p400})` } : undefined}
            >
              <Button type="ghost" size="medium" data-report="download" onClick={download}>
                {printing ? 'Preparing…' : 'Download'}
              </Button>
              {!shared && (
                <Button
                  type="ghost"
                  size="medium"
                  data-report="share"
                  onClick={
                    onShare ??
                    (() => {
                      // Before the flag, not after — see holdPageScroll.
                      holdPageScroll()
                      setShare(true)
                    })
                  }
                >
                  Share
                </Button>
              )}
            </div>
          </div>
          {/* Inside the header, above the rule. It is the masthead's own
              summary, not the first of four sections: below the rule it sat
              in the run of section cards and read as a peer of Brand
              visibility, which is the one thing a composite of them must not
              do. */}
          {SHOW_GEO_SCORE && <GeoScore />}
        </header>

        <Hairline />

        <div className="flex w-full min-w-0 flex-col items-start" style={{ gap: T.g700 }}>
          <BrandVisibility />
          <SiteHealth />
          <Citations />
          {SHOW_HEAD_TO_HEAD && <HeadToHead />}
        </div>
      </div>

      {!preview && (
        <Rail onUnlock={onUnlock} onRunOwn={onRunOwn} shared={shared} floating={sideBySide} />
      )}
      </div>

      {/* Never on a shared report: that view has no Share control, and
          mounting it there would nest this page inside its own preview. */}
      {!shared && (
        <ShareSnapshotModal
          open={share}
          onClose={() => setShare(false)}
          preview={<SharedPreview onRunOwn={onRunOwn} />}
        />
      )}
      </div>
    </div>
  )
}
