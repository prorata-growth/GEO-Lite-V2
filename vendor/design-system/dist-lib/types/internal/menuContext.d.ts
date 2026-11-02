import type { MutableRefObject } from 'react';
/**
 * What a `MenuPopover` offers the rows inside it beyond a click: `select()`
 * closes the menu as picking an item does (when it closes on select), and
 * `escapeGuard` lets a row in the middle of something (MenuAddItem's field)
 * take an Escape before it closes the menu: return true to keep it open.
 */
export interface MenuContextValue {
    select: () => void;
    escapeGuard: MutableRefObject<(() => boolean) | null>;
}
export declare const MenuContext: import("react").Context<MenuContextValue | null>;
