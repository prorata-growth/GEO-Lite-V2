import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FULL_REPORT_INCLUDES } from './geoReportPageData'
import useIsMobile from '../useIsMobile'
import { Button, IconButton } from 'design-system'
import { CheckDisc, Close } from './Glyph'
import chevronLeft from '../assets/geo-v2/chevron-left.svg'
import chevronRight from '../assets/geo-v2/chevron-right.svg'

/**
 * "Example report" — Figma Gist Foundations 5760:175.
 *
 * Built as a one-off here rather than on the design system's own `Modal`: this
 * layout (a two-up body with a paged document preview) doesn't fit that
 * component's header/body/footer shape, and the user intends to promote this
 * pattern into the system separately. Everything below still binds to real
 * semantic tokens, so adopting it later is a move, not a rewrite.
 *
 * The dialog mechanics are hand-rolled because the design system's Modal owns
 * Radix internally and isn't a direct dependency here — but they're the real
 * thing (Escape, backdrop click, scroll lock, focus return, labelled dialog),
 * since those are the parts that feel broken when stubbed.
 *
 * Rendered through a portal, and that is load-bearing rather than tidiness:
 * the report's reveal animations use `transform`, and a transformed element
 * becomes the containing block for `position: fixed` descendants. Rendered in
 * place, this dialog's full-screen scrim was being clipped to the rail's own
 * box (451x841 instead of the viewport).
 */

const PREVIEW_W = 387
/** Portrait A4. The preview *box* carries this, so the page inside it runs
 *  edge to edge instead of sitting in a letterboxed well. */
const A4 = '210 / 297'
const A4_RATIO = 210 / 297
/** Everything in the panel that isn't the preview: padding, header, the
 *  description, the three gaps and the footer. Measured, not guessed (808px
 *  panel around a 606px preview). Used to work out how wide the sheet can be
 *  before the panel would outgrow its height cap. */
const PANEL_CHROME = 204
const MAX_PANEL_VH = 92
/**
 * What the preview may take of the viewport once it is stacked on a phone.
 *
 * Side by side it is bounded by the height the panel can spare. Stacked it is
 * bounded by how much of the body it is fair for it to occupy: at full width
 * an A4 sheet on a 390px phone is 484px tall, which fills the scroller and
 * leaves no sign that a list follows it. At 46vh the first item shows under
 * the sheet, so the thing below it is discoverable without a guess.
 */
const PHONE_PREVIEW_VH = 46
/** Height of the pager strip that sits over the foot of the page. */
const PAGER_H = 67
/**
 * The real Brewlune full report, rendered from the PDF at 96dpi (794x1123,
 * exactly A4). Served from `public/` rather than imported so the ten pages
 * stay out of the JS bundle and load one at a time.
 *
 * A different brand to the snapshot on purpose — this is a *sample* of what
 * the paid report looks like, not the reader's own data.
 */
export const PAGE_COUNT = 10
/** Bumped when the pages are re-rendered — files under `public/` keep their
 *  names, so without this a returning visitor's cache would serve the old
 *  report after a redeploy. Digest of the rendered set. */
const PAGES_VERSION = '55aa25c7'
export const pageSrc = (n: number) =>
  `example-report/page-${String(n).padStart(2, '0')}.png?v=${PAGES_VERSION}`

const T = {
  ink: 'var(--content-default)',
  muted: 'var(--content-secondary)',
  faint: 'var(--content-disabled)',
  line: 'var(--border-default)',
  raised: 'var(--background-surface-raised)',
  sunken: 'var(--background-surface-sunken)',
  quaternary: 'var(--background-action-quaternary-default)',
  primary: 'var(--background-action-primary-default)',
  inverse: 'var(--content-inverse)',
  r_md: 'var(--border-radius-md)',
  r_lg: 'var(--border-radius-lg)',
  r_xl: 'var(--border-radius-xl)',
  p400: 'var(--spacing-padding-400)',
  p600: 'var(--spacing-padding-600)',
} as const

const TYPE = {
  title: { fontSize: 24, fontWeight: 500, lineHeight: 1.42, letterSpacing: '0.48px' },
  desc: { fontSize: 16, fontWeight: 400, lineHeight: 1.4 },
  itemTitle: { fontSize: 16, fontWeight: 500, lineHeight: 1.4, letterSpacing: '0.32px' },
  itemBody: { fontSize: 16, fontWeight: 400, lineHeight: 1.6 },
  button: { fontSize: 16, fontWeight: 500, lineHeight: 1.4, letterSpacing: '0.32px' },
  caption: { fontSize: 12, fontWeight: 400, lineHeight: 1.4 },
} as const

/**
 * One page of the report. The neighbours are kept mounted at zero opacity so a
 * flip doesn't wait on a network round trip — decoding is what makes an image
 * swap feel sticky, and it has already happened by the time you click.
 */
