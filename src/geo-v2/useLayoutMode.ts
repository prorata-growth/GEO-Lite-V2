import { useEffect, useState } from 'react'
import { MOBILE_MAX } from '../useIsMobile'

/**
 * Which of the report's three shapes the viewport can hold.
 *
 * The report used to have two, switching at the phone breakpoint, and the
 * result was that its worst layout in the entire range sat at 768 — an iPad
 * held upright, or a laptop window at half screen. The rail claimed a fixed
 * 380 plus its gap whatever the viewport, the report column took what was
 * left, and what was left was 220px: narrower than the same report gets on a
 * 375px phone, with 39 labels truncating.
 *
 * So the middle state is the one that was missing, not a refinement of the
 * two that existed:
 *
 *   phone     under 768   one column, rail stacked under the report, and the
 *                         card grids and tables in their own phone forms
 *   compact   768–1239    rail stacked under the report, which takes the full
 *                         width; everything inside stays in its desktop form,
 *                         because at 720+ of column there is room for it
 *   wide      1240 and up report and rail side by side, the layout the report
 *                         was designed at
 *
 * WIDE_MIN is measured rather than picked. Truncation against column width
 * runs 476px→15 labels, 552→5, 604→3, 652→1, 732→0, so the column needs about
 * 700 to be comfortable; 700 + the rail's 380 + its 24 gap + margins lands
 * just over 1200, and 1240 clears it without sitting on the boundary.
 */
export type LayoutMode = 'phone' | 'compact' | 'wide'

export const WIDE_MIN = 1240

export default function useLayoutMode(): LayoutMode {
  // `wide` before the effect runs, matching `useIsMobile`'s own optimism: the
  // report renders the layout it was designed at and narrows on the first
  // measurement, rather than flashing a stacked layout on every desktop load.
  const [mode, setMode] = useState<LayoutMode>('wide')

  useEffect(() => {
    const phone = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`)
    const wide = window.matchMedia(`(min-width: ${WIDE_MIN}px)`)
    const sync = () => setMode(phone.matches ? 'phone' : wide.matches ? 'wide' : 'compact')
    sync()
    // Media queries only, matching `useIsMobile`. A `window.resize` listener
    // was tried as a belt and removed: it buys nothing a real browser needs,
    // and it did not fix the case it was added for — this project's viewport
    // emulation dispatches neither `resize` nor a media query `change`, so
    // breakpoints can only be checked by reloading at each width, never by
    // resizing an open page.
    phone.addEventListener('change', sync)
    wide.addEventListener('change', sync)
    return () => {
      phone.removeEventListener('change', sync)
      wide.removeEventListener('change', sync)
    }
  }, [])

  return mode
}
