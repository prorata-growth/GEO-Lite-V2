import { useEffect, useState, type ReactNode } from 'react'
import { Modal } from 'design-system'

/**
 * Share — a public read-only link.
 *
 * Deliberately ungated: the recipient gets the locked snapshot, same as the
 * owner sees, and the locks travel with it. A partial report circulating with
 * an unlock button on it is the growth loop; gating the share would trade that
 * away to protect a report the owner is already looking at.
 *
 * Built on the system's Modal, which brings the portal, scrim, focus trap,
 * scroll lock and Escape handling with it — this file used to hand-roll all
 * five.
 */

/** The route a shared link lands on — the recipient's view of the report. */
export const SHARE_ROUTE = '#v2-georeportshared'

/**
 * The link the dialog hands out.
 *
 * Built from the origin it is running on, so the copied link actually opens
 * the shared report — in a prototype whose whole point is the loop, a link
 * that goes nowhere is the one thing the dialog must not do. It was a
 * hand-written `gist.ai/r/…`, which looked the part and led nowhere.
 *
 * Production mints a short link per scan; the shape of what is copied is the
 * same, and the field shows exactly what the clipboard gets either way.
 */
export function shareUrl() {
  if (typeof window === 'undefined') return SHARE_ROUTE
  return `${window.location.origin}${window.location.pathname}${SHARE_ROUTE}`
}

/** How long the page is held before it is left alone — long enough to cover a
 *  first open, which renders the whole preview report and blocks for over half
 *  a second, and short enough to be over before anyone could scroll on
 *  purpose. */
const SETTLE_MS = 800
/** A timer rather than `requestAnimationFrame`: rAF is frozen in a hidden or
 *  backgrounded tab, and a correction that only runs when the tab is
 *  foregrounded is not one. */
const SETTLE_TICK_MS = 16

/**
 * Keep the page where it is while the dialog opens. **Call this from whatever
 * opens the dialog, before flipping it open.**
 *
 * Radix focuses the dialog's first control on open, and the browser scrolls
 * the page to bring it into view — 83px on a phone — even though the dialog
 * is `position: fixed` and already on screen. The report visibly jumps behind
 * the scrim and stays jumped after it closes.
 *
 * It lives at the trigger rather than in an effect because there is no point
 * inside the component early enough to read the old position: opening renders
 * the preview, which blocks for ~670ms, and the focus scroll happens inside
 * that commit — so by the time even a layout effect runs, `scrollY` is
 * already the jumped value and there is nothing left to restore.
 */
export function holdPageScroll() {
  const y = window.scrollY
  const tick = window.setInterval(() => {
    if (Math.abs(window.scrollY - y) > 1) window.scrollTo(0, y)
  }, SETTLE_TICK_MS)
  window.setTimeout(() => window.clearInterval(tick), SETTLE_MS)
}

const T = {
  ink: 'var(--content-default)',
  muted: 'var(--content-secondary)',
  line: 'var(--border-default)',
  raised: 'var(--background-surface-raised)',
  successBg: 'var(--background-status-success)',
  successInk: 'var(--content-status-success)',
  primary: 'var(--background-action-primary-default)',
  inverse: 'var(--content-inverse)',
  r_md: 'var(--border-radius-md)',
} as const

const TYPE = {
  dense: { fontSize: 14, fontWeight: 400, lineHeight: 1.4 },
  denseMed: { fontSize: 14, fontWeight: 500, lineHeight: 1.4 },
} as const

export default function ShareSnapshotModal({
  open,
  onClose,
  preview,
}: {
  open: boolean
  onClose: () => void
  /**
   * The recipient's view, rendered inline. This replaced a "See what they'll
   * see" link that navigated away — checking what you're about to send
   * shouldn't cost you the dialog you're sending from.
   */
  preview?: ReactNode
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) setCopied(false)
  }, [open])

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl())
    } catch {
      // Clipboard is permission-gated and fails silently in some contexts; the
      // field is selectable, so there is always a manual way through.
    }
    setCopied(true)
  }

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
      title="Share this scan"
      description="Anyone with the link can view it. Locked sections stay locked."
      data-report="share-modal"
      preview={preview}
      // No footer. "Done" sat a few pixels from "Copy link" and was competing
      // with it — two buttons, one of them the point of the dialog. The X and
      // Escape both close it, which is what a dialog with nothing to confirm
      // should rely on.
    >
      {/* Input + action share one bordered box, so this stays hand-built: the
          system's Input takes a trailing *icon*, not a trailing button. */}
      <div
        className="flex w-full items-center"
        style={{
          gap: 8,
          padding: 6,
          border: `1px solid ${T.line}`,
          borderRadius: T.r_md,
          backgroundColor: T.raised,
        }}
      >
        <input
          readOnly
          value={shareUrl()}
          aria-label="Shareable link"
          className="min-w-0 flex-1 bg-transparent focus:outline-none"
          style={{ ...TYPE.dense, color: T.ink, paddingInline: 8 }}
        />
        {/* Not the DS Button: the confirmed state swaps to the success pair,
            and Button has no success type. */}
        <button
          type="button"
          data-report="share-copy"
          onClick={copy}
          className="flex h-9 shrink-0 items-center justify-center px-3 transition-colors"
          style={{
            borderRadius: T.r_md,
            backgroundColor: copied ? T.successBg : T.primary,
          }}
        >
          <span
            className="whitespace-nowrap"
            style={{ ...TYPE.denseMed, color: copied ? T.successInk : T.inverse }}
          >
            {copied ? 'Copied' : 'Copy link'}
          </span>
        </button>
      </div>
    </Modal>
  )
}
