import { ENGINE_KEYS_BY_TIER } from './geoEngines'
import brandAdidas from '../assets/geo-report/brand-adidas.png'
import brandNike from '../assets/geo-report/brand-nike.png'
import brandHoka from '../assets/geo-report/brand-hoka.png'
import brandNewBalance from '../assets/geo-report/brand-newbalance.png'
// white-on-transparent: brand-tread.png bakes in a white margin around its
// black square, which shows as a ring once it's put on a dark disc
import brandTread from '../assets/geo-report/tread-mark-white.png'
import brandOn from '../assets/geo-report/brand-on.png'
import srcRunnersWorld from '../assets/geo-report/citations/runners-world.png'
import srcRei from '../assets/geo-report/citations/rei.png'
import srcTomsGuide from '../assets/geo-report/citations/toms-guide.png'
import srcRoadRunner from '../assets/geo-report/citations/road-runner-sports.png'
import srcReddit from '../assets/geo-report/citations/reddit.png'
import srcRealShoeWorld from '../assets/geo-report/citations/real-shoe-world.png'

/**
 * Everything the report page states — Figma 2253:29929.
 *
 * ── one model, so the figures agree ────────────────────────────
 * Every number here derives from a single run, and nothing contradicts
 * anything else on the page:
 *
 *   40 questions  ×  2 engines            =   80 answers
 *   ~5 brands named per answer            ≈  400 brand mentions
 *
 * The quick scan runs ChatGPT and AI Overviews only. Claude and Perplexity
 * are full-report territory, which is what `FULL_REPORT_INCLUDES` sells.
 *
 *   Share of voice   share of those 400 mentions
 *   Named for        questions where Tread appears in at least one answer
 *   Comparisons      answers naming BOTH Tread and that rival, so every
 *                    matchup is capped by Tread's own 12 mentions
 *
 * Tread's 12 follows from the headline rather than being set beside it: named
 * for 6 of the 40 questions, on two engines, is 12 answers and so 12 mentions.
 *
 * The brands-per-answer figure is what sets how far Tread can fall. Every
 * brand ranked above it needs at least its mention count, so the mentions left
 * after the top four decide how many can fit in between — at ~3 per answer
 * there was only room for two, and Tread could not have ranked below 7th
 * however the table was drawn.
 *   Win rate         of those comparisons, how often AI picks Tread
 *
 * Two consequences worth keeping: the mock's "Adidas owns the other 31" is
 * gone, because 31 answers and 31% share were different quantities wearing the
 * same number; and the comparison counts came down from the hundreds, since a
 * brand named 16 times cannot be weighed against a rival 420 times.
 *
 * Site health counts pages, not answers, so it shares no denominator with any
 * of this and needed no change.
 */

/* ── the run ────────────────────────────────────────────────── */
export const QUESTIONS = 40
export const ANSWERS = 80
/** Questions Tread is named for at all — the headline number. */
export const TREAD_QUESTIONS = 6
export const RIVAL_QUESTIONS = 31

export type Brand = {
  name: string
  logo: string
  /** The mark sits on black for some brands and white for others. */
  dark: boolean
  /** How much of the disc the mark fills, from the mock's per-logo sizing.
   *  1 means the artwork carries its own background and should bleed to the
   *  disc's edge — anything less leaves a visible seam where a square source
   *  meets a round disc. */
  fit: number
}

export const BRANDS: Record<string, Brand> = {
  adidas: { name: 'Adidas', logo: brandAdidas, dark: true, fit: 1 },
  nike: { name: 'Nike', logo: brandNike, dark: true, fit: 0.674 },
  hoka: { name: 'Hoka', logo: brandHoka, dark: false, fit: 0.789 },
  newBalance: { name: 'New Balance', logo: brandNewBalance, dark: false, fit: 0.763 },
  tread: { name: 'Tread', logo: brandTread, dark: true, fit: 0.72 },
  on: { name: 'On', logo: brandOn, dark: false, fit: 0.549 },
}

