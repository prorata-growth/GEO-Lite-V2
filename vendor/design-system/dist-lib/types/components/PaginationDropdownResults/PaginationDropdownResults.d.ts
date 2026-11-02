import type { HTMLAttributes } from 'react';
export type PaginationDropdownResultsSize = 'small' | 'medium' | 'large';
export interface PaginationDropdownResultsProps extends HTMLAttributes<HTMLDivElement> {
    size?: PaginationDropdownResultsSize;
}
/** The raised list surface that opens under a PaginationDropdown trigger, holding PaginationMenuItem rows. */
export declare function PaginationDropdownResults({ size, className, children, ...rest }: PaginationDropdownResultsProps): import("react").JSX.Element;
