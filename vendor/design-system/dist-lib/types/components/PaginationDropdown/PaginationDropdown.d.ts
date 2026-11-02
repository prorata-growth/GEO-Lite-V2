export type PaginationDropdownSize = 'small' | 'medium' | 'large';
export interface PaginationDropdownProps {
    size?: PaginationDropdownSize;
    /** The results-per-page options, e.g. [10, 25, 50, 100, 200]. */
    options: (string | number)[];
    /** Currently selected value — shown on the trigger and checked in the list. */
    value: string | number;
    onChange: (value: string | number) => void;
    className?: string;
    'aria-label'?: string;
}
/** A self-contained results-per-page selector — trigger + the list that opens under it on click. */
export declare function PaginationDropdown({ size, options, value, onChange, className, ...rest }: PaginationDropdownProps): import("react").JSX.Element;
