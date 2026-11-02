import * as Dialog from '@radix-ui/react-dialog';
import type { ComponentProps, ReactNode } from 'react';
interface AnimatedDialogContentProps extends ComponentProps<typeof Dialog.Content> {
    open: boolean;
    children: ReactNode;
    overlayClassName?: string;
}
/**
 * Dialog's equivalent of AnimatedPopoverContent — same reasoning, same
 * forceMount + AnimatePresence approach so the exit transition gets to play
 * before Radix's Presence actually unmounts anything.
 *
 * The overlay needs the same "no asChild + motion.div" avoidance as Content
 * (see AnimatedPopoverContent's own note on this) — solved the same way:
 * Dialog.Overlay renders normally (Radix needs the real element for its own
 * outside-click detection) and a plain motion.div child inside it carries the
 * actual fill/fade, rather than replacing the Overlay via asChild.
 */
export declare function AnimatedDialogContent({ open, children, overlayClassName, className, ...contentProps }: AnimatedDialogContentProps): import("react").JSX.Element;
export {};
