import type { ButtonHTMLAttributes } from 'react';
export type PaginationArrowType = 'first' | 'back' | 'next' | 'last';
export type PaginationArrowSize = 'small' | 'medium' | 'large';
export interface PaginationArrowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type: PaginationArrowType;
    size?: PaginationArrowSize;
}
/** Icon-only First/Back/Next/Last control for paging through results. */
export declare function PaginationArrow({ type, size, className, disabled, ...rest }: PaginationArrowProps): import("react").JSX.Element;
