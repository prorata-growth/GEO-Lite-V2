import { type ComponentPropsWithoutRef, type ReactElement } from 'react';
export interface AddTagChipProps extends ComponentPropsWithoutRef<'button'> {
    /** Shown after the + ("Tag" in a details panel). Without it the chip is icon-only (a table row). */
    text?: string;
}
/**
 * The dashed "+" chip that opens a TagMenu: tag height, the + at 12px, which
 * turns a quarter on hover or while the menu is open.
 */
export declare const AddTagChip: import("react").ForwardRefExoticComponent<AddTagChipProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface TagMenuProps {
    /** Every tag that can be picked. */
    tags: string[];
    /** For each tag, how many of the rows in scope have it (missing = 0). */
    counts: Record<string, number>;
    /** How many rows are in scope (1 for one prompt, n for a selection). */
    total: number;
    /** Add the tag to every row in scope (`on`), or remove it from every row. */
    onToggle: (tag: string, on: boolean) => void;
    /** A new tag, typed and confirmed: add it to every row in scope. */
    onCreate: (tag: string) => void;
    /**
     * What opens the menu. Default: the dashed `AddTagChip` (icon-only, or with
     * `chipText`). A bulk bar passes its own button (`<Button type="secondary"
     * size="small" trailingIcon={<CaretDown />}>Tags</Button>`).
     */
    trigger?: ReactElement;
    /** Text on the default chip ("Tag"). */
    chipText?: string;
    /** Names the default chip for screen readers. Default "Edit tags". */
    'aria-label'?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
/**
 * Tags for one row or a selection, in one menu (Gmail's "Label as", Linear's
 * labels): a find-or-create field and a list of tri-state tags. A tag is
 * checked when every row in scope has it and partly checked when some do;
 * picking adds it to all, or removes it from all when every row had it. The
 * order is fixed when the menu opens (tags already on the rows first), so rows
 * don't jump while you tick. Enter toggles an exact match or creates.
 */
export declare function TagMenu({ tags, counts, total, onToggle, onCreate, trigger, chipText, 'aria-label': ariaLabel, open, onOpenChange, }: TagMenuProps): import("react").JSX.Element;
