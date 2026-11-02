# Component Index

Fast lookup for "what exists and when do I use it" — separate from `DESIGN_SYSTEM.md`,
which is a chronological build log (the *why*). Read this file first when composing a
screen; go to `DESIGN_SYSTEM.md` only when you need the history behind an entry here.

**Every entry below is verified against real source as of the date shown.** An entry
not yet audited is marked `[ ] not yet written` — do not assume it is accurate; read
the component's own source/stories before using it, same as any component not listed
here at all.

Format per entry:
- **Purpose** — one sentence, the job this component does
- **Use when / Don't use for** — the disambiguating call, especially against
  near-duplicate components
- **Key props** — just the ones that drive a real decision, not the full API
- **Related** — other components it's commonly confused with or paired with
- **Source / Story** — exact paths, so "check the real component" is one click away

---

## Combobox
*Verified 2026-09-08*

**Purpose:** A form-field value picker — single-select, optionally type-ahead
(searchable), styled to match `Input` (it visually *is* a form field).

**Use when:** The value being picked is part of a record you're editing or creating
— status, assignee, font, color for a saved object.
**Don't use for:** A transient filter narrowing a view (table/dashboard toolbar) — use
`FilterDropdown` instead, even for the exact same option list (e.g. the same font list
can back a `Combobox` in a text-style panel and a `FilterDropdown` in a filter bar —
the split is about role, not data type).

