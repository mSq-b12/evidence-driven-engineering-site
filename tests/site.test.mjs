import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('the public experience opens into the method instead of a private letter', async () => {
  const html = await readFile(join(root, 'site', 'index.html'), 'utf8');
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<title>Evidence-driven Engineering[^<]*<\/title>/);
  assert.match(html, /class="story-link"[^>]*href="#processo"/);
  assert.match(html, /<section[^>]*id="processo"[^>]*aria-labelledby="process-title"/);
  assert.match(html, /<h2 id="process-title" tabindex="-1">/);
  assert.doesNotMatch(html, /João Fecchio|Para João|Feito para João|JF—01|gift-note|gift-seal/i);
  assert.match(html, /não é produto oficial da OpenAI|projeto independente;/);
});

test('the public experience explains the skill, evidence, use, and verified distribution', async () => {
  const html = await readFile(join(root, 'site', 'index.html'), 'utf8');
  assert.match(html, /<h1 id="hero-title">Evidence-driven Engineering/);
  assert.match(html, /Codex e outros agentes de programação/);
  assert.match(html, /id="processo"/);
  assert.match(html, /id="metodo"/);
  assert.match(html, /id="evidencia"/);
  assert.match(html, /id="instalar"/);
  assert.equal((html.match(/class="process-index"/g) ?? []).length, 5);
  assert.ok(html.indexOf('id="processo"') < html.indexOf('id="metodo"'));
  assert.ok(html.indexOf('id="metodo"') < html.indexOf('id="evidencia"'));
  assert.ok(html.indexOf('id="evidencia"') < html.indexOf('id="instalar"'));
  assert.equal((html.match(/<details[^>]*class="method-stage"/g) ?? []).length, 5);
  assert.equal((html.match(/<summary>/g) ?? []).length >= 5, true);
  assert.match(html, /O primeiro comando adiciona a fonte; ele ainda não instala o plugin/);
  assert.match(html, /Prefira Plugins no Codex; use este comando se sua CLI oferecer suporte/);
  assert.match(html, /github\.com\/mSq-b12\/evidence-driven-engineering/);
});

test('the hero action introduces the public method and focuses its heading', async () => {
  const script = await readFile(join(root, 'site', 'app.js'), 'utf8');
  const html = await readFile(join(root, 'site', 'index.html'), 'utf8');
  assert.match(html, /class="story-link"[^>]*href="#processo"/);
  assert.match(script, /getElementById\('process-title'\).*focus/);
  assert.doesNotMatch(script, /gift-seal|gift-note/);
});