function ReportPage({ page }: { page: number }) {
  const near = [page - 1, page, page + 1].filter((n) => n >= 1 && n <= PAGE_COUNT)
  return (
    // `perspective` here is what makes the children's rotateY read as paper
    // tilting away rather than a flat squash.
    <div
      className="absolute inset-0"
      style={{ backgroundColor: T.sunken, perspective: 1400, overflow: 'hidden' }}
    >
      {near.map((n) => {
        // Position is derived from where the page sits relative to the current
        // one, not from a stored direction: -1 is behind you, +1 is ahead. Turn
        // forward and the old page becomes -1 and leaves left while +1 becomes
        // 0 and arrives from the right — the travel direction falls out of the
        // arithmetic, so prev and next can't disagree.
        const offset = n - page
        const here = offset === 0
        return (
          <img
            key={n}
            src={pageSrc(n)}
            alt={here ? `Example Deep Analysis, page ${n} of ${PAGE_COUNT}` : ''}
            aria-hidden={!here}
            // Eager: only the current page and its two neighbours are ever
            // mounted, so there is nothing to defer — and `lazy` inside a
            // freshly-opened dialog can leave a page blank until it scrolls.
            loading="eager"
            decoding="async"
            draggable={false}
            data-gr-motion=""
            className="absolute inset-0 h-full w-full"
            style={{
              objectFit: 'cover',
              opacity: here ? 1 : 0,
              transform: `translateX(${offset * 6}%) rotateY(${offset * -8}deg) scale(${here ? 1 : 0.97})`,
              transformOrigin: 'center',
              // The arriving page rides over the leaving one, so the edge that
              // moves is the new page's rather than a seam between two.
              zIndex: here ? 2 : 1,
              boxShadow: here ? '0 8px 26px rgba(2, 9, 18, 0.28)' : 'none',
              transition:
                'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              pointerEvents: 'none',
              backfaceVisibility: 'hidden',
            }}
          />
        )
      })}
    </div>
  )
}

