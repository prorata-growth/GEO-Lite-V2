export interface StepperProps {
    /** The steps' labels, in order. */
    steps: string[];
    /** The step you're on, from 0. */
    current: number;
    /** The furthest step reached so far (default `current`). Every step up to it, except the current one, shows as done. */
    reached?: number;
    /** Go to a step. Without it the steps are a read-only indicator. */
    onStepChange?: (index: number) => void;
    /** Any step can be clicked, not only the ones reached. */
    free?: boolean;
    /** Always show "Step 2 of 4" in place of the steps (it does on its own inside a container under 700px, e.g. `FlowBar`'s). */
    compact?: boolean;
    className?: string;
}
/**
 * The steps of a creation flow (Linda's flow bar, owner 10-22): numbered 20px
 * circles beside their labels, done ones ticked, the current one filled.
 * Under a 700px container it reads "Step 2 of 4". Figma: `Stepper`.
 */
export declare function Stepper({ steps, current, reached, onStepChange, free, compact, className }: StepperProps): import("react").JSX.Element;
