import type { ReactNode } from 'react';
export type RecommendationStatus = 'todo' | 'done' | 'declined';
/** Where the recommended work happens — from the goal's media-scope setting (All media / owned only), not a content-type label. Tells the user whether they can act on it themselves. */
export type RecommendationScope = 'on-site' | 'third-party' | 'community';
export interface RecommendationCardProps {
    /**
     * e.g. "Medium", "Low" — effort or impact, whatever the consumer's
     * priority axis is. Optional: whether a priority label ships at all is
     * still an open product question, so this is easy to omit/hide rather
     * than a required slot.
     */
    priorityLabel?: string;
    scope: RecommendationScope;
    /** An optional content-type label (Article, Homepage, …) shown alongside the scope pill as plain secondary text — not itself color-coded, since scope already carries the pill's color. */
    contentType?: string;
    title: string;
    description: ReactNode;
    status: RecommendationStatus;
    onStatusChange?: (status: RecommendationStatus) => void;
    /** "View" is the quick action for recommendations that reference an external page — marking something Done happens through the status control, not a shortcut button. */
    onView?: () => void;
    /**
     * Fires on the Decline button click. This should open a reason-collection
     * step (a modal, option cards, etc.) rather than finalizing the decline
     * immediately — "declining needs a reason" is a product rule, and the
     * reason feeds the recommendation engine. This component only owns the
     * button; the reason flow is the consumer's responsibility.
     */
    onDecline?: () => void;
    className?: string;
}
export declare function RecommendationCard({ priorityLabel, scope, contentType, title, description, status, onStatusChange, onView, onDecline, className, }: RecommendationCardProps): import("react").JSX.Element;
