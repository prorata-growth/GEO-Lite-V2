/**
 * Enough to catch a typo, not enough to argue with a real address.
 *
 * Shared rather than copied: two screens now gate a button on it — the free
 * scan's "where do we send this" step and the Contact Sales booking — and a
 * validation rule that exists twice is one that eventually disagrees with
 * itself about what counts as an address.
 */
export const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
