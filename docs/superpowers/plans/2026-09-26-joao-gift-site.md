# João Fecchio Gift Site Implementation Plan

> **For agentic workers:** Implement the accepted design in small, verifiable slices and review each boundary before release.

**Goal:** Publish a personal site that presents Evidence-driven Engineering and guides João through a real Codex installation.

**Architecture:** Static HTML/CSS/JS lives under `site/`; a dependency-free Node build reads the separate site's `skill-release.json` and writes deployable files to `dist/`. GitHub Actions verifies and deploys the site. The install flow uses a pinned Git tag from the skill repository.

**Tech Stack:** HTML, CSS, browser JavaScript, Node.js 22 built-ins, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-26-joao-gift-site-design.md`.

## Global constraints

- Keep this repository site-only; the plugin package and its manifest remain in `mSq-b12/evidence-driven-engineering`.
- Keep the recommended tagged release in `skill-release.json`; do not add runtime dependencies or telemetry.
- A browser cannot report installed-plugin state. Explain verification inside Codex.
- Preserve the canonical skill directory and its existing behavior.
- Use Brazilian Portuguese for the site, with technical terms where clearer.

## Tasks

### 1. Release prerequisites

- [ ] Replace `OWNER` in current install documentation with the real GitHub owner.
- [ ] Check the Codex CLI installation commands against the current host and official plugin documentation.
- [ ] Confirm package verification, tests, and marketplace smoke test still pass.

### 2. Build the personal experience

- [ ] Create the semantic page, original cover composition, favicon, and social image.
- [ ] Add responsive styling, visible focus, readable contrast, touch targets, and reduced-motion behavior.
- [ ] Implement copy feedback and graceful Clipboard API fallback.
- [ ] Add the personal note, exact method stages, first-use prompt, documentation links, and easter egg.

### 3. Build and test contract

- [ ] Add a dependency-free site build that derives version and installation ref from `skill-release.json`.
- [ ] Add focused tests for version substitution, no placeholders, and installed-asset/link integrity.
- [ ] Document local preview, build, deployment, version updates, and install test in `README.md`.
- [ ] Integrate build/test checks and GitHub Pages publication workflow.

### 4. Verify and publish

- [ ] Render desktop and mobile, inspect the installation path and keyboard behavior, fix findings, and render again.
- [ ] Test pinned-tag installation in a disposable `CODEX_HOME` and inspect installed/enabled state.
- [ ] Review the diff and public assets; run package, site, and workflow checks.
- [ ] Commit/push the site, publish `v1.0.0`, verify GitHub Pages and the release URL.