/* ── 1. Brand visibility ────────────────────────────────────── */
export type ShareRow = { rank: number; brand: Brand; pct: number; mentions: number; you?: boolean }

/**
 * Share of voice, per engine and overall.
 *
 * The report shows both engines as columns rather than behind a filter, so two
 * rules have to hold on every row:
 *
 *   sum      the per-engine counts add exactly to the "all" column —
 *            38+37 = 75 for Adidas, 7+9 = 16 for Tread.
 *   ceiling  no engine's count may exceed that engine's answers. Each engine
 *            sees 40 of the 80 answers, so 40 is the cap. Adidas sat at 41
 *            and 40, which is a brand named more times than there were
 *            answers to name it in — the one figure here that could not
 *            happen, and the reason the whole column read as suspect.
 *
 * `pct` is share of the run's ~240 brand mentions (80 answers naming about
 * three brands each), not share of answers: a brand can appear in nearly every
 * answer and still hold a third of the airtime.
 *
 * `rank` carries the true position, so the "N more brands" row stays derived
 * rather than stored.
 */
export type EngineKey = 'all' | 'chatgpt' | 'ai-overviews'

/** The two engines the free quick scan actually queries. Declared once so
 *  the loading screen and the report filter can never disagree about it. */
export const QUICK_SCAN_ENGINES = ['chatgpt', 'ai-overviews'] as const

export const ENGINE_FILTERS: { key: EngineKey; label: string }[] = [
  { key: 'all', label: 'Both models' },
  { key: 'chatgpt', label: 'ChatGPT' },
  { key: 'ai-overviews', label: 'AI Overviews' },
]

/** Answers behind each column: the whole run, or one engine's quarter of it. */
export const ANSWERS_BY_ENGINE: Record<EngineKey, number> = {
  all: ANSWERS,
  chatgpt: ANSWERS / 2,
  'ai-overviews': ANSWERS / 2,
}

export const SHARE_BY_ENGINE: Record<EngineKey, ShareRow[]> = {
  all: [
    { rank: 1, brand: BRANDS.adidas, pct: 19, mentions: 75 },
    { rank: 2, brand: BRANDS.nike, pct: 15, mentions: 60 },
    { rank: 3, brand: BRANDS.hoka, pct: 8, mentions: 30 },
    { rank: 4, brand: BRANDS.newBalance, pct: 5, mentions: 19 },
    { rank: 15, brand: BRANDS.tread, pct: 3, mentions: 12, you: true },
  ],
  chatgpt: [
    { rank: 1, brand: BRANDS.adidas, pct: 19, mentions: 38 },
    { rank: 2, brand: BRANDS.nike, pct: 16, mentions: 31 },
    { rank: 3, brand: BRANDS.hoka, pct: 7, mentions: 14 },
    { rank: 4, brand: BRANDS.newBalance, pct: 5, mentions: 10 },
    { rank: 17, brand: BRANDS.tread, pct: 3, mentions: 6, you: true },
  ],
  'ai-overviews': [
    { rank: 1, brand: BRANDS.adidas, pct: 19, mentions: 37 },
    { rank: 2, brand: BRANDS.nike, pct: 15, mentions: 29 },
    { rank: 3, brand: BRANDS.hoka, pct: 8, mentions: 16 },
    { rank: 4, brand: BRANDS.newBalance, pct: 5, mentions: 9 },
    { rank: 14, brand: BRANDS.tread, pct: 3, mentions: 6, you: true },
  ],
}

/* ── 2. Site health ─────────────────────────────────────────── */
export const CRAWL_TOTAL = 4182

/** `color` is a CSS custom property, not a hex — the chart ramp lives in the
 *  design system's `chart/categorical/*` tokens, so this can't drift from it. */
export type CrawlBand = { label: string; value: number; color: string }

