import type { ReactNode } from 'react';
export interface FilterDropdownOption {
    value: string;
    label: string;
    leadingIcon?: ReactNode;
    disabled?: boolean;
    /**
     * A count at the right of the option, before its check ("All topics 76").
     * Single-select menus (Gist GEO's topic filter, owner 10-19).
     */
    count?: ReactNode;
    /** A group header this option falls under (10-22: prompts under their topic). Options in a group should sit together. */
    group?: string;
}
export type FilterDropdownSize = 'default' | 'compact';
export type FilterDropdownTone = 'default' | 'accent';
export interface FilterDropdownProps {
    options: FilterDropdownOption[];
    /**
     * `compact`: a 28px trigger with 13px text and a 12px caret, for filter
     * rows; its menu reads at the same 13px. Default 14px. Figma `Size`.
     */
    size?: FilterDropdownSize;
    /**
     * `accent` (Gist GEO's Prompt monitoring, owner 10-19): the trigger in the
     * accent tint, no border, its text and caret in the accent colour at the
     * Accent weight. For the one filter a view is organised by ("All topics"),
     * beside plain filters. Default `default`.
     */
    tone?: FilterDropdownTone;
    /** An icon shown in the trigger itself, e.g. a `SlidersHorizontal` glyph for a settings-style filter. */
    leadingIcon?: ReactNode;
    disabled?: boolean;
    className?: string;
    'aria-label'?: string;
    /**
     * A fixed label ahead of the value (e.g. "Prompt"), divided by a vertical
     * rule. Switches the whole component into "long option" mode, for filters
     * whose value is a long sentence rather than a short label: option rows
     * wrap instead of ellipsizing, the panel takes a wider viewport-clamped
     * cap, and the trigger caps its own width so a long value ellipsizes with
     * the caret intact. With `multiple` (10-27, Gist GEO's "You includes"): the
     * label and rule ahead of the summary, which then reads one option's name or
     * just the count ("You includes | 2"); no long-option mode, as these labels
     * and values are short.
     */
    label?: string;
    /**
     * Long-option mode without a visible `label` (10-22, Gist GEO's Insights
     * prompt filters): rows wrap, the panel takes the wider cap, the trigger caps
     * its width so a long value ellipsizes. Single-select only. `label` implies it.
     */
    longOptions?: boolean;
    /**
     * A single-select trigger's width cap: a long value ellipsizes with the
     * caret kept, the menu's rows unchanged. Long-option mode caps at 420
     * without it.
     */
    maxWidth?: number;
    /** `true`: checkbox rows, multiple values, the panel stays open across selections. */
    multiple?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    values?: string[];
    onValuesChange?: (values: string[]) => void;
    /**
     * The first row's label, a checkbox for "all" (e.g. "All engines"), and the
     * trigger's label when everything is selected. `values=[]` means all.
     * While all are selected this row is checked and the options are not;
     * checking an option then picks just it (owner 10-15: one click for "just
     * ChatGPT"). From a partial selection options toggle as usual. Unchecking the
     * last one, checking every one, or clicking this row gives all again; the
     * filter is never empty. Reached by checking every option, the open panel
     * keeps showing them checked (with this row) until it closes; unchecking one
     * then leaves the rest.
     */
    allLabel?: string;
    /**
     * A find field pinned at the top of the menu (10-22, Gist GEO's long lists:
     * prompts, topics). It takes focus on open and filters the options by label;
     * arrow down moves into the rows; Escape clears the query first, then
     * closes. In a multi-select the All row hides while there's a query.
     */
    searchable?: boolean;
    /** The find field's placeholder (and name). Default "Search". */
    searchPlaceholder?: string;
    /** Shown when nothing matches the query. Default "No matches". */
    emptyMessage?: string;
}
export declare function FilterDropdown({ options, size, tone, leadingIcon, disabled, className, 'aria-label': ariaLabel, label, longOptions, maxWidth, multiple, value, onChange, placeholder, values, onValuesChange, allLabel, searchable, searchPlaceholder, emptyMessage, }: FilterDropdownProps): import("react").JSX.Element;
