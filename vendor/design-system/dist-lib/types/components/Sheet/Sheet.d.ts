import type { ReactNode } from 'react';
export interface SheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** The sheet's name, in the Title style. It names the dialog. */
    title: ReactNode;
    /** A 14px secondary line under the title. It describes the dialog. */
    description?: ReactNode;
    /** A row under the title across the head (an action's facts). */
    meta?: ReactNode;
    /** Actions, right-aligned at the bottom. */
    footer?: ReactNode;
    children?: ReactNode;
    /** The expand button (fill the window). Default true. */
    expandable?: boolean;
    /** Controlled expanded state; otherwise the sheet keeps its own. */
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    /** The close button. Default true. */
    dismissible?: boolean;
    /** Clicking the scrim closes it. Default true. */
    closeOnOutsideClick?: boolean;
    /** Escape closes it. Default true. */
    closeOnEscape?: boolean;
    className?: string;
}
/**
 * The side sheet (owner 10-19, from Linda's console): for a task that doesn't
 * need what's on the left, a `Panel` slides in from the right, 8px off the
 * window's edges and 620px wide, over the scrim, so the page stays where it
 * was. Expand fills the window (square corners, the content in a centred 760
 * column). A Radix dialog: focus is trapped, Escape and the scrim close it, and
 * it stacks over another dialog (a sheet over the SettingsModal). Small yes/no
 * confirmations stay centred `Modal`s. Figma: `Sheet`.
 */
export declare function Sheet({ open, onOpenChange, title, description, meta, footer, children, expandable, expanded, onExpandedChange, dismissible, closeOnOutsideClick, closeOnEscape, className, }: SheetProps): import("react").JSX.Element;
