import { useEffect, useState } from 'react'
import { Button } from 'design-system'
import useIsMobile from '../useIsMobile'
import GistLogoWide from './GistLogoWide'

/**
 * The flow's top bar — Figma 2001:16817 / 2001:16655 / 2001:16786 / 1859:22965.
 *
 * One bar, three right-hand states, because the mocks differ only there:
 *
 *   'login'   Log in, filled — screens you reach before signing in
 *   'signout' Log out, ghost — screens you only see once signed in
 *   'none'    nothing — no screen uses it now: the login screen keeps Log in
 *             too, by request, so the button never vanishes when clicked
 *
 * The bar's height follows from the action's height (40 / 32 / none) plus the
 * 24 padding, which is how the mocks end up 90 / 82 / 74 tall. Nothing sets a
 * height directly.
 */

const RULE = 'var(--border-default)'
const NAV_PAD_X = 40

/** The widest the marketing pages (Enterprise, Pricing) lay out. Past it the
 *  extra width becomes margin on both sides instead of stretching the page. */
export const PAGE_MAX_W = 1440

/** Side padding that holds content inside a centred `max`-wide band: `pad`
 *  on narrower screens, growing by half the overflow on wider ones. */
export const bandPad = (pad: number, max: number = PAGE_MAX_W) =>
  `max(${pad}px, calc((100% - ${max}px) / 2 + ${pad}px))`
/**
 * Matched to the home page's own bar rather than the original mocks.
 *
 * The mocks drew this bar 74 / 82 / 90 tall depending on which action it
 * carried, and home had since been tightened to 12/15px/32 independently — so
 * the header changed shape as you moved through the flow. Home is the version
 * that got the design attention, so it wins: 12 padding, 15px links, 32 gap,
 * and a fixed 40 action row so every variant is the same 66px bar.
 */
const NAV_PAD_Y = 12
const LINK_GAP = 32
const LINK_SIZE = 15
/** Keeps the bar one height whichever action it shows — including none. */
const ACTION_H = 40

/** The bar's full height on desktop (action row, padding, hairline) — what a
 *  sticky element below it must clear, now that the bar is pinned. */
export const NAV_H = ACTION_H + NAV_PAD_Y * 2 + 1
/**
 * The whole nav, and the one declaration of it — the home page imports this
 * rather than keeping its own copy, which is how the two drifted before.
 *
 * Every link goes straight to a page, so none of them carries a chevron: a
 * caret promises a menu, and there isn't one. Platform / Solutions / Blog are
 * gone rather than sitting here inert.
 */
export const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Enterprise', href: '#v2-enterprise' },
  { label: 'Pricing', href: '#v2-geoplans' },
]

export type NavAction = 'login' | 'signout' | 'none'

/** The current route's hash, kept live — the selected link follows it. */
function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}

/**
 * The nav's links, shared by this bar and the home page's.
 *
 * Every link carries the same padding so the selected one's light grey box
 * appears without nudging its neighbours; the padding is why the row's own
 * gap is small — 12 + 8 + 12 keeps the 32 between labels the bar always had.
 */
export function NavLinks({ mobile }: { mobile: boolean }) {
  const hash = useHash()
  return (
    <nav className="flex items-center" style={{ gap: mobile ? 0 : 8 }}>
      {NAV_LINKS.map(({ label, href }) => {
        const current = hash === href
        return (
          <a
            key={label}
            href={href}
            data-nav="link"
            aria-current={current ? 'page' : undefined}
            className={`shrink-0 whitespace-nowrap text-[var(--content-default)] no-underline transition-colors ${
              current ? '' : 'hover:bg-[var(--background-interactive-hover)]'
            }`}
            style={{
              fontSize: LINK_SIZE,
              lineHeight: 1.4,
              padding: mobile ? '6px 8px' : '6px 12px',
              borderRadius: 'var(--border-radius-md)',
              backgroundColor: current ? 'var(--background-surface-sunken)' : undefined,
            }}
          >
            {label}
          </a>
        )
      })}
    </nav>
  )
}

export default function GistNav({
  action = 'login',
  onLogin,
  maxWidth = PAGE_MAX_W,
}: {
  action?: NavAction
  /** Hold the bar's contents to a centred band this wide. Every screen
   *  uses the same band, so the logo and links sit in the same place on
   *  every page and never jump when you navigate. */
  maxWidth?: number
  /** Overrides where Log in goes. The bar sets the hash itself by default,
   *  which is fine on screens where signing in means starting the paid flow —
   *  but on the free report it does not: someone logging in there is heading
   *  for the product, not for checkout, and only the route knows that. */
  onLogin?: () => void
}) {
  const mobile = useIsMobile()

  return (
    <header
      data-nav="bar"
      data-nav-action={action}
      // Pinned to the top on every screen: it stays put while the page
      // scrolls under it, so the bar never goes away. Opaque, so content
      // doesn't show through as it passes beneath.
      className="sticky top-0 z-40 flex w-full shrink-0 items-center justify-between border-b"
      style={{
        backgroundColor: 'var(--background-surface-page)',
        borderColor: RULE,
        paddingInline: mobile ? 20 : bandPad(NAV_PAD_X, maxWidth),
        paddingBlock: mobile ? 16 : NAV_PAD_Y,
      }}
    >
      <GistLogoWide />

      <div
        className="flex items-center"
        style={{ gap: mobile ? 4 : LINK_GAP - 12, minHeight: mobile ? undefined : ACTION_H }}
      >
        {/* the dropdown links have nowhere to go at phone width */}
        {/* Shown at every width. They were dropped on phones, which cost the
            only two routes out of the flow for no gain: measured at 390 the bar
            has 169px spare and the pair needs 140. */}
        <NavLinks mobile={mobile} />

        {action === 'login' && (
          <Button
            type="primary"
            size="small"
            data-nav="login"
            onClick={onLogin ?? (() => (window.location.hash = '#v2-geologin'))}
          >
            Log in
          </Button>
        )}

        {action === 'signout' && (
          <Button
            type="ghost"
            size="small"
            data-nav="signout"
            onClick={() => (window.location.hash = '#v2-geoscreen')}
          >
            Log out
          </Button>
        )}
      </div>
    </header>
  )
}