/** Clockwise from twelve, in the order the funnel loses pages. */
export const CRAWL_BANDS: CrawlBand[] = [
  { label: 'Fully usable', value: 1589, color: 'var(--chart-categorical-1)' },
  { label: 'Not understood', value: 1379, color: 'var(--chart-categorical-2)' },
  { label: 'Not trusted', value: 962, color: 'var(--chart-categorical-3)' },
  { label: 'Not reached', value: 252, color: 'var(--chart-categorical-6)' },
]

/* ── 2b. Site audit — what the free scan actually inspects ───── */
/**
 * The audit is a sample, not a crawl.
 *
 * The engine picks a handful of pages by the role each one plays for the
 * topic — the page an AI answer already cited, the homepage, a product page,
 * something authoritative, a help page — and inspects those. Five on the free
 * scan, twenty on a Deep Analysis. Everything in this block is a count out of
 * that budget; none of it is a share of the site.
 *
 * That rules out the ring the section used to draw. A ring wants a population
 * to divide, and over five pages every slice it could draw lands on a multiple
 * of twenty per cent — a chart with more precision in its shape than in its
 * data. The slots are drawn as five countable things instead, which also gives
 * the one state a ring cannot express at all: a role we looked for and did not
 * find.
 *
 * The one real denominator here is the checks. Twenty-odd of those run across
 * the sampled pages, which is fine-grained enough to carry a figure honestly,
 * so that — not "share of pages" — is what the health number means now.
 */

/** `na` is the spec's `role_expected` miss: a check that does not apply to the
 *  role this page was picked for, which is not the same as one that failed. */
export type CheckState = 'pass' | 'fail' | 'na'
export type PageCheck = { label: string; state: CheckState; note?: string }

/**
 * `not_found` — we looked for a page in this role and the site has none.
 * `inaccessible` — we found one and could not fetch it.
 * Both are worth separating from a failed check: neither is the site failing
 * an inspection, they are inspections that could not happen.
 */
export type AuditSlot = {
  role: string
  /** Why this URL and not another. The engine records where it found each one,
   *  and the reader is entitled to see it — a page picked out of a sitemap and
   *  a page an AI answer actually quoted carry different weight. */
  via?: string
  url?: string
  status: 'audited' | 'not_found' | 'inaccessible'
  checks: PageCheck[]
  /**
   * For a role we could not fill: how many checks it would have carried.
   *
   * Not a guess. The engine assigns its checks by role, so what a help page
   * would have been inspected for is a lookup; this prototype hardcodes the 6
   * the other page roles run.
   */
  expected?: number
}

export const AUDIT_BUDGET = { free: 5, deep: 20 }

const ok = (label: string): PageCheck => ({ label, state: 'pass' })
const no = (label: string, note: string): PageCheck => ({ label, state: 'fail', note })
const na = (label: string, note: string): PageCheck => ({ label, state: 'na', note })

export const AUDIT_SLOTS: AuditSlot[] = [
  {
    role: 'Cited page',
    via: 'Quoted in an AI answer',
    url: 'treadrunning.com/collections/marathon-racing-shoes',
    status: 'audited',
    checks: [
      ok('Reachable by AI crawlers'),
      ok('Main content in the HTML'),
      ok('Title and heading describe the topic'),
      ok('Structured data valid'),
      ok('Answers the topic directly'),
      no('Ratings and reviews readable', 'They render in JavaScript only'),
    ],
  },
  {
    role: 'Homepage',
    via: 'Found in your sitemap',
    url: 'treadrunning.com',
    status: 'audited',
    checks: [
      ok('Reachable by AI crawlers'),
      ok('Main content in the HTML'),
      ok('Title and heading describe the topic'),
      ok('Structured data valid'),
      ok('Last updated date visible'),
      no('Answers the topic directly', 'Nothing routes to marathon shoes'),
    ],
  },
  {
    role: 'Product page',
    via: 'Found in your sitemap',
    url: 'treadrunning.com/products/tread-stride-2',
    status: 'audited',
    checks: [
      ok('Reachable by AI crawlers'),
      ok('Main content in the HTML'),
      ok('Title and heading describe the topic'),
      ok('Answers the topic directly'),
      no('Structured data valid', 'Product schema has no price or availability'),
      no('Ratings and reviews readable', 'They render in JavaScript only'),
    ],
  },
  {
    role: 'Authority page',
    via: 'Found from a navigation link',
    url: 'treadrunning.com/pages/about',
    status: 'audited',
    checks: [
      ok('Reachable by AI crawlers'),
      ok('Main content in the HTML'),
      ok('Title and heading describe the topic'),
      ok('Structured data valid'),
      no('Last updated date visible', 'No date anywhere on the page'),
      na('Answers the topic directly', 'Not expected of this page'),
    ],
  },
  {
    role: 'Help or FAQ page',
    status: 'not_found',
    checks: [],
    expected: 6,
  },
]

