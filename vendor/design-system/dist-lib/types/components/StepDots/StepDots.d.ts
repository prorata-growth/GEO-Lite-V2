export interface StepDotsProps {
    /** The steps' names, for the label ("Step 2 of 3: Team"). */
    steps: string[];
    /** The current step, from 0. Leave it out to keep the dots' space but hide them (a step outside the sequence). */
    current?: number;
    className?: string;
}
/**
 * Where you are in a short sequence (Gist GEO's onboarding, goal setup and
 * product tour): 4px dots, 14 apart, the current one a 28px bar in the brand
 * gradient. For steps you can't jump between; for that, `Stepper`. Figma:
 * `Step Dots`.
 */
export declare function StepDots({ steps, current, className }: StepDotsProps): import("react").JSX.Element;
