---
name: responsive-audit
description: Audit this prototype's screens across breakpoints, and fix what the audit finds. Use when asked to check responsiveness, when a screenshot shows text clipped, overlapping, crushed or running edge to edge, when something "looks weird at a certain width", or before shipping a screen that has a two-pane layout. Carries the measurement method this preview pane requires, the bug families this codebase actually has, and the false positives that waste a pass.
---

# Responsive audit

Measure, don't look. The preview pane in this project lies in several specific
ways (below), so a screenshot is evidence of very little and a `getBoundingClientRect`
is evidence of almost everything.

## 1. The environment traps — read before measuring anything

These cost hours when rediscovered. All four are properties of the pane, not of
the app.

**Resizing an open page changes nothing.** The pane's viewport emulation
dispatches neither `resize` nor a matchMedia `change` — proven with a counter:
768 → 400 produced zero of both, while `innerWidth` disagreed with
`clientWidth` by 75px. Anything driven by `useIsMobile` / `useLayoutMode` keeps
its old value. **Reload at every width.** A number taken after a bare resize is
describing the previous layout.

**Reset scroll before reading rects.** Leftover horizontal scroll shifts every
rect left and invents overflow that is not there. `window.scrollTo(0, 0)`,
await a beat, then measure. One early "38px overflow" in this codebase was
purely this.

**`ResizeObserver` never fires.** Zero callbacks, not even the initial one. Any
component that self-corrects via RO — `FitBox` did — will sit frozen at its
first measurement. If a scaled block looks wrong, suspect a stale measure
before suspecting the maths.

**Entrance animations never finish.** framer-motion needs `rAF`, which is
frozen while the pane is hidden, so captures come back blank or half-drawn.
`document.getAnimations().forEach(a => a.finish())` fixes CSS animations only.
Confirm an element is really there by reading `opacity` / `transform` and its
rect — blank capture plus `opacity: 1` and a real height means the page is
fine and the camera is not.

**`window` scroll events never fire.** `scrollY` changes when you call
`window.scrollTo`, and no `scroll` event is dispatched for it. Anything that
records a position by listening — a scroll-restore, a sticky-header threshold,
a scroll-depth trigger — records nothing here and looks broken when it is not,
or looks fine when it is. Read `window.scrollY` directly instead of trusting a
listener to have run.

**Measure when something lands, not just whether.** A click that mounts heavy
content blocks: opening the share dialog renders a second full copy of the
report and blocks for ~670ms, and a focus scroll inside that commit happens
*before* any effect in the opening component can read the old scroll position
— `useLayoutEffect` included. If a fix that looks correct has no effect,
sample the value every 60ms across two seconds and find out when it actually
moves; a single before/after pair cannot tell a late change from no change.

## 2. What to measure

Per route, per width, after a reload and a scroll reset:

- `scrollWidth - clientWidth` on `documentElement` — any horizontal overflow
- every `.truncate` where `scrollWidth > clientWidth + 1`
- leaf elements whose `right` exceeds `clientWidth` — **after intersecting
  every clipping ancestor**. A raw rect reports things nobody can see: the
  enterprise replica overflows its own 640px box and reports `right: 1466`
  while being clipped at x=1340, nowhere near the edge. "Draws past the
  viewport" is a bug; "is bigger than a box that crops it" is a crop.
- for a card centred in a half: `card.left - half.left`, per the gutter family
  in §4
- **characters per line** for text: `width / (fontSize * 0.5)`. Comfortable is
  **45–75**. Both ends are faults — 23 cpl is a headline wrapping two words to
  a line, 120 cpl is a lede with nothing to stop it.
- **every dialog, opened** — the route sweep only sees first render, so click
  each one and check `left >= 0`, `right <= clientWidth` and `bottom <=
  clientHeight`
- for two-pane screens: each pane's width, and whether they are stacked
  (`asideRect.top >= contentRect.bottom`)
- for card grids: distinct `left` values = column count; heights should match
  within a row

`scripts/audit.js` in this skill folder is the whole thing as one paste-able
snippet.

