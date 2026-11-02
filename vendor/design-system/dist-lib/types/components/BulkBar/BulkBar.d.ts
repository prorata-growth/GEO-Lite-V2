import { type ReactNode } from 'react';
/**
 * Set by DataTable around its `bulkBar`: the count to show (kept while the bar
 * slides closed), and the one to announce (only once a drag-select settles).
 */
export declare const BulkBarCountContext: import("react").Context<{
    count: number;
    settled: number;
} | undefined>;
export interface BulkBarProps {
    /** How many rows are selected. Inside a DataTable's `bulkBar` it's supplied for you. */
    count?: number;
    /** Clears the selection. */
    onClear: () => void;
    /** Default "Clear selection". */
    clearLabel?: string;
    /** The actions: small secondary `Button`s and `BulkBarMenu`s, applied as they're picked (no Apply step). */
    children?: ReactNode;
    className?: string;
}
/**
 * The bar shown while table rows are selected: "n selected", the actions, and
 * Clear selection on the right. Put it in `DataTable`'s `bulkBar`, which opens
 * and closes it (only when a drag-select ends, so the table never moves under
 * the pointer) and slides it.
 */
export declare function BulkBar({ count, onClear, clearLabel, children, className }: BulkBarProps): import("react").JSX.Element;
export interface BulkBarMenuProps {
    /** The button's text ("Tags", "Frequency"). */
    label: string;
    /**
     * The menu. `MenuItem`s apply a value to the whole selection on pick;
     * `CheckboxOption size="small"` rows are tri-state (checked when every
     * selected row has it, `indeterminate` when some do; picking adds it to all,
     * or removes it from all when every row had it).
     */
    children: ReactNode;
    /** Keep it open while picking several (a tri-state list). Default: closes on pick. */
    closeOnSelect?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
/** A bulk action that opens a menu: a small secondary button with a caret. */
export declare function BulkBarMenu({ label, children, closeOnSelect, open, onOpenChange }: BulkBarMenuProps): import("react").JSX.Element;
