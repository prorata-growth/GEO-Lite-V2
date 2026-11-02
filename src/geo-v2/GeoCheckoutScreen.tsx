import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from 'design-system'
import useIsMobile from '../useIsMobile'
import useLayoutMode from './useLayoutMode'
import GistNav from './GistNav'
import HeroPattern from './HeroPattern'

/**
 * Checkout for the Deep Analysis — Figma node 2001:16084.
 *
 * Same chrome as the auth screens: cream page, ruled bar, an exact half split
 * with a tinted panel on the left. The order summary sits on that panel in
 * the flow's translucent panel; the form is a 380 column in the right half.
 *
 * The card fields are grouped into single bordered blocks with shared edges —
 * that's how the design draws them, and it's the convention every payment form
 * uses, so a stray gap between "card number" and "MM / YY" reads as a bug.
 */

/** Where both halves' content starts below the bar on desktop: the form's
 *  first label and the order card's top share this line. */
const FORM_TOP = 115
const EASE = [0.16, 1, 0.3, 1] as const

/* ── chrome, shared with the auth screens ───────────────────── */
const PAGE_BG = 'var(--background-surface-page)'

/* ── panel + form geometry, from the design ─────────────────── */
/** Caps, not widths. Both were hard sizes behind a `shrink-0`, so on a phone
 *  the 459 card drew to x=402 inside a 390 viewport and the half's
 *  `overflow-hidden` cut the prices off the right edge — the one column on a
 *  checkout that has to be readable. They now describe the largest the card
 *  and its column are allowed to get. */
/**
 * What the panel half keeps between its card and its own edges.
 *
 * The gutter exists because centring gives a card no margin of its own: what
 * sits beside it is whatever is left over — 105px at 1440, 6px at 1024, and
 * negative below that, where the half's `overflow-hidden` starts cutting the
 * card off at the page edge.
 *
 * It steps down in `compact`, because a flat 40 spends 80px of a 384px half on
 * margin alone. The gutter is there to stop the card touching the edge, and 24
 * does that as well as 40 does. (This card's own padding is already 24 across,
 * unlike the sales and qualify panels' 48, so only the gutter moves here.)
 */
const PANEL_GUTTER = { wide: 40, compact: 24 } as const
const PANEL_W = 459
const SUMMARY_W = 380
const FORM_W = 380
const FIELD_H = 34
const FIELD_BORDER = 'var(--border-default)'
/** 5.1:1 on the cream — a decline has to be legible, not just red. */
const DECLINE = 'var(--content-status-error)'
const MUTED = 'var(--content-secondary)'

/** What the pricing card sells: $79, the discounted price, not the $99 it is
 *  struck through from. Checkout billing the anchor made the plans page's
 *  offer disappear at the till. */
const PRICE = '$79.00'

const LINES = [
  { label: 'Deep Analysis', value: PRICE, note: 'Billed one-time', muted: false },
  { label: 'Subtotal', value: PRICE, note: null, muted: false },
  { label: 'Tax', value: '$0.00', note: null, muted: true },
]

/** A bare input styled as the design's field. Grouped fields turn their own
 *  corners off, so radius is passed in rather than baked. */
