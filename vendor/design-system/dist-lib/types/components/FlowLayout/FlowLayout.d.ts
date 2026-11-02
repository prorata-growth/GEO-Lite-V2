import type { ReactNode } from 'react';
export interface FlowLayoutProps {
    /** The `FlowBar`; it sticks to the top. */
    bar: ReactNode;
    /** The step's question, as the page's h1. */
    title: ReactNode;
    description?: ReactNode;
    /** The step's content. */
    children?: ReactNode;
    /** The step's buttons (Continue, and the app's own Back), 24 under the content. */
    actions?: ReactNode;
    /** A live preview beside the step, from a 1000px container (above it below that). */
    preview?: ReactNode;
    className?: string;
}
/**
 * A creation flow's page (owner 10-22, Gist GEO, from Linda's flows): the
 * FlowBar sticky at the top, the step in a centred 520 column (title,
 * description, content, actions), and an optional preview beside it.
 * Fills its container's height. Figma: `Flow Layout`.
 */
export declare function FlowLayout({ bar, title, description, children, actions, preview, className }: FlowLayoutProps): import("react").JSX.Element;
