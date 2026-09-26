# João Fecchio gift site design

## Purpose

Give João Fecchio a personal, credible introduction to Evidence-driven Engineering and a verified path from the site to an installed Codex plugin. The page is an independent demonstration of the method it presents.

## Audience and outcome

João arrives through a shared link. Within the first viewport he should know this was made for him, what the gift is, and where to begin installing it. After installation, he should know how to verify and try the skill. The site does not claim to detect Codex, installed plugins, or installation success from the browser.

## Existing product facts

- Canonical package: `plugin/skills/evidence-driven-engineering/` in the separate skill repository.
- Site's pinned release source: `skill-release.json` (`1.0.0` at design time); the plugin's own version remains in its `plugin/plugin.json`.
- Marketplace source: `.agents/plugins/marketplace.json` in the skill repository.
- Skill GitHub repository: `mSq-b12/evidence-driven-engineering`; this site lives in `mSq-b12/joao-fecchio-site`.
- Codex marketplace registration and plugin installation are distinct operations. The current local CLI supports both commands; an isolated remote `@main` install was verified. The versioned `v1.0.0` tag must exist before the site recommends it.
- The public Codex documentation documents Git marketplace addition and Plugins UI installation. The local CLI also provides `codex plugin add`, which is a version-dependent convenience.

## Visual thesis

A carefully edited engineering notebook handed to one person. Use a cool paper surface, dark ink, one deep green accent, precise margins, and a large typographic cover. The cover is an original CSS and type composition, not a fake app screenshot. The page stays in one light theme. Typography leads; labels and rules organize actual information. Motion is limited to entrance/feedback and honors reduced motion.

Reading this as: a personal editorial launch for one developer, with the feel of a crafted technical edition, built with semantic HTML and native CSS. Design variance 6, motion 3, density 3.

## Content and structure

1. Cover: personal dedication, one clear sentence about the skill, prominent `Começar instalação` action.
2. Origin: a short note about studying, testing, refining, and packaging the method, without invented dates or personal memories.
3. Method: five stages from the canonical skill (Orient, Model, Choose scope, Iterate, Verify and deliver). Each stage ties a principle to its practical effect. This is a flowing editorial sequence, not a card grid.
4. Installation: pinned `v1.0.0` source, two copyable Codex CLI commands, exact place to run them, a Plugins UI alternative, and a manual troubleshooting path. Copy actions confirm only that text was copied, never that the plugin installed.
5. First use: a concrete small debugging prompt and guidance to verify that the plugin appears as enabled in Codex.
6. Close: short personal note, source and docs links, and a discreet easter egg documented in code.

## Interaction contract

- Hero action moves focus to the installation guide.
- Each copy button copies its adjacent command and announces success or failure accessibly. A manual text-selection fallback remains available.
- If Clipboard API is unavailable, show a clear instruction to select and copy the command.
- No device fingerprinting or OS switch: the supported commands are the same across Windows, macOS, and Linux, so detection adds no value.
- The site never says installation succeeded. It shows how to check in Codex.
- A subtle optional easter egg can reveal a message, but no key information depends on it.

## Delivery architecture

- Static site under `site/`: one HTML page, one stylesheet, one small script, favicon and social preview.
- `scripts/build-site.mjs` creates `dist/`, fills the pinned version/tag from `skill-release.json` in this separate site repository, and checks that no template markers remain. No runtime data collection or third-party dependencies.
- GitHub Pages deploys `dist/` through Actions. Relative asset paths work under the repository subpath and can later support a custom domain. Open Graph uses the published absolute image URL.
- Site checks run in this repository's CI. The skill release tag and GitHub Release are published independently in the skill repository.

## Acceptance evidence

- Package verifier and tests pass; site build succeeds from a clean checkout.
- Published tag exists; the exact two-command installation works in an isolated Codex home, listing the plugin as installed and enabled.
- Desktop and mobile rendering inspected with at least one correction and second render; keyboard and copy feedback checked.
- No broken links, placeholders, local paths, secrets, tracking, or invented claims in delivered assets.
- GitHub Pages URL serves the site and OG asset successfully.
