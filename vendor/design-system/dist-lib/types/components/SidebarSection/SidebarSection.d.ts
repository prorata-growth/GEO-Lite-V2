import type { ReactNode } from 'react';
export interface SidebarSectionProps {
    /**
     * The muted group label, e.g. "Reports" — rendered uppercase automatically.
     * Optional: omit it for an unlabelled group (e.g. "Overview" alone above the
     * labelled groups), which keeps the same item spacing with no header.
     */
    label?: string;
    children: ReactNode;
    /** Hides the group label — for the icon-only collapsed rail, where there's no room for it. */
    collapsed?: boolean;
    className?: string;
}
/** A stack of SidebarNavItems, usually under a muted header label (the label is optional). */
export declare function SidebarSection({ label, children, collapsed, className }: SidebarSectionProps): import("react").JSX.Element;
