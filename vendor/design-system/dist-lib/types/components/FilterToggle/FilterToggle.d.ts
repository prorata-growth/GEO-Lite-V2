import type { InputHTMLAttributes, ReactNode } from 'react';
export type FilterToggleTone = 'default' | 'accent';
export type FilterToggleSize = 'default' | 'compact';
export interface FilterToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label: string;
    /**
     * `accent` (owner 10-15, sparingly): the accent tint, a blue switch when on,
     * and a soft glow while on, for the one toggle a row should draw the eye to.
     * Switched on by the user, a faint wash crosses it once (never on load).
     */
    tone?: FilterToggleTone;
    /** `compact`: 28px and 13px, to sit beside a compact `FilterDropdown`. */
    size?: FilterToggleSize;
    /**
     * What the toggle does, in a tooltip from an (i) button after the label
     * (owner 10-15). The button is its own control: it never flips the switch.
     */
    info?: ReactNode;
}
/**
 * A `Toggle` plus its own label, in the same bordered-pill shell as
 * `FilterDropdown`'s trigger — for a toolbar row mixing switches and
 * dropdown filters (e.g. "Include third-party media" next to "Branded only").
 * Not a dropdown itself: no panel, no popover, nothing to open — clicking the
 * switch just flips it immediately, same as using `Toggle` directly. Only the
 * switch is the click target, matching `Toggle`'s own real `<label>`+`<input>`
 * — the pill's own text is descriptive, not an additional hit area.
 */
export declare function FilterToggle({ label, tone, size, info, className, onChange, ...rest }: FilterToggleProps): import("react").JSX.Element;
