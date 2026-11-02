export type TypingSize = 'sm' | 'md' | 'lg';
export interface TypingProps {
    /** 16 / 24 / 32px wide. Defaults to `md`. */
    size?: TypingSize;
    /** Accessible name when it stands alone ("Claude is writing"). Defaults to "Loading". */
    label?: string;
    className?: string;
}
/**
 * Three dots that rise and settle in turn: the "something is being written"
 * indicator, for a reply, a draft or a result that is on its way. Takes the
 * colour of the text around it. Use `Spinner` for a general wait and this for
 * the quieter, conversational one.
 *
 * Under `prefers-reduced-motion` the dots stop rising and the group breathes.
 */
export declare function Typing({ size, label, className }: TypingProps): import("react").JSX.Element;
