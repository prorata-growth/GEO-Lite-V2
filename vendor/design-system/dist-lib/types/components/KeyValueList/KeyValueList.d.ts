import type { ReactNode } from 'react';
export interface KeyValueItem {
    key: ReactNode;
    value: ReactNode;
    /** With `fields`: this value is text, not a field, so its key stays on the first text line. */
    text?: boolean;
}
export interface KeyValueListProps {
    items: KeyValueItem[];
    /**
     * `spread` (default): the key on the left, the value pushed right.
     * `columns`: the values in a column after the keys (`keyWidth` at most);
     * under a 480px container each key sits above its value. `stacked`: the key
     * (12px) above the value, always.
     */
    layout?: 'spread' | 'columns' | 'stacked';
    /** `columns`: the key column's maximum width. Default 240. */
    keyWidth?: number;
    /** Subtle rules between rows. Default on for `spread` and `columns`, off for `stacked`. */
    rules?: boolean;
    /** The values are small inputs: 16px around each row, and each key centred on a 32px field's first line. */
    fields?: boolean;
    'aria-label'?: string;
    className?: string;
}
/**
 * Key → value rows (owner 10-21, Gist GEO's settings, brand card and an
 * action's facts): the key in the secondary grey, the value beside it, after
 * it, or under it. Figma: `Key Value List`.
 */
export declare function KeyValueList({ items, layout, keyWidth, rules, fields, className, ...rest }: KeyValueListProps): import("react").JSX.Element;
