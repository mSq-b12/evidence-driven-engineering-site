# Evidence Artifact Redesign Implementation Plan

> **For agentic workers:** Use the evidence-driven loop and test each behavior before implementing it. This plan is executed inline in the current task; independent agents audit and review without overlapping source edits.

**Goal:** Make João's site a memorable, accessible narrative gift, with the personal letter as the first chapter and installation as the climax.

**Architecture:** Keep the static HTML/CSS/JS build. Add a progressive visual artifact and a small interaction controller without runtime dependencies. The real pinned skill installation remains sourced from `skill-release.json` in this site repository; the skill repository is not edited.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js 22 tests, GitHub Pages.

## Global Constraints

- Remove the `Começar instalação` hero button completely, including unused JS.
- `Conhecer o método` must target the letter at `#carta`, with focus and smooth/reduced-motion behavior.
- Keep João's existing letter honest; do not invent shared memories, dates, usage figures, or installation status.
- No runtime dependencies, WebGL, sound autoplay, scroll hijack, or hidden-only-on-JS content.
- Preserve the exact tagged Codex install commands, their copy feedback, manual fallback, and JF easter egg.
- Keep the site and skill in separate Git repositories.

---

### Task 1: Characterize and fix the story entry

**Files:** `tests/site.test.mjs`, `site/index.html`, `site/app.js`, `site/styles.css`.

**Contract:** Hero has exactly one story action with `href="#carta"`; letter section has `id="carta"` and a focusable heading; `#metodo` follows the letter. Native anchor works with JS disabled.

- [ ] Add a test reading built HTML that asserts no `Começar instalação`, no `[data-install-link]`, `href="#carta"` on the story action, and letter position before method. Run `node --test` and observe the expected failure.
- [ ] Change the HTML IDs/action and remove install-link handler from `app.js`; add a story-link handler that focuses `letter-title` with `preventScroll: true` after native anchor navigation.
- [ ] Add `scroll-margin-top` and reduced-motion CSS. Re-run `node --test`, then manually click the link at desktop/mobile and inspect the hash, viewport and focused heading.

### Task 2: Build the new visual narrative

**Files:** `site/index.html`, `site/styles.css`, optional new `site/assets/artifact.webp`, `tests/site.test.mjs`.

**Contract:** Hero integrates João's full name and a five-channel artifact. Letter is a quiet first chapter; process section uses only factual stages from the skill's development. Hero contains no install invitation.

- [ ] Add structural tests for the named hero, `#carta`, construction, method, evidence and delivery section order and the new artifact asset if used. Run tests red.
- [ ] Generate a non-text bitmap of the instrument if it improves materiality; save within `site/assets/` and optimize below 500 KB for first viewport. Keep an HTML/CSS fallback.
- [ ] Implement the hero, letter and construction composition using the existing paper/graphite/green tokens, a consistent motion curve, and no external library. Preserve accessible names, alt text and heading order.
- [ ] Build and render at desktop and mobile. Note the largest visual weakness, correct it, and render again.

### Task 3: Make the method a usable system

**Files:** `site/index.html`, `site/styles.css`, `site/app.js`, `tests/site.test.mjs`.

**Contract:** Five semantic buttons representing the skill stages update one detail panel and `aria-pressed`; all five explanations remain in the HTML for no-JS and assistive-tech reading. Pointer and touch have the same click path.

- [ ] Add a failing interaction test with a minimal DOM harness: click stage 3, assert selection/panel text; select stage 5, assert the previous state clears. Add a static test that counts five stage controls and five source explanations.
- [ ] Implement the stage controller and a connected SVG/CSS circuit with one active channel; do not add a scroll listener or framework.
- [ ] Add the assumption-to-evidence transformation as a short, factual example, with copy that clearly says it is an example rather than a project metric.
- [ ] Re-run focused tests and inspect click, keyboard, touch-equivalent and no-JS rendering.

### Task 4: Deliver the skill and verify in browser

**Files:** `site/index.html`, `site/styles.css`, `site/app.js`, `tests/site.test.mjs`, `README.md`, this design's notes.

**Contract:** Installation appears near the end as the delivery moment, followed by a small first-use epilogue. Existing commands, copy statuses, Plugins verification and manual path remain usable.

- [ ] Extend tests for section order, exact commands, copy fallback, easter egg and no redundant hero install action. Run red if new contract is missing.
- [ ] Compose delivery plate and responsive install controls, then run tests green and `node scripts/build-site.mjs`.
- [ ] Inspect 320/390/768/1024/1440 px, keyboard focus, 200% zoom, reduced motion, console errors and missing resources. Observe real motion; fix any material issue and inspect again.
- [ ] Compare emitted JS/image weights against the no-dependency and <25 KB JS / <500 KB initial visual budgets. Document actual measurements and any measurement limits.
- [ ] Test the two pinned commands in disposable `CODEX_HOME`, verifying installed/enabled state; remove only the disposable directory.
- [ ] Review final diff for placeholders, stale CTA code, secrets, local URLs and dead links. Commit/push the site repository; verify GitHub Pages and leave the live page open.
