import type { ReactNode } from 'react';
export interface PropertyItem {
    /** A Phosphor icon; it's sized to 12px. */
    icon: ReactNode;
    /** What the value is ("Effort"), read before it by screen readers but not shown. */
    label: string;
    value: ReactNode;
    /** `positive`: an expected gain, icon and text in the success colour. */
    tone?: 'default' | 'positive';
}
export interface PropertyListProps {
    items: PropertyItem[];
    /** `divided` (default): a subtle rule between items. `spaced`: wider apart, no rules (roomy list rows). */
    spacing?: 'divided' | 'spaced';
    className?: string;
}
/**
 * An item's facts as icon + value on one line (an action's source, effort,
 * expected gain). Spans with list roles, so it fits in an inline slot such as
 * ListRow's `meta`. The last item truncates rather than wrapping.
 * Figma: `Property List`.
 */
export declare function PropertyList({ items, spacing, className }: PropertyListProps): import("react").JSX.Element;
