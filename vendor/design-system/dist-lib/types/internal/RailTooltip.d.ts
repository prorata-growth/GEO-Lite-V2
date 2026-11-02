import type { ReactElement } from 'react';
import type { TooltipProps } from '../components/Tooltip';
/**
 * The collapsed sidebar's labels: with no text in the rail, hovering or
 * focusing an item shows its name in a tooltip to the right. Shown only while
 * `enabled` (the sidebar is collapsed); expanded, the label is already on
 * screen. No arrow: it sits right beside the item it names (Figma's
 * `Tooltip`, `Tip=false`). Extra props (from a parent trigger, e.g. the
 * account menu's) pass through to the element.
 */
export declare function RailTooltip({ label, enabled, children, ...rest }: {
    label: string;
    enabled: boolean;
    children: ReactElement;
} & Omit<TooltipProps, 'content' | 'children'>): import("react").JSX.Element;
