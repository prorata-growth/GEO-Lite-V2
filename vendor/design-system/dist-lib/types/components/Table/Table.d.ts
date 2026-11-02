import type { HTMLAttributes } from 'react';
/** @deprecated Use `DataTable` (2026-10-12): one table component for every product table; `variant="quiet"` covers the quiet tables. Removed in a later minor once GEO V2 has migrated. */
export interface TableProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * `default`: bordered, with column lines and a row hover. `quiet` (the
     * owner's visual language, 10-12): no frame or column lines, subtle row
     * rules, 8px row padding and 24px between columns, a 12px placeholder
     * header, no hover; for read-only values inside a card or widget.
     */
    variant?: 'default' | 'quiet';
}
/** The outer frame for a table built from `Row` and `Cell` — border + clipped corners.
 *
 * @deprecated Use `DataTable` (2026-10-12): one table component for every product table; `variant="quiet"` covers the quiet tables. Removed in a later minor once GEO V2 has migrated. */
export declare function Table({ variant, className, children, ...rest }: TableProps): import("react").JSX.Element;
