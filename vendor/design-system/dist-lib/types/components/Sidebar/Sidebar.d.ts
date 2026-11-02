import type { ReactNode } from 'react';
export interface SidebarProps {
    /** Typically a SidebarBrandSwitcher. */
    header: ReactNode;
    /**
     * Pinned between the header and the scrollable nav list — e.g.
     * SidebarActionItems. Unlike `children`, this doesn't scroll away with the
     * nav list; it's a fixed slot, matching how it's positioned in Figma (a
     * sibling of the nav area, not nested inside it). Hidden entirely while
     * collapsed — there's no collapsed-rail version of a text-heavy card.
     */
    banner?: ReactNode;
    /** SidebarSection / SidebarNavItem / Divider, composed freely per product. */
    children: ReactNode;
    /**
     * Nav items pinned to the bottom, above the footer and below a divider,
     * e.g. a `SidebarSection` holding Context hub. They stay put while the nav
     * list above scrolls.
     */
    bottomNav?: ReactNode;
    /**
     * A one-line status above the footer row, e.g. a `SidebarStatusRow` for
     * credits. 12px above the footer row; the bell sits beside the footer only.
     */
    status?: ReactNode;
    /** Typically a SidebarFooter. */
    footer: ReactNode;
    collapsed?: boolean;
    onCollapseToggle?: () => void;
    /**
     * `short` (10-22, a Gist GEO opt-in): the toggle's tooltip reads "Expand" /
     * "Collapse" (the icon sits in the sidebar, so the object is implied); its
     * accessible name stays "Expand sidebar" / "Collapse sidebar". Default
     * `default`: the tooltip says the full name.
     */
    toggleTooltip?: 'default' | 'short';
    /**
     * `page` (owner 10-14, Gist GEO, after Searchable and Peec): the sidebar
     * recedes into the page grey and its banner card turns raised, for an app
     * whose canvas is the raised white. Default `raised`.
     */
    surface?: 'raised' | 'page';
    /**
     * Shows a notifications bell beside the footer (stacked above the avatar
     * when collapsed). Omit it and there is no bell (not every product has
     * notifications).
     */
    onNotificationsClick?: () => void;
    /** Unread count: any shows a dot on the bell, and the count is in its label. */
    unreadNotifications?: number;
    className?: string;
}
/**
 * The flexible parent sidebar shell — header, a scrollable nav area, and a
 * footer, all consumer-supplied. Doesn't know about routes, icons, or
 * sections itself; that's what makes it reusable across products (Gist
 * Answers, GEO) with each supplying its own header content and nav tree.
 *
 * The collapse/expand "unfurl" is one plain `width` tween on the shell —
 * a real CSS property, not a transform — so every child reflows for free,
 * every frame, via normal browser layout, already in lockstep with it. This
 * is deliberate: nothing else in the tree gets its own `layout` (FLIP)
 * animation to "help" that reflow along, because FLIP assumes a static
 * before/after snapshot, and fighting a continuously-resizing ancestor with
 * it is what caused a visibly janky settle in an earlier version.
 *
 * This width tween uses LINEAR easing, not an eased curve — every child's
 * own visible shrink is bounded by whichever is smaller, its own animated
 * size or the physical space this shell provides, and the shell is almost
 * always the binding constraint early in the transition. A front-loaded
 * ease-out curve here (previously used) meant children appeared to finish
 * shrinking almost immediately regardless of their own transition timing —
 * confirmed directly by slowing this down to a few seconds and screenshotting
 * frame-by-frame: the header content was fully collapsed at 10% of the way
 * through a 3-second transition. No amount of tuning the children's own
 * easing could fix that, since they were never the actual bottleneck.
 *
 * The header content's own fade/collapse is a plain CSS transition (see
 * `.headerContent` in the stylesheet), not Framer Motion — a per-property
 * Framer transition here produced a visible back-and-forth wobble on both
 * collapse and expand. Plain CSS transitions on a class toggle is the same
 * proven pattern already used for the header buttons' own box-size change.
 */
export declare function Sidebar({ header, banner, children, bottomNav, status, footer, collapsed, onCollapseToggle, toggleTooltip, surface, onNotificationsClick, unreadNotifications, className, }: SidebarProps): import("react").JSX.Element;
