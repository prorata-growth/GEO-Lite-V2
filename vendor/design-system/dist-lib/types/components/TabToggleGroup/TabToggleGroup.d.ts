import type { ReactNode } from 'react';
import type { TabToggleSize } from '../TabToggle';
export interface TabToggleGroupProps {
    /** TabToggle elements — each automatically receives this group's `size`. */
    children: ReactNode;
    size?: TabToggleSize;
    /** Accessible name for the tablist, e.g. "View options". */
    'aria-label'?: string;
    className?: string;
}
/** The segmented-control track that holds a row of TabToggle pills. */
export declare function TabToggleGroup({ children, size, className, ...rest }: TabToggleGroupProps): import("react").JSX.Element;
