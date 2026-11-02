import type { ReactNode } from 'react';
export interface SelectPillProps {
    children: ReactNode;
    /**
     * On or off: the pill toggles (`aria-pressed`). Leave it out for a plain
     * action pill (a suggestion to ask), which has no pressed state.
     */
    selected?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}
/**
 * A pill you pick (Gist GEO, Linda's selection pill, owner 10-19: "a new
 * option, not a replacement" for `ChoiceChip`, which GEO Lite keeps): 32px,
 * 12 at the sides; on, the accent tint with the accent border and label and a
 * filled check at its right. Figma: `Select Pill`.
 */
export declare function SelectPill({ children, selected, onClick, disabled, className }: SelectPillProps): import("react").JSX.Element;
export interface SelectPillsProps<T extends string> {
    options: {
        value: T;
        label: ReactNode;
    }[];
    /** The picked value, or the picked values with `multi`. */
    value: T | T[];
    /** Called with the pill's value; with `multi`, toggle it in your list. */
    onChange: (value: T) => void;
    /** Pick any number (a `group`); otherwise one (a `radiogroup`). */
    multi?: boolean;
    'aria-label': string;
    className?: string;
}
/** A set of `SelectPill`s, 8 apart, wrapping: pick one, or any number with `multi`. */
export declare function SelectPills<T extends string>({ options, value, onChange, multi, className, ...rest }: SelectPillsProps<T>): import("react").JSX.Element;
