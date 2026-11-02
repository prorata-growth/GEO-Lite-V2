/** The AI engines Gist GEO tracks, by the name the product shows. */
export type EngineName = 'ChatGPT' | 'Perplexity' | 'Google AI Overviews' | 'Claude' | 'Gemini';
/**
 * Each engine's mark (component audit #11, owner 10-08: "real engine logos"),
 * so every product shows the same ones. Square and opaque (192px; AI Overviews
 * 123px), for `Avatar`'s `src`: `<Avatar src={engineMarks.ChatGPT} alt="ChatGPT" size={16} />`.
 * In the package they're inlined as data URLs; the consumer serves nothing.
 */
export declare const engineMarks: Record<EngineName, string>;
