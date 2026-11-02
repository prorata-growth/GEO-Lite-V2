import type { ButtonHTMLAttributes, ReactNode } from 'react';
export type PaginationMenuItemSize = 'small' | 'medium' | 'large';
export interface PaginationMenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    size?: PaginationMenuItemSize;
    /** Shows the checkmark — this is the currently-selected results-per-page value. */
    selected?: boolean;
    children: ReactNode;
}
/** A single selectable row inside PaginationDropdownResults, e.g. "10", "25", "50". */
export declare function PaginationMenuItem({ size, selected, className, children, ...rest }: PaginationMenuItemProps): import("react").JSX.Element;
