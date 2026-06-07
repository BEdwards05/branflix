#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const iconSvg = fs.readFileSync(path.join(root, 'public/os_icon.svg'));

const outputs = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['android-chrome-192x192.png', 192],
  ['android-chrome-192x192_maskable.png', 192],
  ['android-chrome-512x512.png', 512],
  ['android-chrome-512x512_maskable.png', 512],
];

for (const [filename, size] of outputs) {
  const outPath = path.join(root, 'public', filename);
  await sharp(iconSvg)
    .resize(size, size)
    .png()
    .toFile(outPath);
  console.log(`Wrote ${filename}`);
}

const faviconSizes = [16, 32, 48];
const faviconPngs = await Promise.all(
  faviconSizes.map((size) =>
    sharp(iconSvg).resize(size, size).png().toBuffer()
  )
);
const faviconIco = await toIco(faviconPngs);
fs.writeFileSync(path.join(root, 'public', 'favicon.ico'), faviconIco);
console.log('Wrote favicon.ico');
