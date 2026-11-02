import type { CSSProperties, ReactNode } from 'react';
export interface CheckboxOptionProps {
    checked?: boolean;
    /** A parent-row summary state — distinct from `checked`, matching CheckboxIndicator's own. */
    indeterminate?: boolean;
    disabled?: boolean;
    label: string;
    /** An icon, a color swatch, or an image/avatar — same leading-slot flexibility as MenuItem's. */
    leadingIcon?: ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    /**
     * `medium` (default): the 20px checkbox and 16px Accent label of Figma's
     * Option/Checkbox. `small`: for compact menus, a real 16px checkbox, 14px
     * Default Tight label and a 28px row, matching MenuItem small. `menu`
     * (10-22): a 36px row with a 16px box and the Default/Comfy/300 label,
     * matching MenuItem's default, for checkbox rows in a menu beside
     * MenuItems. Figma `Size`.
     */
    size?: 'medium' | 'small' | 'menu';
    className?: string;
    /**
     * For a denser consumer that needs to shrink this row to match its own
     * tighter text (e.g. FilterDropdown's compact toolbar rows) without a
     * FilterDropdown-specific prop here: pass `--checkbox-option-scale`,
     * `--checkbox-option-font-size`, and/or `--checkbox-option-line-height`;
     * `--checkbox-option-content-indent` moves an icon-less row's label in.
     * Every other consumer can ignore this — the real Figma-matching defaults
     * apply automatically when it's omitted.
     */
    style?: CSSProperties;
}
/**
 * A selectable row combining a checkbox, an optional leading icon, and a
 * label — extracted from FilterDropdown's own multi-select rows so it can be
 * reused standalone (a settings list, a table row) without rebuilding the
 * checkbox/icon sizing and spacing calibration each time. Built as a real
 * `role="menuitemcheckbox"` button (not a native `<input>`) since this is a
 * list-row selection pattern, closer kin to MenuItem than to the standalone
 * `Checkbox` form control.
 */
export declare function CheckboxOption({ checked, indeterminate, disabled, label, leadingIcon, onCheckedChange, size, className, style, }: CheckboxOptionProps): import("react").JSX.Element;
