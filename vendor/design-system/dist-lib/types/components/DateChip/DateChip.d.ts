export interface DateChipProps {
    /** Day abbreviation, e.g. "Wed". */
    day: string;
    /** Date number, e.g. "5". */
    date: string;
    /** Whether this chip is the one currently picked in its group. */
    selected?: boolean;
    onSelect?: () => void;
    disabled?: boolean;
    className?: string;
}
/**
 * A single-select day/date picker chip — one of a mutually-exclusive set
 * (radio-like), same selection semantics as `ChoiceChip` but its own fixed
 * two-line (day abbreviation over date number) shape rather than a single
 * label. Kept as a separate component instead of stretching `ChoiceChip`'s
 * label to accept arbitrary content, so each chip's own shape/contract stays
 * simple.
 */
export declare function DateChip({ day, date, selected, onSelect, disabled, className }: DateChipProps): import("react").JSX.Element;
