import type { HTMLAttributes, ReactNode } from 'react';
import type { CheckboxSize } from '../CheckboxIndicator';
export type CellType = 'checkbox' | 'text' | 'number' | 'tag' | 'dot-text' | 'icon' | 'title' | 'button' | 'number-percentage';
export type CellSortDirection = 'asc' | 'desc';
/** @deprecated Use `DataTable` (2026-10-12): one table component for every product table; `variant="quiet"` covers the quiet tables. Removed in a later minor once GEO V2 has migrated. */
export interface CellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Matches Figma's `Type` variant. Figma's separate "Title (Inactive)"/"Title Active"
     * variants collapse into one `type="title"` here, toggled by `active` — they're the
     * same content shape, just a state difference. */
    type: CellType;
    /** Column width — Figma's cells were all a fixed 160px (canvas sizing for the demo
     * table, not a real constraint); left flexible here so real tables can size columns
     * as needed. Defaults to filling available space. */
    width?: number | string;
    /** Right-aligns content. Defaults to `true` for number/number-percentage, `false` otherwise. */
    align?: 'left' | 'right';
    /** `type="text"` / `type="number"` / `type="dot-text"` / `type="title"` primary text,
     * and the visible label next to `type="checkbox"`'s indicator. */
    label?: ReactNode;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    /** The checkbox's size: `medium` 20px (default) or `small` 16px, which suits dense tables. */
    checkboxSize?: CheckboxSize;
    tag?: ReactNode;
    dotColor?: string;
    actions?: ReactNode;
    /** Whether this column is the active sort column. */
    active?: boolean;
    sortDirection?: CellSortDirection;
    button?: ReactNode;
    percentage?: ReactNode;
}
/** @deprecated Use `DataTable` (2026-10-12): one table component for every product table; `variant="quiet"` covers the quiet tables. Removed in a later minor once GEO V2 has migrated. */
export declare function Cell({ type, width, align, label, checked, onChange, checkboxSize, tag, dotColor, actions, active, sortDirection, button, percentage, className, style, role, ...rest }: CellProps): import("react").JSX.Element;
