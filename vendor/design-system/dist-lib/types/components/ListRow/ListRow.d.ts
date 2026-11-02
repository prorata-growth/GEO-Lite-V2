import type { ReactNode } from 'react';
export type ListVariant = 'flush' | 'inset' | 'boxed';
export interface ListProps {
    /**
     * `flush` (default): full-bleed rows inside a bordered card, `border-default`
     * rules between them. `inset`: rows inside a widget body, inset 8px with a
     * rounded hover tint, `border-subtle` rules that fade beside the hovered row.
     * `boxed` (10-23, Gist GEO's Goals and Actions): flush rows in their own box,
     * `border-default`, the container radius, the raised surface, clipped; for a
     * list that sits on the page or a panel without a card around it.
     */
    variant?: ListVariant;
    /**
     * `roomy` (10-22, Gist GEO's Actions: "all we needed was roomier items"):
     * 16px above and below each row and 4px between its title and meta. Default
     * `default` (12 and 2).
     */
    density?: 'default' | 'roomy';
    /** `ListRow`s. The separators between them are drawn by the list. */
    children: ReactNode;
    'aria-label'?: string;
    className?: string;
}
/** A list of `ListRow`s with the rules between them. Figma: `List Row` (`Variant`); boxed, `List`. */
export declare function List({ variant, density, children, className, ...rest }: ListProps): import("react").JSX.Element;
export interface ListRowProps {
    title: ReactNode;
    /** One line under the title, in secondary text. */
    meta?: ReactNode;
    /** Before the text: a rank number, a 32px logo, an avatar. */
    leading?: ReactNode;
    /** At the end: a value, a status tag, a small bar, a ⋯ menu (its own buttons stay clickable). */
    trailing?: ReactNode;
    /** Opens something: makes the whole row a link, with the hover and chevron. */
    href?: string;
    /** Opens something: makes the whole row a button, with the hover and chevron. */
    onClick?: () => void;
    /** Quieter title, e.g. an archived item. */
    muted?: boolean;
    /**
     * The row open in a docked panel (10-22, a `SplitView`): held in the accent
     * tint and `aria-current`, so you can see which item the panel shows.
     */
    current?: boolean;
    /** Extra content under the main line (spans the row). */
    children?: ReactNode;
    className?: string;
}
/**
 * A row in a `List`. With `href` or `onClick` the whole row is the click
 * target: the title is a real link or button whose hit area stretches over
 * the row, so keyboard and screen-reader users get one named control, while
 * buttons in `trailing` (a ⋯ menu) sit above it and stay clickable on their
 * own. Hover or keyboard focus tints the row and the chevron darkens and
 * steps 2px right (240ms ease-in-out; no movement under reduced motion).
 */
export declare function ListRow({ title, meta, leading, trailing, href, onClick, muted, current, children, className }: ListRowProps): import("react").JSX.Element;