/** Checks that belong to the host rather than to any one page, so they are
 *  counted once and not four times. */
export const SITE_CHECKS: PageCheck[] = [
  ok('AI crawlers allowed by robots.txt'),
  ok('Sitemap found and readable'),
  ok('Site responds to a direct request'),
  no('llms.txt published', 'No file at /llms.txt'),
]

function auditTotals() {
  const every = [...AUDIT_SLOTS.flatMap((s) => s.checks), ...SITE_CHECKS]
  const count = (s: CheckState) => every.filter((c) => c.state === s).length
  const passed = count('pass')
  const failed = count('fail')
  /**
   * Checks that never ran, because the page they belong to does not exist.
   *
   * They count against the site. A metric that skipped them would score a
   * site with no help page exactly as well as a site whose help page passes
   * everything, which is not what "site health" can mean: AI cannot read a
   * page that is not there, and that is the site's problem rather than the
   * scan's. It is the same reasoning that keeps n/a *out* — a check that does
   * not apply to a role was never an opportunity, a check on a missing page
   * was an opportunity the site did not provide.
   */
  const missed = AUDIT_SLOTS.filter((s) => s.status !== 'audited').reduce(
    (a, s) => a + (s.expected ?? 0),
    0,
  )
  return {
    passed,
    failed,
    notApplicable: count('na'),
    missed,
    /** Checks that actually ran. */
    run: passed + failed,
    /** What the score divides by: everything the site could have passed. */
    denominator: passed + failed + missed,
    audited: AUDIT_SLOTS.filter((s) => s.status === 'audited').length,
    notFound: AUDIT_SLOTS.filter((s) => s.status === 'not_found').length,
    inaccessible: AUDIT_SLOTS.filter((s) => s.status === 'inaccessible').length,
    budget: AUDIT_BUDGET.free,
  }
}

export const AUDIT = auditTotals()

/* ── 0. GEO score — derived, so it is declared after its inputs ── */
/**
 * One number for the whole scan, 0–100.
 *
 * Derived, never stored: it is the mean of the two things this report already
 * measures, so it cannot disagree with the sections below it.
 *
 *   visibility  your mentions as a share of the category leader's — "how
 *               visible are you next to the brand winning this question"
 *   health      the share of the checks your site could have passed that it
 *               did, counting a missing page's checks as checks it failed
 *
 * The mean is deliberately the plainest combination available. A weighted one
 * would be defensible too, but the weights would be an opinion the report
 * cannot show its working for, and this number is meant to be explainable in
 * the single line printed under it.
 *
 * A caveat for whoever owns this metric: the choice of visibility measure
 * moves the score a long way. Leader-relative share puts Tread at 27; rank
 * percentile among the brands named would put it near 66. That choice is a
 * product decision about what the score is *for*, not a display detail.
 */
export const GEO_SCORE_THRESHOLD = 50

