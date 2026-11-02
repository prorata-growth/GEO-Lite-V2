export interface ToastAction {
    /** The button's text, e.g. "Undo". */
    label: string;
    /** Runs on click; the toast then closes. */
    onClick: () => void;
}
export interface ToastOptions {
    /** How long it shows, in ms. Default 2600, or 6000 with an `action`. */
    duration?: number;
    /**
     * A text button at the toast's right, e.g. Undo (10-27, Gist GEO: a change
     * that costs credits applies at once, with Undo here instead of a confirm).
     * The toast stays longer and waits while the pointer or focus is on it.
     */
    action?: ToastAction;
}
export interface ToasterProps {
    className?: string;
}
/**
 * Show a short confirmation ("Copied", "Done. Re-measure when you're ready").
 * Needs one `<Toaster />` mounted in the app. A new toast replaces the one
 * showing.
 */
export declare function toast(text: string, options?: ToastOptions): void;
/**
 * Where toasts appear (Gist GEO, owner 10-08: "a small message instead of a
 * dead end"): bottom centre, over everything, the inverse surface. Mount once
 * at the app's root. Figma: `Toast`.
 */
export declare function Toaster({ className }: ToasterProps): import("react").ReactPortal | null;
