# GEO Lite — free scan flow

Design prototype of the GEO Lite flow, for engineering to wire to a backend.
25 screens plus the Enterprise (`#v2-enterprise`) and Pricing
(`#v2-geoplans`) pages, all interactive, all data mocked.

```bash
npm install     # the design system is vendored in vendor/design-system
npm run dev
```

To share it as a file: `npx vite build --config vite.single.config.ts`
writes a single `dist-single/index.html` with everything inlined. Keep the
`example-report/` and `tread-report/` folders from `dist-single/` beside it:
the example report and the Full Report screen load from them.

## Read these, in this order

| | |
|---|---|
| **`CLAUDE.md`** | **Read first if you are writing UI.** How this codebase uses the Gist Foundations design system, and what not to invent. One page. |
| `HANDOFF.md` | The flow, the routes, where the data lives, what is not modelled, and the open questions. |
| `COMPONENTS.md` | What each design-system component is for and when to use it. |
| `PATTERNS.md` | How components combine into real screens. |
| `DESIGN_SYSTEM.md` | The rules, the tokens, and the reasoning behind every component. |

`.claude/skills/responsive-audit/` holds the responsive measurement method —
load it before any work across breakpoints.

## In one paragraph

Entry is `#v2-geoscreen`. Routing is hash-based and lives in `src/App.tsx`;
every screen is a component in `src/geo-v2/`. Report data comes from
`src/geo-v2/geoReportPageData.ts`, where `auditTotals()` and
`geoScoreParts()` are the two functions that are really a spec for the
server. Nothing takes data as props yet — that is the seam you will build.