function geoScoreParts() {
  const rows = SHARE_BY_ENGINE.all
  const you = rows.find((r) => r.you)
  const leader = rows[0]
  const visibility = you && leader ? Math.round((you.mentions / leader.mentions) * 100) : 0
  // Checks, not pages. The audit samples five pages, so a share of pages
  // could only ever be 0, 20, 40, 60, 80 or 100 — too coarse to average
  // against anything. The checks run across those pages are the finer count,
  // and they are the thing the section below actually lists.
  //
  // Over `denominator`, not `run`: a slot the site could not fill has to cost
  // something, or the score says a site with no help page is as healthy as one
  // whose help page is perfect. Weighting each slot equally instead, and
  // scoring a missing one zero, lands within a point of this — so the
  // substantive choice is that the gap counts, not how it is counted, and this
  // is the version that fits in the one line printed under the number.
  const health = Math.round((AUDIT.passed / AUDIT.denominator) * 100)
  return { visibility, health, score: Math.round((visibility + health) / 2) }
}

export const GEO_SCORE = geoScoreParts()

/**
 * The formula, printed. A composite nobody can take apart is a number to
 * argue with, so the descriptor names both inputs and shows their values —
 * the reader can check the arithmetic against the two sections below it.
 */
export const GEO_SCORE_DESCRIPTOR =
  `Your visibility next to the leader (${GEO_SCORE.visibility}) and the checks your site ` +
  `passed (${GEO_SCORE.health}), averaged.`

/** The score's own working, for the line under the site health figure. */
export const AUDIT_SUMMARY =
  `${AUDIT.passed} of ${AUDIT.denominator} checks passed. Another ${AUDIT.missed} never ran, on a help or FAQ ` +
  `page your site does not have. A Deep Analysis names every check that failed and audits ` +
  `${AUDIT_BUDGET.deep} pages instead of ${AUDIT_BUDGET.free}.`

/**
 * The three findings, one per slice the ring loses.
 *
 * Deliberately not a technical-SEO checklist: robots.txt, noindex and H1s are
 * table stakes, and leading with them argues that AI answers work like search
 * — the opposite of this product's whole claim. Each finding here is something
 * only a GEO run could tell you, and each one explains a number elsewhere on
 * the page: the crawl gap hides the width specs that Competitive intelligence
 * says Tread wins on, and the missing comparison pages are why AI has only
 * Adidas to quote.
 *
 * `band` indexes CRAWL_BANDS so the dot, the label and the count can never
 * drift from the slice they belong to.
 */
export type Finding = { band: number; headline: string; fix: string }

export const FINDINGS: Finding[] = [
  {
    band: 3, // Not reached
    headline: 'GPTBot and ClaudeBot never got past /shoes/',
    fix: 'Add them to sitemap.xml — these hold the width and drop specs buyers ask for.',
  },
  {
    band: 1, // Not understood
    headline: 'Reviews render in JavaScript only',
    fix: 'Neither engine we scanned can see your 4.6★ average. Serve them in the HTML.',
  },
  {
    band: 2, // Not trusted
    headline: 'No page compares Tread to a rival',
    fix: `Asked "Tread vs Adidas", AI has only Adidas to quote.`,
  },
]

/** Everything that came back clean. Worth counting, not worth 290px — nobody
 *  reads a report to find out that nothing happened. */
export const PASSED_CHECKS = [
  'AI crawlers allowed by robots.txt',
  'No noindex on key pages',
  'Structured data present and valid',
  'One clear title and H1 on top pages',
  'Outbound citations visible',
  'No cloaking detected',
]

/**
 * What the gated checks resolve to once the Deep Analysis is bought. Some of
 * them fail — a paid tier where everything passes would read as a shakedown.
 *
 * "Mobile rendering parity" used to sit in this list and has been replaced.
 * The audit spec rules it out at every tier, so it could not be what the paid
 * one unlocks; comparison page coverage is a check the engine can actually
 * run, and it is the one the report's own narrative keeps pointing at.
 */
export type ResolvedCheck = { label: string; ok: boolean; note?: string }

export const UNLOCKED_CHECKS: ResolvedCheck[] = [
  { label: 'Content freshness signals', ok: false, note: '812 pages over 18 months old' },
  { label: 'Duplicate content check', ok: true },
  { label: 'Comparison page coverage', ok: false, note: 'No page compares Tread to a rival' },
  { label: 'Schema completeness score', ok: false, note: '62 of 100' },
  { label: 'Internal linking depth', ok: true },
]

