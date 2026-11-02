import type { HTMLAttributes, ReactNode } from 'react';
export type TopicChipHue = 1 | 2 | 3 | 4 | 5 | 6;
export interface TopicChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onToggle'> {
    /**
     * Which of the 6 categorical colors to use. Assign via a stable hash of
     * the category's id (not its display text) so a rename doesn't reshuffle
     * colors or collide two categories that happen to hash the same text.
     */
    hue: TopicChipHue;
    /**
     * An optional 12px icon before the label — a publisher's mark, a category
     * glyph. Decorative (`aria-hidden`): the label already says what the chip is.
     * It takes the chip's text colour, and the chip keeps its 25px height.
     */
    leadingIcon?: ReactNode;
    /** `pill` (10-22): the same chip with a pill radius, as Tag `shape="pill"`. Default `default`. */
    shape?: 'default' | 'pill';
    /**
     * With `onToggle` (10-22, picking topics): the chip is a toggle button.
     * On: its hue and a 12px check before the label. Off: neutral (a
     * `border-default` outline, no fill, the secondary text).
     */
    selected?: boolean;
    /** Makes the chip a toggle (`aria-pressed`); called with the next state. */
    onToggle?: (selected: boolean) => void;
}
/**
 * A label for an arbitrary, user- or content-defined category (a topic, a
 * publisher, a tag someone typed in) — border + pale fill + text, colored
 * from the categorical palette. Not for status/semantic meaning (success,
 * warning, pending, etc.) — use Tag for that.
 */
export declare function TopicChip({ hue, leadingIcon, shape, selected, onToggle, className, children, ...rest }: TopicChipProps): import("react").JSX.Element;
