import type { ReactNode } from 'react';
export interface SettingsModalItem {
    id: string;
    label: string;
    disabled?: boolean;
}
export interface SettingsModalGroup {
    /** The group's label, e.g. "Account" — shown uppercase like a sidebar section. Omit for an unlabelled group. */
    label?: string;
    items: SettingsModalItem[];
}
export interface SettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** The side nav, as groups of sections. */
    groups: SettingsModalGroup[];
    /** Which section is showing. */
    activeId: string;
    onActiveChange: (id: string) => void;
    /** The content of the active section. It scrolls on its own; the nav stays put. */
    children: ReactNode;
    /** The heading above the content. Defaults to the active item's label. */
    sectionTitle?: string;
    /** The dialog's accessible name. Not shown (the design has no title row). Default "Settings". */
    title?: string;
    /** Shows the close (X) button in the top-right corner. Default true, as in Modal. */
    dismissible?: boolean;
    /** Clicking the scrim closes it. Default true. */
    closeOnOutsideClick?: boolean;
    /** Escape closes it. Default true. */
    closeOnEscape?: boolean;
    className?: string;
}
/**
 * Settings in a modal: a grouped side nav on the left and the active section
 * on the right, in a fixed frame of min(1080px, 100vw - 32px) by
 * min(760px, 100vh - 64px). The section pane scrolls on its own, so a long
 * section never moves the nav.
 *
 * Built from the system's own parts: Modal's dialog, scrim, motion and
 * surface (raised, radius-lg, shadow-lg); each nav group is a `SidebarSection`
 * and each entry a `SidebarNavItem` with no icon. Matches the Figma
 * `Settings Modal`, which has no title row: the dialog is named by `title`
 * (visually hidden), and closes with the corner close button (Modal's X),
 * Escape, or a click on the scrim. Switching sections returns the pane to
 * its top.
 *
 * Below 720px wide the nav moves above the content and scrolls sideways.
 */
export declare function SettingsModal({ open, onOpenChange, groups, activeId, onActiveChange, children, sectionTitle, title, dismissible, closeOnOutsideClick, closeOnEscape, className, }: SettingsModalProps): import("react").JSX.Element;
