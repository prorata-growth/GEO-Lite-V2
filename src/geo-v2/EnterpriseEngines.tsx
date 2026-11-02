import { motion } from 'framer-motion'
import useTypeScale from './typeScale'
import useIsMobile from '../useIsMobile'
import chatgpt from '../assets/geo-v2/ai-logos/chatgpt.png'
import perplexity from '../assets/geo-v2/ai-logos/perplexity.png'
import claude from '../assets/geo-v2/ai-logos/claude.png'
import gemini from '../assets/geo-v2/ai-logos/gemini.png'
import aiOverviews from '../assets/geo-v2/ai-logos/google-ai-overviews.png'

/**
 * Enterprise — the AI engines' wordmarks, as a section of their own between
 * the hero and "What's included".
 *
 * The PNGs are alpha-only (cut from the supplied white-on-black sheet, with
 * brightness turned into transparency), so they are drawn as masks over
 * `currentColor` and follow the theme rather than being fixed white artwork.
 */
/** Included engines first; Claude and Gemini are add-ons, so they come last
 *  and carry a small grey "Add-on" pill after the name. */
/** `k` scales one mark on top of the shared size: the three included engines
 *  are drawn 10% larger by request; the add-ons keep the base size. */
const LOGOS: { name: string; src: string; w: number; h: number; k?: number; addOn?: boolean }[] = [
  { name: 'ChatGPT', src: chatgpt, w: 326, h: 72, k: 1.1 },
  { name: 'Perplexity', src: perplexity, w: 336, h: 80, k: 1.1 },
  { name: 'Google AI Overviews', src: aiOverviews, w: 373, h: 84, k: 1.1 },
  { name: 'Claude', src: claude, w: 334, h: 72, addOn: true },
  { name: 'Gemini', src: gemini, w: 326, h: 74, addOn: true },
]

/** Rendered height of the ChatGPT mark; the sheet's logos share a cap
 *  height, so the rest scale by the same factor. */
const LOGO_H = 18 // smaller, by request: a quiet logo strip rather than a feature

/** The row's width at 1440, where every size below was set. Past it nothing
 *  grows; under it everything — logos, pills, label and gaps — shrinks by the
 *  same factor, so the row keeps its proportions and stays one line, centred
 *  over the dashboard. Sizes are written as `min(px, cqw)` against the row. */
const ROW_W = 980
const fit = (px: number) => `min(${px}px, ${((px * 100) / ROW_W).toFixed(3)}cqw)`

/** The three included engines, then the two add-ons: a phone stacks them on
 *  two centred lines rather than shrinking one line to a sliver. Each line
 *  shrinks the same way the desktop row does, against the widest line's
 *  natural width (~380 with its gaps), so neither ever wraps. */
const PHONE_W = 400
const fitPhone = (px: number) => `min(${px}px, ${((px * 100) / PHONE_W).toFixed(3)}cqw)`
const PHONE_LINES = [LOGOS.slice(0, 3), LOGOS.slice(3)]

/** A length for a CSS shorthand: numbers are pixels. */
const css = (v: string | number) => (typeof v === 'number' ? `${v}px` : v)

function Mark({ l, size }: { l: (typeof LOGOS)[number]; size: (px: number) => string | number }) {
  const mask = `url("${l.src}") center / contain no-repeat`
  return (
    <span className="flex shrink-0 items-center" style={{ gap: size(8) }}>
      <span
        role="img"
        aria-label={l.addOn ? `${l.name} (add-on)` : l.name}
        style={{
          display: 'block',
          width: size(Math.round(l.w * (LOGO_H / 72) * (l.k ?? 1))),
          height: size(Math.round(l.h * (LOGO_H / 72) * (l.k ?? 1))),
          backgroundColor: 'currentColor',
          mask,
          WebkitMask: mask,
        }}
      />
      {/* an outlined grey pill in line after the wordmark, as in the
          supplied reference; it shrinks with the logo it belongs to */}
      {l.addOn && (
        <span
          aria-hidden
          className="whitespace-nowrap"
          style={{
            padding: `${css(size(1))} ${css(size(8))}`,
            borderRadius: 999,
            // grey, by request
            border: '1px solid var(--border-default)',
            color: 'var(--content-secondary)',
            fontSize: size(12), // the default tight 200 size, scaled
            fontWeight: 400, // regular, by request
            lineHeight: 1.4,
          }}
        >
          Add-on
        </span>
      )}
    </span>
  )
}

export default function EnterpriseEngines() {
  const TS = useTypeScale()
  const mobile = useIsMobile()
  const label = (fontSize: string) => (
    <span
      className="shrink-0 whitespace-nowrap"
      style={{
        ...TS.eyebrow,
        // a step up from the 12 eyebrow, by request — the hero's 14
        fontSize,
        fontWeight: 500,
        letterSpacing: '0.08em',
        color: 'var(--chart-categorical-1)', // Gist blue, by request
      }}
    >
      TRACKED ACROSS
    </span>
  )

  return (
    <motion.section
      data-enterprise="engines"
      // One line above a phone: the label leads, then the logos, the whole
      // row 80% of the dashboard's width (it caps at 1240) and centred over
      // it, shrinking as one piece as the window narrows. A phone stacks the
      // label over two centred lines of logos.
      className="flex flex-col items-center self-center"
      style={{
        width: mobile ? '100%' : 'min(80%, 992px)',
        // the row's own width is what its `cqw` sizes read
        containerType: 'inline-size',
        gap: 'var(--spacing-gap-600)',
        // no rules above and below, by request — the page's section gap does
        // the separating on its own
        // tight to the dashboard below, by request: 64 off the section gap
        marginBottom: 'calc(var(--spacing-gap-800) * -1 - var(--spacing-gap-600))',
      }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {mobile ? (
        <>
          {label('var(--text-accent-tight-300-font-size)')}
          <ul className="m-0 flex w-full list-none flex-col items-center p-0" style={{ gap: 'var(--spacing-gap-600)', color: 'var(--content-default)' }}>
            {PHONE_LINES.map((line, i) => (
              <li key={i} className="flex flex-nowrap items-center justify-center" style={{ gap: fitPhone(24) }}>
                {line.map((l) => (
                  <Mark key={l.name} l={l} size={fitPhone} />
                ))}
              </li>
            ))}
          </ul>
        </>
      ) : (
        // justify-between spaces the label and the five logos evenly, so
        // every gap in the row is the same; the gap is only a floor
        <ul
          className="m-0 flex w-full list-none flex-nowrap items-center justify-between p-0"
          style={{ gap: fit(24), color: 'var(--content-default)' }}
        >
          <li className="flex">{label(fit(14))}</li>
          {LOGOS.map((l) => (
            <li key={l.name} className="flex">
              <Mark l={l} size={fit} />
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  )
}
