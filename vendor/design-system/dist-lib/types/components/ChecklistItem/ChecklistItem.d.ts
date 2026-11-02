import type { ReactNode } from 'react';
export type ChecklistItemStatus = 'todo' | 'done' | 'skipped';
export interface ChecklistItemProps {
    status?: ChecklistItemStatus;
    title: string;
    /** A secondary line under the title — e.g. the reason a step was skipped ("Skipped · Already done"). */
    description?: string;
    /**
     * The expandable body — guidance text, buttons, anything. Providing it makes
     * the row a disclosure with a chevron; omit it and the row is static.
     * Put calls to action inside the body (see `ChecklistActions`) rather than
     * beside the title, so a collapsed list stays quiet.
     */
    children?: ReactNode;
    /** Controlled open state. Omit to let the row manage its own. */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}
/**
 * One row of a `Checklist`: a status glyph, a title, and an optional
 * expandable body. Renders an `<li>`, so it belongs inside a `Checklist`
 * (or any `<ul>`).
 *
 * The status is shown by the glyph — dashed ring (to do), green check
 * (done), minus (skipped) — and also spoken, as visually-hidden text before
 * the title, since colour and shape alone aren't enough. A done title is
 * struck through; the line draws across when a step becomes done.
 *
 * Motion: the body unfurls (height, then its content fades in), the chevron
 * turns on the same clock, and the glyph pops and the strike draws when the
 * status *changes* — never on first render, so a list that mounts with
 * finished rows doesn't flicker. All of it is instant under
 * `prefers-reduced-motion`.
 */
export declare function ChecklistItem({ status, title, description, children, open, defaultOpen, onOpenChange, className, }: ChecklistItemProps): import("react").JSX.Element;
/** The buttons row at the bottom of a `ChecklistItem` body — keeps the 8px spacing between actions. */
export declare function ChecklistActions({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
