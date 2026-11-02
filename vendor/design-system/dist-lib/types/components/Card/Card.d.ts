import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
export type CardVariant = 'default' | 'object' | 'tile';
export type CardSize = 'default' | 'compact';
interface CardBaseProps {
    children: ReactNode;
    /**
     * `default`: a page-level card (24px padding, 20px gap, large radius).
     * `object`: the object a widget is about, nested inside it (20px padding,
     * 24px gap, 8px radius). `tile`: a small block inside a card, e.g. a stat
     * (8px padding and gap, 4px radius, the subtle border). Figma `Variant`.
     */
    variant?: CardVariant;
    /**
     * `compact`: a lighter page-level card, 16px padding and 12px gap (a grid
     * of small cards, e.g. findings). For the default variant. Figma `Size`.
     */
    size?: CardSize;
    /**
     * `inset`, for `object` and `tile` cards nested in another card (owner
     * 10-14): the page grey with a subtle border in light, a hair lighter than
     * the card in dark (the page colour read as a hole). Figma `Surface`.
     */
    surface?: 'default' | 'inset';
    /** `none` for a card whose parts pad themselves, e.g. a header strip over a body. */
    padding?: 'none';
    /** `none` when the children lay themselves out. */
    gap?: 'none';
    className?: string;
}
interface CardStaticProps extends CardBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
    href?: undefined;
    /**
     * Set when the whole card is clickable but there's no URL to link to
     * (e.g. `onClick` opens a modal or fires a callback) — gives the card
     * the same hover treatment as `href`, plus `role="button"`, a tab stop,
     * and Enter/Space activation, since a plain `onClick` div is otherwise
     * invisible to keyboard and screen-reader users. Don't set this on a
     * card that merely contains its own interactive controls (buttons, a
     * dropdown) — only when the card itself is the single click target.
     */
    clickable?: boolean;
}
interface CardLinkProps extends CardBaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> {
    /** Renders the whole card as a link — for a whole-card next-action, not a card that merely contains a link. */
    href: string;
    clickable?: undefined;
}
export type CardProps = CardStaticProps | CardLinkProps;
/**
 * A generic surface container — background, border, radius, and internal
 * spacing only. Compose with `CardHeader` + any content + an optional
 * footer as children; this component doesn't own layout beyond its own
 * padding and gap.
 */
export declare function Card({ className, children, variant, size, surface, padding, gap, ...rest }: CardProps): import("react").JSX.Element;
export {};
