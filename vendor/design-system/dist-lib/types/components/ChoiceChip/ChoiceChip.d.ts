export interface ChoiceChipProps {
    label: string;
    /** Whether this chip is the one currently picked in its group. */
    selected?: boolean;
    onSelect?: () => void;
    disabled?: boolean;
    className?: string;
}
/**
 * A single-select segmented chip — one of a mutually-exclusive set (radio-like),
 * unlike SuggestionChip which is a standalone action. The group's single-select
 * behavior (only one chip selected at a time) is the consumer's responsibility,
 * same division of labor as Radio/RadioIndicator.
 */
export declare function ChoiceChip({ label, selected, onSelect, disabled, className }: ChoiceChipProps): import("react").JSX.Element;
