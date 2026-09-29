import { readFile, writeFile, mkdir, rm, cp, lstat } from 'node:fs/promises';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'site');
const output = join(root, 'dist');

if (relative(root, output) !== 'dist') throw new Error('Unsafe site output path');

const release = JSON.parse(await readFile(join(root, 'skill-release.json'), 'utf8'));
if (!/^\d+\.\d+\.\d+$/.test(release.version)) throw new Error('Invalid skill release version');
if (!/^[\w.-]+\/[\w.-]+$/.test(release.repository)) throw new Error('Invalid skill repository');

const template = await readFile(join(source, 'index.html'), 'utf8');
const markers = template.match(/\{\{VERSION\}\}/g) ?? [];
if (markers.length < 2) throw new Error('The site must show both the version and its pinned install ref');
if (!template.includes(release.repository)) throw new Error('Site install source does not match skill-release.json');
const html = template.replaceAll('{{VERSION}}', release.version);
if (/\{\{[^}]+\}\}/.test(html)) throw new Error('Unresolved site template marker');

try {
  const stat = await lstat(output);
  if (stat.isSymbolicLink()) throw new Error('Refusing to replace a linked dist directory');
  if (!stat.isDirectory()) throw new Error('dist exists and is not a directory');
  await rm(output, { recursive: true });
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

await mkdir(output, { recursive: true });
await writeFile(join(output, 'index.html'), html, 'utf8');
for (const file of ['styles.css', 'app.js', 'favicon.svg']) {
  await cp(join(source, file), join(output, file));
}
await mkdir(join(output, 'assets'), { recursive: true });
for (const file of ['evidence-dial.webp', 'notebook.jpg']) {
  await cp(join(source, 'assets', file), join(output, 'assets', file));
}
console.log(`Built public Evidence-driven Engineering site for v${release.version}`);
