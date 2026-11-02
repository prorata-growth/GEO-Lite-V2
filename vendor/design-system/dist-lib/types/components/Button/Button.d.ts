import type { ButtonHTMLAttributes, HTMLAttributeAnchorTarget, ReactNode } from 'react';
export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'accent';
export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large';
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    /**
     * Pick by emphasis — one primary per screen/section. `accent`: a blue tint
     * for the one action that should stand out without being the primary
     * (e.g. "Connect to MCP"); use it sparingly.
     */
    type?: ButtonType;
    /**
     * `xsmall` (28px, 13px label, 14px icons): buttons inside cards and rows.
     * `small` (32px): page-level actions. `medium` (40) is the default.
     */
    size?: ButtonSize;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    /** Native `<button type>` (submit/reset/button) — defaults to 'button'. */
    htmlType?: 'button' | 'submit' | 'reset';
    /**
     * Work is in progress. The label is hidden behind a centred spinner but keeps
     * its space, so the button never changes size when it starts or stops, and it
     * keeps its colours (it is busy, not disabled). Clicks are ignored — including
     * a submit — while it is on, but it stays focusable so focus isn't lost
     * mid-action, and it is announced as busy.
     */
    loading?: boolean;
    /**
     * A link that looks like a button: renders an `<a>` (e.g. "Pricing" in a
     * nav bar, an action that goes to another page). `htmlType` doesn't apply.
     * Disabled, it keeps no href and is `aria-disabled`.
     */
    href?: string;
    /** With `href`: where it opens, e.g. `_blank`. */
    target?: HTMLAttributeAnchorTarget;
    /** With `href`: the link's relationship, e.g. `noopener noreferrer`. */
    rel?: string;
    /**
     * Hand the button's look and behaviour to its one child element, e.g. a
     * framework link that navigates client-side:
     * `<Button asChild><Link href="/pricing">Pricing</Link></Button>`. The
     * child keeps its own element and props; icons and `loading` still work.
     * Disabled, the child is `aria-disabled`, out of the tab order and ignores
     * clicks. `htmlType` and `href` don't apply.
     */
    asChild?: boolean;
    /** Fill the container's width, the label centred (10-22: a plan card's action). */
    fullWidth?: boolean;
}
/** The system's primary action control. */
export declare function Button({ type, size, leadingIcon, trailingIcon, htmlType, loading, href, target, rel, asChild, fullWidth, onClick, className, children, ...rest }: ButtonProps): import("react").JSX.Element;
