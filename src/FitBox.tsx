import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Scales a fixed-size block to fit its container on *both* axes, as one unit.
 *
 * Same reasoning as FitWidth — the cards' motion is tuned to fixed pixel
 * geometry, so they're scaled whole rather than reflowed — but this one also
 * respects the available height, which is what keeps a card inside a viewport
 * that's shorter than the design assumed.
 *
 * `maxScale` caps it below 1 where a design wants the block rendered smaller
 * than its natural size — the landing card sits at 0.9, as it did before.
 */
export default function FitBox({
  width,
  height,
  maxScale = 1,
  children,
}: {
  width: number
  height: number
  maxScale?: number
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  /**
   * Measured after every render, and in a layout effect rather than a passive
   * one.
   *
   * The observer alone was not enough. Screens that branch on a media-query
   * hook render their desktop shape first — the hook cannot know the viewport
   * until its own effect runs — so the first measurement here was taken
   * against a container that was about to change size, and the correction
   * depended entirely on ResizeObserver firing afterwards. Where it does not,
   * the block stays frozen at the wrong scale: on a phone the artwork came out
   * at a fifth of its size, 98px wide inside a 342px box.
   *
   * Re-measuring on every render closes that gap, because the flip to the
   * mobile layout *is* a render. `useLayoutEffect` so it happens before paint
   * and the wrong scale is never shown. The observer stays for size changes
   * that are not re-renders, such as the window being dragged.
   *
   * Cheap despite the lack of a dependency array: two layout reads, and React
   * bails out of the update when the scale is unchanged.
   */
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setScale(Math.min(maxScale, el.clientWidth / width, el.clientHeight / height))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  })

  return (
    <div ref={ref} data-fit="box" className="relative size-full overflow-hidden">
      {/* Absolutely positioned on purpose: a transform doesn't change layout
          size, so an in-flow child would still claim its *unscaled* height and
          stop the container ever shrinking below it — which pushed the page
          taller than the viewport and clipped what sat underneath. */}
      <div
        data-fit="inner"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width,
          height,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  )
}
