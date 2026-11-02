import type { CSSProperties } from 'react'
import treadWordmark from '../assets/geo-report/tread-wordmark.png'

/**
 * Tread's wordmark, drawn as a mask rather than an `<img>`.
 *
 * The PNG is near-black ink on transparent, so on a dark ground it vanished.
 * There is a white twin of it (`tread-mark-white.png`, the same mask at a
 * different ink) but shipping both means two files to keep in step for what
 * is one shape — masking paints that shape in `--content-default` instead, so
 * the mark always matches the heading it sits beside, in either theme.
 */
export default function TreadMark({
  width = 50.6,
  height = 33.4,
  className,
  style,
}: {
  width?: number
  height?: number
  className?: string
  style?: CSSProperties
}) {
  // Quoted for the same reason as Glyph's MaskIcon — this asset is large
  // enough to get a file URL today, but that depends on Vite's inline limit.
  const mask = `url("${treadWordmark}") center / contain no-repeat`
  return (
    <span
      role="img"
      aria-label="Tread"
      className={className}
      style={{
        display: 'block',
        flex: 'none',
        width,
        height,
        backgroundColor: 'var(--content-default)',
        mask,
        WebkitMask: mask,
        ...style,
      }}
    />
  )
}
