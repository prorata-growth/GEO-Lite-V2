import type { HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from 'react';
export type InputType = 'primary' | 'secondary' | 'tertiary';
export type InputSize = 'small' | 'medium' | 'large' | 'expanded';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Primary (outlined) for a standalone field, Secondary (filled) for a
     * busy/textured surface, Tertiary (underlined) for compact/dense contexts. */
    type?: InputType;
    /**
     * 'expanded' renders a multi-line textarea instead of a single-line input
     * (the same as `multiline` at medium).
     */
    size?: InputSize;
    /**
     * A multi-line textarea, 120px tall, at this size's text (owner 10-21): with
     * `size="small"` it takes Small's 14px text, so it stacks with small fields
     * in a form instead of standing out at 16px. `size="expanded"` stays as it is.
     */
    multiline?: boolean;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    /** A validation issue that needs to stand out — border only, no separate ring. */
    warning?: boolean;
    /** The value is wrong and must be fixed (10-22): the error border, and the field reads as invalid. */
    error?: boolean;
    /**
     * A line under the field (10-22): why it's wrong, or a hint. 12px, in the
     * error colour with `error` (announced as it appears), the warning colour
     * with `warning`, else secondary. Linked to the field for screen readers.
     */
    message?: ReactNode;
    /**
     * The native `<input type>` (`email`, `url`, `password`, `search`…), since
     * `type` is the style. Default `text`. Not for a textarea (`multiline`, `expanded`).
     */
    htmlType?: HTMLInputTypeAttribute;
}
/**
 * The default choice for a standalone text field. "Filled" vs "Default"
 * isn't a prop — it's just whether the field has a value, exactly like a
 * real browser input: typed text uses `content/default`, empty fields show
 * the `::placeholder` in `content/placeholder` automatically.
 */
export declare function Input({ type, size, leadingIcon, trailingIcon, warning, error, message, htmlType, multiline, className, ...rest }: InputProps): import("react").JSX.Element;
