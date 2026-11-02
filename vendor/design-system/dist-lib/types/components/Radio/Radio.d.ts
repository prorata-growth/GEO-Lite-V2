import type { InputHTMLAttributes } from 'react';
/**
 * A visible `label`, or — for a radio whose meaning comes from its
 * surroundings, like a cell in an options grid — no label and an `aria-label`
 * instead. One of the two is required, so the control always has a name.
 */
export type RadioLabelling = {
    label: string;
} | {
    label?: undefined;
    'aria-label': string;
};
export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & RadioLabelling;
/**
 * A single-select choice from a list (unlike Checkbox, which allows
 * multiple). Wraps a real native `<input type="radio">` — visually hidden,
 * but still keyboard-focusable and screen-reader-announced — with
 * `RadioIndicator` as its styled visual sibling.
 */
export declare function Radio({ label, className, checked, ...rest }: RadioProps): import("react").JSX.Element;
