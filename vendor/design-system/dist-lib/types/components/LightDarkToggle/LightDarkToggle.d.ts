import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
export type ColorMode = 'light' | 'dark';
/** A colour mode that can also follow the device (`includeSystem`). */
export type ThemeMode = ColorMode | 'system';
interface TwoModeProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'children'> {
    /** Off (default): the two-mode switch, Sun and Moon. */
    includeSystem?: false;
    mode: ColorMode;
    onChange?: (mode: ColorMode) => void;
}
interface ThreeModeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
    /**
     * A third mode, "Match my device" (Gist GEO's Settings › Appearance, owner
     * 10-21): three slots (Sun, Moon, Desktop) under the same sliding
     * highlight, as a radio group with arrow keys and a tooltip on each.
     */
    includeSystem: true;
    mode: ThemeMode;
    onChange?: (mode: ThemeMode) => void;
}
export type LightDarkToggleProps = TwoModeProps | ThreeModeProps;
/**
 * A single switch showing both Sun/Moon icons at once. The dark highlight
 * circle slides between them (rather than one chip just popping visible/
 * invisible in place), and each icon rotates in/out with a slight spring
 * overshoot — both driven by one shared easing curve so the motion reads as
 * one coordinated gesture, not two unrelated effects. `includeSystem` adds a
 * third mode, "Match my device", as a three-slot radio group.
 */
export declare function LightDarkToggle(props: LightDarkToggleProps): import("react").JSX.Element;
export {};
