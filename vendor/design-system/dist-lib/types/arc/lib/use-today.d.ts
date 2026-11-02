/** The viewer's local date. Undefined on the server and during hydration, so markup never depends on the server clock or time zone; afterwards it follows the real date across midnight. */
export declare function useToday(): Date | undefined;
