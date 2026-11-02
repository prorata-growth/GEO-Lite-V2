export interface AccordionContextValue {
    isOpen: (value: string) => boolean;
    toggle: (value: string) => void;
}
/** Set by `Accordion` so its `AccordionItem`s share one open/closed model; absent for a standalone item. */
export declare const AccordionContext: import("react").Context<AccordionContextValue | null>;
