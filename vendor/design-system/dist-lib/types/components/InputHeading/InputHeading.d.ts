import type { LabelHTMLAttributes } from 'react';
export type InputHeadingSize = 'small' | 'medium' | 'large';
export interface InputHeadingProps extends LabelHTMLAttributes<HTMLLabelElement> {
    size?: InputHeadingSize;
}
/** The label that sits above an Input field. */
export declare function InputHeading({ size, className, children, ...rest }: InputHeadingProps): import("react").JSX.Element;
