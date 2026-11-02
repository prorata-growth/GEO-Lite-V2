import type { ReactNode } from 'react';
export type LoadingTextEffect = 'blink' | 'dots';
export interface LoadingTextProps {
    /** `blink`: the whole line fades down and back. `dots`: three trailing dots appear in turn. Defaults to `blink`. */
    effect?: LoadingTextEffect;
    /** The status itself — a short phrase without ending punctuation ("Measuring your engines"). */
    children: ReactNode;
    className?: string;
}
/**
 * A short status line for work in progress: "Measuring your engines" with a
 * quiet motion so it reads as alive. It is secondary text, a `status` region
 * that a screen reader announces, and it pairs with a `Spinner` or `Typing`
 * beside it or stands alone under a progress block.
 *
 * Under `prefers-reduced-motion` the line is still (and `dots` shows all three
 * dots), since the words carry the meaning.
 */
export declare function LoadingText({ effect, children, className }: LoadingTextProps): import("react").JSX.Element;