export const LOCKED_CHECKS = [
  'Content freshness signals',
  'Duplicate content check',
  'Comparison page coverage',
  'Schema completeness score',
  'Internal linking depth',
]

/**
 * The long tail between the visible top four and Tread.
 *
 * Display-only filler: the scan in this prototype holds real figures for five
 * brands, so everything the "N more brands" row expands to is generated from
 * the gap rather than measured. The names are invented, the marks are initial
 * discs rather than sourced logos, and the counts interpolate between the last
 * real row and Tread's — which keeps the column monotonic and plausible
 * without dressing invented numbers up as findings.
 *
 * Long enough to cover the widest gap any engine produces (ChatGPT's 39).
 */
export const TAIL_BRAND_NAMES = [
  'Saucony', 'Brooks', 'Asics', 'Mizuno', 'Altra', 'Topo Athletic', 'Merrell',
  'Salomon', 'La Sportiva', 'Scarpa', 'Inov-8', 'Craft', 'Puma', 'Reebok',
  'Under Armour', 'Skechers', 'Veja', 'Allbirds', 'Norda', 'Tracksmith',
  'Satisfy', 'Bandit', 'Soar', 'District Vision', 'Ciele', 'Janji', 'Path Projects',
  'Rabbit', 'Oiselle', 'Lululemon', 'Vuori', 'Arc\u2019teryx', 'Patagonia',
  'The North Face', 'Columbia', 'Karrimor', 'Kiprun', 'Decathlon', 'Xero Shoes',
  'Vivobarefoot', 'Newton', 'Hylo', 'Tarkine',
] as const

/* ── 3. Citations ───────────────────────────────────────────── */
/**
 * Which sources the engines drew on, and whether you are one of them.
 *
 * Replaces Head to head, which the free scan cannot afford: a matchup's count
 * is free but its verdict needs a pass over answer text. A citation is the
 * opposite — the source list comes back with the answer, so this is the
 * cheapest real finding in the report.
 *
 * `answers` is the source of truth and `pct` derives from it, so the share and
 * the count can never disagree. Shares are of the 80 answers the run produced,
 * not of some total of citations: one answer citing a domain twice still only
 * counts once, which is why these do not sum to 100.
 *
 * Tread's own domain sits in the list rather than beside it. The question this
 * section answers is the report's question — where do you stand — and a table
 * of publishers with the reader absent from it answers a different one.
 */
export type CitationRow = {
  rank: number
  domain: string
  /** A publisher's mark, drawn full-bleed in its disc. */
  logo?: string
  /** Set instead of `logo` when the source is a brand this report already
   *  knows: it then renders through BrandDisc, which carries the ground and
   *  the fit each mark needs. Tread's artwork is white, so on the publishers'
   *  white disc it would be invisible. */
  brand?: Brand
  answers: number
  pct: number
  you?: boolean
}

const cite = (
  rank: number,
  domain: string,
  art: { logo?: string; brand?: Brand },
  answers: number,
  you?: boolean,
): CitationRow => ({
  rank,
  domain,
  ...art,
  answers,
  pct: Math.round((answers / ANSWERS) * 100),
  you,
})

export const CITATIONS: CitationRow[] = [
  cite(1, 'runnersworld.com', { logo: srcRunnersWorld }, 34),
  cite(2, 'rei.com', { logo: srcRei }, 22),
  cite(3, 'tomsguide.com', { logo: srcTomsGuide }, 15),
  cite(4, 'roadrunnersports.com', { logo: srcRoadRunner }, 12),
  cite(5, 'reddit.com', { logo: srcReddit }, 9),
  cite(6, 'realshoeworld.com', { logo: srcRealShoeWorld }, 3),
  cite(9, 'treadrunning.com', { brand: BRANDS.tread }, 2, true),
]

