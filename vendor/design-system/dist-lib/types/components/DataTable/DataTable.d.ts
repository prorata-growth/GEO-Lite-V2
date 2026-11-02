import { type ReactNode } from 'react';
export interface DataTableColumn {
    key: string;
    /** The header label. Omit (or `null`) for a column without one (the ⋯ column). */
    header?: ReactNode;
    /** Fixed px, or `'fill'` to take the rest (with `min` as its floor). */
    width: number | 'fill';
    /** For a `'fill'` column: the narrowest it gets, in px. Default 0. */
    min?: number;
    /**
     * For a `'fill'` column: how many equal fill tracks it takes (a whole
     * number, default 1). It spans them and the gaps between, so tables stacked
     * on one page share a grid (owner 10-21): Position's brand | bar (2) | rank
     * lines up under brand | ChatGPT | Perplexity | Google.
     */
    grow?: number;
    /** `number` aligns the column and its header to the end with tabular figures. */
    type?: 'text' | 'number';
    /** Overrides the alignment `type` implies. */
    align?: 'start' | 'center' | 'end';
    /** `small`: 12px text for secondary columns (Prompt monitoring's topic, share of voice). Default 14px. */
    size?: 'medium' | 'small';
    /**
     * What the column means, one ⓘ away: a 14px info button after the header
     * label with this in a tooltip (Gist GEO's Prompt monitoring, owner 10-19).
     */
    info?: ReactNode;
    /**
     * A sort toggle after the header (↕, or ↑ / ↓ when it's the sorted column).
     * The table doesn't sort: it reports the click through `onSortChange` and
     * shows `sort`; the product orders the rows. A tooltip on the toggle names
     * what the next click does: "Sort highest first" / "Sort lowest first" on a
     * number column, "Sort A to Z" / "Sort Z to A" on text (owner 10-19).
     */
    sortable?: boolean;
    /**
     * The tooltip's words when the order isn't A to Z or high to low, in the
     * same short form: Frequency `{ ascending: 'Sort most often first',
     * descending: 'Sort least often first' }`.
     */
    sortLabels?: {
        ascending: string;
        descending: string;
    };
}
/** The column the rows are ordered by, and which way. Matches `aria-sort`. */
export interface DataTableSort {
    key: string;
    direction: 'ascending' | 'descending';
}
export interface DataTableSelection {
    /** Keys of the selected rows. */
    selected: string[];
    onSelectedChange: (selected: string[]) => void;
    /** Keys of the rows shown, in order. Select-all acts on these. */
    keys: string[];
    /** Rows that can't be selected (your own member row): no checkbox. */
    disabledKeys?: string[];
    /**
     * Press a row's checkbox and drag across rows: every row between it and the
     * pointer takes its new state, and dragging back undoes rows you leave. Near
     * the top or bottom of a `scrollBody` table, the rows scroll. Default true.
     */
    dragToSelect?: boolean;
}
export type DataTableVariant = 'default' | 'quiet';
export type DataTableDensity = 'comfortable' | 'compact';
export type DataTableStatus = 'loading' | 'empty' | 'error';
export type DataTableMobile = 'stack' | 'scroll';
export interface DataTableProps {
    /** Names the table. */
    'aria-label': string;
    columns: DataTableColumn[];
    /**
     * `default`: the product table (bordered, lines between rows and, with
     * `columnLines`, between columns). `quiet`: reports and by-engine read-outs:
     * no frame, no column lines, a 12px placeholder header, rows 24px apart,
     * comfortable (44px) rows with names 14px and values 14px medium.
     */
    variant?: DataTableVariant;
    /** Lines between columns (default variant only). Default true. */
    columnLines?: boolean;
    /**
     * Row height, from the row tokens (owner 10-21): `compact` 42px
     * (`--row-height-compact`, a table you work in) or `comfortable` 44px
     * (`--row-height-comfortable`, a table read in a card). Default `compact`,
     * or `comfortable` on a quiet table.
     */
    density?: DataTableDensity;
    /** Adds a checkbox column (16px boxes) with select-all in the header. */
    selection?: DataTableSelection;
    /**
     * A `BulkBar` shown above the table while rows are selected. It opens and
     * closes only when a drag-select ends (so the table never moves under the
     * pointer), slides, and keeps its last count while closing.
     */
    bulkBar?: ReactNode;
    /**
     * The narrowest the table gets, in px. Below it the columns keep their
     * widths and the table scrolls sideways, with a scrollbar that stays visible
     * (macOS hides overlay bars, so sideways scroll went unnoticed).
     */
    minWidth?: number;
    /**
     * The first n columns stay put while the table scrolls sideways (the
     * checkbox column with them), so you always see which row is which. Every
     * frozen column but the last needs a fixed width.
     */
    frozenColumns?: number;
    /**
     * Rows scroll under a fixed header row once the table reaches its parent's
     * height; until then it hugs its rows. Give the parent a height (and
     * `min-height: 0` up a flex or grid chain).
     */
    scrollBody?: boolean;
    /**
     * On a screen narrower than 700px: `stack` (default) turns each row into a list item:
     * its primary cell, then its `meta` line if it has one, else each value
     * under its column's label; `scroll` keeps the columns and scrolls sideways.
     */
    mobile?: DataTableMobile;
    /**
     * Replaces the rows. `loading` shows skeleton rows that keep the column
     * widths; `empty` and `error` show `statusContent` across all columns
     * (an `EmptyState` or "No prompts match" + Clear filters; an `Alert` with Retry).
     */
    status?: DataTableStatus;
    statusContent?: ReactNode;
    /** How many skeleton rows `loading` shows. Default 5. */
    loadingRows?: number;
    /** The sorted column, shown on its header's toggle (and as `aria-sort`). */
    sort?: DataTableSort | null;
    /**
     * A sortable header's toggle was pressed. The same column flips its
     * direction; a new one starts descending for a number column, ascending
     * for text.
     */
    onSortChange?: (sort: DataTableSort) => void;
    /** `DataTableRow`s. */
    children?: ReactNode;
    className?: string;
}
/**
 * The product table (Prompt monitoring, Team, Mission control, Insights,
 * reports). One column template lines every row up; rows can open what they
 * show (a stretched title, like `ListRow`) while their checkboxes and controls
 * stay separately clickable.
 */
