/**
 * Charts and their companions, and the date range picker, from Arc (uiarc.dev, Free tier, MIT — see
 * ./LICENSE). Each export wraps the unmodified Arc component in the Gist
 * theme (./theme.module.css), so it renders in Gist colours, Haffer, spacing
 * and radii, in light and dark, with no setup by the consumer.
 *
 * Kept self-contained so it can be removed cleanly if the data-viz redesign
 * goes another way: delete this folder and the "Arc" block in src/index.ts.
 * Never add an Arc *Pro* piece here — its licence forbids design systems.
 */
import type { ComponentProps } from 'react';
import { LineChart as ArcLineChart } from './components/line-chart/line-chart';
import { BarChart as ArcBarChart } from './components/bar-chart/bar-chart';
import { DonutChart as ArcDonutChart } from './components/donut-chart/donut-chart';
import { SlopeChart as ArcSlopeChart } from './components/slope-chart/slope-chart';
import { Sparkline as ArcSparkline } from './components/sparkline/sparkline';
import { AnimatedCounter as ArcAnimatedCounter } from './components/animated-counter/animated-counter';
import { MetricCard as ArcMetricCard } from './components/metric-card/metric-card';
import ArcSegmentedControl from './components/segmented-control/segmented-control';
import { DateRangePicker as ArcDateRangePicker } from './components/date-range-picker/date-range-picker';
export type LineChartProps = ComponentProps<typeof ArcLineChart>;
export type BarChartProps = ComponentProps<typeof ArcBarChart>;
export type DonutChartProps = ComponentProps<typeof ArcDonutChart> & {
    /** The readout in the ring's middle. Default: on at 160px and up, off below. */
    center?: boolean;
};
export type SlopeChartProps = ComponentProps<typeof ArcSlopeChart>;
export type SparklineProps = ComponentProps<typeof ArcSparkline>;
export type AnimatedCounterProps = ComponentProps<typeof ArcAnimatedCounter>;
export type MetricCardProps = ComponentProps<typeof ArcMetricCard>;
export type SegmentedControlProps = ComponentProps<typeof ArcSegmentedControl>;
export type DateRangePickerProps = ComponentProps<typeof ArcDateRangePicker>;
export type { DateRange, DateRangePreset } from './components/date-range-picker/date-range-picker';
export { defaultDateRangePresets } from './components/date-range-picker/date-range-picker';
/** A multi-series line chart: crosshair, legend toggles, ranges that morph. */
export declare function LineChart(props: LineChartProps): import("react").JSX.Element;
/** Bars for discrete categories or counts per bucket. */
export declare function BarChart(props: BarChartProps): import("react").JSX.Element;
/**
 * Share of a whole. `center`: the readout in the ring's middle (total, or the hovered slice).
 * Defaults to on at 160px and up and off below, where it can't fit (at 88px
 * it overflowed the ring and the figure spilled out of its container). Our
 * wrapper's own option; Arc's file is unchanged.
 */
export declare function DonutChart({ center, ...props }: DonutChartProps): import("react").JSX.Element;
/** Before and after for several items: one line each, from start to end. */
export declare function SlopeChart(props: SlopeChartProps): import("react").JSX.Element;
/** A tiny inline trend with no axes. */
export declare function Sparkline(props: SparklineProps): import("react").JSX.Element;
/** A number that rolls to its new value. */
export declare function AnimatedCounter(props: AnimatedCounterProps): import("react").JSX.Element;
/** A metric with its label, value and change — Arc's chart card companion. */
export declare function MetricCard(props: MetricCardProps): import("react").JSX.Element;
/** A small set of mutually exclusive options, e.g. a chart's 7d / 30d / 90d range. */
export declare function SegmentedControl(props: SegmentedControlProps): import("react").JSX.Element;
/**
 * A start and end date chosen together: the trigger grows into two months with
 * presets, and Apply sets the range. Sized to sit beside FilterDropdown
 * size="compact" in a filter bar. Days only, no time of day.
 */
export declare function DateRangePicker(props: DateRangePickerProps): import("react").JSX.Element;
