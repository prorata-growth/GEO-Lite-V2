import type { ReactNode } from 'react';
export type SidebarStatusRowTone = 'default' | 'warning' | 'error';
export interface SidebarStatusRowProps {
    /** A 16px icon, e.g. Phosphor `Lightning`. */
    icon: ReactNode;
    /** One short line, e.g. "1,000 credits left". */
    label: string;
    /** `warning` (running low) or `error` (out): the label and icon take the status colour. */
    tone?: SidebarStatusRowTone;
    /** Opens what the line is about, e.g. Plan & billing. */
    onClick?: () => void;
    /** Names the row's button (with `onClick`) when the label alone doesn't say where it goes. */
    'aria-label'?: string;
    /** A trailing action, e.g. `{ label: 'Add', onClick }`. Omit it for none. */
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}
/**
 * A one-line status above the sidebar's account row (Sidebar's `status`
 * slot): credits left, and anything like it. Its label lines up with the nav
 * labels above. Sidebar hides it in the collapsed rail.
 */
export declare function SidebarStatusRow({ icon, label, tone, onClick, 'aria-label': ariaLabel, action, className }: SidebarStatusRowProps): import("react").JSX.Element;
