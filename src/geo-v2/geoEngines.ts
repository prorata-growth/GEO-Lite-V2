import engineChatgpt from '../assets/geo-engines/engine-chatgpt.png'
import engineClaude from '../assets/geo-engines/engine-claude.png'
import enginePerplexity from '../assets/geo-engines/engine-perplexity.png'
import engineGemini from '../assets/geo-engines/engine-gemini.png'
import shoeNikeAlphafly from '../assets/geo-engines/shoe-nike-alphafly.png'
import shoeAdidasAdizero from '../assets/geo-engines/shoe-adidas-adizero.png'
import shoeAsicsMetaspeed from '../assets/geo-engines/shoe-asics-metaspeed.png'
import shoeAsicsMegablast from '../assets/geo-engines/shoe-asics-megablast.png'
import shoeSauconyEndorphin from '../assets/geo-engines/shoe-saucony-endorphin.png'

/**
 * The single query every engine is asked. Typed out once on first mount,
 * then held static while the engines are switched beneath it.
 */
export const GEO_QUERY = 'best race-day marathon shoes'

/** How an engine's mark is framed inside its circle. */
export type EngineIconFrame =
  | 'bleed' // artwork fills the circle edge-to-edge (ChatGPT, Perplexity)
  | 'bleedBorder' // fills the circle, plus a hairline border (AI Overviews)
  | 'insetWhite' // white circle with the mark inset (Claude)

/**
 * Two answer shapes exist in the design:
 *  - 'titleDesc'  product name on top, supporting line beneath (ChatGPT, Perplexity, AI Overviews)
 *  - 'labelOnly'  one editorial label per product, top-aligned under the image like
 *                 every other tile — it used to bottom-align across the row, which
 *                 left a two-line label sitting lower than the three-line ones (Claude)
 */
export type EngineCardStyle = 'titleDesc' | 'labelOnly'

export type GeoProduct = {
  image: string
  /** Product name for 'titleDesc', or the whole editorial label for 'labelOnly'. */
  title: string
  description?: string
}

/**
 * Line-height / spacing values that genuinely differ frame-to-frame in Figma.
 * Omit to get the shared defaults (line-height: normal, 8px tile gap).
 * Safe to delete an override if the design is ever normalised.
 */
export type GeoTypeMetrics = {
  /** Multiplier on the 19.47px answer headline. */
  headlineLeading?: number
  /** Multiplier on the 16px product title. */
  titleLeading?: number
  /** Multiplier on the 14px product description. */
  descLeading?: number
  /** px between image / title / description inside a product tile. */
  tileGap?: number
}

export type GeoEngine = {
  key: string
  name: string
  icon: string
  iconFrame: EngineIconFrame
  headline: string
  cardStyle: EngineCardStyle
  metrics?: GeoTypeMetrics
  products: GeoProduct[]
}

export const GEO_ENGINES: GeoEngine[] = [
  {
    key: 'chatgpt',
    name: 'ChatGPT',
    icon: engineChatgpt,
    iconFrame: 'bleed',
    headline: '🏆 My race-day ranking',
    cardStyle: 'titleDesc',
    // ChatGPT's frame runs noticeably looser than the others in Figma.
    metrics: { headlineLeading: 1.78, titleLeading: 1.78, descLeading: 1.2, tileGap: 7 },
    products: [
      {
        image: shoeNikeAlphafly,
        title: 'Nike Alphafly-3',
        description: '$186.97• High-performance racing shoe with lightweight design.',
      },
      {
        image: shoeAdidasAdizero,
        title: 'adidas Adizero Adios...',
        description: '$203.20• Neutral race day shoe with advanced cushioning.',
      },
      {
        image: shoeAsicsMetaspeed,
        title: 'adidas Adizero Adios...',
        description: '$203.20• Neutral race day shoe with advanced cushioning.',
      },
    ],
  },
  {
    key: 'claude',
    name: 'Claude',
    icon: engineClaude,
    iconFrame: 'insetWhite',
    headline: "Here's what's leading the pack for 2026 race day, based on the latest gear reviews:",
    cardStyle: 'labelOnly',
    products: [
      { image: shoeNikeAlphafly, title: 'Best overall carbon-plated "super shoe": Nike Alphafly 3' },
      { image: shoeAsicsMegablast, title: 'Best non-plated racer: ASICS Megablast' },
      { image: shoeAdidasAdizero, title: 'Softest ride among super shoes: Adidas Adizero Adios Pro 4' },
    ],
  },
  {
    key: 'perplexity',
    name: 'Perplexity',
    icon: enginePerplexity,
    iconFrame: 'bleed',
    headline: 'Top marathon race shoes',
    cardStyle: 'titleDesc',
    products: [
      {
        image: shoeNikeAlphafly,
        title: 'Nike Alphafly 3',
        description:
          'Best overall marathon super-shoe for runners who want maximum cushioning, bounce, and late-race comfort.',
      },
      {
        image: shoeAdidasAdizero,
        title: 'adidas Adizero Adios...',
        description: 'A lightweight carbon-plated racer with excellent energy return for fast.',
      },
      {
        image: shoeSauconyEndorphin,
        title: 'Saucony endorphin',
        description:
          'A soft, highly cushioned carbon racer for runners who want a lively, protective ride over 26.2 miles.',
      },
    ],
  },
  {
    // PLACEHOLDER — Figma frame for AI Overviews is still pending.
    // Copy and product picks below are scaffolded so the engine sits in the
    // rotation; swap `headline` / `products` when the real frame lands.
    key: 'ai-overviews',
    name: 'AI Overviews',
    icon: engineGemini,
    iconFrame: 'bleedBorder',
    headline: 'Race-day shoes runners and reviewers rate highest',
    cardStyle: 'titleDesc',
    products: [
      {
        image: shoeNikeAlphafly,
        title: 'Nike Alphafly 3',
        description: 'Widely cited as the fastest marathon shoe for elite and recreational racers alike.',
      },
      {
        image: shoeSauconyEndorphin,
        title: 'Saucony Endorphin',
        description: 'Praised for a plush yet responsive ride that holds up late in a marathon.',
      },
      {
        image: shoeAsicsMetaspeed,
        title: 'ASICS Metaspeed Sky',
        description: 'Recommended for stride-efficient runners chasing a personal best.',
      },
    ],
  },
]

/**
 * Which engines each tier actually covers.
 *
 * The plans page wore one shared row of four pucks on every card, on the
 * stated assumption that coverage does not vary by tier. It does: a free scan
 * queries two engines, a Deep Analysis adds Perplexity, and Claude is
 * Enterprise only. Selling four on the free card promised three engines it
 * never runs.
 *
 * Perplexity sits last in every row, and Claude second where it appears, so
 * the marks read in one order wherever they turn up — the plans cards and the
 * report's offer card both draw from here rather than keeping their own list.
 */
export const ENGINE_KEYS_BY_TIER = {
  snapshot: ['chatgpt', 'ai-overviews'],
  full: ['chatgpt', 'ai-overviews', 'perplexity'],
  enterprise: ['chatgpt', 'claude', 'ai-overviews', 'perplexity'],
} as const

export type GeoTier = keyof typeof ENGINE_KEYS_BY_TIER

export const enginesForTier = (tier: GeoTier): GeoEngine[] =>
  ENGINE_KEYS_BY_TIER[tier].map((key) => GEO_ENGINES.find((e) => e.key === key)!)
