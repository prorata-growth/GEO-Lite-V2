import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import {
  ArrowUp,
  ArrowRight,
  CaretDown,
  CaretUpDown,
  ChartBar,
  ChartLine,
  ChatText,
  CrosshairSimple,
  DownloadSimple,
  FileText,
  Info,
  Lightning,
  SidebarSimple,
  SquaresFour,
  UsersThree,
} from '@phosphor-icons/react'
import { GEO_ENGINES } from './geoEngines'
import EngineIcon from './EngineIcon'
import brewlune from '../assets/geo-v2/enterprise/brand-stamp.png'
import blueBottle from '../assets/geo-v2/enterprise/mark-0.png'
import intelligentsia from '../assets/geo-v2/enterprise/mark-1.png'
import counterCulture from '../assets/geo-v2/enterprise/mark-3.png'
import herkimer from '../assets/geo-v2/enterprise/mark-4.png'

/**
 * BrewLune's workspace in Gist GEO — a static replica of the Insights ›
 * Visibility screen, for the Enterprise page.
 *
 * The layout is the overview mock's (sidebar, filters, share-of-voice chart
 * with a pinned tooltip, competitor ranking); the chrome follows the real
 * product: brand switcher, Measure / Act navigation,
 * Insights tabs, outlined filter menus, and cards with a header strip and a
 * one-line read-out at the foot.
 *
 * Built at a fixed 1240 × 560 (the page column's full width) and scaled whole
 * by FitBox, so every measurement here is in that frame. Tokens throughout,
 * so it follows dark mode. All figures are illustrative.
 */

export const DASH_W = 1240
export const DASH_H = 560

const T = {
  raised: 'var(--background-surface-raised)',
  page: 'var(--background-surface-page)',
  sunken: 'var(--background-surface-sunken)',
  hover: 'var(--background-interactive-hover)',
  ink: 'var(--content-default)',
  muted: 'var(--content-secondary)',
  faint: 'var(--content-placeholder)',
  line: 'var(--border-default)',
  accent: 'var(--chart-categorical-1)',
  up: 'var(--content-status-success)',
  down: 'var(--content-status-error)',
  tooltip: 'var(--background-surface-inverse)',
  onTooltip: 'var(--content-inverse)',
} as const

const txt = (size: number, color: string = T.ink, weight = 400): CSSProperties => ({
  fontSize: size,
  lineHeight: 1.3,
  color,
  fontWeight: weight,
})

/* ── data ────────────────────────────────────────────────────────────── */

/** Five weekly readings, set in November by request — the last 30 days
 *  ending Nov 25. */
const WEEKS = ['Oct 28', 'Nov 4', 'Nov 11', 'Nov 18', 'Nov 25']
/**
 * The hover marker and its tooltip follow the visitor's cursor across the
 * weeks, snapping to the nearest one — no autoplay, by request. They rest on
 * Nov 18 until the cursor arrives, and stay where it left them.
 */
const FOCUS = 3 // Nov 18
/** Quick enough to keep up with a cursor, soft enough not to snap. */
const GLIDE = { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }

type Brand = {
  name: string
  logo: string
  color: string
  sov: number[] // share of voice by week
  delta: number // pts vs 30 days ago
  sentiment: number
  position: string
  you?: boolean
}

const BRANDS: Brand[] = [
  { name: 'Intelligentsia', logo: intelligentsia, color: 'var(--brand-primary)', sov: [33, 36, 32, 36, 34], delta: 1, sentiment: 76, position: '1.9' },
  { name: 'Blue Bottle', logo: blueBottle, color: 'var(--chart-categorical-5)', sov: [24, 21, 26, 24, 27], delta: 3, sentiment: 78, position: '2.1' },
  { name: 'Counter Culture', logo: counterCulture, color: 'var(--content-status-success)', sov: [12, 15, 11, 14, 12], delta: 0, sentiment: 71, position: '3.0' },
  { name: 'Herkimer', logo: herkimer, color: 'var(--chart-categorical-2)', sov: [12, 10, 13, 9, 11], delta: -1, sentiment: 69, position: '3.4' },
  { name: 'BrewLune', logo: brewlune, color: 'var(--chart-categorical-1)', sov: [7, 6, 8, 11, 10], delta: 3, sentiment: 74, position: '3.6', you: true },
]
const YOU = BRANDS.find((b) => b.you)!
const LEGEND = [YOU, ...BRANDS.filter((b) => !b.you)]

