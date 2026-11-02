import type { IconProps } from '@phosphor-icons/react';
type ArcIconProps = Omit<IconProps, 'size'> & {
    size?: number;
    strokeWidth?: number;
};
export declare const CalendarDays: ({ size: _size, strokeWidth: _strokeWidth, ...rest }: ArcIconProps) => import("react").JSX.Element;
export declare const ChevronDown: ({ size: _size, strokeWidth: _strokeWidth, ...rest }: ArcIconProps) => import("react").JSX.Element;
export declare const ChevronLeft: ({ size: _size, strokeWidth: _strokeWidth, ...rest }: ArcIconProps) => import("react").JSX.Element;
export declare const ChevronRight: ({ size: _size, strokeWidth: _strokeWidth, ...rest }: ArcIconProps) => import("react").JSX.Element;
export {};
