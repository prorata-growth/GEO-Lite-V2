import type { ReactNode } from 'react';
/** The house easing (Sidebar, popovers, the demo's screens). */
export declare const EASE: readonly [0.16, 1, 0.3, 1];
export declare const INSTANT: {
    duration: number;
};
/** The turn of a disclosure chevron, on the same clock as the unfurl. */
export declare function chevronTransition(reduceMotion: boolean | null): {
    duration: number;
} | {
    duration: number;
    ease: readonly [0.16, 1, 0.3, 1];
};
/**
 * The unfurl shared by every disclosure (`AccordionItem`, `ChecklistItem`):
 * the region's height tweens open, its content fading in just behind it, and
 * it closes faster than it opens. Mounted only while open, so a closed body
 * isn't in the DOM; a body that is open on first render appears already
 * settled rather than animating in.
 *
 * It is clipped only while it moves, so a focused button's ring inside the
 * body isn't cut off once it has settled: `overflow: hidden` on the way in and
 * out, released when the animation completes. Instant under
 * `prefers-reduced-motion`.
 */
export declare function Collapse({ open, children }: {
    open: boolean;
    children: ReactNode;
}): import("react").JSX.Element;