function Field({
  placeholder,
  radius,
  flush,
  trailing,
  value: outer,
  onChange,
  invalid,
}: {
  placeholder: string
  radius?: string
  /** Collapse the top border so stacked fields share one hairline. */
  flush?: boolean
  trailing?: React.ReactNode
  value?: string
  onChange?: (v: string) => void
  invalid?: boolean
}) {
  const [inner, setInner] = useState('')
  // controlled only where the screen needs to read the value back
  const value = outer ?? inner
  const setValue = (v: string) => (onChange ? onChange(v) : setInner(v))
  return (
    <div
      className="flex w-full items-center gap-1 bg-[var(--background-surface-raised)] px-[15px]"
      style={{
        height: FIELD_H,
        border: `1px solid ${invalid ? DECLINE : FIELD_BORDER}`,
        borderTopWidth: flush ? 0 : 1,
        borderRadius: radius,
      }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[var(--content-default)] focus:outline-none"
        style={{ lineHeight: 1.4 }}
      />
      {trailing}
    </div>
  )
}

/** A read-only select, drawn as a field with a chevron. */
function Select({ value, radius, flush }: { value: string; radius?: string; flush?: boolean }) {
  return (
    <div
      className="flex w-full items-center bg-[var(--background-surface-raised)] px-[15px]"
      style={{
        height: FIELD_H,
        border: `1px solid ${FIELD_BORDER}`,
        borderTopWidth: flush ? 0 : 1,
        borderRadius: radius,
      }}
    >
      <span className="min-w-0 flex-1 text-[14px] text-[var(--content-default)]" style={{ lineHeight: 1.4 }}>
        {value}
      </span>
      <svg viewBox="0 0 14 14" className="size-3 shrink-0" aria-hidden>
        <path d="M3.5 5.5 7 9l3.5-3.5" fill="none" stroke="var(--content-secondary)" strokeWidth="1.4" />
      </svg>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="w-full text-[16px] font-medium text-[var(--content-default)]" style={{ lineHeight: 1.2 }}>
      {children}
    </p>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="w-full text-[14px] text-[var(--content-default)]" style={{ lineHeight: 1.4 }}>
      {children}
    </p>
  )
}

/* ── the order summary that sits on the photo ───────────────── */
function OrderSummary() {
  return (
    <div
      data-checkout="summary"
      className="flex w-full items-start gap-[19px] rounded-[16px] px-6"
      style={{
        maxWidth: PANEL_W,
        paddingTop: 52,
        paddingBottom: 52,
        backgroundColor: 'var(--background-surface-raised)',
        border: '1px solid var(--border-default)',
      }}
    >
      <button
        type="button"
        aria-label="Back"
        onClick={() => window.history.back()}
        // Centred against the 16/1.15 heading beside it: an 18.4px line box
        // around a 12px glyph leaves 3.2px, not the 8 `mt-2` was giving it.
        className="flex size-3 shrink-0 items-center justify-center"
        style={{ marginTop: 3 }}
      >
        <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
          <path d="M7.5 2 3.5 6l4 4" fill="none" stroke="var(--content-default)" strokeWidth="1.4" />
        </svg>
      </button>

      <div className="flex min-w-0 flex-1 flex-col items-start" style={{ maxWidth: SUMMARY_W }}>
        <p className="text-[16px] font-medium text-[var(--content-default)]" style={{ lineHeight: 1.15 }}>
          GEO Deep Analysis
        </p>

        <p className="mt-8 text-[16px] text-[var(--content-default)]" style={{ lineHeight: 1.2 }}>
          Payment summary
        </p>
        <p className="mt-2 text-[36px] font-medium text-[var(--content-default)]" style={{ lineHeight: 1.2 }}>
          {PRICE}
        </p>

        <div className="mt-8 flex w-full flex-col items-start" style={{ gap: 15 }}>
          {LINES.map((line) => (
            <div key={line.label} className="flex w-full flex-col items-start">
              <div
                className="flex w-full items-center justify-between text-[14px]"
                style={{ lineHeight: 1.4 }}
              >
                <span className="text-[var(--content-default)]">{line.label}</span>
                <span className="font-medium" style={{ color: line.muted ? MUTED : 'var(--content-default)' }}>
                  {line.value}
                </span>
              </div>
              {line.note && (
                <span className="text-[14px]" style={{ lineHeight: 1.4, color: MUTED }}>
                  {line.note}
                </span>
              )}
              <span className="mt-[15px] h-px w-full" style={{ backgroundColor: FIELD_BORDER }} />
            </div>
          ))}

          <div className="flex w-full items-center justify-between text-[14px]" style={{ lineHeight: 1.4 }}>
            <span className="text-[var(--content-default)]">Total due today</span>
            <span className="text-[16px] font-medium text-[var(--content-default)]">{PRICE}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/** The classic test decline. Typing it is how the failure is demoed — a
 *  prototype where payment always succeeds can't show what a decline looks
 *  like, and that is the state most likely to lose a sale. */
const DECLINE_CARD = '4000000000000002'

export default function GeoCheckoutScreen({ onPaid }: { onPaid?: () => void }) {
  /** `compact` tightens the panel's gutter and padding — see PANEL_GUTTER. */
  const mode = useLayoutMode() === 'wide' ? 'wide' : 'compact'
  const [card, setCard] = useState('')
  const [declined, setDeclined] = useState(false)
  const mobile = useIsMobile()

  return (
    <div
      data-checkout="frame"
      className={`flex w-full flex-col ${mobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      style={{ backgroundColor: PAGE_BG }}
    >
      <GistNav action="signout" />

      <div data-checkout="body" className={`band-split flex min-h-0 w-full flex-1 ${mobile ? 'flex-col' : ''}`}>
        {/* ─── left: the order, on the photo ─────────────────── */}
        <div
          data-checkout="summary-half"
          // Top-aligned on desktop, by request: the card's top lines up with
          // "Contact information" on the right rather than floating centred.
          className={`relative flex shrink-0 justify-center overflow-hidden ${
            mobile ? 'w-full items-center py-10' : 'w-1/2 items-start'
          }`}
          style={{
            backgroundColor: 'var(--brand-mint)',
            paddingInline: mobile ? 24 : PANEL_GUTTER[mode],
            paddingTop: mobile ? undefined : FORM_TOP,
          }}
        >
          {/* behind the card, same placement as the bare halves */}
          {!mobile && <HeroPattern />}
                    <motion.div
            className="relative flex w-full justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <OrderSummary />
          </motion.div>
        </div>

        {/* ─── right: the form ───────────────────────────────── */}
        <div
          data-checkout="form-half"
          className={`flex shrink-0 justify-center overflow-y-auto ${mobile ? 'w-full px-6' : 'w-1/2'}`}
        >
          {/* `self-start`: the half is a flex ROW, so this column would
              otherwise stretch to the half's height and become height-bounded
              — its own paddingBottom then sits *inside* that box and is eaten
              by overflowing content instead of clearing the CTA. Taking its
              content height makes the bottom padding real on short screens. */}
          <motion.div
            data-checkout="form"
            className="flex flex-col items-start self-start"
            style={{ width: mobile ? '100%' : FORM_W, paddingTop: mobile ? 40 : FORM_TOP, paddingBottom: 80 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          >
            <SectionLabel>Contact information</SectionLabel>
            {/* Height comes from padding, not a fixed 44: a hard height has
                nothing to give when the type or line-height changes, and the
                text ends up crushed against the edges. Padding-driven, the row
                always keeps its 16 above and below whatever it contains. */}
            <div
              className="flex w-full shrink-0 items-center gap-2 rounded-lg px-3 py-4"
              data-checkout="email"
              style={{
                marginTop: 'var(--spacing-gap-600)',
                backgroundColor: 'var(--background-surface-sunken)',
              }}
            >
              <span className="shrink-0 text-[14px]" style={{ lineHeight: 1.4, color: MUTED }}>
                Email
              </span>
              <span className="min-w-0 flex-1 text-[14px] text-[var(--content-default)]" style={{ lineHeight: 1.4 }}>
                axlrose@gnr.com
              </span>
            </div>

            <div className="w-full" style={{ marginTop: 'var(--spacing-gap-700)' }}>
              <SectionLabel>Payment method</SectionLabel>
            </div>

            <div className="w-full" style={{ marginTop: 'var(--spacing-gap-600)' }}>
              <FieldLabel>Card information</FieldLabel>
              {/* one bordered block: number on top, expiry and CVC sharing the row below */}
              <div className="mt-1 w-full">
                <Field
                  placeholder="1234 1234 1234 1234"
                  radius="8px 8px 0 0"
                  value={card}
                  invalid={declined}
                  onChange={(v) => {
                    setCard(v)
                    setDeclined(false)
                  }}
                />
                <div className="flex w-full">
                  <div className="min-w-0 flex-1">
                    <Field placeholder="MM / YY" radius="0 0 0 8px" flush />
                  </div>
                  <div className="min-w-0 flex-1 -ml-px">
                    <Field placeholder="CVC" radius="0 0 8px 0" flush />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full" style={{ marginTop: 'var(--spacing-gap-500)' }}>
              <FieldLabel>Cardholder name</FieldLabel>
              <div className="mt-1 w-full">
                <Field placeholder="Full name on card" radius="8px" />
              </div>
            </div>

            <div className="w-full" style={{ marginTop: 'var(--spacing-gap-500)' }}>
              <FieldLabel>Country or region</FieldLabel>
              <div className="mt-1 w-full">
                <Select value="Nigeria" radius="8px 8px 0 0" />
                <Field placeholder="Address line 1" flush />
                <Field placeholder="Address line 2" flush />
                <Field placeholder="Suburb" flush />
                <Field placeholder="City" flush />
                {/* State and Postal code share the last line, which is how an
                    address form is read — the postal code belongs beside the
                    state, not stacked above it. */}
                <div className="flex w-full">
                  <div className="min-w-0 flex-1">
                    <Select value="State" radius="0 0 0 8px" flush />
                  </div>
                  <div className="-ml-px min-w-0 flex-1">
                    <Field placeholder="Postal code" radius="0 0 8px 0" flush />
                  </div>
                </div>
              </div>
            </div>

            {declined && (
              <p
                data-checkout="declined"
                className="mb-3 w-full text-[14px]"
                style={{ color: DECLINE, lineHeight: 1.45 }}
              >
                Your card was declined. Try another card, or contact your bank.
              </p>
            )}
            <Button
              type="primary"
              size="large"
              data-checkout="pay"
              onClick={() => {
                // the decline is real enough to demo, and clears on the next edit
                if (card.replace(/\s/g, '') === DECLINE_CARD) {
                  setDeclined(true)
                  return
                }
                onPaid?.()
              }}
              className="shrink-0"
              style={{ marginTop: 'var(--spacing-gap-700)', width: '100%' }}
            >
              Pay {PRICE}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
