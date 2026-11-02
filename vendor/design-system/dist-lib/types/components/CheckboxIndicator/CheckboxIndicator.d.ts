import type { HTMLAttributes } from 'react';
export type CheckboxSize = 'small' | 'medium';
export interface CheckboxIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
    checked?: boolean;
    /** A parent-row summary state — distinct from `checked`, not user-settable directly. */
    indeterminate?: boolean;
    /** `medium` 20px (default); `small` 16px with a 10px check, for dense tables and menus. Figma's `Size`. */
    size?: CheckboxSize;
}
/**
 * The standalone box/checkmark visual — extracted the same way RadioIndicator
 * was, so it can be reused apart from `Checkbox`'s own accessible input.
 * Unlike Menu Item's icon slots, the check/minus glyph is fixed, not
 * consumer-swappable — it *is* the state, matching Figma (no instance-swap
 * property exists on Checkbox for it).
 */
export declare function CheckboxIndicator({ checked, indeterminate, size, className, ...rest }: CheckboxIndicatorProps): import("react").JSX.Element;
