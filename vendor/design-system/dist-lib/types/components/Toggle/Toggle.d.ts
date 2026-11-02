import type { InputHTMLAttributes } from 'react';
export type ToggleSize = 'small' | 'medium' | 'large';
export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    size?: ToggleSize;
}
/**
 * An on/off switch (Figma's `Toggle`). Distinct from `Checkbox` — no visible
 * label of its own, meant for rows where the label sits elsewhere (a
 * settings list, a table cell). A real `<input type="checkbox" role="switch">`
 * drives it, visually hidden but still the actual interactive element —
 * same pattern `Checkbox` already uses, so keyboard/screen-reader behavior,
 * `checked`, `disabled`, and `onChange` all just work as native props.
 */
export declare function Toggle({ size, className, ...rest }: ToggleProps): import("react").JSX.Element;
