export type DeltaDirection = 'up' | 'down' | 'flat';
export interface DeltaProps {
    direction: DeltaDirection;
    /** The delta text itself, already formatted by the consumer — e.g. "+8%", "-3", "0%". Formats vary too much (percentage, percentage-point, raw count, currency) to own here. */
    value: string;
    /** Overrides the default computed label ("increased by {value}" etc.) — provide when `value` alone doesn't read naturally out loud, e.g. a raw count. */
    'aria-label'?: string;
    /** `small`: 12px, a 12px arrow, for a delta beside small text (owner 10-14). Default `medium` (14px). */
    size?: 'medium' | 'small';
    className?: string;
}
/**
 * An up/down/flat trend indicator — icon + value, color-coded (green/red/
 * muted). Color alone isn't sufficient for the direction to be accessible,
 * so every instance carries a real text label too: the visible `value` text
 * plus a computed `aria-label` ("increased by 8%"), not just icon+color.
 *
 * Direction always maps to the same color (up=success, down=error,
 * flat=neutral) — this doesn't support inverting for metrics where a
 * decrease is the good outcome (e.g. cost, latency). Not a need surfaced by
 * any real consumer yet; add a `tone` override if one comes up rather than
 * guessing the shape now.
 */
export declare function Delta({ direction, value, size, 'aria-label': ariaLabel, className }: DeltaProps): import("react").JSX.Element;
