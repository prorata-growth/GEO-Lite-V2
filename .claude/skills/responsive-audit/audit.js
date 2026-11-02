/**
 * Paste into the browser pane's javascript_tool, one width at a time.
 *
 * RELOAD FIRST, at the width being tested — this pane dispatches neither
 * `resize` nor a matchMedia `change`, so anything reading `useIsMobile` /
 * `useLayoutMode` keeps the value it had at load. Hash changes are fine once
 * loaded: the layout mode does not change between routes at one width.
 *
 * Returns one row per route. Read `ovf` and `cpl` first — those catch most of
 * it. See SKILL.md §5 before reporting anything as broken.
 */

/** Smallest type this app sets for real is 12 (eyebrow). Anything under 10 is
 *  a hand-built miniature inside an artwork mock — the enterprise page draws a
 *  whole report replica at 5.9px — and none of it is responsive by design. */
const MOCK_FS = 10;

/**
 * Where an element is actually painted, after every clipping ancestor.
 *
 * Comparing a raw rect against the viewport reports things that no one can
 * see: the enterprise replica overflows its own 640px box by 20px and is
 * clipped at x=1340, nowhere near the 1440 edge, yet its leaves all report
 * `right: 1466`. Intersecting up the chain is the difference between "this
 * draws past the viewport" and "this is bigger than a box that crops it",
 * and only the first is a bug.
 */
const visibleRect = (el) => {
  let r = el.getBoundingClientRect();
  for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
    const o = getComputedStyle(a).overflow;
    if (o === 'visible') continue;
    const c = a.getBoundingClientRect();
    r = {
      left: Math.max(r.left, c.left),
      right: Math.min(r.right, c.right),
      top: Math.max(r.top, c.top),
      bottom: Math.min(r.bottom, c.bottom),
    };
  }
  return r;
};

window.__auditRoutes = async (routes) => {
  const out = [];
  for (const route of routes) {
    location.hash = route;
    await new Promise((r) => setTimeout(r, 850));
    document.getAnimations().forEach((a) => {
      try { a.finish(); } catch {}
    });
    // Stale horizontal scroll shifts every rect and invents overflow.
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 120));

    const de = document.documentElement;
    const vw = de.clientWidth;

    /**
     * Artwork mocks are fixed-geometry and deliberately crop — skip them.
     *
     * Three disguises. `data-fit="box"` is the declared one. The enterprise
     * page hand-builds a report replica at 5.9px, which no transform reveals.
     * The snapshot screen draws a full-size composition and scales it to
     * 0.533, so computed `font-size` still reads 16px — only the rect against
     * the layout width shows it.
     */
    const inMock = (el) => {
      if (el.closest('[data-fit="box"]')) return true;
      if (parseFloat(getComputedStyle(el).fontSize) < MOCK_FS) return true;
      const ow = el.offsetWidth;
      return ow > 0 && el.getBoundingClientRect().width / ow < 0.9;
    };

    const truncated = [...document.querySelectorAll('.truncate')]
      .filter((el) => el.scrollWidth > el.clientWidth + 1 && !inMock(el))
      .map((el) => (el.textContent || '').trim().slice(0, 24));

    const past = new Set();
    document.querySelectorAll('*').forEach((el) => {
      if (el.children.length || inMock(el)) return;
      const r = visibleRect(el);
      if (r.right > r.left && r.right > vw + 1) past.add((el.textContent || '').trim().slice(0, 20) || el.tagName);
    });

    // Characters per line. 45–75 is comfortable; both ends are faults.
    const measures = [];
    for (const el of document.querySelectorAll('h1,h2,p')) {
      const txt = (el.textContent || '').trim();
      if (txt.length < 40 || inMock(el)) continue;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      const r = el.getBoundingClientRect();
      if (r.width < 80) continue;
      const cpl = Math.round(r.width / (fs * 0.5));
      // One rendered line means the box is wider than the sentence — the line
      // length is the sentence's, not the layout's, and there is nothing to
      // fix. Only wrapped text can run too long.
      const lines = Math.round(r.height / parseFloat(cs.lineHeight));
      // Display type is *supposed* to break early: a 48px headline at 20 cpl
      // is a two-word line by design, and holding it to the body floor of 28
      // flags every hero in the app.
      const floor = fs >= 28 ? 14 : 28;
      if (cpl < floor || (cpl > 85 && lines > 1)) measures.push({ cpl, lines, text: txt.slice(0, 30) });
    }

    /**
     * A card centred in a fluid half has no margin of its own — see the
     * gutter family in SKILL.md §4. The page never reports overflow for it,
     * because the half clips it; the only number that shows it is the space
     * left beside the card.
     */
    const GUTTER_MIN = 24;
    const cramped = [];
    document.querySelectorAll('[data-checkout="summary"], [data-sales="pitch"], [data-qualify="panel"]').forEach((card) => {
      // Up to the half, not to the card's own wrapper: these cards sit inside
      // a motion div that is exactly as wide as they are, which would read as
      // a zero gutter on a screen that has a perfectly good one.
      const c = card.getBoundingClientRect();
      let half = card.parentElement;
      while (half && half.getBoundingClientRect().width <= c.width + 1) half = half.parentElement;
      if (!half) return;
      const h = half.getBoundingClientRect();
      const gap = Math.round(Math.min(c.left - h.left, h.right - c.right));
      if (gap < GUTTER_MIN) cramped.push({ el: card.dataset.checkout || card.dataset.sales || 'panel', gutter: gap });
    });

    out.push({
      route,
      vw,
      cramped: cramped.length ? cramped : undefined,
      ovf: de.scrollWidth - de.clientWidth,
      truncated: truncated.length ? truncated.slice(0, 4) : undefined,
      overflowing: past.size ? [...past].slice(0, 3) : undefined,
      badMeasure: measures.length ? measures.slice(0, 3) : undefined,
    });
  }
  return out.filter((r) => r.ovf || r.truncated || r.overflowing || r.badMeasure || r.cramped);
};
'ready — call window.__auditRoutes([...])';