export declare function DataTable({ 'aria-label': ariaLabel, columns, variant, columnLines, density: densityProp, selection, bulkBar, minWidth, frozenColumns, scrollBody, mobile, status, statusContent, loadingRows, sort, onSortChange, children, className, }: DataTableProps): import("react").JSX.Element;
export interface DataTableRowProps {
    /** The row's key: matches `selection.keys`. */
    rowKey: string;
    /** Names the row for its checkbox ("Select “…”"). Required with `selection`. */
    label?: string;
    /** The row opens something: its `primary` cell (else the first) becomes the button. */
    onActivate?: () => void;
    /** …or a link. */
    href?: string;
    /** Quieter text: a paused prompt, a pending invite. */
    muted?: boolean;
    /**
     * The row open in a docked panel (10-22, a `SplitView`): held in the accent
     * tint (its frozen cell too) and `aria-current`. In a table that already
     * tints a row (`emphasis="tint"`), it takes the sunken grey instead, so the
     * two don't read as one.
     */
    current?: boolean;
    /**
     * Your own row among others (rankings, by-engine): the Accent style.
     * `"tint"` also tints the row in the accent tint (Gist GEO's Insights tables,
     * owner 10-19), for when bold alone doesn't find it in a long table.
     */
    emphasis?: boolean | 'tint';
    /**
     * On a phone (`mobile="stack"`), one quiet line under the primary cell in
     * place of the other columns ("Coffee subscriptions · 0% · Weekly").
     * Without it, each value shows under its column's label.
     */
    meta?: ReactNode;
    children?: ReactNode;
    className?: string;
}
/** One row: `DataTableCell`s in column order. */
export declare function DataTableRow({ rowKey, label, onActivate, href, muted, emphasis, current, meta, children, className, }: DataTableRowProps): import("react").JSX.Element;
export interface DataTableCellProps {
    /**
     * One line, cut with "…"; the full text shows in a tooltip, only when it's
     * actually cut. Pass the text as `children` (a string) or as `tooltip`.
     */
    truncate?: boolean;
    /** The tooltip's text when `children` isn't a plain string. */
    tooltip?: ReactNode;
    /** A logo or `Avatar size={20}` before the content (an entity: a brand, a member, an engine). */
    leading?: ReactNode;
    /** A quiet second line under the content (`14 / 120 answers`, an email, a location). */
    sub?: ReactNode;
    /**
     * Where `sub` goes. `below` (default): a second line. `inline` (Gist GEO's
     * Insights tables, owner 10-19): one line, "16% | 12 / 76 answers": the
     * content at the Accent weight in a slot as wide as the column's widest
     * value: it starts at the column's edge (the header's) and the values are
     * right-aligned in it, so the rules line up down the column (10-21; a fixed
     * 40px until then). Then a hairline, then `sub` in the secondary colour.
     */
    subPlacement?: 'below' | 'inline';
    /** This cell holds the row's button/link when the row is activatable. Default: the first cell. */
    primary?: boolean;
    /** After the content, 8px on: a "You" tag beside a name that truncates (it never gets cut). */
    trailing?: ReactNode;
    /** Spans this many columns (a client on its own plan: "Own plan" across Prompts and Credits). */
    span?: number;
    /**
     * The row's ⋯ (a `MenuPopover` behind a `RowMenuTrigger`, `align="end"`), at
     * this cell's right edge: shown on row hover or focus (always on touch), and
     * stepping aside while a `PillMenu` in the same cell is hovered or open.
     */
    actions?: ReactNode;
    children?: ReactNode;
    /**
     * The content takes the column's width (10-29, Gist GEO's CSV import
     * review): a control in the cell (an Input, a Combobox) stretches to fill
     * it rather than hugging its own content. Default: the content hugs.
     */
    fill?: boolean;
    className?: string;
}
/** One cell. Alignment, figures and text size come from its column. */
export declare function DataTableCell({ truncate, tooltip, leading, sub, subPlacement, trailing, span, actions, children, fill, className }: DataTableCellProps): import("react").JSX.Element;
export interface DataTableBarProps {
    /** The value, 0 to `max`. */
    value: number;
    /** The top of the scale. Default 1 (a 0–1 score). */
    max?: number;
    /** Your row: the bar in your series blue (`chart-categorical-1`); the rest are the chart's grey. */
    highlight?: boolean;
    /** How the value reads after the bar. Default two decimals ("0.42"). */
    format?: (value: number) => ReactNode;
    /**
     * The widest the bar and its value get together, in px. Default 300. The
     * value follows the bar and the column's spare width comes after it, so in a
     * wide column the value doesn't end at the edge beside the next column's.
     */
    width?: number;
}
/**
 * A bar in a cell (Gist GEO's Insights, owner 10-19: Position's 0–1 answer
 * score): BarList's 4px bar on the sunken track, then the value right-aligned
 * at the Accent weight, together up to `width` (300px) of the column. Put it
 * inside a `DataTableCell`.
 */
export declare function DataTableBar({ value, max, highlight, format, width }: DataTableBarProps): import("react").JSX.Element;
export interface DataTableTagsItem {
    /** The tag's name: shown in the "+n" tooltip when it isn't the first. */
    label: string;
    /** What to show for it. Default `<Tag size="medium">{label}</Tag>`. */
    content?: ReactNode;
}
export interface DataTableTagsProps {
    /** In order; the first shows, the rest go in "+n". */
    items: DataTableTagsItem[];
    /** Before the tags (a prompt on its own engines: their logos). */
    leading?: ReactNode;
    /**
     * The add control after the tags: a `TagMenu` (its dashed chip). In a row it
     * takes no space until the row is hovered or focused (always on touch), so
     * the tags get the whole cell at rest.
     */
    add?: ReactNode;
}
/**
 * The tags cell (Prompt monitoring): the first tag (shortening with "…" and a
 * tooltip when long), "+n" with the rest in a tooltip, and the add chip,
 * revealed on row hover. Put it inside a `DataTableCell`.
 */
export declare function DataTableTags({ items, leading, add }: DataTableTagsProps): import("react").JSX.Element;
