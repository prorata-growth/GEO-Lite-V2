import { type ReactNode } from "react";
export interface Segment {
    value: string;
    label: string; /** Optional content after the label, such as a badge. */
    accessory?: ReactNode;
}
export interface SegmentedControlProps {
    options: Segment[];
    value: string;
    onValueChange: (value: string) => void;
    label?: string;
    /** Called when the pointer or focus reaches an option, before it is chosen. Use it to start loading what that option shows. */
    onOptionIntent?: (value: string) => void;
    /** `small`: 22px buttons and 12px labels, for a card header (Gist). */
    size?: "default" | "small";
    className?: string;
}
export default function SegmentedControl({ options, value, onValueChange, label, onOptionIntent, size, className }: SegmentedControlProps): import("react").JSX.Element;
