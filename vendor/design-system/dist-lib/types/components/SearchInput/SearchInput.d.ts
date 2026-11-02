import type { InputHTMLAttributes } from 'react';
export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'onChange' | 'width'> {
    value: string;
    onValueChange: (value: string) => void;
    /** Small (32px) for toolbars, medium (40px) on its own. Default small. */
    size?: 'small' | 'medium';
    /** A fixed width (px, or any CSS length). Without it the field fills its container. */
    width?: number | string;
    /** Called after the clear button or Escape empties the field. */
    onClear?: () => void;
}
/**
 * A search field (owner 10-09/10-22, Gist GEO's toolbars and setup): the
 * primary `Input` with a magnifying glass, and once there's a value a clear
 * button that empties it and keeps focus in the field. Escape clears too.
 * Figma: `Search Input`.
 */
export declare function SearchInput({ value, onValueChange, size, width, onClear, placeholder, 'aria-label': ariaLabel, className, onKeyDown, ...rest }: SearchInputProps): import("react").JSX.Element;
