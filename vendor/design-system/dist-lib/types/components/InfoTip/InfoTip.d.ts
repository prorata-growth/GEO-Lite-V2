import type { ReactNode } from 'react';
import type { TooltipSide } from '../Tooltip';
export interface InfoTipProps {
    /** What it explains ("Share of voice"): the button's name is "What is {label}?". */
    label: string;
    /** The explanation, shown on hover or focus. */
    text: ReactNode;
    /** An optional worked example under it, quieter. */
    example?: ReactNode;
    side?: TooltipSide;
    className?: string;
}
/**
 * An ⓘ that explains a term on hover or focus (Gist GEO's metric names and
 * page titles, owner 10-14): a 14px Info glyph in the tertiary grey with the
 * normal pointer (not the help cursor: "i had a prob with the question mark on
 * hover"), and the DS Tooltip. Inside a clickable row it doesn't open the row.
 * Figma: `Info Tip`.
 */
export declare function InfoTip({ label, text, example, side, className }: InfoTipProps): import("react").JSX.Element;
