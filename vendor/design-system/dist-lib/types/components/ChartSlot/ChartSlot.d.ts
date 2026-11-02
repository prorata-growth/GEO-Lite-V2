import type { ReactNode } from 'react';
export interface ChartSlotProps {
    /** Real chart content — a donut, a line chart, a table, whatever the consumer renders. */
    children?: ReactNode;
    className?: string;
}
/** A sized, styled placeholder area for chart content. Renders a muted "Chart slot" placeholder until real content is passed in. */
export declare function ChartSlot({ children, className }: ChartSlotProps): import("react").JSX.Element;
