import type { ReactNode } from 'react';
export interface FeatureModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** The feature's name, in the Title style. It also names the dialog. */
    title: string;
    /** One line under the title (14px, secondary). */
    description?: ReactNode;
    /** One action, usually a primary `Button size="small"` ("Get started"). */
    action?: ReactNode;
    /** The art pane's content: an illustration or an animated diagram, centred. */
    art: ReactNode;
    /** The corner close (X). Default true. */
    dismissible?: boolean;
    /** Clicking the scrim closes it. Default true. */
    closeOnOutsideClick?: boolean;
    /** Escape closes it. Default true. */
    closeOnEscape?: boolean;
    className?: string;
}
/**
 * A first-time feature explainer (Gist GEO's Goals intro, owner 10-21; Figma
 * `Feature Modal`): a copy pane (the title, one line, one action) beside an art
 * pane on the page grey, and a corner close. No header row and no footer,
 * so it's its own component rather than a Modal layout; it shares Modal's
 * dialog behaviour, scrim, surface and close. Below 760px it's one column with
 * the art on top.
 */
export declare function FeatureModal({ open, onOpenChange, title, description, action, art, dismissible, closeOnOutsideClick, closeOnEscape, className, }: FeatureModalProps): import("react").JSX.Element;
