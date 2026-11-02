import type { ButtonHTMLAttributes, ReactNode } from 'react';
export type PaginationPageSize = 'small' | 'medium' | 'large';
export interface PaginationPageProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    size?: PaginationPageSize;
    /** Marks this as the currently-active page. */
    active?: boolean;
    /** Renders a "more pages" ellipsis instead of a page number — usually disabled/non-interactive. */
    more?: boolean;
    children?: ReactNode;
}
/** A single numbered page button in a pagination bar, or a "more" ellipsis gap. */
export declare function PaginationPage({ size, active, more, className, children, ...rest }: PaginationPageProps): import("react").JSX.Element;
