import { useEffect, useState } from 'react'

/** Phones only. Above this, every screen renders exactly the tree it always has. */
export const MOBILE_MAX = 767

/**
 * True on phone-width viewports.
 *
 * Deliberately a JS media query rather than CSS classes: the mobile treatment
 * needs to *wrap* the animated cards in a scaler, which a class can't express.
 * Above MOBILE_MAX this returns false and every screen renders its original
 * markup untouched.
 */
export default function useIsMobile() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`)
    const sync = () => setMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return mobile
}
