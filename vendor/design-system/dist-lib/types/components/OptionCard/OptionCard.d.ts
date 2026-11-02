import type { ReactNode } from 'react';
export type OptionCardType = 'radio' | 'checkbox';
export type OptionCardSize = 'medium' | 'small';
export interface OptionCardProps {
    /** `radio` = pick one of a set; `checkbox` = pick any number. Sets the ARIA role and the indicator shape (round check vs square box). */
    type?: OptionCardType;
    selected?: boolean;
    disabled?: boolean;
    label: string;
    /**
     * Optional secondary line under the label. Text, or a node (10-22): a line
     * with a credit cost `Tag` after it ("Weekly · <Tag>Uses 4 credits</Tag>").
     * Keep it non-interactive; the whole card is the button.
     */
    description?: ReactNode;
    /**
     * `small`: for choices inside a 14px form or a creation flow (owner 10-13:
     * the 18px label read oversized): 14px label, 12px description, 12px padding,
     * a 16px indicator. Default `medium`.
     */
    size?: OptionCardSize;
    /** Before the label: a logo or `Avatar size={20}` (a brand, an engine, an org), or an icon. */
    leading?: ReactNode;
    /** A radio can only be selected by clicking it, so it reports `true`; a checkbox reports the toggled value. */
    onSelectedChange?: (selected: boolean) => void;
    className?: string;
}
/**
 * A full-width, bordered card that is itself the selection target — the
 * "pick a topic" / "pick your engines" pattern, where the whole row is the
 * click area and the indicator sits at the trailing edge. Built as a real
 * `role="radio"` / `role="checkbox"` button (not a native input) because the
 * card, not a small control inside it, is what's interactive.
 *
 * Group behavior is the consumer's responsibility, same division of labor as
 * `ChoiceChip` / `Radio`: wrap radio cards in a `role="radiogroup"` and
 * enforce the one-at-a-time rule (and arrow-key movement, if wanted) yourself.
 */
export declare function OptionCard({ type, selected, disabled, label, description, size, leading, onSelectedChange, className, }: OptionCardProps): import("react").JSX.Element;
