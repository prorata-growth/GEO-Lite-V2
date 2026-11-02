import type { ReactNode } from 'react';
export interface MenuHeaderProps {
    /** What the menu is about, e.g. the signed-in email in an account menu. */
    children: ReactNode;
    /** For a group to be labelled by it (`aria-labelledby`). */
    id?: string;
    className?: string;
}
/**
 * A non-interactive first row for a `Menu`: who or what the menu is about.
 * Secondary text (Default/Tight/200), aligned with the item labels, 8px above
 * and 4px below. It is not a menu item: not focusable, and marked
 * `role="presentation"` so it is read but not counted as an item.
 */
export declare function MenuHeader({ children, id, className }: MenuHeaderProps): import("react").JSX.Element;
