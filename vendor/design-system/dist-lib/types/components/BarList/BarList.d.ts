import type { ReactNode } from 'react';
export interface BarListRow {
    key: string;
    /** Who the row is (read out; shown as `leading` if there is one). */
    label: string;
    value: number;
    /** A 16px logo or `Avatar` before the bar. */
    leading?: ReactNode;
    /** What the row means, shown in a tooltip on hover or focus. */
    tip?: ReactNode;
    /** Table mode: a second, solid part of the bar up to this value; the rest to `value` is the same tone at 28% (found → cited). */
    inner?: number;
    /** Table mode: the value as shown, when it isn't `formatValue(value)` (a rate beside a count). */
    display?: ReactNode;
    /** Table mode: a quiet count before the value ("12 of 30"), 12px tertiary. */
    count?: ReactNode;
    /** Table mode: a change in points, shown with `Delta` (0 shows nothing). */
    delta?: number;
    /** Table mode: the row's rank, "#2", before the name. */
    rank?: number;
    /** Table mode: the name opens something (a button that underlines on hover). */
    onOpen?: () => void;
    /** Table mode: after the name, 8 apart, outside the open button and never cut off (a "You" tag). */
    trailing?: ReactNode;
}
export interface BarListProps {
    rows: BarListRow[];
    /** The full-bar value. Default 100. */
    max?: number;
    /** The row (or rows) to call out ("you"): blue (`--chart-categorical-1`) and default text; the rest are muted grey. Omit and every bar is blue. */
    highlight?: string | string[];
    /** Formats the value. Default: a percentage. */
    formatValue?: (value: number) => string;
    'aria-label': string;
    className?: string;
    /**
     * Table mode (10-22, Gist GEO's Insights): every row's `label` shown after
     * its `leading`, the bars starting after the longest name, and the value
     * column with any `count`, `delta`. Also turned on by `head`.
     */
    showLabels?: boolean;
    /** Table mode: column labels (name, bar, value) over a subtle rule; rows are 44 tall with subtle rules between. */
    head?: [ReactNode, ReactNode, ReactNode];
    /** The bar's thickness. Default 4 (compact), 6 in table mode. */
    barSize?: 4 | 6 | 8;
    /**
     * The rows that aren't highlighted. `highlight` (default): the chart's grey.
     * `tint`: a 24% tint of the blue (competitors beside you). `neutral`: every
     * row grey, the highlighted one too (a measure that isn't about you).
     */
    tone?: 'highlight' | 'tint' | 'neutral';
}
/**
 * A compact breakdown: a logo, a bar and a value per row, one row
 * highlighted (the leaders and you; mention rate by engine). For explaining a
 * number in a card, not for progress (that's ProgressBar). Figma: `Bar List Row`.
 */
export declare function BarList({ rows, max, highlight, formatValue, className, showLabels, head, barSize, tone, ...rest }: BarListProps): import("react").JSX.Element;
