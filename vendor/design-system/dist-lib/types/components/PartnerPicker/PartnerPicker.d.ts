export interface PartnerPickerWebsite {
    value: string;
    label: string;
}
export interface PartnerPickerPartner {
    value: string;
    label: string;
    /** Its websites. A partner with websites opens them (a caret on its row). */
    websites?: PartnerPickerWebsite[];
}
/** `{}`: all partners. `{ partner }`: all of a partner's websites. `{ partner, website }`: one website. */
export interface PartnerPickerValue {
    partner?: string;
    website?: string;
}
export interface PartnerPickerProps {
    partners: PartnerPickerPartner[];
    value: PartnerPickerValue;
    onChange: (value: PartnerPickerValue) => void;
    /** Shows "Add partner" at the foot of the partners list. */
    onAddPartner?: () => void;
    /** Shows "Add website" at the foot of a partner's websites, and while searching. */
    onAddWebsite?: (partner?: string) => void;
    /** Names the picker for screen readers. Default "Partner". */
    label?: string;
    /** The "GIST" admin label above it: only Gist admins switch partners. Default true. */
    admin?: boolean;
    className?: string;
}
/**
 * Gist Answers: switches the partner or website an admin page shows. A
 * `GistAdminBadge` label over a large `ScopePicker`, opening a menu with a
 * find field; a partner with websites opens them, and a search lists
 * matching partners and websites in groups. Figma: `Partner Picker` (Gist
 * Answers (WIP) page). The menu's look is Answers' own (400px, on the page
 * grey); its parts are the shared components.
 */
export declare function PartnerPicker({ partners, value, onChange, onAddPartner, onAddWebsite, label, admin, className, }: PartnerPickerProps): import("react").JSX.Element;
