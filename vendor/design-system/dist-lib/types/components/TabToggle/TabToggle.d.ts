import type { ButtonHTMLAttributes, ReactNode } from 'react';
export type TabToggleSize = 'small' | 'medium' | 'large';
export interface TabToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** Label text. Omit for an icon-only tab — then `aria-label` is required. */
    children?: ReactNode;
    /** Optional leading icon — the only content for an icon-only tab. */
    icon?: ReactNode;
    size?: TabToggleSize;
    selected?: boolean;
}
/** A single pill-style tab inside a TabToggleGroup segmented control. Pass just
    `icon` (with `aria-label`) for an icon-only tab, no label text. */
export declare function TabToggle({ children, icon, size, selected, className, 'aria-label': ariaLabel, ...rest }: TabToggleProps): import("react").JSX.Element;
