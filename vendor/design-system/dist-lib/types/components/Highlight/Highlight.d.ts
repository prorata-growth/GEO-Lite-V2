import type { HTMLAttributes } from 'react';
export type HighlightTone = 'default' | 'positive' | 'neutral' | 'negative';
export interface HighlightProps extends HTMLAttributes<HTMLElement> {
    /**
     * `default`: the series blue (`--background-highlight`), for your brand in a
     * quote. `positive` / `neutral` / `negative`: the sentiment tone colours at
     * the same 20%, for a sentiment's mention (owner 10-22: "utilize this concept
     * in sentiment"); neutral is grey, not the brand blue.
     */
    tone?: HighlightTone;
}
/**
 * A phrase marked inside quoted text, such as your brand in an AI answer (owner
 * 10-22): a `<mark>` at medium weight on a 20% tint, wrapping across lines.
 * Figma: the `background/highlight` variable.
 */
export declare function Highlight({ tone, className, ...rest }: HighlightProps): import("react").JSX.Element;
