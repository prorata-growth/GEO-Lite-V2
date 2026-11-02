import { motion } from 'framer-motion'
import useLayoutMode from './useLayoutMode'

/**
 * Enterprise — a customer's word, set large over a faint dot field: the
 * quote's opening in ink, its payoff in Gist blue, and the speaker beneath.
 *
 * Took the place of "What's included" by request.
 */

const EASE = [0.16, 1, 0.3, 1] as const

const T = {
  ink: 'var(--content-default)',
  muted: 'var(--content-secondary)',
  dot: 'var(--border-default)',
} as const

/** Strongest at the middle of the page, gone by its left and right edges;
 *  a short fade top and bottom so the band has no hard line either. */
const FADE =
  'linear-gradient(to right, transparent, #000 30%, #000 70%, transparent), ' +
  'linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)'

/** The quote mark: two slanted strokes, drawn rather than typeset so it
 *  keeps its shape whatever the font. */
function QuoteMark({ size }: { size: number }) {
  return (
    <svg aria-hidden width={size} height={size * 0.6} viewBox="0 0 40 24" fill={T.ink}>
      <path d="M8 0h9L9 24H0z" />
      <path d="M28 0h9l-8 24h-9z" />
    </svg>
  )
}

export default function EnterpriseQuote() {
  const phone = useLayoutMode() === 'phone'

  return (
    <motion.figure
      data-enterprise="quote"
      className="relative m-0 w-full"
      style={{
        padding: phone ? '40px 24px' : 'clamp(48px, 6vw, 88px) clamp(32px, 7vw, 120px)',
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* The dot field, edge to edge of the window rather than boxed to the
          column: it runs out past the content and fades away towards both
          sides of the page, and softly at top and bottom, so no container
          edge shows. The page frame clips the overhang. */}
      <span
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          zIndex: -1,
          top: 0,
          bottom: 0,
          left: '50%',
          width: '100vw',
          translate: '-50% 0',
          backgroundImage: `radial-gradient(${T.dot} 1px, transparent 1.2px)`,
          backgroundSize: '14px 14px',
          backgroundPosition: 'center',
          maskImage: FADE,
          WebkitMaskImage: FADE,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />
      <QuoteMark size={phone ? 28 : 40} />
      <blockquote
        className="m-0"
        style={{
          marginTop: 'var(--spacing-gap-600)',
          fontSize: 'clamp(28px, 4.2vw, 60px)',
          lineHeight: 1.12,
          letterSpacing: '-0.025em',
          fontWeight: 500,
          color: T.ink,
          maxWidth: 1180,
        }}
      >
        It&rsquo;s one of the few platforms where you can see the connection{' '}
        <span style={{ color: 'var(--chart-categorical-1)' }}>between visibility, engagement, and actual business outcome.</span>
      </blockquote>
      <figcaption className="flex flex-col" style={{ marginTop: 'clamp(32px, 4vw, 56px)', gap: 4 }}>
        <span style={{ fontSize: 18, fontWeight: 500, color: T.ink }}>Scott Bishoff</span>
        <span style={{ fontSize: 15, lineHeight: 1.5, color: T.muted }}>
          Vice President of Media
          <br />
          Black Bear Pictures
        </span>
      </figcaption>
    </motion.figure>
  )
}
