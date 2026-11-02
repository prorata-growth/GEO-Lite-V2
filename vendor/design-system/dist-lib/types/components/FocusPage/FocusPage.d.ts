import type { ReactNode } from 'react';
export type FocusPageWidth = 'narrow' | 'medium' | 'wide' | 'xwide';
export interface FocusPageProps {
    /** The headline (28px). Focus moves to it on mount, so each step announces itself. */
    title: ReactNode;
    /** A line under the headline (16px, secondary). */
    description?: ReactNode;
    /** Above the headline (a tag, a logo). */
    lead?: ReactNode;
    /** The step's body: fields, choices, an `InputBar`. */
    children?: ReactNode;
    /** The step's buttons (pass medium ones). Stacked full width, or side by side in the centre with `actionsLayout="row"`. */
    actions?: ReactNode;
    actionsLayout?: 'stack' | 'row';
    /** Under the actions, 14px secondary (a sign-in line, small print). */
    foot?: ReactNode;
    /** The column: `narrow` 482, `medium` 592, `wide` 792, `xwide` 1012 (with 16 of padding each side). Default `narrow`. */
    width?: FocusPageWidth;
    /** Centre the headline and line (a moment: welcome, done). */
    center?: boolean;
    /** Back, as an arrow beside the headline (in the gutter from 860px; above it on a phone). */
    onBack?: () => void;
    className?: string;
}
/**
 * A focus page: one centred column and nothing else (Gist GEO's onboarding and
 * one-off steps, owner 10-20; the welcome sibling of `FlowLayout`). The
 * headline, an optional line, the body, then the actions, 32 apart. The page
 * around it (a wordmark, step dots) is the product's. Figma: `Focus Page`.
 */
export declare function FocusPage({ title, description, lead, children, actions, actionsLayout, foot, width, center, onBack, className }: FocusPageProps): import("react").JSX.Element;
