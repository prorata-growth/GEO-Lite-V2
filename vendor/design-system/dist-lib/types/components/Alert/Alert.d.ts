import type { ReactNode } from 'react';
export type AlertStatus = 'info' | 'warning' | 'error' | 'success';
export interface AlertProps {
    status?: AlertStatus;
    title?: ReactNode;
    children: ReactNode;
    /** Overrides the default status icon. */
    icon?: ReactNode;
    /** Shows a close button; called when it's clicked. */
    onDismiss?: () => void;
    /**
     * `small` (Gist GEO's form steps, owner 10-21: the default read "too large"
     * in a form): a 14px medium title, 12px text, a 16px icon centred on the
     * title's line, 8 / 12 padding, a 24px close. Buttons inside it: `xsmall`.
     * Default `default`.
     */
    size?: 'default' | 'small';
    className?: string;
}
/** An inline status message with an icon, optional title, and an optional dismiss action. */
export declare function Alert({ status, title, children, icon, onDismiss, size, className }: AlertProps): import("react").JSX.Element;
