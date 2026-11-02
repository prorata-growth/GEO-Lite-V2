import type { ReactNode } from 'react';
interface AccordionBaseProps {
    /** `AccordionItem`s. */
    children: ReactNode;
    className?: string;
}
export interface AccordionSingleProps extends AccordionBaseProps {
    /** At most one item is open; opening another closes it, and the open one can be closed again. */
    type: 'single';
    /** Controlled: the open item's `value`, or `null` for none. */
    value?: string | null;
    defaultValue?: string | null;
    onValueChange?: (value: string | null) => void;
}
export interface AccordionMultipleProps extends AccordionBaseProps {
    /** Any number of items can be open at once. */
    type: 'multiple';
    /** Controlled: the `value`s of the open items. */
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
}
export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;
/**
 * A stack of `AccordionItem`s that share one open/closed model — one at a time
 * (`type="single"`) or any number (`type="multiple"`). Items are separated by a
 * hairline and the stack has no chrome of its own, so it sits inside whatever
 * surface the page already has (a `Card`, a drawer, the page).
 *
 * Keyboard: Tab moves between item headers; Up/Down, Home and End move focus
 * between them too (the ARIA accordion pattern). Don't nest accordions — the
 * arrow keys would cross levels.
 */
export declare function Accordion(props: AccordionProps): import("react").JSX.Element;
export {};
