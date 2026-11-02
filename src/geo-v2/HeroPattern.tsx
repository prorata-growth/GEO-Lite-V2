import heroArcs from '../assets/geo-v2/login-arcs.webp'

/**
 * The concentric-arc artwork on the mint halves of the login flow.
 *
 * One supplied raster (1440 × 1935, the arcs already composed on their mint
 * ground) laid over the whole panel with `object-fit: cover`. Cover scales the
 * image by a single factor and crops what overflows, so the rings stay true
 * circles at any panel size. The earlier SVG was drawn into a fixed box with
 * `preserveAspectRatio="none"`, which let it stretch into ovals.
 *
 * The image's ground is the brand mint, so wherever it is cropped, or the
 * panel runs wider than it (the gutter past 1440), the edges meet the panel's
 * own mint with no seam.
 */
export default function HeroPattern({
  /**
   * Passing `size` marks a phone band. A band is short and wide, so it crops
   * lower and further right, where the void and the dense rings are; its own
   * value no longer matters. `offsetY` nudges that crop further down.
   */
  size,
  offsetY = 0,
}: { size?: number; offsetY?: number } = {}) {
  const band = size != null
  return (
    <img
      src={heroArcs}
      alt=""
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
      style={{ objectPosition: band ? `70% ${55 + offsetY / 10}%` : 'center' }}
    />
  )
}
