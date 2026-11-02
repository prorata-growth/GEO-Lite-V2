import type { ButtonHTMLAttributes, ReactNode } from 'react';
export type MenuItemSize = 'small' | 'medium' | 'large';
export interface MenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** Row text. */
    label: string;
    /** Matches Figma's Small/Medium/Large — same scale as Pagination Menu Item. */
    size?: MenuItemSize;
    /** Any icon element, e.g. `<User />` from @phosphor-icons/react. Scales with `size` (16/20/24px), same convention as TabToggle. */
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    /**
     * A quiet value at the right, before the trailing icon: a count ("24").
     * 12px, secondary, tabular figures (Gist GEO's topic filter, owner 10-19).
     * In a list where only the selected row has a check, give the others an
     * empty `trailingIcon` (`<span />`) so the counts line up.
     */
    meta?: ReactNode;
    /**
     * Let a long label wrap onto more lines instead of ending in "…". A
     * one-line row keeps its normal height. For lists of names people choose
     * between, where the end of a name is often what tells two apart.
     */
    wrap?: boolean;
    /**
     * A second, quieter line under the label (12px secondary), e.g. "3 loops"
     * under a goal (owner 10-15). The row grows past its usual height; the
     * item's accessible name stays the label, and this is its description.
     */
    description?: string;
    /**
     * The current choice in a picker menu: the pressed grey stays, and the row
     * is `aria-current`. Pair it with a trailing Check. Figma State=Selected.
     */
    selected?: boolean;
    /**
     * `danger` (owner 10-21, a report card's menu): the destructive item, Delete,
     * usually last after a `Divider`. The label and icons take
     * `content-status-error`; hover and focus are the usual ones. Default `default`.
     */
    tone?: 'default' | 'danger';
}
/**
 * A single actionable row for dropdown menus, context menus, and command lists.
 * Icons inherit color from the button's `color`, so recoloring for the
 * disabled state (or any future variant) only needs to happen in one place.
 */
export declare function MenuItem({ label, size, leadingIcon, trailingIcon, meta, wrap, description, selected, tone, className, ...rest }: MenuItemProps): import("react").JSX.Element;
