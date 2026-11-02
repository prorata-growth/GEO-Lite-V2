import type { ReactNode } from 'react';
export interface SidebarFooterProps {
    /** A photo or any element. Omit it to show the person's initials (from `name`) on a category tint. */
    avatar?: ReactNode;
    name: string;
    subtitle?: string;
    /**
     * The plan, as a small inverse pill centred under the avatar, e.g. "Pro"
     * (owner 10-15, from Linda's sidebar). Omit it for no badge.
     */
    badge?: string;
    /** Hides the name/subtitle, keeping just the avatar — for the collapsed rail. */
    collapsed?: boolean;
    /**
     * True while the menu this row opens is showing — keeps the hover look
     * even when the mouse isn't over it. Same convention as RowMenuTrigger's
     * own `active` prop. Ignored unless `onClick` is provided.
     */
    active?: boolean;
    /**
     * Provide to make the row a real, focusable button (e.g. to open an
     * account menu above it) — omit for a static, non-interactive identity
     * row, same fallback convention as SidebarBrandSwitcher's `options`.
     */
    onClick?: () => void;
    /**
     * The account menu: `MenuHeader`, `MenuItem`s, `Divider`s. Providing it makes
     * the row a button that opens the menu above itself, exactly as wide as the
     * row (when expanded), and keeps the row active while the menu is open. It
     * closes on an outside click, Escape, or choosing an item.
     */
    menu?: ReactNode;
    className?: string;
}
/**
 * The sidebar's bottom user-identity block — avatar plus name/subtitle.
 * Non-interactive by default; pass `onClick` to make it a real button, e.g.
 * to open an account menu above it (the same `Popover` + `Menu`/`MenuItem`
 * plumbing `SidebarBrandSwitcher` already uses, with `side="top"` instead of
 * the default bottom placement).
 *
 * The text's own fade/collapse is a plain CSS transition (see `.text` in the
 * stylesheet), not Framer Motion — a per-property Framer transition here
 * produced a visible back-and-forth wobble on both collapse and expand.
 * Plain CSS transitions on a class toggle is the same proven pattern already
 * used for `Sidebar`'s own `.collapseToggle` box-size change, which never
 * had that problem.
 */
export declare function SidebarFooter({ avatar, name, subtitle, badge, collapsed, active, onClick, menu, className }: SidebarFooterProps): import("react").JSX.Element;
