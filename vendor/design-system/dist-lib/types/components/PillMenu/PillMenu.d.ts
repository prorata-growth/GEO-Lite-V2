import { type ReactNode } from 'react';
export interface PillMenuProps {
    /** Names the trigger for screen readers, with the value ("Frequency for “…”: Weekly"). */
    'aria-label': string;
    /** What the pill shows ("Weekly", "Admin", "Paused"). */
    value: ReactNode;
    /** Quieter text: a paused prompt. */
    muted?: boolean;
    /**
     * The menu: `MenuItem size="small"`, the current one with a trailing
     * `<Check weight="bold" />` (FilterDropdown's convention), then e.g. a
     * `Divider` and Pause / Resume.
     */
    children: ReactNode;
    /** Default true. */
    closeOnSelect?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
/**
 * A value edited in place in a table cell (a prompt's frequency, a teammate's
 * role): a compact bordered trigger that reads as editable at rest, with a
 * caret that slides in on hover. Inside a `DataTableRow` it sits above the
 * row's click, so opening it never opens the row.
 */
export declare function PillMenu({ 'aria-label': ariaLabel, value, muted, children, closeOnSelect, open, onOpenChange }: PillMenuProps): import("react").JSX.Element;
