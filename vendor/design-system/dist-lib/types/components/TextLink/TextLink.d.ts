import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
export type TextLinkVariant = 'action' | 'inline' | 'lead';
interface TextLinkBaseProps {
    children: ReactNode;
    /**
     * `action` (default): a standalone text action (View, Dismiss, Export…),
     * medium, underlined on hover. `inline`: a link inside a sentence, always
     * underlined. `lead`: a line that leads somewhere ("Check whether AI can
     * read your site →"), secondary darkening on hover, its arrow sliding out
     * and back in once (owner 10-06 / 10-12).
     */
    variant?: TextLinkVariant;
    className?: string;
}
type TextLinkAnchorProps = TextLinkBaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: string;
};
type TextLinkButtonProps = TextLinkBaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'type'> & {
    href?: undefined;
};
export type TextLinkProps = TextLinkAnchorProps | TextLinkButtonProps;
/**
 * A text link: an `<a>` with `href`, a `<button>` otherwise. It takes the
 * surrounding text's size. For an action beside other buttons, use a ghost
 * `Button` so it matches their size.
 */
export declare function TextLink({ children, variant, className, ...rest }: TextLinkProps): import("react").JSX.Element;
export {};
