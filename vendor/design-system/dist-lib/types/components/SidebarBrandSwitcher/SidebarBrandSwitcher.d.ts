import type { ReactNode } from 'react';
export interface SidebarBrandSwitcherOption {
    id: string;
    label: string;
    avatar?: ReactNode;
}
export interface SidebarBrandSwitcherTab {
    id: string;
    label: string;
}
export interface SidebarBrandSwitcherProps {
    label: string;
    avatar?: ReactNode;
    /**
     * The switchable list, e.g. a client's own brands (GEO). Omit entirely for
     * a product with nothing to switch between (Gist Answers) — the trigger
     * then renders as a plain, non-interactive identity row with no caret.
     */
    options?: SidebarBrandSwitcherOption[];
    value?: string;
    onChange?: (id: string) => void;
    /**
     * An optional segmented control above the list — e.g. "Personal" vs
     * "Clients" for an agency switching between its own brands and a client's.
     * This component stays domain-agnostic on purpose: it doesn't know what
     * "Personal"/"Clients" means, only that there are tabs and one is active.
     * Swapping `options` to match the active tab is the consumer's job (the
     * same way it already owns `value`/`onChange`) — a client that itself has
     * multiple brands underneath it is deliberately out of scope here; that's
     * a separate, likely drawer-based, piece of future UI, not this menu.
     */
    tabs?: SidebarBrandSwitcherTab[];
    activeTabId?: string;
    onTabChange?: (id: string) => void;
    /**
     * A small label above the list, e.g. "Your brands" / "Your clients" —
     * same treatment as SidebarSection's own group header. Purely presentational
     * text the consumer computes from whichever tab is active; this component
     * doesn't infer it, for the same domain-agnostic reason `tabs` stays generic.
     */
    listEyebrow?: string;
    /** Shows a search field above the list, filtering `options` by label. */
    searchable?: boolean;
    searchPlaceholder?: string;
    /** Pinned below the list, unaffected by search filtering — e.g. "New brand". */
    onAddNew?: () => void;
    addNewLabel?: string;
    /**
     * The orgs you belong to, a level above the list (10-29, Gist GEO). The
     * panel opens on the org you're in: a plain org opens on `orgs`; the org
     * whose contents `options` are (`innerOrgId`, an agency's clients and
     * pitches) opens on that list, with a slim bar across the panel's top
     * ("‹ Other orgs", `orgsBackLabel`) that slides the panel over to `orgs`.
     * In `orgs`, that org's row has a › and slides back in. So every org is
     * switched from here, in any context.
     */
    orgs?: SidebarBrandSwitcherOption[];
    /** The org you're in, marked in `orgs`. */
    orgId?: string;
    /** The org in `orgs` whose contents are `options` (it drills in rather than switching). */
    innerOrgId?: string;
    onOrgChange?: (id: string) => void;
    /** The `orgs` eyebrow. Default "Your orgs". */
    orgsLabel?: string;
    /** The bar back to `orgs` from inside an org. Default "Other orgs". */
    orgsBackLabel?: string;
    orgsSearchPlaceholder?: string;
    className?: string;
}
/**
 * The sidebar header's brand/org identity — a real switcher when `options`
 * is provided (Popover + Menu, same plumbing as Combobox), or a static
 * identity row when it's not.
 */
export declare function SidebarBrandSwitcher({ label, avatar, options, value, onChange, tabs, activeTabId, onTabChange, listEyebrow, searchable, searchPlaceholder, onAddNew, addNewLabel, orgs, orgId, innerOrgId, onOrgChange, orgsLabel, orgsBackLabel, orgsSearchPlaceholder, className, }: SidebarBrandSwitcherProps): import("react").JSX.Element;
