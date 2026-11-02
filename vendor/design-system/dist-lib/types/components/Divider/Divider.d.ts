export interface DividerProps {
    /**
     * `default` (`--border-default`) or `subtle` (`--border-subtle`, fainter),
     * for separators inside lists and tables. Figma's `Tone`. The Sidebar's
     * dividers are subtle whatever this is set to.
     */
    tone?: 'default' | 'subtle';
}
/** Horizontal separator for grouping items within a Menu, a list or the Sidebar. */
export declare function Divider({ tone }: DividerProps): import("react").JSX.Element;