test('opening a method stage updates the instrument without making content script-dependent', async () => {
  const script = await readFile(join(root, 'site', 'app.js'), 'utf8');
  assert.match(script, /querySelectorAll\('\[data-step\]'\)/);
  assert.match(script, /addEventListener\('toggle'/);
  assert.match(script, /data-step-readout/);
});

test('visual motion is opt-in and has a reduced-motion path', async () => {
  const script = await readFile(join(root, 'site', 'app.js'), 'utf8');
  const css = await readFile(join(root, 'site', 'styles.css'), 'utf8');
  const html = await readFile(join(root, 'site', 'index.html'), 'utf8');
  assert.match(script, /data-artifact/);
  assert.match(script, /pointermove/);
  assert.match(script, /prefers-reduced-motion: reduce/);
  assert.match(script, /data-story-progress/);
  assert.match(html, /data-story-progress/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.method-instrument \{ width: 180px/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('the hero title keeps enough line height for complete glyphs', async () => {
  const css = await readFile(join(root, 'site', 'styles.css'), 'utf8');
  const titleRules = [...css.matchAll(/\.hero h1\s*\{([^}]*)\}/g)].map((match) => match[1]);
  const declaredLineHeights = titleRules
    .map((rule) => Number(rule.match(/line-height:\s*([\d.]+)/)?.[1]))
    .filter(Number.isFinite);
  const lineHeight = declaredLineHeights.at(-1);
  assert.ok(lineHeight >= 1, `expected hero title line-height >= 1, received ${lineHeight}`);
});

test('the hero title animation does not clip glyphs after it finishes', async () => {
  const css = await readFile(join(root, 'site', 'styles.css'), 'utf8');
  const titleAnimation = css.match(/@keyframes title-unfold\s*\{([^}]+\{[^}]+\}[^}]+\})/s)?.[1] ?? '';
  assert.notEqual(titleAnimation, '', 'expected title-unfold keyframes to exist');
  assert.doesNotMatch(titleAnimation, /clip-path/i);
});

test('site build publishes the package version and a real installation path', async () => {
  const built = spawnSync(process.execPath, ['scripts/build-site.mjs'], { cwd: root, encoding: 'utf8' });
  assert.equal(built.status, 0, built.stderr || built.stdout);

  const manifest = JSON.parse(await readFile(join(root, 'skill-release.json'), 'utf8'));
  const html = await readFile(join(root, 'dist', 'index.html'), 'utf8');
  assert.match(html, new RegExp(`${manifest.repository}@v${manifest.version.replaceAll('.', '\\.')}`));
  assert.match(html, /https:\/\/mSq-b12\.github\.io\/joao-fecchio-site\//);
  assert.doesNotMatch(html, /mSq-b12\.github\.io\/evidence-driven-engineering\//);
  assert.match(html, /property="og:title" content="Evidence-driven Engineering/);
  assert.doesNotMatch(html, /João|JF|presente/i);
  assert.match(html, /codex plugin add evidence-driven-engineering@evidence-driven-engineering/);
  assert.match(html, /não consegue inspecionar nem verificar o que está no seu computador/);
  assert.doesNotMatch(html, /\{\{[^}]+\}\}|OWNER|localhost/i);
  assert.match(html, /<main id="conteudo">/);
  assert.match(html, /assets\/evidence-dial\.webp/);
  assert.match(html, /github\.com\/mSq-b12\/evidence-driven-engineering\/blob\/main\/README\.md/);
  assert.doesNotMatch(html, /github\.com\/mSq-b12\/evidence-driven-engineering\/tree\/main\/docs\/superpowers/);
  assert.ok((await stat(join(root, 'dist', 'assets', 'notebook.jpg'))).size > 1000);
  assert.ok((await stat(join(root, 'dist', 'assets', 'evidence-dial.webp'))).size > 1000);
  await assert.rejects(stat(join(root, 'dist', 'assets', 'social-preview.png')), { code: 'ENOENT' });
});

test('copy controls use the exact command and explain clipboard fallback', async () => {
  const script = await readFile(join(root, 'site', 'app.js'), 'utf8');
  const release = JSON.parse(await readFile(join(root, 'skill-release.json'), 'utf8'));
  const commandText = `codex plugin marketplace add ${release.repository}@v${release.version}`;
  let click;
  let copied;
  let selected = false;
  const button = {
    textContent: 'Copiar',
    getAttribute: () => 'command-source',
    addEventListener: (_event, listener) => { click = listener; },
  };
  const command = { textContent: ` ${commandText} `, focus: () => {} };
  const status = { textContent: '' };
  const document = {
    querySelectorAll: (selector) => selector === '[data-copy]' ? [button] : [],
    querySelector: (selector) => selector.includes('data-copy-status') ? status : null,
    getElementById: (id) => id === 'command-source' ? command : null,
    createRange: () => ({ selectNodeContents: () => {} }),
  };
  const window = {
    setTimeout: () => {},
    getSelection: () => ({ removeAllRanges: () => {}, addRange: () => { selected = true; } }),
  };
  const navigator = { clipboard: { writeText: async (value) => { copied = value; } } };
  runInNewContext(script, { document, window, navigator });

  await click();
  assert.equal(copied, commandText);
  assert.match(status.textContent, /Comando copiado/);
  assert.equal(button.textContent, 'Copiado');

  navigator.clipboard.writeText = async () => { throw new Error('Permission denied'); };
  await click();
  assert.equal(selected, true);
  assert.match(status.textContent, /Ctrl\+C/);
});
