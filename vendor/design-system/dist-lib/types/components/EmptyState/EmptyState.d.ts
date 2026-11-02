import type { ReactNode } from 'react';
export interface EmptyStateProps {
    /** Optional (owner 10-22): an icon and a line can be enough. */
    title?: string;
    description?: string;
    /**
     * An icon or illustration. A bare icon is 24px; anything with its own size
     * (a larger icon, an illustration) keeps it.
     */
    icon?: ReactNode;
    /** A single call-to-action, typically a `<Button>` — omit to render no action at all. */
    action?: ReactNode;
    className?: string;
}
/**
 * A dashed placeholder frame for "nothing here yet" — an empty table, an
 * empty list, a not-yet-configured panel. Icon and action are both optional
 * so this covers everything from a bare "No results" message to a fully
 * actionable "Get started" prompt.
 */
export declare function EmptyState({ title, description, icon, action, className }: EmptyStateProps): import("react").JSX.Element;
