export type ProgressBarStatus = 'neutral' | 'success' | 'warning' | 'error';
export interface ProgressBarProps {
    /** Current amount — paired with `max`, not a raw percentage, so a consumer never has to do that math itself. */
    value: number;
    max?: number;
    /**
     * `neutral` (default) is plain informational usage — credits, plan
     * limits — not an achievement, so it isn't green. `success` claims an
     * actual achievement (e.g. an onboarding checklist) and should only be
     * used where that's really true. `warning`/`error` are near-limit /
     * at-limit states; the bar has no opinion on what counts as "near" —
     * pass it explicitly per consumer, since that threshold differs.
     */
    status?: ProgressBarStatus;
    className?: string;
    'aria-label'?: string;
}
/**
 * A linear progress/usage bar — track + fill, no label of its own. Matches
 * the Toggle/FilterToggle division of labor: this is the bare primitive,
 * consumers add their own label/count text per use case, since the exact
 * phrasing varies too much to own here ("1/3" for a checklist, "350 of 600
 * credits in use" for a usage meter). Extracted from SidebarActionItems,
 * which now composes this instead of owning its own track/fill markup.
 */
export declare function ProgressBar({ value, max, status, className, 'aria-label': ariaLabel }: ProgressBarProps): import("react").JSX.Element;
