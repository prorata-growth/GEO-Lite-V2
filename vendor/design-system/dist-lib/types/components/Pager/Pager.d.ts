export interface PagerProps {
    /** How many objects there are. Under 2, nothing renders. */
    count: number;
    /** The one shown (0-based). */
    index: number;
    onChange: (index: number) => void;
    /** Names the group, e.g. "Goals". Default "Pages". */
    'aria-label'?: string;
    className?: string;
}
/**
 * One of several objects in a widget (goals, loops), shown one at a time: a
 * bar for the current one, a dot for each of the rest (each jumps to it), then
 * Next, which wraps to the first.
 */
export declare function Pager({ count, index, onChange, 'aria-label': ariaLabel, className }: PagerProps): import("react").JSX.Element | null;
