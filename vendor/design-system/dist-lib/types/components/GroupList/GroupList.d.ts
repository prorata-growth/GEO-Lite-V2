import type { ReactNode } from 'react';
export interface GroupListItem {
    key: string;
    label: string;
    count?: number;
    /**
     * The group's actions, as menu items (`MenuItem size="small"`): shown in a ⋯
     * on the selected group only (owner 10-12: buttons under the list read as
     * more groups).
     */
    menu?: ReactNode;
}
export interface GroupListProps {
    /** Names the list ("Topics"). */
    'aria-label': string;
    items: GroupListItem[];
    /** The selected group's key. */
    value: string;
    onChange: (key: string) => void;
    className?: string;
}
/**
 * The page's main grouping beside a table (Prompt monitoring's topics,
 * Actions' statuses): each group with its count, the selected one tinted. In
 * a `GroupLayout` it stays put while the table scrolls, scrolls on its own if
 * taller than its column, and becomes a sideways-scrolling row when narrow.
 */
export declare function GroupList({ 'aria-label': ariaLabel, items, value, onChange, className }: GroupListProps): import("react").JSX.Element;
export interface GroupLayoutProps {
    /** The `GroupList`, then the main content (filters, the table). */
    children: ReactNode;
    /**
     * The layout takes its parent's height and the list and content scroll on
     * their own (with `DataTable scrollBody`): give the parent a height.
     */
    fill?: boolean;
    className?: string;
}
/**
 * A `GroupList` in a 200px column beside the content, 20px apart. Narrower
 * than 900px (its own width), the list goes above the content as a
 * sideways-scrolling row.
 */
export declare function GroupLayout({ children, fill, className }: GroupLayoutProps): import("react").JSX.Element;
