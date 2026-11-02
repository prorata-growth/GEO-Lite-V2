import type { Key, ReactNode } from 'react';
export interface SplitViewProps {
    /** The list (a table, a List, a page of rows). It stays mounted, narrowing while a panel is open. */
    list: ReactNode;
    /** The docked panel, usually a `Panel`; `null` for none. */
    panel?: ReactNode;
    /**
     * What the panel shows (a row's id). When it changes while the panel is
     * open, the new content fades in, so moving between rows reads as a swap.
     */
    panelKey?: Key;
    /** The panel fills the view and the list folds away (inert while hidden). */
    expanded?: boolean;
    className?: string;
}
/**
 * A list and a docked panel side by side (owner 10-22, from Linda's console:
 * Actions, Prompt monitoring, Notifications, Competitors). With no panel the
 * list takes the width; with one, the list narrows and the panel takes
 * min(620px, 50%) behind a hairline; `expanded` folds the list away. Each
 * scrolls on its own. In a container under 760px the panel replaces the list.
 * SplitView fills its parent's height, so give the parent one.
 *
 * When the panel closes, focus goes back to whatever opened it (the row).
 * Escape is the panel's: pass `onEscape` to `Panel` to close it from inside.
 * Figma: `Split View`.
 */
export declare function SplitView({ list, panel, panelKey, expanded, className }: SplitViewProps): import("react").JSX.Element;
