import type { ReactNode } from 'react';
export interface CardHeaderProps {
    title: string;
    description?: string;
    /** An icon button, a menu trigger, or similar — e.g. the ranking card's "view all". */
    trailingAction?: ReactNode;
    className?: string;
}
export declare function CardHeader({ title, description, trailingAction, className }: CardHeaderProps): import("react").JSX.Element;
