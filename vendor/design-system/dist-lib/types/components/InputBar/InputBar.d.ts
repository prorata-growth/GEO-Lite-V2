import type { ReactNode } from 'react';
export interface InputBarProps {
    /** The field's accessible name. */
    'aria-label': string;
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    /** The button's label ("Continue", "Scan"). */
    action: ReactNode;
    /** Sends: the button, or Enter in the field. */
    onAction: () => void;
    /** Before the field (the picked brand's logo). */
    leading?: ReactNode;
    disabled?: boolean;
    className?: string;
}
/**
 * A field with its button inside it (Gist GEO onboarding, "Question Box —
 * Input bar"): type and send in one place; Enter sends too. The box takes the
 * focus ring. Figma: `Input Bar`.
 */
export declare function InputBar({ value, onValueChange, placeholder, action, onAction, leading, disabled, className, ...rest }: InputBarProps): import("react").JSX.Element;
