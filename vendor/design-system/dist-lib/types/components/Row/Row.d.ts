import type { HTMLAttributes } from 'react';
/** @deprecated Use `DataTable` (2026-10-12): one table component for every product table; `variant="quiet"` covers the quiet tables. Removed in a later minor once GEO V2 has migrated. */
export interface RowProps extends HTMLAttributes<HTMLDivElement> {
}
/**
 * A table row — wraps `Cell` children and gives them a shared bottom divider
 * and a real row-level hover state. Figma's own file has no row-level hover
 * variant (only each `Cell` has its own bakedin hover fill), which means
 * hovering one cell there doesn't highlight its neighbors — `Row` fixes that
 * with a CSS descendant rule so hovering anywhere in the row highlights the
 * whole row, matching what users actually expect from a data table.
 *
 * @deprecated Use `DataTable` (2026-10-12): one table component for every product table; `variant="quiet"` covers the quiet tables. Removed in a later minor once GEO V2 has migrated.
 */
export declare function Row({ className, children, ...rest }: RowProps): import("react").JSX.Element;
