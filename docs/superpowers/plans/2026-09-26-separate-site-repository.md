# Separate João Site Repository Implementation Plan

> **For agentic workers:** Execute each checked task with a verification gate. This is an inline migration authorized by Braian in the current task; no subagent is required because the files and deployment are coupled.

**Goal:** Keep the João Fecchio gift site in its own public repository while Evidence-driven Engineering remains an independently installable skill repository.

**Architecture:** The site repository owns HTML/CSS/JS, assets, build, tests, Pages workflow, and a pinned skill-release reference. The skill repository owns the plugin, marketplace, tests, and release documentation. The only connection is the public install command targeting a tagged release.

**Tech Stack:** Static HTML/CSS/JS, Node.js 22, GitHub Actions, GitHub Pages.

## Global Constraints

- Preserve the published `v1.0.0` tag and release; do not rewrite Git history.
- Copy the current site without changing its visual design.
- Do not copy `plugin/` or the skill's marketplace catalog into the site repository.
- Keep the install command pinned to the real plugin tag and test it.
- Do not delete the original site files until the independent site is published and verified.

---

### Task 1: Independent site build

**Files:** Copy `site/`, `scripts/build-site.mjs`, `scripts/serve-site.mjs`, `tests/site.test.mjs`, and the gift-site design/plan docs into `joao-fecchio-site/`. Create `skill-release.json`, `README.md`, `.gitignore`, and `.github/workflows/pages.yml` there.

**Interface:** `skill-release.json` contains `{ "repository": "mSq-b12/evidence-driven-engineering", "version": "1.0.0" }`. `node scripts/build-site.mjs` reads it and produces `dist/` with the pinned install command and site-specific canonical/OG URLs.

- [ ] Copy the site-owned files to the independent directory, preserving the assets.
- [ ] Make the site build and tests use `skill-release.json`, not `plugin/plugin.json`.
- [ ] Update the canonical/OG URLs and site documentation to the new repository.
- [ ] Run `node --test`, `node scripts/build-site.mjs`, and inspect the output for wrong old-site URLs or unresolved markers.

### Task 2: Publish and verify the independent site

**Files:** New repository `mSq-b12/joao-fecchio-site` and its Pages workflow.

**Interface:** Public URL `https://msq-b12.github.io/joao-fecchio-site/`; installation still targets `mSq-b12/evidence-driven-engineering@v1.0.0`.

- [ ] Initialize and commit only site-owned files; confirm no `plugin/` or `.agents/plugins/` is tracked.
- [ ] Create/push the separate public GitHub repository, enable GitHub Pages using workflow mode, and check workflow success.
- [ ] Open the public page and verify title, image, install commands, navigation, and missing-resource errors.

### Task 3: Remove co-located site from skill main

**Files:** Remove old `site/`, `scripts/build-site.mjs`, `scripts/serve-site.mjs`, `tests/site.test.mjs`, `.github/workflows/pages.yml`, and gift-site-only design/plan docs. Update `README.md` to link to the independent gift site and adjust `.gitignore` only if needed.

**Interface:** `node scripts/verify.mjs` and `node --test` still validate the plugin without any site files. The existing release tag remains untouched.

- [ ] Remove only the exact site-owned tracked paths after checking the new Pages URL works.
- [ ] Run `node scripts/verify.mjs`, `node --test`, `git diff --check`, and confirm there is no `site/` or Pages workflow in the skill working tree.
- [ ] Commit and push the skill-repository cleanup separately; inspect both repositories' final status and public URLs.