/* ── chart geometry (inside the chart card's svg) ─────────────────────── */

const SVG_W = 556
const SVG_H = 226
const PLOT = { left: 34, right: 546, top: 8, bottom: 198 }
const MAX = 40
const x = (k: number) => PLOT.left + (k * (PLOT.right - PLOT.left)) / (WEEKS.length - 1)
const y = (v: number) => PLOT.bottom - (v / MAX) * (PLOT.bottom - PLOT.top)
const path = (b: Brand) => b.sov.map((v, k) => `${k ? 'L' : 'M'}${x(k)},${y(v)}`).join(' ')

/* ── pieces ──────────────────────────────────────────────────────────── */

function Logo({ src, size = 16, ring }: { src: string; size?: number; ring?: string }) {
  return (
    <img
      src={src}
      alt=""
      className="shrink-0 object-cover"
      style={{ width: size, height: size, borderRadius: '50%', boxShadow: ring ? `0 0 0 1.5px ${ring}` : `0 0 0 1px ${T.line}` }}
    />
  )
}

function Nav({ icon, label, active = false }: { icon: ReactNode; label: string; active?: boolean }) {
  const c = active ? T.accent : T.ink
  return (
    <div
      className="flex shrink-0 items-center"
      style={{ ...txt(12, c), gap: 9, height: 28, padding: '0 9px', borderRadius: 7, backgroundColor: active ? T.sunken : 'transparent' }}
    >
      <span className="flex" style={{ color: active ? T.accent : T.muted }}>{icon}</span>
      {label}
    </div>
  )
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex shrink-0 flex-col" style={{ gap: 2, paddingTop: 12, borderTop: `1px solid ${T.line}` }}>
      <span style={{ ...txt(9, T.faint, 500), letterSpacing: '0.04em', padding: '0 9px 5px' }}>{label}</span>
      {children}
    </div>
  )
}

function Menu({ children }: { children: ReactNode }) {
  return (
    <span
      className="flex shrink-0 items-center"
      style={{ ...txt(11.5), gap: 6, height: 27, padding: '0 9px', border: `1px solid ${T.line}`, borderRadius: 7, backgroundColor: T.raised }}
    >
      {children}
      <CaretDown size={10} color="var(--content-secondary)" />
    </span>
  )
}

function Card({
  title,
  tools,
  foot,
  children,
  style,
}: {
  title: string
  tools?: ReactNode
  foot: ReactNode
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <div
      className="flex min-w-0 flex-col overflow-hidden"
      style={{ border: `1px solid ${T.line}`, borderRadius: 10, backgroundColor: T.raised, ...style }}
    >
      <div
        className="flex shrink-0 items-center justify-between"
        style={{ height: 38, padding: '0 16px', borderBottom: `1px solid ${T.line}`, backgroundColor: T.page }}
      >
        <span className="flex items-center" style={{ ...txt(12.5, T.ink, 500), gap: 5 }}>
          {title}
          <Info size={11} color="var(--content-secondary)" />
        </span>
        {tools}
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
      <div className="shrink-0" style={{ ...txt(11.5, T.ink), padding: '11px 16px', borderTop: `1px solid ${T.line}` }}>
        {foot}
      </div>
    </div>
  )
}

/** A whole number that counts to its new value instead of jumping, so the
 *  figures run along with the chart's marker. */
function Count({ value }: { value: number }) {
  const still = useReducedMotion()
  const mv = useMotionValue(value)
  const shown = useTransform(mv, (v) => Math.round(v))
  useEffect(() => {
    const run = animate(mv, value, { duration: still ? 0 : GLIDE.duration, ease: GLIDE.ease })
    return run.stop
  }, [mv, value, still])
  return <motion.span>{shown}</motion.span>
}

