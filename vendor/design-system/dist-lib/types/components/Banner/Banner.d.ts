import type { ReactNode } from 'react';
export interface BannerProps {
    /** What you're in, first: usually a `Tag` ("Pitch workspace"). */
    leading?: ReactNode;
    /** One line about it, 14 secondary. */
    children: ReactNode;
    /** One action on the right, usually a small secondary `Button`. */
    action?: ReactNode;
    /**
     * `accent` (10-23, Gist GEO's Deep analysis): a mode you're in, in the
     * accent tint over the page grey, the line in the accent content colour
     * at the Accent weight, 12 after `leading` (a 16px icon). Default `default`.
     */
    tone?: 'default' | 'accent';
    /**
     * Inside the page rather than across it (10-23): bordered all round with
     * the container radius, padding 8 / 16 at any width.
     */
    inset?: boolean;
    className?: string;
}
/**
 * A full-width bar across the top of a page or workspace: what you're in, and
 * one way out of it (Gist GEO's pitch workspace, owner 10-12, after
 * Searchable's "Viewing pitch"). Sunken with a rule below; it wraps on a
 * phone. `tone="accent"` + `inset`: the mode you're in, inside the page
 * (Deep analysis). Not a status message: that's `Alert`. Figma: `Banner`.
 */
export declare function Banner({ leading, children, action, tone, inset, className }: BannerProps): import("react").JSX.Element;
