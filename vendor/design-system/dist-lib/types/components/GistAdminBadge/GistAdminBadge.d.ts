export type GistAdminBadgeState = 'active' | 'inactive';
export type GistAdminBadgeSize = 'medium' | 'small';
export type GistAdminBadgeForm = 'mark' | 'label';
export interface GistAdminBadgeProps {
    /**
     * `mark` (default): the Gist G tile. `label`: "GIST" in 14px mono, e.g. an
     * eyebrow above an admin-only page picker; 22px tall, `size` doesn't apply.
     * Figma `Form`.
     */
    form?: GistAdminBadgeForm;
    /**
     * `inactive` when the control it marks is disabled: the tile goes sunken
     * and the G disabled grey. Default `active`. Figma `State`.
     */
    state?: GistAdminBadgeState;
    /** `medium` 22px (beside a medium Toggle), `small` 16px. Figma `Size`. */
    size?: GistAdminBadgeSize;
    /** The tooltip, and the badge's accessible name. */
    label?: string;
    /**
     * `false` inside something already focusable (a button, a tile): no
     * tooltip and no tab stop, just the accessible name. Default true.
     */
    tooltip?: boolean;
    className?: string;
}
/**
 * Marks a control only Gist admins can see or use, in any Gist product: the
 * Gist G on a brand tile, placed before the control (a Toggle, a menu item).
 * The badge doesn't contain the control; Figma's `Toggle` property is a
 * convenience for mocks. Focusable, so the tooltip reaches keyboard users too.
 */
export declare function GistAdminBadge({ form, state, size, label, tooltip, className, }: GistAdminBadgeProps): import("react").JSX.Element;
