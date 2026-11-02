import type { AnchorHTMLAttributes, ReactNode } from 'react';
export interface LinkRowProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'target' | 'rel'> {
    /** The page's address. */
    href: string;
    /** What to show for it, usually the address without its scheme. Truncates to one line. */
    children: ReactNode;
    /** The site's logo, e.g. a 20px `Avatar`. */
    leading?: ReactNode;
    className?: string;
}
/**
 * Another site's page as a row (owner 10-22, "the page you changed"): its
 * logo, the address and an open-in-new-tab icon, in a subtle box. Always
 * opens in a new tab. Figma: `Link Row`.
 */
export declare function LinkRow({ href, children, leading, className, ...rest }: LinkRowProps): import("react").JSX.Element;