## 3. Widths

`375 · 390 · 768 · 1024 · 1152 · 1280 · 1440 · 1728`

375 and 1440 are the two that matter most; 768 and 1152 are where this codebase
has broken most often. Add 320 only when asked — it is iPhone SE 1 territory
and has known, accepted faults.

The project's own breakpoints are in `src/geo-v2/useLayoutMode.ts`:
`phone < 768`, `compact 768–1239`, `wide ≥ 1240`. `WIDE_MIN` is measured, not
picked — truncation against column width ran 476px→15 labels, 552→5, 604→3,
652→1, 732→0.

## 4. The bug families, in the order they have actually occurred

**A width used as a floor.** The most common by far. `width: 450` on a column
inside a half, `width: 536` on a standfirst, `width: 640` on a replica that
`shrink-0`s. When the container drops below the number the element stops
shrinking and either overflows its parent or eats its neighbour's space. Fix:
`maxWidth` plus padding, or `flex: 1 1 <n>px` with `minWidth: min(<n>px, 100%)`
so the row wraps instead.

**A centred card with no gutter.** A fixed-width card centred in a fluid half
— an order summary in a checkout panel, a pitch card on a mint half. Centring
gives it no margin of its own: what sits beside it is just the leftover, so it
is generous at 1440, 6px at 1024, and negative below that, where the half's
`overflow-hidden` starts cutting the card off at the page edge. It looks
cramped for a band of widths before it looks broken, and it never reports as
page overflow because the half clips it. Measure `card.left - half.left`, not
the page. Fix: a gutter on the **half** (`paddingInline`), and the card fluid
up to its number (`width: '100%'`, `maxWidth: CARD_W`) so it gives way instead
of being cropped. The three panel screens share `PANEL_GUTTER = 40`.

**A dialog the sweep never opens.** Every finding below comes from a route as
it first renders, so anything behind a click — a modal, a sheet, an expanded
panel — is invisible to the pass and stays broken indefinitely. Both dialogs
here were: the design system's `Modal` has fixed pixel sizes (small 400,
medium 560, large 720) and no responsive step, so on a 390px phone the medium
one centres at 560 and hangs 85px off **both** edges. `small` does not help —
400 is still wider than the viewport. The app-side cap is a `max-width:
calc(100vw - 32px)` on `[role="dialog"]` in `index.css`, targeted by role
because `Modal` forwards neither `className` nor arbitrary attributes to the
element carrying the width. **After auditing the routes, open every dialog and
measure it too.** The real fix is a responsive size in the design system,
which is not this project's to make.

**Nothing in a row can give.** `whitespace-nowrap` text beside a `shrink-0`
badge, on a row with no `flex-wrap`. It cannot shrink and it cannot wrap, so it
draws over whatever is next to it — nothing here clips. Fix: `flex-wrap`, and
scope any necessary `nowrap` to the one child that truly needs it.

**`min-w-0` with no floor.** Chips with `min-w-0 flex-1` shrink past their own
labels; the boxes get smaller, the words do not, and they collide. Fix:
`repeat(auto-fit, minmax(<label>px, 1fr))` — uniform tracks mean a wrapped item
is one column wide, not one row wide.

**A box with no height for something that scales into it.** `FitBox` measures
its container; a `w-full` wrapper with `height: auto` measures zero and the
content scales to nothing. Seen at 98×103 inside a 342×311 box, and at exactly
`0`. Fix: state the height, and make sure the measure re-runs on re-render
(`useLayoutEffect`, no dep array) rather than trusting RO.

