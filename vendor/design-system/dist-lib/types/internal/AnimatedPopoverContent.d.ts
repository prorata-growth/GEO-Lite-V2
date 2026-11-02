import * as Popover from '@radix-ui/react-popover';
import type { ComponentProps, ReactNode } from 'react';
interface AnimatedPopoverContentProps extends ComponentProps<typeof Popover.Content> {
    open: boolean;
    children: ReactNode;
}
/**
 * Shared open/close transition for every Popover-based dropdown (Combobox,
 * FilterDropdown) — centralized so all of them animate identically rather
 * than drifting apart, and so `prefers-reduced-motion` is only handled once.
 * Radix's own Presence unmounts Popover.Content the instant `open` goes
 * false, which leaves no time for an exit animation — `forceMount` on both
 * Portal and Content hands that mount/unmount timing to AnimatePresence
 * instead, which delays the actual removal until the exit transition finishes.
 *
 * Deliberately NOT using `Popover.Content asChild` with `motion.div` as its
 * child — Radix's Slot (what `asChild` uses) intercepts and re-forwards refs
 * in a way that breaks Framer Motion's own ref to the real DOM node. Confirmed
 * empirically: with `asChild`, the element gets stuck permanently painted at
 * its `initial` style (opacity/transform never progress, zero Web Animations
 * ever attached — verified via `element.getAnimations()`). Rendering
 * `motion.div` as a plain child of `Popover.Content` instead (one extra DOM
 * level, no asChild) sidesteps the conflict entirely.
 */
export declare function AnimatedPopoverContent({ open, children, align, ...contentProps }: AnimatedPopoverContentProps): import("react").JSX.Element;
export {};