/** Week k against the week before it; nothing to compare the first week to. */
const change = (b: Brand, k: number) => (k ? b.sov[k] - b.sov[k - 1] : 0)
/** Where a brand stands among the five in week k, 1 = most share. */
const rankIn = (b: Brand, k: number) => [...BRANDS].sort((p, q) => q.sov[k] - p.sov[k]).indexOf(b) + 1
const ORDINAL = ['', '1st', '2nd', '3rd', '4th', '5th']

/** The "You" tag beside BrewLune wherever it is named, as in the feature
 *  cards below the dashboard. */
function YouTag() {
  return (
    <span
      style={{ ...txt(9.5, '#fff', 500), padding: '1px 6px', borderRadius: 999, backgroundColor: T.accent, lineHeight: 1.4 }}
    >
      You
    </span>
  )
}

function Delta({ v }: { v: number }) {
  if (v === 0) return <span style={txt(10, T.faint)}>–</span>
  const up = v > 0
  return (
    <span className="flex items-center" style={{ ...txt(10, up ? T.up : T.down), gap: 1 }}>
      <ArrowUp size={9} weight="bold" style={{ transform: up ? 'none' : 'rotate(180deg)' }} />
      {Math.abs(v)}
    </span>
  )
}

function Boxed({ children }: { children: ReactNode }) {
  return (
    <span
      className="flex items-center justify-center tabular-nums"
      style={{ ...txt(11.5), minWidth: 30, height: 22, padding: '0 6px', border: `1px solid ${T.line}`, borderRadius: 5 }}
    >
      {children}
    </span>
  )
}

/* ── the screen ──────────────────────────────────────────────────────── */

