import engineChatgpt from '../assets/geo-engines/engine-chatgpt.png'
import engineClaude from '../assets/geo-engines/engine-claude.png'
import enginePerplexity from '../assets/geo-engines/engine-perplexity.png'
import engineGemini from '../assets/geo-engines/engine-gemini.png'
import type { EngineIconFrame } from './geoEngines'

/** The example brand this card demonstrates with. Deliberately a dummy — the
 *  answers below are coffee-specific, so swapping in a real brand would read
 *  as nonsense. The card is labelled "EG. BRAND" for that reason. */
export const EXAMPLE_BRAND = 'Counter Culture Coffee'

/** The exact string highlighted inside each answer. */
export const EXAMPLE_BRAND_MENTION = 'Counter Culture,'

export type BrandResponse = {
  engineKey: string
  engineName: string
  icon: string
  iconFrame: EngineIconFrame
  /** Answer text split around the brand mention so it can be highlighted. */
  before: string
  brand: string
  after: string
}

export const BRAND_RESPONSES: BrandResponse[] = [
  {
    engineKey: 'chatgpt',
    engineName: 'ChatGPT',
    icon: engineChatgpt,
    iconFrame: 'bleed',
    before: 'Some great coffee brands to try include ',
    brand: EXAMPLE_BRAND_MENTION,
    after: ' Stumptown, Intelligentsia...',
  },
  {
    engineKey: 'claude',
    engineName: 'Claude',
    icon: engineClaude,
    iconFrame: 'insetWhite',
    before: '...a few solid ones: Blue Bottle, Stumptown, Intelligentsia, ',
    brand: EXAMPLE_BRAND_MENTION,
    after: ' and Death Wish Coffee (if you want something stronger).',
  },
  {
    engineKey: 'perplexity',
    engineName: 'Perplexity',
    icon: enginePerplexity,
    iconFrame: 'bleed',
    before: 'Top-rated specialty roasters right now: ',
    brand: EXAMPLE_BRAND_MENTION,
    after: ' Verve, and Onyx Coffee Lab.',
  },
  {
    engineKey: 'ai-overviews',
    engineName: 'AI Overviews',
    icon: engineGemini,
    iconFrame: 'bleedBorder',
    before: 'Roasters most often recommended by reviewers: Blue Bottle, ',
    brand: EXAMPLE_BRAND_MENTION,
    after: ' and George Howell Coffee.',
  },
]
