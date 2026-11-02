import type { EngineIconFrame } from './geoEngines'

/**
 * Renders an AI engine's mark in a circle, in one of the three framings the
 * designs use. Shared by the answer card and the brand-lookup card.
 */
export default function EngineIcon({
  icon,
  iconFrame,
  size,
  /** For 'insetWhite': mark size as a fraction of the circle. The answer card
   *  uses 24/40, the brand card 28/38 — hence a prop rather than a constant. */
  insetRatio = 0.6,
  className = '',
}: {
  icon: string
  iconFrame: EngineIconFrame
  size: number
  insetRatio?: number
  className?: string
}) {
  if (iconFrame === 'insetWhite') {
    return (
      <div
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[rgba(2,9,18,0.1)] bg-white ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={icon}
          alt=""
          style={{ width: size * insetRatio, height: size * insetRatio }}
          className="object-contain"
        />
      </div>
    )
  }
  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full ${
        iconFrame === 'bleedBorder' ? 'border border-[rgba(2,9,18,0.1)]' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <img src={icon} alt="" className="h-full w-full object-cover" />
    </div>
  )
}
