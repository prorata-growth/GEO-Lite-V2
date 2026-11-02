# Composition Patterns

Screen/flow-level recipes — how real components combine into a working piece of UI.
`COMPONENTS.md` tells you what one component does; this file tells you how several of
them fit together into something a user actually sees, so building a new screen means
matching an existing recipe instead of re-deriving spacing/grouping decisions from
scratch.

**This file is only as good as the real screens it's extracted from.** Do not add a
pattern here speculatively — build the real screen first (in Storybook, from real
components), confirm it looks right, then extract the pattern below. An empty or
thin version of this file is an honest signal that composition-level precedent
doesn't exist yet, not something to fill in with guesses to look complete.

Format per pattern:
- **Where it's used** — the real screen(s) this came from
- **Components** — the exact pieces, in order
- **Layout** — the actual spacing/gap tokens between them
- **Notes** — anything non-obvious about why it's built this way

---

## Filter toolbar (dense, mixed filter types)

**Where it's used:** Extracted from building `FilterDropdown`/`FilterToggle`
(2026-09-07) against a real competitor reference — not yet confirmed against one of
*this* product's actual screens. Treat as a starting point, not settled precedent,
until a real screen using it is built and checked off below.

**Components, left to right:**
`FilterDropdown` (single-select, e.g. a date range) → `FilterDropdown` (multi-select,
e.g. a model filter, `leadingIcon` set) → `FilterToggle` (e.g. "Include third-party
media").

**Layout:** A flex row, `gap: var(--spacing-gap-200)` (8px) between each filter.
Each `FilterDropdown`/`FilterToggle` hugs its own content — no shared min-width, no
equal-width forcing. This is the entire reason `FilterDropdown` exists as a separate,
compact sibling to `Combobox`: a row of several of these needs to stay dense, not
stretch to match a form field's own padding.

**Notes:** Order filters by how often they're changed — the most-adjusted filter
(commonly a date range) goes first/leftmost, matching the reference this was built
against. Don't mix a `Combobox` into this row — if a filter here also needs
type-ahead search, that's a real gap in `FilterDropdown` to close (it doesn't have a
searchable single-select mode yet), not a reason to reach for `Combobox`.

**Real-screen checklist:** ⬜ not yet confirmed against an actual product screen.

---

## (add patterns here as real screens get built)

Suggested next patterns to extract, once Phase 2 of the roadmap builds them:
- A filtered data table (toolbar above + `Table` below + pagination)
- A settings panel (stacked `InputHeading`+`Input`/`Toggle` rows)
- An empty state (what goes where there's no data yet — icon, message, action)

Do not write these from imagination — build the real screen first.
