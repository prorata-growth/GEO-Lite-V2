import type { ReactNode } from 'react'
import { InstagramLogo, LinkedinLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react'
import useIsMobile from '../useIsMobile'
import { PAGE_MAX_W, bandPad } from './GistNav'

/**
 * The site footer — shared by the Pricing and Enterprise pages.
 *
 * Dark in both themes: it is the brand's own footer, drawn as the supplied
 * design draws it, not a surface that follows the page. So its colours are
 * fixed here rather than read from the theme tokens — the one deliberate
 * exception — with the mint block taken from the brand token.
 *
 * Only Gist GEO points somewhere in this prototype (the flow's entry). The
 * other links and the social icons are placeholders until the real URLs are
 * known — `#` rather than guessed addresses.
 */

const BG = '#0b0b0c'
const INK = '#f4f2ea'
const MUTED = 'rgba(244, 242, 234, 0.6)'

const PRODUCTS = [
  { label: 'Gist GEO', href: '#v2-geoscreen' },
  { label: 'Gist Answers', href: '#' },
]

const COMPANY = ['About Us', 'Contact', 'Terms of Use', 'Privacy Policy', 'Consumer Choices', 'Supplemental Terms']

const SOCIAL: { label: string; icon: ReactNode }[] = [
  { label: 'X', icon: <XLogo size={28} /> },
  { label: 'Instagram', icon: <InstagramLogo size={28} /> },
  { label: 'YouTube', icon: <YoutubeLogo size={28} weight="fill" /> },
  { label: 'LinkedIn', icon: <LinkedinLogo size={28} weight="fill" /> },
]

function Link({ href = '#', children }: { href?: string; children: ReactNode }) {
  return (
    <a href={href} className="no-underline transition-opacity hover:opacity-70" style={{ color: INK, fontSize: 15, lineHeight: 1.4 }}>
      {children}
    </a>
  )
}

/** `maxWidth` is the band the footer's contents hold to, in the footer's own
 *  CSS pixels — the Pricing page draws it at 80% zoom, so it passes the
 *  layout width that renders as PAGE_MAX_W there. */
export default function GistFooter({ maxWidth = PAGE_MAX_W }: { maxWidth?: number }) {
  const mobile = useIsMobile()

  return (
    <footer
      data-footer="site"
      className="w-full shrink-0"
      style={{ backgroundColor: BG, color: INK, padding: mobile ? '48px 24px 56px' : '64px 0 80px', paddingInline: mobile ? 24 : bandPad(100, maxWidth) }}
    >
      <div
        className="flex w-full"
        style={{
          flexDirection: mobile ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: mobile ? 40 : 48,
        }}
      >
        {/* the wordmark and the socials */}
        <div className="flex flex-col" style={{ gap: 24 }}>
          <span className="flex items-end" style={{ gap: 4 }} aria-label="Gist">
            <span aria-hidden style={{ fontSize: 44, fontWeight: 500, lineHeight: 0.9, letterSpacing: '-0.02em' }}>
              Gist
            </span>
            <span aria-hidden style={{ width: 28, height: 40, backgroundColor: 'var(--brand-mint)' }} />
          </span>
          <span className="flex items-center" style={{ gap: 20 }}>
            {SOCIAL.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="flex transition-opacity hover:opacity-70" style={{ color: INK }}>
                {s.icon}
              </a>
            ))}
          </span>
        </div>

        {/* the link columns and the legal line */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3, minmax(0, auto))',
            columnGap: mobile ? 24 : 'clamp(48px, 7vw, 104px)',
            rowGap: 40,
          }}
        >
          <nav aria-label="Products" className="flex flex-col" style={{ gap: 14 }}>
            <span style={{ fontSize: 15, lineHeight: 1.4, marginBottom: 12 }}>Products</span>
            {PRODUCTS.map((p) => (
              <Link key={p.label} href={p.href}>
                {p.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Company" className="flex flex-col" style={{ gap: 14 }}>
            {COMPANY.map((c) => (
              <Link key={c}>{c}</Link>
            ))}
          </nav>
          <p className="m-0" style={{ fontSize: 15, lineHeight: 1.7, color: mobile ? MUTED : INK, gridColumn: mobile ? '1 / -1' : undefined }}>
            © 2026 ProrataAI, Inc.
            <br />
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
