# GEO Lite — free scan flow

A working design prototype of the GEO Lite flow, handed over for engineering
to wire to a real backend. Every screen is built and interactive; every number
in it is mock data.

Read `CLAUDE.md` first if you are writing UI. It is one page and it is the
part that keeps this on the design system.

## Run it

```bash
npm install
npm run dev
```

`npm run build` produces a static `dist/`. Routes are hash-based, so it hosts
anywhere with no server rewrites.

### The design system dependency

`package.json` declares `"design-system": "file:./vendor/design-system"`: a
vendored build (`dist-lib`) of
[prorata-growth/design-system](https://github.com/prorata-growth/design-system)
at commit `a4204e6`, so `npm install` works anywhere, CI included. To update it,
run `npm run build:lib` in the design-system repo and copy its `dist-lib` over
`vendor/design-system/dist-lib`.

`src/ds-pins.css` pins the tokens, fonts and Modal title style that changed in
the library after this prototype was designed, so it renders exactly as
designed. Delete a pin to adopt the library's current value.

## The flow

Entry is `#v2-geoscreen`; an empty or unrecognised hash lands there too.

```
geoscreen ─→ brandscreen ─→ topicscreen ─→ geoloading ─→ scanemail ─→ georeport
     │                                          │                        │
     │ (sample chip)                            │ (sample run)           │ unlock
     └─→ sample ─→ geoloading ──────────────────┴─→ samplereport         ↓
                                                                      geologin
                                                                         ↓
                                                                   geocheckemail
                                                    ┌────────────────────┤
                                            onboarding              scopebrand
                                                    │                    ↓
                                                    │               scopetopic
                                                    │                    ↓
                                                    │                 checkout
                                                    │                    ↓
                                                    ↓                   paid
                                             georeportfull ←─────────────┘
                                                                      geoscope ─→ generating

Enterprise / pricing (reached from the nav bar on every screen):
  enterprise ─→ qualify ─→ sales ─→ booked
  geoplans   ─→ qualify / sales
  enterprise ─→ geodemo
```

`#v2-georeportshared` is the recipient's view of a shared report — the link
the Share dialog hands out. It has no in-app entry point by design.

**25 routes, all reachable by clicking.** Nothing in this package is an
exploration or an alternate version: the superseded report layouts, the
pre-v2 screens and the abandoned variants were removed before handover. If
you find a route that goes nowhere, that is a bug, not a leftover.

## Where the data lives

`src/geo-v2/geoReportPageData.ts` is the single source for the report — 48
exports, one file. Start here.

Two of those exports are the important ones, because they are **not** data,
they are a specification:

- **`auditTotals()`** — how the site-health counts are derived (passed,
  failed, not-applicable, never-ran, denominator). The free scan audits 5
  pages, a Deep Analysis 20; the denominator accounts for checks that never
  ran because the page did not exist.
- **`geoScoreParts()`** — how the overall GEO score is composed from
  visibility and site health. Currently `{visibility: 16, health: 64,
  score: 40}`.

Reimplement those two on the server and the report is correct. Everything
else in the file is illustrative content.

The flow screens hold their own content as module constants (`TOPICS`,
`QUESTIONS`, `WEEKS`, `SESSION`, `LINES`). `TOPICS` is duplicated between
`TopicScreen.tsx` and `GeoScopeScreen.tsx` — they will come from the API, so
the duplication resolves itself, but do not edit one and expect the other to
follow.

### How components get data today

They do not take it as props. Every component reads module-scope constants
imported at build time — there is no provider, no context and no `fetch`
anywhere in the package. That is deliberate for a prototype and it is the
first thing you will replace. We did not build a provider for you because the
right shape depends on your data layer, and a guess would be one more thing
to delete.

Screens do talk to the app through callback props — `onContinue`, `onUnlock`,
`onShare`, `onRunOwn` — so routing and side effects already have clean seams.

## What is not modelled

Be aware of these before you assume the prototype covers them:

- **A failed or timed-out scan.** There is a full loading sequence
  (`GeoLoadingScreen`, staged and paced to the engine count) and a
  brand-not-found state, but no scan-failure design. If you need one, ask for
  it rather than inventing it — it will not match the flow otherwise.
- **Partial results**, where some engines answered and others did not.
- **A brand with zero mentions.** The report assumes every figure exists.

## Known open questions

These are ours, not yours — flagged so you do not implement a bug faithfully:

1. **`THE_GIST` says "6 of the 40 answers".** 40 is the number of *questions*;
   the run produces 80 answers. The sentence is wrong and it is the most
   prominent line on the shared report. Awaiting a copy decision.
2. **The score changed from 27 to 40** during design. Some Figma frames and
   earlier exported PDFs still show 27. The code is correct.

## Conventions worth knowing

- **Breakpoints:** `src/geo-v2/useLayoutMode.ts` — `phone < 768`,
  `compact 768–1239`, `wide ≥ 1240`. `WIDE_MIN` was measured against column
  truncation, not picked.
- **Type:** `src/geo-v2/typeScale.ts`. Resolves to the design system's tokens
  at `wide` and adds the stops below it. 16 of its 21 values are tokens; the
  5 that are not are listed in the file with why.
- **Comments carry the reasoning.** Where a number looks arbitrary there is
  usually a comment saying what was tried and what it cost. Read it before
  changing the number — several of them record a regression that came back.
- **`.claude/skills/responsive-audit/`** is the responsive method: how to
  measure, the bug families this codebase produces, and the false positives.
  Load it before responsive work.

## What is deliberately fixed, not responsive

- **The plans page price line** is pinned at 24px because `RollingNumber`
  clips its digit strip to exactly `24 × 1.4`. A responsive price desyncs from
  its cell. See `PRICE_PX`.
- **The embedded Deep Analysis** (`public/tread-report/`) is a built snapshot
  of a separate A4 document app, shown in an iframe. It is paper-sized by
  design and scales to fit rather than reflowing. Rebuild it from its own repo;
  editing the snapshot here will be overwritten.
