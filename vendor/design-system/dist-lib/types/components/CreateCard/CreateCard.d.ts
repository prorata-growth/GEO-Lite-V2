import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
interface CreateCardBaseProps {
    /** What it creates, e.g. "Add a goal". */
    title: string;
    /** One line on what happens next. Optional. */
    description?: string;
    /** Defaults to a plus. Any 20px icon. */
    icon?: ReactNode;
    className?: string;
}
type CreateCardLinkProps = CreateCardBaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'title'> & {
    href: string;
};
type CreateCardButtonProps = CreateCardBaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'title'> & {
    href?: undefined;
};
export type CreateCardProps = CreateCardLinkProps | CreateCardButtonProps;
/**
 * The "create" tile in a card grid: add a goal, a report, a loop. First or
 * last in the grid (this product puts it last), and fine alone in an empty
 * grid; use EmptyState only where the viewer can't create. A dashed outline at rest that turns solid on hover, with the icon
 * darkening; it fills its grid cell so it matches the cards beside it. A link
 * with `href`, otherwise a button. Figma: `Create Card`.
 */
export declare function CreateCard(props: CreateCardProps): import("react").JSX.Element;
export {};
