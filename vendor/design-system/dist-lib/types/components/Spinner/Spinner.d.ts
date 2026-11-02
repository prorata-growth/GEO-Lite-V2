export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'classic' | 'fade' | 'dash';
export interface SpinnerProps {
    /** `classic` (default): twelve spokes that fade around a ring. `fade`: a ring that fades out behind its head. `dash`: a faint track with a travelling arc. */
    variant?: SpinnerVariant;
    /** 12 / 16 / 20 / 24px — the icon sizes, so it sits where an icon would. Defaults to `md`. */
    size?: SpinnerSize;
    /**
     * Accessible name for a spinner that stands on its own ("Loading results").
     * Omit it when the spinner sits inside something that already says it is
     * busy (a loading `Button`), so a screen reader doesn't announce it twice.
     */
    label?: string;
    className?: string;
}
/**
 * An indeterminate loading indicator. Three looks, all drawn on the icon grid
 * and sized with the icon tokens: `classic` (the default — twelve spokes fading
 * around a ring), `fade`, and `dash`. It takes the colour of the text around it
 * (`currentColor`), so it matches a button label or a muted caption without a
 * prop.
 *
 * Under `prefers-reduced-motion` it stops turning and breathes (a slow fade)
 * instead — a frozen indicator would read as broken, and a loading indicator is
 * one of the few things that has to keep moving.
 */
export declare function Spinner({ variant, size, label, className }: SpinnerProps): import("react").JSX.Element;
