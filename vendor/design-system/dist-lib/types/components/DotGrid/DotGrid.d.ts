export interface DotGridProps {
    /** How many things there are: one dot each. */
    total: number;
    /** How many of them count (filled, first). */
    filled: number;
    /** Dots per row. Default 25. */
    columns?: number;
    /** Dot size. Default 10. */
    size?: 8 | 10;
    /** What the grid says, read as one image ("8 of the 50 pages AI cites mention you"). */
    'aria-label': string;
    className?: string;
}
/**
 * A unit chart (Gist GEO's earned media, owner 10-14): one dot per thing,
 * filled in the series blue where it counts, the rest in the border grey.
 * For a count out of a small whole, where each one is something real (a page,
 * an answer). Figma: `Dot Grid`.
 */
export declare function DotGrid({ total, filled, columns, size, className, ...rest }: DotGridProps): import("react").JSX.Element;
