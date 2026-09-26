import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('the story begins at Braian’s letter, not at installation or the method list', async () => {
  const html = await readFile(join(root, 'site', 'index.html'), 'utf8');
  assert.doesNotMatch(html, /Começar instalação|data-install-link/);
  assert.match(html, /class="story-link"[^>]*href="#carta"/);
  assert.match(html, /<section[^>]*id="carta"[^>]*aria-labelledby="letter-title"/);
  assert.match(html, /<h2 id="letter-title" tabindex="-1">/);
  assert.ok(html.indexOf('id="carta"') < html.indexOf('id="metodo"'));
});

test('the experience preserves the full story and a no-script method circuit', async () => {
  const html = await readFile(join(root, 'site', 'index.html'), 'utf8');
  assert.match(html, /<h1 id="hero-title">[^<]*João Fecchio/);
  assert.match(html, /id="carta"/);
  assert.match(html, /id="processo"/);
  assert.match(html, /id="metodo"/);
  assert.match(html, /id="evidencia"/);
  assert.match(html, /id="entrega"/);
  assert.match(html, /id="instalar"/);
  assert.ok(html.indexOf('id="carta"') < html.indexOf('id="processo"'));
  assert.ok(html.indexOf('id="processo"') < html.indexOf('id="metodo"'));
  assert.ok(html.indexOf('id="metodo"') < html.indexOf('id="evidencia"'));
  assert.ok(html.indexOf('id="evidencia"') < html.indexOf('id="instalar"'));
  assert.ok(html.indexOf('id="evidencia"') < html.indexOf('id="entrega"'));
  assert.ok(html.indexOf('id="entrega"') < html.indexOf('id="instalar"'));
  assert.equal((html.match(/<details[^>]*class="method-stage"/g) ?? []).length, 5);
  assert.equal((html.match(/<summary>/g) ?? []).length >= 5, true);
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

test('site build publishes the package version and a real installation path', async () => {
  const built = spawnSync(process.execPath, ['scripts/build-site.mjs'], { cwd: root, encoding: 'utf8' });
  assert.equal(built.status, 0, built.stderr || built.stdout);

  const manifest = JSON.parse(await readFile(join(root, 'skill-release.json'), 'utf8'));
  const html = await readFile(join(root, 'dist', 'index.html'), 'utf8');
  assert.match(html, new RegExp(`${manifest.repository}@v${manifest.version.replaceAll('.', '\\.')}`));
  assert.match(html, /https:\/\/mSq-b12\.github\.io\/joao-fecchio-site\//);
  assert.doesNotMatch(html, /mSq-b12\.github\.io\/evidence-driven-engineering\//);
  assert.match(html, /codex plugin add evidence-driven-engineering@evidence-driven-engineering/);
  assert.match(html, /O navegador não consegue verificar plugins instalados/);
  assert.doesNotMatch(html, /\{\{[^}]+\}\}|OWNER|localhost/i);
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<main id="conteudo">/);
  assert.match(html, /social-preview\.png/);
  assert.match(html, /github\.com\/mSq-b12\/joao-fecchio-site\/tree\/main\/docs\/superpowers/);
  assert.doesNotMatch(html, /github\.com\/mSq-b12\/evidence-driven-engineering\/tree\/main\/docs\/superpowers/);
  assert.ok((await stat(join(root, 'dist', 'assets', 'notebook.jpg'))).size > 1000);
  assert.ok((await stat(join(root, 'dist', 'assets', 'social-preview.png'))).size > 1000);
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