/**
 * Cross-screen type consistency.
 *
 * The per-route audit above cannot find this class of bug, and three shipped
 * because of it: the Enterprise and Pricing headings were 28 and 36 on a
 * phone, the sign-in standfirst was 15 where the check-email one beside it in
 * the same flow was 17, and the report's topic chip was body-size in a row of
 * actions. Every one of those passes a per-route check — nothing overflows,
 * nothing truncates, every measure is comfortable — because each screen is
 * only ever measured against itself.
 *
 * Flow consistency is a property *between* routes. This walks them, records
 * the size of each screen's heading and standfirst, and reports the groups.
 * A screen alone in its group is the thing to look at.
 */
window.__auditTypeConsistency = async (routes) => {
  const rows = [];
  for (const route of routes) {
    location.hash = route;
    await new Promise((r) => setTimeout(r, 900));
    window.scrollTo(0, 0);
    const texts = [...document.querySelectorAll('h1,h2,p')]
      .filter((el) => (el.textContent || '').trim().length > 8)
      .map((el) => ({ el, fs: parseFloat(getComputedStyle(el).fontSize) }));
    // the heading is the largest thing on the screen; the standfirst is the
    // first substantial run of prose under it
    const heading = texts.slice().sort((a, b) => b.fs - a.fs)[0];
    const after = heading ? texts.slice(texts.indexOf(heading) + 1) : [];
    const stand = after.find((t) => (t.el.textContent || '').trim().length > 30);
    rows.push({
      route,
      heading: heading ? heading.fs : null,
      standfirst: stand ? stand.fs : null,
    });
  }
  const group = (key) => {
    const g = {};
    for (const r of rows) {
      if (r[key] == null) continue;
      (g[r[key]] ||= []).push(r.route);
    }
    return g;
  };
  return { vw: document.documentElement.clientWidth, rows, headings: group('heading'), standfirsts: group('standfirst') };
};