**Panes that are empty on phone.** A decorative half whose contents are
desktop-only renders as a strip of its own padding — 80px of flat colour
between the reader and the form. Fix: don't render it. Distinguish from
**deliberate placeholders** (`data-auth="photo"`, "photo ground is out of the
prototype for now"), which are reserving space for planned artwork and are not
yours to delete.

**"Phone means less" applied by default.** Nav links hidden with 169px of free
space; artwork collapsed; panels dropped. Each was a habit, not a decision. The
test is whether something *breaks* — measure before removing. When space is
genuinely tight, **reorder rather than remove**: content parity is the
convention, and a panel that carries the pitch belongs below the form, not gone.

**Spacing that does not scale with type.** One gap value serving three type
sizes reads as packed however large the number is. A 36px display headline
needs more beneath it than an 18px standfirst needs above a button. Related:
metric-equal padding reads optically unequal at the top of a card, because the
first line's leading sits above its cap — `PAGE_PAD_TOP` is 88 against 64 for
this reason.

## 4b. The blind spot this method has

**A per-route audit cannot see flow inconsistency.** Every check in §2
measures one screen against itself: does anything overflow, truncate, or read
at a bad measure. A screen can pass all of it and still be wrong *next to the
screen before it* — and three of those shipped:

- the Enterprise and Pricing headings were 28px and 36px on a phone
- the sign-in standfirst was 15px where check-email's, one screen later in
  the same flow, was 17px
- the report's topic sat at body size in a row of ghost actions, wrapping to
  two lines inside its own chip

None of them overflowed. Every one was caught by a person walking the flow on
a real phone, which is not a method.

**The cause is worth stating, because it will happen again.** `typeScale` was
introduced *after* the screens were built, and the rollout mapped each
existing hard-coded size to its nearest step. That preserves every screen
exactly — which was the point, desktop was approved — but it therefore
preserves every inconsistency that was already there. A size-preserving
migration cannot find a size disagreement. And the ramp names *sizes*
(`title`, `section`, `body`) rather than *roles*, so nothing says "a screen's
standfirst is `section`" and two call sites can each be locally reasonable
and jointly wrong.

The convention, now that it is measured: **a screen heading is `title`, its
standfirst is `section`.** Nine screens agree; anything that does not is the
thing to look at.

`__auditTypeConsistency(routes)` in `scripts/audit.js` walks routes and groups
them by heading and standfirst size. One group per field is right; a screen
alone in a group is a bug. Run it whenever type changes, and run it *across*
routes rather than per route.

## 5. False positives — do not report these

**Rolling numbers.** `RollingNumber` renders a 0–9 digit strip and clips it to
one digit. Every price will report `scrollWidth > clientWidth`. Working as
designed.

**`sr-only` spans.** 1px wide, clipped, holding the real value for screen
readers. Same signature as a truncation.

**Artwork mocks.** The fixed-geometry cards inside the mint panels
(`BrandLookupCard` and friends) are scaled as a unit and deliberately crop.
Their inner text is not responsive and is not meant to be.

**A one-line measure.** A cpl reading only describes the layout when the text
actually wraps. The plans standfirst sits in a 1240px box and reports 138 cpl,
but it is a 51-character sentence on a single line — the box is wider than the
sentence and there is nothing to fix. Check `height / lineHeight > 1` before
reporting anything as too long.

**Display type reading narrow.** A 48px headline at 20 cpl is two words to a
line *by design*. The 45–75 band is for body text; hold display sizes to about
14 cpl instead, or every hero in the app is a finding.

**Scaled and miniature mocks.** Two disguises beyond `data-fit="box"`. The
enterprise page hand-builds a report replica at 5.9px with 0.49px borders —
real elements, no transform, and every line in it reports ~103 cpl. The
snapshot screen instead draws a full-size composition and `scale(0.533)`s it,
so computed `font-size` still says 16px while the rect says otherwise. Skip
anything under 10px computed, and anything whose `rect.width / offsetWidth`
is below ~0.9.

**A blank screenshot.** See §1.

## 6. Verifying a fix

Two numbers, every time: **the width that was broken**, and **1440**. The
second is not optional — desktop is the approved surface here, and three
separate fixes in this codebase were regressions caught only by re-measuring
it. State both in the report.

When a fix changes a shared component (`FitBox`, `HeroPattern`, `GistNav`),
sweep every consumer rather than the one screen that prompted it:
`grep -rln --include="*.tsx" "ComponentName" src/`. The artwork-pane bug was
fixed twice on two screens before a sweep found the third and fourth.
