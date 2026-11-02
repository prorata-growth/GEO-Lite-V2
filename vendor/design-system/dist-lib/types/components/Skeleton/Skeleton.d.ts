export type SkeletonShape = 'line' | 'block';
export interface SkeletonProps {
    /** `line` stands in for a line of text; `block` for a card, chart or image. */
    shape?: SkeletonShape;
    /** Size it to the content it replaces. Numbers are pixels. Defaults: line 100% × 12px, block 100% × 96px. */
    width?: number | string;
    height?: number | string;
    className?: string;
}
/**
 * A placeholder for content that is still loading: a quiet, rounded tint that
 * pulses slowly. Compose several into the shape of the real thing (a card, a
 * run of table rows) so the page doesn't jump when the content arrives.
 *
 * It is decorative (`aria-hidden`). Put `aria-busy="true"` on the region that
 * is loading, and give the region one accessible "Loading" message, rather than
 * making each placeholder announce itself.
 *
 * Under `prefers-reduced-motion` the pulse stops and it is a still placeholder.
 */
export declare function Skeleton({ shape, width, height, className }: SkeletonProps): import("react").JSX.Element;
