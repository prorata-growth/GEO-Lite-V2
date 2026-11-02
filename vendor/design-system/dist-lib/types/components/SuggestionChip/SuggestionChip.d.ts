import type { ReactNode } from 'react';
export interface SuggestionChipProps {
    label: string;
    /** The avatar/logo for the suggested brand or entity — swappable per instance, same leading-slot convention as FilterDropdown/Combobox. */
    leading?: ReactNode;
    /** Click on the chip body — accepts the suggestion and advances the flow. */
    onSelect?: () => void;
    /** Click on the swap icon — requests a different suggestion without navigating away. */
    onSwap?: () => void;
    /** Hide the swap icon entirely — e.g. no alternate suggestion is available for this slot. Matches Figma's own `Show Swap Icon` boolean property. */
    showSwap?: boolean;
    disabled?: boolean;
    className?: string;
}
/**
 * An action chip offering one suggestion at a time (e.g. "try this brand
 * next") — clicking the chip body accepts it, clicking the swap icon cycles
 * to a different one in place. Distinct from a filter or choice chip: it has
 * no selected/toggled state of its own, it just fires an action.
 */
export declare function SuggestionChip({ label, leading, onSelect, onSwap, showSwap, disabled, className, }: SuggestionChipProps): import("react").JSX.Element;
