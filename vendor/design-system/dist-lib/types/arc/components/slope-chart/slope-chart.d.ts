import { type Ref } from "react";
export interface SlopeItem {
    /** Stable identity. An item keeps its line across datasets, so switching morphs it. */
    key: string;
    /** Name beside the start value, in the tooltip, and in the table. */
    label: string;
    /** Value in the first period. */
    start: number;
    /** Value in the second period. */
    end: number;
}
/** Use a slope chart to show how several items changed between exactly two moments, and how their order changed. */
export interface SlopeChartProps {
    data: SlopeItem[];
    /** What is measured, such as "Conversion rate by channel". Names the chart for assistive technology. */
    label: string;
    /** Heading of the first column, such as "Q1". */
    startLabel: string;
    /** Heading of the second column, such as "Q2". */
    endLabel: string;
    formatValue?: (value: number) => string;
    /** Formats the change in the tooltip. Defaults to the difference in formatValue's terms. */
    formatChange?: (change: number, item: SlopeItem) => string;
    /** Plot height in pixels. Defaults to 44 pixels per item. */
    height?: number;
    /** The item drawn in the accent, such as the one the story is about. */
    highlightKey?: string | null;
    /** Controlled item in focus. The others fade while one is in focus. */
    activeKey?: string | null;
    onActiveChange?: (key: string | null) => void;
    /** Rank movement beside each end value. */
    ranks?: boolean;
    emptyLabel?: string;
    ref?: Ref<HTMLElement>;
    className?: string;
}
export declare function SlopeChart({ data, label, startLabel, endLabel, formatValue, formatChange, height, highlightKey, activeKey, onActiveChange, ranks, emptyLabel, ref, className }: SlopeChartProps): import("react").JSX.Element;
export default SlopeChart;
