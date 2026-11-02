import type { CSSProperties } from 'react';
export interface AvatarProps {
    /** Photo URL — omit to render the placeholder look (or initials, with `name`). */
    src?: string;
    /**
     * The person's name. With no `src`, the avatar shows their initials (first
     * and last word, e.g. "Siddharth Hardikar" → "SH") on a category tint picked
     * from the name, so the same person always gets the same colour. Figma's
     * `type=initials`.
     */
    name?: string;
    alt?: string;
    /** Diameter in px. Figma's own standalone spec is 24; Avatar Group composes these at 30. */
    size?: number;
    className?: string;
    /** Merged with the size-driven width/height — AvatarGroup uses this for its overlap margin. */
    style?: CSSProperties;
}
/** "Siddharth Hardikar" → "SH"; "Alex" → "A"; an email uses the part before the @. */
export declare function initialsOf(name: string): string;
/** A circular user photo, the person's initials, or a plain placeholder. */
export declare function Avatar({ src, name, alt, size, className, style }: AvatarProps): import("react").JSX.Element;
