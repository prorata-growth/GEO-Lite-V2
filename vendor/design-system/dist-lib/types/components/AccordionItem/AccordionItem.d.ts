import type { ReactNode } from 'react';
export interface AccordionItemProps {
    /** Identifies this item to its `Accordion`; needed to control which are open. Falls back to a generated id. */
    value?: string;
    title: string;
    /** A secondary line under the title — a summary of what's inside, or the current setting. */
    description?: string;
    /**
     * An icon, logo or small avatar before the title. Decorative: it is hidden
     * from assistive tech, so the title must say what it is. Sized to 20px.
     */
    leading?: ReactNode;
    /**
     * A `Tag` or short muted text just before the chevron — a status, a count,
     * a plan. It sits inside the header button, so it must not be interactive;
     * it is read as part of the button's name.
     */
    trailing?: ReactNode;
    /** The panel's content. */
    children: ReactNode;
    disabled?: boolean;
    /** The heading level the title is exposed as; pick the one that fits the page's outline. */
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    /**
     * The header hugs its title (10-22, Gist GEO): the chevron sits right after
     * the title and any `trailing` count ("Dismissed 2 ⌄"), not at the far
     * right. For a section toggle in a list; the panel still spans the width.
     */
    hug?: boolean;
    /** Standalone use (outside an `Accordion`): controlled open state. Ignored inside one. */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}
/**
 * One disclosure: a header (title, optional description, chevron) over a panel
 * that unfurls. Inside an `Accordion` it shares that group's open model; on its
 * own it is a single "show more" section ("Why we recommend this").
 *
 * The header is a real button inside a heading, with `aria-expanded` and
 * `aria-controls`; the panel is a labelled region. A separating hairline is
 * drawn above every item except the first, so a lone item has none.
 */
export declare function AccordionItem({ value, title, description, leading, trailing, children, disabled, headingLevel, hug, open, defaultOpen, onOpenChange, className, }: AccordionItemProps): import("react").JSX.Element;
