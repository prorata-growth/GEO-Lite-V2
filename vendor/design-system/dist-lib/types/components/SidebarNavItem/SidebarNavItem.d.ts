import type { ReactNode } from 'react';
export interface SidebarNavItemProps {
    label: string;
    /** Any icon — swappable per item, same convention as MenuItem/FilterDropdown's own leading-content slots. Render it at Light weight to match the rest of the sidebar. */
    icon?: ReactNode;
    /** A trailing badge, e.g. `<Tag size="small">Beta</Tag>`. */
    tag?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    /** Hides the label and tag, centering the icon — for the icon-only collapsed rail. */
    collapsed?: boolean;
    onClick?: () => void;
    className?: string;
}
/**
 * A single sidebar navigation row — icon, label, and an optional trailing
 * tag. Fixed height regardless of whether the tag is shown, so rows in a
 * real list always line up. `collapsed` hides the label/tag without
 * changing the icon's own position, since the row's horizontal padding is
 * symmetric around the icon.
 *
 * The label/tag collapse is a plain CSS transition (see `.labelGroup` in the
 * stylesheet), not Framer Motion — a per-property Framer transition here
 * (linear easing for flex-grow/max-width/margin, eased for opacity) produced
 * a visible back-and-forth wobble on both collapse and expand. Plain CSS
 * transitions on a class toggle is the same proven pattern already used for
 * `Sidebar`'s own `.collapseToggle` box-size change, which never had that
 * problem.
 */
export declare function SidebarNavItem({ label, icon, tag, active, disabled, collapsed, onClick, className, }: SidebarNavItemProps): import("react").JSX.Element;
