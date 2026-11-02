export type TierBadgeTier = 'platinum' | 'gold' | 'silver';
export type TierBadgeLength = 'full' | 'short';
export interface TierBadgeProps {
    tier: TierBadgeTier;
    /** `full` ("Platinum 1", "Gold", "Silver"), `short` ("1", "G", "S") for dense rows. Figma `Length`. */
    length?: TierBadgeLength;
    className?: string;
}
/**
 * Gist Answers: a partner's tier. Figma: `Tier Badge` (Tier × Length, Gist
 * Answers (WIP) page). Its colours are its own tokens (`--background-tier-*`,
 * `--content-tier-*`). The short form keeps the full name as its accessible name.
 */
export declare function TierBadge({ tier, length, className }: TierBadgeProps): import("react").JSX.Element;
