import type { ReactNode } from 'react';
export interface CoachmarkProps {
    /** Shown or not. Default true. */
    open?: boolean;
    /**
     * Where the thing it explains is, read every frame while open, so the
     * spotlight follows a page that moves. Return null, or leave it out, for a
     * centred card with no spotlight (a tour's intro).
     */
    getTarget?: () => DOMRect | null;
    /** Room around the target inside the spotlight. Default 6. */
    padding?: number;
    /** `right`: beside the target, centred on it (a nav item). `bottom`: under it (a section). Default `right`. */
    placement?: 'right' | 'bottom';
    /** The card's width. Default 340 beside a target, 420 centred; never past the window less 16 a side. */
    width?: number;
    /** The dialog's accessible name ("Product tour, 2 of 4: Measure"). */
    label: string;
    /** Escape (end or skip the tour). */
    onEscape?: () => void;
    /** The card's content: the step's count, title, line, `StepDots` and buttons. */
    children: ReactNode;
    className?: string;
}
/**
 * A guided step (Gist GEO's product tour, owner 10-20): the page dimmed, the
 * thing it explains spotlit with a pulsing accent ring, and a floating card
 * beside it; both glide to the next target. The steps, keys and copy are
 * yours. Still under reduced motion. Figma: `Coachmark`, `Coachmark Spotlight`.
 */
export declare function Coachmark({ open, getTarget, padding, placement, width, label, onEscape, children, className }: CoachmarkProps): import("react").ReactPortal | null;
