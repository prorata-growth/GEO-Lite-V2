import * as RadixTooltip from '@radix-ui/react-tooltip';
import type { ComponentPropsWithRef, ReactElement } from 'react';
import type { ReactNode } from 'react';
export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export interface TooltipProps extends Omit<ComponentPropsWithRef<typeof RadixTooltip.Trigger>, 'children' | 'asChild' | 'content'> {
    /** The tooltip's own text/content. */
    content: ReactNode;
    /** A single element that triggers the tooltip on hover/focus — Radix clones it
     * to attach the trigger's ref and ARIA attributes, so it must accept both. */
    children: ReactElement;
    side?: TooltipSide;
    sideOffset?: number;
    /** Shows the pointing triangle — matches Figma's `tip` variant. */
    showArrow?: boolean;
    /** Hover delay before the tooltip appears, in ms. */
    delayDuration?: number;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
/**
 * A hover/focus label for an element that needs a short explanation. Visual
 * design (dark surface, radius, spacing, type) matches the Figma `Tooltip`
 * component exactly; placement, collision-avoidance, portal rendering, delay
 * timing, and ARIA wiring (`aria-describedby` on the trigger, `role="tooltip"`
 * on the content) all come from Radix rather than being hand-built — see
 * DESIGN_SYSTEM.md's note on why Radix backs this component.
 */
export declare function Tooltip({ content, children, side, sideOffset, showArrow, delayDuration, open, defaultOpen, onOpenChange, ...triggerProps }: TooltipProps): import("react").JSX.Element;
