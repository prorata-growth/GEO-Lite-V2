import type { ReactNode } from 'react';
export type ModalSize = 'small' | 'medium' | 'large';
export interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** small=400px, medium=560px (default), large=720px. */
    size?: ModalSize;
    title: string;
    /** Optional supporting text under the title. */
    description?: string;
    /**
     * An image, or any scrollable preview content — sits between the
     * description and the body, bleeding edge-to-edge (unlike everything else
     * in the modal) and scrolling independently within its own capped height,
     * so a tall image or long preview can't push the footer off-screen.
     */
    preview?: ReactNode;
    children: ReactNode;
    /**
     * Action buttons — a slot, not owned copy/callbacks. Compose it from the
     * real `Button` component (e.g. a Tertiary "Cancel" + Primary "Confirm", or
     * a Danger button for a destructive confirm) so Modal never has to guess
     * how many actions a given use case needs.
     */
    footer?: ReactNode;
    /** Shows the header's close (X) button. Default true. */
    dismissible?: boolean;
    /** Clicking the scrim closes the modal. Default true — set false for flows
     * where losing in-progress input (a form) would be costly. */
    closeOnOutsideClick?: boolean;
    /** Pressing Escape closes the modal. Default true, same reasoning as above. */
    closeOnEscape?: boolean;
    className?: string;
}
export declare function Modal({ open, onOpenChange, size, title, description, preview, children, footer, dismissible, closeOnOutsideClick, closeOnEscape, className, }: ModalProps): import("react").JSX.Element;
