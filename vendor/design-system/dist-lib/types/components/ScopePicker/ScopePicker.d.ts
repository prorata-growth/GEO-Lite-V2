import type { ReactNode } from 'react';
import type { MenuPopoverProps } from '../MenuPopover';
export interface ScopePickerItem {
    value: string;
    label: string;
    /** A second line in the menu, e.g. "3 loops". */
    description?: string;
}
export interface ScopePickerProps {
    /**
     * What's being picked, e.g. "Goal": shown before the value at `medium`,
     * and part of the accessible name either way.
     */
    label: string;
    /** The choices. Leave empty when `children` supplies the whole menu. */
    items?: ScopePickerItem[];
    value?: string;
    onChange?: (value: string) => void;
    /** `accent`: on a mode band, in the accent ink (Insights › Deep analysis). */
    tone?: 'default' | 'accent';
    /**
     * `large`: the value alone at 28px (Accent/Tight/700), for a page whose
     * whole subject is the choice, e.g. the partner or website a Gist Answers
     * page shows. Default `medium`. Figma `Size`.
     */
    size?: 'medium' | 'large';
    /**
     * The trigger's text, when it isn't one of `items` (e.g. "All partners").
     * Defaults to the current item's label.
     */
    valueLabel?: string;
    /**
     * A whole custom menu in place of `items`: a product's own picker menu
     * (search, groups, drilling in), e.g. Gist Answers' PartnerPicker. Use with
     * `open`/`onOpenChange` and `menuProps` (often `closeOnSelect: false`).
     */
    children?: ReactNode;
    /** Controlled open state. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Passed to the MenuPopover: its own focus, closing and menu class. */
    menuProps?: Pick<MenuPopoverProps, 'initialFocus' | 'closeOnSelect' | 'menuClassName'>;
    className?: string;
}
/**
 * A labelled picker at headline size, "Goal │ <value> ⌄", that sets the scope
 * a page shows (owner 10-15, Insights › Deep analysis). It opens a menu of
 * the choices, the current one checked. `size="large"` shows the value alone
 * at 28px, for a page whose subject is the choice (a Gist Answers partner). For a filter among others in a row,
 * use FilterDropdown; this names and switches a whole page's scope.
 */
export declare function ScopePicker({ label, items, value, onChange, tone, size, valueLabel, children, open: openProp, onOpenChange, menuProps, className, }: ScopePickerProps): import("react").JSX.Element;
