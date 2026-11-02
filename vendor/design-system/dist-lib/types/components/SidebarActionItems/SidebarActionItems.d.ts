export interface SidebarActionItemsProps {
    /** The card's title. Defaults to "Action items"; set it when that clashes with other names in the nav (e.g. "Getting started"). */
    title?: string;
    /** e.g. 1 of 3 — the label always reads "{completed}/{total}". */
    completed: number;
    total: number;
    /**
     * Provide to make the title/count/progress area a real button (e.g. to
     * open the actual checklist) — omit for a static, non-interactive card,
     * same fallback convention as SidebarFooter's own `onClick`.
     */
    onClick?: () => void;
    /** Provide to show the dismiss (X) button — omit to hide it entirely. */
    onDismiss?: () => void;
    className?: string;
}
/**
 * A dismissible onboarding-progress card for the top of the sidebar nav
 * (above the first nav item) — title, an "x/y" count, a thin progress bar,
 * and an optional dismiss button.
 *
 * The dismiss button is a sibling of the clickable area, not nested inside
 * it — buttons can't nest in valid HTML, and this card has two independent
 * actions (open the checklist vs. dismiss the card). The dismiss button is
 * positioned with plain absolute placement in the card's own top-right
 * corner instead of living inside the button's own layout, so the two
 * click targets never overlap or fight each other for space.
 */
export declare function SidebarActionItems({ title, completed, total, onClick, onDismiss, className }: SidebarActionItemsProps): import("react").JSX.Element;