/* ── 4. Competitive intelligence ────────────────────────────── */
export type Matchup = {
  brand: Brand
  comparisons: number
  /** Source of truth. `winRate` is derived, so the ring and the "n of m" it
   *  sits beside can never disagree. */
  wins: number
  winRate: number
  verdict: string
}

const matchup = (brand: Brand, comparisons: number, wins: number, verdict: string): Matchup => ({
  brand,
  comparisons,
  wins,
  winRate: Math.round((wins / comparisons) * 100),
  verdict,
})

/** Capped by Tread's 38 mentions — a matchup only happens in an answer naming
 *  them both. They overlap, so the four can sum past 38. */
/* Every verdict reads from Tread's side. They used to flip subject — "Adidas
   wins on race-day proof" next to "You win on width options" — which left the
   reader without a fixed vantage point and made a row about a rival rather
   than about themselves. */
export const MATCHUPS: Matchup[] = [
  matchup(BRANDS.adidas, 12, 4, 'You lose on race-day proof — they have carbon plates and marathon results.'),
  matchup(BRANDS.hoka, 8, 5, 'You win on width options and everyday comfort.'),
  matchup(BRANDS.newBalance, 6, 4, 'You win on price and return policy.'),
  matchup(BRANDS.on, 7, 2, 'You lose on design — they own city-running positioning.'),
]

/* ── right rail ─────────────────────────────────────────────── */
export const THE_GIST = `Tread shows up in just ${TREAD_QUESTIONS} of the ${QUESTIONS} answers we asked about marathon shoes. Adidas is ${RIVAL_QUESTIONS}.`

/** Only in the paid report — these are what the free run's fade is hiding. */
export const GATED_FINDINGS = [
  { title: 'Sentiment', blurb: 'How AI describes you when it does', count: 4 },
  { title: 'Freshness', blurb: 'Whether your newest content is seen', count: 5 },
]

/** What the paid report adds over the free scan — shown in the "see an
 *  example" modal. Lives here rather than in one page so both reports quote
 *  the same promise. */
/**
 * What the full report page offers once someone has finished with it.
 *
 * The report was a dead end: download or share, and there was nowhere to go.
 * A one-off document is also the wrong shape for the thing it measures —
 * answers move, so the value is in watching them, which is what the platform
 * does and this report cannot.
 *
 * The code is a placeholder for the prototype, not a real promotion.
 */
export const FULL_REPORT_UPSELL = {
  title: 'You\u2019ve unlocked 7 days of GEO Pro',
  blurb:
    'This report is one day\u2019s reading. Gist GEO Pro runs the same questions daily and tells you when an answer moves.',
  cta: 'Start 7 days free',
}

/** The rail's pitch for the paid run, between the gist and the CTA. Names the
 *  thing being sold — a Deep Analysis — rather than "the full report", which
 *  described the artifact and not the work. */
export const DEEP_ANALYSIS_PITCH =
  'A Deep Analysis shows exactly where you stand and what to improve.'

/**
 * The same offer, said two ways, picked by the score.
 *
 * A scan that came back low and a scan that came back strong are asking for
 * different things. Below the threshold the reader already knows something is
 * wrong and wants to be told what to do, so the pitch is prescriptive. Above
 * it there is nothing to rescue, so it is about holding a position rather
 * than fixing one.
 *
 * The pitch moves; the button does not. "Unlock Deep Analysis" names the
 * thing being bought, and a button whose label changes with the data is a
 * button nobody can refer to — in support, in a doc, or between two people
 * looking at different scans. The line above it is where the argument goes.
 *
 * Both strings stay in this file rather than in the rail so the threshold and
 * the copy that depends on it can be read in one place.
 */
export const DEEP_ANALYSIS_BY_SCORE = {
  low: 'A Deep Analysis names the gaps holding your score down, and how to close them.',
  high: 'A Deep Analysis shows what your score is built on, and where it is at risk.',
} as const

