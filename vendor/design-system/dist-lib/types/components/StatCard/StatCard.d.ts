import type { ReactNode } from 'react';
import type { DeltaProps } from '../Delta';
export interface StatCardProps {
    /** The metric's name, in the header bar (14px medium). Also the card's accessible name. */
    label: ReactNode;
    /**
     * After the name, 4px on: an info tooltip (PATTERNS: InfoTip). Kept out of
     * the label so the card's name stays the metric's name, not the tooltip
     * button's ("What is Share of voice?").
     */
    info?: ReactNode;
    /** The number, already formatted (e.g. "18%"). */
    value: ReactNode;
    /**
     * A quiet scale after the value ("/100" after a score): 16px regular,
     * secondary, 2px on (Gist GEO's Site health, owner 10-19).
     */
    valueSuffix?: ReactNode;
    /** The change beside it, shown with the DS `Delta`. */
    delta?: Pick<DeltaProps, 'direction' | 'value' | 'aria-label'>;
    /** Colours the value by status, e.g. a count that is a problem. */
    tone?: 'success' | 'error';
    /** One supporting line under the value (12px secondary). */
    line?: ReactNode;
    /**
     * The breakdown that explains the number, behind a vertical subtle rule:
     * by engine, the leaders and you, what it depends on. Not decoration.
     */
    aside?: ReactNode;
    /**
     * `plain` (Gist GEO's Overview, owner 10-19): no header rule and no rule
     * between the value and the aside; the label in the secondary grey at
     * regular weight; the aside right-aligned. Default `default`.
     */
    variant?: 'default' | 'plain';
    className?: string;
}
/**
 * A top-row metric card (the owner's visual language, 10-12): a header bar
 * with the metric's name, then the value with its change and one line, and
 * the breakdown beside it. A read-out: not a link, no hover. Figma: `Stat Card`.
 */
export declare function StatCard({ label, info, value, valueSuffix, delta, tone, line, aside, variant, className }: StatCardProps): import("react").JSX.Element;
