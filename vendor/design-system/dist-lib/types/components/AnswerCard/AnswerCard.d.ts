import type { ReactNode } from 'react';
import type { CitationChipProps } from '../CitationChip';
export interface AnswerCardProps {
    /** The AI engine that answered. */
    engine: string;
    /** Its logo; without one, the Avatar's initials. */
    engineLogo?: string;
    /** When it answered ("Oct 21"). */
    date: string;
    /** Whether the answer names your brand: a "Names you" / "Doesn't name you" Tag. Leave out for neither. */
    named?: boolean;
    /** Your prompt, as a chat bubble. Leave it out where the prompt is already the panel's title. */
    prompt?: string;
    /** The sentences before the mention, faded and softly blurred (context, hidden from screen readers). */
    before?: string;
    /** The mention itself, sharp. Mark your brand with `Highlight`. */
    children: ReactNode;
    /** The sentences after the mention, faded the other way. */
    after?: string;
    /** The sites the answer cites, as `CitationChip`s. */
    citations?: CitationChipProps[];
    /** Inside a widget that already frames it: no border or padding of its own. */
    flat?: boolean;
    className?: string;
}
/**
 * One AI answer, as a chat (owner 10-22: "more like an actual AI chat's
 * interface … fade the top and bottom and keep the line where we were mentioned
 * in focus plus highlight brewlune"). The engine, whether it names you and the
 * date on top; your prompt as a bubble on the right; the answer with the
 * sentences around the mention faded and softly blurred, the mention sharp;
 * the sites it cites as `CitationChip`s. Figma: `Answer Card`.
 */
export declare function AnswerCard({ engine, engineLogo, date, named, prompt, before, children, after, citations, flat, className }: AnswerCardProps): import("react").JSX.Element;
