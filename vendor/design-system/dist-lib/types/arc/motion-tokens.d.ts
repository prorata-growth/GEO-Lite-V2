/** Motion presets are shared by the gallery and future registry consumers. */
export declare const motionTokens: {
    readonly duration: {
        readonly instant: 0.12;
        readonly fast: 0.16;
        readonly exit: 0.18;
        readonly standard: 0.24;
        readonly considered: 0.48;
    };
    readonly ease: {
        readonly enter: readonly [0.16, 1, 0.3, 1];
        readonly exit: readonly [0.7, 0, 0.84, 0];
        readonly standard: readonly [0.22, 1, 0.36, 1];
        /** For elements that move while already on screen. */
        readonly inOut: readonly [0.65, 0, 0.35, 1];
    };
    readonly spring: {
        readonly responsive: {
            readonly type: "spring";
            readonly stiffness: 520;
            readonly damping: 38;
        };
        readonly gentle: {
            readonly type: "spring";
            readonly stiffness: 340;
            readonly damping: 34;
        };
        /** Presses, toggles, thumbs, and small indicators. Settles fast with a hint of life. */
        readonly snappy: {
            readonly type: "spring";
            readonly visualDuration: 0.26;
            readonly bounce: 0.12;
        };
        /** Panels, height changes, and layout shifts. Critically damped, never overshoots. */
        readonly smooth: {
            readonly type: "spring";
            readonly visualDuration: 0.4;
            readonly bounce: 0;
        };
        /** Shape morphs, shared layout highlights, and width changes that follow new content. */
        readonly morph: {
            readonly type: "spring";
            readonly visualDuration: 0.42;
            readonly bounce: 0.16;
        };
    };
    /** Stagger steps in seconds. Keep total stagger under roughly 0.4s. */
    readonly stagger: {
        readonly char: 0.016;
        readonly word: 0.04;
        readonly line: 0.08;
        readonly item: 0.035;
    };
    /** Blur radii in px for text and content crossfades. Keep blur small and brief. */
    readonly blur: {
        readonly subtle: 2;
        readonly soft: 4;
        readonly text: 8;
    };
};
