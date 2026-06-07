#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lockPath = path.join(root, '.next/dev/lock');

const isProcessAlive = (pid) => {
  if (!pid || Number.isNaN(pid)) {
    return false;
  }

  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
};

if (!fs.existsSync(lockPath)) {
  process.exit(0);
}

let lock;

try {
  lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
} catch {
  fs.rmSync(lockPath, { force: true });
  process.exit(0);
}

const pid = Number(lock.pid);

if (!isProcessAlive(pid)) {
  fs.rmSync(lockPath, { force: true });
  process.exit(0);
}

console.error(
  [
    'BranFlix dev server is already running.',
  lock.appUrl
    ? `Open ${lock.appUrl.replace(':3000', ':5055')} (or http://localhost:5055).`
    : 'Open http://localhost:5055.',
    'To restart, run: pnpm dev:stop && pnpm dev',
  ].join('\n')
);

process.exit(1);
