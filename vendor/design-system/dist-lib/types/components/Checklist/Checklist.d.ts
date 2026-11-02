import type { ReactNode } from 'react';
export interface ChecklistProps {
    title: string;
    /** With `total`, shows "{completed} of {total} completed" and a progress bar. Omit both for a plain list. */
    completed?: number;
    total?: number;
    /** `ChecklistItem`s. */
    children: ReactNode;
    /**
     * `compact` (10-22, Gist GEO's action panels): no icon tile, the title at a
     * Widget title's 16px medium, 16 above the header instead of 20, so it sits
     * at the same weight as the Widgets beside it. Figma `Size`.
     */
    size?: 'default' | 'compact';
    className?: string;
}
/**
 * A titled list of steps with overall progress — the "Get set up" list on
 * Home and the action plan's steps. A card surface holding a header (icon
 * tile, title, "N of M completed") with a full-width progress hairline under
 * it, above a stack of `ChecklistItem`s whose dividers run edge to edge.
 *
 * The surface uses `Card`'s colours, border and radius (see the stylesheet)
 * rather than wrapping `Card`, because the header and rows inset their own
 * content so that the hairline and dividers can span the card.
 *
 * The count is passed in rather than derived from the children: items are
 * free-form, so only the consumer knows which of them count as complete
 * (a skipped step, for instance, may or may not).
 */
export declare function Checklist({ title, completed, total, children, size, className }: ChecklistProps): import("react").JSX.Element;
