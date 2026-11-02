import type { ReactNode } from 'react';
export interface Fact {
    label: string;
    value: ReactNode;
}
export interface FactStripProps {
    /** Names the strip for screen readers ("About this action"). */
    label: string;
    /** 2–4 facts, one cell each. */
    facts: Fact[];
    className?: string;
}
/**
 * A compact band of 2–4 label/value cells under a panel's title (owner 10-22:
 * "i liked these items when we had them at the top … but compact"). Under a
 * 480px container it folds to two columns. Figma: `Fact Strip`.
 */
export declare function FactStrip({ label, facts, className }: FactStripProps): import("react").JSX.Element;
