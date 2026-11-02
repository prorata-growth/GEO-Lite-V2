import type { ReactNode } from 'react';
export interface SummaryBandProps {
    /** The line: what the page holds, its facts in `<b>` ("You’re tracking <b>15 prompts</b> …"). */
    children: ReactNode;
    /** One small action on the right (an xsmall `Button`). */
    action?: ReactNode;
    className?: string;
}
/**
 * What a page holds, in one line, with one action beside it (Gist GEO's Prompt
 * monitoring and Competitors, owner 10-19/21): a page-grey band with a subtle
 * border, the line in the dense size and secondary colour, its facts (`<b>`)
 * in the accent weight and the default colour. Figma: `Summary Band`.
 */
export declare function SummaryBand({ children, action, className }: SummaryBandProps): import("react").JSX.Element;
