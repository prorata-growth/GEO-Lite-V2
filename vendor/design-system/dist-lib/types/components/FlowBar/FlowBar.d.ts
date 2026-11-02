import type { ReactNode } from 'react';
export interface FlowBarProps {
    /** Back: a step back, or out on the first step; that's the page's call. Without it the left is empty. */
    onBack?: () => void;
    backLabel?: string;
    /** Leave the flow (an X, no visible text). */
    onClose: () => void;
    /** Say you're leaving the flow ("Quit setup"). */
    closeLabel?: string;
    /** The steps, centred: a `Stepper`. Under a 700px bar it reads "Step 2 of 4". */
    steps?: ReactNode;
    className?: string;
}
/**
 * The bar over a creation flow (Linda's, owner 10-22: "the progress tabs and
 * quitting (just cross works no quit text needed)"). Back on the left, the
 * steps centred, the X on the right. Positioning (sticky) is the page's.
 * Figma: `Flow Bar`.
 */
export declare function FlowBar({ onBack, backLabel, onClose, closeLabel, steps, className }: FlowBarProps): import("react").JSX.Element;
