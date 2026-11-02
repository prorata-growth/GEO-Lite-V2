import type { ReactElement, ReactNode } from 'react';
export interface MenuPopoverProps {
    /** The element that opens the menu. Rendered as-is (it receives the open/expanded state). */
    trigger: ReactElement;
    /** The menu's contents: `MenuHeader`, `MenuItem`s, `Divider`s. */
    children: ReactNode;
    /** Controlled open state. Omit to let it manage its own. */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Which side of the trigger it opens on. Default `bottom`. */
    side?: 'top' | 'bottom';
    /** Default `start` (left edges aligned). */
    align?: 'start' | 'center' | 'end';
    /** Make the menu exactly as wide as its trigger (e.g. an account menu above a sidebar footer). */
    matchTriggerWidth?: boolean;
    /** Choosing an item closes the menu. Default true. */
    closeOnSelect?: boolean;
    /**
     * Where focus goes when the menu opens. `first` (default): the first
     * focusable thing in it. `menu`: the menu itself, so keyboard users are
     * inside it (arrow keys and Tab start there) but nothing is highlighted:
     * use it when the menu starts with a search field that shouldn't open
     * focused.
     */
    initialFocus?: 'first' | 'menu';
    className?: string;
    /** A class on the `Menu` surface itself, for a product menu with its own size or fill. */
    menuClassName?: string;
}
/**
 * A `Menu` anchored to a trigger: opens beside it, closes on an outside click,
 * Escape, or choosing an item, and returns focus to the trigger. Built on the
 * same Radix popover and open/close motion as Combobox and FilterDropdown.
 * `matchTriggerWidth` sizes the menu to the trigger instead of its contents.
 */
export declare function MenuPopover({ trigger, children, open, defaultOpen, onOpenChange, side, align, matchTriggerWidth, closeOnSelect, initialFocus, className, menuClassName, }: MenuPopoverProps): import("react").JSX.Element;
