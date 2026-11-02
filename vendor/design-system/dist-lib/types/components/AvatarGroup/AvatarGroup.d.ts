import { Avatar, type AvatarProps } from '../Avatar';
export interface AvatarGroupProps {
    /** Each entry renders as an Avatar, all sharing the same `size`. */
    avatars: Omit<AvatarProps, 'size'>[];
    /** Diameter in px for every Avatar in the stack — Figma's own examples use 30. */
    size?: number;
    /** Caps the visible stack at this many, replacing the rest with a "+N" circle. */
    max?: number;
    className?: string;
}
/** A row of overlapping Avatars, optionally capped with a "+N" overflow circle. */
export declare function AvatarGroup({ avatars, size, max, className }: AvatarGroupProps): import("react").JSX.Element;
export { Avatar };
