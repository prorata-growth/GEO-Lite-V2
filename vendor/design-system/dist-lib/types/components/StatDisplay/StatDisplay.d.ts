import type { DeltaDirection } from '../Delta';
interface StatDisplayBaseProps {
    /** Omit when the surrounding layout already identifies the metric (e.g. a compact row where a sibling line carries the label). */
    label?: string;
    /**
     * Plain-language line under the number — the brief bans
     * confidence-interval language, so this carries the meaning a number
     * alone could misstate (e.g. "Not enough data yet. First read by Oct 14").
     */
    context?: string;
    className?: string;
}
export interface StatDisplayValueDeltaProps extends StatDisplayBaseProps {
    form?: 'valueDelta';
    value: string;
    delta?: {
        direction: DeltaDirection;
        value: string;
    };
}
export interface StatDisplayBeforeAfterProps extends StatDisplayBaseProps {
    form: 'beforeAfter';
    before: string;
    after: string;
}
export type StatDisplayProps = StatDisplayValueDeltaProps | StatDisplayBeforeAfterProps;
export declare function StatDisplay(props: StatDisplayProps): import("react").JSX.Element;
export {};
