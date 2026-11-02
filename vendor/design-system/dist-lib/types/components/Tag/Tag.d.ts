import type { HTMLAttributes, ReactNode } from 'react';
export type TagType = 'default' | 'success' | 'warning' | 'error' | 'info' | 'you';
export type TagSize = 'small' | 'medium' | 'large';
export type TagShape = 'default' | 'pill';
export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * `you` (Gist GEO, owner 10-19): your brand's own "You" among competitors,
     * solid in the series blue (`chart-categorical-1`) with inverse text, so it
     * matches your bar and line in the charts. Brands only: a person's "You"
     * (a team list) stays `default`.
     */
    type?: TagType;
    size?: TagSize;
    /**
     * `pill` (Gist GEO, owner 10-19): the same tag with a pill radius, for a
     * status read at a glance down a list (Overview's Insights card:
     * "Mentioned" / "Not mentioned"). Sizes and colours are Tag's own.
     */
    shape?: TagShape;
    /**
     * A Phosphor icon — pass `weight="bold"`, not `weight="light"` (Figma's
     * own annotation). Figma and code render the same named weight at
     * different effective visual density — matching Figma's "Light" literally
     * in code reads noticeably thinner than the text next to it, same
     * mismatch already found and fixed for Sidebar's own icons (see
     * DESIGN_SYSTEM.md). `bold` in code is what actually looks balanced
     * against this component's own 500-weight text.
     */
    leadingIcon?: ReactNode;
    /** Typically a dismiss "x" — renders smaller than leadingIcon, matching Figma. Same weight="bold" guidance as leadingIcon applies here too. */
    trailingIcon?: ReactNode;
}
/** A compact status/label indicator. Fill + text only — no border, by design. */
export declare function Tag({ type, size, shape, leadingIcon, trailingIcon, className, children, ...rest }: TagProps): import("react").JSX.Element;
