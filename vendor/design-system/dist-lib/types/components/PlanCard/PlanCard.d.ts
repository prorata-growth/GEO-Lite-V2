import type { ReactNode } from 'react';
export interface PlanItem {
    text: ReactNode;
    /** A quieter line under it ("Up to 10 at a time"). */
    note?: ReactNode;
}
export interface PlanCardProps {
    name: ReactNode;
    /** Who it's for, one or two lines. */
    description?: ReactNode;
    /** The price as shown ("$249", "Custom"). */
    price: ReactNode;
    /** After the price ("a month"). Leave it out for a custom price. */
    period?: ReactNode;
    /** Under the price ("Billed yearly", "Priced with sales"). */
    priceNote?: ReactNode;
    /** The plan's own button, at its own width. */
    action: ReactNode;
    /** A line above the list ("Everything in Pro, plus"). */
    lead?: ReactNode;
    items: PlanItem[];
    /** At the bottom (the engines it covers, an add-on). */
    footer?: ReactNode;
    className?: string;
}
/**
 * One plan in a pricing grid (Gist GEO's Plan & billing, owner 10-13: "feels
 * crowded not polished enough" with selectable cards): its name and who it's
 * for, the price, its own button, what's included, a footer. Put siblings in a
 * `PlanCardGroup` so their rows line up. Figma: `Plan Card`.
 */
export declare function PlanCard({ name, description, price, period, priceNote, action, lead, items, footer, className }: PlanCardProps): import("react").JSX.Element;
export interface PlanCardGroupProps {
    /** `PlanCard`s. */
    children: ReactNode;
    className?: string;
}
/**
 * Plans side by side (at least 240 each, wrapping), their rows lined up: the
 * prices, the buttons and the rules sit level even when one description runs
 * longer.
 */
export declare function PlanCardGroup({ children, className }: PlanCardGroupProps): import("react").JSX.Element;
