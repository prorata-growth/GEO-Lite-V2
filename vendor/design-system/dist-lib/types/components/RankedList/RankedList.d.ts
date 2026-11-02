import type { ReactNode } from 'react';
export interface RankedListItem {
    /** The brand's name, shown and used for the avatar's initials when there's no logo. */
    name: string;
    /** Logo image URL for the 24px avatar. */
    logo?: string;
    /** The short stat on the right, e.g. "Named 3 of 3". */
    stat: ReactNode;
    /** React key; defaults to `name`. */
    key?: string;
}
export interface RankedListMissing extends RankedListItem {
    /** What the row says instead of the name. Default "You". */
    label?: string;
}
export interface RankedListProps {
    /** Names the list, e.g. "Who AI names for “best espresso machine”". */
    'aria-label': string;
    /** The brands in the answer, in order. The first is the lead. */
    items: RankedListItem[];
    /**
     * Your brand when the answer leaves it out: a dashed row after the ranked
     * ones, rank "–", e.g. `stat: "Not named"`. Outside the ordered list, so it
     * isn't counted as a rank.
     */
    missing?: RankedListMissing;
    className?: string;
}
/**
 * An ordered list of the brands in an AI answer, each on a sunken fill, the
 * lead's rank and stat in the default colour (the rest secondary), and
 * optionally your brand, dashed, when
 * the answer leaves it out. A read-out, not navigation (rows that open
 * something are `ListRow`).
 */
export declare function RankedList({ 'aria-label': ariaLabel, items, missing, className }: RankedListProps): import("react").JSX.Element;
