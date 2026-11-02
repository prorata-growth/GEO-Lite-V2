import type { ReactNode } from 'react';
export interface ComboboxOption {
    value: string;
    label: string;
    /** An icon, a color swatch (any styled span), or an image/avatar — Menu Item's
     * own leading-slot flexibility, carried over here. */
    leadingIcon?: ReactNode;
    /** E.g. an edit-pencil button on a "custom color" row that opens a color
     * picker — Combobox only exposes the click, it doesn't own that picker. */
    trailingIcon?: ReactNode;
    onTrailingIconClick?: () => void;
    disabled?: boolean;
    /** A quiet value at the right, before the check (10-29, Gist GEO: a place's kind, "Country"): MenuItem's meta. */
    meta?: ReactNode;
}
export interface ComboboxProps {
    options: ComboboxOption[];
    value?: string;
    onChange?: (value: string) => void;
    /**
     * `true`: the trigger itself is a real text input that filters the list
     * live as you type (e.g. a font picker) — no separate search field.
     * `false` (default): the trigger is a static button showing the selected
     * value, and the panel gets its own dedicated search field.
     */
    editable?: boolean;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    /** Shows a loading row instead of the list/empty-state — for async/remote options. */
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    'aria-label'?: string;
    /**
     * Shown in the trigger itself before anything is selected — e.g. a neutral
     * placeholder avatar for a "pick/confirm a brand" flow. Once a value is
     * selected, that option's own `leadingIcon` takes over automatically (same
     * swap the non-editable trigger already did) — this is only the fallback
     * shown when there's no confirmed selection yet, not shown alongside it.
     */
    triggerLeadingIcon?: ReactNode;
    /**
     * Replaces the trigger's caret entirely with a custom action (e.g. a
     * "Continue" button) — for flows where advancing is a distinct action from
     * opening the panel, not a toggle for it. Combobox doesn't own the action's
     * label, disabled state, or click handling — same as Modal's `footer` slot.
     */
    trailingAction?: ReactNode;
    /**
     * Editable mode only — fires with the raw typed text on every keystroke,
     * separate from `onChange` (which only fires on an actual selection). A
     * `trailingAction` that should activate as soon as there's *any* typed
     * input (not just a confirmed selection — e.g. freeform brand entry) needs
     * this, since Combobox doesn't otherwise expose its internal typed value.
     */
    onInputChange?: (value: string) => void;
    /**
     * Editable mode only. `false` (default): the panel opens on focus, showing
     * every option — the right call for browsing/discovery (e.g. a font
     * picker, where seeing the full list before typing is useful). `true`:
     * the panel stays closed until the user actually starts typing — for
     * flows where there's nothing useful to browse yet (e.g. confirming a
     * freely-typed value against live suggestions, not picking from a fixed
     * list you'd want to scan up front).
     */
    openOnTypeOnly?: boolean;
    /**
     * Opt-in "add your own" (10-27, Gist GEO's Add a prompt topic: pick one, or
     * add a new one). When the search (or, editable, the typed text) matches no
     * option exactly (case-insensitive, trimmed), the last row reads
     * `Add “<text>”`; it, or Enter in the field, calls this and closes the panel
     * like a pick. Enter with an exact match picks it, so nothing is added twice.
     * The parent adds the option and selects it.
     */
    onCreate?: (text: string) => void;
    /**
     * With `onCreate`, non-editable: the last row while the search is empty,
     * "+ Add your own" by default. It puts focus in the search field (one field,
     * not a second one in the list), whose placeholder becomes `createPlaceholder`.
     */
    createLabel?: string;
    /** The search field's placeholder after the "Add your own" row, e.g. "Name the topic". Default: `searchPlaceholder`. */
    createPlaceholder?: string;
    /**
     * A line under the panel's search (10-29, Gist GEO's place picker: "Target
     * a country, state or city."): what can be picked, said plainly rather than
     * hidden in the placeholder. Non-editable (it has the search) only.
     */
    hint?: string;
    /**
     * Option values to offer before anything is typed, under a "Recently used"
     * header (`recentLabel`), most recent first: only these show while the
     * search is empty; typing searches every option. Values not in `options`
     * are skipped.
     */
    recent?: string[];
    /** The header over `recent`. Default "Recently used". */
    recentLabel?: string;
}
export declare function Combobox({ options, value, onChange, editable, placeholder, searchPlaceholder, emptyMessage, loading, disabled, className, 'aria-label': ariaLabel, triggerLeadingIcon, trailingAction, onInputChange, openOnTypeOnly, onCreate, createLabel, createPlaceholder, hint, recent, recentLabel, }: ComboboxProps): import("react").JSX.Element;
