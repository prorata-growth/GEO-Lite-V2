import type { InputHTMLAttributes } from 'react';
import type { CheckboxSize } from '../CheckboxIndicator';
/**
 * A visible `label`, or — for a checkbox whose meaning comes from its
 * surroundings, like one per row in a table — no label and an `aria-label`
 * instead. One of the two is required, so the control always has a name.
 */
export type CheckboxLabelling = {
    label: string;
} | {
    label?: undefined;
    'aria-label': string;
};
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & CheckboxLabelling & {
    /**
     * A parent-row summary state ("some but not all children checked") —
     * distinct from `checked`. Not a real HTML attribute, so it's applied to
     * the input via a ref effect, matching how the DOM itself requires it.
     */
    indeterminate?: boolean;
    /** `medium` 20px (default); `small` 16px box with 14px label text, for dense tables and menus. */
    size?: CheckboxSize;
};
/** Allows selecting multiple items from a list (unlike Radio). */
export declare function Checkbox({ label, indeterminate, size, className, checked, ...rest }: CheckboxProps): import("react").JSX.Element;