**Key props:** `options: ComboboxOption[]` (each with optional `leadingIcon`,
`trailingIcon`), `editable` (type-ahead vs. click-only + its own search field),
`value`/`onChange`, `loading`, `disabled`. Also: `triggerLeadingIcon` (a
placeholder shown in the trigger until a value is confirmed — then the
selection's own `leadingIcon` takes over), `trailingAction` (replaces the caret
entirely with a custom element, e.g. a "Continue" button — for a setup/wizard
step where advancing is a distinct action from opening the panel), and
`onInputChange` (editable mode only — fires with the raw typed text on every
keystroke, separate from `onChange`'s confirmed-selection-only semantics; needed
whenever a `trailingAction` should activate on typed input alone, since Combobox
otherwise exposes no way to read what's currently typed). Also `openOnTypeOnly`
(editable mode, default `false`) — by default focus alone opens the panel to
browse everything (the font-picker case); set `true` when there's nothing useful
to browse before typing (e.g. confirming a freely-typed value). See `BrandEntry`
in `Combobox.stories.tsx` for the worked example all four were built for.

**Known limitation:** the trigger's leading-icon slot (`triggerLeadingIcon` /
a selected option's `leadingIcon`) is wrapped in a class hard-fixed at 20px
(`size-icon-md`, `flex: none`) — it cannot grow larger (e.g. to fill the
trigger's full height) without editing Combobox's own CSS. Confirmed
2026-09-08 while exploring exactly that; not fixed, since the need was a
one-off, not something to change for every consumer.

**Related:** `FilterDropdown` (toolbar-filter sibling), `MenuItem` (reused internally
for its non-editable rows).

**Source:** `src/components/Combobox/` · **Story:** `Components/Combobox`

---

## FilterDropdown
*Verified 2026-09-08*

**Purpose:** A compact, dense-toolbar filter — single or multi-select (checkbox rows),
opens a panel, never commits a value to a record.

**Use when:** Narrowing a view in a toolbar — date range, model, topic, any filter
sitting in a row of several other filters. Multi-select (`multiple`) when more than
one value can be active at once, with an aggregate trigger label ("All Models" / "2
selected").
**Don't use for:** A value that's part of a saved record — use `Combobox`. Don't add
a `compact` size to `Combobox` instead of using this — they're different jobs, not
different sizes of the same job (see `DESIGN_SYSTEM.md` 2026-09-07 for the reasoning).

**Key props:** `options`, `multiple`, single-mode `value`/`onChange`, multi-mode
`values`/`onValuesChange` + `allLabel` (shown when 0 or all are selected), `leadingIcon`
(trigger's own slot — a plain `ReactNode`, so it takes a single icon *or* an
`AvatarGroup` for a "which brands are selected" preview equally well; the wrapper
sizes to whatever's passed in, unlike Combobox's own leading-icon slot which is
hard-fixed at 20px — see `Combobox`'s "Known limitation" note above).

**Related:** `Combobox` (form-field sibling), `FilterToggle` (same toolbar family, no
panel), `MenuItem`/`Divider`/`CheckboxOption`/`AvatarGroup` (reused internally — its
multi-select rows are `CheckboxOption` instances passed a compact-sizing `style`
override, not an inline reimplementation).

**Source:** `src/components/FilterDropdown/` · **Story:** `Components/FilterDropdown`

---

## CheckboxOption
*Verified 2026-09-10*

**Purpose:** A selectable list row — checkbox, optional leading icon/logo, label.
Extracted from `FilterDropdown`'s own multi-select rows so the pattern doesn't have
to be rebuilt ad hoc elsewhere.

**Use when:** Any standalone "pick zero or more of these" list — a settings list, a
table row, a custom multi-select panel. `FilterDropdown` itself now composes this
rather than owning its own row markup.
**Don't use for:** A single accessible form checkbox with a label — use `Checkbox`
(a real `<label>`+`<input>` pair). This component is a `role="menuitemcheckbox"`
button, not a native input — right for a list/menu context, not a plain form field.

**Key props:** `checked`, `indeterminate`, `disabled`, `label`, `leadingIcon` (any
icon/swatch/avatar, same flexibility as `MenuItem`'s), `onCheckedChange`. Also three
CSS custom properties for a denser consumer to override without a dedicated prop:
`--checkbox-option-scale` (shrinks the checkbox), `--checkbox-option-font-size`,
`--checkbox-option-line-height` — pass them via the `style` prop; every default
matches Figma's real `Option/Checkbox` exactly (20px checkbox, 16px text) when
omitted. This is how `FilterDropdown` reproduces its own compact rows without
FilterDropdown-specific props leaking onto this component's public API.

**Related:** `Checkbox`/`CheckboxIndicator` (the glyph this reuses), `MenuItem` (the
non-checkbox sibling row pattern), `FilterDropdown` (its real consumer).

**Source:** `src/components/CheckboxOption/` · **Story:** `Components/CheckboxOption`

---

## AvatarGroup / Avatar
*Verified 2026-09-08*

**Purpose:** `Avatar` is a single circular photo (or blank placeholder with no
`src`). `AvatarGroup` is a row of overlapping `Avatar`s, optionally capped with a
`max` + a "+N" overflow circle.

**Use when:** Showing who/what a set of things represents at a glance — assignees,
members, or (as of 2026-09-08) a multi-select filter's currently-selected brands
via `FilterDropdown`'s `leadingIcon` slot.

**Key props (AvatarGroup):** `avatars` (array of `Avatar` props, minus `size`),
`size` (diameter in px, default 30 — Figma's own spec), `max` (caps visible count,
replacing the rest with "+N"). Overlap between avatars scales with `size`
(`-size/3`, matching the ~33% ratio Figma's own 30px examples use) — this used to
be a fixed `-10px`, which looked right only at `size=30` and overlapped far too
much (50%) at smaller sizes; fixed at the component level so it's correct at any
size, not just the one it happened to be tuned for.

**Related:** `FilterDropdown` (consumes it via `leadingIcon`).

**Source:** `src/components/Avatar/`, `src/components/AvatarGroup/` · **Story:**
`Components/Avatar/AvatarGroup`

---

## FilterToggle
*Verified 2026-09-07*

**Purpose:** A `Toggle` switch plus its own label, in the same bordered-pill shell as
`FilterDropdown`'s trigger — for a toolbar row mixing switches and dropdown filters.

**Use when:** A toolbar boolean that flips immediately on click — "Include
third-party media" style.
**Don't use for:** Anything that opens a panel — this has no popover at all, by
design; if you need options, use `FilterDropdown`.

**Key props:** `label`, plus every real `<input type="checkbox">` prop (`checked`,
`onChange`, `disabled`) — it's a thin wrapper, not a new state model.

**Related:** `Toggle` (what it wraps), `FilterDropdown` (toolbar sibling).

**Source:** `src/components/FilterToggle/` · **Story:** `Components/FilterToggle`

---

## Toggle
*Verified 2026-09-07*

**Purpose:** A standalone on/off switch — no label of its own, for rows where the
label lives elsewhere (a settings list row, a table cell).

**Use when:** You already have a label from context (a table column header, a settings
row's own text) and just need the switch.
**Don't use for:** A labeled, standalone toolbar toggle — use `FilterToggle`, which
pairs `Toggle` with its own label in the right shell.

**Key props:** `size` (`small`/`medium`/`large`), real `<input>` props (`checked`,
`onChange`, `disabled`).

**Related:** `FilterToggle` (adds the label + pill shell), `CheckboxIndicator` (the
equivalent glyph for checkboxes, not switches).

**Source:** `src/components/Toggle/` · **Story:** `Components/Toggle`

---

## Menu / MenuItem / Divider
*Verified 2026-09-07*

**Purpose:** `Menu` is the raised panel shell (padding, border, radius, background —
nothing else). `MenuItem` is one actionable row inside it (icon + label + icon,
Small/Medium/Large). `Divider` groups rows within a `Menu`.

**Use when:** Building *any* dropdown/menu-shaped panel — these three are the actual
reusable primitives underneath `Combobox` and `FilterDropdown`'s panels. Reach for
these directly only when building a new panel-shaped component; don't rebuild panel
chrome from scratch.
**Don't use for:** A checkbox row inside a panel — `MenuItem` has no checkbox slot;
see `FilterDropdown`'s own `Filter Checkbox Row` pattern in `DESIGN_SYSTEM.md` if you
need one, or build a sibling the same way rather than bolting a checkbox onto
`MenuItem` itself (other consumers rely on its current shape).

**Key props (MenuItem):** `label`, `size`, `leadingIcon`, `trailingIcon` — icons render
at a fixed 20px regardless of `size` (no auto-scaling with text — see the 2026-09-07
`DESIGN_SYSTEM.md` entry on this if a smaller context needs smaller icons; you'll need
to size them yourself via inline `style`, not the icon's own `size` prop, since CSS
beats an SVG's own size attributes).

**Related:** `Combobox`, `FilterDropdown` (both built on these).

**Source:** `src/components/Menu/`, `src/components/MenuItem/`, `src/components/Divider/`

---

## CheckboxIndicator
*Verified 2026-09-07*

**Purpose:** The standalone checkbox visual (box + check/minus glyph) — extracted
from the full `Checkbox` so it can be reused inside a custom row (e.g.
`FilterDropdown`'s checkbox rows) without pulling in `Checkbox`'s own accessible
`<label>`+`<input>` structure.

**Use when:** You're building your own clickable row (a `<button>`, not a `<label>`)
and just need the visual glyph, driving `checked` from your own state.
**Don't use for:** A standalone settings-form checkbox with its own label — use the
full `Checkbox` component, which already wires the accessible input+label pair
correctly.

**Key props:** `checked`, `indeterminate`.

**Related:** `Checkbox` (the full accessible component this glyph was extracted from).

**Source:** `src/components/CheckboxIndicator/`

---

## Tooltip
*Verified earlier this session (pre-2026-09-07 compaction) — re-check before relying on exact prop names.*

**Purpose:** A hover/focus hint, built on `@radix-ui/react-tooltip`.

**Use when:** A short, non-essential hint on hover/focus.
**Don't use for:** Anything that needs to be read by a screen reader without
hovering, or content requiring interaction — use a real visible label or a popover
pattern instead.

**Source:** `src/components/Tooltip/`

---

## Modal
*Verified 2026-09-08*

**Purpose:** A dialog surface over a scrim — confirmations, forms, or any focused
task that interrupts the current screen. Built on `@radix-ui/react-dialog`.

**Use when:** The user needs to focus on one task/decision before returning to
the page underneath (a confirm/delete flow, an edit form, a required setup step).
**Don't use for:** A dropdown/menu/tooltip-shaped overlay anchored to a trigger
element — those don't dim the page or trap focus; use `Combobox`/`FilterDropdown`/
`Menu`/`Tooltip` instead.

**Key props:** `open`/`onOpenChange`, `size` (`small`=400px/`medium`=560px
default/`large`=720px), `title` (required), `description` (optional supporting
text), `children` (the body — scrolls independently if it overflows),
`footer` (a slot, not owned copy/callbacks — compose real `Button`s into it,
same reasoning as `Combobox`'s `trailingAction`), `preview` (an image or any
scrollable preview content, sitting between `description` and body — bleeds
edge-to-edge unlike everything else in the modal, and scrolls independently
within its own capped 240px height so a tall image can't push the footer
off-screen). `dismissible` (shows/hides the close X, default true),
`closeOnOutsideClick`/`closeOnEscape` (default true each — set false for a
flow where losing in-progress input would be costly, e.g. a form mid-fill).

**Related:** `IconButton` (the close button), `Combobox`/`FilterDropdown`
(share the same z-index-stacking awareness — both render at z-index 200,
above Modal's own 101, so a dropdown nested inside an open modal still
renders on top of it, a real supported composition).

**Source:** `src/components/Modal/` · **Story:** `Components/Modal`

---

## SuggestionChip
*Verified 2026-09-10*

**Purpose:** An action chip offering one suggestion at a time — e.g. "try this
brand next." Clicking the chip body accepts the suggestion and advances the
flow; clicking the trailing swap icon cycles to a different suggestion in
place, without navigating away.

**Use when:** A single-suggestion prompt where the user can either accept it
or ask for another option, with no toggled/selected state of its own (e.g. a
"try a sample brand" step). **Don't use for:** a toggleable filter (`Tag`, or
a future `FilterChip`), a mutually-exclusive single-select set (`ChoiceChip`,
planned), or a removable/dismissible tag representing entered data (no chip
for that yet — not built, don't improvise one).

**Key props:** `label`, `leading` (any avatar/logo/icon — same swappable
leading-slot convention as `FilterDropdown`/`Combobox`, real usage is the
`Avatar` component; omit to hide it), `onSelect` (whole-chip click), `onSwap`
(swap-icon click, `stopPropagation`'d so it never also fires `onSelect`),
`showSwap` (default true — set false to hide the swap icon entirely when no
alternate suggestion exists for that slot), `disabled`. Figma mirrors both
visibility toggles as real component properties (`Show Avatar`, `Show Swap
Icon`), matching `CheckboxOption`'s own `Show Leading Icon` convention.

**Related:** `Avatar` (the real leading content in practice), `Tag` (the
plain fill-only label chip this is not — `SuggestionChip` is stroke +
raised-surface, reads as a small standalone action rather than an inline
status label).

**Source:** `src/components/SuggestionChip/` · **Story:** `Components/SuggestionChip`

---

## ChoiceChip
*Verified 2026-09-10*

**Purpose:** A single-select segmented chip — one of a mutually-exclusive set,
radio-like. Built from the same pasted "Choice chips" reference as
`SuggestionChip`'s neighbor concept, but as its own dedicated component rather
than restyled `Button` instances, since the treatment may diverge later and a
persistent selected-state ring is a real requirement.

**Use when:** A small, fixed set of mutually-exclusive options where only one
can be active at a time (e.g. "Brand / Publisher / Creator / Agency"). **Don't
use for:** a multi-select toggle (`Tag`, or a future `FilterChip`), or a
one-off action with no persistent state (`SuggestionChip`).

**Key props:** `label`, `selected`, `onSelect`, `disabled`. The group's
single-select behavior (only one chip selected at a time, wrapping them in
`role="radiogroup"`) is the consumer's responsibility — same division of
labor as `Radio`/`RadioIndicator`. A disabled + selected chip always renders
as disabled first (Figma has no combined variant for this; the CSS is
ordered so `:disabled` wins the cascade over `.selected`).

**Related:** `Button` (the component the pasted reference actually reused,
and the shape `ChoiceChip` still visually matches — 40px height,
`spacing/padding/400`, `border/radius/md`), `SuggestionChip` (the sibling chip
built the same day, a standalone action rather than a persistent choice).

**Source:** `src/components/ChoiceChip/` · **Story:** `Components/ChoiceChip`

---

## DateChip
*Verified 2026-09-10*

**Purpose:** A single-select day/date picker chip — same selection semantics
as `ChoiceChip` (one active at a time, dark fill + ring when selected), but
its own fixed two-line shape (a day abbreviation over a date number) rather
than a single text label.

**Use when:** Picking one day from a short visible list (e.g. a week strip in
a scheduling flow). **Don't use for:** a generic labeled single-select set —
use `ChoiceChip` for that; this exists specifically for the day-abbreviation
+ date-number shape.

**Key props:** `day`, `date`, `selected`, `onSelect`, `disabled`. Same
division of labor as `ChoiceChip`: the single-select group behavior (only one
chip selected, `role="radiogroup"` wrapper) is the consumer's responsibility.
Same disabled-wins-over-selected cascade ordering as `ChoiceChip` too.

**Related:** `ChoiceChip` (identical selection semantics and the same
`background-surface-page` + `border-focus` double-ring technique for the
selected state — the two components share a concept, just not a shape).

**Source:** `src/components/DateChip/` · **Story:** `Components/DateChip`

---

## EmptyState
*Verified 2026-09-14*

**Purpose:** A dashed placeholder frame for "nothing here yet" — an empty
table, an empty list, a not-yet-configured panel. Icon and action are both
optional, covering everything from a bare "No results" message to a fully
actionable "Get started" prompt.

**Use when:** A view has genuinely no content to show and the user needs to
know why, or what to do next. **Don't use for:** a loading state (this reads
as permanent-empty, not "still fetching"), or an error state (there's no
error-status styling here — reach for `Alert` for that).

**Key props:** `title` (required), `description`, `icon` (any `ReactNode` —
swappable per context, same convention as `MenuItem`/`FilterDropdown`'s own
leading-content slots), `action` (typically a `<Button>`; omit for no action
at all).

**Related:** `Button` (the action slot's expected content), `Alert` (for an
error or warning state instead of a neutral empty one).

**Source:** `src/components/EmptyState/` · **Story:** `Components/EmptyState`

---

## Button / IconButton
*Verified 2026-09-15*

**Purpose:** The system's primary action controls — `Button` for a labeled
action, `IconButton` for an icon-only one. Both share the same 5 types and 3
sizes via `button-types.module.css`, so the same rules apply to both.

**Use when — type** (by emphasis; confirmed against real usage across the
app, not just theory):
- **Primary** — the one main, flow-advancing action per screen or section
  (filled, highest emphasis). Only one per view — never two Primary buttons
  competing for attention. Real examples: "Start trial", modal "Continue".
- **Secondary** — a real alternative action alongside Primary, not an
  afterthought (e.g. Back/Continue, Demo/Contact Sales) — stroke-only, no
  fill, deliberately quieter than Primary but still first-class.
- **Tertiary** — a softer, filled (quaternary) action for auxiliary/toolbar
  controls that sit alongside a Primary without competing with it (e.g. an
  admin toolbar's "+ Add", "Check/delete pages").
- **Ghost** — the lowest-emphasis actionable control, fully transparent at
  rest. For an inline, de-emphasized trigger (e.g. a "See example" link-like
  action) that shouldn't read as a "real button" until interacted with.
- **Danger** — reserved exclusively for destructive/irreversible actions
  (delete, remove). Not used anywhere in the app yet — that's expected, not
  a gap; don't reach for it outside a genuinely destructive action.

**Use when — size** (real heights: Small 32px, Medium 40px, Large 48px):
- **Large** — page-level, high-commitment actions: modal primary actions,
  onboarding-step CTAs, hero/full-width buttons.
- **Medium (default)** — the safe default for standard in-content actions:
  forms, cards, dialogs. If unsure, this is the size.
- **Small** — dense UI: table-row actions, toolbars, compact panels —
  anywhere a control sits shoulder-to-shoulder with other small controls
  (an `IconButton`, a `Tag`).

**Key props:** `type` (`primary`/`secondary`/`tertiary`/`ghost`/`danger`),
`size` (`small`/`medium`/`large`), `leadingIcon`/`trailingIcon`.

**Related:** `IconButton` (identical type/size rules, icon-only), `Input`
(shares the exact same 32/40/48 height scale — match its size to whichever
`Button` it's paired with in the same row).

**Source:** `src/components/Button/` · **Story:** `Components/Button`

---

## Input / InputHeading
*Verified 2026-09-15*

**Purpose:** The system's standalone text-entry control. `InputHeading` is a
paired label component, not a variant of `Input` itself.

**Use when — type** (already documented in the component's own code
comment, surfaced here for lookup):
- **Primary (outlined)** — the default choice for a standalone field on a
  plain surface.
- **Secondary (filled)** — for a field on a busy/textured surface, where an
  outline alone wouldn't stay legible against the background.
- **Tertiary (underlined)** — compact/dense contexts (inline table-cell
  editing, tight toolbars) where a full outline or fill would be too heavy.

**Use when — size** (same 32/40/48 height scale as `Button` — match the two
when paired in one row, e.g. a search field next to a button):
- **Large** — a standalone, prominent field (an auth screen, a hero search
  bar).
- **Medium (default)** — the safe default for a standard form field.
- **Small** — a compact field inside a dense toolbar or table.
- **`expanded`** isn't "bigger" — it swaps to a multi-line `<textarea>` for
  free-form/longer text. Reach for it by content shape (a paragraph, not a
  value), not by size preference.

**Key props:** `type` (`primary`/`secondary`/`tertiary`), `size`
(`small`/`medium`/`large`/`expanded`), `warning` (border-only validation
state, no separate ring).

**Related:** `InputHeading` (the label above it), `Button` (shares the
height scale).

**Source:** `src/components/Input/` · **Story:** `Components/Input`

---

## Not yet audited for this file

Every other exported component (`Alert`, `Cell`/
`Row`/`Table`, `Checkbox`, `LightDarkToggle`,
`Pagination*`, `ProgressTab*`, `Radio`/`RadioIndicator`, `RowMenuTrigger`, `Tab*`,
`Tag`, `TemplateCard`) exists and works, but hasn't had a fresh entry written for this
file yet — **do not assume the summary above of what's "audited" extends to these**.
Read the component's own source and Storybook story before using it, and add a real
entry here once you have — that's the whole point of this file staying trustworthy.

## Missing entirely (as of 2026-09-07)

No chart/data-viz components, no Modal/Dialog, no Toast, no DatePicker, no Accordion,
no Slider, no app-shell (sidebar/top bar) components, no color picker (explicitly
deferred — see `DESIGN_SYSTEM.md`). Don't invent a substitute inline — flag the gap
and build the real component first, following the same Figma-first workflow as
everything else in this file.
