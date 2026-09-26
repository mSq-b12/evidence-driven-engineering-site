import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

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
    querySelectorAll: () => [button],
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
