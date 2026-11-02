import type { ComponentPropsWithRef } from 'react';
export interface MenuProps extends ComponentPropsWithRef<'div'> {
}
/**
 * The assembled dropdown shell — a raised surface that holds a stack of
 * MenuItem instances (and optional Dividers to group them). A long menu
 * scrolls inside its border (Menu.module.css).
 */
export declare function Menu({ children, className, ref, ...rest }: MenuProps): import("react").JSX.Element;
