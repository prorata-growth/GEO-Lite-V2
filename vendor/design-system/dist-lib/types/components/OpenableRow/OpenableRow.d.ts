import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
interface OpenableRowBase {
    children: ReactNode;
    /** The hover tint reaches 12px past the row's sides, as a list row's does (default). `false` keeps it flush. */
    bleed?: boolean;
    className?: string;
}
type OpenableRowButtonProps = OpenableRowBase & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'type'> & {
    href?: undefined;
};
type OpenableRowLinkProps = OpenableRowBase & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: string;
};
export type OpenableRowProps = OpenableRowButtonProps | OpenableRowLinkProps;
/**
 * A custom row that opens something (owner 10-22, Visibility's engine
 * standings: "it wasn't intuitive that i could click on these"). A button
 * (`onClick`) or a link (`href`) around your own layout, with a list row's
 * hover tint and the house focus ring; put a `RowChevron` in it. Layout and
 * placement stay yours. Inside a list, put the list role on a wrapper, not on
 * the row, so it stays a button. Figma: `Openable Row`.
 */
export declare function OpenableRow({ children, bleed, className, ...rest }: OpenableRowProps): import("react").JSX.Element;
export interface RowChevronProps {
    className?: string;
}
/** The "this opens" chevron: darkens and steps right while its `OpenableRow` is hovered or focused. Figma: `Row Chevron`. */
export declare function RowChevron({ className }: RowChevronProps): import("react").JSX.Element;
export {};
