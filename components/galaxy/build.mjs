import { build } from 'esbuild';
import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const output = resolve(here, '../../assets/galaxy');
await mkdir(output, { recursive: true });
await build({
  entryPoints: [resolve(here, 'island.jsx')],
  outfile: resolve(output, 'galaxy.js'),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  minify: true,
  legalComments: 'linked',
  define: { 'process.env.NODE_ENV': '"production"' },
  banner: { js: '/*! React Bits Galaxy: Copyright (c) 2026 David Haz. MIT + Commons Clause; see LICENSE-react-bits.md. */' },
  logLevel: 'info'
});
await copyFile(resolve(here, 'LICENSE.md'), resolve(output, 'LICENSE-react-bits.md'));
