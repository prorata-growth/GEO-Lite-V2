export interface CitationChipProps {
    /** The site, as its domain ("brewlune.com"). */
    name: string;
    /** Its logo (a favicon); without one, the Avatar's initials. */
    logo?: string;
    /** Opens the cited page: the chip becomes a link (in a new tab). */
    href?: string;
    className?: string;
}
/**
 * A site an AI answer cites (owner 10-22): its 16px logo and domain, 12px in
 * the secondary grey, a subtle border, the pill radius. With `href` it's a link
 * to the page. Figma: `Citation Chip`.
 */
export declare function CitationChip({ name, logo, href, className }: CitationChipProps): import("react").JSX.Element;
