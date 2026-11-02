import type { ReactNode } from 'react';
export interface WidgetProps {
    /** 16px medium. A real heading (see `headingLevel`), and the region's name. */
    title: ReactNode;
    /** After the title, "· meta" in 12px secondary, e.g. "3 updates". */
    meta?: ReactNode;
    /** On the right of the header bar: a small button or link. No › chevron here: the objects inside open themselves. */
    action?: ReactNode;
    /** Under the body, behind a subtle rule, e.g. "Updated 2 days ago". */
    footer?: ReactNode;
    /**
     * The header opens the widget's object (e.g. a goal's page): the title
     * becomes the link (`href`) or button (`onOpen`), its hit area covers the
     * bar, a 16px chevron sits on the right, and the bar takes the row hover.
     * Controls in `action` (a Tag, a menu) stay separate. Figma: `Opens`.
     */
    href?: string;
    onOpen?: () => void;
    /** The title's heading level. Default 3. */
    headingLevel?: 2 | 3 | 4;
    /**
     * `label` (default): 16px medium, for a short name ("This week"). `sentence`:
     * 16px regular, for a title that's a sentence (a finding, a goal); at the
     * label's weight a two-line sentence dominates the card (owner 10-13).
     */
    titleStyle?: 'label' | 'sentence';
    /**
     * `compact` (owner 10-14, Gist GEO: "too buffy/fat … it needs to feel
     * sleeker"): a header with a 14px title, insets at the card padding
     * (`--card-padding`, 24; 16 above and below the title), and the
     * meta in the tertiary grey, the header on the page grey. Its header is one title line tall whatever
     * the action: a 32px control overhangs the padding instead of growing it.
     * Default `default` (Gist Answers keeps it).
     */
    density?: 'default' | 'compact';
    children: ReactNode;
    className?: string;
}
/**
 * A card with a header bar (the owner's visual language, 10-12): the title
 * and an optional "· meta", a `border-subtle` rule, then the body inset 20px
 * (16px under the rule) with 12px between its parts, and an optional footer.
 * A labelled region. Figma: `Widget`.
 */
export declare function Widget({ title, meta, action, footer, href, onOpen, headingLevel, titleStyle, density, children, className }: WidgetProps): import("react").JSX.Element;