function PagerButton({
  dir,
  onClick,
  disabled,
}: {
  dir: 'prev' | 'next'
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous page' : 'Next page'}
      className="flex items-center justify-center transition-colors"
      style={{
        width: 30,
        height: 30,
        borderRadius: 999,
        border: '1px solid rgba(255, 255, 255, 0.16)',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? 'default' : 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* The chevron assets are dark glyphs for a light surface; inverting is
          cheaper than shipping a second pair for one use. */}
      <img
        src={dir === 'prev' ? chevronLeft : chevronRight}
        alt=""
        style={{ width: 15, height: 15, filter: 'invert(1)' }}
      />
    </button>
  )
}

export default function ExampleReportModal({
  open,
  onClose,
  onUnlock,
}: {
  open: boolean
  onClose: () => void
  onUnlock?: () => void
}) {
  const [page, setPage] = useState(1)
  /** Stacks the body, preview first — see PHONE_PREVIEW_VH. */
  const mobile = useIsMobile()
  const panelRef = useRef<HTMLDivElement>(null)
  // a span, not the button: the DS IconButton doesn't forward refs yet, so
  // the focus target is reached through the wrapper instead
  const closeRef = useRef<HTMLSpanElement>(null)
  const returnTo = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    returnTo.current = document.activeElement as HTMLElement | null
    closeRef.current?.querySelector('button')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    // Scroll lock without the layout shift a plain `overflow: hidden` causes.
    const { body } = document
    const prevOverflow = body.style.overflow
    const prevPad = body.style.paddingRight
    const gap = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`

    return () => {
      document.removeEventListener('keydown', onKey)
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPad
      returnTo.current?.focus?.()
    }
  }, [open, onClose])

  // Re-opening should start at the first page, not wherever it was left.
  useEffect(() => {
    if (open) setPage(1)
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ padding: 24 }}
      onPointerDown={(e) => {
        if (!panelRef.current?.contains(e.target as Node)) onClose()
      }}
    >
      <div
        data-gr-motion=""
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(2, 9, 18, 0.45)',
          animation: 'gr-fade 0.2s linear both',
        }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="example-report-title"
        data-gr-motion=""
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 756,
          maxWidth: '100%',
          // Bounded so the A4 preview can't push the footer off a short window.
          maxHeight: '92vh',
          gap: 'var(--spacing-gap-700)',
          padding: T.p600,
          backgroundColor: T.raised,
          borderRadius: T.r_lg,
          boxShadow: '0px 8px 22px 0px rgba(0, 0, 0, 0.15)',
          animation: 'gr-modal-in 0.26s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        {/* Title and description are one block: 20 between them, and the
            root's 32 separating the block from the body. */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 20 }}>
        <div className="flex w-full shrink-0 items-center" style={{ gap: 16 }}>
          <p id="example-report-title" className="flex-1" style={{ ...TYPE.title, color: T.ink }}>
            Example Deep Analysis
          </p>
          <span ref={closeRef} className="contents">
            <IconButton
              type="ghost"
              size="small"
              shape="round"
              onClick={onClose}
              aria-label="Close"
              icon={<Close size={16} />}
            />
          </span>
        </div>

        <p className="w-full shrink-0" style={{ ...TYPE.desc, color: T.muted }}>
          The Free Scan covers two engines and one topic. Here&rsquo;s what a Deep Analysis
          adds.
        </p>
        </div>

        {/* body: what's included, next to a paged preview */}
        {/* top-aligned, not centred: the list is read from its first item,
            so it should start level with the preview rather than float
            against the middle of a much taller sheet */}
        {/* Scrolls rather than clips. The dialog is capped at 92vh, and on a
            short window the list plus the preview exceed it — without this the
            bottom of the body simply could not be reached. */}
        {/* Stacked on a phone, and the preview goes first. Side by side, a
            387px sheet beside a list inside a 342px dialog leaves neither one
            room; and of the two, the sheet is what "see an example" was
            clicked for, so it leads and the list reads as its caption. */}
        <div
          className={`flex w-full min-h-0 flex-1 overflow-y-auto ${
            mobile ? 'flex-col items-center' : 'items-start'
          }`}
          style={{ gap: 20 }}
        >
          <div
            className="flex w-full min-w-0 flex-col items-start"
            style={{ gap: 24, ...(mobile ? { order: 1 } : { flex: '1 1 0%' }) }}
          >
            {FULL_REPORT_INCLUDES.map((f) => (
              <div key={f.title} className="flex w-full items-start" style={{ gap: 8 }}>
                <CheckDisc size={20} style={{ color: T.ink }} />
                <div className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: 8 }}>
                  <p className="w-full" style={{ ...TYPE.itemTitle, color: T.ink }}>
                    {f.title}
                  </p>
                  {/* Optional: the list is the spec now, and most lines say
                      all they need to in the title. */}
                  {f.blurb && (
                    <p className="w-full" style={{ ...TYPE.itemBody, color: T.ink }}>
                      {f.blurb}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* The box itself is A4, so the sheet fills it corner to corner. Its
              width is bounded by the height the panel can actually spare, so a
              short window shrinks the page rather than clipping it — and the
              ratio holds either way because only one dimension is ever set. */}
          <div
            className="group relative shrink-0 overflow-hidden"
            style={{
              width: mobile
                ? `min(100%, calc(${PHONE_PREVIEW_VH}vh * ${A4_RATIO}))`
                : `min(${PREVIEW_W}px, calc((${MAX_PANEL_VH}vh - ${PANEL_CHROME}px) * ${A4_RATIO}))`,
              aspectRatio: A4,
              border: `1px solid ${T.line}`,
              borderRadius: T.r_md,
              backgroundColor: T.sunken,
            }}
          >
            {/* The page keeps A4's ratio and gives up width, not shape, when the
                window is short. */}
            <ReportPage page={page} />

            {/* A floating pill rather than the full-width opaque strip the mock
                shows. With a real report in here that strip covered the bottom
                ~67px of all ten pages, which is the opposite of running the
                page edge to edge. Same controls, nothing hidden. */}
            <div
              data-hover-reveal=""
              data-gr-motion=""
              className="absolute inset-x-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
              style={{ height: PAGER_H, gap: 8 }}
            >
              {/* Dark glass, not the light pill it was: over a near-black report
                  a white capsule was the loudest thing on the page. Sitting in
                  the page's own register keeps the report the subject. */}
              <div
                className="flex items-center"
                style={{
                  gap: 6,
                  padding: 5,
                  borderRadius: 999,
                  backgroundColor: 'rgba(12, 12, 14, 0.62)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.28)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <PagerButton
                  dir="prev"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                />
                {/* Ten pages is too many to navigate blind; the mock only had a
                    placeholder in here. */}
                <span
                  aria-live="polite"
                  className="tabular-nums"
                  style={{
                    ...TYPE.caption,
                    color: 'rgba(255, 255, 255, 0.72)',
                    minWidth: 38,
                    textAlign: 'center',
                  }}
                >
                  {page} / {PAGE_COUNT}
                </span>
                <PagerButton
                  dir="next"
                  disabled={page === PAGE_COUNT}
                  onClick={() => setPage((p) => p + 1)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex w-full shrink-0 items-center justify-end" style={{ gap: 12 }}>
          <Button type="tertiary" size="medium" onClick={onClose}>
            Close
          </Button>
          <Button
            type="primary"
            size="medium"
            onClick={() => {
              onClose()
              onUnlock?.()
            }}
          >
            Unlock Deep Analysis
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
