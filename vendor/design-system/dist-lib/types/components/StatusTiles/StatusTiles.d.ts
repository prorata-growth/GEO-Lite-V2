export interface StatusTile {
    value: string;
    /** The status, e.g. "Needs attention". */
    label: string;
    /** The count; a number is formatted ("10,000"). */
    count: number | string;
    /** The recent change, shown as a small red pill, e.g. "+12 / 24h". */
    change?: string;
    /** Only Gist admins see this status: the Gist G after its name. */
    admin?: boolean;
}
export interface StatusTilesProps {
    tiles: StatusTile[];
    /** The selected status. */
    value: string;
    onChange: (value: string) => void;
    /** Names the group, e.g. "Ingestion status". */
    'aria-label': string;
    className?: string;
}
/**
 * Gist Answers: the row of status tiles over an ingestion table. Each tile
 * is a status with its count; the selected one filters the table. Figma:
 * `Status Tiles` (View=Admin | Partner) of `Status Card`s (Gist Answers
 * (WIP) page). A radio group: one tab stop, arrow keys move and select.
 */
export declare function StatusTiles({ tiles, value, onChange, 'aria-label': ariaLabel, className }: StatusTilesProps): import("react").JSX.Element;
