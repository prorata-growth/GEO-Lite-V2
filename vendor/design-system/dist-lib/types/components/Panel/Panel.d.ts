import type { ReactNode } from 'react';
export interface PanelProps {
    /** The panel's name, in the Title style. It labels the panel. */
    title: ReactNode;
    /** A 14px secondary line under the title. */
    description?: ReactNode;
    /** A row under the title across the head (an action's facts). */
    meta?: ReactNode;
    /** The head's top-right control, usually a `PanelControls`. */
    controls?: ReactNode;
    /** The foot: actions, right-aligned, behind a hairline. It stays at the bottom while the body scrolls. */
    footer?: ReactNode;
    /** Expanded to the window: the head, body and foot in a centred 760px column. */
    wide?: boolean;
    /** Escape pressed while focus is inside the panel (a docked panel closes on it; it isn't global). */
    onEscape?: () => void;
    /** The title's heading level. Default 2. */
    headingLevel?: 2 | 3 | 4;
    children?: ReactNode;
    className?: string;
}
/**
 * The surface the side `Sheet` and the docked panel in a `SplitView` share
 * (owner 10-19 / 10-22, from Linda's console): a head (title, description,
 * controls, an optional meta row) over a subtle rule, a body that scrolls, and
 * a foot of actions behind a rule. It fills its container's height; the
 * container places it. Figma: `Panel`.
 */
export declare function Panel({ title, description, meta, controls, footer, wide, onEscape, headingLevel, children, className }: PanelProps): import("react").JSX.Element;
