export interface ValueChipProps {
    /** What the value is ("Prompt"). */
    label: string;
    /** The value, one line; the full text shows in a tooltip when it's cut. */
    value: string;
    className?: string;
}
/**
 * A read-only label + value: the prompt behind a finding ("Prompt │ What's the
 * best coffee subscription?"). FilterDropdown's long-option anatomy without
 * anything that promises a menu: no caret, no hover, no tab stop.
 */
export declare function ValueChip({ label, value, className }: ValueChipProps): import("react").JSX.Element;
