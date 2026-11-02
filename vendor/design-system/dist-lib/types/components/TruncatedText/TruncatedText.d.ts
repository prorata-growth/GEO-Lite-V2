export interface TruncatedTextProps {
    text: string;
    /** A width it stops at (px or any CSS length). Without it, it fills its container. */
    maxWidth?: number | string;
    /** The tooltip's width cap. Default 360. */
    tooltipMaxWidth?: number;
    className?: string;
}
/**
 * One line, cut off with "…", and the full text in the Tooltip only when it's
 * actually cut off (owner 10-08, Gist GEO: long prompts shouldn't wrap onto
 * two lines). Measured when the tooltip would open, not on mount, since a web
 * font can load later and change the width. Figma: `Truncated Text`.
 */
export declare function TruncatedText({ text, maxWidth, tooltipMaxWidth, className }: TruncatedTextProps): import("react").JSX.Element;
