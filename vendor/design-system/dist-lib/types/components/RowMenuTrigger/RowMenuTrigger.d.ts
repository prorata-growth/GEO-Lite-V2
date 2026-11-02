import type { ButtonHTMLAttributes } from 'react';
export interface RowMenuTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** True while the menu it opens is showing — keeps the hover look even when the mouse isn't over it. */
    active?: boolean;
    /** Required — icon-only, no visible text to name it. */
    'aria-label': string;
}
/**
 * The small overflow trigger used at the end of a table row (Figma's
 * `.header-more`). Matches `TemplateCard`'s own options-button treatment —
 * same size, same square corner radius, same transparent-at-rest/single-hover-
 * wash behavior, same `DotsThree weight="bold"` — so the two "more options"
 * affordances read as one shared pattern rather than two different ones.
 */
export declare function RowMenuTrigger({ active, className, ...rest }: RowMenuTriggerProps): import("react").JSX.Element;
