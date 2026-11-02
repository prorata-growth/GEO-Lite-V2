import type { ButtonHTMLAttributes, ReactNode } from 'react';
export type IconButtonType = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonShape = 'round' | 'square';
export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: IconButtonType;
    size?: IconButtonSize;
    shape?: IconButtonShape;
    icon: ReactNode;
    /** Required — an icon-only button has no visible text to name it. */
    'aria-label': string;
    /** Native `<button type>` (submit/reset/button) — defaults to 'button'. */
    htmlType?: 'button' | 'submit' | 'reset';
}
/** An icon-only, aspect-ratio-locked action control — same 5 types and color
    tokens as Button, but sized square rather than hugging a label. */
export declare function IconButton({ type, size, shape, icon, htmlType, className, ...rest }: IconButtonProps): import("react").JSX.Element;
