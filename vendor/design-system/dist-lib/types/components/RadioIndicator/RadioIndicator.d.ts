import type { HTMLAttributes } from 'react';
export interface RadioIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
    checked?: boolean;
}
/**
 * The standalone ring/dot visual — extracted as its own atomic component so
 * it can be reused anywhere a selection indicator is needed, not permanently
 * fused to a label. See `Radio` for the composed, accessible input.
 */
export declare function RadioIndicator({ checked, className, ...rest }: RadioIndicatorProps): import("react").JSX.Element;
