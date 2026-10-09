import assert from 'node:assert/strict';
import {readFile, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
const root = fileURLToPath(new URL('../', import.meta.url));
const html = await readFile(path.join(root, 'dist/index.html'), 'utf8');
const configSource = await readFile(path.join(root, 'dist/site-config.js'), 'utf8');
const sandbox = {window: {}};
vm.runInNewContext(configSource, sandbox);
const config = sandbox.window.SUBTITLE_BRIDGE_SITE;
assert.ok(config && /^v\d+\.\d+\.\d+$/.test(config.version), 'Release version is required');
for (const key of ['installerUrl', 'portableUrl', 'releaseUrl', 'sourceUrl']) {
  const url = new URL(config[key]);
  assert.equal(url.protocol, 'https:', `${key} must be HTTPS`);
  assert.ok(!url.username && !url.password, `${key} must not contain credentials`);
}
new vm.Script(await readFile(path.join(root, 'dist/app.js'), 'utf8'));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
  const target = match[1];
  if (target.startsWith('#')) { if (target.length > 1) assert.ok(ids.includes(target.slice(1)), `Missing anchor ${target}`); continue; }
  if (/^https?:/.test(target)) continue;
  assert.ok((await stat(path.join(root, 'dist', target))).isFile(), `Missing asset ${target}`);
}
assert.ok(html.includes(`href="${config.installerUrl}"`), 'Keep installer fallback aligned with config');
assert.ok(html.includes(`href="${config.portableUrl}"`), 'Keep portable fallback aligned with config');
assert.ok(html.includes(`href="${config.releaseUrl}"`), 'Keep release fallback aligned with config');
assert.ok(html.includes(config.version), 'Keep no-JavaScript version aligned with config');
const hosting = JSON.parse((await readFile(path.join(root, '.openai/hosting.json'), 'utf8')).replace(/^\uFEFF/, ''));
assert.equal(hosting.static.directory, 'dist');
console.log('PASS: public release configuration, local assets, anchors, JavaScript syntax and hosting output.');
