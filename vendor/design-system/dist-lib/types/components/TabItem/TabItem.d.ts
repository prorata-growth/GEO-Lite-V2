import type { ButtonHTMLAttributes, ReactNode } from 'react';
export interface TabItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    children: ReactNode;
    icon?: ReactNode;
    /** A small trailing count/label chip — matches Figma's Badge slot, e.g. an unread count. */
    badge?: ReactNode;
    selected?: boolean;
}
/**
 * An underline-style nav tab (Figma's `Tab Item`) — distinct from `TabToggle`,
 * which is a pill/segmented control. Meant to sit inside a `TabBar`, but
 * usable on its own.
 */
export declare function TabItem({ children, icon, badge, selected, className, ...rest }: TabItemProps): import("react").JSX.Element;