/** Which of the two pitches the current scan gets. */
export const DEEP_ANALYSIS_OFFER =
  GEO_SCORE.score < GEO_SCORE_THRESHOLD ? DEEP_ANALYSIS_BY_SCORE.low : DEEP_ANALYSIS_BY_SCORE.high

/** The rail's own list of what the paid run returns. Shorter and blunter than
 *  FULL_REPORT_INCLUDES, which is the example modal's version with a blurb per
 *  line — a rail that explains each item is a page, not a rail. The first line
 *  carries the engine marks instead of naming them. */
/**
 * The answers behind a head-to-head score.
 *
 * A "comparison" is not an object in this data — it is an answer that happened
 * to name both brands. So the drill-down lists those answers rather than a set
 * of comparisons, and it is derived from the matchup rather than stored beside
 * it: the count is always exactly `comparisons`, and the wins always exactly
 * `wins`, so the list can never disagree with the score it opened from.
 *
 * The questions are the real ones this scan runs; which question landed which
 * result is demo data, not a record of a run.
 */
const MATCHUP_QUESTIONS = [
  'Best marathon racing shoes in 2026?',
  'Best carbon-plated shoes for a sub-3-hour marathon',
  'Fastest shoes for race day',
  'Are super shoes worth the price?',
  'Top marathon shoes for wide feet',
  'Best racing flats for race day',
  'Which marathon shoes last longest?',
  'Best shoes for a first marathon',
  'Marathon shoes for heavier runners',
  'Best value racing shoe',
  'Which brand do coaches recommend?',
  'Best shoes for a rainy race day',
]

export type MatchupAnswer = {
  question: string
  engine: (typeof QUICK_SCAN_ENGINES)[number]
  /** Whether this answer went Tread's way. */
  won: boolean
}

export function answersFor(m: Matchup): MatchupAnswer[] {
  return Array.from({ length: m.comparisons }, (_, i) => ({
    question: MATCHUP_QUESTIONS[i % MATCHUP_QUESTIONS.length],
    // The free scan covers two engines, so these answers come from those two.
    engine: QUICK_SCAN_ENGINES[i % QUICK_SCAN_ENGINES.length],
    // Wins first, so the count of `won` is exactly the matchup's own.
    won: i < m.wins,
  }))
}

/** The rail's own list of what the paid run returns. Blunter than
 *  FULL_REPORT_INCLUDES, which is the example modal's version with a blurb per
 *  line — a rail that explains each item is a page, not a rail. */
export const RAIL_INCLUDES: { label: string; engines?: boolean }[] = [
  // Counted from the tier itself. Hardcoding "4" is how it came to promise an
  // engine a Deep Analysis does not run, and the marks are drawn from the same
  // list, so the number and the icons cannot drift apart.
  { label: `${ENGINE_KEYS_BY_TIER.full.length} Engines`, engines: true },
  { label: '20-page site audit' },
  { label: 'Full suite of visibility and performance metrics' },
  { label: 'Insights to help you understand your results' },
  { label: 'What you can do to improve your standing' },
]

/** What the example-report modal lists. The same spec the rail sells, so the
 *  preview and the offer cannot promise different things — the rail leads with
 *  the engine marks instead of naming the line, which is the only difference.
 *
 *  No blurbs: these lines are the spec, and a sentence under each was the old
 *  list explaining a shorter one. */
export const FULL_REPORT_INCLUDES: { title: string; blurb?: string }[] = [
  { title: 'Additional prompts and models' },
  { title: '20-page site audit' },
  { title: 'Full suite of visibility and performance metrics' },
  { title: 'Insights to help you understand your results' },
  { title: 'What you can do to improve your standing' },
]

export const MORE_FINDINGS = [
  { title: 'Visibility', blurb: 'Where and how often you appear', count: 3 },
  { title: 'Citation', blurb: 'Whether AI links to your content', count: 6 },
  { title: 'Authority', blurb: 'Who AI trusts instead, and why', count: 2 },
  { title: 'Competitive', blurb: 'Which brands are winning the question', count: 8 },
]
