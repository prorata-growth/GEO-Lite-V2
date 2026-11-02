export interface PanelControlsProps {
    /** The panel is expanded (the button then offers to make it narrower). */
    expanded?: boolean;
    /** Shows the expand button. Leave it out for a close-only control. */
    onExpand?: () => void;
    /** Shows the close button. Leave it out for an expand-only control. */
    onClose?: () => void;
    /** The expand button's name while collapsed. Default "Expand". */
    expandLabel?: string;
    /** The expand button's name while expanded. Default "Narrower". */
    collapseLabel?: string;
    /** The close button's name. Default "Close". */
    closeLabel?: string;
    className?: string;
}
/**
 * Expand and close for a panel, in one pill (owner 10-19, from Linda's
 * console): 28px, raised, a 1px border, two round icon buttons in the
 * secondary grey with a hairline between. Used by `Panel` (the side `Sheet`
 * and the docked panel in a `SplitView`). Figma: `Panel Controls`.
 */
export declare function PanelControls({ expanded, onExpand, onClose, expandLabel, collapseLabel, closeLabel, className, }: PanelControlsProps): import("react").JSX.Element | null;