export default function GistDashboard() {
  const ic = 14
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const still = useReducedMotion()
  const [focus, setFocus] = useState(FOCUS)
  const svgRef = useRef<SVGSVGElement>(null)

  /** The week nearest the cursor. Measured off the svg's rendered box, so it
   *  holds however FitBox has scaled the dashboard. */
  const track = (e: PointerEvent) => {
    const box = svgRef.current?.getBoundingClientRect()
    if (!box || !box.width) return
    const sx = ((e.clientX - box.left) / box.width) * SVG_W
    const k = Math.round(((sx - PLOT.left) / (PLOT.right - PLOT.left)) * (WEEKS.length - 1))
    setFocus(Math.max(0, Math.min(WEEKS.length - 1, k)))
  }
  const engines = ['chatgpt', 'perplexity', 'ai-overviews'].map((k) => GEO_ENGINES.find((e) => e.key === k)!)
  // the table follows the chart's week too, reordering as the lead changes
  const ranked = [...BRANDS].sort((a, b) => b.sov[focus] - a.sov[focus])
  const youDelta = change(YOU, focus)

  return (
    <div
      ref={ref}
      className="flex overflow-hidden"
      style={{
        width: DASH_W,
        height: DASH_H,
        borderRadius: 18,
        border: `1px solid ${T.line}`,
        backgroundColor: T.raised,
        boxShadow: '0 20px 48px rgba(2, 9, 18, 0.08)',
        fontFamily: 'var(--font-family-default)',
      }}
    >
      {/* ── sidebar ── */}
      <aside
        className="flex shrink-0 flex-col"
        style={{ width: 200, padding: '14px 10px', gap: 12, borderRight: `1px solid ${T.line}`, backgroundColor: T.page }}
      >
        <div className="flex shrink-0 items-center justify-between" style={{ padding: '0 4px' }}>
          <span className="flex items-center" style={{ ...txt(13, T.ink, 500), gap: 8 }}>
            <Logo src={brewlune} size={22} />
            BrewLune
          </span>
          <span className="flex items-center" style={{ gap: 10, color: T.muted }}>
            <CaretUpDown size={12} />
            <SidebarSimple size={14} />
          </span>
        </div>


        <Nav icon={<SquaresFour size={ic} />} label="Overview" />
        <Group label="MEASURE">
          <Nav icon={<ChartBar size={ic} />} label="Insights" active />
          <Nav icon={<ChatText size={ic} />} label="Prompt monitoring" />
          <Nav icon={<UsersThree size={ic} />} label="Competitors" />
          <Nav icon={<FileText size={ic} />} label="Reports" />
        </Group>
        <Group label="ACT">
          <Nav icon={<CrosshairSimple size={ic} />} label="Goals" />
          <Nav icon={<Lightning size={ic} />} label="Actions" />
        </Group>
      </aside>

      {/* ── main ── */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ padding: '14px 20px 18px' }}>
        <div className="flex shrink-0 items-center justify-between">
          <span className="flex items-center" style={{ ...txt(19, T.ink, 500), gap: 7 }}>
            Insights <Info size={12} color="var(--content-secondary)" />
          </span>
        </div>

        <div className="flex shrink-0" style={{ gap: 4, marginTop: 10, borderBottom: `1px solid ${T.line}` }}>
          {['Findings', 'Visibility', 'Citations', 'Sentiment', 'Topics'].map((t) => {
            const on = t === 'Visibility'
            return (
              <span
                key={t}
                style={{
                  ...txt(12, on ? T.ink : T.muted, on ? 500 : 400),
                  padding: '7px 10px',
                  marginBottom: -1,
                  borderBottom: `2px solid ${on ? T.ink : 'transparent'}`,
                }}
              >
                {t}
              </span>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center justify-between" style={{ marginTop: 12 }}>
          <span className="flex" style={{ gap: 6 }}>
            <Menu>Last 30 days</Menu>
            <Menu>Branded + unbranded</Menu>
            <Menu>
              <span className="flex" style={{ gap: 1 }}>
                {engines.map((e) => <EngineIcon key={e.key} icon={e.icon} iconFrame={e.iconFrame} size={13} />)}
              </span>
              All engines
            </Menu>
            <Menu>All topics</Menu>
            <Menu>All prompts</Menu>
            <Menu>All tags</Menu>
          </span>
          <span
            className="flex items-center justify-center"
            style={{ width: 27, height: 27, borderRadius: '50%', border: `1px solid ${T.line}`, color: T.ink }}
          >
            <DownloadSimple size={13} />
          </span>
        </div>

        <div className="flex min-h-0 flex-1" style={{ gap: 14, marginTop: 14 }}>
          {/* share of voice over time */}
          <Card
            title="Share of voice"
            style={{ width: 588 }}
            tools={
              <span className="flex" style={{ gap: 2, padding: 2, borderRadius: 6, backgroundColor: T.sunken, color: T.muted }}>
                <span className="flex items-center justify-center" style={{ width: 22, height: 19, borderRadius: 4, backgroundColor: T.raised, color: T.ink }}>
                  <ChartLine size={11} />
                </span>
                <span className="flex items-center justify-center" style={{ width: 22, height: 19 }}>
                  <ChartBar size={11} />
                </span>
              </span>
            }
            foot={<>Up 3 pts in 30 days, the biggest gain, tied with Blue Bottle. Herkimer is 1 pt ahead.</>}
          >
            <div
              className="absolute inset-0 flex flex-col"
              style={{ padding: '12px 16px 0', cursor: 'crosshair' }}
              onPointerMove={track}
              onPointerDown={track}
            >
              <span className="flex items-baseline" style={{ gap: 8 }}>
                {/* BrewLune in the week under the marker */}
                <span className="tabular-nums" style={txt(24, T.ink, 500)}>
                  <Count value={YOU.sov[focus]} />%
                </span>
                {focus > 0 && (
                  <span className="flex items-center tabular-nums" style={{ ...txt(12, youDelta < 0 ? T.down : youDelta > 0 ? T.up : T.faint), gap: 2 }}>
                    {youDelta !== 0 && <ArrowUp size={11} weight="bold" style={{ transform: youDelta < 0 ? 'rotate(180deg)' : 'none' }} />}
                    <Count value={Math.abs(youDelta)} /> {Math.abs(youDelta) === 1 ? 'pt' : 'pts'}
                  </span>
                )}
                <span style={txt(11, T.muted)}>
                  {focus > 0 ? `vs ${WEEKS[focus - 1]} · ` : `Week of ${WEEKS[0]} · `}
                  {ORDINAL[rankIn(YOU, focus)]} of {BRANDS.length}
                </span>
              </span>
              <span className="flex" style={{ gap: 14, marginTop: 8 }}>
                {LEGEND.map((b) => (
                  <span key={b.name} className="flex items-center" style={{ ...txt(11, T.ink, b.you ? 500 : 400), gap: 5 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: b.color }} />
                    {b.name}
                    {b.you && <YouTag />}
                  </span>
                ))}
              </span>

              <svg ref={svgRef} width={SVG_W} height={SVG_H} style={{ marginTop: 6, overflow: 'visible' }} aria-hidden>
                <defs>
                  <linearGradient id="gd-you" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={YOU.color} stopOpacity="0.18" />
                    <stop offset="1" stopColor={YOU.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 10, 20, 30, 40].map((v) => (
                  <g key={v}>
                    <line x1={PLOT.left} x2={PLOT.right} y1={y(v)} y2={y(v)} stroke={T.line} strokeWidth={1} />
                    <text x={PLOT.left - 8} y={y(v) + 3.5} textAnchor="end" style={{ fontSize: 10, fill: T.muted }}>
                      {v}%
                    </text>
                  </g>
                ))}
                <motion.line
                  y1={PLOT.top}
                  y2={PLOT.bottom}
                  stroke={T.line}
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  initial={false}
                  animate={{ x1: x(focus), x2: x(focus) }}
                  transition={GLIDE}
                />
                {/* the lines draw in once, the first time the dashboard is seen */}
                <motion.path
                  d={`${path(YOU)} L${x(4)},${PLOT.bottom} L${x(0)},${PLOT.bottom} Z`}
                  fill="url(#gd-you)"
                  initial={{ opacity: still ? 1 : 0 }}
                  animate={inView || still ? { opacity: 1 } : undefined}
                  transition={{ duration: 0.8, delay: 0.9 }}
                />
                {BRANDS.map((b, k) => (
                  <motion.path
                    key={b.name}
                    d={path(b)}
                    fill="none"
                    stroke={b.color}
                    strokeWidth={b.you ? 2.2 : 1.5}
                    strokeLinejoin="round"
                    initial={{ pathLength: still ? 1 : 0 }}
                    animate={inView || still ? { pathLength: 1 } : undefined}
                    transition={{ duration: 1.4, delay: 0.1 + k * 0.08, ease: 'easeInOut' }}
                  />
                ))}
                {!still && (
                  <motion.circle
                    fill={YOU.color}
                    initial={false}
                    animate={{ cx: x(focus), cy: y(YOU.sov[focus]), r: [3, 10], opacity: [0.35, 0] }}
                    transition={{ cx: GLIDE, cy: GLIDE, r: { duration: 1.8, repeat: Infinity, ease: 'easeOut' }, opacity: { duration: 1.8, repeat: Infinity, ease: 'easeOut' } }}
                  />
                )}
                {BRANDS.map((b) => (
                  <motion.circle
                    key={b.name}
                    r={3}
                    fill={T.raised}
                    stroke={b.color}
                    strokeWidth={1.5}
                    initial={false}
                    animate={{ cx: x(focus), cy: y(b.sov[focus]) }}
                    transition={GLIDE}
                  />
                ))}
                {WEEKS.map((w, k) => (
                  <text
                    key={w}
                    x={x(k)}
                    y={PLOT.bottom + 18}
                    textAnchor={k === 0 ? 'start' : k === WEEKS.length - 1 ? 'end' : 'middle'}
                    style={{ fontSize: 10.5, fill: k === focus ? T.ink : T.muted, transition: 'fill 0.4s' }}
                  >
                    {w}
                  </text>
                ))}
              </svg>
            </div>

            {/* tooltip, riding beside the marker: to its left on the later
                weeks, flipping to its right on the first two where the left
                would run off the card. Clicks pass through to the chart. */}
            <motion.div
              className="absolute flex flex-col"
              initial={false}
              animate={{ left: focus >= 2 ? 16 + x(focus) - 196 : 16 + x(focus) + 14 }}
              transition={GLIDE}
              style={{
                pointerEvents: 'none',
                top: 76,
                width: 182,
                padding: '10px 12px',
                gap: 7,
                borderRadius: 9,
                backgroundColor: T.tooltip,
                boxShadow: '0 12px 28px rgba(2, 9, 18, 0.22)',
              }}
            >
              <span style={txt(11.5, T.onTooltip, 500)}>{WEEKS[focus]} · Share of voice</span>
              {[...BRANDS].sort((a, b) => b.sov[focus] - a.sov[focus]).map((b) => (
                <span key={b.name} className="flex items-center" style={{ ...txt(11, T.onTooltip, b.you ? 500 : 400), gap: 7 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 2, backgroundColor: b.color }} />
                  <span className="flex flex-1 items-center" style={{ opacity: b.you ? 1 : 0.8, gap: 6 }}>
                    {b.name}
                    {b.you && <YouTag />}
                  </span>
                  <span className="tabular-nums">{b.sov[focus]}%</span>
                </span>
              ))}
            </motion.div>
          </Card>

          {/* the ranking */}
          <Card
            title="BrewLune vs. competitors"
            style={{ flex: 1 }}
            tools={
              <span className="flex items-center" style={{ ...txt(10.5, T.muted), gap: 4 }}>
                See all <ArrowRight size={10} />
              </span>
            }
            foot={<>Intelligentsia leads with 34%. Herkimer is the next to pass, 1 pt ahead.</>}
          >
            {(() => {
              const cols = '16px 1fr 70px 70px 48px'
              return (
                <div className="flex flex-col" style={{ padding: '4px 16px 0' }}>
                  <div className="grid items-center" style={{ gridTemplateColumns: cols, gap: 6, ...txt(10.5, T.muted), height: 32, borderBottom: `1px solid ${T.line}` }}>
                    <span>#</span><span>Brand</span><span>Share</span><span>Sentiment</span><span>Position</span>
                  </div>
                  {ranked.map((b, k) => (
                    <motion.div
                      key={b.name}
                      layout={!still}
                      transition={GLIDE}
                      className="grid items-center"
                      style={{
                        gridTemplateColumns: cols,
                        gap: 6,
                        height: 44,
                        margin: b.you ? '0 -16px' : 0,
                        padding: b.you ? '0 16px' : 0,
                        borderBottom: k < ranked.length - 1 ? `1px solid ${T.line}` : 'none',
                        backgroundColor: b.you ? T.hover : 'transparent',
                      }}
                    >
                      <span style={txt(11.5, T.muted)}>{k + 1}</span>
                      <span className="flex min-w-0 items-center" style={{ ...txt(12, T.ink, b.you ? 500 : 400), gap: 8 }}>
                        <Logo src={b.logo} size={18} ring={b.you ? T.accent : undefined} />
                        <span className="truncate">{b.name}</span>
                        {b.you && <YouTag />}
                      </span>
                      <span className="flex items-center tabular-nums" style={{ ...txt(12), gap: 5 }}>
                        <span><Count value={b.sov[focus]} />%</span> <Delta v={change(b, focus)} />
                      </span>
                      <span className="flex"><Boxed>{b.sentiment}</Boxed></span>
                      <span className="tabular-nums" style={txt(11.5)}>#{b.position}</span>
                    </motion.div>
                  ))}
                </div>
              )
            })()}
          </Card>
        </div>
      </div>
    </div>
  )
}
