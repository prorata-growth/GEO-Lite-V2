import type { MenuItemSize } from './MenuItem';
export interface MenuAddItemProps {
    /** Called with the trimmed text when it's added (never empty). */
    onCreate: (text: string) => void;
    /** The row's text, and the field's name for screen readers. Default "Add your own". */
    label?: string;
    /** The field's placeholder, e.g. "Describe who's asking". Default: the label. */
    placeholder?: string;
    /**
     * A searchable menu's query. When it has text, the row reads `Add “<query>”`
     * and adds it on click. Show it only when no option matches exactly; the
     * search field's own Enter should pick an exact match or add, as here.
     */
    query?: string;
    /** Matches the MenuItems around it. Default `medium`. */
    size?: MenuItemSize;
}
/**
 * The last row of a menu of pre-filled options (ICPs, topics, products,
 * competitors) for adding one of your own (owner 10-27). Opt-in: not for a
 * fixed set or a filter. A MenuItem with a Plus that turns, in place and at
 * the same height, into a field: Enter adds and closes the menu like a pick,
 * Escape goes back to the row (a second Escape closes the menu), and leaving
 * it empty puts the row back. With a `query`, it's the `Add “<query>”` row of
 * a searchable menu instead.
 */
export declare function MenuAddItem({ onCreate, label, placeholder, query, size }: MenuAddItemProps): import("react").JSX.Element;
