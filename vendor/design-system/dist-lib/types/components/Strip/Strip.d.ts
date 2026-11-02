import type { ReactNode } from 'react';
export interface StripProps {
    /** What it's about ("Finish setting up", "Exploring free", "Sample data"), at the Accent weight. */
    label: ReactNode;
    /** Before the label: a 16px icon (a lock on a locked page). */
    leading?: ReactNode;
    /** A short bar of how far along, and "n of m" after it. */
    progress?: {
        value: number;
        max: number;
        'aria-label': string;
    };
    /** One line after the label (12, tertiary). */
    children?: ReactNode;
    /** On the right, before the action: a note ("Pro from $249 a month"); its subject in `<b>` ("Next: <b>Confirm details</b>"). */
    meta?: ReactNode;
    /** One action: an xsmall `Button`. */
    action?: ReactNode;
    /** After a rule, at the end: a link ("See all"). */
    trailing?: ReactNode;
    className?: string;
}
/**
 * One raised line across the page with one thing to do (Gist GEO: Finish
 * setting up on Overview, Exploring free, a locked page's Sample data note):
 * the label, then progress or a line; on the right a note, the action and a
 * trailing link. It wraps on a narrow page. Figma: `Strip`.
 */
export declare function Strip({ label, leading, progress, children, meta, action, trailing, className }: StripProps): import("react").JSX.Element;
