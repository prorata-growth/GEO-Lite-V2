import type { HTMLAttributes } from 'react';
export interface TabBarProps extends HTMLAttributes<HTMLDivElement> {
    /** Accessible name for the tablist, e.g. "Report sections". */
    'aria-label'?: string;
    /**
     * A 1px `border-default` baseline under the whole row (Gist GEO's page tabs,
     * owner 10-08), drawn inside the bar so nothing moves; the selected
     * underline paints over it.
     */
    bordered?: boolean;
}
/**
 * A row of `TabItem`s. Deliberately just a flex container with no fixed
 * count — Figma's own `Tab Bar` started life as a component with 7 hardcoded
 * tab instances, which meant every place that used it was locked to the same
 * 7 tabs. Converted there to a plain frame and mirrored here: `TabItem` is
 * the real reusable atom, `TabBar` just arranges however many a consumer
 * needs, no gap between items (each `TabItem`'s own padding provides the
 * spacing — see the design system log for why).
 *
 * The hover background is one shared element that glides from tab to tab,
 * like the selected underline, rather than each tab snapping its own on. It
 * stays invisible over the selected or a disabled tab (neither has a hover
 * state) but keeps tracking, so the glide continues past them.
 */
export declare function TabBar({ className, children, bordered, onPointerMove, onPointerLeave, ...rest }: TabBarProps): import("react").JSX.Element;
